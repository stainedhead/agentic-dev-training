# Module 06 — Product Requirements Docs & Spec-Driven Development

## Learning Objectives

- Distinguish between the historical PRD and the modern agentic PRD
- Write a PRD that an agent can operationalise, review, and extend
- Understand how a modern PRD automatically generates the full spec suite
- Apply the PRD → Spec → Plan → Tasks → Architecture pipeline in your workflow

---

## Background

The PRD has existed for decades. What has changed is not the document's purpose — it still answers *what* and *why* — but who writes it, what it knows, how it stays current, and what it produces downstream.

Understanding that evolution is the starting point for agentic development.

---

## The Evolution of the PRD

### The Historical PRD

The traditional PRD was a human artifact. A product manager or business analyst spent days or weeks writing it, often in isolation from the codebase it would eventually touch.

**Characteristics:**

| Dimension | Reality |
|-----------|---------|
| **Authorship** | One or two people, writing from memory and stakeholder interviews |
| **Codebase awareness** | None — written without reading the existing system |
| **Time to produce** | Days to weeks |
| **Review process** | Slow — async comments, email chains, meetings |
| **Drift** | Begins drifting from reality the day development starts; rarely updated |
| **Completeness** | Implicitly incomplete — gaps filled by developers asking questions |
| **Agent usability** | Low — ambiguous language, missing edge cases, no machine-verifiable criteria |

The historical PRD was not a bad tool for its context. Human developers could fill gaps from experience and ask questions when stuck. The PRD was a starting point for a human conversation.

The problem: agents cannot have that conversation. An agent encountering ambiguity does not ask — it decides. And that decision may not be the one you wanted.

### The Modern Agentic PRD

The modern PRD is written with an agent as a collaborator and read by an agent as its primary instruction set. It is not longer or more formal — it is more precise, more grounded, and continuously maintained.

**Characteristics:**

| Dimension | Reality |
|-----------|---------|
| **Authorship** | Human provides intent and context; agent drafts, expands, and stress-tests |
| **Codebase awareness** | High — agent reads existing code, architecture docs, and ADRs before drafting |
| **Time to produce** | Hours, not days — agent handles the prose; human handles the decisions |
| **Review process** | Agent finds gaps, contradictions, and missing edge cases before human review |
| **Drift** | Minimal — agent can re-check PRD against code at any time and flag divergence |
| **Completeness** | Structurally enforced — agent flags every undefined edge case and open question |
| **Agent usability** | High — numbered requirements, explicit non-goals, machine-readable acceptance criteria |

**How an agent improves a PRD:**

```
Human writes intent (rough draft or bullet points)
    ↓
Agent reads existing codebase, ADRs, PRODUCT.md
    ↓
Agent drafts full PRD sections with codebase context
    ↓
Agent reviews its own draft:
  - "Requirement FR-4 conflicts with the existing UserService contract"
  - "Non-functional requirement for latency is undefined — what is the target?"
  - "This feature touches PII — no data handling requirement is specified"
    ↓
Human reviews and resolves flagged issues
    ↓
PRD is approved — ready to generate the spec suite
```

---

## The Modern PRD Structure

A PRD written for agentic workflows must be explicit where the historical PRD could be vague.

**Required sections:**

| Section | What it specifies |
|---------|------------------|
| **Problem statement** | What is wrong or missing today? (concrete, not abstract) |
| **Goals** | What does success look like? (measurable outcomes, not features) |
| **Non-goals** | Explicitly what is out of scope — tells the agent where to stop |
| **Functional requirements** | Numbered, testable statements: "The system SHALL…" |
| **Non-functional requirements** | Latency, throughput, security, compliance, cost ceiling |
| **Constraints** | Existing systems the solution must integrate with or not break |
| **Codebase context** | Which existing modules, services, or schemas are affected |
| **Acceptance criteria** | The machine-verifiable conditions that close this PRD |
| **Open questions** | Explicit list of unresolved decisions — agent flags these before speccing |

> The **Non-goals** and **Open questions** sections are the most important for agents. They define the boundary of autonomous decision-making. Anything not listed as a non-goal is in scope. Any open question is a gap the agent will fill — with or without your input.

---

## PRD → Spec Suite: The Automated Pipeline

The modern PRD is not the end of the documentation chain — it is the beginning of an automated pipeline that produces everything the agent needs to implement.

```
 ┌─────────────────────────────────────────────────────┐
 │                  APPROVED PRD                       │
 │   (human intent + agent-verified, codebase-aware)   │
 └──────────────────────┬──────────────────────────────┘
                        │
                        ▼  Agent generates:
        ┌───────────────┼────────────────┐
        │               │                │
        ▼               ▼                ▼
  ┌──────────┐   ┌──────────────┐  ┌──────────────────┐
  │  SPEC.md │   │ ARCHITECTURE │  │   SCHEMA DOCS    │
  │          │   │    .md       │  │  (data models,   │
  │ How the  │   │              │  │   API contracts, │
  │ system   │   │ Components,  │  │   event shapes)  │
  │ works    │   │ integrations,│  └──────────────────┘
  └────┬─────┘   │ constraints  │
       │         └──────────────┘
       ▼
  ┌──────────┐
  │  PLAN.md │
  │          │
  │ Ordered  │
  │ approach,│
  │ phases,  │
  │ risks    │
  └────┬─────┘
       │
       ▼
  ┌──────────┐
  │ TASKS.md │
  │          │
  │ Discrete │
  │ agent    │
  │ work     │
  │ units +  │
  │ AC each  │
  └────┬─────┘
       │
       ▼  Agent implements:
  ┌──────────┐
  │   CODE   │  ← tests written first (TDD), then implementation
  └────┬─────┘
       │
       ▼
  ┌──────────┐
  │    PR    │  ← human reviews decision, not diff
  └──────────┘
```

