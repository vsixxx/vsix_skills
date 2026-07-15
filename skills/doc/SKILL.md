---
name: doc
description: Read, create, and edit .docx documents with formatting and layout fidelity via OpenAI's document skill. Use when Codex needs to perform Doc tasks, or when the user explicitly mentions doc.
---

# Doc

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

> Curated from OpenAI's skills repository.

## What it does

Read, create, and edit .docx documents with formatting and layout fidelity via OpenAI's document skill.

## Source

- Upstream: https://github.com/openai/skills
- Category: `documents`

## How to use

This catalogue entry advertises the skill in Open Design so the agent
discovers it during planning. To run the full upstream workflow with
its original assets, scripts, and references, install the upstream
bundle into your active agent's skills directory:

```bash
# Inspect the upstream README for exact paths
open https://github.com/openai/skills
```

Then ask the agent to invoke this skill by name (`doc`) or with
one of the trigger phrases listed in this skill's frontmatter.
