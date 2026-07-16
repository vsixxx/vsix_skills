---
name: humanizer
description: 'Humanize text: strip AI-isms and add real voice. Use when Codex needs to perform Humanizer tasks, or when the user explicitly mentions humanizer.'
---

# Humanizer

## Codex compatibility

Use the tools available in the current agent environment. Treat upstream-specific tool names as capability labels and map them to the closest available tool. When upstream instructions refer to a skill directory environment variable, resolve it to the directory containing this `SKILL.md`; do not assume that variable exists. Follow the current agent's sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

## Required procedure

1. Read [the complete upstream guide](references/upstream-guide.md) before acting.
2. Follow the guide's domain workflow and use bundled scripts, references, templates, and assets as directed.
3. Verify the result using the checks defined in the guide; do not claim success from command acceptance alone.
