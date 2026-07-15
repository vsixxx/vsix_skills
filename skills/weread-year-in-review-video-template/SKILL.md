---
name: weread-year-in-review-video-template
description: WeRead-inspired HyperFrames video template for vertical annual reading reports, personal reading dashboards, book-note recaps, and shareable year-in-review stories. Use when users want a 9:16 HTML-to-MP4 reading report with warm paper texture, editorial Chinese typography, book-page metaphors, data highlights, and deterministic motion.
---

# Weread Year In Review Video Template

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

Create a vertical HyperFrames composition for annual reading reports: WeRead,
Goodreads, Readwise, Notion reading logs, book clubs, or personal learning
recaps. The template turns reading time, active days, bookshelf assets, notes,
keywords, and a reading persona into a shareable 9:16 video.

## Resource Map

```text
weread-year-in-review-video-template/
├── SKILL.md
├── assets/
│   └── template.html
├── references/
│   └── checklist.md
└── example.html
```

The rendered MP4 showcase used by `example.html` is hosted at
`https://repo-assets.open-design.ai/resources/videos/skills/weread-year-in-review-video-template/default-showcase.mp4`.

## Workflow

1. Copy `assets/template.html` to `index.html`.
2. Replace the default report data in the `REPORT` object:
   - owner/title
   - reading hours and active days
   - bookshelf and completion stats
   - note composition
   - interest keywords
   - reading persona and share line
3. Preserve the 12-scene timeline unless the user asks for a shorter cut.
4. Keep the WeRead-inspired visual language:
   - warm paper background
   - ink-blue typography
   - restrained WeRead green accents
   - book pages, bookmarks, highlights, note cards, and shelf metaphors
5. Motion should feel like flipping through a reading journal. Avoid techy
   slide transitions, bouncy UI effects, and dashboard-loading motion.
6. Keep the composition deterministic:
   - direct `data-start`, `data-duration`, and `data-track-index` attributes
   - no unseeded randomness
   - no infinite loops or `repeat: -1`
   - no dependency on scroll, hover, localStorage, or runtime class discovery
7. Validate against `references/checklist.md` before emitting.

## Output Contract

Emit one short orientation sentence, then a single HTML artifact:

```xml
<artifact identifier="weread-year-in-review-video-template" type="text/html" title="WeRead Year in Review Video Template">
<!doctype html>
<html>...</html>
</artifact>
```
