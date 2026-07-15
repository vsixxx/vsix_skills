---
name: wpds
description: WordPress Design System. Apply WordPress's official design tokens, typography, and component patterns to themes and sites. Use when Codex needs to perform Wpds tasks, or when the user explicitly mentions wpds.
---

# Wpds

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

> Curated from the WordPress development team.

## What it does

WordPress Design System. Apply WordPress's official design tokens, typography, and component patterns to themes and sites.

## Source

- Upstream: https://github.com/WordPress/skills
- Category: `design-systems`

## How to use

This catalogue entry advertises the skill in Open Design so the agent
discovers it during planning. To run the full upstream workflow with
its original assets, scripts, and references, install the upstream
bundle into your active agent's skills directory:

```bash
# Inspect the upstream README for exact paths
open https://github.com/WordPress/skills
```

Then ask the agent to invoke this skill by name (`wpds`) or with
one of the trigger phrases listed in this skill's frontmatter.
