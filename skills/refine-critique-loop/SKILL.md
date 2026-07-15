---
name: refine-critique-loop
description: Use this plugin when the user has an existing Open Design artifact and wants targeted critique, patching, brand tightening, responsive fixes, or quality improvement without starting over. Use when Codex needs to perform Refine Critique Loop tasks, or when the user explicitly mentions refine-critique-loop.
---

# Refine Critique Loop

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

## Workflow

1. Read the existing artifact and identify the user's refinement goal.
2. Run a structured critique for hierarchy, fit, accessibility, responsiveness, and artifact-specific quality.
3. Apply the smallest useful patch.
4. Re-run critique and stop when quality converges or the iteration limit is reached.
5. Return a diff summary and what changed.

## Output Contract

Patch the existing artifact and produce `refine-summary.md`.
