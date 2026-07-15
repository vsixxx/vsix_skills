---
name: add-bug
description: Add a new Remotion bug entry to packages/bugs/api/[v].ts. Use when the user describes a bug and affected Remotion versions that should be surfaced through the bugs API.
---

# Add Bug

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

Add a new bug entry to `packages/bugs/api/[v].ts`.

The user will describe the bug and the affected version(s). Add the new entry at the top of the `bugs` array, immediately after the opening bracket, following the existing format:

```ts
{
	title: '<short title>',
	description: '<description with upgrade instruction>',
	link: 'https://remotion.dev/changelog',
	versions: ['<affected versions>'],
},
```

Rules:

- The description should tell users which version to upgrade to.
- The link should be `https://remotion.dev/changelog` unless the user provides a specific link.
- Add the entry at the top of the array so the most recent bugs come first.
