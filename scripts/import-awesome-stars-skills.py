#!/usr/bin/env python3
# /// script
# requires-python = ">=3.9"
# dependencies = ["pyyaml>=6.0"]
# ///
"""Import unique SKILL.md folders from GitHub repositories into VSIX Skills."""

from __future__ import annotations

import argparse
import hashlib
import importlib.util
import json
import re
import shutil
import subprocess
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Any

import yaml


SCRIPT_DIR = Path(__file__).resolve().parent
DEFAULT_TARGET = SCRIPT_DIR.parent
DEFAULT_SOURCES = SCRIPT_DIR / "awesome-stars-skill-sources.json"
DEFAULT_CACHE = Path("/tmp/vsix-awesome-stars-skill-sources")
CONVENTIONAL_ROOT_RESOURCES = {
    "assets",
    "examples",
    "prompts",
    "references",
    "scripts",
    "templates",
}
SKIP_PARTS = {
    ".git",
    "__fixtures__",
    "fixtures",
    "node_modules",
    "testdata",
}


def load_common_module():
    path = SCRIPT_DIR / "import-hermes-skills.py"
    spec = importlib.util.spec_from_file_location("vsix_skill_import_common", path)
    if spec is None or spec.loader is None:
        raise RuntimeError(f"Cannot load shared importer: {path}")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


COMMON = load_common_module()


@dataclass
class TreeEntry:
    sha: str
    size: int
    path: str


@dataclass
class Candidate:
    repo: str
    branch: str
    commit: str
    checkout: Path
    path: str
    parent: str
    original_name: str
    base_name: str
    metadata: dict[str, Any]
    body: str
    raw_hash: str
    source_size: int
    assigned_name: str = ""


@dataclass
class RepoInventory:
    repo: str
    branch: str
    commit: str
    checkout: Path
    entries: list[TreeEntry]
    raw_skill_count: int
    candidates: list[Candidate]


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--sources", type=Path, default=DEFAULT_SOURCES)
    parser.add_argument("--repo", action="append", default=[], help="Import only owner/repo")
    parser.add_argument("--target", type=Path, default=DEFAULT_TARGET)
    parser.add_argument("--cache", type=Path, default=DEFAULT_CACHE)
    parser.add_argument("--updated-at", default="2026-07-15")
    parser.add_argument("--inventory-only", action="store_true")
    parser.add_argument("--cleanup-cache", action="store_true")
    parser.add_argument("--workers", type=int, default=6)
    return parser.parse_args()


def run(command: list[str], cwd: Path | None = None, timeout: int = 300) -> str:
    try:
        result = subprocess.run(
            command,
            cwd=cwd,
            text=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            timeout=timeout,
        )
    except subprocess.TimeoutExpired as error:
        raise RuntimeError(
            f"Command timed out after {timeout}s ({' '.join(command)})"
        ) from error
    if result.returncode != 0:
        detail = result.stderr.strip() or result.stdout.strip()
        raise RuntimeError(f"Command failed ({' '.join(command)}): {detail}")
    return result.stdout


def safe_name(value: str) -> str:
    normalized = re.sub(r"[^a-z0-9-]+", "-", value.lower())
    normalized = re.sub(r"-+", "-", normalized).strip("-")
    if not normalized:
        normalized = "imported-skill"
    if len(normalized) > 64:
        digest = hashlib.sha256(normalized.encode()).hexdigest()[:8]
        normalized = f"{normalized[:55].rstrip('-')}-{digest}"
    return normalized


def clone_repository(repo: str, cache: Path) -> Path:
    destination = cache / repo.replace("/", "--")
    if destination.exists():
        try:
            run(["git", "rev-parse", "HEAD"], cwd=destination, timeout=10)
            print(f"REUSING {repo}", flush=True)
            return destination
        except RuntimeError:
            shutil.rmtree(destination)
    destination.parent.mkdir(parents=True, exist_ok=True)
    print(f"CLONING {repo}", flush=True)
    run(
        [
            "git",
            "clone",
            "--depth",
            "1",
            "--single-branch",
            f"https://github.com/{repo}.git",
            str(destination),
        ],
        timeout=900,
    )
    return destination


