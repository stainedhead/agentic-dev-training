# Module 04 — Product Requirements Docs & Spec-Driven Development

## Learning Objectives

- Write a PRD that an agent can operationalise without constant human clarification
- Distinguish between a PRD, a Technical Spec, and a Task Spec
- Apply Spec-Driven Development (SDD) to an agentic workflow
- Understand how automated testing (TDD) integrates with SDD in an agentic loop

---

## Background

The single biggest failure mode for agentic development is **ambiguity at the specification layer**. When a human developer encounters ambiguity, they ask a question. An agent, especially in an autonomous loop, will make a decision — and that decision may not be the one you wanted. The solution is not to make agents better at guessing. The solution is to write better specifications.

Spec-Driven Development existed before agents. Agents make it mandatory.

---

## The Document Hierarchy

```
Product Requirements Document (PRD)
        │
        ▼
Technical Specification (Spec)
        │
        ▼
Task Spec / Implementation Plan
        │
        ▼
Tests (written BEFORE code)
        │
        ▼
Code
        │
        ▼
Review & Merge
```

Each layer is more specific than the one above it. The PRD answers *what* and *why*. The spec answers *how*. The task spec answers *what exactly, in what order*. Tests make the spec machine-verifiable.

---

## Core Concepts

### 1. The PRD for Agentic Workflows

A PRD written for human developers can afford to leave things implicit. Experienced developers fill in gaps from context and convention. A PRD written for an agentic workflow must be explicit about:

**Required PRD sections:**

| Section | What it specifies |
|---------|------------------|
| **Problem statement** | What is wrong or missing today? |
| **Goals** | What does success look like? (measurable) |
| **Non-goals** | Explicitly what is out of scope |
| **Functional requirements** | What the system must do (numbered, testable) |
| **Non-functional requirements** | Performance, security, reliability, compliance |
| **Constraints** | Tech stack, existing systems, budget, timeline |
| **Definition of Done** | The checklist that closes this PRD |
| **Open questions** | Explicit list of things not yet decided |

The "Non-goals" and "Open questions" sections are the most important for agentic use. They tell the agent where to stop and ask rather than assume.

See [`templates/prd-template.md`](../templates/prd-template.md).

### 2. Technical Specification

The spec translates PRD requirements into engineering decisions:

- **Architecture** — what components exist, how they interact
- **Data models** — schemas, types, relationships
- **API contracts** — endpoints, request/response shapes, error codes
- **Algorithm/logic** — pseudocode or formal description of non-trivial logic
- **Security model** — auth, authorisation, data handling
- **Test strategy** — what will be tested, how, at what layer

A spec is the document you hand to the agent as context. It must be complete enough that the agent can write the first working implementation without asking questions.

See [`templates/spec-template.md`](../templates/spec-template.md).

### 3. Spec-Driven Development (SDD) Workflow

```
1. Write PRD  ──────────────────────────────────────────────────────────── Human
2. Review PRD (human + agent review for completeness)  ─────────────────── Human + Agent
3. Write Spec  ─────────────────────────────────────────────────────────── Agent (with human review)
4. Spec review  ────────────────────────────────────────────────────────── Human
5. Write tests (TDD)  ──────────────────────────────────────────────────── Agent
6. Test review  ────────────────────────────────────────────────────────── Human
7. Write code to pass tests  ───────────────────────────────────────────── Agent
8. Code passes tests + DoD  ────────────────────────────────────────────── Automated
9. PR review  ──────────────────────────────────────────────────────────── Human (or Agent reviewer)
10. Merge  ─────────────────────────────────────────────────────────────── Human approval
```

Note where humans appear: at specification boundaries and review gates. The agent generates; the human approves and unblocks.

### 4. Test-Driven Development (TDD) in an Agentic Loop

TDD is the natural complement to SDD for agents. When you write tests first:

- The agent has a machine-verifiable definition of "done" — not an ambiguous description
- The agent can iterate autonomously until tests pass, without needing human feedback on every attempt
- Regressions are caught automatically
- The test suite becomes an executable specification

**The agentic TDD loop:**

```
Spec → Agent writes tests → Tests fail (expected) →
Agent writes code → Tests pass → Agent checks DoD → 
DoD satisfied → Opens PR → Human reviews
```

The agent iterates on steps 3-5 autonomously. Humans only re-enter at PR review.

### 5. CI/CD as a Gate

CI/CD is your automated enforcement layer. In an agentic workflow:

- **CI must run on every agent-generated commit** — not just human commits
- **All agent PRs go through the same pipeline as human PRs** — no exceptions
- **Test coverage thresholds** — agents tend to write tests for happy paths; enforce branch/line coverage
- **Security scanning** — static analysis, dependency audit, secret scanning (agents can accidentally expose secrets)
- **Lint and formatting** — agents occasionally drift from style; autoformat in CI
- **Eval suite** — for AI-specific behaviour, run your eval suite in CI

### 6. Hygiene and Continuous Improvement

The SDD loop generates artefacts that need maintenance:

| Artefact | Hygiene practice |
|----------|-----------------|
| PRD | Archive when shipped; never delete |
| Spec | Version-controlled; updated when implementation diverges |
| Tests | Deleted tests require explicit justification in PR |
| Rules files | Reviewed quarterly; stale rules removed |
| DoD | Reviewed when a defect escapes through a gap |

**Continuous improvement trigger:** Every escaped defect (a bug that reached production) should prompt: "Which specification, test, or review step should have caught this? What do we change?"

---

## Enterprise Considerations

**PRD as compliance artefact.** For regulated changes, the PRD is evidence that requirements were captured before development. Store it with your change management records.

**Agent-authored specs need human review.** Agents can write excellent specs, but they may confidently omit edge cases a human expert would catch. Always have a domain expert review agent-authored specs before development begins.

**Traceability.** Requirement → Test → Code → Deployment should be traceable in your tooling. Tag PRs with requirement IDs. This is required for SOC 2 and similar frameworks.

---

## Exercise

Take a real feature your team has recently shipped (or is planning to ship).

1. Write a one-page PRD using the template. Focus especially on: functional requirements (numbered), non-goals, and Definition of Done.
2. Identify three edge cases the PRD doesn't address. Add them as open questions.
3. Draft the first three test cases for the feature in your preferred testing framework. Write them before thinking about implementation.
4. Swap PRDs with another participant. Review theirs for ambiguity — what would an agent misinterpret?

---

## Facilitator Notes

The PRD review swap (step 4) is the most valuable exercise in this module. It creates immediate intuition for what "agent-safe specification" means.

Discussion: *"Has your team ever shipped something that was technically correct but not what the stakeholder wanted? What was missing from the specification?"*

---

## Further Reading

- Thoughtworks: Spec-Driven Development for LLM applications
- Kent Beck: Test-Driven Development by Example (foundational, still relevant)
- Anthropic: Agentic coding workflows

