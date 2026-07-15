---
name: remotion-interactivity
description: Best practices for writing Remotion animations that stay intuitive for agents and editable in Remotion Studio Visual Mode. Use when Codex needs to perform Remotion Interactivity tasks, or when the user explicitly mentions remotion-interactivity.
---

# Remotion Interactivity

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

Use the canonical interactivity best-practices page instead:
[Interactivity best practices](https://www.remotion.dev/docs/studio/interactivity-best-practices.md)

To make an element or custom component interactive, use:
[Make a component interactive](https://www.remotion.dev/docs/studio/make-component-interactive.md)
