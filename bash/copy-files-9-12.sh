#!/usr/bin/env bash
# =============================================================
# modules-09-12.sh — Enterprise Agentic Development Training
# Writes markdown for modules 09-12
# Run from: /Users/iggybdda/Code/stainedhead/Slides/agentic-dev-training
# Usage: bash modules-09-12.sh
# =============================================================
 
set -euo pipefail
BASE="/Users/iggybdda/Code/stainedhead/Slides/agentic-dev-training"
mkdir -p "$BASE/modules"
echo "Writing modules 09-12 to $BASE/modules ..."
 
# =============================================================
cat > "${BASE}/modules/09-finops.md" << 'ENDOFFILE'
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
 
**Goal:** Cost-model your agent workflow and identify your highest-ROI optimisation.
 
1. **Estimate token costs** (7 min) — For the agent you designed in Module 02: estimate tokens per operation (system prompt, tool calls, responses, compaction). Use current Claude Sonnet pricing. What does one run cost? What does 1,000 runs per day cost?
 
2. **Apply the five levers** (6 min) — Which levers apply to your design? For each: estimate % savings and implementation effort (1–5). Rank by ROI.
 
3. **Design your budget architecture** (6 min) — Define limits at each level: org, team, feature, session, request. What triggers each alert? What is automated vs. manual?
 
4. **Choose your tooling** (4 min) — Vantage, Langfuse, Portkey, or Datadog? What is the one dashboard your team looks at daily?
 
5. **Share your cost model** (2 min) — Share your $/day estimate. What surprised you? Where is the biggest cost risk?
 
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
 
ENDOFFILE
echo "  ✓ modules/09-finops.md"
 
# =============================================================
cat > "${BASE}/modules/10-design-reviews.md" << 'ENDOFFILE'
# Module 10 — Design Reviews for Agentic Systems
 
## Learning Objectives
 
By the end of this module you will be able to:
- Explain why design reviews matter more, not less, in an agentic world
- Apply agent-first design principles to a system you are building
- Run a complete agentic design review using the 12-point checklist
- Write an Architecture Decision Record that agents and engineers can use as persistent context
- Identify the six most common agentic design failures and how to prevent them
 
---
 
## Background — Why Design Reviews Matter More Now
 
Speed of AI-generated code makes design discipline more important, not less. Bad architectural decisions that once took a team weeks to accumulate can now be embedded across an entire codebase in hours.
 
The numbers are stark. Gartner projects that 40% of agentic AI projects will be cancelled by end of 2027 due to escalating costs, unclear business value, or inadequate risk controls. Despite 93% of IT leaders intending to deploy agents, only 2% have done so at scale. The gap is almost entirely architectural, not capability.
 
Security cannot be retrofitted. Sandboxing, identity, kill switches — all must be designed in from day one. Adding them after deployment is 10× harder and 10× more expensive.
 
---
 
## Core Concepts
 
### Agent-First Design Principles
 
Six principles distilled from Anthropic engineering, Spotify Honk, and 12-Factor Agents:
 
**P1 — Reduced flexibility equals predictability.** Spotify's core design decision. Intentionally constrain what the agent can do. Less flexibility means more reliable behaviour, plus secondary security benefits. Before adding a capability, ask: does the agent actually need this?
 
**P2 — Infrastructure outside the agent.** Slack communications, git push, prompt authoring — all handled outside the agent. The agent focuses only on its specialised task. No scope creep inside the agent boundary.
 
**P3 — Every tool must justify its existence.** Self-contained, non-overlapping, purpose-specific. If you cannot articulate why a tool exists and what it uniquely enables, remove it. Every tool is a potential escalation path and an attack surface.
 
**P4 — Folder structure is context engineering.** How you organise your project communicates intent to the agent. Design the file structure as carefully as the agent logic itself. Anthropic: "The folder and file structure of an agent becomes a form of context engineering."
 
**P5 — Design for the failure mode, not the happy path.** Agents excel at happy paths. Design explicitly for: context window exhaustion, tool failures, scope drift, and adversarial inputs. Your failure handling will be invoked more often than you expect.
 
**P6 — Subagent over monolith.** When a task is complex, decompose before building. A monolithic agent with 20 tools is fragile. An orchestrator with four focused subagents is robust, testable, and auditable.
 
### Agent Experience (AX) Design
 
Design your systems for agent experience the same way you apply developer experience (DX) thinking to APIs.
 
