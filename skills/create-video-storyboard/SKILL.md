---
name: create-video-storyboard
description: Use this plugin when the user wants a video concept, storyboard, shot list, prompt pack, or render-ready motion brief for a product, campaign, or explainer. Use when Codex needs to perform Create Video Storyboard tasks, or when the user explicitly mentions create-video-storyboard.
---

# Create Video Storyboard

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

## Workflow

1. Clarify duration, audience, platform, visual style, and call to action.
2. Create a scene-by-scene beat sheet with timings.
3. Generate a storyboard prompt pack and optional video generation prompt.
4. Save a shot list with motion, camera, typography, and audio notes.
5. Critique for pacing, clarity, and whether each shot can be produced.

## Output Contract

Produce `storyboard.md` and any generated video prompt or media asset.
