---
name: pua-team-status
description: PUA team status alias for Codex. Codex subcommand mapping for Claude Code /pua:team-status style usage; invoke with $pua-team-status. Use when Codex needs to perform Pua Team Status tasks, or when the user explicitly mentions pua-team-status.
---

# Pua Team Status

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

This is a Codex CLI alias for the Claude Code `/pua:team-status` command.

List current active PUA agent/team state, PID/TTL when available, and stale records.

When this alias changes `~/.pua/config.json`, preserve unknown fields and create `~/.pua/` if missing. Do not claim completion without command/output evidence.
