---
name: notcrawl
description: 'Notion archive: search, sync freshness, pages/databases, Markdown exports, SQL counts, and Notcrawl repo work. Use when Codex needs to perform Notcrawl tasks, or when the user explicitly mentions notcrawl.'
---

# Notcrawl

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

Use local Notion archive data before browsing or live Notion API calls. Check freshness for recent/current questions:

```bash
notcrawl doctor
notcrawl status --json
```

Refresh only when stale or asked:

```bash
notcrawl sync --source desktop
notcrawl sync --source api
```

Query with bounded reads:

```bash
notcrawl search "query"
notcrawl databases
notcrawl report
notcrawl sql "select count(*) from pages;"
```

Report workspace/teamspace, page/database titles, absolute date spans, counts, and known gaps. Use read-only SQL only; never mutate the archive. API mode requires `NOTION_TOKEN`; do not assume token availability.
