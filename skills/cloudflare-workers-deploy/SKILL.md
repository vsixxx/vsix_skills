---
name: cloudflare-workers-deploy
description: Choose and implement Cloudflare's current Workers-first deployment path for products. Use when deciding whether to deploy on Workers, Pages, Workers Static Assets, framework adapters, Python Workers, Containers, D1, R2, KV, Durable Objects, Hyperdrive, Vectorize, Workers AI, Queues, Workflows, or Workers Builds; when migrating from Pages to Workers; or when configuring wrangler for static sites, SPAs, Next.js, SvelteKit, APIs, Python backends, databases, vector search, object storage, and CI/CD.
---

# Cloudflare Workers Deploy

## Source Standard

Treat official Cloudflare documentation as the factual standard. Cloudflare's platform guidance changes quickly, so verify current docs before giving concrete commands, product-status claims, limits, pricing, or support statements.

Start from:

- Cloudflare Workers docs index: `https://developers.cloudflare.com/workers/llms.txt`
- Workers Static Assets: `https://developers.cloudflare.com/workers/static-assets/`
- Migrate from Pages to Workers: `https://developers.cloudflare.com/workers/static-assets/migration-guides/migrate-from-pages/`
- Workers framework guides: `https://developers.cloudflare.com/workers/framework-guides/`
- Workers Builds: `https://developers.cloudflare.com/workers/ci-cd/builds/`
- Wrangler configuration: `https://developers.cloudflare.com/workers/wrangler/configuration/`

Read `references/deployment-patterns.md` when choosing an architecture or writing deployment guidance. Read `references/official-sources.md` when citations or source URLs are needed.

## Default Position

Use Workers-first for new products and major rewrites. Workers now covers full-stack applications, static assets, APIs, SSR, bindings, observability, versions, deploys, and Git builds. Do not claim Pages is deprecated unless Cloudflare explicitly says so in current official docs. Existing Pages projects can stay on Pages if they are stable and do not need Workers-only capabilities.

Prefer migration or new Workers projects when the product needs:

- Static assets plus API code in one deployment.
- SSR or full-stack framework support.
- Durable Objects, Cron Triggers, Queues consumers, Workflows, Containers, Workers Logs, source maps, rate limiting, image resizing, service bindings, or deeper observability.
- A long-lived platform direction aligned with current Cloudflare docs.

Consider staying on Pages temporarily when the project already works there and depends on Pages-specific branch controls, custom branch aliases, Pages Plugins, or custom domains outside Cloudflare-managed zones. Name this as a tradeoff, not as the default for new work.

## Workflow

1. Identify the app shape: static site, SPA, full-stack JS framework, API Worker, Python Worker, existing containerized/backend app, AI/RAG app, or app with external databases.
2. Check current official docs for the relevant product and framework. Prefer Cloudflare docs, then framework adapter docs linked by Cloudflare.
3. Choose the deployment surface:
   - Workers Static Assets for static sites, SPAs, and static assets with optional API routes.
   - Framework adapter on Workers for Next.js, SvelteKit, Astro, Remix, Nuxt, Hono, Vite, and similar supported frameworks.
   - Python Workers for supported Python apps that fit the beta runtime and package constraints.
   - Containers alongside Workers for custom runtimes, existing Dockerized apps, full Linux-like needs, larger resource requirements, or libraries unsupported by Workers/Python Workers.
4. Choose data bindings:
   - D1 for serverless SQLite-style relational data close to Workers.
   - Hyperdrive for existing Postgres/MySQL or Postgres-compatible databases.
   - R2 for object storage and large unstructured data.
   - KV for globally distributed low-write key/value config, cache, or lookup data.
   - Durable Objects for strongly consistent per-object state, coordination, sessions, or WebSocket-style state.
   - Vectorize for vector search/RAG embeddings, often with Workers AI and R2/D1/KV metadata.
5. Configure with Wrangler. Prefer `wrangler.jsonc` for commented examples in generated guidance unless the repo already uses `wrangler.toml`.
6. Use Workers Builds for Cloudflare-hosted GitHub/GitLab builds, or `wrangler deploy` from existing CI. Mention that build-time variables and runtime variables are configured separately.
7. Verify with local preview in the target runtime (`wrangler dev`, framework preview scripts, or `pywrangler dev`) before deployment.

