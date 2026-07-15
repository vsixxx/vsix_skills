---
name: open-design-frontend-slides
description: Generate animation-rich HTML presentations with visual style previews. Useful for online keynotes, embedded talks, and interactive briefs. Use when Codex needs to perform Open Design Frontend Slides tasks, or when the user explicitly mentions open-design-frontend-slides.
---

# Open Design Frontend Slides

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

> Curated from @zarazhangrui.

## What it does

Generate animation-rich HTML presentations with visual style previews. Useful for online keynotes, embedded talks, and interactive briefs.

## Source

- Upstream: https://github.com/zarazhangrui/frontend-slides
- Category: `slides`

## How to use

This catalogue entry advertises the skill in Open Design so the agent
discovers it during planning. To run the full upstream workflow with
its original assets, scripts, and references, install the upstream
bundle into your active agent's skills directory:

```bash
# Inspect the upstream README for exact paths
open https://github.com/zarazhangrui/frontend-slides
```

Then ask the agent to invoke this skill by name (`frontend-slides`) or with
one of the trigger phrases listed in this skill's frontmatter.
