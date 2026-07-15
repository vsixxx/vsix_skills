---
name: figma-generate-design
description: Build or update screens in Figma from code or description using design system components. Translate app pages into Figma using design tokens. Use when Codex needs to perform Figma Generate Design tasks, or when the user explicitly mentions figma-generate-design.
---

# Figma Generate Design

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

> Curated from Figma's MCP server guide.

## What it does

Build or update screens in Figma from code or description using design system components. Translate app pages into Figma using design tokens.

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

Then ask the agent to invoke this skill by name (`figma-generate-design`) or with
one of the trigger phrases listed in this skill's frontmatter.
