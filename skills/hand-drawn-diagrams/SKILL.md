---
name: hand-drawn-diagrams
description: Generate hand-drawn Excalidraw diagrams from a prompt — animated SVG, hosted edit link, and PNG export. Works with Claude Code, Codex, Gemini CLI, and any agent supporting standard skill paths. Use when Codex needs to perform Hand Drawn Diagrams tasks, or when the user explicitly mentions hand-drawn-diagrams.
---

# Hand Drawn Diagrams

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

> Curated from @muthuishere.

## What it does

Generate hand-drawn Excalidraw diagrams from a prompt — animated SVG, hosted edit link, and PNG export. Works with Claude Code, Codex, Gemini CLI, and any agent supporting standard skill paths.

## Source

- Upstream: https://github.com/muthuishere/hand-drawn-diagrams
- Category: `diagrams`

## How to use

This catalogue entry advertises the skill in Open Design so the agent
discovers it during planning. To run the full upstream workflow with
its original assets, scripts, and references, install the upstream
bundle into your active agent's skills directory:

```bash
# Inspect the upstream README for exact paths
open https://github.com/muthuishere/hand-drawn-diagrams
```

Then ask the agent to invoke this skill by name (`hand-drawn-diagrams`) or with
one of the trigger phrases listed in this skill's frontmatter.
