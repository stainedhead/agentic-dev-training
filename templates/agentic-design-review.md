# Agentic System Design Review

> Complete this document for every new agentic system or significant change to an existing one.
> Submit for review before development begins, not after.
> This document is an audit artefact — archive, do not delete.

---

## Document Metadata

| Field | Value |
|-------|-------|
| **System name** | |
| **Status** | Draft / In Review / Approved / Rejected |
| **Submitted by** | |
| **Review board** | [Engineering lead, Architect, Security, FinOps, SRE] |
| **Date submitted** | |
| **Decision date** | |
| **PRD reference** | |

---

## 1. Goal and Scope

**What is this agent trying to accomplish?**  
[Plain language description of the goal]

**What is explicitly out of scope?**  
[What will this agent NOT do? Be specific.]

**Who is accountable for this agent in production?**  
[Named individual and their team — not just a team name]

**Projected launch date:**  

---

## 2. Architecture

### Agent Graph

```
[Draw the agent topology — orchestrator, subagents, tools, external systems]

Example:
  User / Trigger
       │
       ▼
  Orchestrator Agent
  ├──▶ Research Subagent ──▶ [web search tool] [internal docs tool]
  ├──▶ Code Subagent ──────▶ [code execution tool] [git tool]
  └──▶ Review Subagent ────▶ [linter tool] [test runner tool]
       │
       ▼
  Output / Action
```

### External System Connections

| System | Access type | Data read | Data written | Auth method |
|--------|-------------|-----------|--------------|-------------|
| [System A] | Read / Write / Both | [What data] | [What data] | [API key / OAuth / etc.] |

### Tool Inventory

| Tool name | Type | Read/Write | Permissions required | Blast radius if misused |
|-----------|------|------------|---------------------|------------------------|
| [Tool 1] | [File/API/DB/...] | R / W / RW | [Permissions] | [Impact description] |

---

## 3. Autonomy Assessment

**Position on the autonomy spectrum:**

```
[ ] Chat (no tools, no memory)
[ ] Augmented chat (tools, human-initiated)
[X] Supervised agent (autonomous, human approves at gates)   ← typical enterprise default
[ ] Autonomous agent (minimal human in loop)
```

**Justification for chosen autonomy level:**  
[Why is this the right level? What would move it to the right or left?]

**Interrupt / Escalation Conditions:**

| Condition | Action | Who is notified |
|-----------|--------|----------------|
| [e.g. Proposed change touches >50 files] | Pause and notify | [Role/person] |
| [e.g. Tool fails 3 times] | Circuit break and escalate | |
| [e.g. Cost exceeds $X in a single run] | Stop and alert | |
| [e.g. Security-sensitive code path detected] | Require security review | |

**What is the maximum blast radius of a failure?**  
[Worst-case scenario if the agent behaves unexpectedly at 3× intended scope]

**Can failures be reversed? How?**  
[Rollback procedure — be specific]

---

## 4. Security Review

### Threat Model

**Top 3 threats:**

| # | Threat | Likelihood | Impact | Mitigation |
|---|--------|-----------|--------|------------|
| 1 | [e.g. Prompt injection via retrieved documents] | High/Med/Low | High/Med/Low | [Mitigation] |
| 2 | | | | |
| 3 | | | | |

**Prompt injection surface area:**  
What external data does this agent read (files, emails, web pages, database records, user input)?  
[List each source. For each: what is the worst-case injected instruction? What prevents it from being executed?]

**Minimum required permissions:**  
[List exact permissions — file system paths, API scopes, database roles]

**Are these enforced at the infrastructure level?**  
[ ] Yes — service account / IAM role scoped accordingly  
[ ] No — [explain why and what compensating controls exist]

**Secrets management:**  
[ ] No secrets required  
[ ] Secrets retrieved from [secrets manager] at runtime — never in context or code

**Data classification of data accessed:**  
[ ] Public  
[ ] Internal  
[ ] Confidential  
[ ] Restricted / PII

**If Confidential or Restricted:** What data handling controls are in place?

---

## 5. Observability Plan

**Tracing:**  
[ ] Every agent run produces a trace with shared `trace_id` across all subagents  
[ ] Trace captures: prompt, tool calls with inputs/outputs, model decisions, final output

**Key metrics to be monitored:**

| Metric | Alert threshold | Alert recipient |
|--------|----------------|----------------|
| `task_success_rate` | | |
| `task_completion_time_p95` | | |
| `cost_per_task` | | |
| `human_escalation_rate` | | |

**How will failures be diagnosed post-incident?**  
[What information is available to an on-call engineer at 2am?]

---

## 6. Cost Model

**Estimated cost per run:**  
[Show working: N LLM calls × avg tokens × model price]

**Projected monthly cost at expected volume:**  
[Volume (runs/month) × cost per run]

**Token budget per run:**  
[Hard limit in tokens; what happens when exceeded?]

**Model selection:**  

| Task | Model | Justification |
|------|-------|---------------|
| [Orchestration] | [Model] | [Why this model for this task] |
| [Complex reasoning] | | |
| [Simple routing] | | |

**Cost anomaly alert:**  
Alert fires when: [condition — e.g. single run costs 3× p95 for this task type]

---

## 7. Eval Strategy

**What evals exist for this agent?**

| Eval name | What it tests | Pass threshold |
|-----------|--------------|---------------|
| [Eval 1] | [What] | [Score/threshold] |

**Minimum eval score required for production promotion:**  

**How will quality be monitored in production?**  
[ ] Continuous eval on sampled real runs  
[ ] Manual spot-check [frequency]  
[ ] [Other]

---

## 8. Rollout Plan

| Phase | Scope | Duration | Go/No-go criteria |
|-------|-------|----------|------------------|
| 0. Development | Dev environment only | [Duration] | All evals pass |
| 1. Shadow mode | Production inputs, no production actions | [Duration] | [Criteria] |
| 2. Limited traffic | [N]% of production workload | [Duration] | [Criteria] |
| 3. Full traffic | 100% | Ongoing | [Criteria] |

**Rollback plan:**  
[Step-by-step — what does "roll back" mean for this agent?]

---

## 9. Go / No-Go Criteria

Before moving to Phase 1 (shadow mode), all of the following must be true:

- [ ] Design review approved by all required reviewers
- [ ] Interrupt conditions implemented and tested
- [ ] Token budget implemented and tested
- [ ] Full observability stack in place
- [ ] Eval suite passing above threshold
- [ ] Security review completed and approved
- [ ] Rollback procedure documented and tested
- [ ] Accountable owner named and confirmed

---

## 10. Review Decision

**Decision:** Approved / Approved with conditions / Rejected  

**Conditions (if applicable):**  
[What must change before approval is granted?]

**Reviewer sign-offs:**

| Reviewer | Role | Decision | Date | Notes |
|----------|------|----------|------|-------|
| | Engineering lead | | | |
| | Enterprise architect | | | |
| | Security engineer | | | |
| | FinOps | | | |
| | SRE | | | |

---

*Archive this document after approval. Reference in post-mortems if relevant.*

