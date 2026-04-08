# Module 04 — Product Documentation

---

## Narrative Anchor: Where This Module Fits the Bigger Argument

> **For facilitators and curriculum reviewers.** This section maps the module's specific content to the programme's core argument.

Module 03 established that context determines agent output quality more than model choice. It named the five context artifacts and explained why each matters. This module is where that theory becomes practice: it specifies exactly which files belong in every repository, what each one contains, how to write them, and how to keep them current automatically.

The central argument here is simple but easily underestimated: without product documentation, every agent interaction starts from scratch. The agent does not know what the product is for. It does not know what decisions were made, or why. It does not know the constraints the team has committed to. Every session, the agent reconstructs its working model of the system from raw code — which tells it what the system does now, but not what it was built to do, what trade-offs were made, or what changes are off-limits. That reconstruction is incomplete. The agent fills the gaps with reasonable assumptions, and reasonable assumptions at machine speed accumulate into architectural drift.

Product documentation is the fix. When the rules file tells the agent to read PRODUCT.md before proposing any change, and PRODUCT.md accurately describes the system's intent, the agent's every suggestion is grounded in what the product actually is. When ADRs are in the repository and the rules file says to review them before proposing architectural changes, the agent cannot accidentally undo what the team decided. When the README is generated from code and updated automatically, the codebase always describes itself accurately.

This is not a new discipline invented for agents. XP named it "system metaphor" — a shared high-level description of how the system works that every team member, including newcomers, could use to navigate and reason about the codebase. DevOps formalised the same idea as "documentation as code": docs live in the repo, they are versioned, and they are updated with the code they describe. Teams that resisted these practices then encounter them now as a prerequisite for reliable agentic development.

**The connection to modules that follow:** The documentation layer this module establishes is what Modules 05–12 assume is in place. Review cycles (Module 05) work because the agent understands the product intent. Observability (Module 07) is configured correctly because the technical details doc describes the system's SLAs. Design reviews (Module 10) validate against the documented intent. Without this layer, every subsequent module becomes harder.

**For brownfield teams:** The practical question is not "how do we write this for a new project?" but "how do we generate this for the codebase we already have?" This module answers both. The greenfield pattern is write-first. The brownfield pattern is agent-generate, team-review, commit, maintain.

---

## Learning Objectives

- Write a rules file that instructs the agent to read and maintain product documentation as context for every change
- Create a complete product documentation layer: PRODUCT.md, product-details.md, technical-details.md, and an ADR folder
- Apply the brownfield pattern to retrofit documentation to an existing repository using an agent
- Keep documentation in sync automatically: code changes trigger doc updates in the same PR
- Write Architecture Decision Records that prevent agents from revisiting settled decisions
- Assess enterprise governance requirements for a multi-repo documentation strategy

---

## Background

Documentation has always been the practice teams agree they should do and consistently defer. The reasons are familiar: it takes time, it goes stale immediately, nobody reads it, it lives somewhere other than the code. Every one of those objections is correct — for documentation written and maintained by humans as a secondary activity after the real work is done.

Agentic development changes the economics of this problem in two ways. First, agents can generate initial documentation from existing code in minutes, eliminating the cost of starting from scratch on brownfield projects. Second, the same agent that changes the code can update the documentation in the same operation, eliminating the "goes stale immediately" problem. The agent does not forget to update the docs because the rules file tells it that updating the docs is part of the Definition of Done.

This changes documentation from a practice that requires discipline and constant management attention into a practice that runs automatically, as long as the initial setup is correct. The initial setup is the subject of this module.

---

## Core Concepts

### 1. The Rules File: The Agent's Operating Manual

The rules file — `CLAUDE.md` in Claude Code, `.cursorrules` in Cursor, or the equivalent in any agentic tool — is the agent's standing orders. It is loaded at the start of every session. It applies to every task. It is the document that transforms a capable general-purpose agent into a team member who follows your standards.

For product documentation to work, the rules file must do three things:

**First: instruct the agent to read product docs before proposing any change.**

Without this instruction, the agent will not read PRODUCT.md before suggesting how to implement a feature. It will reconstruct its understanding from code. The rules file must make reading the product docs the first step of any substantive task:

