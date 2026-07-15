---
name: video-template-frame-warm-grain
description: Use this plugin when the user wants a "Warm Grain" HyperFrames motion video — Cream aesthetic with grain texture Use when Codex needs to perform Video Template Frame Warm Grain tasks, or when the user explicitly mentions video-template-frame-warm-grain.
---

# Video Template Frame Warm Grain

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

Cream aesthetic with grain texture

## What this template is

A HyperFrames-ready HTML + CSS + GSAP motion composition, bundled under `source/`. It renders deterministically to MP4 / WEBM at 16:9, default 10s, 30fps.

**Best for:** Product launch · Lifestyle brand · Magazine-style intro

## Workflow

1. Read `source/index.html` to understand the named layers and the animation timeline.
2. Replace the sample copy (headlines, figures, labels) with the user's real content; keep the motion timing and visual signature intact.
3. Keep the composition self-contained under `source/`; do not introduce external network assets that would break a headless render.
4. Render to MP4 via the html-video / HyperFrames renderer.

## Attribution

Source: html-video `templates/frame-warm-grain` (license Apache-2.0). Forked from heygen-com / Hyperframes — https://github.com/heygen-com/hyperframes/tree/main/registry/examples/warm-grain.
