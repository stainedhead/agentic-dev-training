# Module 09 — FinOps for Agentic Systems
 
## Learning Objectives
 
By the end of this module you will be able to:
- Explain why AI costs behave differently from traditional cloud infrastructure costs
- Define and track the key cost metrics for agentic workloads
- Apply the five optimisation levers to reduce token spend without sacrificing quality
- Design a budget architecture with hard limits at every level
- Present AI cost as a business case to a non-technical audience
 
---
 
## Background — Why AI Costs Are Different
 
Traditional cloud bills compute hours and storage gigabytes — stable, predictable units that scale linearly. AI bills **semantic units**: tokens, agent steps, retrieval operations. These scale non-linearly and are deeply sensitive to how you design your prompts, loops, and context windows.
 
| Traditional Cloud | Agentic AI |
|-------------------|-----------|
| CPU hours, GB-months | Input tokens, output tokens, agent steps |
| Scales linearly with load | Scales with prompt length, loop depth, context size |
| Predictable from capacity plan | Surprises happen in minutes |
| Cost visible in billing dashboard | Cost visible only with LLM-specific tooling |
| Optimised by right-sizing | Optimised by prompt engineering and routing |
 
Three structural cost drivers unique to AI:
 
**Output token premium.** Across almost all providers, output tokens cost 3–8× more than input tokens. Agents that generate verbose chain-of-thought reasoning or long responses pay this premium on every step of every loop.
 
**Quadratic context growth.** Attention mechanisms mean processing a 128K-token context costs significantly more than processing an 8K context. Unbounded context windows are a budget disaster at scale.
 
**Agent loop multiplication.** A ReAct loop running 10 iterations sends the full conversation history on each call. A 10-step agent task can consume 50× the tokens of a single linear response.
 
---
 
## Core Concepts
 
### Key Cost Metrics
 
Track these six metrics. Anything else is a vanity metric.
 
**Cost per token** — Base unit. Provider rate × tokens consumed, split by input and output. Monitor trend; alert on anomalies.
 
**Cost per request** — All tokens plus overhead, divided by requests handled. Track P50 and P95. Outliers in the P95 signal runaway loops.
 
**Cost per unit of work** — Total cost divided by tasks completed: per PR opened, per feature delivered, per support ticket resolved. This is the metric your CFO will ask for.
 
**Token efficiency ratio** — Output quality score divided by tokens spent. Detect when spending more tokens stops producing better results.
 
**Tokens per session** — Track flat or declining as usage grows. Rising tokens-per-session means context is bloating.
 
**Cost per business value** — Spend divided by (revenue generated plus cost saved). Every AI dollar must justify its existence.
 
### The Five Optimisation Levers
 
Apply in this order. Start with the highest impact, lowest effort.
 
**Lever 1 — Prompt optimisation (15–25% savings)**
 
Add `be concise` to system prompts. Remove redundant instructions. Trim unnecessary examples. Identify expensive prompts via telemetry and rewrite them. The FinOps Foundation found this single change reduces token usage 15–25% on average.
 
**Lever 2 — Compaction (40–70% savings)**
 
Implement context compaction before hitting window limits. Clear tool results from early in conversation history. Keep only architectural decisions and active task state. This is the single most impactful lever for long-running agent tasks.
 
**Lever 3 — Model routing (30–60% savings)**
 
Route simple queries to cheap, fast models. Reserve frontier models for complex reasoning. Use LiteLLM, Portkey, or OpenRouter for multi-model orchestration. Review the routing strategy quarterly — pricing changes fast.
 
```
Simple classification → haiku / flash (cheap)
Code generation → sonnet (balanced)
Complex architecture reasoning → opus / pro (frontier)
```
 
**Lever 4 — Semantic caching (20–40% savings)**
 
Cache tool results for repeated or similar queries. Apply semantic caching for near-duplicate prompts. Avoid redundant API calls within agent sessions. Especially effective for RAG pipelines.
 
**Lever 5 — Prompt compression (50–95% savings)**
 
Tools like LLMLingua compress prompts using a small model before sending to the large model. Typical customer-service prompts: 800 tokens → 40 tokens. 95% input cost reduction on verbose prompts.
 
### Budget Architecture
 
Enforce limits at every level. Each layer enforces its own limit independently.
 
```
Organisation budget     ← Monthly cap, total AI spend
  └── Team budget       ← Monthly cap per team
        └── Feature budget   ← Daily cap per product feature
              └── Session token limit  ← Max tokens per agent session
                    └── Request token limit  ← Max tokens per single request
```
 
