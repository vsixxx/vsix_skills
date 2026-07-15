---
name: skill-locations
description: Document Remotion skill placement. Use when adding, moving, or editing Remotion skills to decide whether a skill belongs in .agents/skills as an internal skill or packages/skills as a public skill.
---

# Skill Locations

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

Place internal agent-only skills in `.agents/skills/<skill-name>/SKILL.md`.

Place public, redistributable skills in `packages/skills/skills/<skill-name>/SKILL.md`.

When in doubt, ask whether the skill is internal or public before moving it between these roots.
