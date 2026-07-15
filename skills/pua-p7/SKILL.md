---
name: pua-p7
description: PUA P7 alias for Codex. Codex subcommand mapping for Claude Code /pua:p7 style usage; invoke with $pua-p7. Use when Codex needs to perform Pua P7 tasks, or when the user explicitly mentions pua-p7.
---

# Pua P7

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

This is a Codex CLI alias for the Claude Code `/pua:p7` command.

Load and follow the p7 skill/protocol. Operate as a P7 senior engineer: plan, implement, self-review with three questions, and deliver [P7-COMPLETION].

When this alias changes `~/.pua/config.json`, preserve unknown fields and create `~/.pua/` if missing. Do not claim completion without command/output evidence.
