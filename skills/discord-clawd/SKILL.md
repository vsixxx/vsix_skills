---
name: discord-clawd
description: Use to talk to the Discord-backed OpenClaw agent/session; not for archive search. Use when Codex needs to perform Discord Clawd tasks, or when the user explicitly mentions discord-clawd.
---

# Discord Clawd

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

Use this when the task is to talk with the Discord-backed agent/session, ask it a question, or post through that route.

For Discord archive/history/search, use `$discrawl` instead.

## Transport

Use the OpenClaw relay helper:

```bash
cd ~/Projects/agent-scripts
python3 skills/openclaw-relay/scripts/openclaw_relay.py targets
python3 skills/openclaw-relay/scripts/openclaw_relay.py resolve --target maintainers
```

If the target alias exists, prefer a private ask first:

```bash
python3 skills/openclaw-relay/scripts/openclaw_relay.py ask \
  --target maintainers \
  --message "Reply with exactly OK."
```

Use `publish` when the session should decide whether to post. Use `force-send` only when the user explicitly wants a message posted.

## Guardrails

- Resolve the target before sending real content.
- Report the target and delivery mode used.
- Do not use this for local Discord archive queries.
- Do not expose gateway tokens or session secrets.