| Dimension | Developer Experience (DX) | Agent Experience (AX) |
|-----------|--------------------------|----------------------|
| Discoverability | APIs have clear docs | Files have clear names; SKILL.md has precise trigger descriptions |
| Parsability | APIs return structured JSON | Specs use OpenAPI schemas; docs use llms.txt |
| Predictability | API contracts don't change silently | CLAUDE.md is stable; tool schemas are versioned |
| Error clarity | APIs return descriptive errors | Verifier failures are actionable; tell the agent what to fix |
| Context efficiency | APIs paginate large responses | Docs loaded JIT; SKILL.md under 200 lines |
| Feedback loops | APIs have webhooks and events | Verifiers run immediately; Judge evaluates synchronously |
 
### Architecture Decision Records
 
ADRs are the institutional memory of your system. Agents read them to understand why constraints exist. Engineers read them to avoid re-litigating settled decisions.
 
**ADR template:**
 
```markdown
# ADR-001: [Short descriptive title]
 
**Date:** YYYY-MM-DD
**Status:** Proposed | Accepted | Deprecated | Superseded by ADR-XXX
 
## Context
What situation or constraint forced this decision?
 
## Decision
What was decided, and why was this option chosen over alternatives?
 
## Consequences
- What becomes easier as a result?
- What becomes harder or is now prohibited?
- What must be monitored going forward?
```
 
Store ADRs in an `adr/` folder. Commit to git. Reference in CLAUDE.md for just-in-time agent access. One decision per ADR. Link superseded ADRs forward.
 
**Spotify pattern:** Engineers discuss architecture in Slack. An agent listens, summarises the decision, and drafts the ADR. Team reviews and merges. ADRs written in minutes, not hours.
 
### The 12-Point Design Review Checklist
 
No agent goes to production without passing this review.
 
| # | Area | Key Questions |
|---|------|--------------|
| 01 | Identity & Permissions | Unique agent identity? Least-privilege tools? Short-lived secrets? No credentials in prompts? |
| 02 | Sandboxing | Isolated container? Minimal binaries? Egress allowlist? External comms outside agent? |
| 03 | Tool Design | Single purpose per tool? Self-contained? Non-overlapping? Schema documented? |
| 04 | Context Engineering | CLAUDE.md under 300 lines? Skills for domain knowledge? JIT retrieval? Compaction threshold set? |
| 05 | Spec & DoD | SPEC.md in repo? Acceptance criteria per feature? Non-goals stated explicitly? |
| 06 | Verifier Loop | Tests + linter before PR? Judge LLM or diff review? Adequate test coverage? |
| 07 | HITL Gates | Irreversible actions behind gate? Escalation path defined? Response time acceptable? |
| 08 | Kill Switch | Task pause mechanism? Quarantine playbook? Full shutdown procedure? Kill switches tested? |
| 09 | Observability | OTel GenAI spans? SIEM integration? Budget anomaly alerts? Audit log retention? |
| 10 | FinOps | Budget limits at all levels? Model routing? Cost per unit tracked? Caching implemented? |
| 11 | ADRs | Key decisions documented? ADRs in adr/ folder? Referenced in CLAUDE.md? |
| 12 | Compliance | NIST AI RMF mapped? PII redaction? Data retention policy? Governance review scheduled? |
 
### Proven Architecture Patterns
 
**Orchestrator + Subagents** — For complex multi-step tasks needing parallelisation. Lead agent decomposes task, spawns specialists, merges results. Each subagent: fresh context, minimal tools, sandboxed. Reference: Spotify Honk, Anthropic Agent SDK.
 
**Background + Interactive** — For async work with real-time human communication. Interactive agent handles conversation and intent. Background agent executes without blocking. Results delivered via notification. Reference: Spotify Honk Part 1.
 
**Spec → Plan → Execute** — For feature development with quality control. Agent reads spec, produces plan (human-approved), executes task-by-task, verifier checks each task, Judge reviews diff, human merges. Reference: 12-Factor Agents, JetBrains Junie.
 
**Event-Driven Agent** — For reactive workflows. Agent wired to events (PR opened, test failed) rather than cron. Stateless reducer: replay any run from the event log. Reference: 12-Factor Agent Factor 11.
 
---
 
## Common Design Failures
 
