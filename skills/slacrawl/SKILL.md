---
name: slacrawl
description: 'Slack archive: search, sync freshness, threads/DMs, SQL counts, and Slacrawl repo work. Use when Codex needs to perform Slacrawl tasks, or when the user explicitly mentions slacrawl.'
---

# Slacrawl

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

Use local Slack archive data first. Check freshness for recent/current questions:

```bash
slacrawl doctor
slacrawl status --json
```

Refresh only when stale or asked:

```bash
slacrawl sync --source desktop
slacrawl sync --source api --latest-only
```

Query with bounded slices:

```bash
slacrawl search --limit 20 "query"
slacrawl messages --since 7d --limit 50
slacrawl sql "select count(*) from messages;"
```

Report workspace/channel names, absolute date spans, counts, and token/source limits. Use read-only SQL for exact counts/rankings. API sync and full thread/DM hydration require Slack tokens; do not assume they exist.
