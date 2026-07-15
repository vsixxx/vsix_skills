---
name: pua-cancel-loop
description: PUA cancel loop alias for Codex. Codex subcommand mapping for Claude Code /pua:cancel-loop style usage; invoke with $pua-cancel-loop. Use when Codex needs to perform Pua Cancel Loop tasks, or when the user explicitly mentions pua-cancel-loop.
---

# Pua Cancel Loop

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

This is a Codex CLI alias for the Claude Code `/pua:cancel-loop` command.

Cancel the active PUA loop by cleaning loop state/worktree references and recording the event.

When this alias changes `~/.pua/config.json`, preserve unknown fields and create `~/.pua/` if missing. Do not claim completion without command/output evidence.