| Failure | Cause | Prevention |
|---------|-------|-----------|
| The Kitchen Sink Agent | One agent, 25 tools, 2,000-line system prompt | Decompose: orchestrator + focused subagents |
| Security as Afterthought | Deployed without kill switch, shared credentials | Security checklist before first deployment |
| No Spec, No Done | Built from vague instructions, no AC | SDD workflow (Module 04) before any code |
| Context Bankruptcy | Context fills with irrelevant history, quality degrades | Compaction strategy designed upfront (Module 03) |
| The Budget Surprise | Pilot costs $50/month → scale to 1,000 users → $80,000 | FinOps architecture before scaling (Module 09) |
| Missing Human Gates | Full autonomy in production, irreversible changes | Autonomy spectrum analysis, HITL gates upfront |
 
---
 
## Enterprise Considerations
 
**Change management.** Design reviews are a governance practice, not a technical one. Get sign-off from security, compliance, and finance before the first production agent goes live — not after.
 
**Audit trail.** Every design review decision must be documented. ADRs serve this purpose. In regulated industries, the review record may be subject to audit.
 
**Review cadence.** Run a design review at: (1) before first agent deployment, (2) before scaling an existing agent, (3) after any material change to agent scope or tools, (4) quarterly for agents in production.
 
---
 
## Lab Exercise
 
**Time:** 45 minutes (capstone)
 
**Goal:** Run a full design review on the agent you have designed throughout this programme.
 
1. **Finalise your architecture** (10 min) — Draw the complete system: orchestrator/subagents, tools, memory strategy, context sources, HITL gates, kill switch, budget model.
 
2. **Run the 12-point checklist** (12 min) — For each point: ✓ Pass, ⚠ Partial (needs work), ✗ Gap. Document every gap with an owner and timeline.
 
3. **Write one ADR** (8 min) — Identify the single most important architectural decision in your system. Write a full ADR using the template. It must be specific, consequential, and irreversible.
 
4. **Threat model + FinOps model** (8 min) — Identify your top 3 OWASP threats with mitigations and owners. Estimate $/day at 1,000 runs. Identify the highest-ROI optimisation lever.
 
5. **Present to peer review** (7 min) — 10-minute presentation. Panel plays the role of an enterprise architecture review board. Focus questions: security gaps, cost model, and what happens when the agent fails.
 
---
 
## Facilitator Notes
 
**Set expectations early.** This is a capstone exercise. Participants should have the work from all previous labs to draw on. Allow time for setup.
 
**The peer review is the most valuable part.** Pairs reviewing each other's designs surface gaps that self-review misses. The question "what happens when this fails?" consistently reveals the most important gaps.
 
**Common finding:** Most designs pass items 1–6 reasonably well but fail on items 7–12. Kill switches are rarely designed. FinOps limits are rarely set. Use this pattern to reinforce that operational concerns are as important as functional ones.
 
---
 
## Further Reading
 
- Anthropic: Building effective agents — https://www.anthropic.com/engineering/building-effective-agents
- NIST AI Risk Management Framework — https://www.nist.gov/
- OWASP LLM Top 10 v2025 — https://owasp.org/www-project-top-10-for-large-language-model-applications/
- Spotify Engineering Blog: Honk series — https://engineering.atspotify.com/
- ISO/IEC 42001: AI Management Systems standard
 
ENDOFFILE
echo "  ✓ modules/10-design-reviews.md"
 
# =============================================================
cat > "${BASE}/modules/11-product-first-engineering.md" << 'ENDOFFILE'
# Module 11 — Product-First Engineering
 
## Learning Objectives
 
By the end of this module you will be able to:
- Articulate the difference between project thinking and product thinking, and explain why agents make this distinction critical
- Build and maintain deep product understanding across four domains: users, architecture, business, and codebase
- Write a PRODUCT.md that serves as shared context for both the team and the agent
- Design a hygiene cadence that runs continuously rather than as a cleanup sprint
- Describe the developer's evolving role as a product guide rather than a ticket implementer
 
---
 
## Background — The Paradigm Shift
 
When agents write code at 10× speed, a project mindset does not scale. Projects have start dates, end dates, and a go-live. After go-live, the team disperses. Tribal knowledge is lost. The next team rebuilds context from scratch. The codebase accumulates decisions that nobody remembers making.
 
A product mindset treats software as a long-lived system that evolves continuously with business needs. The team stays with the product. Context accumulates. Quality is a practice, not a gate.
 
With agents writing the code, the developer's highest-value activity becomes understanding and guiding the product — not implementing tickets.
 
