# Module 01 — Chat vs. Agents: The Autonomy Spectrum

## Learning Objectives

- Articulate the difference between a chat interface and an agentic system
- Map use cases to the correct point on the autonomy spectrum
- Identify when *not* to use an agent

---

## Background

The word "agent" is overloaded. Marketing uses it for any LLM interaction. Engineering needs a precise definition. Let's build one from first principles.

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

Examples: Claude with web search, ChatGPT with Code Interpreter.

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

### 5. When NOT to Use an Agent

Agents introduce complexity, latency, and cost. Use the simplest solution that works:

| Use case | Recommended approach |
|----------|---------------------|
| Single-turn Q&A | Chat |
| Code suggestion | Augmented chat (Copilot) |
| Draft → review → send | Supervised agent |
| Automated refactoring across a codebase | Supervised agent with PR review gate |
| Fully autonomous production deployment | ❌ Do not do this without mature evals + rollback |

---

## Enterprise Considerations

**Audit trails.** Every agent action must be logged with: timestamp, tool called, input, output, model version, prompt hash. This is non-negotiable for regulated industries.

**Human escalation paths.** Define explicitly: under what conditions does the agent pause and request human input? This should be in your spec before you write any code.

**Blast radius.** Before deploying an agent, ask: if it goes wrong at 3x the intended scope, what is the worst-case outcome? Design accordingly.

---

## Exercise

Map the following use cases to the autonomy spectrum and justify your placement:

1. A developer uses Claude to write a unit test for a function they've selected
2. A nightly job that reads Jira, identifies stale tickets, and posts a Slack summary
3. A system that monitors production alerts, diagnoses root cause, and rolls back a deployment
4. An agent that reviews PRs, runs tests, and merges if green

For each: what governance controls would you require?

---

## Facilitator Notes

Discussion prompt: *"Where on this spectrum is your team operating today? Where do you want to be in 12 months?"*

Lab: Have participants draw the loop diagram for a tool they actually use (Copilot, Claude, an internal tool). Identify: where is the human? What actions can the model take? What can't it do?

---

## Further Reading

- Anthropic: [Building Effective Agents](https://www.anthropic.com/engineering/building-effective-agents)
- Anthropic: Agent Design Patterns (see Module 02)

