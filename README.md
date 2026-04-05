# Enterprise Agentic Development Training Programme

> **Audience:** Enterprise developers at a Fortune 100 organisation  
> **Maintained by:** Lead Enterprise Architect, Technology & Design Practice  
> **Last updated:** April 2026

---

## Overview

This programme equips enterprise developers with the concepts, patterns, and practices required to build, deploy, and operate **agentic AI systems** in production. It spans the full lifecycle — from understanding what an agent actually is, through context engineering, spec-driven development, and all the way to observability, FinOps, and security.

The curriculum is grounded in real-world practice at leading engineering organisations (Anthropic, Spotify, GitHub) and adapted for the governance, compliance, and scale requirements of a large enterprise.

---

## Curriculum Map

| Module | Title | Duration |
|--------|-------|----------|
| 00 | [Programme Overview & Prerequisites](modules/00-overview.md) | 30 min |
| 01 | [Chat vs. Agents — The Autonomy Spectrum](modules/01-chat-vs-agents.md) | 1 hr |
| 02 | [Core Agentic Concepts & Terminology](modules/02-core-concepts.md) | 1.5 hr |
| 03 | [Context Engineering](modules/03-context-engineering.md) | 2 hr |
| 04 | [Product Requirements Docs & Spec-Driven Development](modules/04-prd-and-sdd.md) | 2 hr |
| 05 | [Review Cycles — Human-in-the-Loop & Agent-to-Agent](modules/05-review-cycles.md) | 1 hr |
| 06 | [Observability, Reliability & Security Engineering](modules/06-observability-reliability-security.md) | 2 hr |
| 07 | [FinOps for Agentic Systems](modules/07-finops.md) | 1.5 hr |
| 08 | [Design Reviews for Agentic Systems](modules/08-design-reviews.md) | 1 hr |

**Total:** ~12.5 hours of structured content + labs

---

## Repository Structure

```
agentic-dev-training/
├── README.md                   ← You are here
├── modules/                    ← One markdown file per module
│   ├── 00-overview.md
│   ├── 01-chat-vs-agents.md
│   ├── 02-core-concepts.md
│   ├── 03-context-engineering.md
│   ├── 04-prd-and-sdd.md
│   ├── 05-review-cycles.md
│   ├── 06-observability-reliability-security.md
│   ├── 07-finops.md
│   └── 08-design-reviews.md
├── templates/                  ← Reusable starter files
│   ├── CLAUDE.md.template
│   ├── prd-template.md
│   ├── spec-template.md
│   ├── definition-of-done.md
│   └── agentic-design-review.md
└── resources/
    └── reading-list.md
```

---

## How to Use This Programme

1. **Self-paced learners** — work through modules 00–08 in order. Each module is self-contained with concepts, examples, and exercises.
2. **Workshop facilitators** — each module includes a *facilitator notes* section with discussion prompts and lab activities.
3. **Reference use** — the `templates/` directory contains production-ready starter files you can copy directly into your projects.

---

## Key External References

- [Anthropic Engineering Blog](https://www.anthropic.com/engineering)
- [Spotify Engineering Blog](https://engineering.atspotify.com/)
- [GitHub Copilot Workspace Docs](https://githubnext.com/projects/copilot-workspace)
- [FinOps Foundation](https://www.finops.org/)
- [OWASP LLM Top 10](https://owasp.org/www-project-top-10-for-large-language-model-applications/)

---

## Contributing

Raise a PR with your proposed changes. All modules follow the standard structure defined in `modules/00-overview.md`. New modules require a design review entry in `templates/agentic-design-review.md`.

