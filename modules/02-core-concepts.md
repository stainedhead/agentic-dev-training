# Module 02 — Core Agentic Concepts & Terminology

## Learning Objectives

- Define the core vocabulary of agentic systems precisely
- Distinguish between orchestrators, subagents, tools, and memory types
- Understand multi-agent patterns and when each applies

---

## Core Vocabulary

### Agent
A system that uses an LLM to perceive inputs, reason about them, and take actions — potentially across multiple steps — in pursuit of a goal.

### Tool
A function the agent can call to interact with the world outside its context window. Tools are the agent's hands.

Common tool categories:
- **Read tools** — file read, database query, API GET, web search
- **Write tools** — file write, API POST/PUT/DELETE, code execution
- **Communication tools** — send email, post Slack message, create Jira ticket
- **Agent tools** — spawn a subagent, call another agent's API

> **Enterprise rule:** Segregate read and write tools explicitly. Never give an agent write access to a system it doesn't need to write to.

### Memory

Agents need memory to operate across steps. There are four types:

| Type | What it is | Example |
|------|-----------|---------|
| **In-context** | Text in the current context window | The conversation so far |
| **External (key-value)** | Database or file the agent can read/write | Task state stored in Redis |
| **Semantic** | Vector database for similarity search | Codebase embeddings |
| **Episodic** | Log of past agent runs | Audit log of previous executions |

In-context memory is the most immediate but finite (limited by context window size). Well-designed agents externalise state that needs to outlive a single run.

### Orchestrator
The "manager" agent. Receives the top-level goal, breaks it into subtasks, dispatches them to subagents or tools, and assembles the final result.

### Subagent
An agent that receives a specific subtask from an orchestrator and executes it. May itself orchestrate further subagents. This composes into a **multi-agent hierarchy**.

### Context Window
The total amount of text (tokens) the model can "see" at once. Everything outside the window is invisible unless explicitly retrieved. This is the most important architectural constraint in agentic systems.

### Prompt / System Prompt
- **System prompt** — instructions set by the developer that define the agent's role, constraints, and available tools. The agent cannot see the user's conversation until after the system prompt.
- **User prompt** — the input from the human (or orchestrating agent) for this turn.

### Eval (Evaluation)
A test that assesses agent behaviour. Unlike unit tests (which check deterministic code), evals check probabilistic outputs. Good evals include: factual correctness, tool call accuracy, refusal behaviour, latency, and cost per task.

### Compaction / Context Compression
Summarising or truncating older context to make room for new information. Essential for long-running agents. Must be designed carefully — compacting the wrong information causes agents to "forget" critical state.

---

## Multi-Agent Patterns

### Pattern 1: Sequential Pipeline

```
Orchestrator → Agent A → Agent B → Agent C → Result
```

Each agent's output is the next agent's input. Simple, debuggable. Use when tasks have clear sequential dependencies.

### Pattern 2: Parallel Fan-Out

```
              ┌→ Agent A ─┐
Orchestrator ─┼→ Agent B ─┼→ Aggregator → Result
              └→ Agent C ─┘
```

Parallelise independent subtasks. Dramatically reduces wall-clock time for research or analysis tasks. Use when subtasks are independent.

### Pattern 3: Evaluator-Optimizer Loop

```
Generator Agent → Output → Evaluator Agent → Score
                    ↑                            |
                    └──── (if score < threshold) ┘
```

An evaluator agent scores the generator's output and feeds back a critique. The generator revises. Repeat until quality threshold is met. Spotify and Anthropic both use this pattern for code review automation.

### Pattern 4: Specialist Routing

```
Router Agent → classifies intent → dispatches to specialist agent
```

A lightweight routing agent examines the request and delegates to the right specialist (e.g., security agent, data agent, documentation agent).

---

## Enterprise Considerations

**Trust boundaries between agents.** An orchestrator should not have more permissions than it needs to delegate. Subagents should be scoped to their task — a documentation subagent should not have write access to production databases.

**Tracing across agents.** Each agent invocation must carry a shared `trace_id` so you can reconstruct the full execution graph in your observability platform. Without this, debugging multi-agent failures is nearly impossible.

**Version pinning.** Pin model versions in production agents. A model upgrade mid-task can change behaviour in ways that break downstream agents.

---

## Exercise

Design the agent architecture for the following scenario:

> *"We want an agentic system that, every morning, scans our GitHub repos for PRs open more than 5 days, checks if CI is passing, summarises the PR description and review status, and posts a digest to the #engineering Slack channel."*

1. Draw the agent graph (orchestrator + subagents + tools)
2. List every tool required and classify it (read/write/communication)
3. Identify what memory type each agent needs
4. Identify the trust boundary — what permissions should each agent have?

---

## Facilitator Notes

This module benefits from a whiteboard session. Have teams draw their agent architecture for the exercise before revealing a reference solution.

Common misconceptions to address:
- "The orchestrator is the smartest agent" — not necessarily. Often the orchestrator is simple routing logic.
- "More agents = more powerful" — usually the opposite. Simpler agent graphs are cheaper, faster, and easier to debug.

---

## Further Reading

- Anthropic: [Multi-Agent Architectures](https://www.anthropic.com/engineering/building-effective-agents)
- Anthropic Model Context Protocol (MCP) specification

