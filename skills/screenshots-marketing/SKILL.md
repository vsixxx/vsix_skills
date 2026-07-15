---
name: screenshots-marketing
description: Generate marketing screenshots with Playwright. Useful for landing-page hero shots, App Store screenshots, and changelog visuals. Use when Codex needs to perform Screenshots Marketing tasks, or when the user explicitly mentions screenshots-marketing.
---

# Screenshots Marketing

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

> Curated from @Shpigford.

## What it does

Generate marketing screenshots with Playwright. Useful for landing-page hero shots, App Store screenshots, and changelog visuals.

## Source

- Upstream: https://github.com/Shpigford/screenshots
- Category: `screenshots`

## How to use

This catalogue entry advertises the skill in Open Design so the agent
discovers it during planning. To run the full upstream workflow with
its original assets, scripts, and references, install the upstream
bundle into your active agent's skills directory:

```bash
# Inspect the upstream README for exact paths
open https://github.com/Shpigford/screenshots
```

Then ask the agent to invoke this skill by name (`screenshots-marketing`) or with
one of the trigger phrases listed in this skill's frontmatter.
