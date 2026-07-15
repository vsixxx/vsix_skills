---
name: open-design-pdf
description: Extract text, create PDFs, and handle forms. Useful for press releases, branded one-pagers, and printable design deliverables. Use when Codex needs to perform Open Design PDF tasks, or when the user explicitly mentions open-design-pdf.
---

# Open Design PDF

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

> Curated from Anthropic's official skills repository.

## What it does

Extract text, create PDFs, and handle forms. Useful for press releases, branded one-pagers, and printable design deliverables.

## Source

- Upstream: https://github.com/anthropics/skills/tree/main/skills/pdf
- Category: `documents`

## How to use

This catalogue entry advertises the skill in Open Design so the agent
discovers it during planning. To run the full upstream workflow with
its original assets, scripts, and references, install the upstream
bundle into your active agent's skills directory:

```bash
# Inspect the upstream README for exact paths
open https://github.com/anthropics/skills/tree/main/skills/pdf
```

Then ask the agent to invoke this skill by name (`pdf`) or with
one of the trigger phrases listed in this skill's frontmatter.
