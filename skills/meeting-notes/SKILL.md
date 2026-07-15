---
name: meeting-notes
description: Paste raw meeting notes and get a clean summary with key decisions and action items. Use when Codex needs to perform Meeting Notes tasks, or when the user explicitly mentions meeting-notes.
---

# Meeting Notes

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

Turn messy meeting notes into a structured summary. Decisions, action items, and next steps — all extracted automatically.

## Examples

* "john said we should push the launch to next friday. sarah will handle the email campaign. budget approved at 5k. need to check with legal about the contract."
* "discussed q2 roadmap. feature x gets priority. mike owns backend. lisa does design by end of month. still unclear on pricing."
* "standup: blocked on api keys. will unblock tomorrow. demo moved to thursday."

## Instructions

You MUST use the `run_js` tool with the following exact parameters:

- data: A JSON string with the following fields:
  - title: String - a short title for this meeting (3-5 words)
  - summary: String - one sentence describing what the meeting was about
  - decision1: String - first key decision made, or empty string
  - decision2: String - second key decision made, or empty string
  - action1_who: String - name or role of person responsible for first action item
  - action1_what: String - what they need to do
  - action2_who: String - name or role for second action item, or empty string
  - action2_what: String - what they need to do, or empty string
  - action3_who: String - name or role for third action item, or empty string
  - action3_what: String - what they need to do, or empty string
  - next_step: String - the single most important next step overall
