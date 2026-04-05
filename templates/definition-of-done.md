# Definition of Done

> **Purpose:** This document defines the standard Definition of Done (DoD) for all development work at [ORGANISATION].
> Project-level `CLAUDE.md` files may add project-specific items but may not remove items from this baseline.
> This DoD applies equally to human-authored and agent-authored code.

---

## Baseline DoD (All Work)

### Code Quality
- [ ] Code follows project conventions defined in `CLAUDE.md`
- [ ] No new lint errors (`[lint command]` exits 0)
- [ ] No new type errors (`[typecheck command]` exits 0)
- [ ] Code formatted (`[format command]` produces no diff)

### Testing
- [ ] All new code has unit tests
- [ ] All unit tests pass locally
- [ ] All integration tests pass locally (where applicable)
- [ ] Code coverage does not drop below project threshold ([N]%)
- [ ] No test is deleted without explicit justification in the PR description

### Security
- [ ] No secrets, API keys, or credentials in code or config files
- [ ] No PII in log statements
- [ ] All external inputs validated
- [ ] Dependency audit passes (`[audit command]`)
- [ ] Security scanner passes (`[scanner command]`)

### Documentation
- [ ] Public-facing functions/methods have docstrings
- [ ] README updated if setup or usage has changed
- [ ] API documentation updated if endpoints changed
- [ ] Architecture diagrams updated if component relationships changed

### Review
- [ ] PR description includes: what changed, why, how, alternatives considered
- [ ] PR has been reviewed by at least one other developer
- [ ] All review comments resolved or explicitly deferred with justification
- [ ] No unresolved merge conflicts

### CI/CD
- [ ] All CI checks pass (lint, test, security, coverage)
- [ ] No regressions in existing tests
- [ ] Deployment to staging tested and validated

---

## Extended DoD — Database Changes

Apply in addition to baseline for any PR that includes database schema changes:

- [ ] Migration script written and tested on a copy of production data
- [ ] Migration is reversible (down migration written and tested)
- [ ] Migration runtime acceptable (does not require extended maintenance window)
- [ ] Index impact assessed
- [ ] DBA or database-experienced engineer reviewed the migration

---

## Extended DoD — API Changes

Apply in addition to baseline for any PR that modifies public or internal APIs:

- [ ] Breaking changes identified and flagged in PR description
- [ ] Versioning strategy applied (no breaking changes to v[N]; new version if needed)
- [ ] API contract (OpenAPI / GraphQL schema) updated
- [ ] Consumer teams notified of changes
- [ ] Backwards compatibility maintained for [N] versions

---

## Extended DoD — Security-Sensitive Changes

Apply in addition to baseline for changes touching auth, authorisation, encryption, secrets handling, or user data:

- [ ] Security engineer reviewed and approved
- [ ] Threat model updated if new attack surface introduced
- [ ] Penetration test or security review scheduled if significant surface change
- [ ] Compliance team notified if regulatory implications

---

## Extended DoD — Agentic Workflows

Apply in addition to baseline for any PR that introduces or modifies an agent or agentic workflow:

- [ ] Agent design review completed (see `templates/agentic-design-review.md`)
- [ ] Interrupt conditions defined and implemented
- [ ] Token budget enforced
- [ ] Full trace captured and inspectable for test runs
- [ ] Eval suite run and passing above threshold
- [ ] Cost model documented
- [ ] Rollback plan documented
- [ ] Shadow mode testing plan defined

---

## DoD Change Log

| Date | Change | Author | Reason |
|------|--------|--------|--------|
| [YYYY-MM-DD] | Initial version | [Author] | Programme launch |

---

*Changes to this document require approval from the Enterprise Architecture and Security teams.*

