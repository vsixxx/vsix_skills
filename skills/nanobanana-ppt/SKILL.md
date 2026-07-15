---
name: nanobanana-ppt
description: AI-powered PPT generation with document analysis and styled images via the NanoBanana stack. Combines image generation with structured deck output. Use when Codex needs to perform Nanobanana Ppt tasks, or when the user explicitly mentions nanobanana-ppt.
---

# Nanobanana Ppt

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

> Curated from @op7418.

## What it does

AI-powered PPT generation with document analysis and styled images via the NanoBanana stack. Combines image generation with structured deck output.

## Source

- Upstream: https://github.com/op7418/NanoBanana-PPT-Skills
- Category: `image-generation`

## How to use

This catalogue entry advertises the skill in Open Design so the agent
discovers it during planning. To run the full upstream workflow with
its original assets, scripts, and references, install the upstream
bundle into your active agent's skills directory:

```bash
# Inspect the upstream README for exact paths
open https://github.com/op7418/NanoBanana-PPT-Skills
```

Then ask the agent to invoke this skill by name (`nanobanana-ppt`) or with
one of the trigger phrases listed in this skill's frontmatter.
