# Module 10 — Design Reviews for Agentic Systems

---

## Narrative Anchor: Where This Module Fits the Bigger Argument

> **For facilitators and curriculum reviewers.** This section maps the module's specific content to the programme's core argument. It is not a content summary — it is an explicit signpost for where and how to reinforce the key ideas.

Modules 05 through 09 established the automation layer: machine-speed reviews at every SDLC phase, hygiene practices that keep automation accurate, observability that justifies trust, security enforcement that makes autonomy safe, and FinOps governance that keeps the economics rational.

This module is where freed human capacity is most productively invested.

When routine reviews are automated — when the first-pass PRD check, the evaluator scan of every PR, the security scanner on every commit, and the cost anomaly alert on every agent run are all running at machine speed — senior engineers and architects are no longer consumed by checklist work. They have time, perhaps for the first time, to conduct the deep, structured review sessions that have always been the highest-leverage work in software development: architectural design reviews with cross-functional panels, security design reviews with threat modelling specialists, and stakeholder alignment sessions with product owners.

This is not an aspirational future. These sessions have always been best practice. They were crowded out by the sheer volume of first-pass review work that now belongs to machines.

**The key argument:** Design reviews matter *more* in an agentic world, not less. Bad architectural decisions that once took a team weeks to accumulate can now be embedded across an entire codebase in hours. The speed of AI-generated code makes design discipline more important, not optional. And for the first time, teams have the human capacity to do it properly.

**Including Security Design Reviews:** This module explicitly incorporates security design reviews as a distinct category of human-level review — the counterpart to the automated security scanning covered in Module 08. Automated tools catch pattern-based security vulnerabilities at machine speed. Security design reviews address what automation cannot: whether the overall trust model is sound, whether the threat model reflects actual adversary behaviour, and whether the security architecture will hold under novel conditions.

**The programme integration point:** The 12-point design review checklist in this module is the integration point for the entire programme. Each item maps to a prior module. Running a full design review is applying the complete framework: automated review (05), hygiene (06), observability (07), security (08), FinOps (09) — all evaluated against a single system before it goes to production.

**The XP/DevOps/Clean Architecture moment:**
- XP's "system metaphor" practice — maintaining a shared, high-level description of how the system works — is what ADRs formalise. Teams who maintained system metaphors produced better design reviews because everyone shared context.
- DevOps' "architecture runway" concept — deliberate investment in enabling architecture that makes future automation safe — is what agentic design reviews protect. Teams who cut design reviews to go faster accumulate the technical and security debt that makes agentic automation unsafe.
- Clean Architecture: the 12-point checklist is substantially a Clean Architecture audit applied to agentic systems. Boundary discipline (item 01), separation of concerns (item 03), and dependency management (item 02) all trace directly to Clean Architecture principles.

---

## Learning Objectives

- Explain why design reviews matter more, not less, in an agentic world
- Apply agent-first design principles to a system you are building
- Run a complete agentic design review using the 12-point checklist
- Conduct a structured security design review — the human work that automated scanning cannot do
- Write an Architecture Decision Record that agents and engineers can use as persistent context
- Identify the six most common agentic design failures and how to prevent them
- Map the 12-point checklist back to the practices of Modules 05–09 and explain how they integrate

---

## Programme Scope Note

This module bridges two concerns:

**Part 1 — Reviewing your use of coding agents (Claude Code, Copilot) in the SDLC.** The agent-first design principles (P1–P6), AX design thinking, and ADR practices apply directly to how your team works today. These are not hypothetical — they govern how you structure your codebase, your CLAUDE.md, and your agent workflows right now.

**Part 2 — Designing production agent systems responsibly.** If your team's output is itself an agent system (e.g., deployed on AWS Bedrock / Amazon Agent Core), the 12-point checklist and shadow mode rollout describe the governance required before that system touches production.

Both parts use the same vocabulary and the same review discipline. The difference is the blast radius.

---

## Background — Why Design Reviews Matter More Now

Speed of AI-generated code makes design discipline more important, not less. Bad architectural decisions that once took a team weeks to accumulate can now be embedded across an entire codebase in hours. A misunderstood security model, an incorrect trust boundary, or a poorly scoped agent identity can be propagated at the speed of code generation before anyone notices.

