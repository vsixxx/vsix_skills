---
name: pua-off
description: PUA off alias for Codex. Codex subcommand mapping for Claude Code /pua:off style usage; invoke with $pua-off. Use when Codex needs to perform Pua Off tasks, or when the user explicitly mentions pua-off.
---

# Pua Off

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

This is a Codex CLI alias for the Claude Code `/pua:off` command.

Disable PUA always-on mode by setting ~/.pua/config.json always_on=false and feedback_frequency=0. Then report [PUA OFF].

When this alias changes `~/.pua/config.json`, preserve unknown fields and create `~/.pua/` if missing. Do not claim completion without command/output evidence.