def read_tree(checkout: Path) -> list[TreeEntry]:
    output = run(["git", "ls-tree", "-r", "-l", "-z", "HEAD"], cwd=checkout)
    entries: list[TreeEntry] = []
    for record in output.split("\0"):
        if not record:
            continue
        metadata, path = record.split("\t", 1)
        parts = metadata.split()
        if len(parts) != 4 or parts[1] != "blob":
            continue
        size = int(parts[3]) if parts[3].isdigit() else 0
        entries.append(TreeEntry(sha=parts[2], size=size, path=path))
    return entries


def checkout_paths(checkout: Path, paths: list[str]) -> None:
    unique = sorted(set(paths))
    for index in range(0, len(unique), 100):
        batch = unique[index : index + 100]
        run(["git", "checkout", "HEAD", "--", *batch], cwd=checkout)


def candidate_rank(path: str) -> tuple[int, int, str]:
    lowered = path.lower()
    parts = Path(path).parts
    if any(part in SKIP_PARTS for part in parts):
        return (99, len(parts), path)
    if lowered.startswith("skills/"):
        rank = 0
    elif "/skills/" in lowered and lowered.startswith(".agents/"):
        rank = 1
    elif lowered.startswith("plugin/skills/"):
        rank = 2
    elif path == "SKILL.md":
        rank = 3
    elif "/skills/" in lowered and lowered.startswith(".claude/"):
        rank = 4
    else:
        rank = 5
    return (rank, len(parts), path)


def fallback_description(body: str, name: str) -> str:
    for paragraph in re.split(r"\n\s*\n", body):
        text = re.sub(r"[#*_`>\[\]()]", " ", paragraph)
        text = re.sub(r"\s+", " ", text).strip()
        if text and not text.startswith("---"):
            return text[:600]
    return f"Guidance for {COMMON.display_name(name)} tasks and workflows."


def parse_skill(path: Path, repo: str) -> tuple[dict[str, Any], str, str]:
    text = path.read_text(encoding="utf-8", errors="replace")
    try:
        metadata, body = COMMON.split_frontmatter(text, path)
    except (ValueError, yaml.YAMLError):
        metadata, body = {}, text
        match = re.match(r"^---\r?\n(.*?)\r?\n---\r?\n?", text, re.DOTALL)
        if match:
            raw_frontmatter = match.group(1)
            body = text[match.end() :].lstrip("\r\n")
            name_match = re.search(r"^name:\s*(.+)$", raw_frontmatter, re.MULTILINE)
            description_match = re.search(
                r"^description:\s*(.+)$",
                raw_frontmatter,
                re.MULTILINE,
            )
            if name_match:
                metadata["name"] = name_match.group(1).strip().strip("'\"")
            if description_match:
                metadata["description"] = description_match.group(1).strip().strip("'\"")
    source_name = metadata.get("name")
    if not isinstance(source_name, str) or not source_name.strip():
        source_name = path.parent.name if path.parent.name != path.parent.anchor else repo.split("/")[-1]
    base_name = safe_name(source_name)
    if not metadata.get("description"):
        metadata["description"] = fallback_description(body, base_name)
    return metadata, body, str(source_name)


def source_size(entries: list[TreeEntry], skill_path: str) -> int:
    parent = Path(skill_path).parent.as_posix()
    if parent == ".":
        total = 0
        for entry in entries:
            first = entry.path.split("/", 1)[0]
            if entry.path == "SKILL.md" or first in CONVENTIONAL_ROOT_RESOURCES or entry.path == ".env.example":
                total += entry.size
        return total
    prefix = f"{parent}/"
    return sum(entry.size for entry in entries if entry.path.startswith(prefix))