| Dimension | Project Mindset | Product Mindset |
|-----------|----------------|-----------------|
| Time horizon | Bounded: start → go-live → done | Unbounded: evolves as long as needed |
| Success definition | On time and on budget | Users succeed; codebase is healthy |
| Team relationship | Temporary: assembled, then disbanded | Permanent: team owns through lifecycle |
| Context | Rebuilt each time; tribal knowledge lost | Accumulated, documented, agent-accessible |
| Quality | Good enough to ship | Sustainable: designed to last |
| Developer role | Implements tickets assigned by PM | Co-owns the product; guides its evolution |
| Agentic implication | Agents build features in isolation | Agents grow a well-understood system |
 
---
 
## Core Concepts
 
### Deep Product Understanding
 
The agent builds what the team understands. If the team does not know the product deeply, neither will the agent.
 
**The Users** — Who uses this product and why? What jobs are they trying to do? Where do they succeed, and where do they struggle? How do their needs change over time? Feed user research, journey maps, and feedback themes into agent context.
 
**The Architecture** — What are the core bounded contexts? What are the integration contracts? Where are the known weak spots? What constraints shaped the current design? ADRs, architecture docs, and schema definitions prevent architectural violations.
 
**The Business** — What capabilities does this system enable? What are the north star metrics? What is the cost of downtime or quality failure? What is the competitive differentiation? Agents that understand business context prioritise correctly.
 
**The Codebase** — What are the dominant patterns? Where is the most-changed code (hotspots)? Where is the highest-risk code (complexity)? What does the test coverage picture look like? Map hotspots and complexity so agents make safer changes.
 
### The Product Context Document (PRODUCT.md)
 
A living document that is both the team's shared mental model and the agent's primary product context source. Commit it to the repo. Reference it in CLAUDE.md.
 
**Recommended structure:**
 
```markdown
# Product Vision
One paragraph. What does this system exist to do?
 
## Users
Personas, jobs-to-be-done, key pain points.
 
## Business Context
North star metrics, strategic importance, cost of failure.
 
## Architecture Overview
Bounded contexts, integration contracts, key constraints.
 
## Design Principles
The non-negotiable rules governing how we build.
 
## Known Hotspots
High-change and high-complexity code areas.
 
## Roadmap Context
What is coming that agents must not contradict.
 
## Non-Negotiables
Security, compliance, and quality floors.
```
 
**How the team uses it:** Every new team member reads it first. It is referenced before writing any spec. Architecture decisions are checked against it. Retrospectives update it.
 
**How the agent uses it:** Loaded via CLAUDE.md every session. Prevents architectural drift. Gives the agent the "why" behind every constraint. Enables self-checking: "Does this fit the product?"
 
### Developers as Product People
 
Andrew Ng (YC AI Startup School, 2025): "For the first time in my life, managers are proposing having 2× as many PMs as engineers. The engineer who understands the product is the engineer who is indispensable."
 
| Old Role — Code Implementer | New Role — Product Guide |
|-----------------------------|--------------------------|
| Write code to satisfy a ticket | Guide the product's evolution intelligently |
| Implement what the PM specifies | Co-author the spec with context the PM lacks |
| Optimise for story points delivered | Optimise for user outcomes and system health |
| Hand off and move to the next ticket | Own the outcome end to end |
| System knowledge lives in one person's head | System knowledge is documented, shared, agent-accessible |
| Quality is a test run before shipping | Quality is a continuous practice |
 
### Building Shared Team Understanding
 
Six practices that build shared understanding across the whole team:
 
**Living documentation** — PRODUCT.md, ADRs, architecture diagrams, user journey maps — all committed to the repo, all current, all readable by humans and agents. Weekly ritual: one team member updates one section as part of the definition of done.
 
**Code literacy for everyone** — Every team member — including PMs and designers — can navigate the codebase, read hotspot reports, and understand the risk profile of major changes. Monthly: 30-minute codebase walkthrough covering what changed, what is growing, and what is risky.
 
**Cross-functional spec writing** — PM brings user context. Developer brings system constraints. Architect brings design principles. Agent gets all three. Every sprint: spec review session before agents write a line of code.
 
**Shared definition of quality** — The whole team agrees on what "good" looks like: test coverage floors, performance budgets, accessibility standards, security baselines. Written down. Enforced. Reviewed quarterly.
 
**Domain knowledge capture** — When a developer has an insight about why the system works the way it does, it gets written down immediately. Agent-assisted: developers narrate the insight; agent drafts the ADR for review.
 
