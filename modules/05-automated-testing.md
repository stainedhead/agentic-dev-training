# Module 05 — Automated Testing: TDD, Coverage, and the Testing Pyramid

---

## Narrative Anchor: Where This Module Fits the Bigger Argument

> **For facilitators and curriculum reviewers.** This section maps the module's specific content to the programme's core argument. It is not a content summary — it is an explicit signpost for where and how to reinforce the key ideas.

Comprehensive testing was always the right practice. Kent Beck formalised it in Extreme Programming in the late 1990s. Every subsequent generation of software methodology — from XP to TDD to the Agile manifesto to DevOps — reaffirmed it. Teams knew it was right. Most did not do it consistently.

The reason was economic. Writing a thorough test suite for a non-trivial feature takes longer than writing the feature. Under delivery pressure, tests were the first thing cut. The result was widespread technical debt — codebases where no one was confident what they could safely change, where "release day" meant anxiety rather than confidence, and where senior engineers were permanently occupied performing manual regression verification that machines could do faster and more reliably.

Agentic tools change the economics fundamentally. An agent given an acceptance criterion will write the test before it writes the code. It will write dozens of tests — edge cases, error paths, boundary conditions — without slowing down. The constraint that made TDD impractical under pressure no longer exists at the implementation layer.

**What this module argues:** the human's job is not to write tests. The human's job is to write acceptance criteria that are specific enough to become tests. That is a narrower, higher-value task — and it means AC quality is now the binding constraint on test quality.

**Connections to the programme arc:** AC lives in the PRD and spec produced in Module 04. The DoD enforcement that ensures coverage thresholds are met is a review practice covered in Module 06. The agent-assisted change detection that keeps regression suites current connects to the observability patterns in Module 07. E2E test governance intersects with the cross-team reliability contracts in Module 08.

**The XP connection:** TDD is not a new idea. It was right in 1999 and it was systematically under-adopted because the economics were wrong. Agents fix the economics. Teams that resisted TDD then encounter it now as an automated prerequisite — the agent does it by default if you give it AC that supports it.

---

## Learning Objectives

- Apply the Red-Green-Refactor cycle with an agent as the primary test and implementation author
- Write acceptance criteria precise enough to drive automated test generation
- Set and enforce a test coverage threshold (85%) as a Definition of Done item
- Distinguish the responsibilities of unit, integration, functional, and regression tests — and know what each layer is for
- Scope E2E tests correctly and establish cross-team ownership governance

---

## Background

### The Economics of Testing Before and After Agents

Before agentic tools, comprehensive testing required a deliberate organisational decision to invest time that would not ship features. That decision was difficult to sustain under pressure.

The consequences were predictable:
- Coverage drifted downward over time as features were added without tests
- Regression testing was manual, slow, and incomplete
- Senior engineers spent significant time verifying that changes had not broken things that were previously working
- The cost of a bug found in production was orders of magnitude higher than the cost of a test that would have caught it

With agentic tools, the cost profile reverses. Writing tests is no longer a slow manual activity. An agent given an acceptance criterion will produce a comprehensive test suite — happy path, error paths, edge cases, boundary conditions — in the time it takes a human to write one or two tests manually. The constraint is no longer developer time; it is the quality of the AC that drives the tests.

This does not eliminate the need for human judgement in testing. It changes where that judgement is applied. The human must:
- Write AC that is specific, measurable, and unambiguous
- Review tests to verify they test the intended behaviour, not just the implementation
- Decide which flows warrant E2E coverage and negotiate cross-team ownership
- Maintain the coverage threshold as a hard DoD gate

### The XP and TDD Connection

Test-Driven Development was codified by Kent Beck as a core Extreme Programming practice in the late 1990s. The argument was straightforward: writing the test first forces you to think about the interface and behaviour before the implementation, produces tests that are inherently coupled to requirements rather than implementation details, and creates a safety net for refactoring.

Teams that adopted TDD consistently reported shorter debugging cycles, higher confidence in refactoring, and better-designed interfaces. Teams that did not adopt it — the majority — cited time pressure, tooling friction, and difficulty changing existing development habits.

Agents do not have habits to change. An agent instructed to follow TDD will write the failing test before the implementation, every time, without friction. The practice that was correct but expensive is now the default — if your AC supports it.

---

## Core Concepts

### 1. Test-Driven Development: Red → Green → Refactor

TDD is a three-step cycle applied at the unit level:

**Red:** Write a failing test that expresses the desired behaviour. The test must fail first — if it passes immediately, it is not testing anything new. The test should be named to describe the behaviour, not the implementation.

