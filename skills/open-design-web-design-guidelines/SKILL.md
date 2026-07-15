---
name: open-design-web-design-guidelines
description: Review UI code for Web Interface Guidelines compliance by the Vercel engineering team. Covers layout, typography, color, motion, and accessibility for product UI. Use when Codex needs to perform Open Design Web Design Guidelines tasks, or when the user explicitly mentions open-design-web-design-guidelines.
---

# Open Design Web Design Guidelines

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

Review files for compliance with Web Interface Guidelines.

## How It Works

1. Load the pinned guidelines from [`references/guidelines.md`](references/guidelines.md) — this is the default, reproducible execution path
2. Optionally, fetch the latest guidelines from the upstream URL below and diff against the pinned snapshot to see if anything has changed
3. Read the specified files (or prompt user for files/pattern)
4. Check against all rules in the guidelines
5. Output findings in the terse `file:line` format

## Guidelines Source

**Default (pinned):** The vendored copy at [`references/guidelines.md`](references/guidelines.md) is the default execution path. It is a pinned snapshot of the upstream guidelines and guarantees the skill produces reproducible results in any runtime environment.

**Upstream (live):** For users who want the very latest rules, the live source is available at:

```
https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md
```

Fetching the live version is optional — the pinned snapshot is always the baseline.

## Usage

When a user provides a file or pattern argument:
1. Load [`references/guidelines.md`](references/guidelines.md) as the default source
2. Optionally fetch the upstream URL to check for updates
3. Read the specified files
4. Apply all rules from the guidelines
5. Output findings using the format specified in the guidelines

If no files specified, ask the user which files to review.
