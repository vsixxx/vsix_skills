#!/usr/bin/env python3
# /// script
# requires-python = ">=3.9"
# dependencies = ["pyyaml>=6.0"]
# ///
"""Import Hermes Agent skills as Codex-first VSIX skills."""

from __future__ import annotations

import argparse
import json
import re
import shutil
import sys
from pathlib import Path
from typing import Any

import yaml


REPO_URL = "https://github.com/NousResearch/hermes-agent"
ALLOWED_CATEGORIES = {
    "写作与内容",
    "图片与视觉",
    "视频与动画",
    "文档与表格",
    "网页与前端",
    "部署与运维",
    "Cloudflare",
    "自动化与工作流",
    "知识库与模板",
    "开发辅助",
    "安全与验证",
    "其他",
}

VIDEO_SKILLS = {
    "ascii-video",
    "hyperframes",
    "kanban-video-orchestrator",
    "manim-video",
}
WRITING_SKILLS = {
    "baoyu-article-illustrator",
    "baoyu-comic",
    "humanizer",
    "research-paper-writing",
    "songwriting-and-ai-music",
    "youtube-content",
}
DOCUMENT_SKILLS = {
    "excel-author",
    "nano-pdf",
    "ocr-and-documents",
    "powerpoint",
    "pptx-author",
}
FINANCE_CATEGORIES = {"finance"}

CATEGORY_MAP = {
    "apple": "自动化与工作流",
    "autonomous-ai-agents": "开发辅助",
    "blockchain": "其他",
    "communication": "自动化与工作流",
    "creative": "图片与视觉",
    "data-science": "开发辅助",
    "devops": "部署与运维",
    "dogfood": "安全与验证",
    "email": "自动化与工作流",
    "finance": "文档与表格",
    "gaming": "其他",
    "github": "开发辅助",
    "health": "其他",
    "mcp": "开发辅助",
    "media": "视频与动画",
    "migration": "自动化与工作流",
    "mlops": "开发辅助",
    "note-taking": "知识库与模板",
    "payments": "自动化与工作流",
    "productivity": "文档与表格",
    "research": "知识库与模板",
    "security": "安全与验证",
    "smart-home": "自动化与工作流",
    "social-media": "自动化与工作流",
    "software-development": "开发辅助",
    "web-development": "网页与前端",
}

MANUAL_ZH = {
    "simplify-code": "使用三个独立检查视角并行审查和精简近期代码改动。",
    "computer-use": "在不抢占用户鼠标和键盘焦点的情况下操作桌面应用。",
    "petdex": "安装、选择和管理 Hermes 动画桌面宠物。",
    "minecraft-modpack-server": "安装、配置和维护 Minecraft 整合包服务器。",
    "pokemon-player": "通过视觉识别和输入控制游玩宝可梦游戏。",
    "mpp-agent": "通过 Machine Payments Protocol 为 Agent 接入机器支付能力。",
    "stripe-projects": "使用 Stripe API 创建和管理支付项目与相关资源。",
    "stripe-link-cli": "通过命令行配置和操作 Stripe Link 支付流程。",
    "hermes-s6-container-supervision": "使用 s6 监督和维护 Hermes 容器内的长期运行服务。",
    "web-pentest": "在明确授权范围内执行 Web 应用渗透测试并生成证据化报告。",
    "godmode": "研究和测试多种大模型越狱提示方法及其行为。",
    "unbroker": "检查本地应用流量和隐私行为，识别不必要的数据中间方。",
    "code-wiki": "为代码库生成包含 Mermaid 图表的结构化 Wiki 文档。",
    "subagent-driven-development": "通过子 Agent 执行开发计划，并进行实现与质量双阶段审查。",
    "dspy": "使用 DSPy 构建、优化和评估模块化大模型程序。",
    "obliteratus": "使用 Obliteratus 分析和调整模型拒绝行为。",
    "creative-ideation": "运用具名创意方法系统地产生、扩展和筛选想法。",
    "baoyu-comic": "把知识、教程或人物故事制作成结构化教育漫画。",
    "pixel-art": "设计和生成像素画、精灵及像素风视觉资源。",
    "baoyu-article-illustrator": "分析文章结构并生成风格、配色一致的正文配图。",
    "cloudflare-temporary-deploy": "将网页临时部署到 Cloudflare，生成可访问的预览地址。",
    "openhands": "将软件开发任务委托给支持多模型的 OpenHands CLI。",
    "grok": "将功能开发和 PR 任务委托给 xAI Grok Build CLI。",
    "antigravity-cli": "配置并操作 Antigravity CLI，包括插件、认证和沙箱。",
    "here-now": "使用 here.now 服务快速发布文件并获得临时分享链接。",
}

