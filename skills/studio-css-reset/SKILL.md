---
name: studio-css-reset
description: Guidance for Remotion Studio UI changes where the global CSS reset affects nested elements. Use when editing packages/studio UI, especially when adding wrapper spans, inline icons, labels, buttons, compact rows, or any nested text whose typography, color, sizing, or truncation must stay stable.
---

# Studio Css Reset

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

Remotion Studio applies a broad CSS reset to UI elements. Treat every new nested element as reset-styled unless the local component gives it explicit visual styles.

When changing Studio UI:

- Do not rely on a parent button or container for visible child text styles. Give wrapper spans or divs explicit `fontFamily`, `fontSize`, `lineHeight`, and either `color` or `color: 'inherit'`.
- Preserve compact-row layout when introducing icon-plus-label markup. Use fixed icon dimensions, `flexShrink: 0`, and explicit label truncation styles such as `minWidth`, `overflow`, `textOverflow`, and `whiteSpace`.
- Recheck hover and non-hover states after adding wrappers. The label should not grow, change row height, lose ellipsis, or change color unexpectedly.
- Prefer fixing the shared Studio component once when the reset issue appears in a repeated row pattern.

For Studio code changes, run at least the focused Studio checks:

```bash
bunx turbo run make --filter='@remotion/studio'
bunx turbo run lint test --filter='@remotion/studio'
```
