---
name: ai-music-album
description: Full-lifecycle AI music album production — concept, lyric drafting, track sequencing, and export. Useful for indie album experiments and brand soundtracks. Use when Codex needs to perform Ai Music Album tasks, or when the user explicitly mentions ai-music-album.
---

# Ai Music Album

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

> Curated from bitwize-music-studio.

## What it does

Full-lifecycle AI music album production — concept, lyric drafting, track sequencing, and export. Useful for indie album experiments and brand soundtracks.

## Source

- Upstream: https://github.com/bitwize-music-studio/claude-ai-music-skills
- Category: `audio-music`

## How to use

This catalogue entry advertises the skill in Open Design so the agent
discovers it during planning. To run the full upstream workflow with
its original assets, scripts, and references, install the upstream
bundle into your active agent's skills directory:

```bash
# Inspect the upstream README for exact paths
open https://github.com/bitwize-music-studio/claude-ai-music-skills
```

Then ask the agent to invoke this skill by name (`ai-music-album`) or with
one of the trigger phrases listed in this skill's frontmatter.
