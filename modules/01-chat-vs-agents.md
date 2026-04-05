# Module 01 — Chat vs. Agents: The Autonomy Spectrum

## Learning Objectives

- Articulate the difference between a chat interface and an agentic system
- Map use cases to the correct point on the autonomy spectrum
- Identify when *not* to use an agent
- Understand the scope of this program: coding agents, not production agents
- Map coding agent value across every phase of the SDLC — not just code generation

---

## Program Scope — What Kind of Agent Are We Talking About?

Before building a mental model, we need to establish scope. The word "agent" covers two very different things in enterprise practice, and conflating them causes confusion throughout the SDLC.

### Coding Agents — Our Focus

**Coding agents** are AI systems that assist developers during software development. They operate inside the development environment and act on behalf of the developer — reading and writing code, running tests, searching documentation, and raising PRs.

The tools we use in this practice:

| Tool | What it does |
|------|-------------|
| **Claude Code** | Anthropic's CLI agent. Operates in your terminal with full filesystem and shell access. Reads your codebase, writes code, runs tests, commits and pushes — all in response to natural-language instructions. |
| **GitHub Copilot** | Microsoft/GitHub's coding assistant. Integrated into the IDE. Primarily augmented chat (inline suggestions, Copilot Chat), with agentic capabilities in Copilot Workspace. |

Both tools sit at the **supervised agent** point on the autonomy spectrum — they can take multi-step actions, but a developer remains in the loop to review and approve. This is the right default for enterprise codebases.

### Production Agents — Out of Scope for This Program

**Production agents** are AI systems that operate as runtime components of your product or platform — customer-facing bots, autonomous workflow automations, orchestration services. Examples include agents built on AWS Bedrock / Amazon Agent Core, Azure AI Foundry, or custom orchestration frameworks.

Production agents have fundamentally different concerns: runtime reliability, cost at scale, customer data handling, regulatory compliance, and blast radius in live environments.

> This program does **not** cover production agent architecture. If your team is building agents that run in production pipelines, refer to the Enterprise AI Platform practice for guidance on AWS Bedrock, Agent Core, and agentic service design.

### Why the Distinction Matters

The SDLC practices in this program — context engineering, spec-driven development, CI/CD hygiene, observability of the development loop — are all oriented around **how developers work with coding agents day-to-day**. These practices apply whether you are eventually deploying a traditional application or a production agent. The coding agent is always the development tool; the production agent is sometimes the thing being built.

---

## Coding Agents Across the Full SDLC

The most common misconception about coding agents is that they are code generators. They are not — or rather, they are that and much more. A coding agent is useful at **every phase of the software development lifecycle**: from the first conversation about a problem, through design, implementation, review, documentation, and ongoing education of the team.

Understanding this full scope changes how you think about where to invest in agentic practice. The gains in a well-run agentic team do not come only from faster code — they come from faster, better decisions at every stage.

