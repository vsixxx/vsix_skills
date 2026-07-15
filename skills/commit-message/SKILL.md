---
name: commit-message
description: Generate a clean, conventional commit message from a description of your changes. Use when Codex needs to perform Commit Message tasks, or when the user explicitly mentions commit-message.
---

# Commit Message

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

Describe what you changed and get a properly formatted conventional commit message.

## Examples

* "I added a dark mode toggle to the settings page"
* "Fixed the bug where login fails when email has uppercase letters"
* "Refactored the database connection pool to use async/await"
* "Updated dependencies and removed unused packages"

## Instructions

You MUST use the `run_js` tool with the following exact parameters:

- data: A JSON string with the following fields:
  - type: String - one of: feat, fix, docs, style, refactor, test, chore
  - scope: String - short component or area name (e.g. "auth", "ui", "api") or empty string
  - message: String - short imperative summary, max 50 characters, no period at end
  - body: String - one sentence explaining what changed and why, or empty string
