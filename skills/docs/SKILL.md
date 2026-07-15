---
name: docs
description: Start the Remotion docs site and open it in the Codex browser. Use when the user invokes /docs or $docs, asks to launch the local documentation site, or wants to preview docs changes in Docusaurus.
---

# Docs

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

## Overview

Prepare the Remotion monorepo, launch the Docusaurus docs site, and open the served URL in the Codex in-app browser.

## Workflow

1. From the repository root, run:

```bash
bun i && bun run build
```

2. Start the docs site:

```bash
cd packages/docs && bun run start
```

3. Keep the server process running and read its output for the local URL. The expected default is `http://localhost:3000`, but follow the printed URL if Docusaurus chooses or reports another port.
4. Open the URL in the Codex in-app browser. If no browser tool is available yet, use `tool_search` for the in-app browser control tool, then navigate to the local URL.
5. Tell the user the docs URL and whether this is a newly started or already running server.