| SDLC Phase | Coding Agent Role | Example with Claude Code / Copilot |
|------------|------------------|------------------------------------|
| **Ideation & Planning** | Research options, compare approaches, assess feasibility against the existing codebase | *"Here are three ways to implement distributed locking in our stack. Which has the least impact on the existing SessionService?"* |
| **PRD & Requirements** | Draft requirements, surface gaps, flag conflicts with existing systems, enforce completeness | *"Review this rough PRD. What edge cases are missing? What conflicts with the current UserService contract?"* |
| **Design & Architecture** | Review a proposed design against the codebase, find violations, suggest improvements, validate constraints | *"I'm planning to add a caching layer here. Read the existing data flow and tell me where this design breaks down."* |
| **Specification** | Generate SPEC.md, PLAN.md, TASKS.md, architecture docs, and schema docs from an approved PRD | *"Generate a full spec suite from this PRD. Include the data model changes and API contract."* |
| **Implementation** | Write code, fix failing tests, refactor, execute tasks from TASKS.md | *"Implement task 3 from TASKS.md. Write tests first. Open a PR when all tests pass."* |
| **Code Review** | Review PRs against the spec, coding standards, security checklist, and test coverage requirements | *"Review this PR against the spec in SPEC.md. Flag any requirement that is not satisfied."* |
| **Design Review** | Read a design proposal and the affected codebase together, find issues a human might miss | *"Review this architecture proposal. What does it break in the current system? What isn't specified?"* |
| **Documentation Review** | Check that docs are accurate, current, and complete relative to the code | *"Compare the API docs to the current implementation. What is out of date or missing?"* |
| **Documentation Updates** | Rewrite or extend docs after code changes, keeping them in sync automatically | *"The PaymentService was refactored last sprint. Update the architecture doc and API reference to match."* |
| **Education & Onboarding** | Explain the codebase, design decisions, and processes to team members — at any depth | *"Explain how our authentication flow works to a developer who is new to the team."* |
| **Operations & Hygiene** | Dependency updates, security scans, coverage analysis, refactoring, technical debt reduction | Nightly scheduled Claude Code run: scan dependencies, open low-risk update PRs, flag high-risk for human review |

### The Implication for Your Practice

Most teams start by using coding agents for implementation only — generating functions, writing tests. That is the smallest return on the investment.

The highest-value applications are often at the **beginning** of the lifecycle (ideation, design review, PRD quality) and at the **edges** (documentation accuracy, team education, ongoing hygiene). These are the phases where quality problems are cheapest to fix and where human time is most often wasted on work an agent could do better.

A mature agentic practice covers all rows of the table above. The modules in this program are organized to build toward that coverage, one phase at a time.

---

## Background

The word "agent" is overloaded. Marketing uses it for any LLM interaction. Engineering needs a precise definition. Let's build one from first principles, in the context of coding agents.

---

## Core Concepts

### 1. The Basic Chat Loop

A chat system is a **request-response** loop:

```
User → [Prompt] → LLM → [Response] → User
```

The model has no memory beyond the current context window. It cannot take actions in the world. It cannot call your internal APIs. It is a very sophisticated autocomplete engine.

This is useful for:
- Drafting, summarisation, explanation
- Code generation (suggest → human applies)
- Q&A over provided documents

The human remains **fully in the loop** for every action.

### 2. Augmented Chat (Tool Use)

Add tools and you get augmented chat:

```
User → [Prompt] → LLM → [Decides to call tool] → Tool executes → Result fed back → LLM → [Response] → User
```

The model can now *act* — search the web, query a database, read a file. But the loop is still single-turn. The human still initiates every exchange.

**Coding agent examples:** GitHub Copilot Chat (ask a question, it searches your codebase and answers), Claude in a chat window reading a specific file you paste in.

### 3. Agents

An agent adds **autonomous multi-step reasoning**:

```
Goal → Agent plans → Agent executes step 1 → Observes result →
Agent re-plans → Agent executes step 2 → ... → Goal achieved (or fails)
```

Key properties of a true agent:
- **Persistence** — maintains state across steps
- **Tool use** — can take actions in the world
- **Autonomy** — decides its own next step
- **Goal orientation** — works toward a defined outcome, not just a single response

**Claude Code in agent mode** is the canonical coding agent example in this program. Given a task like "add an endpoint for user profile updates, write the tests, and open a PR", Claude Code will: read relevant files, plan the implementation, write the code, run the tests, fix failures autonomously, and raise a PR — all without prompting at each step. The developer reviews the PR.

### 4. The Autonomy Spectrum

```
────────────────────────────────────────────────────────────────────
 CHAT          AUGMENTED       SUPERVISED        AUTONOMOUS
                 CHAT            AGENT             AGENT
────────────────────────────────────────────────────────────────────
 No tools      Tools, but       Agent acts,       Agent acts,
 No memory     human-initiated  human approves    no human
                                at checkpoints    in loop
────────────────────────────────────────────────────────────────────
 Risk: Low     Risk: Low-Med    Risk: Med         Risk: High
```

