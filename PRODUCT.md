# Enterprise Agentic Practices — Programme Vision

> This document is the shared mental model for everyone who builds, maintains, and delivers this training programme — and for the agents that help produce it. It answers: what are we building, for whom, and why does it matter? Read it before writing or reviewing any module.

---

## Vision

Help enterprise developers adopt agentic AI practices safely, confidently, and with enough depth to deliver lasting improvements to how their teams build software — not just to how fast they move.

The risk this programme exists to address is not that developers will be slow to adopt agentic tools. The risk is that they will adopt them shallowly: using AI to write faster code without the engineering discipline that makes that code safe, observable, and maintainable. Speed without discipline produces technical debt at machine pace.

This programme makes the case that the engineering disciplines that great teams have always practised — spec-driven development, automated testing, continuous integration, observability, security hygiene, architectural review — are not constraints on agentic development. They are its prerequisites. Teams that have those practices already will amplify them with agents. Teams that have resisted or skipped them will need to build them now to get any durable benefit from agentic tools.

---

## Audience

### Primary: Enterprise developers at a Fortune 100 organisation

Mid-to-senior developers who write production code in enterprise Java, Python, TypeScript, or similar. They are good at what they do. Many have 5–15 years of experience. Most have never deployed a production AI system. A significant proportion have, at some point in their career, actively resisted or quietly ignored XP, DevOps, or Clean Architecture practices — not out of stubbornness, but because the organisational incentives did not reward those practices and the cost of adoption felt high relative to the visible benefit.

These developers now face a moment where that calculus has inverted. Agentic tools require the foundational practices those developers deprioritised. This programme meets them where they are and builds the case.

### Secondary: Engineering leads and architects

The people who shape team practices, make tooling decisions, and run design reviews. They need to understand the full picture — not just the techniques, but the governance, the economic argument, and the organisational change requirements. Several modules (05, 10, 11, 12) are written with this audience's decisions in mind.

### Who this programme is NOT for

- Developers building AI products as their primary output (this programme is about using agents in the SDLC, not about building agent products as such — though Module 10 bridges to that)
- Data scientists or ML engineers (the programme assumes software engineering context throughout)
- Non-technical stakeholders (though facilitators may selectively use Module 09's FinOps framing and Module 12's three-person team model in leadership conversations)

---

## The Core Argument

Every module should be legible as part of one connected argument. Facilitators, module authors, and contributing agents should be able to state this argument clearly before touching any module content.

**Before agentic tools:** Review was a scarce, expensive, and inconsistently applied human practice. Teams could only afford to review some things carefully. PRD reviews against prior architecture decisions required scheduling a meeting. Security checks ran before a major release. Test coverage audits happened when someone had time. The result was that engineering discipline was aspirational rather than actual — practiced by the best teams, sporadic everywhere else.

**With agentic tools:** The same review that took a senior engineer 45 minutes runs in seconds against explicit, consistent criteria — every time, on every artifact. PRDs are reviewed against all prior ADRs before a design session begins. Code is checked against the spec, not just against style. Tests are verified to cover acceptance criteria. Security patterns are scanned on every commit. This is not a workflow optimization. It is a structural change in what "consistent engineering discipline" means.

**What this frees humans to do:** When the pattern-matching surface of review is automated, senior engineers and architects are no longer consumed by checklist work. For the first time, they have capacity to do the high-leverage work that was always crowded out: architectural design reviews with cross-functional panels, security threat modelling with specialists, product design sessions with stakeholders and owners. The deep, structured review that produces the best outcomes was always best practice. It was consistently crowded out by the volume of first-pass review work that now belongs to machines.

**The prerequisite:** None of this works without the foundational engineering disciplines. An agent that writes code into a codebase with no test coverage cannot be safely reviewed by an evaluator agent — because there is nothing to evaluate against. An agent that modifies code with no architectural guardrails (ADRs, CLAUDE.md, clean boundaries) will produce architecturally inconsistent output. Teams that skipped XP's discipline of continuous integration, DevOps's practice of observable systems, or Clean Architecture's boundary discipline now encounter those practices not as ideals but as technical requirements for safe automation.