**Alert at 80%, block at 100%.** Auto-throttle before budget exhaustion. Never let a runaway agent loop run unchecked.
 
### FinOps Governance Model
 
Three pillars — the same as cloud FinOps, applied to AI:
 
**Visibility** — Make cost of every model call visible to engineers and PMs. Cost per request tracked at trace and span level. Real-time dashboards. Per-model, per-feature, per-team breakdowns.
 
**Allocation** — Tag every request: team, feature, customer, model. Enforce naming conventions on API keys. Chargeback model to engineering teams. Cost-to-serve per product feature.
 
**Optimisation** — Hard token budget limits enforced at gateway level. Alert at 80% threshold. Monthly optimisation review — spot expensive prompts. Model routing review quarterly.
 
---
 
## Enterprise Considerations
 
**Procurement and contracts.** Negotiate committed use discounts with AI providers once you have baseline usage data. Most enterprise agreements include volume tiers that reduce per-token cost significantly.
 
**Chargeback models.** Treat AI spend like cloud spend — allocate it to the consuming team or product. This creates the right incentive: teams that write efficient prompts save real budget.
 
**Finance team alignment.** AI costs appear in a new budget line that finance teams haven't seen before. Brief them early. Give them the cost-per-unit-of-work metric, not the raw token count.
 
**Regulatory cost overhead.** Compliance requirements (data residency, audit logging, encryption) add cost. Factor this into ROI calculations — a 20% cost premium for compliance is often unavoidable in financial services or healthcare.
 
---
 
## Anti-Patterns
 
| Anti-Pattern | Impact | Fix |
|---|---|---|
| Vanity metrics only | Can't identify waste | Connect every metric to business value |
| No token budget limits | Runaway loops cost thousands in minutes | Hard limits at gateway level |
| Frontier model for everything | 80% cost waste on simple tasks | Model routing strategy |
| No cost attribution | Can't optimise what you can't see | Tag every request by team and feature |
| Ignoring output token premium | Agents generating verbose CoT pay 3–8× per output token | Prompt for concise outputs |
| No caching strategy | Same tool called 100× per day, each billed separately | Semantic caching for common queries |
 
---
 
## Lab Exercise
 
**Time:** 25 minutes
 
**Goal:** Cost-model your team's actual coding agent usage and identify your highest-ROI optimisation.
 
> **Scope note:** This exercise focuses on the cost of using Claude Code and GitHub Copilot in your development workflow — not on production agent costs. The same principles apply if you later build production agents on AWS Bedrock or Agent Core, but start where the spend is real today.
 
1. **Estimate token costs** (7 min) — Pick one real Claude Code workflow your team uses (e.g., writing a new feature end-to-end, running a refactor, nightly hygiene). Estimate: how many LLM calls does a single run make? What is the approximate context size? Which model tier? Use current Claude Sonnet pricing. What does one run cost? What does 20 developer runs per day cost across your team?
 
2. **Apply the five levers** (6 min) — Which levers apply to your coding agent workflow? For each: estimate % savings and implementation effort (1–5). Which single change would you make first?
 
3. **Design your budget architecture** (6 min) — Define cost limits at each level for your team's coding agent usage: org, team, per-developer session, per-task request. What triggers each alert? What is automated vs. manual?
 
4. **Choose your tooling** (4 min) — Langfuse, Vantage, Portkey, or native Anthropic usage dashboards? What is the one view your tech lead checks weekly?
 
5. **Share your cost model** (2 min) — Share your $/day estimate. What surprised you? Where is the biggest cost risk in your current usage patterns?
 
---
 
## Facilitator Notes
 
**Key discussion prompt:** "If you scaled your current AI usage 10×, what would happen to your monthly bill? Does anyone know?" This usually reveals that most teams have no idea — which makes the budget architecture section land harder.
 
**Common objection:** "We're in a pilot, costs don't matter yet." Counter: costs at pilot scale × 1000 = production scale. The habits you form now determine what your production bill looks like.
 
**Real example to share:** FinOps Foundation research shows simply adding "be concise" to a system prompt reduces token usage 15–25%. Most teams haven't done this. It takes 30 seconds. That framing — "the easiest optimisation is often the best one" — resonates.
 
---
 
## Further Reading
 
- FinOps Foundation: AI and ML cost management framework — https://www.finops.org/
- Anthropic pricing and usage docs — https://docs.anthropic.com/en/docs/pricing
- LLMLingua paper — prompt compression research
- Vantage: AI cost management for Anthropic — https://www.vantage.sh/
- Langfuse: Open-source LLM observability — https://langfuse.com/
 
