---
name: version
description: The version of Remotion we are working on. Use when Codex needs to perform Version tasks, or when the user explicitly mentions version.
---

# Version

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

We are working on the next version of Remotion.  
The current version can be found in `packages/core/src/version.ts`.
The next version is going to be a patch version.

Ensure the docs correctly reference the next version.