**The ask:** This programme asks enterprise developers to do something uncomfortable — to treat practices they may have dismissed or deferred as the price of admission to a genuinely better way of building software. The programme's job is to make that ask credible: to show that the practices work, that the economics are compelling, and that the path from where teams are to where they need to be is navigable.

---

## Programme Design Principles

These govern every module, every slide, and every exercise. When in doubt about a content decision, check it against these.

**Concepts before tools.** We start with the why and the mental models before touching any specific SDK, product, or provider. Tools change; concepts compound. A developer who understands why observability is the basis for trusting agent autonomy will adapt as the tooling landscape evolves. A developer who learned "how to set up Langfuse" will be lost when the stack changes.

**Enterprise-first.** Every pattern is evaluated through the lens of governance, compliance, audit, and scale. We are not advising startups. Our defaults must be hardened. When a practice that works well in a 10-person team would fail or create compliance risk in a 5,000-person organisation, we say so explicitly.

**Show, don't tell.** Every module contains examples grounded in real engineering practice — primarily from Anthropic's own engineering guidance, Spotify's Honk series, and the 12-Factor Agents framework. Abstract principles are always anchored to concrete decisions that real teams made and why.

**Both sides of every practice.** Each module covers its topic as both a foundational SDLC discipline (why it matters regardless of AI) and a specific enabler or prerequisite for agentic development. Observability is covered as both "how you understand any production system" and "the instrument that makes agent autonomy responsible." Design reviews are covered as both "how teams make good architectural decisions" and "where freed human capacity is most valuably invested." Neither framing is sufficient without the other.

**The two-level review model.** Throughout the programme, we consistently distinguish: what automated tools handle at machine speed (pattern-matching, consistency checks, completeness verification) versus what requires human judgment (architectural tradeoffs, threat modelling, product decisions, stakeholder alignment). This distinction is the through-line from Module 05 to Module 10. Every module should reinforce it.

**The XP/DevOps/Clean Architecture connection.** Every module that covers a foundational practice should explicitly name the prior-generation movement that advocated for it — XP, DevOps, Lean, Clean Architecture — and explain why teams who resisted it then encounter it now as a prerequisite. This is not to shame teams for past decisions. It is to give developers who know those concepts a bridge, and to show developers who don't that these ideas have track records.

**No filler.** Each slide and section earns its place. If a concept does not contribute to the core argument, it does not belong in a module slide. Depth in fewer concepts beats breadth across many.

---

## The Programme Arc

The 12 modules follow a deliberate progression. Understanding this arc is essential for facilitators and for agents generating or reviewing module content.

### Phase 1 — Foundations (Modules 01–04)

What is an agent, what makes it different, and how do you give it the context and specifications it needs to do useful work safely. These modules establish the vocabulary and mental models the rest of the programme builds on.

- **01 Chat vs. Agents** — The autonomy spectrum; what agents actually are
- **02 Core Concepts** — Tools, memory, orchestration, trust; the agent's operating environment
- **03 Context Engineering** — How to give an agent the right information at the right moment

### Phase 1b — Engineering Foundations (Modules 04–05)

The practices that every repository must have before agents can contribute safely. Documentation gives agents persistent context; testing gives them a quality baseline to work within.

- **04 Product Documentation** — Rules files, PRODUCT.md, product-details.md, technical-details.md, ADR.md, and auto-updated README.md — for greenfield and brownfield repos
- **05 Automated Testing** — TDD methodology, ≥85% coverage, AC-driven test generation, integration/functional/regression tests, and scoped E2E strategy

### Phase 2 — Automated Practices (Modules 06–09)

The machine-speed layer: the SDLC disciplines that enable automated review at every phase, keep that automation honest, and make it trustworthy. Each module is a practice in its own right and a contribution to the economic argument.

