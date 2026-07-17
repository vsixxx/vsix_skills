# Official Sources

Use these URLs as the starting source list. Prefer current official docs over this static summary when facts may have changed.

## Platform Direction

- Workers Static Assets: `https://developers.cloudflare.com/workers/static-assets/`
  - Static assets can be uploaded as part of a Worker.
  - Workers can combine static file hosting, custom logic, and caching in one deployment.
- Migrate from Pages to Workers: `https://developers.cloudflare.com/workers/static-assets/migration-guides/migrate-from-pages/`
  - Workers can deploy full-stack applications, static assets, backend APIs, and SSR.
  - Workers has broader feature coverage than Pages in areas such as Durable Objects, Cron Triggers, and Observability.
  - The compatibility matrix is the best official snapshot for Pages versus Workers capability differences.
- Workers Builds: `https://developers.cloudflare.com/workers/ci-cd/builds/`
  - GitHub/GitLab integration can build and deploy Workers on push.
  - Worker name in dashboard must match `name` in the Wrangler config for connected builds.

## Frameworks

- Next.js on Workers: `https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/`
  - Use the Cloudflare OpenNext adapter.
  - `create-cloudflare` can scaffold new projects with `--framework=next`.
  - Existing projects may be auto-configured by `wrangler deploy`.
  - Manual config uses `.open-next/worker.js`, `.open-next/assets`, `nodejs_compat`, and Workers Assets.
- SvelteKit on Workers: `https://developers.cloudflare.com/workers/framework-guides/web-apps/sveltekit/`
  - Use `create-cloudflare` with `--framework=svelte` for new projects.
  - Existing projects may be auto-configured by `wrangler deploy`.
  - Cloudflare bindings are available to SvelteKit hooks and endpoints.

## Languages and Compute

- Python Workers: `https://developers.cloudflare.com/workers/languages/python/`
  - Python Workers provide first-class Python support and use `pywrangler`.
  - Current docs state Python Workers are beta and require the `python_workers` compatibility flag during beta.
- Containers: `https://developers.cloudflare.com/containers/`
  - Containers run serverless containers alongside Workers.
  - Use for resource-intensive apps, custom runtimes, full filesystem/Linux-like needs, or existing container images.

## Data and AI

- D1: `https://developers.cloudflare.com/d1/`
  - Managed serverless database with SQLite SQL semantics and Worker/HTTP API access.
- Hyperdrive: `https://developers.cloudflare.com/hyperdrive/`
  - Accelerates existing Postgres/MySQL access from Workers with global connection pooling and query caching.
- R2: `https://developers.cloudflare.com/r2/`
  - Object storage for unstructured data, web content, data lakes, and large artifacts.
- Vectorize: `https://developers.cloudflare.com/vectorize/`
  - Cloudflare vector database for full-stack AI apps on Workers.
  - Current docs state Vectorize is Generally Available.
- Bindings overview: `https://developers.cloudflare.com/workers/runtime-apis/bindings/`
  - Use for Cloudflare service bindings, env vars, secrets, service bindings, and platform integrations.

## Configuration

- Wrangler configuration: `https://developers.cloudflare.com/workers/wrangler/configuration/`
- Workers Static Assets routing: `https://developers.cloudflare.com/workers/static-assets/routing/`
- Workers custom domains: `https://developers.cloudflare.com/workers/configuration/routing/custom-domains/`
- Workers previews: `https://developers.cloudflare.com/workers/configuration/previews/`
- Workers Node.js compatibility: `https://developers.cloudflare.com/workers/runtime-apis/nodejs/`
