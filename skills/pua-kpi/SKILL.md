---
name: pua-kpi
description: PUA KPI alias for Codex. Codex subcommand mapping for Claude Code /pua:kpi style usage; invoke with $pua-kpi. Use when Codex needs to perform Pua Kpi tasks, or when the user explicitly mentions pua-kpi.
---

# Pua Kpi

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

This is a Codex CLI alias for the Claude Code `/pua:kpi` command.

Load pua-pro and generate the KPI/performance report card.

When this alias changes `~/.pua/config.json`, preserve unknown fields and create `~/.pua/` if missing. Do not claim completion without command/output evidence.
