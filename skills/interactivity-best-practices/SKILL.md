---
name: interactivity-best-practices
description: Best practices for writing Remotion animations that stay intuitive for agents and editable in Remotion Studio Visual Mode. Use when Codex needs to perform Interactivity Best Practices tasks, or when the user explicitly mentions interactivity-best-practices.
---

# Interactivity Best Practices

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

Use the canonical interactivity best-practices page instead:
[packages/docs/docs/studio/interactivity-best-practices.mdx](../../../packages/docs/docs/studio/interactivity-best-practices.mdx)

To make an element or custom component interactive, use:
[packages/docs/docs/studio/make-component-interactive.mdx](../../../packages/docs/docs/studio/make-component-interactive.mdx)
