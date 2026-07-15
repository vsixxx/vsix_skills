---
name: pua-p9
description: PUA P9 alias for Codex. Codex subcommand mapping for Claude Code /pua:p9 style usage; invoke with $pua-p9. Use when Codex needs to perform Pua P9 tasks, or when the user explicitly mentions pua-p9.
---

# Pua P9

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

This is a Codex CLI alias for the Claude Code `/pua:p9` command.

Load and follow the p9 skill/protocol. Operate as a P9 tech lead: write task prompts, manage P8 execution, and do not personally implement code unless explicitly reassigned.

When this alias changes `~/.pua/config.json`, preserve unknown fields and create `~/.pua/` if missing. Do not claim completion without command/output evidence.
