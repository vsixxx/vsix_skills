---
name: codexpp-sales-index
description: "Always use this Sales codexpp-sales-index skill first whenever any sales-related workflow might apply. This codexpp-sales-index is the mandatory router for the Sales plugin, including when the plugin is at-mentioned directly or when the user mentions sales, sellers, account executives, customers, prospects, accounts, opportunities, pipeline, forecast, CRM, meeting prep, call follow-up, account research, account monitoring, account prioritization, internal source finding, competitive briefs, deal strategy, company or contact enrichment, customer quote retrieval, rep coaching, business cases, sales company research, or CRM/data enrichment workflows."
---

# Skill Purpose

Always route Sales-related requests through this codexpp-sales-index before using a focused Sales skill. Treat any sales-adjacent workflow trigger as strong intent to use this plugin; default to loading and following any relevant focused skill for related sales work.

## Skill Configuration

### User Context

Mandatory pre-answer gate: Invoke `sales:codexpp-sales-user-context` in preflight mode by loading `[$sales:codexpp-sales-user-context](../codexpp-sales-user-context/SKILL.md)` and running its preflight script before answering, searching connectors, retrieving evidence, or drafting output. Do not look for a callable MCP tool named `sales:codexpp-sales-user-context`. Use the returned `sales_preflight` envelope as authoritative for saved context, source-category mapping, final obligations, and conditional guidance. Do not read or reinterpret raw Sales state files unless preflight fails, local shell access is unavailable, or the user explicitly asks for raw state inspection.

Route direct context requests to `codexpp-sales-user-context` as the primary workflow. This includes remember/save/recall/inspect/customize/setup requests and broad future-facing instructions or corrections that may be reusable after Sales work. Route requests to run Sales Company Research, learn how the user's team sells from available company context, discover useful Sales resources, or fill missing company-context setup to `sales-company-research`; that skill uses `codexpp-sales-user-context` for save/update policy. Let `codexpp-sales-user-context` own direct state reads/writes, confirmation wording, action-oriented continuation, and successful-run learning; this codexpp-sales-index should only identify and route those cases.

### Audience And Language

Write for Sales users, not plugin maintainers. This applies to final answers, setup/status readbacks, failure explanations, tool preambles, and mid-turn progress narration.

Translate implementation work into practical Sales impact: what Sales is checking, setting up, saving, or preparing, and why it matters. Avoid implementation terms such as preflight, state file, cache, raw connector id, heartbeat, targetThreadId, schema, API, runtime, metadata, and provider taxonomy unless the user asks for debugging details.

### Source Links

When referencing sources inline, prefer clickable Markdown links over plain bracket labels whenever the source exposes a useful URL. Use the source title, record name, channel/thread, or meeting/date as the link text, for example a clickable Markdown link whose visible text is `Meeting notes: May 19` or `Slack thread: May 15-21`. Use plain text labels only when no useful URL or stable connector-visible link is available, and say `(no useful link available)` when that absence matters.

### Broad Orientation And Help Requests

For broad orientation and help requests:

- Handle open-ended Sales asks from this codexpp-sales-index before choosing a focused workflow.
- Route requests such as `what can you do?`, `help`, `orient me`, `what should I try first?`, `how do I use Sales?`, setup-adjacent capability questions, and similar plugin-level requests here when the user needs orientation more than a specific artifact.
- Answer from the skill map in this file using the default shape below.
- Include concrete low-friction next prompts that start with `@Sales`, name the sales job, and use a realistic anchor.
- Include a short setup context section from the `sales_preflight.context.sources` envelope when any source category is not active, needs a user choice, was skipped, or is otherwise unresolved.
- Keep setup context seller-facing: name the practical source category, use model judgment to explain the likely user-experience impact from the category label, preferred apps, setup action, and suggested next prompts, then give the smallest next action or fallback.
- Show at most three highest-impact gaps by default, and never more than five setup-context bullets total. Prioritize gaps in the order most relevant to the examples you are suggesting rather than following a hard-coded impact catalog.
- If all categories are active, keep setup context to one sentence such as `Your core Sales sources look ready; I'll still try each source only when a workflow needs it.`
- When the current context or available sources identify a real meeting, call, account, deal, forecast, account list, customer question, or feedback theme, use the relevant focused skill's inline first-run and next-step guidance to make the suggested prompt contextual.
- For setup context wording, be direct and practical, for example: `You won't be able to properly use meeting follow-up until a transcript or meeting-notes provider is connected, but you can paste call notes or a transcript export for now.`
- Use static examples only when no suitable context is available.
- Do not expose raw status names, onboarding state fields, connector ids, or implementation terms.
- Do not perform connector reads merely to answer a capability question; use the preflight setup summary and any current session app/tool availability already visible in context.

