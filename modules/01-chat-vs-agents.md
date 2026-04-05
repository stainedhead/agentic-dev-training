# Module 01 — Chat vs. Agents: The Autonomy Spectrum

## Learning Objectives

- Articulate the difference between a chat interface and an agentic system
- Map use cases to the correct point on the autonomy spectrum
- Identify when *not* to use an agent
- Understand the scope of this programme: coding agents, not production agents

---

## Programme Scope — What Kind of Agent Are We Talking About?

Before building a mental model, we need to establish scope. The word "agent" covers two very different things in enterprise practice, and conflating them causes confusion throughout the SDLC.

### Coding Agents — Our Focus

**Coding agents** are AI systems that assist developers during software development. They operate inside the development environment and act on behalf of the developer — reading and writing code, running tests, searching documentation, and raising PRs.

The tools we use in this practice:

| Tool | What it does |
|------|-------------|
| **Claude Code** | Anthropic's CLI agent. Operates in your terminal with full filesystem and shell access. Reads your codebase, writes code, runs tests, commits and pushes — all in response to natural-language instructions. |
| **GitHub Copilot** | Microsoft/GitHub's coding assistant. Integrated into the IDE. Primarily augmented chat (inline suggestions, Copilot Chat), with agentic capabilities in Copilot Workspace. |

Both tools sit at the **supervised agent** point on the autonomy spectrum — they can take multi-step actions, but a developer remains in the loop to review and approve. This is the right default for enterprise codebases.

### Production Agents — Out of Scope for This Programme

**Production agents** are AI systems that operate as runtime components of your product or platform — customer-facing bots, autonomous workflow automations, orchestration services. Examples include agents built on AWS Bedrock / Amazon Agent Core, Azure AI Foundry, or custom orchestration frameworks.

Production agents have fundamentally different concerns: runtime reliability, cost at scale, customer data handling, regulatory compliance, and blast radius in live environments.

> This programme does **not** cover production agent architecture. If your team is building agents that run in production pipelines, refer to the Enterprise AI Platform practice for guidance on AWS Bedrock, Agent Core, and agentic service design.

### Why the Distinction Matters

The SDLC practices in this programme — context engineering, spec-driven development, CI/CD hygiene, observability of the development loop — are all oriented around **how developers work with coding agents day-to-day**. These practices apply whether you are eventually deploying a traditional application or a production agent. The coding agent is always the development tool; the production agent is sometimes the thing being built.

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

**Claude Code in agent mode** is the canonical coding agent example in this programme. Given a task like "add an endpoint for user profile updates, write the tests, and open a PR", Claude Code will: read relevant files, plan the implementation, write the code, run the tests, fix failures autonomously, and raise a PR — all without prompting at each step. The developer reviews the PR.

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

**Enterprise default: Supervised Agent.** Full autonomy is appropriate only for low-stakes, reversible actions in sandboxed environments. For anything touching production data, financial systems, or customer-facing behaviour, require human approval at meaningful checkpoints.

### 5. When NOT to Use a Coding Agent

Coding agents introduce overhead — model latency, context loading, potential for unexpected changes. Use the simplest tool that works:

| Developer task | Recommended approach |
|----------------|---------------------|
| Look up a syntax question | Search / docs — no agent needed |
| Inline code completion | GitHub Copilot inline (augmented chat) |
| Explain a specific function | Copilot Chat or Claude chat |
| Write a new feature end-to-end | Claude Code in supervised agent mode |
| Large-scale automated refactoring | Claude Code with PR review gate — never merge without human review |
| Fully autonomous deployment without review | ❌ Do not do this — always require a human approval gate |

---

## Enterprise Considerations

**Audit trails.** Every agent action must be logged with: timestamp, tool called, input, output, model version, prompt hash. This is non-negotiable for regulated industries.

**Human escalation paths.** Define explicitly: under what conditions does the agent pause and request human input? This should be in your spec before you write any code.

**Blast radius.** Before deploying an agent, ask: if it goes wrong at 3x the intended scope, what is the worst-case outcome? Design accordingly.

---

## Exercise

Map the following coding agent use cases to the autonomy spectrum and justify your placement:

1. A developer highlights a function in VS Code and asks Copilot Chat to "explain this"
2. A developer types a comment in their IDE and Copilot autocompletes the function body
3. A developer runs `claude "write unit tests for the UserService and open a PR"` in their terminal
4. A scheduled CI job invokes Claude Code to fix all failing lint errors overnight and push fixes directly to a branch
5. Claude Code is given a feature spec and told to implement, test, and merge without any human review

For each: which tool (Claude Code / Copilot) fits best? Where is the human? What governance controls would you require?

**Bonus:** For items 4 and 5 — what additional safeguards (branch protection rules, required reviewers, CI gates) would make these acceptable in your organisation?

---

## Facilitator Notes

Open with the scope clarification — draw the two-column distinction (Coding Agent vs. Production Agent) on a whiteboard before any slides. Teams who have already been building production agents on Bedrock will try to map those experiences onto the programme; anchor them back to the SDLC context immediately.

Discussion prompt: *"Where on this spectrum is your team operating today with Claude Code or Copilot? Where do you want to be in 12 months?"*

Lab: Have participants draw the loop diagram for Claude Code or Copilot as they currently use it. Identify: where is the human? What actions can the tool take? What can't it do? What would need to change to move one step further along the spectrum?

---

## Further Reading

- Anthropic: [Building Effective Agents](https://www.anthropic.com/engineering/building-effective-agents)
- Anthropic: Agent Design Patterns (see Module 02)

