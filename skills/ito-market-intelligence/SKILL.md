---
name: ito-market-intelligence
description: Research prediction-market events, venues, underliers, liquidity, and news context for Itô basket workflows. Use for read-only market intelligence, API-gated Itô exploration, and source-grounded prediction-market briefings without investment advice or live trading. Use when Codex needs to perform Ito Market Intelligence tasks, or when the user explicitly mentions ito-market-intelligence.
---

# Ito Market Intelligence

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

Use this skill when a user wants prediction-market context, event discovery,
venue comparison, basket theme exploration, or an Itô API-backed market brief.

This is a public teaser skill. It can work with public sources by default. Any
Itô-backed data call requires explicit API access through `ITO_API_KEY`.

## Guardrails

- Do not provide investment, legal, tax, or trading advice.
- Do not place, cancel, route, or simulate live orders.
- Do not infer the user's financial situation unless they provide it.
- Treat Polymarket, Kalshi, Itô, X, Exa, GitHub, and web data as source inputs,
  not as truth by themselves.
- Separate facts, market-implied signals, and your interpretation.

## Workflow

1. Clarify the market theme, venue, geography, and time horizon.
2. Gather public market data from venue docs/APIs or source-grounded research.
3. If `ITO_API_KEY` is present and the user explicitly asks for Itô data, call
   only read endpoints and state that access is gated.
4. Normalize event, underlier, liquidity, fee, resolution, and data-latency
   differences across venues.
5. Produce a decision brief:
   - market/event summary
   - available venues and underliers
   - liquidity and data-quality caveats
   - relevant news/source context
   - open questions before any user action

## Useful Skill Chains

- Use `deep-research` or `exa-search` for source discovery.
- Use `x-api` for public social signal discovery when X access is configured.
- Use `market-research` for market sizing, competitors, or business use cases.
- Use `prediction-market-risk-review` before any workflow touches user capital,
  portfolio data, or execution-capable credentials.

## Output Contract

Default to a compact brief with source links and a clear caveat:

```text
This is market intelligence, not investment or trading advice.
```

If access is missing, say:

```text
Itô live basket/API data requires gated access. Request an ITO_API_KEY before
using Itô-backed reads.
```