**Outcome-focused retrospectives** — Did users succeed? Did the system get healthier? Did the team's shared understanding deepen? Bi-weekly: retro includes a "product health" check alongside the usual process questions.
 
### Hygiene Cadence
 
A project team never has time for hygiene. A product team builds it into the cadence because the product is always running.
 
| Frequency | Activities |
|-----------|-----------|
| **Daily** | Agent runs dependency vulnerability scans; linter and type coverage report generated; test flakiness tracked; cost-per-request monitored |
| **Weekly** | Codebase hotspot review; agent generates PR summary for tech lead; PRODUCT.md section updated by rotating owner; spec backlog groomed |
| **Sprint** | Architecture compliance check vs ADRs; test coverage gap analysis with agent writing missing tests; performance budget review; security posture check |
| **Quarterly** | Full codebase complexity and health report; quality contract review; ADR review; agent workflow retrospective |
 
### Agent-Assisted Continuous Improvement
 
Agents make hygiene economically viable at scale. Tasks that would take a sprint can run overnight.
 
**Dependency hygiene** — Weekly scheduled agent run: scan for outdated and vulnerable dependencies, group by risk level, open low-risk PRs automatically (Tier 1), flag high-risk changes for human review.
 
**Test coverage growth** — Post-merge agent run on changed files: identify files with coverage below threshold, generate missing unit tests, verify tests pass and are meaningful, open PR for human review.
 
**Documentation refresh** — Triggered by significant PR merge: agent reads diff and identifies doc gaps, updates API docs and architecture notes, flags PRODUCT.md sections that may be outdated.
 
**Code quality enforcement** — Pre-PR agent hook: linter, formatter, type checker, complexity check, security pattern check. Agent self-corrects formatting issues before the human sees the diff.
 
---
 
## Enterprise Considerations
 
**Organisational resistance.** The project mindset is deeply embedded in most enterprise cultures — tied to budget cycles, headcount planning, and success metrics. Product thinking requires explicit leadership endorsement and changes to how teams are resourced and measured.
 
**Portfolio management.** Product teams need standing allocation, not project-by-project budget approval. Work with finance to establish a product budget model that includes a floor for hygiene and NFR investment.
 
**Measuring health.** Define and track product health metrics: test coverage trend, complexity trend, tech debt index, deployment frequency, mean time to recovery. Make these visible to leadership — not just to engineers.
 
---
 
## Lab Exercise
 
**Time:** 40 minutes
 
**Goal:** Write your team's PRODUCT.md and use it to guide a real agent.
 
1. **Assess your current state** (5 min) — Rate each of the four domains (Users, Architecture, Business, Codebase) from 1 (nothing documented) to 5 (fully documented and current). What is your average? What is the single biggest gap?
 
2. **Write the Vision section** (8 min) — One paragraph: what does this system exist to do, for whom, and why does it matter? Swap with a neighbour — does it tell them enough to make a sensible architecture decision?
 
3. **Map Users and Business** (8 min) — Write the Users and Business Context sections. Include the top 3 user personas, their jobs-to-be-done, your north star metric, and the cost of a major quality failure.
 
4. **Identify hotspots and non-negotiables** (7 min) — Name the 3 files or modules most likely to cause problems. Name the 3 non-negotiable quality or architecture constraints. Add both to PRODUCT.md.
 
5. **Test the agent with your document** (8 min) — Open Claude Code. Load your PRODUCT.md. Ask it to propose an approach to a real upcoming feature. Does it make better decisions? What is still missing?
 
6. **Design your hygiene cadence** (4 min) — Choose one daily, one weekly, and one sprint-cadence hygiene practice. For each: what agent workflow enables it? Who reviews the output?
 
---
 
## Facilitator Notes
 
**Opening question:** "How long would it take a new developer to understand your product well enough to guide an agent safely? Days? Weeks? Months?" This calibrates where each team is starting from.
 
**The PRODUCT.md exercise is the highest-value activity in this module.** Teams that write even a rough first draft leave with something immediately useful. Push them to be specific — "our users are enterprise developers" is not enough; "our users are mid-to-senior developers who have never shipped a production agent and are nervous about doing so" is actionable.
 
**Common insight:** Most teams discover that their product context lives almost entirely in one or two people's heads. The module helps them see the risk this represents — and the cost it imposes on every agent they deploy.
 
---
 
## Further Reading
 
