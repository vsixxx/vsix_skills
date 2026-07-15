---
name: video-template-frame-build-minimal
description: Use this plugin when the user wants a "Build Minimal Frame" HyperFrames motion video — Luxury-minimal whitespace hero — single word reveals letter by letter, warm-gold hairline, breathing indicators. Use when Codex needs to perform Video Template Frame Build Minimal tasks, or when the user explicitly mentions video-template-frame-build-minimal.
---

# Video Template Frame Build Minimal

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

Luxury-minimal whitespace hero — single word reveals letter by letter, warm-gold hairline, breathing indicators.

## What this template is

A HyperFrames-ready HTML + CSS + GSAP motion composition, bundled under `source/`. It renders deterministically to MP4 / WEBM at 16:9, 1:1, default 15s, 60fps.

**Best for:** Premium product / brand hero · Calm single-word statement · Elegant title card

## Workflow

1. Read `source/index.html` to understand the named layers and the animation timeline.
2. Replace the sample copy (headlines, figures, labels) with the user's real content; keep the motion timing and visual signature intact.
3. Keep the composition self-contained under `source/`; do not introduce external network assets that would break a headless render.
4. Render to MP4 via the html-video / HyperFrames renderer.

## Attribution

Source: html-video `templates/frame-build-minimal` (license Apache-2.0). Derived from huashu-design (alchaincyf (花叔 · 花生), MIT) — https://github.com/alchaincyf/huashu-design. Stylistic inspiration (L1, not affiliated): Build.
