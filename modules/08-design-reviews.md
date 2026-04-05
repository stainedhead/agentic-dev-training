# Module 08 — Design Reviews for Agentic Systems

## Learning Objectives

- Apply a structured design review process to agentic system proposals
- Identify common design anti-patterns before they reach production
- Use the agentic design review template effectively
- Integrate design review into your SDLC

---

## Background

Agentic systems fail in novel ways. A traditional design review can catch performance bottlenecks, data model issues, and API design problems. An agentic design review must additionally catch: unsafe autonomy levels, missing interrupt conditions, inadequate observability, prompt injection vectors, runaway cost scenarios, and governance gaps.

The goal of an agentic design review is not to slow things down. It is to prevent the class of production incidents that are unique to agentic systems — incidents that are often invisible until they have caused significant harm or cost.

---

## Core Concepts

### 1. When to Trigger a Design Review

| Scenario | Review required? |
|----------|----------------|
| New agentic system or workflow | ✅ Always |
| Existing agent gains new write-capable tools | ✅ Always |
| Existing agent's scope expanded significantly | ✅ Always |
| Model upgrade for a production agent | ✅ Recommended |
| Prompt/rules file change for a production agent | Lightweight review |
| Cost or performance optimisation only | Lightweight review |
| Bug fix with no behavior change | No formal review needed |

### 2. Review Board Composition

For a meaningful agentic design review, include:

| Role | Perspective they bring |
|------|----------------------|
| **Engineering lead** | Technical feasibility, implementation risk |
| **Enterprise architect** | Fit with enterprise patterns, integration |
| **Security engineer** | Threat model, data handling, injection risks |
| **FinOps representative** | Cost model, budget impact |
| **Product owner** | Business value, user impact |
| **SRE / platform engineer** | Operational burden, observability |

For lower-stakes systems, a subset is acceptable. Security and architecture should always be present.

### 3. The Design Review Checklist

See the full template at [`templates/agentic-design-review.md`](../templates/agentic-design-review.md). Key sections:

#### A. Goal and Scope
- What is the agent trying to accomplish?
- What is explicitly out of scope?
- Who is accountable for this agent in production?

#### B. Architecture
- Draw the agent graph: orchestrator, subagents, tools
- What external systems does this agent connect to?
- What data does it read? What data can it write?
- Where are the trust boundaries?

#### C. Autonomy Assessment
- Where on the autonomy spectrum does this sit?
- What are the interrupt/escalation conditions?
- What is the maximum blast radius of a failure?
- Can failures be reversed? How?

#### D. Security Review
- Threat model: what are the top three ways this agent could be exploited?
- What is the prompt injection surface area?
- What are the minimum required permissions? Are they enforced?
- How are secrets managed?

#### E. Observability Plan
- What traces will be captured?
- What metrics are being monitored?
- What are the alert conditions?
- How will failures be diagnosed post-incident?

#### F. Cost Model
- What is the estimated cost per run and at projected volume?
- What token budget is enforced?
- What is the cost anomaly alert threshold?

#### G. Eval Strategy
- What evals exist for this agent?
- What is the pass threshold for promotion to production?
- How will quality be monitored in production?

#### H. Go / No-Go Criteria
- What must be true before this agent goes to production?
- What is the rollback plan?
- What is the phased rollout plan (shadow mode → limited traffic → full traffic)?

### 4. Common Anti-Patterns

**Anti-pattern: Omnipotent Agent**  
An agent with access to every system "just in case." Always restrict to minimum required permissions. If the agent doesn't need write access to the production database, it doesn't get it.

**Anti-pattern: No Interrupt Conditions**  
An agent designed to run to completion no matter what. Every production agent must have defined conditions under which it stops and escalates.

**Anti-pattern: Unreviewed Prompt Changes**  
Prompt and rules file changes treated as "just config" and not code-reviewed. These changes directly alter agent behavior and must go through the same review process as code.

**Anti-pattern: Testing Only Happy Paths**  
Eval suites that only test successful cases. Agentic systems fail in complex, multi-step ways. Test failure modes: tool unavailability, partial data, ambiguous instructions, adversarial inputs.

**Anti-pattern: Cost Blindness**  
Launching an agent without a cost model or budget. Set token budgets before go-live. No exceptions.

**Anti-pattern: No Rollback Plan**  
Assuming the agent can just be "turned off" if something goes wrong. What happens to in-flight tasks? What state has been modified? Define rollback before launch.

**Anti-pattern: Skipping Shadow Mode**  
Going straight to full traffic. Run new agents in shadow mode (observing but not acting, or acting in a sandbox) before exposing them to production systems.

### 5. Shadow Mode Rollout

```
Phase 0: Development environment only
    │
    ▼
Phase 1: Shadow mode — agent runs on real inputs but
         outputs are logged, not applied; human compares
         agent output to actual outcome
    │
    ▼
Phase 2: Limited traffic — agent active for 5-10% of workload
         with heightened monitoring
    │
    ▼
Phase 3: Full traffic — ongoing monitoring, SLOs active
```

Gate each phase transition on: eval score threshold, zero critical incidents in N runs, and explicit sign-off from accountable engineer and security.

---

## Enterprise Considerations

**Design review as an audit artifact.** Completed design review documents are evidence of due diligence. Store them with your change management records. Reference them in incident post-mortems.

**Review cadence for long-running agents.** Conduct a lightweight review annually for any agent that has been in production for more than a year. The threat landscape, the business context, and the agent's actual behavior may all have shifted.

**Cross-team agents.** If an agent spans multiple teams' systems, the review board must include representation from all affected teams. Do not let one team's agent make production decisions about another team's data without that team's input.

---

## Exercise

Conduct a design review of the following proposal:

> *"We want an agent that monitors our company's public GitHub repositories, identifies issues tagged 'good first issue', finds internal developers who have the relevant skills (by querying our internal HR skills database), and automatically assigns them to the issue and sends them an email."*

Using the design review template:
1. Complete the autonomy assessment
2. Write the threat model (top three risks)
3. Define the interrupt conditions
4. Identify what's missing from the proposal before you could approve it

---

## Facilitator Notes

The exercise scenario deliberately has several problems: it reads from an HR database (PII concerns), it automatically assigns work to people without their consent (autonomy concerns), and it sends emails on behalf of the organization (communication concerns). These should emerge naturally from the review process.

Discussion: *"What is the minimum information you would need before approving any new agentic system at this organization?"*

---

## Further Reading

- ISACA: AI Governance Framework
- NIST AI Risk Management Framework (AI RMF)
- Anthropic: Responsible scaling policy
- Google DeepMind: Safety-first AI deployment principles