**Green:** Write the minimum code necessary to make the test pass. Not the best code — the simplest code that satisfies the test. At this stage, the goal is a passing test, not a clean implementation.

**Refactor:** Improve the implementation without changing the behaviour. The test suite is the safety net: if refactoring breaks a test, the change was wrong.

**Agent role in each step:**

| Step | Human does | Agent does |
|------|-----------|-----------|
| Red | Provides AC and specifies the test scenario | Writes the test file, names the test clearly, ensures it fails |
| Green | Reviews that the implementation is minimal and correct | Writes the simplest passing implementation |
| Refactor | Decides what improvements matter | Refactors and re-runs the full suite |

**Example cycle:**

Acceptance criterion: _When a user submits a contact form without an email address, the system returns a validation error with status 400 and the message "Email is required"._

```
// RED: Agent writes this test first
describe('ContactForm validation', () => {
  it('returns 400 with validation error when email is missing', async () => {
    const response = await submitContactForm({ name: 'Alice', message: 'Hello' });
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Email is required');
  });
});
```

The test fails. The agent then writes the minimum validation logic to make it pass. Once green, it refactors the validation code for clarity — without touching the test.

### 2. What Makes a Good Unit Test

Unit tests verify a single unit of behaviour in isolation. A unit is typically a function, method, or small component — not a whole service or integration.

**The three properties:**

- **Isolated:** The test does not depend on the database, file system, network, or any external service. Dependencies are mocked or stubbed. If the test requires a running database to pass, it is not a unit test.
- **Fast:** Unit tests run in milliseconds. A full suite of hundreds of unit tests should complete in seconds, not minutes. Slow tests do not get run.
- **Deterministic:** The same test run against the same code produces the same result every time. Time-dependent tests, random-seed tests, and tests that depend on external state are fragile and should not be in the unit test suite.

**Test behaviour, not implementation:**

```
// Tests implementation — BRITTLE
it('calls validateEmail() before checking the database', () => { ... });

// Tests behaviour — ROBUST
it('rejects a form submission with an invalid email format', () => { ... });
```

The first test will break if you rename or reorganise the validation code. The second test will only break if the behaviour changes — which is exactly when you want the test to fail.

**Test naming convention:**

Good test names are complete sentences that describe the behaviour: _"returns an empty array when no matching records exist"_, _"throws AuthError when the token has expired"_. A failing test with a clear name tells you immediately what behaviour broke.

### 3. Test Coverage: The 85% Threshold

**What coverage measures:**

Test coverage measures which lines (or branches, or statements) of code are executed by at least one test. A line with 100% coverage means every test run passes through that line at least once.

Coverage does not measure whether the tests are meaningful. A test that calls a function but asserts nothing produces coverage without protection. Coverage is a floor, not a ceiling.

**Why 85%:**

- Below 85%: regression risk increases sharply. Changes to untested code produce silent regressions. Refactoring becomes dangerous.
- 85–95%: the productive zone. The effort to test each new line is manageable; the protection is substantial.
- Above 95%: marginal coverage often covers code that is genuinely difficult to test (error paths in infrastructure code, third-party integration error handling). The tests written to reach 98% are often low-value and brittle.

The 85% target is a team-level minimum, not a per-file target. Some files will be higher; some may be lower for justified reasons (documented exceptions).

**Coverage as a DoD gate:**

Coverage threshold must be enforced in CI. A PR that drops coverage below 85% fails the pipeline. This is not optional — manual enforcement does not work at agent speed.

```yaml
# Example: jest coverage threshold in package.json
{
  "jest": {
    "coverageThreshold": {
      "global": {
        "branches": 85,
        "functions": 85,
        "lines": 85,
        "statements": 85
      }
    }
  }
}
```

**Agent role in coverage maintenance:**

When an agent implements a feature, it also generates tests to cover the new code. When the agent makes a change to existing code, it checks whether existing tests still cover the changed code and adds tests for new branches. The agent should be instructed in CLAUDE.md: _never reduce coverage below 85%; add tests for any new branch you introduce_.

### 4. The AC-to-Test Pipeline

The bridge between product documentation and code quality runs through acceptance criteria:

```
PRD / Spec (Module 04)
    │
    ▼ Acceptance Criteria (specific, measurable, unambiguous)
    │
    ▼ Agent generates test cases (one test per AC statement)
    │
    ▼ Agent implements code to pass tests (TDD Green step)
    │
    ▼ CI runs tests + coverage gate (85% threshold enforced)
    │
    ▼ PR merged (Definition of Done: all tests pass, coverage maintained)
```

**What makes AC testable:**

