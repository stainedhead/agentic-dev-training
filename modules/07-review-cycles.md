# Module 07 — Review Cycles: Automated Reviews Across the SDLC

---

## Narrative Anchor: Where This Module Fits the Bigger Argument

> **For facilitators and curriculum reviewers.** This section maps the module's specific content to the programme's core argument. It is not a content summary — it is an explicit signpost for where and how to reinforce the key ideas.

Before agentic tools, review was an expensive, selective, and fundamentally inconsistent human practice. A senior engineer thoroughly reviewing a 400-line PR required 45 minutes. Reviewing a PRD against prior architecture decisions required scheduling a meeting. Checking whether tests actually covered acceptance criteria was a manual discipline that rarely happened under delivery pressure. Teams managed this by triaging: only the highest-risk changes got thorough review. Everything else got a scan and a rubber stamp — or nothing at all.

Agentic tools break this constraint. The same review that took 45 minutes from a senior engineer now runs in seconds against explicit, consistent criteria — every time, on every artifact. This is not a workflow improvement. It is a structural shift in what review means. The new question is not "which things are worth reviewing well?" but "what should the human be doing that the agent cannot?"

**This module answers that question.** The automated patterns (evaluator agent, HITL gates, interrupt conditions) are not just tooling — they are the infrastructure that frees human reviewers to do the structured, consequential work that was always too expensive to do consistently: architectural review with engineering support groups, security threat modelling with specialists, design decisions with product owners and stakeholders.

**Connections to the programme arc:** The HITL patterns established here are enforced at the technical level in Module 08 (Reliability & Security). The observability needed to trust automated reviews is covered in Module 07. The cost model that makes automated review at every phase economically rational is in Module 09. The capstone design review session — where freed human time is most valuably invested — is Module 10.

**The XP/DevOps moment:** Extreme Programming always called for continuous review — collective code ownership, pair programming, continuous integration. Teams resisted because the economics were wrong. Agentic tools fix the economics. Teams who resisted XP now encounter its principles as technical prerequisites for safe automation.

---

## Learning Objectives

- Explain why agentic tools make consistent review at every SDLC phase economically viable for the first time
- Apply automated review to the full artifact set: PRDs, design docs, specs, code, tests, documentation
- Design review cycles that distinguish machine-speed pattern-matching from human-judgment decisions
- Implement human-in-the-loop (HITL) patterns at the right granularity
- Apply the evaluator agent pattern to catch checklist failures before human reviewers see the output
- Define escalation paths and interrupt conditions as pre-commitments, not reactions

---

## Background

Review is where agentic development differs most visibly from traditional software practice. In a human-only team, review is a social and technical process between colleagues — and it is expensive. A senior developer reviewing a PR, a design document, or a spec brings deep knowledge but limited time.

Before agentic tools, this scarcity forced teams into an impossible trade-off: review everything shallowly, or review some things well. Neither produces the consistent, thorough coverage that prevents the bugs and design errors that cost the most to fix later.

### The Economics of Consistent Review

The economics of human review have always been the binding constraint. Consider what consistent review of every artifact actually requires:

| Artifact | Human review cost (time) | Typical reality |
|----------|--------------------------|-----------------|
| PRD | 45–90 min from senior engineer | Usually not reviewed against prior ADRs |
| Design proposal | 2–4 hrs from architect + review meeting | Scheduled for major features only |
| Technical spec | 30–60 min from tech lead | Often skipped under delivery pressure |
| Code PR | 30–60 min for thorough review | Rubber-stamped when time-pressured |
| Tests | 20–40 min to verify coverage | Rarely checked against acceptance criteria |
| Documentation | 15–30 min per section | Updated last, reviewed never |

Agentic tools collapse this cost. An agent reviews a PRD against all prior ADRs and the existing system in seconds. A spec is checked for completeness and alignment with requirements in under a minute. Code is reviewed against the spec, not just against style. Tests are verified to actually cover the stated acceptance criteria.

The result is not that human review becomes unnecessary. It is that human review becomes reserved for what humans uniquely provide: judgment on tradeoffs, accountability for decisions, and expertise on novel problems that pattern-matching cannot handle.

**Spotify's finding:** Consistent, automated first-pass review is what makes human review *better targeted*. Humans spend their attention on decisions that require human judgment. Agents handle pattern-matching, consistency checks, and completeness verification that they can do faster and more consistently than any individual reviewer.

---

## Core Concepts

### 1. The Full Scope of Agent Review

Before designing review cycles, establish what an agent can review. The answer is: any artifact that can be expressed in text and evaluated against explicit criteria. The same HITL patterns apply to all of them.

