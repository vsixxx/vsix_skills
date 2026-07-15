---
name: gemini
description: Gemini CLI one-shot prompts, summaries, generation, skills, hooks, MCP, or Gemma routing. Use when Codex needs to perform Gemini tasks, or when the user explicitly mentions gemini.
---

# Gemini

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

Use Gemini in headless one-shot mode. Positional text starts interactive mode; use `-p/--prompt`.

Quick start

- `gemini -p "Answer this question..."`
- `gemini -m <model> -p "Prompt..."`
- `gemini -p "Return JSON" --output-format json`
- stdin appends to `-p`: `cat notes.md | gemini -p "Summarize"`

Extensions

- List: `gemini --list-extensions`
- Manage: `gemini extensions <command>`
- Skills: `gemini skills <command>`
- Hooks: `gemini hooks <command>`
- MCP: `gemini mcp <command>`

Notes

- If auth is required, run `gemini` once interactively and follow the login flow.
- Avoid `--yolo` for safety.