**Enterprise default: Supervised Agent.** Full autonomy is appropriate only for low-stakes, reversible actions in sandboxed environments. For anything touching production data, financial systems, or customer-facing behavior, require human approval at meaningful checkpoints.

### 5. Choosing the Right Mode

Coding agents operate at different points on the spectrum depending on the task. Use the simplest mode that works — augmented chat for targeted questions, supervised agent for multi-step work.

| Task | Recommended mode | Tool |
|------|-----------------|------|
| Look up a syntax question | None — use search / docs | — |
| Explain a specific function or decision | Augmented chat | Copilot Chat / Claude chat |
| Inline code completion | Augmented chat | GitHub Copilot inline |
| Explore a design option or ideation | Augmented chat | Claude chat with codebase context |
| Review a PRD for gaps | Supervised agent | Claude Code |
| Review a design proposal against the codebase | Supervised agent | Claude Code |
| Review a PR against a spec | Supervised agent | Claude Code |
| Review docs for accuracy against code | Supervised agent | Claude Code |
| Write a new feature end-to-end | Supervised agent | Claude Code |
| Large-scale automated refactoring | Supervised agent with PR gate | Claude Code |
| Onboard a developer to a codebase | Augmented chat | Claude Code / Copilot Chat |
| Nightly hygiene (deps, coverage, lint) | Supervised agent with review gate | Claude Code scheduled |
| Fully autonomous merge without review | ❌ Do not do this | — |

---

## Enterprise Considerations

**Audit trails.** Every agent action must be logged with: timestamp, tool called, input, output, model version, prompt hash. This is non-negotiable for regulated industries.

**Human escalation paths.** Define explicitly: under what conditions does the agent pause and request human input? This should be in your spec before you write any code.

**Blast radius.** Before deploying an agent, ask: if it goes wrong at 3x the intended scope, what is the worst-case outcome? Design accordingly.

---

## Exercise

**Part 1 — Map to the spectrum.** For each scenario below, identify: where on the autonomy spectrum does it sit? Which tool fits best? Where is the human?

1. A developer asks Copilot Chat to explain why the AuthService uses a refresh token pattern
2. A developer asks Claude Code to review the proposed database schema in a Jira ticket against the existing data model and flag any issues
3. A developer runs `claude "implement task 4 from TASKS.md, write tests, open a PR"` in their terminal
4. Claude Code is triggered nightly to scan for dependency vulnerabilities and open PRs for Tier-1 updates
5. Claude Code is asked to onboard a new team member by walking them through the payment flow — what files to read, why the design is structured as it is, and what the main constraints are

**Part 2 — Map your own team.** Look at the SDLC phase table in this module. For each row:
- Is your team currently using a coding agent for this? (Yes / No / Partially)
- If no: what would it take to start? What is the main obstacle?
- If yes: is it supervised or more autonomous? What is the human gate?

Share your map with a peer. Where are the biggest gaps? Where is the highest-value opportunity?

---

## Facilitator Notes

Open with the scope clarification — draw the two-column distinction (Coding Agent vs. Production Agent) on a whiteboard before any slides. Teams who have already been building production agents on Bedrock will try to map those experiences onto the program; anchor them back to the SDLC context immediately.

Discussion prompt: *"Where on this spectrum is your team operating today with Claude Code or Copilot? Where do you want to be in 12 months?"*

Lab: Have participants draw the loop diagram for Claude Code or Copilot as they currently use it. Identify: where is the human? What actions can the tool take? What can't it do? What would need to change to move one step further along the spectrum?

---

## Further Reading

- Anthropic: [Building Effective Agents](https://www.anthropic.com/engineering/building-effective-agents)
- Anthropic: Agent Design Patterns (see Module 02)

