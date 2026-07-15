---
name: pua-offline
description: PUA offline alias for Codex. Codex subcommand mapping for Claude Code /pua:offline style usage; invoke with $pua-offline. Use when Codex needs to perform Pua Offline tasks, or when the user explicitly mentions pua-offline.
---

# Pua Offline

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

This is a Codex CLI alias for the Claude Code `/pua:offline` command.

Enable offline mode by setting ~/.pua/config.json offline=true and feedback_frequency=0 while preserving other fields. Then report [PUA OFFLINE].

When this alias changes `~/.pua/config.json`, preserve unknown fields and create `~/.pua/` if missing. Do not claim completion without command/output evidence.
