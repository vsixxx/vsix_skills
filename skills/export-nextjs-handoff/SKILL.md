---
name: export-nextjs-handoff
description: Use this plugin when the user wants an accepted Open Design artifact converted into a Next.js App Router handoff with clean components, styles, assets, and implementation notes. Use when Codex needs to perform Export Nextjs Handoff tasks, or when the user explicitly mentions export-nextjs-handoff.
---

# Export Nextjs Handoff

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

## Workflow

1. Read the accepted artifact and identify components, assets, layout tokens, and interactions.
2. Generate a Next.js App Router folder with page, component, and style boundaries.
3. Preserve visual fidelity while using maintainable component names and accessible markup.
4. Run available typecheck or build commands when a package is present.
5. Return a diff summary and handoff notes.

## Output Contract

Produce `nextjs-handoff/` and `handoff-summary.md`.