The numbers are stark. Gartner projects that 40% of agentic AI projects will be cancelled by end of 2027 due to escalating costs, unclear business value, or inadequate risk controls. Despite 93% of IT leaders intending to deploy agents, only 2% have done so at scale. The gap is almost entirely architectural, not capability.

**But here is the opportunity that the statistics do not capture:** Because automated review now handles the first-pass work across every SDLC artifact, senior engineers and architects have more available capacity for design-level decisions than at any prior point in software practice. The design review session can now be what it was always supposed to be — a rigorous, cross-functional examination of the system's most consequential decisions — rather than a rushed meeting squeezed between PR reviews.

Security cannot be retrofitted. Sandboxing, identity, kill switches — all must be designed in from day one. Adding them after deployment is 10× harder and 10× more expensive. The design review is where these commitments are made, documented, and tested.

---

## Core Concepts

### Agent-First Design Principles

Six principles distilled from Anthropic engineering, Spotify Honk, and 12-Factor Agents:

**P1 — Reduced flexibility equals predictability.** Spotify's core design decision. Intentionally constrain what the agent can do. Less flexibility means more reliable behaviour — and significant secondary security benefits. Before adding a capability, ask: does the agent actually need this? Every capability is an attack surface.

**P2 — Infrastructure outside the agent.** Slack communications, git push, prompt authoring — all handled outside the agent boundary. The agent focuses only on its specialised task. No scope creep inside the agent boundary. This principle is Clean Architecture's single responsibility applied to agent design.

**P3 — Every tool must justify its existence.** Self-contained, non-overlapping, purpose-specific. If you cannot articulate in one sentence why a tool exists and what it uniquely enables, remove it. Every tool is a potential escalation path, an attack surface, and an additional cost driver.

**P4 — Folder structure is context engineering.** How you organise your project communicates intent to the agent. Design the file structure as carefully as the agent logic itself. "The folder and file structure of an agent becomes a form of context engineering." (Anthropic)

**P5 — Design for the failure mode, not the happy path.** Agents excel at happy paths. Design explicitly for: context window exhaustion, tool failures, scope drift, and adversarial inputs. Your failure handling will be invoked more often than you expect — especially at scale.

**P6 — Subagent over monolith.** When a task is complex, decompose before building. A monolithic agent with 20 tools is fragile, untestable, and difficult to audit. An orchestrator with four focused subagents is robust, testable, and auditable — and each subagent can be sandboxed independently (Module 08).

### Agent Experience (AX) Design

Design your systems for agent experience the same way you apply developer experience (DX) thinking to APIs. An API that a developer cannot understand without reading the source code is a bad API. A codebase that an agent cannot navigate without exhaustive context loading is a costly, error-prone codebase.

| Dimension | Developer Experience (DX) | Agent Experience (AX) |
|-----------|--------------------------|----------------------|
| Discoverability | APIs have clear docs | Files have clear names; SKILL.md has precise trigger descriptions |
| Parsability | APIs return structured JSON | Specs use OpenAPI schemas; docs use llms.txt |
| Predictability | API contracts don't change silently | CLAUDE.md is stable; tool schemas are versioned |
| Error clarity | APIs return descriptive errors | Verifier failures are actionable; tell the agent what to fix |
| Context efficiency | APIs paginate large responses | Docs loaded JIT; SKILL.md under 200 lines |
| Feedback loops | APIs have webhooks and events | Verifiers run immediately; Judge evaluates synchronously |

### Architecture Decision Records

ADRs are the institutional memory of your system. Agents read them to understand why constraints exist. Engineers read them to avoid re-litigating settled decisions. Design reviews produce them as outputs and depend on them as inputs.

**ADR template:**

```markdown
# ADR-[number]: [Short descriptive title]

**Date:** YYYY-MM-DD
**Status:** Proposed | Accepted | Deprecated | Superseded by ADR-[number]

## Context
What situation or constraint forced this decision?

## Decision
What was decided, and why was this option chosen over alternatives?

## Alternatives considered
What other approaches were evaluated? Why were they rejected?

## Consequences
- What becomes easier as a result?
- What becomes harder or is now prohibited?
- What must be monitored going forward?

## Review trigger
Under what conditions should this decision be revisited?
```

