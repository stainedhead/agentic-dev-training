# Module 00 — Programme Overview & Prerequisites

## Learning Objectives

By the end of this module you will be able to:
- Explain why agentic AI development requires a different engineering mindset than traditional software
- Identify which prerequisites apply to your role
- Navigate the full programme and know where to find reference material

---

## Why Agentic Development Is Different

Traditional software is **deterministic by design**. You write logic, it executes, you get a predictable output. LLM-based systems introduce a new contract: you provide *intent* (via prompts and context), and the model produces *behaviour*. When that model is also given *tools* — the ability to read files, call APIs, run code, dispatch sub-tasks — you have an **agent**: a system that can take sequences of actions to accomplish goals, with a degree of autonomy that has no analogue in conventional enterprise software.

This shift has deep consequences:

| Traditional Software | Agentic Systems |
|----------------------|-----------------|
| Deterministic execution | Probabilistic behaviour |
| Bugs found by unit tests | Failures found by evals and trace review |
| Versioned code | Versioned prompts + versioned models |
| Single-threaded logic | Multi-agent orchestration |
| Static dependencies | Dynamic tool use |
| Cost is compute + storage | Cost is tokens + compute + latency |

Enterprise developers who are excellent at the left column need deliberate practice to become effective at the right column. That is exactly what this programme provides.

---

## Prerequisites

### All participants
- Basic familiarity with at least one LLM interface (Claude, ChatGPT, Copilot)
- Ability to read and write Python or TypeScript
- Git and basic CI/CD concepts

### Recommended (not required)
- REST API experience
- Familiarity with your organisation's cloud platform (AWS/Azure/GCP)
- Prior exposure to prompt engineering

---

## Programme Philosophy

**Concepts before tools.** We start with the *why* and the mental models before touching any SDK or product. Tools change; concepts compound.

**Show, don't tell.** Every module contains working examples drawn from real engineering practice at Anthropic, Spotify, and others.

**Enterprise-first.** Every pattern is evaluated through the lens of governance, compliance, audit, and scale. We are not a startup. Our defaults must be hardened.

**Continuous improvement.** This programme is itself a living document. Raise issues and PRs.

---

## Module Structure

Each module follows this structure:

```
# Module NN — Title

## Learning Objectives
## Background / Why This Matters
## Core Concepts (with examples)
## Enterprise Considerations
## Exercises / Labs
## Facilitator Notes
## Further Reading
```

---

## Getting Started

Move on to [Module 01 — Chat vs. Agents](01-chat-vs-agents.md).

