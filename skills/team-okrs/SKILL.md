---
name: team-okrs
description: OKR tracker page — quarter banner, three objectives with their key results as progress bars, owner avatars, status pills, and a "this quarter at a glance" sidebar. Use when the brief mentions "OKRs", "key results", "objectives", or "目标".
---

# Team Okrs

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

Produce a single-screen OKR tracker.

## Workflow

1. Read DESIGN.md.
2. Layout:
   - Quarter banner: Q4 FY25, dates, overall progress chip.
   - Three objective cards. Each has:
     - Objective title + owner avatar + status pill (On track / At risk / Off track)
     - 3 key results, each a row with metric / current → target / progress bar
   - Right sidebar: at-a-glance KPIs, top movers, blockers callout.
3. Clear progress visualisation, calm palette, one accent.

## Output contract

```
<artifact identifier="okr-q4" type="text/html" title="OKRs Q4">
<!doctype html>...</artifact>
```
