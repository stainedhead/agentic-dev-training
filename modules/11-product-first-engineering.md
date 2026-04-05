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
 
Agents make hygiene economically viable at scale. Tasks that would take a sprint can run overnight. Equally important: agents are available for review and education continuously — not just when a senior developer has spare time.
 
**Dependency hygiene** — Weekly scheduled agent run: scan for outdated and vulnerable dependencies, group by risk level, open low-risk PRs automatically (Tier 1), flag high-risk changes for human review.
 
**Test coverage growth** — Post-merge agent run on changed files: identify files with coverage below threshold, generate missing unit tests, verify tests pass and are meaningful, open PR for human review.
 
**Documentation refresh** — Triggered by significant PR merge: agent reads diff and identifies doc gaps, updates API docs and architecture notes, flags PRODUCT.md sections that may be outdated.
 
**Code quality enforcement** — Pre-PR agent hook: linter, formatter, type checker, complexity check, security pattern check. Agent self-corrects formatting issues before the human sees the diff.

**Design and artefact review** — Before any spec or design goes to human review, run an agent review pass first. The agent reads the proposal alongside the existing codebase and flags: conflicts with existing architecture, missing edge cases, undefined non-functional requirements, and violations of ADR constraints. Humans then review the proposal with the agent's findings already surfaced — not starting from a blank read.

**Team education and onboarding** — Agents are available as on-demand educators at any depth. New team members use Claude Code to understand the codebase, design decisions, and team processes without interrupting senior developers. Rotating role holders use agents to quickly build context in the part of the system they are stepping into. Encode the starting questions in CLAUDE.md so every onboarding session is consistent: *"Read PRODUCT.md and the adr/ folder. Explain the three most important architectural constraints in this system and why they exist."*
 
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
 
