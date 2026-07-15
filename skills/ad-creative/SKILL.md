---
name: ad-creative
description: Generate and iterate ad creative including headlines, descriptions, and primary text. Useful for paid social and search ad iteration. Use when Codex needs to perform Ad Creative tasks, or when the user explicitly mentions ad-creative.
---

# Ad Creative

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

> Curated from Corey Haines.

## What it does

Generate and iterate ad creative including headlines, descriptions, and primary text. Useful for paid social and search ad iteration.

## Source

- Upstream: https://github.com/coreyhaines31/marketingskills
- Category: `marketing-creative`

## How to use

This catalogue entry advertises the skill in Open Design so the agent
discovers it during planning. To run the full upstream workflow with
its original assets, scripts, and references, install the upstream
bundle into your active agent's skills directory:

```bash
# Inspect the upstream README for exact paths
open https://github.com/coreyhaines31/marketingskills
```

Then ask the agent to invoke this skill by name (`ad-creative`) or with
one of the trigger phrases listed in this skill's frontmatter.