| Artifact | What the agent reviews against | Typical output | Previously reviewed consistently? |
|----------|-------------------------------|----------------|----------------------------------|
| **PRD** | Completeness checklist, existing system constraints, prior ADRs | Gaps, conflicts, open questions | Rarely — ADR cross-check was manual |
| **Design / architecture proposal** | Existing codebase, architecture principles, security patterns | Violations, missing considerations, alternatives | Only for major features, if at all |
| **Technical spec** | PRD requirements, coding standards, test strategy | Requirement gaps, ambiguities, missing edge cases | Often skipped entirely |
| **Code (PR)** | Spec, coding standards, test coverage, security checklist | Failing requirements, style issues, coverage gaps | Yes — but inconsistently |
| **Tests** | Spec acceptance criteria, coverage targets | Missing cases, untested paths | Rarely, even on reviewed teams |
| **Documentation** | Current implementation, API contracts | Stale content, missing sections, accuracy errors | Almost never |
| **ADRs** | Consistency with existing decisions, current architecture | Conflicts, superseded assumptions | No — ADRs were written, not reviewed |

This table represents what *should* have been reviewed consistently on every iteration under XP or DevOps practice. It almost never was, because the economics were wrong. Agentic tools make "review all of these on every change" the default, not the exception.

### 2. Review Cycle Design Principles

**Principle 1: Match review granularity to risk.**
Low-risk, reversible changes (formatting, documentation, test additions) can be auto-merged after agent review. High-risk, irreversible changes (schema migrations, security changes, public API modifications) require human approval.

**Principle 2: Humans review decisions, not diffs.**
This is not a workflow preference — it is a structural shift in what review means. A human reviewer should be answering: "Is this the right approach?" — not "Did the agent make a typo?" or "Does this cover the checklist?" Automated review handles the latter. When human reviewers spend time on diffs and checklists, they are doing the most expensive possible substitution for a machine. The economic argument for automated review only holds if human time is genuinely redirected to judgment work.

**Principle 3: The agent should explain its reasoning.**
Every agent-generated PR must include: what changed, why, what alternatives were considered, and what the agent is uncertain about. This is the context a human reviewer needs to make a judgment — not a diff to inspect line by line.

**Principle 4: Never skip the gate for speed.**
Speed pressure is the most common reason review gates get bypassed. Gates exist for production incidents, not convenience. If your gates are too slow, fix the gates — don't remove them. This is the same principle XP applied to its continuous integration rule: never commit broken code to the main branch, not even temporarily.

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

Use when: volume is high, individual items are low-risk, but you need systematic quality assurance. This is the pattern that makes continuous automated review at every phase operationally sustainable — not every output requires human attention, but every output is within the system's coverage.

### 4. Defining Interrupt Conditions

Before deploying an agent, explicitly define conditions under which it must stop and escalate. These are pre-commitments made at design time — not reactions made when something goes wrong. An interrupt condition is the automated review equivalent of a DORA change failure rate alert: a signal that something outside normal parameters has occurred, requiring human judgment.

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

These conditions live in your rules file and are enforced in CI. The technical enforcement mechanism — sandboxing and blast radius control — is covered in Module 08.

### 5. Agent-to-Agent Review (Evaluator Pattern)

One of the most powerful patterns from Anthropic and Spotify's engineering practice: use a dedicated **evaluator agent** to review the output of a **generator agent** before it reaches a human. This is the mechanism that makes automated review consistent at scale.

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

**Why this works:** Evaluator agents apply checklists consistently at scale. They catch pattern-matching failures — missed test cases, lint issues, missing error handling, spec deviations — before the human reviewer ever sees the PR. Human reviewers then spend their time on architectural and business logic questions. This is precisely what makes it economically viable to convene a meaningful architectural review with an enterprise support group: the senior engineers in that room have not been consumed by first-pass review work.

### 6. PR Description Standards for Agent-Generated Code

Every agent-generated PR must include a standardised description. Encode this in your rules file. The description is not for the automated review pipeline — it is the handoff document for the human reviewer, containing everything they need to make a judgment rather than conduct an investigation.

> **XP connection:** This template maps directly to XP's emphasis on communicating intent over delivering code. The "why" and "alternatives considered" fields are what XP's user story and planning game produced. Teams who absorbed XP already know this instinct. Teams who skipped it are now required to encode it.

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

The "Agent confidence" and "Reviewer focus" fields are the most important — they direct human attention to where it is most needed and prevent reviewers from spending time on sections the agent is confident about.

### 7. Agents as Educators and Onboarding Guides

Review is not only about quality gates — it is also about knowledge transfer. Coding agents are exceptionally effective at explaining systems to team members who are new to a codebase, a design pattern, or a process.

This connects to XP's collective code ownership principle. XP democratised codebase knowledge through pair programming — any team member could work on any part of the system because knowledge was shared continuously. Pairing was expensive: it required two engineers at the same time. Agentic onboarding provides the same knowledge access at zero marginal cost. Teams who resisted XP's pairing practice because of the cost now get the benefit of collective knowledge without it.

**Codebase education:**

