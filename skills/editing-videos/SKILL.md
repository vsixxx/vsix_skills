---
name: editing-videos
description: Video editing using Volcengine Track structure. Supports cutting, trimming, adding text, stickers, audio, filters, effects, transitions, multi-clip compositions, speed adjustment, watermark removal. 视频剪辑、裁剪视频、添加文字、添加水印、添加音频、视频滤镜、视频特效、视频转场、多片段拼接、调整速度、去水印。 Use when Codex needs to perform Editing Videos tasks, or when the user explicitly mentions editing-videos.
---

# Editing Videos

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

## Required procedure

1. Read [the complete upstream guide](references/upstream-guide.md) before acting.
2. Follow the guide's domain workflow and use bundled scripts, references, templates, and assets as directed.
3. Verify the result using the checks defined in the guide; do not claim success from command acceptance alone.