### What Each Artifact Contains

**SPEC.md** — The technical translation of the PRD. How the system will be built: component design, API contracts, error handling, security model, test strategy. Written by the agent, reviewed by a human domain expert before implementation begins.

**ARCHITECTURE.md** — Which existing components are involved, how new components integrate, what the data flow looks like, where the trust boundaries sit. Generated from the PRD + agent reading of the existing codebase.

**Schema docs** — Data models, database schemas, API request/response shapes, event payload definitions. Agent generates from functional requirements; human reviews for correctness and alignment with existing data contracts.

**PLAN.md** — The ordered approach: phases, sequencing rationale, dependencies between tasks, risks and mitigations. Allows the human to review the strategy before a line of code is written.

**TASKS.md** — Discrete, agent-executable work units. Each task has: a description, acceptance criteria, the files it will touch, and a definition of done. Tasks are small enough that each produces a reviewable PR. The agent works through them sequentially or in parallel depending on dependencies.

---

## The Human's Role in This Pipeline

The pipeline is automated — but the human is not removed. The human's role shifts from *writer* to *decision-maker*.

| Stage | Human does | Agent does |
|-------|-----------|-----------|
| PRD draft | Provides intent, resolves open questions | Drafts content, reads codebase, flags gaps |
| PRD review | Approves intent and completeness | Checks for contradictions, missing edge cases, compliance gaps |
| Spec generation | Reviews spec for domain correctness | Generates spec, architecture, schema docs from PRD |
| Plan review | Approves sequencing and strategy | Generates plan and task breakdown |
| Implementation | Reviews PRs | Implements tasks, writes tests, self-checks against AC |
| Merge | Approves | Opens PR with full context |

The human never reviews a diff without first having approved the plan that produced it. By the time code appears, every significant decision has already been made and documented.

---

## Why This Works Better Than the Historical Approach

| Problem with historical PRD | How the modern approach resolves it |
|-----------------------------|-------------------------------------|
| Written without codebase knowledge | Agent reads codebase before drafting |
| Gaps filled by developer judgment | Open questions surfaced before speccing; resolved by human |
| Drifts from implementation | Agent can re-check PRD against merged code at any time |
| Hard to review thoroughly | Agent reviews its own output against a checklist before human sees it |
| Slow to produce | Agent handles prose; human handles decisions — hours not weeks |
| Spec and code diverge | Tasks.md is the authoritative source; agent checks each task against AC |

---

## Enterprise Considerations

**PRD as a compliance artifact.** For regulated changes, the approved PRD (with its audit trail of agent-flagged issues and human resolutions) is evidence of due diligence before development. Store it with your change management records.

**Centralised PRD templates.** Maintain a corporate PRD template in your shared `CLAUDE.md` baseline. This ensures every agent-generated PRD covers compliance, security, and data handling requirements — not just functional ones.

**Agent-authored specs need human review.** Agents generate excellent specs but may confidently omit edge cases that a domain expert would catch. The spec review is not optional — it is the last human checkpoint before autonomous implementation begins.

**Traceability.** Requirement (PRD) → Test → Code → Deployment must be traceable in your tooling. Tag each task in `TASKS.md` with its requirement ID. Tag PRs with the task ID. This satisfies SOC 2 and similar traceability requirements without manual effort.

---

## Lab Exercise

**Time:** 30 minutes

1. **Write a rough PRD** (8 min) — Pick a real feature your team is planning. Write 5–10 bullet points covering: what problem it solves, what it must do, what it must not do, and how you'll know it's done.

2. **Agent review pass** (7 min) — Open Claude Code. Paste your bullets and the relevant section of your codebase (or PRODUCT.md). Ask the agent: *"Review this as a PRD. What is ambiguous? What edge cases are missing? What open questions must be resolved before you could write a spec?"* Record the gaps it finds.

3. **Resolve and formalise** (8 min) — Address the gaps the agent flagged. Produce a one-page PRD using the required sections above.

4. **Generate the spec** (7 min) — Ask the agent to generate a SPEC.md from your approved PRD. Review the output: does it faithfully translate your intent? What would you change? What did the agent get right that you hadn't explicitly specified?

---

## Facilitator Notes

**The agent review pass (step 2) is the most valuable exercise.** Participants consistently find that the agent surfaces 3–5 genuine gaps in their PRD that they had not noticed — missing edge cases, undefined non-functional requirements, conflicts with existing systems. This creates immediate intuition for what "agent-safe specification" means.

**Common insight:** The hardest part of the modern PRD is not writing it — it is resolving the open questions the agent surfaces. That work was always required; it just used to happen implicitly during development, when the cost of resolving it was much higher.

**Discussion prompt:** *"In the historical model, who resolved the gaps in the PRD? When? What did that cost?"*

---

## Further Reading

- Anthropic: Agentic coding workflows and spec-driven development
- Kent Beck: Test-Driven Development by Example (the TDD foundation)
- Marty Cagan: Inspired — the product thinking behind good requirements

