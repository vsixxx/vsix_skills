---
name: open-design-gif-sticker-maker
description: Convert photos into animated GIF stickers in Funko Pop / Pop Mart style via the MiniMax API. Useful for personalized chat stickers and avatar packs. Use when Codex needs to perform Open Design Gif Sticker Maker tasks, or when the user explicitly mentions open-design-gif-sticker-maker.
---

# Open Design Gif Sticker Maker

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

> Curated from MiniMax AI team.

## What it does

Convert photos into animated GIF stickers in Funko Pop / Pop Mart style via the MiniMax API. Useful for personalized chat stickers and avatar packs.

## Source

- Upstream: https://github.com/MiniMax-AI/skills
- Category: `image-generation`

## How to use

This catalogue entry advertises the skill in Open Design so the agent
discovers it during planning. To run the full upstream workflow with
its original assets, scripts, and references, install the upstream
bundle into your active agent's skills directory:

```bash
# Inspect the upstream README for exact paths
open https://github.com/MiniMax-AI/skills
```

Then ask the agent to invoke this skill by name (`gif-sticker-maker`) or with
one of the trigger phrases listed in this skill's frontmatter.
