---
name: video-template-frame-nyt-graph
description: Use this plugin when the user wants a "NYT Graph" HyperFrames motion video — Animated data chart in print editorial style Use when Codex needs to perform Video Template Frame Nyt Graph tasks, or when the user explicitly mentions video-template-frame-nyt-graph.
---

# Video Template Frame Nyt Graph

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

Animated data chart in print editorial style

## What this template is

A HyperFrames-ready HTML + CSS + GSAP motion composition, bundled under `source/`. It renders deterministically to MP4 / WEBM at 16:9, default 15s, 30fps.

**Best for:** News-style stat reveal · Line chart over time · Editorial data point

## Workflow

1. Read `source/index.html` to understand the named layers and the animation timeline.
2. Replace the sample copy (headlines, figures, labels) with the user's real content; keep the motion timing and visual signature intact.
3. Keep the composition self-contained under `source/`; do not introduce external network assets that would break a headless render.
4. Render to MP4 via the html-video / HyperFrames renderer.

## Attribution

Source: html-video `templates/frame-nyt-graph` (license Apache-2.0). Forked from heygen-com / Hyperframes — https://github.com/heygen-com/hyperframes/tree/main/registry/examples/nyt-graph.
