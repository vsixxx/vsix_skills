---
name: d3-visualization
description: Teaches the agent to produce D3 charts and interactive data visualizations. A comprehensive D3.js skill with examples across chart types and techniques giving the agent expert-level knowledge to generate complex, interactive visualizations. Useful for editorial dashboards, reports, data-rich prototypes, and explanatory graphics. Use when Codex needs to perform D3 Visualization tasks, or when the user explicitly mentions d3-visualization.
---

# D3 Visualization

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

> Curated from @jiannanya.

## What it does

Teaches the agent to produce D3 charts and interactive data visualizations. A comprehensive D3.js skill with examples across chart types and techniques giving the agent expert-level knowledge to generate complex, interactive visualizations. Useful for editorial dashboards, reports, data-rich prototypes, and explanatory graphics.

## Source

- Upstream: https://github.com/jiannanya/snow-d3/
- Category: `diagrams`

## How to use

This catalogue entry advertises the skill in Open Design so the agent
discovers it during planning. To run the full upstream workflow with
its original assets, scripts, and reference documents, install the upstream
bundle into your active agent's skills directory:

```bash
# Inspect the upstream README for exact paths
open https://github.com/jiannanya/snow-d3/

# Clone or copy the snow-d3/ folder into your workspace's skills/ directory
git clone https://github.com/jiannanya/snow-d3.git skills/snow-d3

```

Then ask the agent to invoke this skill by name (`d3-visualization`) or with
one of the trigger phrases listed in this skill's frontmatter, e.g.:

> "Create a zoomable treemap for my sales data"
> "Build a force-directed network graph like example 07 but for my own dataset"
> "Generate a calendar heatmap in D3"