```markdown
## Context Loading

Before proposing or implementing any change:
1. Read PRODUCT.md — understand the product's purpose and non-negotiables
2. Read technical-details.md — understand the current architecture and patterns
3. Review relevant ADRs in the adr/ folder — check for constraints on the change you are considering
4. Read product-details.md if the change affects user-facing behaviour
```

**Second: instruct the agent to update product docs when architectural changes are made.**

Documentation drift happens when the agent changes the code and the documentation becomes stale. The rules file must make doc updates part of the Definition of Done:

```markdown
## Definition of Done (excerpt)

A task is complete when ALL of the following are true:
- [ ] All new code has unit tests
- [ ] All tests pass in CI
- [ ] If the change affects architecture: technical-details.md is updated in the same PR
- [ ] If the change affects product behaviour: product-details.md is updated in the same PR
- [ ] If the change is a significant architectural decision: an ADR is created in adr/
- [ ] README.md reflects the current state of the repository
```

**Third: reference the ADR folder explicitly.**

```markdown
## Architecture Decision Records

Before proposing any architectural change, read all ADRs in the adr/ folder.
If you are proposing a change that a current ADR prohibits, raise this conflict
explicitly rather than proceeding. Do not assume a constraint no longer applies
because it is not in the code — check the ADRs first.
```

**Rules file discipline:** Keep the rules file under 300 lines. If it grows longer, it is being read but not absorbed — the agent's attention degrades on dense instruction files. Move task-specific rules to referenced documents that are loaded just-in-time. The rules file should contain only what is true for every session.

Version-control the rules file through PR review. A change that removes a security rule or reduces documentation requirements is a policy change. It deserves the same scrutiny as a code change that does the same thing.

### 2. Product Documentation Files

A complete product documentation layer consists of four files:

#### PRODUCT.md — Vision and Goals

PRODUCT.md is the document the agent reads first. It answers: what is this product for? One to three pages. Every section should be useful as agent context, not as marketing copy.

**What PRODUCT.md contains:**

```markdown
# [Product Name]

## What It Is
One paragraph. What does this system do? What problem does it solve for whom?
Assume the reader is a senior engineer who has never seen the system.

## Primary Users
Who uses this system? What is their primary goal? What would failure cost them?

## Non-Negotiables
The three to five things this system must never do.
These are the constraints every architectural and implementation decision is
measured against. Examples:
- Never expose PII in logs or error messages
- Never lose a committed transaction
- Decision latency must remain under 200ms at the 99th percentile

## Current State
Where is the product in its lifecycle? What is being built now?
What has recently changed? What is explicitly out of scope for the current phase?

## Key Stakeholders
Who owns this product? Who approves architectural changes? Who is the compliance contact?
```

PRODUCT.md should be updated when the product's purpose, users, or non-negotiables change. Not after every feature. When the product materially evolves.

#### product-details.md — Features and Requirements

product-details.md is what the agent reads when it needs to understand how the product works, not just what it is. It describes the system's functional behaviour in enough detail for the agent to evaluate whether a proposed change is consistent with the product's design.

**What product-details.md contains:**

- User personas and their primary workflows (enough detail to evaluate usability decisions)
- The major features and their intended behaviour
- Key integrations and their constraints (rate limits, data contracts, failure modes)
- Performance baselines that are contractual or SLA-governed
- Known limitations and their accepted trade-offs (why the current design is the way it is)
- What is explicitly not supported (prevents the agent from "helpfully" adding unsupported paths)

Keep this document at the level of "what the product does and why," not "how it is implemented." That is technical-details.md's job.

#### technical-details.md — Architecture and Patterns

technical-details.md is what a senior engineer reads in their first week to understand how to navigate the system. For agents, it is the document that establishes the technical frame of reference for every implementation decision.

**What technical-details.md contains:**

- Architecture overview — the major components and how they interact
- Bounded contexts — what each part of the system is responsible for, and where its boundary is
- Technology choices — the stack, and the reasoning behind each major choice
- Required patterns — patterns the team has adopted and agents must follow (e.g., "all database access goes through the repository layer," "use the Result type for error handling, not exceptions")
- Integration contracts — the API contracts and data schemas for each integration
- Security model — how authentication and authorisation work, what is sensitive data, how it is protected
- Deployment topology — environments, infrastructure, what is stateful
- Performance characteristics — where the system is optimised, where it intentionally is not

