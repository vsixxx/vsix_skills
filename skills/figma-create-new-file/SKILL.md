---
name: figma-create-new-file
description: Create a new blank Figma Design or FigJam file. Useful as the first step in scripted design-system or workshop workflows. Use when Codex needs to perform Figma Create New File tasks, or when the user explicitly mentions figma-create-new-file.
---

# Figma Create New File

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

> Curated from Figma's MCP server guide.

## What it does

Create a new blank Figma Design or FigJam file. Useful as the first step in scripted design-system or workshop workflows.

## Source

- Upstream: https://github.com/figma/skills
- Category: `figma`

## How to use

This catalogue entry advertises the skill in Open Design so the agent
discovers it during planning. To run the full upstream workflow with
its original assets, scripts, and references, install the upstream
bundle into your active agent's skills directory:

```bash
# Inspect the upstream README for exact paths
open https://github.com/figma/skills
```

Then ask the agent to invoke this skill by name (`figma-create-new-file`) or with
one of the trigger phrases listed in this skill's frontmatter.