| AC property | Testable example | Not testable |
|-------------|-----------------|-------------|
| Specific | "Returns status 401 when the token is expired" | "Handles authentication errors gracefully" |
| Measurable | "Response time is under 200ms for 99th percentile" | "System is responsive" |
| Unambiguous | "Validates that email contains exactly one @ character" | "Validates email format" |
| Bounded | "Accepts files up to 10MB; rejects files above 10MB with error code FILE_TOO_LARGE" | "Handles large files" |

The human's most important input to the testing pipeline is writing AC that meets these properties. If the AC is vague, the tests will be wrong — well-written tests for the wrong behaviour.

### 5. Integration and Functional Testing

**Integration tests** verify that components work correctly together. Where unit tests mock all dependencies, integration tests use real instances — or close approximations — to verify that the interfaces between components behave as expected.

What integration tests cover:
- Service + database: does the data access layer correctly read and write to the actual schema?
- Service + external API: does the integration client correctly handle real response shapes, including error responses?
- Two services communicating: does service A correctly parse the events published by service B?

Integration tests are slower than unit tests (seconds, not milliseconds) and require more setup. Run them in CI, but not in the fast pre-commit hook.

**Functional tests** verify user-facing behaviour from the outside, treating the system as a black box. An API's functional tests verify the contract — the request shapes, response shapes, status codes, and error messages — without knowledge of the internal implementation. A UI's functional tests verify the user flows.

**Keeping tests in sync with code changes:**

When an agent makes a change, it must also update the relevant integration and functional tests. This is an explicit instruction in CLAUDE.md: _when changing an interface, update the integration and functional tests that cover it in the same PR_. A PR that changes an API response shape without updating the functional contract tests is incomplete.

### 6. Regression Testing

A regression test is a test written because a bug was found. The test captures the exact conditions that produced the bug and verifies that it does not return.

Regression tests are not a separate category of infrastructure — they are unit or integration tests that happened to originate from a bug report. Over time, the accumulated regression suite becomes the most specific and battle-tested part of the test suite: every test in it corresponds to a real problem that once reached production or staging.

**Agent-assisted regression testing:**

When a bug is reported, the workflow is:
1. Agent reproduces the bug with a failing test (the reproduction confirms the bug is understood)
2. Agent fixes the bug (the test turns green)
3. The test is committed alongside the fix

The agent should not fix a bug without a regression test. This is an instruction for CLAUDE.md: _when fixing a bug, always write a regression test that reproduces the bug before implementing the fix_.

### 7. End-to-End Testing: Scope and Governance

E2E tests simulate the full user journey through every system layer — frontend, API, backend, database, and any integrated external services.

**E2E tests are expensive:**

- **Slow:** Minutes per test, not seconds. A full E2E suite for a complex system can take hours.
- **Brittle:** Any change in the UI, API contract, or data model can break an E2E test. Maintenance cost is high.
- **Cross-team:** An E2E test that traverses another team's system will break when that team makes a valid change to their system.

**Use E2E tests selectively:**

E2E coverage is warranted for:
- The core user journeys that, if broken, make the product unusable
- Flows that involve regulatory obligations (payment processing, user data handling)
- Cross-team integrations where the integration has previously broken and had high impact

E2E coverage is not warranted for:
- Edge cases and error paths (unit and integration tests cover these more reliably)
- Flows that are already fully covered by functional contract tests
- New features before the implementation is stable

**Cross-team ownership:**

The key governance question for any E2E test is: _who is responsible when this test breaks?_ An E2E test that traverses both your system and another team's system will be broken by changes from either side. Both teams must agree to co-own it.

The governance model:
- Before writing an E2E test that traverses another team's system, get explicit agreement from that team that they will help maintain it
- Document ownership in the test file (a comment is sufficient)
- Each team is responsible for fixing E2E test failures caused by their own changes
- Unowned E2E tests are a smell: either assign ownership or delete them

---

## Enterprise Considerations

### Regulated Industry: Test Validation and Audit Trails

In regulated industries (financial services, healthcare, pharmaceuticals, defence), test suites are not just quality practices — they are compliance artefacts. Tests may need to be reviewed, approved, and retained as evidence that specified requirements were verified.

Considerations:
- **Traceability:** Each test should be traceable to a specific requirement or AC. Agent-generated tests should include a comment or tag that links to the AC that drove them.
- **Test review:** In some regulated contexts, tests require the same review and sign-off as code. This is an argument for keeping test files in the same PR as production code — single review covers both.
- **Retained artefacts:** Test run results, coverage reports, and test inventories may need to be retained for audit. Ensure CI pipelines publish and archive these reports.
- **Validation vs. verification:** In regulated software, _verification_ asks "did we build it right?"; _validation_ asks "did we build the right thing?" Both require tests. AC-driven tests provide verification; exploratory testing and user acceptance testing provide validation.

