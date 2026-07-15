---
name: full-page-screenshot
description: Capture full-page screenshots of web pages via Chrome DevTools Protocol with zero dependencies. Useful for portfolios, case studies, and audit reports. Use when Codex needs to perform Full Page Screenshot tasks, or when the user explicitly mentions full-page-screenshot.
---

# Full Page Screenshot

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

> Curated from @LewisLiu007.

## What it does

Capture full-page screenshots of web pages via Chrome DevTools Protocol with zero dependencies. Useful for portfolios, case studies, and audit reports.

## Source

- Upstream: https://github.com/LewisLiu007/full-page-screenshot
- Category: `screenshots`

## How to use

This catalogue entry advertises the skill in Open Design so the agent
discovers it during planning. To run the full upstream workflow with
its original assets, scripts, and references, install the upstream
bundle into your active agent's skills directory:

```bash
# Inspect the upstream README for exact paths
open https://github.com/LewisLiu007/full-page-screenshot
```

Then ask the agent to invoke this skill by name (`full-page-screenshot`) or with
one of the trigger phrases listed in this skill's frontmatter.
