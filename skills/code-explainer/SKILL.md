---
name: code-explainer
description: Paste any code snippet and get a plain English explanation of what it does and how it works. Use when Codex needs to perform Code Explainer tasks, or when the user explicitly mentions code-explainer.
---

# Code Explainer

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

Understand any code instantly. Works with Python, JavaScript, SQL, Bash, TypeScript, Go, and more.

## Examples

* "Explain this Python: def fib(n): return n if n <= 1 else fib(n-1) + fib(n-2)"
* "What does this do: arr.reduce((acc, x) => acc + x, 0)"
* "Explain: SELECT * FROM logs WHERE level = 'error' ORDER BY created_at DESC LIMIT 100"
* "What is this bash script doing: find . -name '*.log' -mtime +7 -delete"

## Instructions

You MUST use the `run_js` tool with the following exact parameters:

- data: A JSON string with the following fields:
  - language: String - the programming language detected (e.g. Python, JavaScript, SQL, Bash)
  - snippet: String - the code snippet, truncated to first 100 characters if longer
  - summary: String - one sentence plain English explanation of what the code does overall
  - how: String - one sentence explaining how it works (the mechanism)
  - tip: String - one practical tip, gotcha, or improvement suggestion for this code
