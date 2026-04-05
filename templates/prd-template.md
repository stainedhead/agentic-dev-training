# Product Requirements Document (PRD) Template

> **How to use this template:**  
> Complete every section before development begins. Sections marked [REQUIRED] must not be left blank.
> Sections marked [OPTIONAL] may be marked N/A with justification.
> This document is an audit artefact — do not delete it when the feature ships. Archive it.

---

## Document Metadata

| Field | Value |
|-------|-------|
| **Title** | [Feature / project name] |
| **Status** | Draft / In Review / Approved / Shipped |
| **Author** | [Name, role] |
| **Reviewers** | [Names] |
| **Created** | [YYYY-MM-DD] |
| **Last updated** | [YYYY-MM-DD] |
| **Target delivery** | [Quarter / sprint] |
| **Ticket/Epic** | [Link] |

---

## 1. Problem Statement [REQUIRED]

> *What is wrong or missing today? Who is affected and how?*

[Describe the problem in plain language. Include: who experiences it, how often, what the current workaround is (if any), and what the cost of not solving it is.]

---

## 2. Goals [REQUIRED]

> *What does success look like? Goals must be measurable.*

- [ ] Goal 1: [Metric / outcome — e.g. "Reduce time to complete X from Y minutes to Z minutes"]
- [ ] Goal 2: [...]
- [ ] Goal 3: [...]

---

## 3. Non-Goals [REQUIRED]

> *What is explicitly out of scope? This section is as important as the goals.*

The following are explicitly NOT in scope for this release:

- [Non-goal 1]
- [Non-goal 2]
- [Non-goal 3]

---

## 4. Background & Context [OPTIONAL]

> *Any relevant history, prior attempts, or strategic context.*

[...]

---

## 5. Proposed Solution [REQUIRED]

> *High-level description of the approach. Not an implementation spec — that comes later.*

[Describe what you are building at the level of "what does a user experience?" or "what does the system do?" Leave implementation details to the Technical Spec.]

---

## 6. Functional Requirements [REQUIRED]

> *Numbered, testable statements of what the system must do.*
> Each requirement should be independently verifiable.

| ID | Requirement | Priority | Notes |
|----|------------|----------|-------|
| FR-01 | [The system shall...] | Must / Should / Nice-to-have | |
| FR-02 | [The system shall...] | Must | |
| FR-03 | [The system shall...] | Should | |

---

## 7. Non-Functional Requirements [REQUIRED]

| Category | Requirement |
|----------|------------|
| **Performance** | [e.g. p95 response time < 500ms under N concurrent users] |
| **Availability** | [e.g. 99.9% uptime during business hours] |
| **Security** | [e.g. All data encrypted at rest and in transit; auth required for all endpoints] |
| **Compliance** | [e.g. PII handled per GDPR Article 17; SOC 2 controls maintained] |
| **Scalability** | [e.g. Must handle 10x current volume without architecture change] |
| **Auditability** | [e.g. All data modifications logged with user ID and timestamp] |

---

## 8. Constraints [REQUIRED]

> *Technical, business, legal, or resource constraints that bound the solution.*

- **Tech stack:** [Must use existing stack / may introduce X / cannot use Y]
- **Existing systems:** [Must integrate with / must not break X]
- **Timeline:** [Hard deadline and reason]
- **Budget:** [If applicable]
- **Team:** [Who is available; what skills are present]

---

## 9. Assumptions [REQUIRED]

> *Things we believe to be true that, if wrong, would change this PRD.*

- [Assumption 1: e.g. "Users have stable internet connections"]
- [Assumption 2]
- [Assumption 3]

---

## 10. Open Questions [REQUIRED]

> *Explicit list of things not yet decided. Each must have an owner and a resolution date.*

| # | Question | Owner | Due | Resolution |
|---|----------|-------|-----|------------|
| 1 | [Question] | [Name] | [Date] | [TBD / answer] |
| 2 | | | | |

---

## 11. Definition of Done [REQUIRED]

> *The checklist that closes this PRD. All items must be checked before marking this PRD "Shipped".*

- [ ] All functional requirements (FR-01 through FR-NN) are implemented and tested
- [ ] All NFRs are verified (performance test results attached)
- [ ] Security review completed and sign-off obtained
- [ ] Documentation updated (user docs, API docs, runbook)
- [ ] Feature flagged and rollout plan executed
- [ ] Monitoring and alerts in place
- [ ] Stakeholder demo completed and sign-off obtained
- [ ] Post-launch metrics baseline established

---

## 12. Success Metrics

> *How will we measure that the goals were achieved, 30/60/90 days post-launch?*

| Goal | Metric | Baseline | Target | How measured |
|------|--------|----------|--------|-------------|
| [Goal 1] | | | | |
| [Goal 2] | | | | |

---

## 13. Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| [Risk 1] | High/Med/Low | High/Med/Low | [Mitigation] |
| [Risk 2] | | | |

---

## 14. Approval

| Role | Name | Decision | Date |
|------|------|----------|------|
| Product Owner | | Approved / Rejected / Changes requested | |
| Engineering Lead | | | |
| Architecture | | | |
| Security | | | |

---

*Archive this document when shipped. Do not delete.*

