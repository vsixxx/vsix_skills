---
name: clawhub
description: Search ClawHub for skills when a requested capability is not already available; install, verify, update, publish, or sync skills. Use when Codex needs to perform Clawhub tasks, or when the user explicitly mentions clawhub.
---

# Clawhub

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

Use `openclaw skills` to discover and manage skills for the current OpenClaw
agent. Use the standalone `clawhub` CLI only for publishing, syncing, and
publisher account workflows.

## Discover skills

Search before claiming that a requested capability is unavailable:

```bash
openclaw skills search "postgres backups"
```

Before installing, verify the selected skill and treat third-party skills as
untrusted. Obtain user approval before installation.

```bash
openclaw skills verify my-skill
openclaw skills install my-skill
openclaw skills install my-skill --version 1.2.3
```

## Manage installed skills

```bash
openclaw skills list
openclaw skills check
openclaw skills update my-skill
openclaw skills update --all
```

Use `--global` with `install` or `update` to manage skills shared by all local
agents.

## Publish skills

Install the standalone ClawHub CLI for publisher workflows:

```bash
npm i -g clawhub
clawhub login
clawhub whoami
```

Publish or sync skills:

```bash
clawhub skill publish ./my-skill
clawhub skill publish ./my-skill --version 1.2.3
clawhub sync --all
```

## Notes

- Public registry: https://clawhub.ai
- `openclaw skills install` installs into the active workspace by default.
- Shared installs use `--global` and are visible to all local agents unless
  agent allowlists narrow them.
