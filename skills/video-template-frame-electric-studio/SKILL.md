---
name: video-template-frame-electric-studio
description: Use this plugin when the user wants a "Electric Studio Frame" HyperFrames motion video — Two-panel split with quote as hero — white/blue panels open from center, accent bar grows, quote reveals line by line. Use when Codex needs to perform Video Template Frame Electric Studio tasks, or when the user explicitly mentions video-template-frame-electric-studio.
---

# Video Template Frame Electric Studio

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

Two-panel split with quote as hero — white/blue panels open from center, accent bar grows, quote reveals line by line.

## What this template is

A HyperFrames-ready HTML + CSS + GSAP motion composition, bundled under `source/`. It renders deterministically to MP4 / WEBM at 16:9, 1:1, default 15s, 60fps.

**Best for:** Pull-quote / testimonial reveal · Mission statement card · Clean high-contrast title

## Workflow

1. Read `source/index.html` to understand the named layers and the animation timeline.
2. Replace the sample copy (headlines, figures, labels) with the user's real content; keep the motion timing and visual signature intact.
3. Keep the composition self-contained under `source/`; do not introduce external network assets that would break a headless render.
4. Render to MP4 via the html-video / HyperFrames renderer.

## Attribution

Source: html-video `templates/frame-electric-studio` (license Apache-2.0). Derived from frontend-slides (Zara Zhang, MIT) — https://github.com/zarazhangrui/frontend-slides.
