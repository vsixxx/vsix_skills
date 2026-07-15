---
name: formatting
description: Run Remotion formatting and style checks until they pass. Use when the user asks to fix formatting or run the formatting command.
---

# Formatting

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

Run `bun run stylecheck` until the exit code is 0.

Do not treat `lambda-go` errors as blocking.