This document is updated whenever an architectural decision changes. That update is part of the Definition of Done for any change that affects the architecture.

#### adr/ — Architecture Decision Records

Architecture Decision Records document specific architectural decisions: what was decided, why, what alternatives were considered, and what is now settled. ADRs are the agent's protection against well-intentioned mistakes — they prevent the agent from revisiting decisions it cannot know were already made.

**Why ADRs matter for agents:** The agent sees code. It does not see the conversation that produced that code, the alternatives that were rejected, or the constraints that ruled out the "obviously better" approach. An ADR makes that invisible history visible. Without it, the agent will consider migrating session storage back to the database because the Redis session code looks like an optimisation that could be removed. It does not know that ADR-012 documents why that migration happened and why reverting it would break the SLA.

**ADR format:**

```markdown
# ADR-[number]: [Short descriptive title]

**Date:** YYYY-MM-DD
**Status:** Accepted | Deprecated | Superseded by ADR-[number]

## Context
What situation or constraint forced this decision?
What was the system state at the time?

## Decision
What was decided, stated precisely.
Why was this option chosen over the alternatives?

## Alternatives Considered
What else was evaluated?
Why was each alternative rejected?

## Consequences
- What becomes easier as a result of this decision?
- What becomes harder or is now explicitly prohibited?
- What must be monitored to know if this decision is holding?

## Review Trigger
Under what conditions should this decision be revisited?
What signals would indicate the decision is no longer correct?
```

**ADR discipline:**

- One decision per ADR. Compound decisions are harder to read and harder to reference.
- Store in `adr/` in the repository root, named `adr-NNN-short-title.md`.
- When a decision is superseded, update the status to "Superseded by ADR-[n]" and link forward. Never delete an ADR.
- Reference the folder from the rules file: `"Before proposing any architectural change, read all ADRs in adr/"`.
- Use sequential numbers. Do not renumber.

### 3. README.md: Generated and Auto-Updated

The README.md is the repository's public face — the first document a new team member, auditor, or agent reads. In repositories without a discipline of maintenance, READMEs become historical documents: accurate when written, increasingly wrong as the system evolves.

The agentic approach is different: the README is generated from the codebase and updated automatically when the architecture changes.

**What a repository README should contain:**

```markdown
# [Repository Name]

## What This Does
One paragraph. Generated from PRODUCT.md — the product summary.

## Getting Started
Installation, configuration, and how to run the system locally.
This section must be accurate — if it is not, the first thing every new
engineer does is wrong.

## Architecture Overview
The major components and how they relate. One diagram if the system is
complex enough to warrant it. Generated from technical-details.md.

## Key Documentation
- PRODUCT.md — product vision and non-negotiables
- product-details.md — features and requirements detail
- technical-details.md — architecture, patterns, and tech decisions
- adr/ — Architecture Decision Records

## Development
How to run tests. CI pipeline. Contribution standards.
```

**The auto-update pattern:** When an agent makes a change that affects the architecture — a new service, a changed integration, a refactored boundary — the rules file instruction requires the agent to update technical-details.md and regenerate the affected README sections in the same PR. The PR reviewer verifies that the doc update is accurate, not just that it is present.

### 4. The Brownfield Pattern

Most teams working on this programme have existing repositories without product documentation. The question is not whether to write it from scratch — that takes weeks and the result is usually wrong because it is written from memory, not from the code. The question is how to generate it quickly and accurately from what is already there.

**The brownfield generation pattern:**

**Step 1: Read the codebase.**
Run an agent over the existing codebase with a prompt that asks it to identify: the system's primary purpose (inferred from the code structure, entry points, and existing comments), the major components and their responsibilities, the technology choices visible in the code, and any constraints evident from configuration, test names, or error handling patterns.

Example prompt:
```
Read this entire repository. Based on what you find, produce a first draft of:
1. A PRODUCT.md covering: what this system does, its likely primary users, and what it must never do (infer from error handling, validation, and configuration).
2. A technical-details.md covering: the major components, technology choices, and any patterns you observe being consistently applied.
3. A list of 5–10 architectural decisions that appear to have been made and should be documented as ADRs — describe each one and ask if it is correct before writing the ADRs.

Note your confidence level for each claim. Flag anything where the code is ambiguous about intent.
```