Store ADRs in an `adr/` folder. Commit to git. Reference in CLAUDE.md for just-in-time agent access. One decision per ADR. Link superseded ADRs forward.

**Spotify pattern:** Engineers discuss architecture in Slack. An agent listens, summarises the decision, and drafts the ADR. Team reviews and merges. ADRs written in minutes, not hours. The human makes the decision; the agent makes it durable.

### Security Design Reviews — The Human Work Automated Scanning Cannot Do

Module 08 established that automated security tooling covers the pattern-matching surface at machine speed: SAST, DAST, dependency scanning, secret detection, OWASP checklist compliance. This is continuous, consistent, and cheap.

What automated tooling cannot do is the architectural security review. This requires human security engineers with business context and adversary understanding. The questions that only humans can answer:

- **Is the overall trust model sound?** Given the actual trust relationships in this system — between the agent and external services, between subagents, between agent outputs and downstream consumers — are the trust boundaries drawn correctly?
- **Does the threat model reflect actual adversaries?** Automated scanners match against known patterns. Human threat modelling considers what a motivated adversary with specific goals would attempt against this specific system.
- **Will the security architecture hold under novel conditions?** Regulatory changes, new attacker capabilities, business model changes — automated tools model the present threat landscape, not the future one.
- **Does data handling respect the spirit of compliance requirements?** Compliance frameworks are written in human language for human interpretation. Meeting the letter of a requirement while violating its intent is a category of failure that automated tools cannot detect.
- **Are the security trade-offs appropriate for the business context?** Every security decision involves a trade-off between security posture and operational capability. These trade-offs require business judgement, not just technical expertise.

**Running a structured security design review:**

Include in every design review for any system that has write access to production data, external API call authority, or access to PII.

**Who should be in the room:**
- Security engineer (threat modelling expertise)
- Enterprise architect (system-level trust boundary authority)
- Engineering lead (implementation accountability)
- Data governance representative (PII and classification authority, if applicable)
- SRE or platform engineer (operational security perspective)

**The security design review agenda:**

1. **Trust model validation** (10 min): Review the trust hierarchy. What does this agent trust? What trusts this agent? Where are the trust boundaries? Are they correctly drawn?

2. **Threat model review** (15 min): Walk through the OWASP GenAI Top 10 threats (Module 08) against this specific system. For each applicable threat: what is the attack vector, what is the blast radius, and what is the mitigation?

3. **Data classification audit** (10 min): What data does this agent access? What is its classification? Is the agent's access level appropriate? Where does data flow after the agent produces output?

4. **Novel threat discussion** (10 min): What would a motivated adversary with knowledge of this system attempt? This is open-ended — it cannot be automated. Use the STRIDE model (Spoofing, Tampering, Repudiation, Information Disclosure, DoS, Elevation of Privilege) as a framework.

5. **Remediation and sign-off** (5 min): Document findings, assign owners and timelines, and record the security sign-off (or block on specific remediations).

> The security design review is what becomes possible when Module 08's automated scanning runs on every commit. The human session focuses on architectural and adversarial questions — not on catching secrets in code or known vulnerability patterns, because those are already handled automatically.

### The 12-Point Design Review Checklist

No production agent system goes live without passing this review. For coding agent workflows (Claude Code, Copilot), use the lightweight subset — items marked with (L).

