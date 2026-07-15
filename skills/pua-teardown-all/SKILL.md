---
name: pua-teardown-all
description: PUA teardown alias for Codex. Codex subcommand mapping for Claude Code /pua:teardown-all style usage; invoke with $pua-teardown-all. Use when Codex needs to perform Pua Teardown All tasks, or when the user explicitly mentions pua-teardown-all.
---

# Pua Teardown All

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

This is a Codex CLI alias for the Claude Code `/pua:teardown-all` command.

Release all active PUA agent state and loop state according to the teardown protocol. Explain destructive cleanup before deleting files.

When this alias changes `~/.pua/config.json`, preserve unknown fields and create `~/.pua/` if missing. Do not claim completion without command/output evidence.