Use this default answer shape for broad orientation and help requests:

```md
Sales can help with:
- Meeting prep and daily customer-meeting briefs
- Follow-up packages after calls, demos, or discovery notes
- Internal source-finding for customer questions and objections
- Deal strategy, account prioritization, forecast review, and account-signal briefs
- Competitive briefs, customer quote pulls, rep coaching, enrichment, and business cases

Setup context:
- {Only include when useful: source category readiness or gap plus practical impact}

Good first prompts:
- `@Sales prepare me for my next customer meeting.`
- `@Sales follow up from my latest customer call.`
- `@Sales prioritize my accounts for pipeline focus this week.`
```

### Routing And Skill Selection

If several focused skills apply, sequence them in the order that creates the most useful seller workflow. For example, meeting prep may precede deal strategy, and customer-call follow-up may feed a forecast or account-intelligence update. Keep this codexpp-sales-index as a router; do not perform focused workflow logic here.

Before finalizing future Sales instruction edits, run `python3 plugins/sales/skills/codexpp-sales-user-context/scripts/validate_user_context_preflight.py` from the repository root. Treat a missing mandatory pre-answer gate in any `SKILL.md`, including helper skills, as an audit finding to fix before release.

Prefer examples that route to focused skills without extra setup, such as:

```text
@Sales prepare me for my next customer meeting.
@Sales follow up from my latest customer call.
@Sales prioritize my accounts for pipeline focus this week.
```

For follow-up messages such as "yes", "walk me through it", "what happened?", or "show the steps" immediately after a completed guided workflow offers an agent-journey walkthrough, route to `codexpp-sales-user-context` and use `../codexpp-sales-user-context/references/onboarding.md#agent-journey-walkthrough`. Explain the observable steps, tool/app calls, retrievals, source gaps, and artifact assembly at a beginner-friendly level without revealing hidden reasoning.

# Plugin Purpose

Sales provides portable, evidence-grounded sales workflows for account research, competitive intelligence, meeting prep, deal strategy, pipeline and forecast review, customer follow-up, product-feedback evidence, internal navigation, business case, and rep coaching. It uses active workflow source categories such as CRM, calendar, meeting notes provider, external customer messaging, internal messaging, and document store tools when they can reduce manual input; pasted notes, uploaded files, exports, or public research remain supported fallback and enrichment paths.

# Skills

## analyze-account-signals

Analyze fresh signals for a named account, owner portfolio, or watchlist and turn them into evidence-backed account intelligence using active Sales source categories and user-provided context.

Route here for account views, account monitoring, "what changed with this customer?", or portfolio-watchlist requests. It is read-only and must not create tasks, post digests, or store schedule state.

## build-competitive-brief

Build a multi-competitor build-competitive-brief report, comparison matrix, and battlecard-style objection package using user-provided materials, optional connector-assisted research, and public evidence.

Route here for vendor comparisons, market-landscape questions, competitive positioning, and objection preparation.

## follow-up-after-call

Turn a recent customer, partner, or important internal call transcript or grounded call notes into a seller-ready follow-up package with a recap, next steps, external comms when applicable, CRM next steps when applicable, and an internal follow-up draft.

Route here after calls, discovery notes, demos, or transcript uploads.

## enrich-company-and-contact-data

Build portable sales enrich-company-and-contact-data outputs for company and contact discovery, firmographic or technographic completion, ICP list building, segmentation, trigger analysis, market scans, and enrichment-backed comparison work using configured source categories and user-provided inputs.

Route here when the request is data-first rather than meeting, deal, forecast, narrative, or coaching-first. If the selected enrichment provider is ZoomInfo, also load `zoominfo` before provider-specific connector work. If the selected enrichment or outbound provider is Apollo, also load `apollo` before provider-specific connector work.

## plan-deal-strategy

Build a post-discovery deal strategy pack with a deal map, buying committee map, procurement risk register, and prioritized next actions from grounded deal evidence.

Route here when the user needs to decide how to move an active deal forward from grounded deal evidence.

## hubspot

HubSpot CRM connector guide for Sales workflows that use HubSpot for CRM reads, drafts, notes, or proposed record changes.

Route here only as a helper after another focused sales workflow has selected HubSpot, or when the user explicitly asks for Sales HubSpot CRM connector rules. Do not route here for non-HubSpot CRM use.

## find-key-internal-sources

Find the best internal experts, documents, and chat channels for a customer question, product topic, objection, implementation issue, account task, or other internal topic using user-provided context, optional connector-assisted search, and evidence-backed ranking.

Route here for "who knows about this?", "what should I read before answering this customer?", "where is the source of truth?", or "which internal channel/doc should I use?" sales-support requests.