| # | Area | Key Questions | Module ref |
|---|------|--------------|-----------|
| 01 (L) | Identity & Permissions | Unique agent identity? Least-privilege tools? Short-lived secrets? No credentials in prompts? | 08 |
| 02 | Sandboxing | Isolated container? Minimal binaries? Egress allowlist? External comms outside agent? | 08 |
| 03 | Tool Design | Single purpose per tool? Self-contained? Non-overlapping? Schema documented? | 10 (P3) |
| 04 (L) | Context Engineering | CLAUDE.md under 300 lines? Skills for domain knowledge? JIT retrieval? Compaction threshold set? | 03, 06 |
| 05 (L) | Spec & DoD | SPEC.md in repo? Acceptance criteria per feature? Non-goals stated explicitly? | 04, 06 |
| 06 (L) | Verifier Loop | Tests + linter before PR? Evaluator agent configured? Adequate test coverage? | 05, 06 |
| 07 (L) | HITL Gates | Irreversible actions behind hard gate? Interrupt conditions defined? Escalation path specified? | 05, 06 |
| 08 | Kill Switch | Task pause mechanism? Quarantine playbook? Full shutdown procedure? Kill switches tested? | 08 |
| 09 | Observability | OTel GenAI spans? Eval suite defined? SLOs set? SIEM integration? Audit log retention? | 07 |
| 10 (L) | FinOps | Budget limits at all levels? Model routing strategy? Cost per unit tracked? Caching implemented? | 09 |
| 11 | ADRs | Key decisions documented? ADRs in adr/ folder? Referenced in CLAUDE.md? | 06, 10 |
| 12 | Security Design Review | Trust model validated? Threat model reviewed with security engineer? Data classification confirmed? | 08, 10 |

**(L) = Lightweight coding-agent subset (apply to Claude Code workflows)**

### The Programme Integration Point

The 12-point checklist makes explicit what this programme has been building toward: a system that cannot pass this review has gaps in one or more of the practices covered in Modules 05–09.

| Checklist items | Covered in |
|----------------|-----------|
| 01, 02, 08 — Identity, Sandboxing, Kill Switches | Module 08 (Security & Reliability) |
| 06, 07 — Verifier Loop, HITL Gates | Module 05 (Review Cycles) |
| 04, 05, 11 — Context, Spec, ADRs | Modules 03, 04, 06 |
| 09 — Observability | Module 07 |
| 10 — FinOps | Module 09 |
| 12 — Security Design Review | Modules 08, 10 |

A team that has applied Modules 05–09 thoroughly will find this review checklist is largely confirming what they have already built. A team that has skipped modules will find the checklist surfacing the gaps.

### Proven Architecture Patterns

**Orchestrator + Subagents** — For complex multi-step tasks needing parallelisation. Lead agent decomposes task, spawns specialists, merges results. Each subagent: fresh context, minimal tools, independently sandboxed. Reference: Spotify Honk, Anthropic Agent SDK.

**Background + Interactive** — For async work with real-time human communication. Interactive agent handles conversation and intent. Background agent executes without blocking. Results delivered via notification. Reference: Spotify Honk Part 1.

**Spec → Plan → Execute** — For feature development with quality control. Agent reads spec, produces plan (human-approved), executes task-by-task, verifier checks each task, Judge reviews diff, human merges. Reference: 12-Factor Agents, JetBrains Junie.

**Event-Driven Agent** — For reactive workflows. Agent wired to events (PR opened, test failed) rather than cron. Stateless reducer: replay any run from the event log. Reference: 12-Factor Agents Factor 11.

---

## Common Design Failures

| Failure | Cause | Prevention |
|---------|-------|-----------|
| The Kitchen Sink Agent | One agent, 25 tools, 2,000-line system prompt | Decompose: orchestrator + focused subagents (P6) |
| Security as Afterthought | Deployed without kill switch, shared credentials, no threat model | Security design review before first deployment |
| No Spec, No Done | Built from vague instructions, no acceptance criteria | SDD workflow (Module 04) before any code |
| Context Bankruptcy | Context fills with irrelevant history, quality degrades | Compaction strategy designed upfront (Module 03) |
| The Budget Surprise | Pilot costs $50/month → scale to 1,000 users → $80,000 | FinOps architecture before scaling (Module 09) |
| Missing Human Gates | Full autonomy in production, irreversible changes | Autonomy spectrum analysis, HITL gates upfront (Module 05) |

---

## Shadow Mode Rollout

```
Phase 0: Development environment only
    │
    ▼
Phase 1: Shadow mode — agent runs on real inputs but
         outputs are logged, not applied; human compares
         agent output to actual outcome
    │
    ▼
Phase 2: Limited traffic — agent active for 5–10% of workload
         with heightened monitoring
    │
    ▼
Phase 3: Full traffic — SLOs active, ongoing monitoring,
         regular design review cadence
```

