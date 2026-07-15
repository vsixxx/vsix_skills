---
name: video-template-frame-creative-voltage
description: Use this plugin when the user wants a "Creative Voltage Frame" HyperFrames motion video — Electric split with hand-drawn script — offset panels slide in, display title rises with an outlined word, script strokes itself in. Use when Codex needs to perform Video Template Frame Creative Voltage tasks, or when the user explicitly mentions video-template-frame-creative-voltage.
---

# Video Template Frame Creative Voltage

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

Electric split with hand-drawn script — offset panels slide in, display title rises with an outlined word, script strokes itself in.

## What this template is

A HyperFrames-ready HTML + CSS + GSAP motion composition, bundled under `source/`. It renders deterministically to MP4 / WEBM at 16:9, 1:1, default 15s, 60fps.

**Best for:** Energetic brand / campaign title · Creative reveal with a human, hand-drawn accent · Retro-modern hero

## Workflow

1. Read `source/index.html` to understand the named layers and the animation timeline.
2. Replace the sample copy (headlines, figures, labels) with the user's real content; keep the motion timing and visual signature intact.
3. Keep the composition self-contained under `source/`; do not introduce external network assets that would break a headless render.
4. Render to MP4 via the html-video / HyperFrames renderer.

## Attribution

Source: html-video `templates/frame-creative-voltage` (license Apache-2.0). Derived from frontend-slides (Zara Zhang, MIT) — https://github.com/zarazhangrui/frontend-slides.
