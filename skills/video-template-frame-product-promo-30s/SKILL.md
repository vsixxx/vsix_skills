---
name: video-template-frame-product-promo-30s
description: 'Use this plugin when the user wants a "Product Promo · 30s" HyperFrames motion video — Multi-scene 30-second product promo: problem-type intro, brand reveal, benefits flowchart, product surfaces, value pillars, foundation, CTA outro. Forked from Nate Herk''s hyperframes-student-kit (linear-promo-30s); brand-specific copy + assets replaced with generic placeholders. Use when Codex needs to perform Video Template Frame Product Promo 30s tasks, or when the user explicitly mentions video-template-frame-product-promo-30s.'
---

# Video Template Frame Product Promo 30s

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

Multi-scene 30-second product promo: problem-type intro, brand reveal, benefits flowchart, product surfaces, value pillars, foundation, CTA outro. Forked from Nate Herk's hyperframes-student-kit (linear-promo-30s); brand-specific copy + assets replaced with generic placeholders.

## What this template is

A HyperFrames-ready HTML + CSS + GSAP motion composition, bundled under `source/`. It renders deterministically to MP4 / WEBM at 16:9, default 30s, 30fps.

**Best for:** 30-second product promo · B2B SaaS launch · Multi-feature reel with sound

## Workflow

1. Read `source/index.html` to understand the named layers and the animation timeline.
2. Replace the sample copy (headlines, figures, labels) with the user's real content; keep the motion timing and visual signature intact.
3. Keep the composition self-contained under `source/`; do not introduce external network assets that would break a headless render.
4. Render to MP4 via the html-video / HyperFrames renderer.

## Attribution

Source: html-video `templates/frame-product-promo-30s` (license MIT). Forked from Nate Herk — https://github.com/nateherkai/hyperframes-student-kit/tree/main/video-projects/linear-promo-30s.
