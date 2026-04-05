# Module 05 — Review Cycles: Human-in-the-Loop & Agent-to-Agent

## Learning Objectives

- Design review cycles that balance autonomy with oversight
- Apply human-in-the-loop (HITL) patterns at the right granularity
- Implement agent-to-agent review (evaluator pattern)
- Define escalation paths and interrupt conditions

---

## Background

Review is where agentic development differs most visibly from traditional software practice. In a human team, code review is a social and technical process between colleagues. In an agentic team, review may involve: an agent reviewing its own output, an agent reviewing another agent's output, a human reviewing agent output, or all three. Getting this right is the difference between agentic development that increases quality and agentic development that creates a flood of unreviewed changes.

Spotify's engineering teams, which have allowed agents to be primary authors and reviewers of code, found that the key is not reducing human review — it is making human review *better targeted*: humans spend their attention on decisions that require human judgment, while agents handle pattern-matching, style, and correctness checks that don't.

---

## Core Concepts

### 1. Review Cycle Design Principles

**Principle 1: Match review granularity to risk.**  
Low-risk, reversible changes (formatting, documentation, test additions) can be auto-merged after agent review. High-risk, irreversible changes (schema migrations, security changes, public API modifications) require human approval.

**Principle 2: Humans review decisions, not diffs.**  
A human reviewer should be answering: "Is this the right approach?" — not "Did the agent make a typo?" Automated checks handle the latter.

**Principle 3: The agent should explain its reasoning.**  
Every agent-generated PR must include: what changed, why, what alternatives were considered, and what the agent is uncertain about. This is the context a human reviewer needs.

**Principle 4: Never skip the gate for speed.**  
Speed pressure is the most common reason review gates get bypassed. Gates exist for production incidents, not convenience. If your gates are too slow, fix the gates — don't remove them.

### 2. Human-in-the-Loop (HITL) Patterns

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

### 3. Defining Interrupt Conditions

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

### 4. Agent-to-Agent Review (Evaluator Pattern)

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

### 5. PR Description Standards for Agent-Generated Code

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

---

## Enterprise Considerations

**Review SLAs.** If human review is required, define SLAs. An agent waiting indefinitely for human approval blocks the pipeline. Escalate automatically after SLA breach.

**Review audit log.** Log every review decision: who reviewed, when, what they approved/rejected, what comments were left. This is required for change management in regulated environments.

**Conflict of interest.** An agent should not review its own output at the final gate. Either use a different model, a different agent instance with different instructions, or a human.

---

## Exercise

Design the review cycle for the following scenario:

> *Your team wants to use an agent to automatically fix all flake8 lint errors across a 200,000-line Python codebase. The changes will touch ~800 files.*

1. Map the review cycle: where are the human gates?
2. Write the interrupt conditions.
3. Write the evaluator agent's checklist.
4. Write the PR description template for this specific task.
5. What is the escalation path if something goes wrong at 2am?

---

## Facilitator Notes

The 2am escalation question surfaces the most important discussion: who is accountable for agent-generated changes in production? This should be decided at the team level before any agent is deployed.

Real-world case study to discuss: Spotify's "squad-level agent" model, where each engineering squad owns and is accountable for its agents, including their failures.

---

## Further Reading

- Spotify Engineering: Agents as primary authors in engineering workflows
- Anthropic: Human oversight in agentic systems
- Google SRE: Chapter on escalation and incident management (principles apply directly)