## Core Configuration Rules

- Set `compatibility_date` to today's date for new projects unless the repo has an established date.
- Preserve existing compatibility dates/flags when migrating unless current docs require a change.
- Use `wrangler dev` and `wrangler deploy` for Workers projects, not `wrangler pages dev` or `wrangler pages deploy`.
- For assets-only Workers projects, configure `assets.directory` and omit `main` and `assets.binding`.
- Add `assets.binding = "ASSETS"` only when Worker code needs to fetch or delegate to static assets.
- For SPAs, set `assets.not_found_handling = "single-page-application"` explicitly.
- For static site generators with custom 404 pages, set `assets.not_found_handling = "404-page"` explicitly.
- Use `assets.run_worker_first` when auth, logging, middleware, or API routes must run before static asset serving.
- Enable `observability.enabled` for production Workers unless the repo or user has a contrary standard.

## Framework Notes

Use `npm create cloudflare@latest -- <app> --framework=<framework>` for new supported JS framework apps when appropriate. For existing supported framework apps without a Wrangler config, current docs may allow `wrangler deploy` to auto-detect and generate configuration; verify current docs before relying on this.

For Next.js:

- Deploy to Workers using the Cloudflare OpenNext adapter.
- Existing project auto-configuration may generate `.open-next/worker.js`, `.open-next/assets`, `nodejs_compat`, observability, and `@opennextjs/cloudflare`.
- Manual configuration requires `nodejs_compat` and a compatibility date at or after the date stated in current docs.
- Use framework preview commands that run in `workerd`/Wrangler, not only the Next.js Node dev server, before production.

For SvelteKit:

- Deploy to Workers with Workers Assets and `@sveltejs/adapter-cloudflare`.
- Existing project auto-configuration may generate `.svelte-kit/cloudflare/_worker.js`, `.svelte-kit/cloudflare` assets, `nodejs_compat`, observability, and adapter configuration.
- Access Cloudflare platform services via bindings from SvelteKit hooks and endpoints.

## Python and Containers

For Python:

- Check whether Python Workers is still beta and whether the required compatibility flag is still `python_workers`.
- Use `pywrangler` with `uv` for local dev and deploy when following current Python Workers docs.
- Validate package and standard-library support before recommending Python Workers for production.
- For FastAPI or Python apps with supported packages and Workers bindings, Python Workers can be a direct fit.

Use Containers instead when the backend needs a full filesystem, specific runtime, Linux-like environment, existing container image, more memory/disk/parallel CPU, native libraries unavailable in Workers, or a migration path for an existing server app. Model Containers as invoked and controlled by Workers, not as a separate traditional VM platform.

## Data and AI Choices

Prefer Cloudflare-native bindings when they fit the problem:

- D1: relational data with SQLite semantics, managed serverless database, Worker/HTTP API access.
- Hyperdrive: accelerate and pool access to existing Postgres/MySQL databases from Workers.
- R2: large objects, user uploads, web assets, data lakes, model artifacts, and unstructured files.
- KV: global low-latency key/value reads where eventual consistency is acceptable.
- Durable Objects: per-entity consistency, coordination, stateful routing, WebSockets, rate-limit state, or sessions.
- Vectorize: embeddings, similarity search, recommendation, semantic search, and RAG; pair with Workers AI for embeddings and with R2/D1/KV for source objects and metadata.
- Queues and Workflows: asynchronous jobs, background processing, multi-step durable operations, and integration with Workers/Containers.

Always check product limits, regional behavior, consistency semantics, and pricing pages before finalizing a production recommendation.

## Output Shape

When answering a deployment question, produce:

1. Recommended platform path, with a short reason.
2. Official-doc caveats or current product status.
3. Minimal config/commands needed for the user's stack.
4. Data/storage/binding choices if relevant.
5. Verification and deployment steps.
6. Official source links used.

Keep recommendations practical. If official docs conflict with local repo patterns, explain the conflict and choose the safer path.