- Marty Cagan: Inspired — How to Create Tech Products Customers Love (book)
- Team Topologies — Matthew Skelton and Manuel Pais — team structure for fast flow
- Accelerate — Nicole Forsgren et al. — metrics for software delivery performance
- DORA metrics — https://dora.dev/
- Thoughtworks: Product over project — https://martinfowler.com/articles/products-over-projects.html
 
ENDOFFILE
echo "  ✓ modules/11-product-first-engineering.md"
 
# =============================================================
cat > "${BASE}/modules/12-three-person-team.md" << 'ENDOFFILE'
# Module 12 — The Three-Person Product Team
 
## Learning Objectives
 
By the end of this module you will be able to:
- Explain why three equal peers with rotating roles is the optimal unit for agentic product delivery
- Describe the scope and responsibilities of each of the three roles: Solution Architect, Spec Engineer, and DevOps Guardian
- Design a role rotation schedule that builds shared understanding and prevents knowledge silos
- Navigate system-level collaboration and avoid local optimisations that harm the wider organisation
- Advocate for NFR health and technical debt prevention using business language
 
---
 
## Background — The Team Size Question
 
Team size is not arbitrary. Three is the minimum that covers all critical roles and the maximum that avoids communication overhead.
 
Communication paths grow as n(n−1)/2. Three people: 3 paths. Five people: 10 paths. Ten people: 45 paths. Every additional person adds coordination cost that compounds with every decision, every review, and every meeting.
 
With agents writing code at machine speed, the bottleneck is no longer implementation — it is decision-making, alignment, and oversight. A three-person team makes these fast. A ten-person team makes them slow.
 
**Why three covers everything:**
 
A three-person team with agents can match the feature output of a ten-person team without agents, while maintaining the communication simplicity of three. The leverage comes from the agents, not the headcount.
 
---
 
## Core Concepts
 
### The Three Roles
 
These are roles, not job titles. Every team member holds all three roles over time. Every team member is responsible for everything.
 
---
 
#### Role 1 — Solution Architect
 
**Tagline:** Develops, reviews, and approves the PRD.
 
**Responsibilities:**
- Deeply understands the product, users, and business context
- Translates business needs into Product Requirements Documents
- Reviews and approves specs for architectural alignment
- Owns PRODUCT.md and Architecture Decision Records
- Represents product intent in cross-team collaboration
- Guards against architectural drift and system-level conflicts
 
**Agent collaboration:** Uses agents to research domain context, draft PRD sections, check for conflicts with existing ADRs, and generate architectural options for review.
 
---
 
#### Role 2 — Spec Engineer
 
**Tagline:** Transforms approved PRDs into executable specifications and agentic delivery.
 
**Responsibilities:**
- Takes approved PRDs and produces complete SDD artefacts
- Writes requirements.md, plan.md, tasks.md, test specs, acceptance criteria
- Orchestrates agentic teams for code, tests, and documentation delivery
- Verifies all agent output against acceptance criteria
- Ensures implementation matches intent throughout the delivery cycle
- Captures learnings as ADRs and updates PRODUCT.md
 
**Agent collaboration:** Orchestrates multi-agent delivery pipelines: spec → plan → implementation → tests → documentation. Reviews all agent PRs before merge.
 
---
 
#### Role 3 — DevOps Guardian
 
**Tagline:** Owns environments, operations, code health, and tools.
 
**Responsibilities:**
- Manages CI/CD pipelines, deployment infrastructure, and tooling
- Conducts code and design reviews on all merged changes
- Runs hygiene cadence: dependency updates, security scans, coverage
- Manages build, deployment, and agent tooling
- Handles production issues, user support, and incident response
- Monitors NFR health: performance, reliability, security, cost
 
**Agent collaboration:** Uses agents for automated hygiene, monitoring, tooling builds, and scheduled CI tasks. Reviews agent tool quality and infrastructure as code.
 
---
 
### Equal Peers, Rotating Roles
 
The role is temporary. The responsibility is permanent. Every team member owns everything, always.
 
**Sample rotation — quarterly:**
 
| Team Member | Q1 | Q2 | Q3 | Q4 |
|-------------|----|----|----|----|
| Alex | Solution Architect | Spec Engineer | DevOps Guardian | Solution Architect |
| Jordan | Spec Engineer | DevOps Guardian | Solution Architect | Spec Engineer |
| Sam | DevOps Guardian | Solution Architect | Spec Engineer | DevOps Guardian |
 
**Why rotation works:**
 
*Eliminates knowledge silos.* Every team member knows every part of the system. No single points of failure. No "only Alex knows how that works."
 
