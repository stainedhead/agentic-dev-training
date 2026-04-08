# Module 08 — Review Hygiene & Continuous Improvement

---

## Narrative Anchor: Where This Module Fits the Bigger Argument

> **For facilitators and curriculum reviewers.** This section maps the module's specific content to the programme's core argument. It is not a content summary — it is an explicit signpost for where and how to reinforce the key ideas.

Module 05 established that automated reviews across the full SDLC artifact set are now economically viable. This module addresses what happens next: how do you keep automated reviews accurate, relevant, and trusted over time?

Automated review processes drift. A rules file written in January stops reflecting team standards by March. An evaluator agent's checklist becomes stale when architectural decisions shift. ADRs that were written to capture decisions become orphaned when the code diverges. Without hygiene practices, automated velocity becomes automated drift — the agent runs fast in the wrong direction, and no one notices until the divergence is expensive to correct.

The practices in this module — HITL tier design, PR review standards for AI-generated code, living ADRs, continuous improvement loops — are the institutional memory and feedback mechanisms that keep automated review pointed at the right targets. They are not bureaucracy. They are what allows teams to safely expand agent autonomy over time.

**The XP/DevOps moment:** DevOps teams who invested in short, high-quality feedback loops got compound returns. The improvement loop (Deploy → Observe → Review → Improve → Repeat) is the DevOps feedback cycle applied to the development process itself, not just the production system. Teams who resisted structured retrospectives and continuous improvement practices now find that their automated review processes degrade invisibly without them.

**Connections to the programme arc:** The interrupt conditions defined in Module 05 are enforced by the HITL tier design in this module. The ADRs maintained here provide the persistent context that agents in Module 07 (Observability) and Module 08 (Security) depend on. The continuous improvement loop this module describes runs on data from Module 07's observability stack.

---

## Learning Objectives

- Explain why automated review processes drift without hygiene practices and how to prevent it
- Design a HITL tier architecture that matches human oversight to decision risk
- Apply the six dimensions of AI-generated PR review to focus human attention correctly
- Maintain Architecture Decision Records as living agent context, not static documentation
- Build and run a continuous improvement loop for your agentic development process
- Define SLOs for agentic development workflows and use them to trigger improvement cycles

---

## Background

### Why Hygiene Breaks Down Without Automation

In human-only teams, hygiene practices — writing up decisions, updating standards documents, running improvement retrospectives — consistently fail for the same reason: they require disciplined effort at low-value moments. After a difficult sprint, the last thing a team wants to do is document what they learned. After a design discussion in Slack, no one wants to write a formal ADR. Standards documents get updated once after an incident, then drift again.

This is not a discipline problem. It is an economics problem. The effort required to maintain hygiene is concentrated at exactly the moments when teams have the least capacity.

Agentic tools change the economics at the low-value moments: agents can draft ADRs from Slack discussions, update standards documents from PR patterns, and surface drift before it compounds. The human judgment — "is this ADR correct?" or "is this the standard we actually want?" — remains human. The transcription, structuring, and surfacing work becomes machine work.

The result is not that hygiene practices become automatic. It is that they become sustainable. Teams who could never maintain ADRs consistently can now maintain them with agent assistance. The prerequisite is that the hygiene practices are defined explicitly enough for an agent to participate in them.

### The Drift Problem

Without improvement loops, automated agents optimize toward the past specification, not the evolving intent. An evaluator agent running against a rules file from six months ago will pass code that violates current team standards and reject code that is perfectly acceptable by current norms.

The improvement loop is the mechanism that keeps specifications honest. It is not just CI/CD — it is the process by which the team continuously realigns what the agent reviews against with what the team actually values. This is the Lean principle of kaizen applied to the development process: small, continuous improvements compounding over time rather than large, infrequent overhauls.

---

## Core Concepts

### 1. HITL Tier Architecture

Not all decisions carry the same risk. A HITL architecture that treats every decision identically either creates bottlenecks (if everything requires human approval) or creates gaps (if everything runs autonomously). The solution is a tier system that matches the oversight level to the decision risk.

#### Three-Tier Design

**Tier 1 — Fully Automated (no human required)**

Actions that are reversible, low blast-radius, and well-understood. The agent acts without waiting for human approval.

Examples:
- Style and formatting fixes
- Test additions that increase coverage without changing behavior
- Documentation updates for internal APIs
- Dependency upgrades with no API changes, passing all tests

**Tier 2 — Soft Gate (human notified, not required)**

Actions that are medium-risk or partially reversible. The agent acts, but a human is notified and can intervene within a defined window.

Examples:
- New feature implementation matching an approved spec
- Refactoring within a single module with full test coverage
- Configuration changes in non-production environments
- Dependency upgrades that include API changes

**Tier 3 — Hard Gate (human approval required before action)**

