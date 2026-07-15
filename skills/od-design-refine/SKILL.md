---
name: od-design-refine
description: Design Refine Use when Codex needs to perform Od Design Refine tasks, or when the user explicitly mentions od-design-refine.
---

# Od Design Refine

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

Use this plugin when the user wants to improve an existing Open Design artifact rather than create a new one.

## Workflow

1. Inspect the current artifact and identify the highest-leverage refinement target.
2. Pick one direction before editing: clarity, hierarchy, polish, accessibility, responsiveness, or fidelity.
3. Make the smallest useful patch that advances that direction.
4. Critique the result against the active design system and the user's stated goal.
5. Stop when the patch is coherent, then summarize what changed and what should be checked next.

## Quality Bar

- Preserve the existing product intent.
- Prefer small reviewable patches over broad redesigns.
- Keep accessibility and responsive behavior intact.
- Do not introduce a new design language unless the user explicitly asks for one.
