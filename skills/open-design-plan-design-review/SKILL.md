---
name: open-design-plan-design-review
description: 'Senior Designer review: rates each design dimension 0-10, explains what a 10 looks like, and flags AI Slop signals. Useful as a gate before merging UI work. Use when Codex needs to perform Open Design Plan Design Review tasks, or when the user explicitly mentions open-design-plan-design-review.'
---

# Open Design Plan Design Review

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

> Curated from Garry Tan (gstack).

## What it does

Senior Designer review: rates each design dimension 0-10, explains what a 10 looks like, and flags AI Slop signals. Useful as a gate before merging UI work.

## Source

- Upstream: https://github.com/garrytan/gstack
- Category: `creative-direction`

## How to use

This catalogue entry advertises the skill in Open Design so the agent
discovers it during planning. To run the full upstream workflow with
its original assets, scripts, and references, install the upstream
bundle into your active agent's skills directory:

```bash
# Inspect the upstream README for exact paths
open https://github.com/garrytan/gstack
```

Then ask the agent to invoke this skill by name (`plan-design-review`) or with
one of the trigger phrases listed in this skill's frontmatter.