### Coverage Governance at Scale

In a large organisation, individual teams set coverage thresholds — but an organisation-level standard is necessary to prevent teams from opting out.

- Define the minimum coverage threshold in a shared CI configuration (e.g. a shared GitHub Actions workflow or a shared `.coveragerc`)
- Make exceptions visible: a team that has a justified exception must document it and have it approved — not silently configure their way around it
- Track coverage trends over time, not just snapshots. A codebase trending from 87% to 82% over three months is a warning sign that tests are not keeping up with agent-driven development

### Cross-Team E2E Ownership

At enterprise scale, E2E test ownership becomes a political as well as a technical problem. Teams that break each other's E2E tests without a clear ownership model will either disable the tests or point fingers.

Recommended governance:
- Maintain a register of E2E tests and their owners (team name and contact)
- Define the SLA for fixing a broken E2E test (24h for P1 flows, 72h for lower-priority flows)
- Review the E2E suite quarterly: prune tests that have not been maintained, renegotiate ownership for suites that have changed in scope

---

## Lab Exercise

**Duration:** 40 minutes

**Setup:** Use a real project, a representative sample repository, or the training sample codebase.

### Step 1 — Write Three Testable ACs (10 min)

Take a feature from a current or recent project. Rewrite three acceptance criteria using the testable AC format: specific, measurable, unambiguous, bounded. For each AC, write the test name (not the test code) that would verify it. Do the test names make sense without reading the AC? If not, the AC needs to be more specific.

### Step 2 — Apply the TDD Cycle (12 min)

Choose one of your testable ACs. Following the Red-Green-Refactor cycle:
1. Write the failing test (Red). Verify it fails for the right reason — not a syntax error, but a missing behaviour.
2. Write the minimum implementation to pass the test (Green). Resist the urge to write clean code at this step.
3. Refactor: improve the implementation without changing the test. Run the test after each change to verify it is still green.

If working with an agent: instruct the agent to follow the TDD cycle explicitly. Review what it produces at each step.

### Step 3 — Audit Coverage and the DoD Gate (10 min)

For your project or the sample repo:
1. Run the test suite with coverage reporting. What is the current coverage percentage?
2. If your project does not have a coverage threshold in CI, write the configuration to add one at 85%. Where would it live in your CI pipeline?
3. Identify one area of the codebase with coverage below 60%. What would it take to bring it above 85%? What AC would drive those tests?

### Step 4 — E2E Scope Decision (8 min)

Identify three user journeys in your system:
1. For each, decide: does this warrant E2E coverage? Apply the criteria: core flow, regulatory obligation, or high-impact integration.
2. For each that does warrant E2E coverage: who owns it? If it traverses another team's system, is there an agreement?
3. If any existing E2E tests have no clear owner, mark them for governance review.

---

## Facilitator Notes

**On the XP/TDD discussion:** Expect pushback from participants who have tried TDD and found it slowed them down. The key reframe is that TDD friction exists at the human-writes-tests layer, not at the machine-writes-tests layer. The question to redirect the discussion: "What would your TDD adoption look like if writing a test took 10 seconds?" The answer reframes TDD from a discipline to a default.

**On coverage gaming:** Participants will raise the valid concern that 100% coverage does not mean the tests are good. Acknowledge it directly: coverage is a floor, not a quality measure. The purpose of the threshold is to catch the absence of tests, not to guarantee their quality. Code review of tests — especially agent-generated tests — is where quality is enforced.

**On E2E ownership:** This is often the most politically charged topic in the module. In large organisations, the question "who owns this E2E test?" surfaces real inter-team tensions. Frame the governance model as a service agreement rather than a blame assignment. The goal is not to find fault — it is to ensure every test has a team that will fix it.

**Timing:** Steps 1 and 2 can be done in pairs. Steps 3 and 4 work well as group exercises with discussion after.

---

## Further Reading

- Beck, K. (2002). _Test-Driven Development: By Example._ Addison-Wesley. — The original and still the clearest exposition of the TDD cycle.
- Fowler, M. "TestCoverage." martinfowler.com — A nuanced treatment of what coverage measures and what it does not.
- Humble, J. and Farley, D. (2010). _Continuous Delivery._ Addison-Wesley. — Chapter on test strategy covers the testing pyramid in a deployment pipeline context.
- ISTQB Glossary — Definitions of verification vs. validation, relevant for regulated-industry participants.
- Google Testing Blog — https://testing.googleblog.com — Practical guidance on test design at scale, including the shift from E2E to contract testing.