BRANDS = {
    "1password": "1Password",
    "api": "API",
    "cli": "CLI",
    "codex": "Codex",
    "github": "GitHub",
    "google": "Google",
    "html": "HTML",
    "llm": "LLM",
    "mcp": "MCP",
    "mlops": "MLOps",
    "openai": "OpenAI",
    "pdf": "PDF",
    "pptx": "PPTX",
    "pr": "PR",
    "sql": "SQL",
    "svg": "SVG",
    "youtube": "YouTube",
}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source", type=Path, required=True, help="Hermes Agent checkout")
    parser.add_argument(
        "--target",
        type=Path,
        default=Path(__file__).resolve().parents[1],
        help="VSIX skills repository root",
    )
    parser.add_argument("--updated-at", default="2026-07-14")
    return parser.parse_args()


def split_frontmatter(text: str, path: Path) -> tuple[dict[str, Any], str]:
    match = re.match(r"^---\r?\n(.*?)\r?\n---\r?\n?", text, re.DOTALL)
    if not match:
        raise ValueError(f"Missing or invalid frontmatter: {path}")
    metadata = yaml.safe_load(match.group(1))
    if not isinstance(metadata, dict):
        raise ValueError(f"Frontmatter must be a mapping: {path}")
    return metadata, text[match.end() :].lstrip("\r\n")


def normalize_name(value: str) -> str:
    name = re.sub(r"[^a-z0-9-]+", "-", value.lower())
    name = re.sub(r"-+", "-", name).strip("-")
    if not name or len(name) > 64:
        raise ValueError(f"Cannot normalize skill name to Codex rules: {value!r}")
    return name


def display_name(name: str) -> str:
    words = []
    for word in name.split("-"):
        words.append(BRANDS.get(word, word.capitalize()))
    return " ".join(words)


def clean_description(value: Any, name: str) -> str:
    if not isinstance(value, str) or not value.strip():
        value = f"Guidance for {display_name(name)} tasks and workflows."
    value = re.sub(r"\s+", " ", value).strip()
    value = value.replace("<", "[").replace(">", "]")
    trigger = (
        f" Use when Codex needs to perform {display_name(name)} tasks, "
        f"or when the user explicitly mentions {name}."
    )
    if "use when" not in value.lower():
        value += trigger
    if len(value) > 1024:
        value = value[: 1021].rstrip() + "..."
    return value


def parse_zh_catalog(source: Path) -> dict[str, str]:
    docs = source / "website/i18n/zh-Hans/docusaurus-plugin-content-docs/current/reference"
    descriptions: dict[str, str] = {}
    row_pattern = re.compile(
        r"\| \[(?:`|\*\*)([^`*\]]+)(?:`|\*\*)\]\([^)]*\) \| (.*?) \|"
    )
    for filename in ("skills-catalog.md", "optional-skills-catalog.md"):
        path = docs / filename
        if not path.exists():
            continue
        for line in path.read_text(encoding="utf-8").splitlines():
            match = row_pattern.match(line)
            if match:
                descriptions[normalize_name(match.group(1))] = match.group(2).strip()
    descriptions["computer-use"] = MANUAL_ZH["computer-use"]
    descriptions.update(MANUAL_ZH)
    return descriptions


def skill_category(source_category: str, name: str) -> str:
    if name == "cloudflare-temporary-deploy":
        return "Cloudflare"
    if name in VIDEO_SKILLS:
        return "视频与动画"
    if name in WRITING_SKILLS:
        return "写作与内容"
    if name in DOCUMENT_SKILLS or source_category in FINANCE_CATEGORIES:
        return "文档与表格"
    category = CATEGORY_MAP.get(source_category, "其他")
    if category not in ALLOWED_CATEGORIES:
        raise ValueError(f"Invalid mapped category: {category}")
    return category


def stringify_author(value: Any) -> str:
    if isinstance(value, str):
        return value.strip()
    if isinstance(value, list):
        return ", ".join(filter(None, (stringify_author(item) for item in value)))
    if isinstance(value, dict):
        name = value.get("name") or value.get("author")
        url = value.get("url") or value.get("homepage")
        if name and url:
            return f"{name} ({url})"
        if name:
            return str(name)
    return "Nous Research"


def add_prerequisite(items: list[str], prefix: str, value: Any) -> None:
    if value is None:
        return
    values = value if isinstance(value, list) else [value]
    for item in values:
        if isinstance(item, dict):
            item = item.get("name") or item.get("path") or item.get("description")
        if item:
            items.append(f"{prefix}: {item}")


