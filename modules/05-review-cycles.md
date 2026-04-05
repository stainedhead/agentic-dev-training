# Module 05 — Review Cycles: Human-in-the-Loop & Agent-to-Agent

## Learning Objectives

- Understand that coding agents are reviewers across all SDLC artefacts — not just code
- Design review cycles that balance autonomy with oversight
- Apply human-in-the-loop (HITL) patterns at the right granularity
- Implement agent-to-agent review (evaluator pattern)
- Define escalation paths and interrupt conditions
- Use agents to educate and onboard team members throughout the SDLC

---

## Background

Review is where agentic development differs most visibly from traditional software practice. In a human team, review is a social and technical process between colleagues — and it is expensive. A senior developer reviewing a PR, a design document, or a spec brings deep knowledge but limited time.

Coding agents change this equation significantly. An agent can review a PR against a specification in seconds. It can read a proposed architecture document alongside the entire codebase and identify conflicts a human reviewer would miss. It can check whether API documentation is still accurate after a refactor. It can walk a new team member through a complex subsystem at whatever depth they need.

**Review in an agentic team is not just code review.** It spans every artefact produced in the SDLC — and an agent is a capable reviewer at every stage.

Spotify's engineering teams found that the key is not reducing human review — it is making human review *better targeted*: humans spend their attention on decisions that require human judgment, while agents handle pattern-matching, consistency checks, and completeness verification that don't.

---

## Core Concepts

### 1. The Full Scope of Agent Review

Before designing review cycles, establish what an agent can review. The answer is: any artefact that can be expressed in text and evaluated against criteria.

| Artefact | What the agent reviews against | Typical output |
|----------|-------------------------------|----------------|
| **PRD** | Completeness checklist, existing system constraints, prior ADRs | Gaps, conflicts, open questions |
| **Design / architecture proposal** | Existing codebase, architecture principles, security patterns | Violations, missing considerations, alternatives |
| **Technical spec** | PRD requirements, coding standards, test strategy | Requirement gaps, ambiguities, missing edge cases |
| **Code (PR)** | Spec, coding standards, test coverage, security checklist | Failing requirements, style issues, coverage gaps |
| **Tests** | Spec acceptance criteria, coverage targets | Missing cases, untested paths |
| **Documentation** | Current implementation, API contracts | Stale content, missing sections, accuracy errors |
| **ADRs** | Consistency with existing decisions, current architecture | Conflicts, superseded assumptions |

The same HITL patterns apply to all of these. The agent reviews, produces structured feedback, and a human makes the final call on anything consequential.

### 2. Review Cycle Design Principles

**Principle 1: Match review granularity to risk.**  
Low-risk, reversible changes (formatting, documentation, test additions) can be auto-merged after agent review. High-risk, irreversible changes (schema migrations, security changes, public API modifications) require human approval.

**Principle 2: Humans review decisions, not diffs.**  
A human reviewer should be answering: "Is this the right approach?" — not "Did the agent make a typo?" Automated checks handle the latter.

**Principle 3: The agent should explain its reasoning.**  
Every agent-generated PR must include: what changed, why, what alternatives were considered, and what the agent is uncertain about. This is the context a human reviewer needs.

**Principle 4: Never skip the gate for speed.**  
Speed pressure is the most common reason review gates get bypassed. Gates exist for production incidents, not convenience. If your gates are too slow, fix the gates — don't remove them.

### 3. Human-in-the-Loop (HITL) Patterns

#### Pattern A: Approval Gate

```
Agent completes task → Creates PR/ticket → Human approves → Agent proceeds
```

Use when: the next step is irreversible or high-blast-radius.

#### Pattern B: Checkpoint Review

```
Agent completes phase 1 → Human reviews phase 1 output →
[If approved] Agent proceeds to phase 2 → ...
```

Use when: a long task has natural breakpoints where direction could be wrong.

#### Pattern C: Exception Escalation

```
Agent runs autonomously → Detects anomaly/uncertainty → 
Pauses and pages human → Human resolves → Agent continues
```

Use when: the agent is running a well-understood task but needs a human decision for edge cases.

#### Pattern D: Spot Check

```
Agent runs autonomously → Random sample of outputs reviewed by human
```

Use when: volume is high, individual items are low-risk, but you need systematic quality assurance.

### 4. Defining Interrupt Conditions

Before deploying an agent, explicitly define conditions under which it must stop and escalate:

```yaml
# Example interrupt_conditions.yaml
interrupt_conditions:
  - condition: "Proposed change touches >50 files"
    action: "pause_and_notify_lead"
  - condition: "Test coverage would drop below threshold"
    action: "pause_and_notify_engineer"
  - condition: "Change touches authentication or authorisation code"
    action: "require_security_review"
  - condition: "External API call to non-allowlisted domain"
    action: "pause_and_notify_architect"
  - condition: "Agent confidence below 0.7 on any decision"
    action: "pause_and_request_clarification"
```

These conditions are context in your rules file and enforced in your CI pipeline.

### 5. Agent-to-Agent Review (Evaluator Pattern)

One of the most powerful patterns from Anthropic and Spotify's engineering practice: use a dedicated **evaluator agent** to review the output of a **generator agent** before it reaches a human.