def inspect_repository(repo: str, cache: Path) -> RepoInventory:
    checkout = clone_repository(repo, cache)
    entries = read_tree(checkout)
    skill_entries = [
        entry
        for entry in entries
        if entry.path.endswith("SKILL.md")
        and not any(part in SKIP_PARTS for part in Path(entry.path).parts)
    ]
    branch = run(["git", "branch", "--show-current"], cwd=checkout).strip()
    if not branch:
        branch = run(
            ["git", "symbolic-ref", "--short", "refs/remotes/origin/HEAD"],
            cwd=checkout,
        ).strip().removeprefix("origin/")
    commit = run(["git", "rev-parse", "HEAD"], cwd=checkout).strip()

    grouped: dict[str, list[Candidate]] = {}
    for entry in skill_entries:
        skill_file = checkout / entry.path
        metadata, body, original_name = parse_skill(skill_file, repo)
        base_name = safe_name(original_name)
        raw_hash = hashlib.sha256(skill_file.read_bytes()).hexdigest()
        candidate = Candidate(
            repo=repo,
            branch=branch,
            commit=commit,
            checkout=checkout,
            path=entry.path,
            parent=Path(entry.path).parent.as_posix(),
            original_name=original_name,
            base_name=base_name,
            metadata=metadata,
            body=body,
            raw_hash=raw_hash,
            source_size=source_size(entries, entry.path),
        )
        grouped.setdefault(base_name, []).append(candidate)

    candidates = [
        sorted(group, key=lambda item: candidate_rank(item.path))[0]
        for group in grouped.values()
    ]
    candidates.sort(key=lambda item: (item.base_name, item.path))
    return RepoInventory(
        repo=repo,
        branch=branch,
        commit=commit,
        checkout=checkout,
        entries=entries,
        raw_skill_count=len(skill_entries),
        candidates=candidates,
    )


def load_existing(target: Path) -> tuple[dict[str, dict[str, Any]], dict[str, str]]:
    by_name: dict[str, dict[str, Any]] = {}
    by_source: dict[str, str] = {}
    for directory in (target / "skills").iterdir():
        manifest_path = directory / "skill.json"
        if not directory.is_dir() or not manifest_path.exists():
            continue
        manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
        by_name[directory.name] = manifest
        source_url = manifest.get("sourceUrl")
        if isinstance(source_url, str):
            by_source[source_url] = directory.name
    return by_name, by_source


def source_url(candidate: Candidate) -> str:
    parent = "" if candidate.parent == "." else f"/{candidate.parent}"
    return f"https://github.com/{candidate.repo}/tree/{candidate.branch}{parent}"


def collision_name(candidate: Candidate, occupied: set[str]) -> str:
    repo_slug = safe_name(candidate.repo.split("/")[-1])
    owner_slug = safe_name(candidate.repo.split("/")[0])
    for value in (
        f"{repo_slug}-{candidate.base_name}",
        f"{owner_slug}-{repo_slug}-{candidate.base_name}",
    ):
        proposed = safe_name(value)
        if proposed not in occupied:
            return proposed
    digest = candidate.raw_hash[:8]
    return safe_name(f"{repo_slug}-{candidate.base_name}-{digest}")


def assign_names(
    inventories: list[RepoInventory],
    target: Path,
) -> tuple[list[Candidate], list[tuple[Candidate, str]]]:
    existing, existing_sources = load_existing(target)
    occupied = set(existing)
    seen_hashes: dict[str, str] = {}
    selected: list[Candidate] = []
    skipped: list[tuple[Candidate, str]] = []

    for inventory in sorted(inventories, key=lambda item: item.repo.lower()):
        if inventory.repo == "NousResearch/hermes-agent":
            for candidate in inventory.candidates:
                skipped.append((candidate, "Hermes source already imported"))
            continue
        for candidate in inventory.candidates:
            url = source_url(candidate)
            if url in existing_sources:
                candidate.assigned_name = existing_sources[url]
                selected.append(candidate)
                seen_hashes[candidate.raw_hash] = candidate.assigned_name
                continue
            if candidate.raw_hash in seen_hashes:
                skipped.append((candidate, f"exact duplicate of {seen_hashes[candidate.raw_hash]}"))
                continue
            if candidate.base_name not in occupied:
                candidate.assigned_name = candidate.base_name
            else:
                candidate.assigned_name = collision_name(candidate, occupied)
            occupied.add(candidate.assigned_name)
            seen_hashes[candidate.raw_hash] = candidate.assigned_name
            selected.append(candidate)
    return selected, skipped


def infer_category(candidate: Candidate) -> str:
    value = f"{candidate.assigned_name} {candidate.path} {candidate.repo}".lower()
    if "cloudflare" in value:
        return "Cloudflare"
    if any(word in value for word in ("video", "audio", "voice", "music", "remotion", "hyperframe", "caption")):
        return "视频与动画"
    if any(word in value for word in ("article", "content", "wechat", "humanizer", "writing", "social")):
        return "写作与内容"
    if any(word in value for word in ("design", "image", "diagram", "canvas", "slides", "pixel", "illustrat")):
        return "图片与视觉"
    if any(word in value for word in ("pdf", "document", "obsidian", "qmd", "knowledge", "excel", "ppt")):
        return "文档与表格"
    if any(word in value for word in ("browser", "frontend", "web-", "website", "html")):
        return "网页与前端"
    if any(word in value for word in ("deploy", "docker", "devops", "server")):
        return "部署与运维"
    if any(word in value for word in ("security", "audit", "pentest", "review")):
        return "安全与验证"
    return "开发辅助"