*Builds empathy across roles.* A developer who has worked as DevOps Guardian writes more deployable code. A Spec Engineer who has done Architecture writes better specs.
 
*Maintains full accountability.* When you know you will be DevOps Guardian next quarter, you write code you would want to deploy and maintain. Incentives align naturally.
 
*Resilience and continuity.* The team functions identically if one member is absent. No critical path through a single person. Bus factor greater than one at all times.
 
### The Product Owner Relationship
 
The Product Owner provides direction and priority. The team provides expertise, capability, and long-term product health advocacy.
 
**Product Owner responsibilities:**
- Owns the product roadmap. Defines what to build next and why.
- Represents external stakeholders, users, and customers.
- Works with the Solution Architect to develop and refine PRDs.
- Approves PRDs before they advance to specification.
- Allocates team capacity across features, hygiene, NFR investment, and tech debt.
- May own multiple products, each served by its own three-person team.
 
**Team NFR advocacy — the team's side of the relationship:**
 
The team's job is not only to deliver features. It is to advocate for the long-term health of the product, including pushing back when feature velocity is coming at the cost of reliability, security, or maintainability.
 
NFR advocacy must be done in business language:
 
*Frame as risk:* "This service has no circuit breaker. One downstream failure causes a cascade. That is a P1 incident waiting to happen. Estimated cost: $X."
 
*Frame as velocity tax:* "Our test coverage is at 48%. Every feature change requires three days of manual regression testing. We are paying 30% of our velocity on insurance we never collect."
 
*Frame as opportunity cost:* "We cannot take on this new feature in Q3 because the data model cannot support it safely. We need one sprint to address the design constraint first."
 
### The Full Delivery Flow
 
```
Business Need (Product Owner)
    ↓
PRD Development (Solution Architect + PO)
    ↓
PRD Approval (PO approves intent, Architect approves soundness)
    ↓
Specification (Spec Engineer: requirements.md, plan.md, tasks.md, AC)
    ↓
Implementation (Spec Engineer + Agent Teams: code, tests, docs)
    ↓
Review & Deploy (DevOps Guardian: code review, CI/CD, deploy)
    ↓
Retrospective + Capture (Whole team: ADRs, PRODUCT.md, hygiene)
    ↓
(back to top)
```
 
No step is skipped. No implementation starts without an approved PRD. No PR merges without DevOps Guardian review.
 
### System Collaboration — No Local Optimisation
 
A product team that optimises only for its own product will eventually damage the wider system it operates within.
 
**API contracts before implementation.** Agree on interfaces with dependency teams before writing a line of code. Breaking changes need upstream coordination, not last-minute surprises.
 
**Share your roadmap, learn theirs.** Regular syncs with dependency and consumer teams. Your quarterly roadmap context helps them plan. Theirs reveals conflicts early enough to address.
 
**Platform over duplication.** Before building a capability, check whether the platform team or a shared service already provides it. Local duplicates fragment the system and create maintenance burden.
 
**NFRs are system-wide, not local.** A performance optimisation that creates a bottleneck for consumer teams is not an optimisation. Measure impact at the system level, not at the product level.
 
### Structural Protections Against Technical Debt
 
**Capacity allocation floor.** Negotiate a standing allocation with the PO: minimum 20% of sprint capacity for hygiene, NFR improvement, and technical debt reduction. Non-negotiable. In writing.
 
**Quality contract.** Written, team-agreed standards: test coverage floor, performance budgets, security checklist, complexity limits. Posted. Enforced. Reviewed quarterly.
 
**Debt quantification.** Track tech debt as a metric alongside velocity and quality. Present the "debt compound interest" curve to POs: debt left unaddressed costs more to fix every quarter.
 
**NFR as acceptance criteria.** Every PRD includes NFR acceptance criteria: "This feature must not degrade p95 latency by more than 10ms." Non-functional becomes non-negotiable.
 
**Rotation builds advocates.** A team member who has done DevOps Guardian knows exactly how painful bad code is to operate. Rotation creates NFR advocates naturally, not through policy.
 
### Team Operating Principles
 
**P1 — All members review all changes.** No change merges without at least one other team member's review. Not for bureaucracy — for shared understanding.
 
**P2 — Role holder is a servant to the role.** The Spec Engineer for this sprint does not own specs forever. They serve the role, complete the work, and hand it over cleanly.
 
**P3 — The product's health is always team business.** Any team member can raise a product health concern regardless of their current role.
 
