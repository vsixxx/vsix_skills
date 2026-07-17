# Deployment Patterns

Use this reference after loading the skill when choosing a Cloudflare deployment path.

## Decision Matrix

| Product shape | Current Workers-first path | Key checks |
| --- | --- | --- |
| Plain static site | Workers Static Assets with `assets.directory`; no `main` if assets-only | SSG 404 behavior, headers/redirects, custom domain requirements |
| SPA | Workers Static Assets with `not_found_handling = "single-page-application"` | API routes need Worker script and selective `run_worker_first` |
| Static plus API | Worker script plus Assets binding | Use `assets.binding`, route `/api/*` before assets if needed |
| Next.js | Workers + Cloudflare OpenNext adapter | Current OpenNext support matrix, `nodejs_compat`, compatibility date, env var handling |
| SvelteKit | Workers + Workers Assets + `@sveltejs/adapter-cloudflare` | Adapter config and bindings access |
| Other JS frameworks | Current Cloudflare framework guide or auto-configuration | Confirm adapter maturity and generated Wrangler config |
| Python API | Python Workers if beta/runtime/package constraints fit | `python_workers` flag, pywrangler, package/stdlib support |
| Existing Docker/backend app | Containers controlled by Workers | Paid plan, limits, image build/deploy, state and routing model |
| Existing Postgres/MySQL | Worker + Hyperdrive | Driver compatibility, `nodejs_compat`, local connection string, query caching |
| New relational DB | Worker + D1 | SQLite semantics, migrations, backups, read replication needs |
| Object/file storage | R2 binding or R2 APIs | Public vs private buckets, CORS, bucket tokens |
| AI/RAG/vector search | Worker + Vectorize + Workers AI, usually R2/D1/KV metadata | Index dimensions/metric, embedding model, source object storage |
| Stateful coordination | Durable Objects | Migrations and object naming/routing |
| Background jobs | Queues and/or Workflows | Producer/consumer support, retries, durability, idempotency |

## Pages to Workers Migration Checklist

1. Replace `pages_build_output_dir` with `assets.directory`.
2. Add `name` and `compatibility_date` if missing.
3. Move or ignore `_worker.js` so it is not uploaded as a static asset.
4. Compile `functions/` with `wrangler pages functions build` only as a migration bridge; prefer framework routing or Worker code for new work.
5. Replace Pages commands with `wrangler dev` and `wrangler deploy`.
6. Recreate env vars, secrets, and bindings in Wrangler/dashboard. Build-time and runtime variables are separate for Workers Builds.
7. Enable preview URLs and non-production branch builds if the Pages workflow used previews.
8. Include `_headers` and `_redirects` in the static asset directory if needed.
9. Confirm domain constraints: Workers custom domains generally require Cloudflare-managed nameservers; Pages may support some outside-zone custom domain flows.
10. Keep Pages running until Worker behavior, previews, env vars, bindings, routing, and production traffic are validated.

## Minimal Wrangler Examples

Assets-only static site:

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "my-site",
  "compatibility_date": "<today>",
  "assets": {
    "directory": "./dist",
    "not_found_handling": "404-page"
  }
}
```

SPA plus API Worker:

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "my-app",
  "main": "src/index.ts",
  "compatibility_date": "<today>",
  "observability": {
    "enabled": true
  },
  "assets": {
    "directory": "./dist",
    "binding": "ASSETS",
    "not_found_handling": "single-page-application",
    "run_worker_first": ["/api/*"]
  }
}
```

Next.js manual shape:

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "my-next-app",
  "main": ".open-next/worker.js",
  "compatibility_date": "<today>",
  "compatibility_flags": ["nodejs_compat"],
  "observability": {
    "enabled": true
  },
  "assets": {
    "directory": ".open-next/assets",
    "binding": "ASSETS"
  }
}
```

Hyperdrive binding shape:

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "api",
  "main": "src/index.ts",
  "compatibility_date": "<today>",
  "compatibility_flags": ["nodejs_compat"],
  "observability": {
    "enabled": true
  },
  "hyperdrive": [
    {
      "binding": "HYPERDRIVE",
      "id": "<hyperdrive-id>",
      "localConnectionString": "<local-dev-connection-string>"
    }
  ]
}
```

Python Worker shape:

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "python-api",
  "main": "src/entry.py",
  "compatibility_date": "<today>",
  "compatibility_flags": ["python_workers"],
  "observability": {
    "enabled": true
  }
}
```

Container shape:

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "container-backed-api",
  "main": "src/index.js",
  "compatibility_date": "<today>",
  "containers": [
    {
      "class_name": "ApiContainer",
      "image": "./Dockerfile",
      "max_instances": 5
    }
  ],
  "durable_objects": {
    "bindings": [
      {
        "name": "API_CONTAINER",
        "class_name": "ApiContainer"
      }
    ]
  },
  "migrations": [
    {
      "tag": "v1",
      "new_sqlite_classes": ["ApiContainer"]
    }
  ]
}
```

## Common Caveats

- Workers Static Assets serve matching assets before Worker code by default; set `run_worker_first` when request-time logic must happen first.
- Next.js `next dev` runs in Node.js; use the Cloudflare preview command for production-like testing.
- Workers Builds can build and upload versions separately from active deployment; configure deploy commands intentionally.
- Workers non-production environments do not always match Pages' production/preview binding model. Use Wrangler environments and Workers Builds configuration when needed.
- Product limits, plan availability, and beta status are not stable enough to encode permanently. Verify official docs before final recommendation.
