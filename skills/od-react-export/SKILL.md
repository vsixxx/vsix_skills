---
name: od-react-export
description: Export To React Use when Codex needs to perform Od React Export tasks, or when the user explicitly mentions od-react-export.
---

# Od React Export

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

Use this plugin when the user wants to hand an accepted Open Design artifact to a React app.

## Workflow

1. Inspect the current artifact and identify the smallest React component boundary that preserves the design.
2. Produce React 18 + TypeScript code with clear props only for content or state that is likely to vary.
3. Prefer Tailwind CSS when the target project already supports it; otherwise keep styling local and easy to move.
4. Preserve accessibility semantics from the artifact, including headings, buttons, links, labels, focus states, and alt text.
5. Finish with file placement notes, required assets, and any assumptions about routing or data.

## Quality Bar

- Do not flatten the artifact into generic divs.
- Do not introduce a component library unless the target project already uses it.
- Keep generated props and variants minimal.