Gate each phase transition on: eval score threshold (Module 07), zero critical security findings (Module 08), cost model within budget (Module 09), and explicit sign-off from engineering lead and security.

---

## Enterprise Considerations

**Design review as an audit artifact.** Completed design review documents — including the security design review — are evidence of due diligence. Store them with your change management records. Reference them in incident post-mortems. In regulated industries, the review record may be subject to audit.

**Review cadence for long-running agents.** Conduct a lightweight review annually for any agent that has been in production for more than a year. The threat landscape, the business context, and the agent's actual behaviour may all have shifted. The security design review should be included in this annual cycle.

**Cross-team agents.** If an agent spans multiple teams' systems, the review board must include representation from all affected teams. A security design review that does not include the teams whose data the agent accesses is incomplete.

**Change management.** Design reviews are a governance practice as much as a technical one. Get sign-off from security, compliance, and finance before the first production agent goes live — and before any significant scope expansion.

---

## Lab Exercise

**Time:** 45 minutes (capstone)

**Goal:** Run a full design review on the agentic system you are building — either a coding agent workflow or a production agent system. Apply the full 12-point checklist to a production system; apply the lightweight subset (items 01, 04, 05, 06, 07, 10) to a coding agent workflow.

1. **Finalise your architecture** (10 min) — Draw the complete system: orchestrator/subagents, tools, memory strategy, context sources, HITL gates, kill switch, and budget model. Apply P1–P6 to evaluate each design choice. For each principle: does your design satisfy it? If not, what needs to change?

2. **Run the 12-point checklist** (12 min) — For each item: ✓ Pass, ⚠ Partial (needs work), ✗ Gap. Document every gap with an owner and a specific remediation action. If you are using the lightweight subset, explain which items you are deferring and why they do not apply to your coding agent workflow.

3. **Write one ADR** (8 min) — Identify the single most important architectural decision in your system — the decision that, if revisited, would change the most. Write a full ADR using the template. It must be specific, consequential, and include the alternatives you considered and rejected.

4. **Run the security design review** (10 min) — Working in pairs (one plays security engineer, one plays engineering lead): walk through the four-step security design review agenda. Identify your top three security risks with mitigations and owners. What is the one question you would not trust an automated scanner to answer for this system?

5. **Present to peer review** (5 min) — Present your architecture, the checklist results, and the security design review findings. The audience plays an enterprise architecture review board. Focus questions: what is the blast radius of a failure, and what happens when the agent does something unexpected?

---

## Facilitator Notes

**Set expectations early.** This is a capstone exercise. Participants should draw on their work from all previous modules. The architecture from earlier sessions, the SLOs from Module 07, the cost model from Module 09, and the threat model from Module 08 should all feed this review.

**The security design review in step 4 is often the most valuable part.** Pairs reviewing each other's trust models surface gaps that self-review misses. The question "what would a motivated adversary attempt?" consistently reveals design assumptions that were not examined under the pressure of building.

**Common finding across cohorts:** Most designs pass items 1–6 reasonably well but fail on items 7–12. Kill switches are rarely designed. FinOps limits are rarely set. Security design reviews are almost never documented. Use this pattern to reinforce that operational and governance concerns are as important as functional ones — and that automated reviews of functional concerns (Modules 05-07) are what create the space to address the governance concerns properly.

**The programme integration question:** Ask participants to trace each item on their checklist failure list back to the module that covers the remediation. If a team has gaps in observability (item 09), that is a Module 07 gap. If they have gaps in HITL gates (item 07), that is a Module 05 gap. This makes the programme's coherence visible and gives participants a roadmap for improvement after the session.

---

## Further Reading

- Anthropic: Building effective agents — https://www.anthropic.com/engineering/building-effective-agents
- NIST AI Risk Management Framework — https://www.nist.gov/
- OWASP LLM Top 10 v2025 — https://owasp.org/www-project-top-10-for-large-language-model-applications/
- Spotify Engineering Blog: Honk series — https://engineering.atspotify.com/
- ISO/IEC 42001: AI Management Systems standard
- Microsoft STRIDE Threat Model — for security design review framework
