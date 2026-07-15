# VSIX Skills

VSIX Skills is the public source library for skills listed on `https://vsix.cc/skills/`.
The repository currently contains 1,566 Codex-first skills. It includes 174 skills imported from
[`NousResearch/hermes-agent`](https://github.com/NousResearch/hermes-agent), 1,391 unique skills
collected from repositories in [`lilong-98/awesome-stars`](https://github.com/lilong-98/awesome-stars),
and locally maintained VSIX skills.

The imported skills are converted to Codex format first, while preserving upstream scripts,
references, assets, templates, examples, and provenance. Generated ZIP packages, catalog files,
checksums, and deployment output do not belong in this repository.

## Skill structure

```text
skills/
  <skill-id>/
    SKILL.md
    skill.json
    agents/
      openai.yaml
    scripts/
    assets/
    references/
    templates/
    examples/
    .env.example
```

Required files:

- `SKILL.md` - Codex-facing instructions. YAML frontmatter contains only `name` and `description`.
- `skill.json` - public catalog and packaging manifest.
- `agents/openai.yaml` - Codex UI metadata and a default invocation prompt.

Optional resource folders are copied only when the skill uses them. Long upstream `SKILL.md`
files are converted to a concise Codex entry point, with the complete guide stored at
`references/upstream-guide.md` for progressive disclosure.

## `skill.json`

Required fields:

```json
{
  "id": "example-skill",
  "title": "Example Skill",
  "descriptionZh": "一句中文说明，告诉普通用户这个 Skill 适合做什么。",
  "type": "codex-skill",
  "category": "开发辅助",
  "prerequisites": [],
  "sourceUrl": "https://github.com/owner/repo/tree/main/skills/example-skill"
}
```

Rules:

- `id`, the folder name, and the `SKILL.md` frontmatter name must match.
- IDs use lowercase letters, digits, and single hyphens, with a maximum length of 64 characters.
- `descriptionZh` is concise Chinese catalog copy.
- `prerequisites` contains concrete platform, command, package, credential, or environment needs.
- `sourceUrl` points to the exact upstream source directory.
- API keys belong in `prerequisites`; do not add a separate `requiresApiKey` field.

Optional fields used by this repository:

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

Allowed `status` values:

- `recommended`
- `experimental`
- `archived`

## Sync from Hermes Agent

Clone a current Hermes checkout outside this repository, then run the deterministic importer:

```bash
git clone --depth 1 https://github.com/NousResearch/hermes-agent.git /tmp/hermes-agent
uv run scripts/import-hermes-skills.py --source /tmp/hermes-agent
node scripts/validate-skills.mjs
```

The importer:

1. Discovers every `SKILL.md` under `skills/` and `optional-skills/`.
2. Normalizes names to Codex hyphen-case and rejects collisions.
3. Rewrites frontmatter to Codex `name` and trigger-oriented `description` fields only.
4. Adds Codex tool and sandbox compatibility guidance.
5. Preserves bundled resources and moves long instructions into `references/`.
6. Creates `agents/openai.yaml` and the public `skill.json` manifest.
7. Replaces only destinations already attributed to the Hermes Agent repository.

## Import skills found in Awesome Stars

The curated source snapshot is stored in `scripts/awesome-stars-skill-sources.json`. Import every
repository that contains a real `SKILL.md` with:

```bash
uv run scripts/import-awesome-stars-skills.py --cleanup-cache
node scripts/validate-skills.mjs
```

The importer shallow-clones one repository at a time, groups platform copies by the normalized
frontmatter name, skips exact cross-repository duplicates, namespaces genuine name collisions,
converts every selected skill to Codex format, and removes the temporary clone before continuing.
Existing Hermes skills are never replaced by this importer.

To inspect one source without writing skills:

```bash
uv run scripts/import-awesome-stars-skills.py \
  --inventory-only \
  --repo owner/repository
```

## Validation

Run before every submission:

```bash
node scripts/validate-skills.mjs
```

Validation covers the public manifest, Codex frontmatter, folder naming, the 500-line entry-point
limit, `agents/openai.yaml`, Chinese descriptions, source URLs, dependencies, and forbidden files.
The same command runs in GitHub Actions for pull requests and pushes to `main`.

## Install one skill in Codex

For local development, copy a complete skill folder into the Codex skills directory:

```bash
cp -R skills/<skill-id> "${CODEX_HOME:-$HOME/.codex}/skills/<skill-id>"
```

After the repository is pushed, the Codex skill installer can install directly from GitHub:

```bash
python3 "$HOME/.codex/skills/.system/skill-installer/scripts/install-skill-from-github.py" \
  --repo elideveli/vsix_skills \
  --path skills/<skill-id>
```

The newly installed skill is available to Codex on the next turn.

## Security

Never commit real `.env` files, tokens, API keys, cookies, credentials, raw customer data,
internal deployment paths, nested `.git` directories, `node_modules`, or generated build output.
Use `.env.example` with placeholders when a skill needs environment variables.

## Packaging

Site automation reads `skills/*/skill.json`, validates each folder, and generates:

```text
/skills/packages/<skill-id>.zip
/skills/packages/<skill-id>.sha256
/skills/catalog/skills.json
```

Do not create these files manually in this repository.