- **06 Spec-Driven Development & PRDs** — How to give an agent instructions precise enough to produce reviewable output
- **07 Review Cycles** — Automated reviews across the full artifact set (PRDs, design, code, tests)
- **08 Review Hygiene & Continuous Improvement** — Keeping automated reviews accurate over time; HITL tiers; improvement loops
- **09 Observability** — Five engineering practices that make solutions monitorable: structured logs, custom metrics, distributed traces, domain/security events, and health endpoints

### Phase 3 — Human Depth (Modules 10–12)

Where freed human capacity is most productively invested. The practices in this phase are not new — they have always been best practice. What is new is that teams finally have the capacity to do them properly because Phase 2's automation has cleared the queue.

- **10 Design Reviews** — Design principles, security design reviews, FinOps governance review, and the 12-point pre-deployment checklist
- **11 Product-First Engineering** — The developer's evolving role; product context as agent context; continuous improvement at product scale
- **12 The Three-Person Product Team** — How teams restructure around agentic capability; the minimal viable team; leadership and coordination at scale

---

## Audience Outcomes

A developer who has completed this programme should be able to:

**Apply immediately (Modules 01–06):**
- Set up a working CLAUDE.md that gives an agent useful context without overloading it
- Write a spec (PRODUCT.md, SPEC.md, PRD) that an agent can execute against with minimal ambiguity
- Design a review cycle for a real agent workflow — with HITL tiers, interrupt conditions, and an evaluator checklist
- Run an automated review of a PRD, design doc, or PR against explicit criteria
- Maintain an ADR from a design decision made in Slack

**Apply with planning (Modules 07–09):**
- Instrument a coding agent workflow with meaningful metrics and an eval suite
- Design a token budget architecture and apply at least one cost optimization lever
- Audit an agent for OWASP GenAI Top 10 risks and write mitigations for the top three
- Present the ROI case for automated review at every SDLC phase to a non-technical audience

**Apply over time (Modules 10–12):**
- Run a structured design review with a cross-functional panel
- Facilitate a security design review at the architectural level (not just a checklist scan)
- Write and maintain a PRODUCT.md that serves as shared context for both team and agent
- Describe how their team's role structure needs to evolve as agents take on more implementation work

---

## Non-Negotiables

These must be true of every module, every slide, and every exercise. They are the quality floor, not the aspiration ceiling.

**Never make the agent the subject.** Modules are about SDLC practices — review, observability, security, FinOps, design. Agents are named as the mechanism that makes those practices economically feasible at scale. A module that reads as "here's how to use Claude" has failed, regardless of its technical accuracy.

**Both halves of the equation must appear together.** Whenever the programme names what automation now handles at machine speed, it must also name what humans now have time to do instead. These two statements belong together every time. Stating only the first half implies that humans become unnecessary. Stating only the second half loses the economic argument for why the time is available.

**Exercises must be grounded in real team context.** Every exercise should be executable against a real workflow, a real codebase, or a real decision the team faces. Hypotheticals are acceptable for illustrating a concept; they are not acceptable as the sole exercise in a module.

**Enterprise implications must be explicit.** Governance, compliance, audit, and at-scale failure modes are not footnotes. They are sections. Regulated-environment considerations (financial services, healthcare, government) should be addressed wherever they apply. A module that does not address the governance question for its topic is incomplete.

**The XP/DevOps/Clean Architecture connection must be named.** Every module covering a foundational practice must explicitly connect it to the prior-generation movement that advocated for it, and state why teams that resisted it then encounter it now as a prerequisite. This connection is one of the most important things this programme does — it shows that the principles are not new, the economics are.

---

## What Good Looks Like

A well-delivered session of this programme produces three observable outcomes:

1. **A calculation.** Participants have estimated, with real numbers, the cost of current selective human review compared to the cost of comprehensive automated review. The ratio is typically 400–1000×. This calculation is what makes the business case visceral rather than theoretical.

