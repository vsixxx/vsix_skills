# VSIX Skills

VSIX Skills is the public source library for skills listed on `https://vsix.cc/skills/`.

This repository stores source skill folders and is also the source for the VSIX Codex plugin marketplace. Do not put generated ZIP packages, catalog files, bare Git repositories, or deployment outputs here.

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

plugins/
  <plugin-id>/
    .codex-plugin/
      plugin.json
    skills/
    scripts/
    assets/
    references/
    templates/

catalog/plugins/
  <plugin-id>.json

.agents/plugins/
  marketplace.json
```

Each folder under `skills/` is one distributable skill. The folder name is the stable `skill-id`.

`skills/.gitkeep` only keeps the empty directory in Git. Ignore it when adding real skills.

Each folder under `plugins/` is one complete Codex plugin. Keep workflows that share routing, context, scripts, templates, or lifecycle rules together as a plugin instead of publishing their internal skills separately.

`.agents/plugins/marketplace.json` is the Codex marketplace manifest. Every plugin directory must have exactly one matching marketplace entry whose source path is `./plugins/<plugin-id>`.

`catalog/plugins/<plugin-id>.json` contains public site and Finder metadata that does not belong in the Codex plugin manifest. It is not included in the installed plugin. Every plugin must have exactly one matching catalog file, and Skill and plugin ids must not collide.

The production publisher exposes a read-only Git mirror at `https://vsix.cc/marketplace/vsix-skills.git`. Generated Git objects and release directories do not belong in this repository.

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
  "category": "开发与代码",
  "requirements": {
    "user": {
      "systems": [],
      "software": [],
      "auth": [],
      "services": [],
      "hardware": [],
      "resources": [],
      "notes": []
    },
    "agent": {
      "tools": [],
      "packages": []
    }
  },
  "sourceUrl": "https://github.com/vsixcc/vsix-skills/tree/main/skills/example-skill"
}
```

Rules:

- `id` must match the folder name.
- `descriptionZh` should be concise Chinese copy for public users.
- `requirements` must contain the exact `user` and `agent` objects shown above.
- Leave a requirement field as an empty array when it does not apply.
- Put requirements that need user action in `requirements.user`. The site displays these as “开始前确认”:
  - `systems` - supported systems, such as `macOS` or `Linux`.
  - `software` - desktop apps, licensed software, or other software the user must install or configure manually.
  - `auth` - API keys, tokens, OAuth login, or account credentials the user must provide.
  - `services` - local or remote services the user must start, configure, or obtain access to.
  - `hardware` - required or recommended hardware.
  - `resources` - local files, model weights, workspaces, vault paths, or datasets the user must prepare.
  - `notes` - short user-facing setup notes that do not fit the fields above.
- Put dependencies the agent can detect and install in `requirements.agent`. The site does not display these:
  - `tools` - command-line tools and runtimes.
  - `packages` - language packages and installable libraries.
- Do not put an automatically installable command-line dependency in `requirements.user.software`.
- Do not add generic requirements like "needs an agent that supports skills".
- Do not add a separate `requiresApiKey` field. API keys belong in `requirements.user.auth`.

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

- `内容创作`
- `图片与设计`
- `视频与音频`
- `办公与文档`
- `研究与知识`
- `商业与金融`
- `网页与前端`
- `开发与代码`
- `自动化与工作流`
- `部署与运维`
- `测试与安全`
- `其他`

Choose the category by the user's primary goal:

- Classify the complete task, not the implementation technology or file extension.
- Use `内容创作` when visuals are part of producing an article, comic, tutorial, social post, or other publishable content.
- Use `图片与设计` when the primary result is a standalone visual asset, diagram, image, 3D scene, or design artifact.
- Prefer a specific business domain when it defines the task. Financial models belong in `商业与金融`, not `办公与文档`.
- Keep exactly one primary category. Do not emulate categories with tags.
- Classify platform skills by the task they help complete. Do not create categories from vendor or product names.

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

The validator also checks the marketplace manifest and every plugin under `plugins/`. A plugin must include `.codex-plugin/plugin.json`, a matching manifest name, and at least one internal `skills/<skill-id>/SKILL.md`.

Plugin catalog files use the same `title`, `descriptionZh`, `category`, `requirements`, `sourceUrl`, and optional public metadata rules as `skill.json`, but omit `type`. Distribution fields are generated from the plugin manifest and Marketplace entry; do not write them manually.

## Packaging

The production catalog automation reads `skills/*/skill.json`, validates each folder, and packages each skill as:

```text
/skills/packages/<skill-id>.zip
/skills/packages/<skill-id>.sha256
```

The public catalog is generated as:

```text
/skills/catalog/skills.json
/skills/api/v1/catalog.json
```

Do not create these files manually in this repository.
