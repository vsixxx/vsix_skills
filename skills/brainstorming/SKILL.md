---
name: brainstorming
description: Transform rough ideas into fully-formed designs through structured questioning and alternative exploration. Useful early in concept work. Use when Codex needs to perform Brainstorming tasks, or when the user explicitly mentions brainstorming.
---

# Brainstorming

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

> Curated from @obra.

## What it does

Transform rough ideas into fully-formed designs through structured questioning and alternative exploration. Useful early in concept work.

## Source

- Upstream: https://github.com/obra/superpowers
- Category: `creative-direction`

## How to use

This catalogue entry advertises the skill in Open Design so the agent
discovers it during planning. To run the full upstream workflow with
its original assets, scripts, and references, install the upstream
bundle into your active agent's skills directory:

```bash
# Inspect the upstream README for exact paths
open https://github.com/obra/superpowers
```

Then ask the agent to invoke this skill by name (`brainstorming`) or with
one of the trigger phrases listed in this skill's frontmatter.
