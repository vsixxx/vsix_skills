---
name: create-slides-pitch
description: Create a concise HTML pitch deck for an early-stage product, with a strong narrative arc and finance-ready slide structure. Use when Codex needs to perform Create Slides Pitch tasks, or when the user explicitly mentions create-slides-pitch.
---

# Create Slides Pitch

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

Use this plugin when the user needs a seed or Series A pitch deck in HTML.

## Workflow

1. Ask only for missing company name, product promise, traction, and ask if they are absent.
2. Create 8 to 10 slides covering problem, insight, product, market, traction, model, team, and ask.
3. Keep every slide visually distinct but governed by one typography and color system.
4. Include speaker-friendly headlines, not paragraph-heavy pages.
5. Return `index.html` as the primary artifact.

## Quality Checks

- The deck can be read quickly in presentation mode.
- Numbers are formatted consistently and have labels.
- The ask slide names use of funds.
- Print/export styling does not hide slide content.
