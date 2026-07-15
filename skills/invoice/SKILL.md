---
name: invoice
description: A printable invoice page — sender + recipient block, line items table, tax breakdown, totals, and payment instructions. Use when the brief mentions "invoice", "bill", "billing statement", or "发票".
---

# Invoice

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

Produce a single-page printable invoice.

## Workflow

1. Read DESIGN.md.
2. Layout:
   - Top band: studio brand on the left, "INVOICE" + number + date + due date on the right.
   - Two columns: From (sender) / Bill to (recipient) with addresses.
   - Project ref + payment-terms strip.
   - Line items table: description / qty / unit / amount.
   - Right-aligned totals block: subtotal, retainer, tax, total due.
   - Payment instructions (bank, wire, ACH).
   - Thank-you note + signature line.
3. Print stylesheet @media print to remove backgrounds.

## Output contract

```
<artifact identifier="invoice-name" type="text/html" title="Invoice">
<!doctype html>...</artifact>
```
