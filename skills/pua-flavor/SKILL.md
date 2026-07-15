---
name: pua-flavor
description: PUA flavor alias for Codex. Codex subcommand mapping for Claude Code /pua:flavor style usage; invoke with $pua-flavor. Use when Codex needs to perform Pua Flavor tasks, or when the user explicitly mentions pua-flavor.
---

# Pua Flavor

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

This is a Codex CLI alias for the Claude Code `/pua:flavor` command.

Read the flavor reference and help the user choose/set a flavor in ~/.pua/config.json without overwriting unrelated fields.

When this alias changes `~/.pua/config.json`, preserve unknown fields and create `~/.pua/` if missing. Do not claim completion without command/output evidence.
