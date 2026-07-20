"""Bounded ZIP extraction for user-supplied Office packages."""

from __future__ import annotations

import shutil
import stat
import zipfile
from pathlib import Path


MAX_ARCHIVE_MEMBERS = 10_000
MAX_ARCHIVE_FILE_BYTES = 100 * 1024 * 1024
MAX_ARCHIVE_TOTAL_BYTES = 512 * 1024 * 1024


def safe_extract_zip(archive: zipfile.ZipFile, destination: Path) -> None:
    """Extract a ZIP with path, symlink, member-count, and size limits."""
    infos = archive.infolist()
    if len(infos) > MAX_ARCHIVE_MEMBERS:
        raise ValueError(f"ZIP contains more than {MAX_ARCHIVE_MEMBERS} members")

    destination = destination.resolve()
    total_size = 0
    for info in infos:
        name = info.filename.replace("\\", "/")
        member_path = Path(name)
        has_drive_prefix = bool(member_path.parts and member_path.parts[0].endswith(":"))
        if (
            not name
            or "\x00" in name
            or member_path.is_absolute()
            or has_drive_prefix
            or ".." in member_path.parts
        ):
            raise ValueError(f"Unsafe ZIP member path: {info.filename!r}")
        mode = (info.external_attr >> 16) & 0o170000
        if mode == stat.S_IFLNK:
            raise ValueError(f"ZIP symlinks are not allowed: {info.filename!r}")
        if info.file_size > MAX_ARCHIVE_FILE_BYTES:
            raise ValueError(
                f"ZIP member exceeds {MAX_ARCHIVE_FILE_BYTES // (1024 * 1024)} MiB: {info.filename!r}"
            )
        total_size += info.file_size
        if total_size > MAX_ARCHIVE_TOTAL_BYTES:
            raise ValueError(
                f"ZIP expands beyond {MAX_ARCHIVE_TOTAL_BYTES // (1024 * 1024)} MiB"
            )

        target = (destination / member_path).resolve()
        if target != destination and destination not in target.parents:
            raise ValueError(f"Unsafe ZIP member path: {info.filename!r}")
        if info.is_dir():
            target.mkdir(parents=True, exist_ok=True)
            continue

        target.parent.mkdir(parents=True, exist_ok=True)
        with archive.open(info, "r") as source, target.open("wb") as output:
            shutil.copyfileobj(source, output, length=1024 * 1024)