**Step 2: Team review.**
The generated documentation is a starting point, not a deliverable. The team reviews it — correcting wrong inferences, adding context the agent could not see from code alone, filling gaps. This is faster than writing from scratch: editing is quicker than authoring.

**Step 3: ADR generation.**
Once the team has identified the architectural decisions from Step 1's list, the agent drafts each ADR using the template. The team reviews and fills in the "alternatives considered" sections, which require human knowledge the agent cannot infer.

**Step 4: Commit with the rules file.**
The documentation layer and the rules file that references it are committed together. From this point, the agent has a context layer to work from, and the rules file instructs it to maintain that layer as it works.

**How long does this take?** For a medium-complexity codebase (50,000–200,000 lines), Step 1 typically takes 30–60 minutes of agent work, producing drafts good enough to review. Steps 2 and 3 typically take a half-day team session. Step 4 is a pull request.

### 5. Auto-updating: Keeping Docs in Sync

The most common failure mode of documentation is that it is accurate on day one and wrong on day one hundred. The agentic approach addresses this through a simple rule: the PR that changes the code also changes the documentation. One PR, one review, both things.

**The auto-update workflow:**

1. Agent receives a task (via PRD or direct instruction)
2. Agent reads the product docs (as instructed by the rules file) and checks relevant ADRs
3. Agent implements the change
4. Before raising the PR, agent re-reads technical-details.md and product-details.md to identify sections affected by the change
5. Agent updates those sections in the same branch
6. PR includes both code changes and documentation updates
7. Reviewer validates that documentation accurately reflects the change

**When documentation does not need updating:** Not every change requires a doc update. The agent should update docs when:

- A new component is added or an existing one is materially changed
- A technology choice or dependency changes
- The product's behaviour changes in a way that affects the product-details.md description
- An architectural decision is made that should be an ADR
- The README's architecture section is no longer accurate

The agent should not update docs for:

- Bug fixes that do not change documented behaviour
- Internal refactoring that does not change the system's interface or structure
- Test additions that do not change what the system does

The rules file makes this judgment explicit:

```markdown
## Documentation Updates

Include documentation updates in the same PR as code changes when:
- A new service, component, or module is added
- A public interface changes (API, event schema, config format)
- An architectural decision is made that would affect future design choices
- A technology dependency changes

Do not create separate documentation PRs. If docs need updating, they update with the code.
```

---

## The XP and DevOps Connection

XP practitioners will recognise PRODUCT.md as a formalisation of the system metaphor: a shared, high-level description of how the system works that every team member uses to navigate and reason about the codebase. XP teams that maintained a strong system metaphor produced more consistent code, held better design discussions, and onboarded new members faster. Teams that skipped it found that architectural consistency degraded over time as each developer maintained their own private model of what the system was.

The DevOps movement formalised the same insight as "documentation as code": documentation lives in the repository, is versioned alongside the code, and is updated as part of the development workflow. The principle behind practices like `terraform` infrastructure-as-code and OpenAPI specification-driven development is that the document that describes the system and the system itself are the same artefact, maintained together. Product documentation for agents is the same idea applied to the product and architecture layer.

Teams that resisted these practices then — because maintaining them "took too long" — encounter them now as a prerequisite. An agent working without a system metaphor and without architecture decision records does not produce the architectural consistency that XP's system metaphor provided. It produces coherent local decisions and incoherent global structure.

---

## Enterprise Considerations

**Documentation governance at scale.** In a multi-repo enterprise environment, product documentation practices must be consistent enough for governance purposes but flexible enough to accommodate genuinely different systems. Establish a documentation baseline — a corporate-level template for PRODUCT.md, product-details.md, and technical-details.md — owned by the enterprise architecture or platform team. All repositories use this template as a starting point. Project teams extend it; they do not replace it.

