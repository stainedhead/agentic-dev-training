# Module 03 — Context Engineering

## Learning Objectives

- Define context engineering and explain why it supersedes "prompt engineering"
- Build a `CLAUDE.md` / rules file that meaningfully improves agent behavior
- Apply just-in-time context loading, compaction strategies, and CI/CD hygiene for context files
- Understand the Definition of Done as a context artifact

---

## Background

"Prompt engineering" implies tweaking a single string. **Context engineering** is the discipline of designing everything that goes into the model's context window at runtime — system prompts, rules files, product documentation, test results, code snippets, memory retrievals, tool outputs — to maximize the probability of correct, safe, and useful agent behavior.

Anthropic engineering teams have called this the most important skill for agentic development. It is engineering, not magic.

---

## Core Concepts

### 1. The Context Window as a Resource

The context window is finite, expensive, and the agent's entire world. Everything outside it is invisible. This means:

- **What you include matters** — irrelevant context increases cost and can confuse the model
- **What you exclude matters** — missing context causes hallucination and wrong decisions
- **Order matters** — models attend more strongly to the beginning and end of context

### 2. Layers of Context

A well-engineered context has distinct layers, assembled at runtime:

```
┌─────────────────────────────────────────────┐
│  SYSTEM PROMPT                              │  ← Role, constraints, tool definitions
├─────────────────────────────────────────────┤
│  RULES FILE (CLAUDE.md / .cursorrules)      │  ← Project-specific conventions
├─────────────────────────────────────────────┤
│  PRODUCT DOCUMENTATION                      │  ← PRD, spec, architecture docs (relevant sections)
├─────────────────────────────────────────────┤
│  TASK CONTEXT                               │  ← The specific task, inputs, constraints
├─────────────────────────────────────────────┤
│  RETRIEVED MEMORY                           │  ← Semantic search results, prior run state
├─────────────────────────────────────────────┤
│  CONVERSATION / TOOL RESULTS                │  ← What has happened so far this run
└─────────────────────────────────────────────┘
```

### 3. Rules Files (CLAUDE.md / .cursorrules)

A rules file is a markdown document that lives in your repository and tells the agent how to work within your project. Think of it as onboarding documentation written for an AI developer.

A good rules file covers:
- **Tech stack** — languages, frameworks, versions
- **Coding conventions** — naming, formatting, patterns to use/avoid
- **Architecture constraints** — what is off-limits, what layers exist
- **Testing requirements** — what constitutes a complete change
- **Definition of Done** — the checklist the agent must satisfy before considering a task complete
- **Security rules** — never log PII, never hard-code secrets, always validate inputs

See [`templates/CLAUDE.md.template`](../templates/CLAUDE.md.template) for a production-ready starter.

### 4. Definition of Done (DoD) as Context

The Definition of Done belongs in your rules file AND your CI pipeline. When the agent knows the DoD, it can self-evaluate before declaring a task complete. When CI enforces it, you catch cases where the agent bypassed it.

A minimal agentic DoD:
- [ ] All new code has unit tests
- [ ] Tests pass locally and in CI
- [ ] No new lint errors
- [ ] No secrets in code
- [ ] PR description updated with what changed and why
- [ ] Relevant documentation updated

### 5. Just-in-Time Context Loading

Do not dump your entire codebase into the context window. Retrieve only what is relevant to the current task:

- Use **semantic search** over your codebase to find relevant files
- Fetch **only the sections** of documentation relevant to the current task
- Load **recent test failures** rather than all test history
- Retrieve **task-adjacent** memory, not all memory

This is analogous to how a senior developer works — they don't read every file before making a change. They navigate to the relevant code, check recent context, and act.

### 6. Context Compaction

Long-running agents accumulate context. Compaction strategies:

| Strategy | When to use | Risk |
|----------|-------------|------|
| **Rolling summary** | Background conversation | Loses verbatim detail |
| **Task-segment summary** | Between discrete subtasks | Safe if subtasks are atomic |
| **Key-fact extraction** | For decisions/state | Requires good extraction prompt |
| **Full truncation** | Never in production | Catastrophic forgetting |

Always test compaction behavior with representative long-running tasks. Compaction bugs are subtle and often only surface in edge cases.

### 7. CI/CD for Context Files

Your `CLAUDE.md` and system prompts are code. Treat them as such:

- **Version control** — every change is reviewed via PR
- **Changelog** — note why each rule was added
- **Regression tests** — when you change a rule, run your eval suite to confirm no regressions
- **Staged rollout** — test prompt changes on a dev/staging agent before production

---

## Enterprise Considerations

**Centralised vs. project-level rules.** Maintain a corporate-level baseline `CLAUDE.md` (security rules, data handling, compliance requirements) that is inherited by all project-level files. Project files extend, not override, the baseline.

**Secrets in context.** Never put API keys, passwords, or PII in context files. Use environment variables and secret managers. The agent retrieves credentials at runtime via your secrets infrastructure, not from its context.

**Context audit.** For regulated workloads, log the full context sent to the model (redacted for PII). This is your audit trail for "what did the agent know when it made this decision?"

---

## Exercise

1. Take a real project you work on. Write a `CLAUDE.md` for it using the template in `templates/CLAUDE.md.template`.
2. Define a Definition of Done for one type of task (e.g., "add a new API endpoint").
3. Identify: what context would an agent need to complete that task? Map it to the six layers above.
4. Identify: what context would be harmful or irrelevant? How would you exclude it?

---

## Facilitator Notes

The most valuable exercise here is having participants actually write a `CLAUDE.md` for their own projects. The act of writing it forces clarity about conventions that are usually implicit.

Discussion: *"What is the most important thing a new developer needs to know about your codebase? Is it written down anywhere?"* Usually the answer is no — and that is exactly the gap a rules file fills.

---

## Further Reading

- Anthropic: [CLAUDE.md documentation](https://docs.anthropic.com/en/docs/claude-code/memory)
- Anthropic: Context window management best practices
- Simon Willison: On prompt injection and context poisoning

