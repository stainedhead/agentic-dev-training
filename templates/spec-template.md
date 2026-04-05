# Technical Specification Template

> **Purpose:** Translates an approved PRD into an engineering implementation plan.
> An agent should be able to implement this spec without asking clarifying questions.
> If you find yourself unsure how to fill in a section, the spec is not ready for development.

---

## Document Metadata

| Field | Value |
|-------|-------|
| **Title** | [Feature name] — Technical Spec |
| **PRD reference** | [Link to PRD] |
| **Status** | Draft / In Review / Approved |
| **Author** | [Name] |
| **Reviewers** | [Names] |
| **Created** | [YYYY-MM-DD] |
| **Target sprint** | [Sprint / quarter] |

---

## 1. Overview

[2-3 sentences: what is being built and what approach is being taken. No more — the PRD has the full context.]

---

## 2. Architecture

### Component Diagram

```
[Draw the component diagram here using ASCII or link to a diagram]

Example:
  ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
  │  API Layer  │────▶│  Service    │────▶│  Database   │
  │  (FastAPI)  │     │  Layer      │     │  (Postgres) │
  └─────────────┘     └─────────────┘     └─────────────┘
```

### Components

| Component | Responsibility | New or existing? |
|-----------|---------------|-----------------|
| [Component A] | [What it does] | New / Existing |
| [Component B] | | |

### Integration Points

| System | Integration type | Auth method | Data exchanged |
|--------|-----------------|-------------|---------------|
| [External system] | REST / event / DB | API key / OAuth | [Schema] |

---

## 3. Data Models

### New / Modified Schemas

```sql
-- Example
CREATE TABLE [table_name] (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    [field]     [TYPE] NOT NULL,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### Migration Strategy

[How will existing data be migrated? What is the rollback strategy if the migration fails?]

---

## 4. API Contracts

### New Endpoints

#### `[METHOD] /api/v[N]/[resource]`

**Request:**
```json
{
  "field_name": "type and description",
  "another_field": "..."
}
```

**Response (200):**
```json
{
  "id": "uuid",
  "field_name": "..."
}
```

**Error responses:**

| Status | Condition | Response body |
|--------|-----------|---------------|
| 400 | [Condition] | `{"error": "...", "code": "VALIDATION_ERROR"}` |
| 401 | Unauthenticated | `{"error": "..."}` |
| 403 | Unauthorised | `{"error": "..."}` |
| 404 | Resource not found | `{"error": "..."}` |
| 500 | Internal error | `{"error": "Internal server error"}` (no details exposed) |

---

## 5. Business Logic

> *Describe non-trivial logic in enough detail that it can be implemented without interpretation.*

### [Logic area 1]

[Pseudocode, decision table, or step-by-step description]

```
IF [condition A]:
    THEN [action 1]
ELSE IF [condition B]:
    THEN [action 2]
ELSE:
    [default action]
```

### [Logic area 2]

[...]

---

## 6. Security Model

| Aspect | Decision |
|--------|----------|
| **Authentication** | [How is the caller authenticated?] |
| **Authorisation** | [What permissions are checked? At what layer?] |
| **Input validation** | [What validation is performed? Where?] |
| **Data classification** | [What data is handled? What classification?] |
| **Audit logging** | [What events are logged? What data is captured?] |
| **Secrets** | [How are credentials managed?] |

---

## 7. Test Strategy

### Unit Tests

[What is unit tested? What is mocked?]

Key test cases:
- [Test case 1: scenario → expected outcome]
- [Test case 2]
- [Edge case 1]
- [Failure case 1]

### Integration Tests

[What integration tests are required? What external dependencies are used vs mocked?]

### Performance Tests

[If NFRs include performance targets: how will they be measured? What load profile?]

---

## 8. Observability

| Signal | What | Where |
|--------|------|-------|
| **Logs** | [What events are logged] | [Log level, fields] |
| **Metrics** | [What metrics are emitted] | [Name, type, labels] |
| **Traces** | [What spans are created] | [Span names] |
| **Alerts** | [What conditions trigger alerts] | [Alert name, threshold, recipient] |

---

## 9. Deployment Plan

| Phase | What | Validation |
|-------|------|------------|
| 1 | Deploy to staging | [Smoke test list] |
| 2 | Feature flag to 5% of production | [Monitor for N hours] |
| 3 | Ramp to 100% | [Final validation] |

**Rollback procedure:**  
[Step-by-step instructions to roll back if something goes wrong]

---

## 10. Open Questions

[Any remaining ambiguities that must be resolved before implementation. If this section is non-empty, the spec is not ready for development.]

| # | Question | Owner | Due |
|---|----------|-------|-----|
| 1 | [Question] | [Name] | [Date] |

---

## 11. Out of Scope (Implementation)

[Anything that might seem like it belongs here but is explicitly deferred]

---

## Approval

| Role | Name | Date |
|------|------|------|
| Engineering lead | | |
| Architecture | | |
| Security | | |

