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

| Module | Title | Slide Deck | Duration |
|--------|-------|-----------|----------|
| 00 | [Programme Overview & Prerequisites](modules/00-overview.md) | — | 30 min |
| 01 | [Chat vs. Agents — The Autonomy Spectrum](modules/01-chat-vs-agents.md) | [Module_01_Chat_vs_Agents_v2.pptx](slides/Module_01_Chat_vs_Agents_v2.pptx) | 1 hr |
| 02 | [Core Agentic Concepts & Terminology](modules/02-core-concepts.md) | [Module_02_Core_Concepts.pptx](slides/Module_02_Core_Concepts.pptx) | 1.5 hr |
| 03 | [Context Engineering](modules/03-context-engineering.md) | [Module_03_Context_Engineering.pptx](slides/Module_03_Context_Engineering.pptx) | 2 hr |
| 04 | [Spec-Driven Development & PRDs](modules/04-prd-and-sdd.md) | [Module_04_SDD_PRDs.pptx](slides/Module_04_SDD_PRDs.pptx) | 2 hr |
| 05 | [Automated Testing, TDD & CI/CD](modules/05-review-cycles.md) | [Module_05_Testing_CICD.pptx](slides/Module_05_Testing_CICD.pptx) | 1.5 hr |
| 06 | [Review Cycles, Hygiene & CI](modules/06-observability-reliability-security.md) | [Module_06_Review_Hygiene.pptx](slides/Module_06_Review_Hygiene.pptx) | 1 hr |
| 07 | [Observability](modules/07-finops.md) | [Module_07_Observability.pptx](slides/Module_07_Observability.pptx) | 1.5 hr |
| 08 | [Reliability & Security Engineering](modules/08-design-reviews.md) | [Module_08_Security.pptx](slides/Module_08_Security.pptx) | 2 hr |
| 09 | [FinOps for Agentic Systems](modules/09-finops.md) | [Module_09_FinOps.pptx](slides/Module_09_FinOps.pptx) | 1.5 hr |
| 10 | [Design Reviews](modules/10-design-reviews.md) | [Module_10_Design_Reviews.pptx](slides/Module_10_Design_Reviews.pptx) | 1 hr |
| 11 | [Product-First Engineering](modules/11-product-first-engineering.md) | [Module_11_Product_First.pptx](slides/Module_11_Product_First.pptx) | 1.5 hr |
| 12 | [The Three-Person Product Team](modules/12-three-person-team.md) | [Module_12_Three_Person_Team.pptx](slides/Module_12_Three_Person_Team.pptx) | 1 hr |

**Total:** ~18 hours of structured content + labs

---

## Repository Structure

```
agentic-dev-training/
├── README.md                   ← You are here
├── CLAUDE.md                   ← Build system instructions for Claude Code
├── modules/                    ← One markdown file per module (00–12)
├── slides/                     ← Generated .pptx decks (01–12)
└── build/                      ← Node.js build scripts (pptxgenjs)
    ├── shared.js               ← Shared palette, icons, shadow factory
    ├── build-all.js            ← Rebuild all modules at once
    └── module01.js … module12.js
```

---

## How to Use This Programme

1. **Self-paced learners** — work through modules 00–12 in order. Each module is self-contained with concepts, examples, and exercises.
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