```
Generator Agent → Draft output
                      │
                      ▼
              Evaluator Agent reviews against:
              - Functional requirements (from spec)
              - Coding standards (from rules file)
              - Test coverage (from DoD)
              - Security checklist
              - Performance constraints
                      │
              ┌───────┴───────┐
              │               │
           Passes           Fails
              │               │
              ▼               ▼
        → Human review   → Back to generator
                          with specific critique
```

The evaluator agent's output should be structured feedback — not "this is wrong" but "requirement FR-3 is not satisfied because X; suggest Y."

**Why this works:** Evaluator agents can apply checklists consistently at scale. They catch pattern-matching failures (missed test cases, lint issues, missing error handling) before the human reviewer ever sees the PR. Human reviewers then spend their time on architectural and business logic questions.

### 6. PR Description Standards for Agent-Generated Code

Every agent-generated PR must include a standardised description. Encode this in your rules file:

```markdown
## What changed
[Plain English summary of what the code does differently]

## Why
[Link to PRD/ticket; business or technical rationale]

## How
[Brief description of the approach chosen]

## Alternatives considered
[What other approaches were evaluated and why this one was chosen]

## Test coverage
[What is tested; what is not tested and why]

## Agent confidence
[High/Medium/Low] — [What the agent is uncertain about]

## Reviewer focus
[What the agent specifically wants the human reviewer to check]
```

The "Agent confidence" and "Reviewer focus" fields are the most important — they direct human attention to where it is most needed.

### 7. Agents as Educators and Onboarding Guides

Review is not only about quality gates — it is also about knowledge transfer. Coding agents are exceptionally effective at explaining systems to team members who are new to a codebase, a design pattern, or a process.

**Codebase education:**

```
Developer: "I'm new to this team. Walk me through how a payment request flows
            through the system from the API endpoint to the bank."

Claude Code: [reads PaymentController, PaymentService, BankAdapter, relevant tests]
             "A payment request enters at POST /payments in PaymentController.
              It is validated against PaymentRequest schema, then handed to
              PaymentService.process(). That method does three things: ..."
```

This is faster and more accurate than asking a colleague, and it does not interrupt the team's flow. The agent reads the actual code — it does not rely on documentation that may be out of date.

**Design decision education:**

```
Developer: "Why is the session token stored in Redis rather than the database?
            Is that an architectural decision or just how it ended up?"

Claude Code: [reads ADR-004, SessionService, deployment config]
             "ADR-004 documents this explicitly. The decision was made in March
              because the database could not sustain the read volume for
              token validation at peak load. The constraint is: ..."
```

**Process education:**

Agents can explain team processes by reading CLAUDE.md, PRODUCT.md, and the task structure. New team members can ask "how does this team run a sprint?" and get an accurate answer grounded in the actual working documents — not a stale wiki page.

**When to use agents for education vs. human mentoring:**

| Situation | Agent | Human |
|-----------|-------|-------|
| "How does this code work?" | ✅ Agent reads and explains accurately | Optional |
| "Why was this design decision made?" | ✅ Agent reads ADRs and history | Optional |
| "What does this team value in code reviews?" | ✅ Agent reads CLAUDE.md and standards | Supplement |
| "How do I grow in this organisation?" | ❌ Not appropriate | ✅ Human |
| "What should I work on next?" | ❌ Not appropriate | ✅ Human |
| "Is my approach to this problem right?" | ✅ Agent can review the approach | ✅ Human validates |

---

## Enterprise Considerations

**Review SLAs.** If human review is required, define SLAs. An agent waiting indefinitely for human approval blocks the pipeline. Escalate automatically after SLA breach.

**Review audit log.** Log every review decision: who reviewed, when, what they approved/rejected, what comments were left. This is required for change management in regulated environments.

**Conflict of interest.** An agent should not review its own output at the final gate. Either use a different model, a different agent instance with different instructions, or a human.

---

## Exercise

**Part 1 — Design a review cycle** for the following scenario:

> *Your team wants to use an agent to automatically fix all flake8 lint errors across a 200,000-line Python codebase. The changes will touch ~800 files.*

1. Map the review cycle: where are the human gates?
2. Write the interrupt conditions.
3. Write the evaluator agent's checklist.
4. Write the PR description template for this specific task.
5. What is the escalation path if something goes wrong at 2am?

**Part 2 — Expand to the full artefact set.** For each artefact below, define: (a) what the agent reviews it against, (b) what structured output it produces, (c) where the human gate sits.

- A PRD for a new feature
- An architecture proposal for a new service
- The API documentation after a sprint of changes
- A new team member's first PR

**Part 3 — Education scenario.** A developer has just joined your team and needs to understand the authentication flow. Write the prompt you would give Claude Code to educate them. What context (CLAUDE.md, PRODUCT.md, specific files) would you make sure is loaded?

---

## Facilitator Notes

The 2am escalation question surfaces the most important discussion: who is accountable for agent-generated changes in production? This should be decided at the team level before any agent is deployed.

Real-world case study to discuss: Spotify's "squad-level agent" model, where each engineering squad owns and is accountable for its agents, including their failures.

---

## Further Reading

- Spotify Engineering: Agents as primary authors in engineering workflows
- Anthropic: Human oversight in agentic systems
- Google SRE: Chapter on escalation and incident management (principles apply directly)