## sales-company-research

Explicit-only Sales workflow for scheduled or codexpp-sales-index-routed company research that finds durable internal resources, saves high-confidence Sales plugin memory, and asks focused follow-up questions.

Route here for company research, resource discovery, filling missing Sales context, recurring Sales Company Research automation runs, or broad questions about which company resources would materially improve future Sales workflows. Do not route ordinary customer questions or one-off owner/doc/channel lookup here; use `find-key-internal-sources` for those.

## prepare-for-meeting

Create concise pre-meeting briefs and daily prep for customer meetings or the user's most important meeting of the day, using authoritative internal context plus supplementary public web enrichment.

Route here for upcoming customer meetings, daily customer-facing schedules, or recurring meeting prep automation runs that should prefer customer/account meetings when available and otherwise help with the day's most important qualifying meeting.

## suggest-sales-next-step

Run scheduled or manual Sales check-ins that summarize recent Sales work and recommend one next Sales workflow to try.

Route here for recurring weekday sales check-in or daily check-in automation runs, manual "run my sales check-in" requests, plugin adoption reviews, or questions about how to get more value from Sales. Do not use this skill for ordinary sales artifacts; route those to the focused workflow that owns the artifact.

## prioritize-accounts

Prioritize rep-ready pipeline by ranking accounts, suppressing in-flight motion, selecting the best reachable contact, and producing a connector-grounded account action view plus a concise planning-only action package from CRM, user-provided lists, saved context, and optional enrichment evidence.

Route here for "which accounts should I work now?", territory planning, pipeline creation, or ICP/account-list prioritization.

## find-customer-quotes

Retrieve theme-specific customer or prospect quotes from transcripts, call notes, or exported recordings using transcript-first evidence and explicit speaker-confidence rules.

Route here for voice-of-customer quote pulls, theme validation, or product-friction evidence requests. If live transcript connectors are unavailable, use the skill's manual/export lane when the user supplies transcript or call-note material.

## review-forecast

Generate a forecast review with risk analysis, recommendation posture, and change detection using CRM truth, pasted or exported pipeline context, account notes, and optional meeting, email, document, or internal-message evidence.

Route here for seller-book reviews, forecast risk checks, commit/pipeline hygiene, or deal-by-deal forecast recommendations.

## codexpp-sales-user-context

Load or manage the Sales plugin's durable user context, onboarding logic, setup progress, automation metadata, saved preferences, non-obvious CRM conventions, source-of-truth pointers, book-of-business sources, internal team resources, account channels, approval trackers, trusted examples, approved Sales Company Research saves, "please remember" requests, and broad future-facing instructions such as always/never/prefer/next-time feedback after a Sales draft.

Route here before Sales workflows to load saved context, and for direct remember, save, recall, inspect, setup, customization, context-maintenance, or approved Sales Company Research save requests. This skill owns Sales plugin-scoped user context and memory policy.

## salesforce

Agentforce Sales connector guide for Sales workflows that use Salesforce for CRM reads, drafts, notes, account plans, Agentforce assignments, or proposed record changes.

Route here only as a helper after another focused sales workflow has selected Salesforce, or when the user explicitly asks for Sales Salesforce CRM connector rules. Do not route here for non-Salesforce CRM use.

## get-rep-call-feedback

Compare one rep’s call history against peer examples to extract repeatable best practices and produce evidence-backed coaching feedback.

Route here for peer-benchmark coaching requests that name a target rep and peer set or ask to derive peer exemplars.

## review-rep-call-trends

Analyze a sales or customer-facing rep’s recent calls to detect improvement, regression, and stable patterns with objective evidence and practical coaching actions.

Route here for trend-oriented coaching, progress checks, or "how has this rep changed?" requests.

## build-business-case

Build customer-led business cases, ROI narratives, value models, executive summaries, and customer-ready value stories from uneven customer context, metrics, transcripts, notes, and public evidence.

Route here when the user needs credible customer-value reasoning rather than generic positioning.

## zoominfo

ZoomInfo connector guide for Sales workflows or explicit ZoomInfo requests involving company search, contact search, enrichment, intent signals, similar-account discovery, contact recommendations, and company or contact research.

Route here only as a helper after `enrich-company-and-contact-data` or another focused workflow has selected ZoomInfo, or when the user explicitly asks for Sales ZoomInfo connector rules.

## apollo

Apollo connector guide for Sales workflows or explicit Apollo requests involving prospect search, company details, Apollo credit-aware enrichment, account/contact mutations, sequence planning, and gated outbound launch actions.

Route here only as a helper after `enrich-company-and-contact-data`, `prioritize-accounts`, or another focused workflow has selected Apollo, or when the user explicitly asks for Sales Apollo connector rules.
