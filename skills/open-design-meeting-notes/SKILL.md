---
name: open-design-meeting-notes
description: Meeting notes page — title bar with attendees, agenda checklist, decisions block, action items table with owners + dates, and a "next meeting" footer. Use when the brief mentions "meeting notes", "minutes", "1:1 notes", "all-hands recap", or "会议纪要".
---

# Open Design Meeting Notes

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

Produce a single-screen meeting notes page.

## Workflow

1. Read DESIGN.md.
2. Layout:
   - Header: meeting title, date, time, location/Zoom, attendees row.
   - Agenda checklist (4–6 items).
   - Decisions panel — bulleted list with strong styling.
   - Action items table with owner, due date, status.
   - "Open questions" + "next meeting" footer.
3. Subdued colour palette, clear hierarchy.

## Output contract

```
<artifact identifier="notes-name" type="text/html" title="Meeting Notes">
<!doctype html>...</artifact>
```
