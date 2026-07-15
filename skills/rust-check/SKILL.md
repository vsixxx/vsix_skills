---
name: rust-check
description: Run cargo check on the current Rust project to find compile errors Use when Codex needs to perform Rust Check tasks, or when the user explicitly mentions rust-check.
---

# Rust Check

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

Use this skill when you need to check for Rust compile errors.

**How to use:**
1. Run `cargo check` in the project root
2. Analyze the output for errors and warnings
3. Fix any issues found

**Example:**
```bash
cargo check --all-targets
```

This skill is part of the rust-toolkit plugin.
