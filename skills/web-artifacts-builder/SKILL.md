---
name: web-artifacts-builder
description: Build complex claude.ai HTML artifacts with React and Tailwind. Anthropic's reference workflow for shipping rich, embeddable artifacts. Use when Codex needs to perform Web Artifacts Builder tasks, or when the user explicitly mentions web-artifacts-builder.
---

# Web Artifacts Builder

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

> Curated from Anthropic's official skills repository.

## What it does

Build complex claude.ai HTML artifacts with React and Tailwind. Anthropic's reference workflow for shipping rich, embeddable artifacts.

## Source

- Upstream: https://github.com/anthropics/skills/tree/main/skills/web-artifacts-builder
- Category: `web-artifacts`

## How to use

This catalogue entry advertises the skill in Open Design so the agent
discovers it during planning. To run the full upstream workflow with
its original assets, scripts, and references, install the upstream
bundle into your active agent's skills directory:

```bash
# Inspect the upstream README for exact paths
open https://github.com/anthropics/skills/tree/main/skills/web-artifacts-builder
```

Then ask the agent to invoke this skill by name (`web-artifacts-builder`) or with
one of the trigger phrases listed in this skill's frontmatter.