def copy_root_skill(candidate: Candidate, destination: Path, entries: list[TreeEntry]) -> None:
    destination.mkdir(parents=True)
    shutil.copy2(candidate.checkout / "SKILL.md", destination / "SKILL.md")
    for name in sorted(CONVENTIONAL_ROOT_RESOURCES):
        source = candidate.checkout / name
        if source.is_dir():
            shutil.copytree(source, destination / name)
    env_example = candidate.checkout / ".env.example"
    if env_example.exists():
        shutil.copy2(env_example, destination / ".env.example")


def prepare_repo_resources(inventory: RepoInventory, candidates: list[Candidate]) -> None:
    paths: set[str] = set()
    first_level = {entry.path.split("/", 1)[0] for entry in inventory.entries}
    for candidate in candidates:
        if candidate.parent == ".":
            paths.add("SKILL.md")
            paths.update(CONVENTIONAL_ROOT_RESOURCES & first_level)
            if ".env.example" in first_level:
                paths.add(".env.example")
        else:
            paths.add(candidate.parent)
    checkout_paths(inventory.checkout, sorted(paths))


def import_candidate(candidate: Candidate, target: Path, updated_at: str) -> bool:
    skills_root = target / "skills"
    destination = skills_root / candidate.assigned_name
    temporary = target / f".github-skill-import-{candidate.assigned_name}"
    if temporary.exists():
        shutil.rmtree(temporary)

    if candidate.parent == ".":
        copy_root_skill(candidate, temporary, [])
    else:
        shutil.copytree(
            candidate.checkout / candidate.parent,
            temporary,
            ignore=shutil.ignore_patterns(
                ".env",
                ".git",
                ".DS_Store",
                ".pytest_cache",
                "__fixtures__",
                "__pycache__",
                "fixtures",
                "node_modules",
                "test",
                "tests",
            ),
        )

    title_value = candidate.metadata.get("title")
    title = title_value.strip() if isinstance(title_value, str) else COMMON.display_name(candidate.assigned_name)
    description = COMMON.clean_description(
        candidate.metadata.get("description"),
        candidate.assigned_name,
    )
    skill_text, was_split = COMMON.make_skill_md(
        temporary,
        candidate.assigned_name,
        title,
        description,
        candidate.body,
    )

    root_readme = temporary / "README.md"
    if root_readme.exists():
        references = temporary / "references"
        references.mkdir(exist_ok=True)
        readme_text = COMMON.rewrite_moved_links(
            root_readme.read_text(encoding="utf-8", errors="replace"),
            temporary,
        )
        (references / "upstream-readme.md").write_text(readme_text, encoding="utf-8")
        root_readme.unlink()
        skill_text = skill_text.rstrip() + (
            "\n\n## Additional upstream documentation\n\n"
            "Read [the additional upstream documentation]"
            "(references/upstream-readme.md) when setup or background details are needed.\n"
        )
    (temporary / "SKILL.md").write_text(skill_text, encoding="utf-8")

    agents = temporary / "agents"
    agents.mkdir(exist_ok=True)
    (agents / "openai.yaml").write_text(
        COMMON.make_openai_yaml(candidate.assigned_name, title),
        encoding="utf-8",
    )

    owner = candidate.repo.split("/", 1)[0]
    manifest = {
        "id": candidate.assigned_name,
        "title": title,
        "descriptionZh": f"用于 {title} 相关任务的 Codex 技能，适合需要对应专业工作流或工具指导时使用。",
        "type": "codex-skill",
        "category": infer_category(candidate),
        "prerequisites": COMMON.collect_prerequisites(candidate.metadata),
        "sourceUrl": source_url(candidate),
        "homepage": f"https://github.com/{candidate.repo}",
        "license": str(candidate.metadata.get("license") or "See upstream"),
        "author": COMMON.stringify_author(
            candidate.metadata.get("author") or candidate.metadata.get("authors") or owner
        ),
        "status": "experimental",
        "updatedAt": updated_at,
        "upstreamCommit": candidate.commit,
        "upstreamPath": candidate.path,
        "upstreamSha256": candidate.raw_hash,
    }
    (temporary / "skill.json").write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )

    if destination.exists():
        existing = json.loads((destination / "skill.json").read_text(encoding="utf-8"))
        if existing.get("sourceUrl") != manifest["sourceUrl"]:
            shutil.rmtree(temporary)
            raise RuntimeError(f"Refusing to replace unrelated skill: {destination}")
        shutil.rmtree(destination)
    shutil.move(str(temporary), destination)
    return was_split


