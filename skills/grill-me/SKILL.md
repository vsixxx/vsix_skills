---
name: grill-me
description: A relentless interview to sharpen a plan or design. Use when Codex needs to perform Grill Me tasks, or when the user explicitly mentions grill-me.
---

# Grill Me

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

Run a `/grilling` session.
