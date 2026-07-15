---
name: haiku-card
description: Write a haiku about a topic and render it as a shareable card. Use when Codex needs to perform Haiku Card tasks, or when the user explicitly mentions haiku-card.
---

# Haiku Card

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

Write a haiku (5-7-5) and display it on a decorative card.

## Examples

* "Write a haiku about ocean"
* "Make a haiku about monday morning"
* "Haiku card: cherry blossoms"

## Instructions

You MUST use the `run_js` tool with the following exact parameters:

- data: A JSON string with the following fields:
  - line1: String - the first line of the haiku
  - line2: String - the second line of the haiku
  - line3: String - the third line of the haiku
  - topic: String - the topic word, displayed at the bottom of the card
