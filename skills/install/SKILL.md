---
name: install
description: Install GBrain Deprecated Use when Codex needs to perform Install tasks, or when the user explicitly mentions install.
---

# Install

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

This skill has been replaced by the **setup** skill. See `skills/setup/SKILL.md`.

The setup skill provides:
- Auto-provision Supabase via CLI (< 2 min TTHW)
- Manual fallback with non-interactive init
- AGENTS.md auto-injection (upgrade-safe)
- First import and health verification