Actions that are irreversible, high blast-radius, or require cross-team coordination. The agent waits.

Examples:
- Schema migrations affecting production data
- Changes to authentication, authorisation, or cryptography code
- External API contract changes
- Any change touching more than N files (define N at your team level)
- Deployments to production environments

> **Design principle:** The tier system should be documented in your CLAUDE.md or equivalent configuration. It is not an implicit understanding — it is an explicit policy that agents, engineers, and stakeholders can all read.

### 2. Reviewing AI-Generated PRs: The Six Dimensions

Reviewing a PR from an agent requires a different mental model than reviewing a PR from a colleague. A colleague makes mistakes through misunderstanding, distraction, or knowledge gaps. An agent makes mistakes through hallucination, specification drift, or over-literal interpretation of instructions.

The six dimensions of AI-generated PR review:

**Dimension 1 — Scope alignment**
Does the change do exactly what the spec or ticket required? No more, no less. Agents tend toward overreach (solving adjacent problems) or underreach (implementing the literal instruction while missing the intent).

**Dimension 2 — Intent clarity**
Can you explain in one sentence why this change was made and what problem it solves? If you cannot, the PR description is insufficient — regardless of whether the code is correct.

**Dimension 3 — Acceptance criteria coverage**
Map each acceptance criterion from the spec to a test. Is every criterion covered? Agents frequently generate tests that pass but do not test what the acceptance criterion actually requires.

**Dimension 4 — Hallucinated APIs and libraries**
Does every function, method, and import reference something that actually exists? Agents occasionally invent plausible-looking APIs that do not exist. Automated linting catches most of this — but edge cases occur.

**Dimension 5 — Technical debt introduction**
Does the implementation follow current architectural patterns? Agents trained on a mix of old and new code patterns may reproduce deprecated patterns that still exist in the codebase. The evaluator agent from Module 05 catches most of these — but the human reviewer should scan for patterns the evaluator may not have been configured to catch.

**Dimension 6 — Behavior match**
Does the code do what the description says it does? Read the description first, then verify the code matches it. This is a different mental process than reading code and inferring intent — and it is the process most likely to catch subtle behavioral mismatches.

### 3. Architecture Decision Records as Living Agent Context

ADRs are not documentation artifacts — they are persistent context that agents use to understand *why* constraints exist. An agent that reads an ADR before proposing a design change makes better proposals than one that reads only the current code.

**ADR template:**

```markdown
# ADR-[number]: [Short descriptive title]

**Date:** YYYY-MM-DD
**Status:** Proposed | Accepted | Deprecated | Superseded by ADR-[number]

## Context
What situation or constraint forced this decision? What were we trying to solve?

## Decision
What was decided, and why was this option chosen over the alternatives?

## Alternatives considered
What other approaches were evaluated? Why were they rejected?

## Consequences
- What becomes easier as a result of this decision?
- What becomes harder or is now prohibited?
- What must be monitored going forward?

## Review trigger
What changes in context would require revisiting this decision?
```

**Spotify's pattern for agent-assisted ADR maintenance:**
1. Engineers discuss architecture in a shared channel
2. An agent monitors the discussion and identifies decision points
3. The agent drafts an ADR from the discussion
4. The team reviews, amends, and merges the ADR — the human makes the decision, the agent makes it durable
5. The ADR is committed to the `adr/` folder and referenced in CLAUDE.md

This is the model that makes ADR maintenance sustainable. The human judgment — "is this the right architectural decision?" — remains entirely human. The transcription, structuring, and filing — which was the friction that caused ADRs to go unwritten — becomes machine work.

**Referencing ADRs in CLAUDE.md:** For just-in-time context loading, add a reference section to your CLAUDE.md:
```markdown
## Architecture Decisions
Key decisions that constrain how this codebase should be changed.
See `adr/` for full records. Active decisions:
- ADR-001: Session storage in Redis (not database) — see rationale before changing auth
- ADR-004: API versioning strategy — applies to all external endpoints
```

### 4. Definition of Done Enforcement

A Definition of Done (DoD) that exists only as a wiki page is not enforced — it is aspirational. An agentic DoD is encoded in the evaluator agent's checklist and verified automatically before any output reaches a human reviewer.

**Minimal agentic DoD:**

```yaml
definition_of_done:
  - all_tests_pass: true
  - coverage_threshold: 80%
  - no_new_lint_errors: true
  - spec_requirements_mapped: true        # Every AC has a test
  - pr_description_complete: true         # All required sections present
  - no_secrets_in_code: true
  - no_hallucinated_imports: true         # All imports resolve
  - adr_conflicts_checked: true           # No conflict with existing ADRs
```

This DoD is the input to the evaluator agent pattern from Module 05. Every item the evaluator can check automatically is one fewer thing the human reviewer spends time on.

### 5. The Continuous Improvement Loop

