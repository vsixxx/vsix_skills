---
name: pr-name
description: Correct naming for a PR Use when Codex needs to perform PR Name tasks, or when the user explicitly mentions pr-name.
---

# PR Name

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

The following format must be used for the PR title:

```
`[package-name]`: [commit-message]
```

For example:

```
`@remotion/shapes`: Add heart shape
```

The package name must be obtained from package.json.  
If multiple packages are affected, use the one that you think if most relevant.

If the change is about docs only:

```
Docs: Add page about heart shape
```