```
Developer: "I'm new to this team. Walk me through how a payment request flows
            through the system from the API endpoint to the bank."

Claude Code: [reads PaymentController, PaymentService, BankAdapter, relevant tests]
             "A payment request enters at POST /payments in PaymentController.
              It is validated against PaymentRequest schema, then handed to
              PaymentService.process(). That method does three things: ..."
```

This is faster and more accurate than asking a colleague, and it does not interrupt the team's flow. The agent reads the actual code — not documentation that may be out of date.

**Design decision education:**

```
Developer: "Why is the session token stored in Redis rather than the database?
            Is that an architectural decision or just how it ended up?"

Claude Code: [reads ADR-004, SessionService, deployment config]
             "ADR-004 documents this explicitly. The decision was made in March
              because the database could not sustain the read volume for
              token validation at peak load. The constraint is: ..."
```

**Process education:** Agents can explain team processes by reading CLAUDE.md, PRODUCT.md, and the task structure. New team members can ask "how does this team run a sprint?" and get an accurate answer grounded in the actual working documents.

**When to use agents for education vs. human mentoring:**

| Situation | Agent | Human |
|-----------|-------|-------|
| "How does this code work?" | ✅ Agent reads and explains accurately | Optional |
| "Why was this design decision made?" | ✅ Agent reads ADRs and history | Optional |
| "What does this team value in code reviews?" | ✅ Agent reads CLAUDE.md and standards | Supplement |
| "How do I grow in this organization?" | ❌ Not appropriate | ✅ Human |
| "What should I work on next?" | ❌ Not appropriate | ✅ Human |
| "Is my approach to this problem right?" | ✅ Agent can review the approach | ✅ Human validates |

---

## Enterprise Considerations

**Review SLAs.** If human review is required, define SLAs. An agent waiting indefinitely for human approval blocks the pipeline. Escalate automatically after SLA breach. This is the same discipline DevOps teams apply to incident response — a defined response window, not an indefinite wait.

**Review audit log.** Log every review decision: who reviewed, when, what they approved/rejected, what comments were left. This is required for change management in regulated environments. It also provides the data needed to measure whether your review process is improving — the feedback loop covered in Module 06.

**Conflict of interest.** An agent should not review its own output at the final gate. Either use a different model, a different agent instance with different instructions, or a human.

**DORA metrics connection.** The four DORA metrics — deployment frequency, lead time for changes, change failure rate, time to restore — are all directly affected by review cycle design. Automated first-pass review increases deployment frequency and reduces lead time. Consistent review standards reduce change failure rate. Well-designed HITL gates reduce time to restore by ensuring errors are caught before they reach production. If your team is tracking DORA metrics, your review cycle design is the primary lever on three of the four.

---

## Exercise

**Part 1 — Design a review cycle** for the following scenario:

> *Your team wants to use an agent to automatically fix all flake8 lint errors across a 200,000-line Python codebase. The changes will touch ~800 files.*

1. Map the review cycle: where are the human gates?
2. Write the interrupt conditions.
3. Write the evaluator agent's checklist.
4. Write the PR description template for this specific task.
5. What is the escalation path if something goes wrong at 2am?

**Part 2 — Expand to the full artifact set.** For each artifact below, define: (a) what the agent reviews it against, (b) what structured output it produces, (c) where the human gate sits, and (d) what a human reviewer focuses on after the agent review clears.

- A PRD for a new feature
- An architecture proposal for a new service
- The API documentation after a sprint of changes
- A new team member's first PR

**Part 3 — Education scenario.** A developer has just joined your team and needs to understand the authentication flow. Write the prompt you would give Claude Code to educate them. What context (CLAUDE.md, PRODUCT.md, specific files) would you make sure is loaded?

**Part 4 — The economics argument.** Calculate the human cost of reviewing each artifact in Part 2 thoroughly. Then estimate the agent cost for the same review. Present the FinOps case for running automated review on all four artifacts on every change. (Full FinOps treatment is in Module 09 — this exercise previews the argument.)

---

## Facilitator Notes

The 2am escalation question in Part 1 surfaces the most important discussion: who is accountable for agent-generated changes in production? This should be decided at the team level before any agent is deployed.

The Part 4 economics calculation is often the most impactful part of the exercise. Teams routinely have never calculated the human cost of thorough review — and the comparison typically produces a 50–200× cost ratio that makes the business case for automated review undeniable.

Real-world case study to discuss: Spotify's "squad-level agent" model, where each engineering squad owns and is accountable for its agents, including their failures.

---

## Further Reading

- Spotify Engineering: Agents as primary authors in engineering workflows
- Anthropic: Human oversight in agentic systems
- DORA: Accelerate State of DevOps Report (for DORA metrics context)
- Dex Horthy: 12-Factor Agents — Factor 9 (compact errors) and Factor 11 (trigger from events)
