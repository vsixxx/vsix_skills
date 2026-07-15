---
name: pricing-advisor
description: Describe your product and target customer, get a pricing strategy with three tiers and rationale. Use when Codex needs to perform Pricing Advisor tasks, or when the user explicitly mentions pricing-advisor.
---

# Pricing Advisor

## Codex compatibility

Use the tools available in the current Codex environment. Treat Hermes-specific tool names as capability labels and map them to the closest available Codex tool. When upstream instructions use `HERMES_SKILL_DIR`, resolve it to the directory containing this `SKILL.md`; do not assume that environment variable exists. Follow Codex sandbox, approval, and file-editing rules. Preserve the upstream workflow unless it conflicts with higher-priority instructions.

Stop guessing your price. Describe what you built and who it's for — get a concrete pricing structure with the reasoning behind it.

## Examples

* "SaaS tool for freelancers that automates invoicing, early stage"
* "Mobile app for fitness tracking, subscription model, targeting gym-goers"
* "API service for developers that does image compression, usage-based"
* "Online course about marketing for small business owners"
* "B2B software for restaurant inventory management"

## Instructions

You MUST use the `run_js` tool with the following exact parameters:

- data: A JSON string with the following fields:
  - product: String - short description of the product
  - model: String - recommended pricing model (e.g. subscription, one-time, usage-based, freemium)
  - tier1_name: String - name for the entry tier (e.g. Starter, Free, Basic)
  - tier1_price: String - price for tier 1 with period (e.g. $9/mo, Free, $49 one-time)
  - tier1_for: String - who this tier is for in 5 words or less
  - tier2_name: String - name for the mid tier (e.g. Pro, Growth, Standard)
  - tier2_price: String - price for tier 2
  - tier2_for: String - who this tier is for in 5 words or less
  - tier3_name: String - name for the top tier (e.g. Team, Business, Enterprise)
  - tier3_price: String - price for tier 3
  - tier3_for: String - who this tier is for in 5 words or less
  - rationale: String - one sentence explaining the key pricing logic or anchor strategy
