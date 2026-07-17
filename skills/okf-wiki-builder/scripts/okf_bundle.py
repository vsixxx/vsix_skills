#!/usr/bin/env python3
"""Initialize and lint OKF v0.1 knowledge bundles."""

from __future__ import annotations

import argparse
import datetime as dt
import re
import sys
from pathlib import Path
from urllib.parse import unquote, urlsplit

try:
    import yaml  # type: ignore[import-not-found]
except ImportError:
    yaml = None


FRONTMATTER_RE = re.compile(r"\A---\r?\n(.*?)\r?\n---(?:\r?\n|\Z)", re.DOTALL)
MD_LINK_RE = re.compile(r"\[[^\]]*\]\(([^)]+)\)")
WIKILINK_RE = re.compile(r"\[\[[^\]]+\]\]")
DATE_HEADING_RE = re.compile(r"^## (\d{4}-\d{2}-\d{2})\s*$", re.MULTILINE)
RESERVED_NAMES = {"index.md", "log.md"}
PROFILES = ("okf-v0.1", "knowledge-workspace", "project-fact-base")
DEFAULT_DIRS = {
    "okf-v0.1": "concepts,references",
    "knowledge-workspace": "goals,constraints,decisions,artifacts,references",
    "project-fact-base": "concepts,entities,playbooks,runbooks,references,decisions",
}


def slug_to_title(slug: str) -> str:
    return " ".join(part.capitalize() for part in slug.replace("_", "-").split("-"))


def timestamp() -> str:
    return dt.datetime.now(dt.timezone.utc).isoformat(timespec="seconds").replace("+00:00", "Z")


def is_timezone_aware_datetime(value: object) -> bool:
    if isinstance(value, dt.datetime):
        return value.tzinfo is not None and value.utcoffset() is not None
    if not isinstance(value, str) or not value.strip():
        return False
    try:
        parsed = dt.datetime.fromisoformat(value.strip().replace("Z", "+00:00"))
    except ValueError:
        return False
    return parsed.tzinfo is not None and parsed.utcoffset() is not None


def write_if_missing(path: Path, content: str) -> None:
    if path.exists():
        return
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")


def concept_frontmatter(type_: str, title: str, description: str) -> str:
    return (
        "---\n"
        f"type: {type_}\n"
        f"title: {title}\n"
        f"description: {description}\n"
        f"timestamp: {timestamp()}\n"
        "---\n\n"
    )


def init_bundle(args: argparse.Namespace) -> int:
    root = Path(args.bundle_dir).resolve()
    directory_spec = args.dirs or DEFAULT_DIRS[args.profile]
    dirs = [item.strip().strip("/") for item in directory_spec.split(",") if item.strip()]
    root.mkdir(parents=True, exist_ok=True)

    index_links = "\n".join(
        f"- [{slug_to_title(directory)}]({directory}/index.md)" for directory in dirs
    )
    root_index = (
        "---\n"
        'okf_version: "0.1"\n'
        "---\n\n"
        f"# {args.title}\n\n"
        "## Overview\n\nDescribe the bundle scope here.\n\n"
        "## Object Indexes\n\n"
        f"{index_links or '_No object directories yet._'}\n"
    )
    write_if_missing(root / "index.md", root_index)

    for directory in dirs:
        title = slug_to_title(directory)
        write_if_missing(
            root / directory / "index.md",
            f"# {title}\n\nAdd concept links with one-line descriptions.\n",
        )

    print(f"Initialized {args.profile} bundle at {root}")
    return 0


def extract_frontmatter(text: str) -> str | None:
    match = FRONTMATTER_RE.match(text)
    return match.group(1) if match else None


def parse_frontmatter(raw: str, rel: Path, errors: list[str]) -> dict[str, object] | None:
    if yaml is not None:
        try:
            parsed = yaml.safe_load(raw)
        except yaml.YAMLError as exc:
            errors.append(f"{rel}: invalid YAML frontmatter: {exc}")
            return None
        if not isinstance(parsed, dict):
            errors.append(f"{rel}: frontmatter must be a YAML mapping")
            return None
        return parsed

    # Portable fallback for the simple top-level mappings emitted by this skill.
    parsed: dict[str, object] = {}
    for line in raw.splitlines():
        if not line.strip() or line.lstrip().startswith("#") or line[:1].isspace():
            continue
        if line.startswith("- "):
            continue
        if ":" not in line:
            errors.append(f"{rel}: malformed top-level frontmatter line: {line}")
            return None
        key, value = line.split(":", 1)
        key = key.strip()
        if not key:
            errors.append(f"{rel}: empty frontmatter key")
            return None
        parsed[key] = value.strip().strip('"\'')
    return parsed


def markdown_link_target(raw_target: str) -> str:
    target = raw_target.strip()
    if target.startswith("<") and ">" in target:
        return target[1 : target.index(">")]
    return target.split(maxsplit=1)[0]


