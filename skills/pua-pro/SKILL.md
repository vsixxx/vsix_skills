---
name: pua-pro
description: PUA Pro alias for Codex. Codex subcommand mapping for Claude Code /pua:pro style usage; invoke with $pua-pro. Use when Codex needs to perform Pua Pro tasks, or when the user explicitly mentions pua-pro.
---

# Pua Pro

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

This is a Codex CLI alias for the Claude Code `/pua:pro` command.

Load and follow the pro skill/protocol for self-evolution, platform telemetry, KPI, and config commands.

When this alias changes `~/.pua/config.json`, preserve unknown fields and create `~/.pua/` if missing. Do not claim completion without command/output evidence.
