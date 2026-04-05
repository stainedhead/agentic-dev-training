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
 