def collect_prerequisites(metadata: dict[str, Any]) -> list[str]:
    result: list[str] = []
    platforms = metadata.get("platforms")
    if isinstance(platforms, list):
        normalized = {str(item).lower() for item in platforms}
        if normalized and normalized != {"macos", "linux", "windows"}:
            add_prerequisite(result, "Platform", [str(item) for item in platforms])

    prerequisites = metadata.get("prerequisites")
    if isinstance(prerequisites, dict):
        add_prerequisite(result, "Command", prerequisites.get("commands"))
        add_prerequisite(result, "Environment variable", prerequisites.get("env_vars"))
        add_prerequisite(result, "Python package", prerequisites.get("pip"))
    elif prerequisites:
        add_prerequisite(result, "Requirement", prerequisites)

    add_prerequisite(result, "Package", metadata.get("dependencies"))
    add_prerequisite(result, "Requirement", metadata.get("requires"))
    add_prerequisite(result, "Credential file", metadata.get("required_credential_files"))
    add_prerequisite(
        result,
        "Environment variable",
        metadata.get("required_environment_variables"),
    )
    return list(dict.fromkeys(result))


def quote_yaml(value: str) -> str:
    return json.dumps(value, ensure_ascii=False)


def make_openai_yaml(name: str, title: str) -> str:
    short = f"Use {title} guidance and workflows in Codex"
    if len(short) > 64:
        short = f"Use {title[:45].rstrip()} workflows in Codex"
    if len(short) < 25:
        short += " for reliable task execution"
    short = short[:64].rstrip()
    prompt = f"Use ${name} to help me complete a relevant task."
    return (
        "interface:\n"
        f"  display_name: {quote_yaml(title)}\n"
        f"  short_description: {quote_yaml(short)}\n"
        f"  default_prompt: {quote_yaml(prompt)}\n"
    )


def codex_preamble() -> str:
    return (
        "## Codex compatibility\n\n"
        "Use the tools available in the current Codex environment. Treat Hermes-specific "
        "tool names as capability labels and map them to the closest available Codex tool. "
        "When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory "
        "containing this `SKILL.md`; do not assume that environment variable exists. "
        "Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream "
        "workflow unless it conflicts with higher-priority instructions.\n"
    )


def strip_first_heading(body: str) -> str:
    lines = body.splitlines()
    for index, line in enumerate(lines):
        if not line.strip():
            continue
        if line.startswith("# "):
            del lines[index]
        break
    return "\n".join(lines).lstrip()


def rewrite_moved_links(body: str, destination: Path) -> str:
    pattern = re.compile(r"(?P<prefix>\]\()(?P<target>[^)\s]+)")

    def replace(match: re.Match[str]) -> str:
        target = match.group("target")
        if target.startswith(("#", "/", "http://", "https://", "mailto:")):
            return match.group(0)
        path_part, marker, anchor = target.partition("#")
        if path_part and (destination / path_part).exists():
            suffix = f"#{anchor}" if marker else ""
            return f"](../{path_part}{suffix}"
        return match.group(0)

    return pattern.sub(replace, body)


def make_skill_md(
    destination: Path,
    name: str,
    title: str,
    description: str,
    original_body: str,
) -> tuple[str, bool]:
    frontmatter = yaml.safe_dump(
        {"name": name, "description": description},
        allow_unicode=True,
        sort_keys=False,
        width=1000,
    )
    header = f"---\n{frontmatter}---\n\n# {title}\n\n"
    body = strip_first_heading(original_body)
    full = header + codex_preamble() + "\n" + body.rstrip() + "\n"
    if len(full.splitlines()) <= 500:
        return full, False

    references = destination / "references"
    references.mkdir(parents=True, exist_ok=True)
    guide_path = references / "upstream-guide.md"
    moved_body = rewrite_moved_links(original_body.rstrip(), destination)
    guide_path.write_text(
        f"# {title} upstream guide\n\n{moved_body}\n",
        encoding="utf-8",
    )
    compact = (
        header
        + codex_preamble()
        + "\n## Required procedure\n\n"
        + "1. Read [the complete upstream guide](references/upstream-guide.md) before acting.\n"
        + "2. Follow the guide's domain workflow and use bundled scripts, references, templates, and assets as directed.\n"
        + "3. Verify the result using the checks defined in the guide; do not claim success from command acceptance alone.\n"
    )
    return compact, True


def iter_source_skills(source: Path) -> list[tuple[str, Path, Path]]:
    result: list[tuple[str, Path, Path]] = []
    for collection in ("skills", "optional-skills"):
        root = source / collection
        if not root.is_dir():
            raise ValueError(f"Missing Hermes directory: {root}")
        for skill_md in sorted(root.rglob("SKILL.md")):
            result.append((collection, skill_md.parent, skill_md))
    return result