**P4 — Context is shared, not siloed.** Any insight about users, architecture, business, or code gets written down immediately — in PRODUCT.md, in an ADR, in NOTES.md. It belongs to the team.
 
**P5 — Velocity is a team metric, not individual.** No one tracks individual story points. The team ships together. One person stuck means everyone helps.
 
**P6 — Agents are team tools, not individual assistants.** Agent workflows, CLAUDE.md, Skills, and tools are owned by the whole team. Maintained as shared infrastructure.
 
---
 
## Enterprise Considerations
 
**Organisational change management.** The three-person equal-peers model is a significant departure from traditional team hierarchies. It requires explicit sponsorship from engineering leadership. The hardest cultural change is the equality — many organisations reflexively want a "team lead."
 
**Scaling beyond three.** If the product genuinely needs more capacity, the answer is a second three-person team working on a related product, not adding a fourth person to the existing team. Two teams of three communicate through Product Owner alignment and shared ADRs.
 
**Career frameworks.** Traditional career frameworks reward specialisation and seniority. The rotating-roles model rewards breadth. Work with HR to ensure the model is reflected in performance expectations and promotion criteria.
 
**The Product Owner as a multiplier.** A single PO can manage multiple three-person teams if the products are related enough to share context. This is a structural advantage — it enforces system-level thinking at the PO level.
 
---
 
## Lab Exercise
 
**Time:** 45 minutes
 
**Goal:** Design your three-person team — real product, real plan.
 
1. **Map your current team to the model** (7 min) — Using your real team today: identify which people would fill the three roles. Who is naturally inclined toward each? What gaps or overlaps exist? What would have to change to operate this model?
 
2. **Design your rotation schedule** (8 min) — Design a six-month rotation schedule. How long per rotation? What does handover look like? What documentation is required before a role transitions?
 
3. **Define your NFR floor** (8 min) — Write the quality contract your team would commit to: minimum test coverage, performance budget, security checklist frequency, complexity limits. How would you present this to your PO?
 
4. **Map your system dependencies** (7 min) — Draw your product's dependency graph. Which teams do you consume from? Which consume from you? What contracts are missing? What collaboration cadence would prevent local optimisation?
 
5. **Draft your tech debt case** (8 min) — Identify your single largest source of tech debt. Frame it in business language using one of the three frames: risk, velocity tax, or opportunity cost. Draft a one-sprint investment proposal with expected return.
 
6. **Commit to one change this week** (7 min) — Each group shares one change they will make to their team's operating model this week — not next quarter. What is the smallest concrete step toward the product team model starting Monday?
 
---
 
## Facilitator Notes
 
**Opening question:** "How many of you have worked on a team where only one person understood a critical part of the system? What happened when that person left?" This universally resonates and sets up the rotation discussion powerfully.
 
**The equality point is the hardest.** Many participants instinctively want to assign seniority or decide who "owns" each role permanently. Push back directly: "The whole point is that everyone owns everything. If you need a permanent owner, you have a different problem."
 
**The tech debt framing exercise is consistently the highest-rated activity.** Most engineers know there is debt but have never framed it in terms a PO will respond to. When they translate "our test coverage is low" into "we are paying 30% of our velocity on insurance we never collect," they leave with something they can actually use.
 
**Close the programme here.** This is Module 12. Take ten minutes at the end to review the full programme — what changed in each participant's thinking, and what they are committing to do differently.
 
---
 
## Further Reading
 
- Team Topologies — Matthew Skelton and Manuel Pais — the definitive guide to team structure for fast software delivery
- The Mythical Man-Month — Frederick Brooks — still the canonical reference on why adding people to a late project makes it later
- Accelerate — Nicole Forsgren, Jez Humble, Gene Kim — data on what actually predicts software delivery performance
- Shape Up — Basecamp — an alternative to Scrum that emphasises small teams and fixed time horizons
- Marty Cagan: Empowered — Product teams vs feature teams
 
ENDOFFILE
echo "  ✓ modules/12-three-person-team.md"
 
echo ""
echo "============================================"
echo "✅ Modules 09-12 markdown files written."
echo ""
echo "Files created:"
ls -lh "${BASE}/modules/09-finops.md"
ls -lh "${BASE}/modules/10-design-reviews.md"
ls -lh "${BASE}/modules/11-product-first-engineering.md"
ls -lh "${BASE}/modules/12-three-person-team.md"
echo ""
echo "Next: git add -A && git commit -m 'feat: add modules 09-12 markdown'"
echo "============================================"