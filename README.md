# VSIX Skills

VSIX Skills is the public source library for skills listed on `https://vsix.cc/skills/`.

This repository stores source skill folders only. Do not put generated ZIP packages, catalog files, or deployment outputs here.

## Directory Structure

```text
skills/
  <skill-id>/
    SKILL.md
    skill.json
    scripts/
    assets/
    references/
    templates/
    examples/
    .env.example
```

Each folder under `skills/` is one distributable skill. The folder name is the stable `skill-id`.

`skills/.gitkeep` only keeps the empty directory in Git. Ignore it when adding real skills.

Required files:

- `SKILL.md` - agent-facing skill instructions.
- `skill.json` - public manifest for the catalog and packaging automation.

Optional files and folders:

- `README.md` - human-readable notes.
- `scripts/` - helper scripts used by the skill.
- `assets/` - images, templates, fixtures, or other bundled assets.
- `references/` - longer reference docs used by the skill.
- `templates/` - files intended to be copied or reused.
- `examples/` - examples and demo inputs/outputs.
- `.env.example` - placeholder environment variables only.

## `skill.json`

Required fields:

```json
{
  "id": "example-skill",
  "title": "Example Skill",
  "descriptionZh": "一句中文说明，告诉普通用户这个 skill 适合做什么。",
  "type": "agent-skill",
  "category": "开发辅助",
  "prerequisites": [],
  "sourceUrl": "https://github.com/vsixcc/vsix-skills/tree/main/skills/example-skill"
}
```

Rules:

- `id` must match the folder name.
- `descriptionZh` should be concise Chinese copy for public users.
- `prerequisites` must be an array. Leave it empty when there are no concrete extra requirements.
- Put concrete requirements in `prerequisites`, such as API keys, accounts, CLI tools, local runtimes, or paid services.
- Do not add generic requirements like "needs an agent that supports skills".
- Do not add a separate `requiresApiKey` field. API keys belong in `prerequisites`.

Optional fields:

```json
{
  "homepage": "https://example.com",
  "license": "MIT",
  "author": "Author Name",
  "status": "recommended",
  "updatedAt": "2026-07-14"
}
```

Allowed `type` values:

- `codex-skill`
- `agent-skill`
- `plugin-skill`
- `workflow-template`

Allowed `category` values:

- `写作与内容`
- `图片与视觉`
- `视频与动画`
- `文档与表格`
- `网页与前端`
- `部署与运维`
- `Cloudflare`
- `自动化与工作流`
- `知识库与模板`
- `开发辅助`
- `安全与验证`
- `其他`

Suggested `status` values:

- `recommended`
- `experimental`
- `archived`

## Security Rules

Never commit:

- Real `.env` files.
- Private tokens, API keys, cookies, or credentials.
- Raw customer data.
- Internal server paths or origin-only deployment details.
- `.git`, `node_modules`, `.DS_Store`, or generated build outputs inside a skill folder.

Use `.env.example` with placeholders when a skill needs environment variables.

## Validation

Run this before submitting changes:

```bash
node scripts/validate-skills.mjs
```

The GitHub Action runs the same validation on pull requests and pushes to `main`.

## Packaging

The site automation reads `skills/*/skill.json`, validates each folder, and packages each skill as:

```text
/skills/packages/<skill-id>.zip
/skills/packages/<skill-id>.sha256
```

The public catalog is generated as:

```text
/skills/catalog/skills.json
```

Do not create these files manually in this repository.
