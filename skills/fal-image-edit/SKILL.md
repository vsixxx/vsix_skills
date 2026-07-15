---
name: fal-image-edit
description: AI-powered image editing with style transfer, background removal, object removal, and inpainting via fal.ai hosted models. Use when Codex needs to perform Fal Image Edit tasks, or when the user explicitly mentions fal-image-edit.
---

# Fal Image Edit

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

> Curated from the fal.ai community team.

## What it does

AI-powered image editing with style transfer, background removal, object removal, and inpainting via fal.ai hosted models.

## Source

- Upstream: https://github.com/fal-ai-community/skills
- Category: `image-generation`

## How to use

This catalogue entry advertises the skill in Open Design so the agent
discovers it during planning. To run the full upstream workflow with
its original assets, scripts, and references, install the upstream
bundle into your active agent's skills directory:

```bash
# Inspect the upstream README for exact paths
open https://github.com/fal-ai-community/skills
```

Then ask the agent to invoke this skill by name (`fal-image-edit`) or with
one of the trigger phrases listed in this skill's frontmatter.
