---
name: pua-on
description: PUA on alias for Codex. Codex subcommand mapping for Claude Code /pua:on style usage; invoke with $pua-on. Use when Codex needs to perform Pua On tasks, or when the user explicitly mentions pua-on.
---

# Pua On

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

This is a Codex CLI alias for the Claude Code `/pua:on` command.

Enable PUA always-on mode by preserving ~/.pua/config.json and setting always_on=true. If feedback_frequency is 0, restore it to 5. Then report [PUA ON].

When this alias changes `~/.pua/config.json`, preserve unknown fields and create `~/.pua/` if missing. Do not claim completion without command/output evidence.
