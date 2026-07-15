---
name: pua-survey
description: PUA survey alias for Codex. Codex subcommand mapping for Claude Code /pua:survey style usage; invoke with $pua-survey. Use when Codex needs to perform Pua Survey tasks, or when the user explicitly mentions pua-survey.
---

# Pua Survey

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

This is a Codex CLI alias for the Claude Code `/pua:survey` command.

Guide the user through the PUA survey and save the local response. Ask before any upload.

When this alias changes `~/.pua/config.json`, preserve unknown fields and create `~/.pua/` if missing. Do not claim completion without command/output evidence.
