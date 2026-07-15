---
name: openai-whisper-api
description: OpenAI Audio Transcriptions API via curl; gpt-4o-transcribe, mini, diarize, or whisper-1. Use when Codex needs to perform OpenAI Whisper API tasks, or when the user explicitly mentions openai-whisper-api.
---

# OpenAI Whisper API

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

Transcribe audio through `/v1/audio/transcriptions`. Set `OPENAI_BASE_URL` for an OpenAI-compatible proxy or local gateway.

## Quick start

```bash
{baseDir}/scripts/transcribe.sh /path/to/audio.m4a
```

Defaults:

- Model: `gpt-4o-transcribe`
- Output: `<input>.txt`

## Useful flags

```bash
{baseDir}/scripts/transcribe.sh /path/to/audio.ogg --model gpt-4o-transcribe --out /tmp/transcript.txt
{baseDir}/scripts/transcribe.sh /path/to/audio.ogg --model gpt-4o-mini-transcribe
{baseDir}/scripts/transcribe.sh /path/to/audio.ogg --model gpt-4o-transcribe-diarize --json
{baseDir}/scripts/transcribe.sh /path/to/audio.ogg --model whisper-1
{baseDir}/scripts/transcribe.sh /path/to/audio.m4a --language en
{baseDir}/scripts/transcribe.sh /path/to/audio.m4a --prompt "Speaker names: Peter, Daniel"
{baseDir}/scripts/transcribe.sh /path/to/audio.m4a --json --out /tmp/transcript.json
```

Notes:

- Supported upload formats include `mp3`, `mp4`, `mpeg`, `mpga`, `m4a`, `wav`, `webm`.
- 25 MB upload limit on the hosted API.
- Use diarize for speaker labels; script sends `chunking_strategy=auto` and rejects `--prompt`.

## API key

Set `OPENAI_API_KEY`, or configure it in the active OpenClaw config file (`$OPENCLAW_CONFIG_PATH`, default `~/.openclaw/openclaw.json`). Optionally set `OPENAI_BASE_URL`:

```json5
{
  skills: {
    "openai-whisper-api": {
      apiKey: "OPENAI_KEY_HERE",
    },
  },
}
```