def resolve_internal_link(root: Path, source: Path, target: str) -> Path | None:
    decoded = unquote(target).split("#", 1)[0].split("?", 1)[0]
    if not decoded:
        return None
    parsed = urlsplit(decoded)
    if parsed.scheme or parsed.netloc or decoded.startswith("mailto:"):
        return None
    if decoded.startswith("/"):
        return (root / decoded.lstrip("/")).resolve()
    return (source.parent / decoded).resolve()


def lint_reserved_file(
    path: Path,
    rel: Path,
    root: Path,
    text: str,
    errors: list[str],
    warnings: list[str],
) -> None:
    raw = extract_frontmatter(text)
    if path.name == "index.md":
        if raw is not None and path != root / "index.md":
            errors.append(f"{rel}: only the bundle-root index.md may have frontmatter")
        if raw is not None and path == root / "index.md":
            data = parse_frontmatter(raw, rel, errors)
            if data is not None and data.get("okf_version") not in ("0.1", 0.1):
                warnings.append(f'{rel}: root index does not declare okf_version: "0.1"')
        if not re.search(r"^#\s+\S", text, re.MULTILINE):
            warnings.append(f"{rel}: index has no section heading")
        return

    if raw is not None:
        errors.append(f"{rel}: reserved log.md must not have frontmatter")
    for date_text in DATE_HEADING_RE.findall(text):
        try:
            dt.date.fromisoformat(date_text)
        except ValueError:
            errors.append(f"{rel}: invalid log date heading: {date_text}")


def lint_bundle(args: argparse.Namespace) -> int:
    root = Path(args.bundle_dir).resolve()
    if not root.is_dir():
        print(f"Bundle directory does not exist: {root}", file=sys.stderr)
        return 2

    strict = args.profile != "okf-v0.1"
    errors: list[str] = []
    warnings: list[str] = []
    markdown_files = sorted(root.rglob("*.md"))

    if strict and not (root / "index.md").exists():
        errors.append(f"Missing root index.md ({args.profile} profile)")

    for path in markdown_files:
        rel = path.relative_to(root)
        try:
            text = path.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            errors.append(f"{rel}: file is not valid UTF-8")
            continue

        if path.name in RESERVED_NAMES:
            lint_reserved_file(path, rel, root, text, errors, warnings)
        else:
            raw = extract_frontmatter(text)
            if raw is None:
                errors.append(f"{rel}: concept is missing YAML frontmatter")
            else:
                data = parse_frontmatter(raw, rel, errors)
                if data is not None:
                    type_value = data.get("type")
                    if not isinstance(type_value, str) or not type_value.strip():
                        errors.append(f"{rel}: concept requires a non-empty string type")
                    if strict:
                        for field in ("title", "description"):
                            value = data.get(field)
                            if not isinstance(value, str) or not value.strip():
                                errors.append(f"{rel}: {args.profile} profile requires {field}")
                        if not is_timezone_aware_datetime(data.get("timestamp")):
                            errors.append(
                                f"{rel}: {args.profile} profile requires a timezone-aware ISO 8601 timestamp"
                            )

        if WIKILINK_RE.search(text):
            warnings.append(f"{rel}: wikilinks are not portable OKF links")

        for raw_target in MD_LINK_RE.findall(text):
            target = markdown_link_target(raw_target)
            target_path = resolve_internal_link(root, path, target)
            if target_path is None:
                continue
            try:
                target_path.relative_to(root)
            except ValueError:
                warnings.append(f"{rel}: link points outside bundle: {target}")
                continue
            if not target_path.exists():
                message = f"{rel}: broken Markdown link: {target}"
                (errors if strict else warnings).append(message)

    if strict:
        directories = sorted({path.parent for path in markdown_files if path.parent != root})
        for directory in directories:
            if not (directory / "index.md").exists():
                warnings.append(f"{directory.relative_to(root)}: missing directory index.md")

    if yaml is None:
        warnings.append("PyYAML is unavailable; used basic frontmatter syntax checks")

    for issue in errors:
        print(f"ERROR: {issue}")
    for issue in warnings:
        print(f"WARN: {issue}")

    if errors:
        return 1
    print(f"OK: {len(markdown_files)} Markdown files checked ({args.profile})")
    return 0


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description=__doc__)
    sub = parser.add_subparsers(dest="command", required=True)

    init = sub.add_parser("init", help="Create an OKF bundle skeleton")
    init.add_argument("bundle_dir")
    init.add_argument("--title", required=True)
    init.add_argument("--profile", choices=PROFILES, default="project-fact-base")
    init.add_argument(
        "--dirs",
        default=None,
        help="Comma-separated concept directories; defaults depend on --profile",
    )
    init.set_defaults(func=init_bundle)

    lint = sub.add_parser("lint", help="Check OKF conformance and profile rules")
    lint.add_argument("bundle_dir")
    lint.add_argument("--profile", choices=PROFILES, default="project-fact-base")
    lint.set_defaults(func=lint_bundle)
    return parser


def main() -> int:
    args = build_parser().parse_args()
    return args.func(args)


if __name__ == "__main__":
    raise SystemExit(main())