def import_skills(source: Path, target: Path, updated_at: str) -> None:
    source = source.resolve()
    target = target.resolve()
    skills_root = target / "skills"
    if not (target / "scripts/validate-skills.mjs").exists():
        raise ValueError(f"Target is not a VSIX skills repository: {target}")

    zh_descriptions = parse_zh_catalog(source)
    source_skills = iter_source_skills(source)
    records: list[dict[str, Any]] = []
    names: set[str] = set()

    for collection, skill_dir, skill_md in source_skills:
        metadata, body = split_frontmatter(skill_md.read_text(encoding="utf-8"), skill_md)
        original_name = metadata.get("name")
        if not isinstance(original_name, str):
            raise ValueError(f"Missing string name: {skill_md}")
        name = normalize_name(original_name)
        if name in names:
            raise ValueError(f"Duplicate normalized skill name: {name}")
        names.add(name)

        relative = skill_dir.relative_to(source)
        parts = relative.parts
        source_category = parts[1] if len(parts) > 2 else "other"
        if collection == "skills" and len(parts) == 2:
            source_category = "other"

        title_value = metadata.get("title")
        title = title_value.strip() if isinstance(title_value, str) else display_name(name)
        description = clean_description(metadata.get("description"), name)
        description_zh = zh_descriptions.get(
            name,
            f"用于 {title} 相关任务的 Codex 技能，适合需要对应专业工作流或工具指导时使用。",
        )
        category = skill_category(source_category, name)
        destination = skills_root / name

        records.append(
            {
                "collection": collection,
                "source_dir": skill_dir,
                "relative": relative,
                "metadata": metadata,
                "body": body,
                "name": name,
                "original_name": original_name,
                "title": title,
                "description": description,
                "description_zh": description_zh,
                "category": category,
                "destination": destination,
            }
        )

    staging = target / ".hermes-skill-import"
    if staging.exists():
        shutil.rmtree(staging)
    staging.mkdir()

    long_count = 0
    try:
        for record in records:
            destination = staging / record["name"]
            shutil.copytree(
                record["source_dir"],
                destination,
                ignore=shutil.ignore_patterns(".env", ".git", "node_modules", ".DS_Store"),
            )
            skill_text, was_split = make_skill_md(
                destination,
                record["name"],
                record["title"],
                record["description"],
                record["body"],
            )
            long_count += int(was_split)

            root_readme = destination / "README.md"
            if root_readme.exists():
                references = destination / "references"
                references.mkdir(exist_ok=True)
                readme_text = rewrite_moved_links(
                    root_readme.read_text(encoding="utf-8"),
                    destination,
                )
                (references / "upstream-readme.md").write_text(
                    readme_text,
                    encoding="utf-8",
                )
                root_readme.unlink()
                skill_text = skill_text.rstrip() + (
                    "\n\n## Additional upstream documentation\n\n"
                    "Read [the additional upstream documentation]"
                    "(references/upstream-readme.md) when setup or background details "
                    "are needed.\n"
                )
            (destination / "SKILL.md").write_text(skill_text, encoding="utf-8")

            agents = destination / "agents"
            agents.mkdir(exist_ok=True)
            (agents / "openai.yaml").write_text(
                make_openai_yaml(record["name"], record["title"]),
                encoding="utf-8",
            )

            source_url = f"{REPO_URL}/tree/main/{record['relative'].as_posix()}"
            manifest: dict[str, Any] = {
                "id": record["name"],
                "title": record["title"],
                "descriptionZh": record["description_zh"],
                "type": "codex-skill",
                "category": record["category"],
                "prerequisites": collect_prerequisites(record["metadata"]),
                "sourceUrl": source_url,
                "homepage": REPO_URL,
                "license": str(record["metadata"].get("license") or "MIT"),
                "author": stringify_author(
                    record["metadata"].get("author")
                    or record["metadata"].get("authors")
                ),
                "status": "recommended" if record["collection"] == "skills" else "experimental",
                "updatedAt": updated_at,
            }
            (destination / "skill.json").write_text(
                json.dumps(manifest, ensure_ascii=False, indent=2) + "\n",
                encoding="utf-8",
            )

        for record in records:
            current = record["destination"]
            if current.exists():
                manifest = current / "skill.json"
                if not manifest.exists():
                    raise ValueError(f"Refusing to replace non-imported directory: {current}")
                existing = json.loads(manifest.read_text(encoding="utf-8"))
                if not str(existing.get("sourceUrl", "")).startswith(REPO_URL):
                    raise ValueError(f"Refusing to replace non-Hermes skill: {current}")
                shutil.rmtree(current)
            shutil.move(str(staging / record["name"]), current)
    finally:
        if staging.exists():
            shutil.rmtree(staging)

    print(
        f"Imported {len(records)} skills "
        f"({sum(r['collection'] == 'skills' for r in records)} bundled, "
        f"{sum(r['collection'] == 'optional-skills' for r in records)} optional); "
        f"split {long_count} long guides"
    )


def main() -> int:
    args = parse_args()
    try:
        import_skills(args.source, args.target, args.updated_at)
    except (OSError, ValueError, json.JSONDecodeError, yaml.YAMLError) as error:
        print(f"ERROR: {error}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