def human_size(value: int) -> str:
    size = float(value)
    for unit in ("B", "KB", "MB", "GB"):
        if size < 1024 or unit == "GB":
            return f"{size:.1f}{unit}"
        size /= 1024
    return f"{size:.1f}GB"


def main() -> int:
    args = parse_args()
    target = args.target.resolve()
    cache = args.cache.resolve()
    sources = args.repo or json.loads(args.sources.read_text(encoding="utf-8"))
    if not isinstance(sources, list) or not all(isinstance(item, str) for item in sources):
        print("ERROR: sources file must contain an array of owner/repo strings", file=sys.stderr)
        return 1
    if not (target / "scripts/validate-skills.mjs").exists():
        print(f"ERROR: invalid target repository: {target}", file=sys.stderr)
        return 1

    existing, existing_sources = load_existing(target)
    occupied = set(existing)
    seen_hashes = {
        manifest["upstreamSha256"]: name
        for name, manifest in existing.items()
        if isinstance(manifest.get("upstreamSha256"), str)
    }
    failures: list[tuple[str, str]] = []
    inspected = 0
    selected_count = 0
    skipped_count = 0
    total_size = 0
    imported = 0
    split_count = 0
    for repo in sources:
        checkout: Path | None = None
        try:
            inventory = inspect_repository(repo, cache)
            checkout = inventory.checkout
            inspected += 1
            repo_selected: list[Candidate] = []
            repo_skipped = 0

            if repo == "NousResearch/hermes-agent":
                repo_skipped = len(inventory.candidates)
            else:
                for candidate in inventory.candidates:
                    url = source_url(candidate)
                    if url in existing_sources:
                        candidate.assigned_name = existing_sources[url]
                    elif candidate.raw_hash in seen_hashes:
                        repo_skipped += 1
                        continue
                    elif candidate.base_name not in occupied:
                        candidate.assigned_name = candidate.base_name
                    else:
                        candidate.assigned_name = collision_name(candidate, occupied)

                    occupied.add(candidate.assigned_name)
                    seen_hashes[candidate.raw_hash] = candidate.assigned_name
                    existing_sources[url] = candidate.assigned_name
                    repo_selected.append(candidate)

            selected_count += len(repo_selected)
            skipped_count += repo_skipped
            repo_size = sum(candidate.source_size for candidate in repo_selected)
            total_size += repo_size
            print(
                f"INSPECTED {repo}: raw={inventory.raw_skill_count} "
                f"unique={len(inventory.candidates)} selected={len(repo_selected)} "
                f"skipped={repo_skipped} resources={human_size(repo_size)}",
                flush=True,
            )

            if not args.inventory_only:
                for candidate in repo_selected:
                    split_count += int(import_candidate(candidate, target, args.updated_at))
                    imported += 1
                print(f"IMPORTED {repo}: {len(repo_selected)} skills", flush=True)
        except Exception as error:  # noqa: BLE001 - report every failed source
            failures.append((repo, str(error)))
            print(f"FAILED {repo}: {error}", file=sys.stderr, flush=True)
        finally:
            if checkout is not None and checkout.exists():
                shutil.rmtree(checkout)

    print(
        f"SUMMARY sources={len(sources)} inspected={inspected} failed={len(failures)} "
        f"selected={selected_count} skipped={skipped_count} "
        f"resources={human_size(total_size)} imported={imported} "
        f"split_long_guides={split_count}"
    )
    for repo, message in failures:
        print(f"FAILURE {repo}: {message}", file=sys.stderr)

    if args.cleanup_cache and cache.exists():
        shutil.rmtree(cache)
        print(f"Removed cache: {cache}")
    return 1 if failures else 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except (OSError, RuntimeError, ValueError, json.JSONDecodeError, yaml.YAMLError) as error:
        print(f"ERROR: {error}", file=sys.stderr)
        raise SystemExit(1)
