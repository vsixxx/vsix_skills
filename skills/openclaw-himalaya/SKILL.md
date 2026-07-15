---
name: openclaw-himalaya
description: 'Himalaya CLI for IMAP/SMTP mail: list, read, search, compose, reply, forward, copy, move, delete. Use when Codex needs to perform Openclaw Himalaya tasks, or when the user explicitly mentions openclaw-himalaya.'
---

# Openclaw Himalaya

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

Use `himalaya` for IMAP/SMTP email from shell.

## References

- `references/configuration.md`: account config, auth, backend setup.
- `references/message-composition.md`: MML compose syntax.

## Setup

```bash
himalaya --version
himalaya account configure
```

Config path: `~/.config/himalaya/config.toml`.

Prefer password managers/keyrings for credentials; do not paste secrets into chat/logs.

## Read/search

```bash
himalaya folder list
himalaya envelope list
himalaya message read <id>
himalaya envelope list from alice@example.com subject invoice
```

## Write

```bash
himalaya message write
himalaya template write
himalaya template send < /tmp/message.txt
himalaya message reply <id>
himalaya message forward <id>
```

Use MML for attachments and rich messages; read `references/message-composition.md` first.

## Organize

```bash
himalaya message copy <id> <folder>
himalaya message move <id> <folder>
himalaya message delete <id>
himalaya flag add <id> --flag seen
himalaya flag remove <id> --flag seen
```

## Safety

- Confirm before sending, deleting, or moving many messages.
- Use `--account` when multiple accounts exist.
- Quote exact message IDs in summaries.
