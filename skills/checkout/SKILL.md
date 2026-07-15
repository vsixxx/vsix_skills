---
name: checkout
description: Checkout a requested branch or ref in the Remotion repo, then install dependencies and build. Use when the user asks to checkout a ref and prepare the workspace.
---

# Checkout

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

Checkout the user-provided ref, then run:

```bash
bun i
bun run build
```