```
Deploy → Observe → Review → Improve → Repeat
```

This is the DevOps feedback cycle applied to the development process itself, not just the production system. Each step:

**Deploy:** Agent-generated changes ship with full observability (Module 07) and within HITL tier constraints.

**Observe:** Metrics accumulate — how often does the evaluator reject output? What are the most common failure modes? Which interrupt conditions trigger most frequently? What is the human escalation rate? (Data collection covered in Module 07.)

**Review:** Monthly or quarterly, the team reviews the observation data. Not the production system — the development process. Are the standards in the rules file still accurate? Are the ADRs current? Are the HITL tiers calibrated correctly?

**Improve:** Update the rules file, checklist, and HITL configuration based on observed patterns. An agent can assist by summarising patterns from PR history and suggesting updates — the human decides what changes.

**Repeat:** The improved configuration is the input to the next deployment cycle.

> **This is kaizen applied to development process.** DevOps teams who implemented blameless retrospectives and measurement-driven improvement got compound returns. The improvement loop formalises the same discipline, with agentic assistance at the observation and improvement steps.

### 6. SLOs for the Agentic Development Workflow

SLOs are not just for production systems. Define them for your coding agent workflow to create objective triggers for the improvement cycle.

```yaml
coding_agent_workflow_slos:
  evaluator_pass_rate:           # % of agent outputs passing evaluator on first attempt
    target: 85%
    window: 7d
    alert_at: 70%                # Trigger improvement review when pass rate drops

  human_escalation_rate:         # % of tasks requiring human HITL intervention
    target: "<15%"
    window: 7d
    alert_at: 25%

  pr_cycle_time:                 # Median time from agent task start to PR merge
    target: 4h
    window: 7d
    alert_at: 8h

  adr_coverage:                  # % of significant architectural decisions with ADRs
    target: 90%
    window: 30d
    alert_at: 75%

  rules_file_staleness:          # Days since last rules file update
    target: "<30d"
    alert_at: 60d
```

When an alert fires, it triggers the **Review** step of the continuous improvement loop — not an incident response. These are process health signals, not production alarms.

---

## Enterprise Considerations

**Standards governance.** The rules file and evaluator checklist are team-level policy documents. They should be version-controlled, reviewed, and updated through the same process as other configuration changes — not edited ad hoc. Major updates may require sign-off from an engineering lead or architect.

**Cross-team ADR conflicts.** When multiple teams' ADRs cover overlapping architectural concerns, conflicts can emerge. An enterprise architect or platform team should own a process for identifying and resolving cross-team ADR conflicts. Agents can surface potential conflicts — humans resolve them.

**The improvement loop as audit evidence.** In regulated environments, evidence of continuous process improvement is increasingly expected by auditors. The improvement loop data — what was observed, what was changed, and when — is a structured record of engineering practice governance. Preserve it.

---

## Exercise

**Scenario:** Your team has been running agentic code generation for three months. The evaluator pass rate was 88% in month one, dropped to 74% in month two, and is now 71% in month three. The most common evaluator rejection reason is "spec requirement not covered by tests."

1. **Diagnose the drift.** What are the three most likely causes of the decline in evaluator pass rate? What data would you collect to distinguish between them?

2. **Update the DoD.** Rewrite the "spec requirements mapped" DoD item to be more specific. How would you change the evaluator agent's checklist to catch this failure earlier?

3. **Run a mini improvement cycle.** Write the improvement proposal you would bring to your team's monthly review: what do you change, why, and how will you measure whether it worked?

4. **ADR audit.** List the last three significant architectural decisions your team made in the past quarter. For each: Is there an ADR? Is it current? Is it referenced in CLAUDE.md? What would an agent see if it tried to use these decisions as context?

5. **HITL calibration.** Review your current HITL tier assignments. Which tier 3 (hard gate) items could be moved to tier 2 if the evaluator checklist were more comprehensive? What would the evaluator need to check to make that move safe?

---

## Facilitator Notes

The scenario in the exercise is based on a real pattern observed in teams adopting agentic development. The decline in evaluator pass rate typically has one of three causes: (1) the rules file hasn't been updated to reflect recent architectural decisions, (2) the specs being given to the agent are ambiguous about test coverage requirements, or (3) the team has been under delivery pressure and has been approving PRs that the evaluator flagged. All three are process failures, not tool failures.

The ADR audit in step 4 is reliably humbling. Most teams discover that several significant decisions from the quarter have no ADR and would not be visible to an agent trying to make consistent decisions.

---

## Further Reading

- Martin Fowler: "Patterns of Enterprise Application Architecture" (ADR origins and context)
- DORA: Accelerate — continuous improvement measurement
- Lean Software Development: Kaizen applied to software processes
- Anthropic: Building effective agents — agent prompting and rules configuration