2. **A document.** Participants leave with something they produced during the session: a PRODUCT.md, an ADR, an interrupt conditions YAML, a PR review checklist, a threat model. This is not a takeaway handout — it is a working artifact they will use next week.

3. **A question they did not have before.** "If our automated review is running consistently, what would a good architectural review session look like?" or "Who in our organisation should be in the security design review, and are we giving them time to be there?" The best sessions produce better questions, not just better answers.

---

## Sources and Influences

This programme draws on the following primary sources. Module authors and contributing agents should be familiar with these:

| Source | What we draw from |
|--------|------------------|
| **Anthropic Engineering guidance** | Building effective agents; context engineering; trust hierarchy |
| **Spotify Honk series** | Squad-level agent models; sandboxing philosophy; reduced flexibility = predictability |
| **12-Factor Agents** (Dex Horthy, HumanLayer) | Stateless agents; event-driven triggers; human-in-the-loop patterns |
| **Extreme Programming** (Beck) | Collective code ownership; continuous integration; test-driven development |
| **DevOps / DORA research** | DORA four metrics; blameless postmortems; shift-left practices |
| **OWASP GenAI Top 10 v2025** | Threat classification for LLM applications |
| **FinOps Foundation** | AI cost governance; chargeback models; optimization levers |
| **Clean Architecture** (Martin) | Boundary discipline; single responsibility; dependency inversion |
| **NIST AI RMF** | Governance framework for AI risk management |
| **Team Topologies** (Skelton & Pais) | Team structure for fast flow; cognitive load considerations |
| **Accelerate** (Forsgren et al.) | Evidence base for DevOps practices and their outcomes |

---

## Maintenance

This document should be updated when:
- The programme's target audience or delivery context materially changes
- A module is added, removed, or substantially restructured
- The core argument is refined based on delivery experience
- A significant new source (research, case study, practitioner experience) materially changes how a practice should be framed

The owner of this document is the programme lead. All module authors should reference it before making significant content decisions.

When updating: make the minimum change that accurately captures the new direction. Do not rewrite unaffected sections. Add a changelog entry below.

---

## Changelog

| Date | Change | Reason |
|------|--------|--------|
| 2026-04-07 | Document created | Initial programme vision established from working sessions on modules 05–10 |
| 2026-04-07 | Modules 05–10 markdown rewritten; narrative anchor sections added to each | User review identified that modules were not consistently framing each topic within the core argument (machine-speed automated review → freed human capacity → deeper structured reviews). All six modules now share a consistent narrative arc with explicit connections to the programme's three-phase structure. |
| 2026-04-07 | Security design reviews added as explicit category in Module 10 | User direction: design reviews should include human-depth security reviews as the counterpart to automated security scanning in Module 08. Added structured security design review section and agenda. |
| 2026-04-07 | CLAUDE.md updated to require PRODUCT.md as mandatory context | Ensures all future content work — by humans and agents — is grounded in the programme vision before any module is touched. |
| 2026-04-07 | Module 07 rewritten: focus shifted from agent-specific observability (evals, SLOs, MTTD/MTTI) to foundational solution observability practices | User direction: module should teach the five practices that make any solution observable — structured logs, custom metrics, distributed tracing, events (cross-domain and security), and health/readiness endpoints. These practices collectively enable a well-designed observability capability and improve SDLC decision-making, independent of whether agents are involved. |
| 2026-04-07 | Programme restructured: two new modules added (04 Product Documentation, 05 Automated Testing); old modules 04–07 renumbered to 06–09; old modules 08 (Security/Reliability) and 09 (FinOps) deleted; Security and FinOps review coverage now concisely in Module 10 (Design Reviews). Module count remains 12. | User direction: product documentation and automated testing are foundational prerequisites that belong early in the programme arc. Security and FinOps as standalone topics were removed; their review-layer content is now integrated concisely into the Design Reviews module. |
