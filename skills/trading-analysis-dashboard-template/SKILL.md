---
name: trading-analysis-dashboard-template
description: Professional trading analysis dashboard template (single-file HTML) with light/dark theme switch, dense market panels, chart interactions, demo/live playback, and command palette behavior. Use when users ask for a Wall-Street-style analytics terminal, trading cockpit, or high-tech financial dashboard template with realistic data layout.
---

# Trading Analysis Dashboard Template

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

Produce a premium, data-dense, Wall-Street style trading dashboard as a self-contained HTML artifact.

## Resource map

```text
trading-analysis-dashboard-template/
├── SKILL.md
├── assets/
│   └── template.html
├── references/
│   └── checklist.md
└── example.html
```

## Workflow

1. Read active `DESIGN.md`, then map typography/color/layout into CSS variables.
2. Copy `assets/template.html` to `index.html`.
3. Personalize headings, instrument names, and numeric labels to the user brief.
4. Preserve interaction fidelity:
   - Light/Dark mode switch
   - Live/Demo mode
   - Chart hover crosshair and tooltip
   - Click-to-focus chart (floating modal style)
   - Keyboard command palette (`/`)
5. Keep output single-file HTML (inline CSS + inline JS, no framework dependency).
6. Keep placeholders honest (`—` or neutral labels) where real numbers are unknown.
7. Validate against `references/checklist.md` before emitting.

## Output contract

One sentence before artifact, then:

```xml
<artifact identifier="trading-analysis-dashboard" type="text/html" title="Trading Analysis Dashboard">
<!doctype html>
<html>...</html>
</artifact>
```
