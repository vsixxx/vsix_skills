---
name: latency-critical-systems
description: Use for latency-sensitive systems such as realtime dashboards, market data, streaming agents, execution gateways, queues, caches, or HFT-like infrastructure where freshness and p95 latency matter. Use when Codex needs to perform Latency Critical Systems tasks, or when the user explicitly mentions latency-critical-systems.
---

# Latency Critical Systems

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

Use this skill when the user cares about realtime behavior, hot paths, streaming
freshness, or execution speed. This includes HFT-like infrastructure, but the
skill is engineering-focused. It does not authorize live trading or financial
advice.

## Split The Metrics

Do not collapse everything into "fast." Track:

- p50, p95, and p99 latency;
- throughput;
- freshness age;
- queue depth;
- cache hit rate;
- provider/API response time;
- browser render time;
- correctness under load;
- failure and retry behavior.

## Map The Hot Path

Write the path from user/event to final visible state:

```text
source event -> provider API -> ingest worker -> queue -> cache -> edge route
-> client stream -> browser render -> user-visible state
```

Then measure each segment separately.

## Optimization Order

1. Remove unnecessary round trips.
2. Cache stable reads with freshness metadata.
3. Batch small calls and writes.
4. Move compute closer to the data or the user.
5. Split hot and cold paths.
6. Apply backpressure before queues grow unbounded.
7. Use streaming only when it improves freshness or user experience.
8. Add canaries for stale data, degraded providers, and bad cache state.

## Verification

Use live readbacks when a deployed surface exists:

- HTTP timing and response headers;
- provider freshness timestamp;
- queue or job state;
- edge/cache state;
- browser verification for actual UI freshness;
- logs around retries and degraded mode.

For market-data or execution-adjacent paths, also verify orderbook age, VWAP
assumptions, provider status, and kill-switch behavior before calling the path
ready.

## Guardrails

- Do not optimize latency by dropping required validation.
- Do not hide stale data behind fast cache hits.
- Do not claim millisecond behavior from client labels without measurement.
- Do not run live orders, destructive migrations, or customer-impacting deploys
  without an explicit approval gate.
- Keep secrets and private payloads out of logs and benchmark artifacts.
