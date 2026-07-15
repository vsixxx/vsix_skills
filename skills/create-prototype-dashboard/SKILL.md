---
name: create-prototype-dashboard
description: Create a polished operations dashboard prototype with dense KPIs, status tables, and a focused command-center layout. Use when Codex needs to perform Create Prototype Dashboard tasks, or when the user explicitly mentions create-prototype-dashboard.
---

# Create Prototype Dashboard

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

Use this plugin when the user wants a realistic product, operations, or customer-success dashboard prototype.

## Workflow

1. Identify the operator role, the key decisions they need to make, and the time window.
2. Build a single-file HTML artifact with a persistent navigation rail, KPI row, primary chart area, and action table.
3. Use real-looking labels and numbers instead of placeholders.
4. Check that the layout works at laptop width and that tables remain readable.
5. Return `index.html` as the primary artifact.

## Quality Checks

- The dashboard is useful for scanning and repeated work.
- The main action table has status, owner, priority, and next step columns.
- Text stays inside compact controls and cards.
- No external network assets are required.

## Additional upstream documentation

Read [the additional upstream documentation](references/upstream-readme.md) when setup or background details are needed.