**Who owns the documentation.** In a team context, documentation ownership is clear: the team that owns the code owns the docs. In an enterprise context with shared repositories, overlapping ownership, and compliance requirements, this must be made explicit. The rules file should name the documentation owner and the review process for doc changes that affect the system's stated non-negotiables or security model.

**Compliance and audit.** In regulated industries, product documentation serves as evidence of what the team knew and intended. PRODUCT.md's non-negotiables section, if maintained accurately, is evidence that the team understood the system's compliance requirements. ADRs that document decisions about data handling, security controls, and architectural boundaries are audit artefacts. These documents belong in your source control history, not in a separate document management system where they can be separated from the code they describe.

**Stale documentation risk.** A documentation layer that is wrong is worse than no documentation layer at all. An agent with no docs reconstructs from code. An agent with inaccurate docs builds on false premises. The auto-update pattern addresses this — but only if the rules file is enforced and PR reviewers check documentation accuracy, not just presence. Consider adding a documentation accuracy check to your code review checklist: "Does the documentation accurately reflect the change in this PR?"

**Multi-agent consistency.** When multiple agents work on the same repository — common in large teams with multiple concurrent workstreams — they all read the same documentation. This is a strength: shared context produces consistent decisions. It is also a risk: if two agents update the same document sections concurrently, merge conflicts degrade the documentation quality. Manage this by treating documentation sections as areas of temporary ownership during a workstream, similar to how teams manage database schema migrations.

---

## Lab Exercise

**Time:** 40 minutes

**Goal:** Create the documentation layer for a real repository — your own codebase, a representative project, or the sample repository provided.

1. **Write a rules file** (10 min) — Write a `CLAUDE.md` for your repository with three required sections: (a) context loading instructions (which docs to read before any task), (b) documentation update requirements (when and what to update in the same PR), and (c) ADR review instructions (when to check ADRs before proposing a change). Swap with a neighbour — does their rules file make the documentation requirements unambiguous?

2. **Generate a PRODUCT.md** (12 min) — Either write one for a system you know well, or run the following prompt on your codebase and review the output:
   > *"Read this repository and produce a draft PRODUCT.md. Include: what the system does, who uses it, three things it must never do, and the current state of development. Note your confidence level for each claim."*
   Review the output and mark what is correct, what needs revision, and what is missing.

3. **Identify your top three ADRs** (10 min) — List the three architectural decisions in your system that an agent would be most likely to reverse or violate without knowing they had been made. For each: what is the decision, why was it made, and what would a well-intentioned agent do wrong without knowing it?

4. **Write a README update prompt** (8 min) — Write the exact prompt you would give an agent to generate an accurate README from your existing documentation layer. Be specific: which files should the agent read? What sections should the README contain? What must the agent verify before writing it?

---

## Facilitator Notes

The rules file exercise (step 1) is where most teams encounter their first surprise: they discover they have not agreed on which product documents exist, where they live, or when they should be updated. The exercise forces that agreement before the documentation is written, which is the right order.

The PRODUCT.md generation exercise consistently surfaces the "non-negotiables" section as the hardest to write. Teams often discover they have implicit agreement that the product must never do certain things, but have never written it down. Ask participants: how would an agent know this constraint exists if it is not in PRODUCT.md?

The ADR identification exercise (step 3) is the highest-value exercise in this module. Most teams with existing codebases have five to twenty architectural decisions that significantly constrain future development but are not documented anywhere. The exercise names them. Even if participants do not write the ADRs during the session, the list is valuable: it is a backlog of documentation debt to address over the following sprints.

For the final exercise: the quality of the README prompt reveals how clearly participants understand their own codebase. A good prompt is specific about sources, structure, and verification steps. A vague prompt produces a vague README. This is the same dynamic as acceptance criteria in Module 03 — the quality of the specification determines the quality of the output.

---

## Further Reading

- Anthropic: CLAUDE.md and agent memory — https://docs.anthropic.com/en/docs/claude-code/memory
- Michael Nygard: "Documenting Architecture Decisions" (original ADR format) — https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions
- Kent Beck: Extreme Programming Explained — Chapter on System Metaphor
- DevOps Research and Assessment (DORA): Technical documentation as a predictor of delivery performance
- Dex Horthy: 12-Factor Agents — Factor 4 (own your context window) — AI Engineer Summit 2024
