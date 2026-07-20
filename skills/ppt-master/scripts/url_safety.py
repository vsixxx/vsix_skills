"""Guards for user-controlled HTTP(S) URLs."""

from __future__ import annotations

import ipaddress
import socket
from urllib.parse import urlparse


def validate_public_url(url: str) -> str:
    """Validate an HTTP(S) URL and every address returned by DNS."""
    parsed = urlparse(url)
    if parsed.scheme not in {"http", "https"} or not parsed.hostname:
        raise ValueError("Only absolute http:// or https:// URLs are allowed")
    if parsed.username or parsed.password:
        raise ValueError("URLs with embedded credentials are not allowed")

    hostname = parsed.hostname.rstrip(".")
    try:
        addresses = {
            ipaddress.ip_address(info[4][0])
            for info in socket.getaddrinfo(hostname, parsed.port, type=socket.SOCK_STREAM)
        }
    except (OSError, ValueError) as exc:
        raise ValueError(f"Could not resolve public URL host: {hostname}") from exc

    if not addresses:
        raise ValueError(f"Could not resolve public URL host: {hostname}")
    blocked = [address for address in addresses if _is_non_public(address)]
    if blocked:
        rendered = ", ".join(str(address) for address in blocked)
        raise ValueError(f"URL resolves to a non-public address: {rendered}")
    return url


def _is_non_public(address: ipaddress.IPv4Address | ipaddress.IPv6Address) -> bool:
    """Return whether an IP is unsuitable as an external fetch target."""
    return (
        address.is_private
        or address.is_loopback
        or address.is_link_local
        or address.is_multicast
        or address.is_unspecified
        or address.is_reserved
    )
