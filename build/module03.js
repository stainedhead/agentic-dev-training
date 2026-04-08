const pptxgen = require("pptxgenjs");
const { C, shadow, icon } = require("./shared");
const {
  FaFileAlt, FaBook, FaClipboardList, FaCheckSquare,
  FaLayerGroup, FaSearch, FaExclamationTriangle, FaLightbulb,
  FaListAlt, FaCodeBranch, FaDatabase, FaCog
} = require("react-icons/fa");

async function build() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.title  = "Module 3: Context Engineering";
  pres.author = "Enterprise Architect Training Series";

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 1 — Title
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.navy };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.18, h: 5.625, fill: { color: C.accent } });
    s.addText("ENTERPRISE AGENTIC PRACTICES", { x: 0.4, y: 0.32, w: 9.2, h: 0.35, fontSize: 10, color: C.iceBlue, bold: true, charSpacing: 4, margin: 0 });

    s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 0.82, w: 1.5, h: 0.38, fill: { color: C.accent } });
    s.addText("MODULE 03", { x: 0.4, y: 0.82, w: 1.5, h: 0.38, fontSize: 11, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });

    s.addText("Context\nEngineering", { x: 0.4, y: 1.38, w: 7.5, h: 1.9, fontSize: 52, color: C.white, bold: true, margin: 0 });
    s.addText("The five documents that determine what your agent builds", { x: 0.4, y: 3.38, w: 7.2, h: 0.52, fontSize: 18, color: C.iceBlue, italic: true, margin: 0 });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 4.05, w: 3.5, h: 0.04, fill: { color: C.accent } });
    s.addText([
      { text: "Duration: ", options: { bold: true, color: C.muted } },
      { text: "75–90 min  ", options: { color: C.muted } },
      { text: "  |  ", options: { color: C.muted } },
      { text: "Level: ", options: { bold: true, color: C.muted } },
      { text: "Intermediate", options: { color: C.muted } }
    ], { x: 0.4, y: 4.25, w: 5, h: 0.38, fontSize: 13, margin: 0 });

    // Right visual — the five artifact stack
    s.addShape(pres.shapes.RECTANGLE, { x: 7.1, y: 0.55, w: 2.55, h: 4.8, fill: { color: C.mid, transparency: 25 }, shadow: shadow() });
    s.addText("THE FIVE\nCONTEXT\nARTIFACTS", { x: 7.1, y: 0.62, w: 2.55, h: 0.75, fontSize: 9, color: C.iceBlue, bold: true, charSpacing: 1, align: "center", margin: 0 });

    const layers = [
      { label: "Rules File",           sub: "Definition of Done", color: C.accent },
      { label: "Product Docs",         sub: "Summary · Details · Tech", color: C.teal },
      { label: "ADRs",                 sub: "Architecture Decisions", color: C.green },
      { label: "PRD",                  sub: "Requirements + Criteria", color: C.teal },
      { label: "Plan / Spec",          sub: "Implementation Blueprint", color: C.steel },
    ];
    let ly = 1.48;
    for (let i = 0; i < layers.length; i++) {
      const l = layers[i];
      s.addShape(pres.shapes.RECTANGLE, { x: 7.22, y: ly, w: 2.31, h: 0.68, fill: { color: l.color, transparency: 18 } });
      s.addText(l.label, { x: 7.22, y: ly + 0.04, w: 2.31, h: 0.3, fontSize: 9.5, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
      s.addText(l.sub, { x: 7.22, y: ly + 0.36, w: 2.31, h: 0.26, fontSize: 8, color: C.pale, align: "center", margin: 0 });
      ly += 0.72;
    }
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 2 — Learning Objectives
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.offWhite };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.82, fill: { color: C.navy } });
    s.addText("LEARNING OBJECTIVES", { x: 0.4, y: 0, w: 9.2, h: 0.82, fontSize: 13, color: C.white, bold: true, charSpacing: 3, valign: "middle", margin: 0 });
    s.addText("By the end of this module you will be able to:", { x: 0.35, y: 0.9, w: 9.3, h: 0.28, fontSize: 11, color: C.muted, italic: true, margin: 0 });

    const objs = [
      { icon: FaFileAlt,       color: C.accent, title: "Write a rules file that works",      body: "Encode your team's Definition of Done, architecture constraints, and coding standards so the agent self-evaluates before raising a PR." },
      { icon: FaBook,          color: C.teal,   title: "Build product documentation",        body: "Write a product summary, product details, and technical context that give the agent the 'why' behind every constraint." },
      { icon: FaCodeBranch,    color: C.green,  title: "Maintain Architecture Decisions",    body: "Write ADRs that prevent agents from undoing settled decisions — and use agent assistance to make ADR maintenance sustainable." },
      { icon: FaClipboardList, color: C.steel,  title: "Write PRDs and specs agents can use", body: "Craft acceptance criteria precise enough to become tests, and plans detailed enough to remove ambiguous design decisions from the agent." },
    ];

    const cols = [0.35, 5.1];
    for (let i = 0; i < 4; i++) {
      const x = cols[i % 2], y = 1.28 + Math.floor(i / 2) * 2.0, w = 4.55, h = 1.82;
      const o = objs[i];
      s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color: C.white }, shadow: shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.07, h, fill: { color: o.color } });
      const ic = await icon(o.icon, "#" + o.color);
      s.addImage({ data: ic, x: x + 0.18, y: y + 0.22, w: 0.4, h: 0.4 });
      s.addText(o.title, { x: x + 0.7, y: y + 0.18, w: w - 0.85, h: 0.42, fontSize: 12.5, color: C.navy, bold: true, margin: 0 });
      s.addText(o.body,  { x: x + 0.7, y: y + 0.64, w: w - 0.85, h: 1.05, fontSize: 11, color: C.muted, margin: 0 });
    }
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 3 — Why Context Determines Output Quality
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.navy };

    s.addText("CONTEXT DETERMINES OUTPUT QUALITY", { x: 0.4, y: 0.22, w: 9.2, h: 0.45, fontSize: 13, color: C.iceBlue, bold: true, charSpacing: 3, margin: 0 });

    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 0.82, w: 9.3, h: 1.05, fill: { color: C.mid, transparency: 18 }, shadow: shadow() });
    s.addText("The context window is the agent's entire world. Everything outside it is invisible.\nWhat the agent produces is a direct function of what you gave it to work with.", {
      x: 0.65, y: 0.88, w: 8.7, h: 0.82,
      fontSize: 15, color: C.white, italic: true, align: "center", valign: "middle", margin: 0
    });

    // What happens without each artifact
    const gaps = [
      { miss: "No rules file",          error: "Agent decides for itself what 'done' means — consistently wrong in small ways that compound into quality debt." },
      { miss: "No product docs",        error: "Agent optimizes technically but misses product intent. Correct code for the wrong product." },
      { miss: "No ADRs",                error: "Agent undoes settled architectural decisions it doesn't know exist. Confident, plausible, expensive mistakes." },
      { miss: "No PRD",                 error: "Agent implements its best guess of what was wanted. Expensive guessing at machine speed." },
      { miss: "No plan / spec",         error: "Agent makes design decisions that should have been made by the team. Local optima, global problems." },
    ];

    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 2.0, w: 9.3, h: 0.35, fill: { color: C.accent, transparency: 25 } });
    s.addText("Missing artifact → predictable error class", { x: 0.35, y: 2.0, w: 9.3, h: 0.35, fontSize: 11, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });

    for (let i = 0; i < gaps.length; i++) {
      const g = gaps[i];
      const y = 2.42 + i * 0.6;
      s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y, w: 9.3, h: 0.54, fill: { color: C.mid, transparency: i % 2 === 0 ? 35 : 50 } });
      s.addText(g.miss, { x: 0.5, y, w: 2.1, h: 0.54, fontSize: 10.5, color: C.amber, bold: true, valign: "middle", margin: 0 });
      s.addShape(pres.shapes.RECTANGLE, { x: 2.55, y: y + 0.12, w: 0.02, h: 0.3, fill: { color: C.steel } });
      s.addText(g.error, { x: 2.7, y, w: 6.8, h: 0.54, fontSize: 10.5, color: C.pale, valign: "middle", margin: 0 });
    }
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 4 — The Rules File
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.white };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.82, fill: { color: C.navy } });
    s.addText("THE RULES FILE  —  THE AGENT'S STANDING ORDERS", { x: 0.4, y: 0, w: 9.2, h: 0.82, fontSize: 13, color: C.white, bold: true, charSpacing: 3, valign: "middle", margin: 0 });
    s.addText("CLAUDE.md · .cursorrules · loaded into every session · applies to every task", { x: 0.4, y: 0.9, w: 9.2, h: 0.28, fontSize: 11.5, color: C.muted, italic: true, margin: 0 });

    // Left — what belongs
    const sections = [
      { head: "Tech stack & conventions",   color: C.accent, body: "Languages, frameworks, naming patterns, formatting. The agent follows consistent style in the codebase — but explicit standards prevent drift on new code." },
      { head: "Architecture constraints",   color: C.teal,   body: "What layers exist. What is off-limits. What patterns are required. What the agent must never do to the system structure." },
      { head: "Security rules",             color: C.red,    body: "Never log PII. Never hard-code credentials. Always validate external inputs. These are non-negotiable and belong in every rules file." },
      { head: "Definition of Done",         color: C.green,  body: "The most important section. The full checklist the agent must satisfy before raising a PR. Without it, the agent decides what 'done' means." },
    ];

    for (let i = 0; i < sections.length; i++) {
      const r = sections[i];
      const y = 1.28 + i * 1.02;
      s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y, w: 4.75, h: 0.92, fill: { color: C.offWhite }, shadow: shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y, w: 0.06, h: 0.92, fill: { color: r.color } });
      s.addText(r.head, { x: 0.52, y: y + 0.06, w: 4.45, h: 0.3, fontSize: 12, color: C.navy, bold: true, margin: 0 });
      s.addText(r.body, { x: 0.52, y: y + 0.4, w: 4.45, h: 0.46, fontSize: 10.5, color: C.muted, margin: 0 });
    }

    // Right — rules file discipline box
    s.addShape(pres.shapes.RECTANGLE, { x: 5.45, y: 1.28, w: 4.2, h: 3.8, fill: { color: C.offWhite }, shadow: shadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: 5.45, y: 1.28, w: 4.2, h: 0.42, fill: { color: C.navy } });
    s.addText("RULES FILE DISCIPLINE", { x: 5.45, y: 1.28, w: 4.2, h: 0.42, fontSize: 11, color: C.white, bold: true, charSpacing: 2, align: "center", valign: "middle", margin: 0 });

    const discipline = [
      { n: "1", rule: "Keep it under 300 lines", detail: "Longer files are read but not absorbed. Move task-specific rules to referenced docs loaded just-in-time." },
      { n: "2", rule: "Universal rules only", detail: "Only what is true for every session. Task-specific standards go in referenced documents." },
      { n: "3", rule: "Version-control it as code", detail: "Every change through PR review. A DoD change is a policy change — it needs the same scrutiny." },
      { n: "4", rule: "Run evals on changes", detail: "When you change a rule, run your eval suite. Prompt changes have the same regression risk as code changes." },
    ];

    for (let i = 0; i < discipline.length; i++) {
      const d = discipline[i];
      const y = 1.82 + i * 0.82;
      s.addShape(pres.shapes.RECTANGLE, { x: 5.57, y, w: 0.32, h: 0.32, fill: { color: C.accent } });
      s.addText(d.n, { x: 5.57, y, w: 0.32, h: 0.32, fontSize: 12, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
      s.addText(d.rule, { x: 6.0, y: y + 0.01, w: 3.5, h: 0.28, fontSize: 11.5, color: C.navy, bold: true, margin: 0 });
      s.addText(d.detail, { x: 6.0, y: y + 0.33, w: 3.5, h: 0.38, fontSize: 10, color: C.muted, margin: 0 });
    }
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 5 — Definition of Done as Context
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.offWhite };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.82, fill: { color: C.navy } });
    s.addText("DEFINITION OF DONE  —  THE CONTRACT IN YOUR RULES FILE", { x: 0.4, y: 0, w: 9.2, h: 0.82, fontSize: 13, color: C.white, bold: true, charSpacing: 3, valign: "middle", margin: 0 });
    s.addText("When the agent knows the DoD, it self-evaluates before raising a PR. When it doesn't, it decides for itself.", { x: 0.4, y: 0.9, w: 9.2, h: 0.28, fontSize: 11.5, color: C.muted, italic: true, margin: 0 });

    // DoD checklist items
    const items = [
      { check: "All new code has unit tests at the appropriate coverage level", color: C.green },
      { check: "All tests pass locally and in CI before PR is raised", color: C.green },
      { check: "No new lint or type errors introduced", color: C.green },
      { check: "No secrets, credentials, or PII in code or config files", color: C.red },
      { check: "PR description complete: what changed, why, how, alternatives considered", color: C.accent },
      { check: "Public interfaces documented; internal docs updated if behavior changed", color: C.teal },
      { check: "No regressions in existing test suite", color: C.green },
      { check: "Change reviewed against relevant ADRs — no conflicts", color: C.amber },
    ];

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = col === 0 ? 0.35 : 5.1;
      const y = 1.32 + row * 0.97;
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 4.6, h: 0.84, fill: { color: C.white }, shadow: shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.06, h: 0.84, fill: { color: item.color } });
      s.addShape(pres.shapes.RECTANGLE, { x: x + 0.18, y: y + 0.24, w: 0.28, h: 0.28, fill: { color: C.offWhite }, line: { color: item.color, width: 1.5 } });
      s.addText(item.check, { x: x + 0.58, y, w: 3.9, h: 0.84, fontSize: 10.5, color: C.text, valign: "middle", margin: 0 });
    }

    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 5.18, w: 9.3, h: 0.28, fill: { color: C.accent, transparency: 80 } });
    s.addText("The DoD belongs in your rules file AND your CI pipeline. The agent self-evaluates; CI enforces.", { x: 0.35, y: 5.18, w: 9.3, h: 0.28, fontSize: 10, color: C.text, align: "center", valign: "middle", italic: true, margin: 0 });
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 6 — Product Documentation
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.white };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.82, fill: { color: C.navy } });
    s.addText("PRODUCT DOCUMENTATION  —  THE 'WHY' BEHIND EVERY CONSTRAINT", { x: 0.4, y: 0, w: 9.2, h: 0.82, fontSize: 13, color: C.white, bold: true, charSpacing: 3, valign: "middle", margin: 0 });
    s.addText("Without product docs, agents optimize technically but miss product intent — correct code for the wrong product.", { x: 0.4, y: 0.9, w: 9.2, h: 0.28, fontSize: 11.5, color: C.muted, italic: true, margin: 0 });

    const docs = [
      {
        title: "Product Summary",
        color: C.accent,
        icon: FaBook,
        desc: "What the product does, who uses it, and what it must never do. One to two paragraphs. The agent reads this first.",
        contains: ["What the product does and why it exists", "Who the primary users are and their goals", "3 non-negotiables: what must never happen", "Fits on a single screen — if it doesn't, it's too long"],
      },
      {
        title: "Product Details",
        color: C.teal,
        icon: FaListAlt,
        desc: "Functional and non-functional requirements, user personas, integrations, performance baselines, and accepted trade-offs.",
        contains: ["User personas and their primary workflows", "Key integrations and their constraints", "Performance and availability baselines", "Known limitations and their accepted trade-offs"],
      },
      {
        title: "Technical Details",
        color: C.green,
        icon: FaCog,
        desc: "Architecture overview, bounded contexts, integration contracts, security model, data classification, deployment topology.",
        contains: ["Bounded contexts and their responsibilities", "Technology choices and the reasons for them", "Security model and data classification", "What a new senior engineer reads in week one"],
      },
    ];

    for (let i = 0; i < 3; i++) {
      const d = docs[i];
      const x = 0.35 + i * 3.2;
      const ic = await icon(d.icon, "#" + d.color);
      s.addShape(pres.shapes.RECTANGLE, { x, y: 1.28, w: 3.0, h: 3.95, fill: { color: C.offWhite }, shadow: shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y: 1.28, w: 3.0, h: 0.48, fill: { color: d.color, transparency: 15 } });
      s.addImage({ data: ic, x: x + 0.15, y: 1.34, w: 0.32, h: 0.32 });
      s.addText(d.title, { x: x + 0.55, y: 1.28, w: 2.35, h: 0.48, fontSize: 12.5, color: C.navy, bold: true, valign: "middle", margin: 0 });
      s.addText(d.desc, { x: x + 0.12, y: 1.82, w: 2.76, h: 0.72, fontSize: 10, color: C.muted, italic: true, margin: 0 });
      for (let j = 0; j < d.contains.length; j++) {
        const cy = 2.62 + j * 0.55;
        s.addShape(pres.shapes.RECTANGLE, { x: x + 0.12, y: cy + 0.07, w: 0.08, h: 0.08, fill: { color: d.color } });
        s.addText(d.contains[j], { x: x + 0.28, y: cy, w: 2.6, h: 0.48, fontSize: 10, color: C.text, valign: "middle", margin: 0 });
      }
    }

    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 5.3, w: 9.3, h: 0.22, fill: { color: C.navy, transparency: 85 } });
    s.addText("All three levels live in the repository (PRODUCT.md or docs/) and are referenced from the rules file for just-in-time loading.", { x: 0.35, y: 5.3, w: 9.3, h: 0.22, fontSize: 9.5, color: C.muted, italic: true, align: "center", valign: "middle", margin: 0 });
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 7 — Architecture Decision Records
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.navy };

    s.addText("ARCHITECTURE DECISION RECORDS  —  WHAT THE AGENT MUST NOT UNDO", { x: 0.4, y: 0.22, w: 9.2, h: 0.45, fontSize: 13, color: C.iceBlue, bold: true, charSpacing: 3, margin: 0 });

    // The key problem
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 0.8, w: 9.3, h: 0.88, fill: { color: C.mid, transparency: 18 }, shadow: shadow() });
    s.addText("An agent that does not know about ADR-012 will see the Redis session code and consider migrating it back to the database.\nIt does not know this was settled. Without the ADR, it makes a confident, plausible, and expensive mistake.", {
      x: 0.6, y: 0.85, w: 8.8, h: 0.76,
      fontSize: 12.5, color: C.pale, italic: true, align: "center", valign: "middle", margin: 0
    });

    // ADR format left
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 1.82, w: 4.55, h: 3.55, fill: { color: C.mid, transparency: 25 }, shadow: shadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 1.82, w: 4.55, h: 0.38, fill: { color: C.accent } });
    s.addText("ADR FORMAT", { x: 0.35, y: 1.82, w: 4.55, h: 0.38, fontSize: 11, color: C.white, bold: true, charSpacing: 2, align: "center", valign: "middle", margin: 0 });

    const adrFields = [
      { field: "# ADR-[n]: Short descriptive title", style: "header" },
      { field: "Status: Accepted | Deprecated | Superseded by ADR-[n]", style: "meta" },
      { field: "Context — what situation forced this decision?", style: "section" },
      { field: "Decision — what was chosen and why?", style: "section" },
      { field: "Alternatives considered — what was rejected?", style: "section" },
      { field: "Consequences — what is now easier? What is prohibited?", style: "section" },
      { field: "Review trigger — when should this be revisited?", style: "section" },
    ];

    for (let i = 0; i < adrFields.length; i++) {
      const f = adrFields[i];
      const y = 2.28 + i * 0.44;
      const isHeader = f.style === "header";
      s.addShape(pres.shapes.RECTANGLE, { x: 0.48, y, w: 4.28, h: 0.38, fill: { color: isHeader ? C.navy : C.mid, transparency: isHeader ? 0 : 60 } });
      s.addText(f.field, { x: 0.58, y, w: 4.08, h: 0.38, fontSize: 9.5, color: isHeader ? C.iceBlue : C.pale, fontFace: isHeader ? "Consolas" : undefined, valign: "middle", margin: 0 });
    }

    // Right — discipline
    const adrRules = [
      { icon: FaDatabase, color: C.teal,  head: "Store in adr/ folder",          body: "Version-controlled alongside the code. One file per decision. Reference the folder from your rules file." },
      { icon: FaSearch,   color: C.green, head: "Never delete — deprecate",       body: "When a decision is superseded, update the status and link forward to the new ADR. History matters." },
      { icon: FaLightbulb, color: C.amber, head: "Agent-assisted drafting",       body: "Discuss the decision in Slack. Agent drafts the ADR. Human reviews and merges. Minutes, not hours." },
    ];

    for (let i = 0; i < 3; i++) {
      const r = adrRules[i];
      const y = 1.82 + i * 1.22;
      const ic = await icon(r.icon, "#" + r.color);
      s.addShape(pres.shapes.RECTANGLE, { x: 5.2, y, w: 4.45, h: 1.1, fill: { color: C.mid, transparency: 15 }, shadow: shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x: 5.2, y, w: 0.06, h: 1.1, fill: { color: r.color } });
      s.addImage({ data: ic, x: 5.34, y: y + 0.2, w: 0.38, h: 0.38 });
      s.addText(r.head, { x: 5.82, y: y + 0.08, w: 3.7, h: 0.34, fontSize: 12, color: r.color, bold: true, margin: 0 });
      s.addText(r.body, { x: 5.82, y: y + 0.46, w: 3.7, h: 0.55, fontSize: 10.5, color: C.pale, margin: 0 });
    }
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 8 — Product Requirements Documents
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.offWhite };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.82, fill: { color: C.navy } });
    s.addText("THE PRD  —  REQUIREMENTS THE AGENT CAN BUILD TO", { x: 0.4, y: 0, w: 9.2, h: 0.82, fontSize: 13, color: C.white, bold: true, charSpacing: 3, valign: "middle", margin: 0 });
    s.addText("A PRD without testable acceptance criteria is a wish list. An agent given a wish list guesses.", { x: 0.4, y: 0.9, w: 9.2, h: 0.28, fontSize: 11.5, color: C.muted, italic: true, margin: 0 });

    const prdParts = [
      { n:"1", title:"Problem statement",      color: C.accent, body: "What situation or user need is this change addressing? The agent needs the 'why' to make sensible trade-off decisions." },
      { n:"2", title:"Acceptance criteria",    color: C.green,  body: "Specific, testable conditions that define success. Each criterion becomes the basis for a test. If it can't be tested, rewrite it." },
      { n:"3", title:"Non-goals",              color: C.teal,   body: "What this change explicitly does not do. Prevents scope creep and stops the agent from solving adjacent problems it was not asked to solve." },
      { n:"4", title:"Constraints",            color: C.amber,  body: "Technical, regulatory, or business constraints that govern implementation. Security requirements, SLA targets, compatibility rules." },
      { n:"5", title:"Links to external docs", color: C.steel,  body: "API specs, compliance documents, design files, research. If the agent can't follow the link, either bring the content in or summarise it in the PRD." },
    ];

    for (let i = 0; i < prdParts.length; i++) {
      const p = prdParts[i];
      const col = i % 2;
      const row = Math.floor(i / 2);
      let x, y, w;
      if (i === 4) { x = 2.88; y = 4.05; w = 4.25; }
      else { x = col === 0 ? 0.35 : 5.1; y = 1.28 + row * 1.38; w = 4.55; }
      s.addShape(pres.shapes.RECTANGLE, { x, y, w, h: 1.22, fill: { color: C.white }, shadow: shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.06, h: 1.22, fill: { color: p.color } });
      s.addShape(pres.shapes.RECTANGLE, { x: x + 0.18, y: y + 0.16, w: 0.32, h: 0.32, fill: { color: p.color } });
      s.addText(p.n, { x: x + 0.18, y: y + 0.16, w: 0.32, h: 0.32, fontSize: 11, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
      s.addText(p.title, { x: x + 0.62, y: y + 0.1, w: w - 0.76, h: 0.34, fontSize: 12, color: C.navy, bold: true, margin: 0 });
      s.addText(p.body, { x: x + 0.62, y: y + 0.48, w: w - 0.76, h: 0.66, fontSize: 10.5, color: C.muted, margin: 0 });
    }
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 9 — Acceptance Criteria: Vague vs. Precise
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.white };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.82, fill: { color: C.navy } });
    s.addText("ACCEPTANCE CRITERIA  —  VAGUE VS. PRECISE", { x: 0.4, y: 0, w: 9.2, h: 0.82, fontSize: 13, color: C.white, bold: true, charSpacing: 3, valign: "middle", margin: 0 });
    s.addText("If it can't be expressed as a test, it isn't an acceptance criterion — it's a hope.", { x: 0.4, y: 0.9, w: 9.2, h: 0.28, fontSize: 11.5, color: C.muted, italic: true, margin: 0 });

    const pairs = [
      {
        vague: "The user should be able to see their account balance.",
        precise: "GET /account/{id}/balance returns the current balance in GBP to 2 decimal places within 200ms for authenticated users, or HTTP 401 for unauthenticated requests.",
      },
      {
        vague: "The form should validate user input.",
        precise: "Submitting the form with a missing required field displays an inline error message adjacent to that field within 100ms. The form does not submit. No network request is made.",
      },
      {
        vague: "The import should handle large files.",
        precise: "Files up to 50MB import without error. Files exceeding 50MB return a 413 response with error code FILE_TOO_LARGE before any data is processed. Memory usage does not exceed 256MB during import.",
      },
    ];

    for (let i = 0; i < 3; i++) {
      const p = pairs[i];
      const y = 1.28 + i * 1.35;

      // Vague
      s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y, w: 4.5, h: 1.18, fill: { color: C.offWhite }, shadow: shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y, w: 4.5, h: 0.3, fill: { color: C.red, transparency: 25 } });
      s.addText("✗  VAGUE", { x: 0.42, y, w: 4.35, h: 0.3, fontSize: 10, color: C.white, bold: true, valign: "middle", margin: 0 });
      s.addText(p.vague, { x: 0.48, y: y + 0.35, w: 4.25, h: 0.76, fontSize: 10.5, color: C.text, margin: 0 });

      // Arrow
      s.addText("→", { x: 4.9, y: y + 0.45, w: 0.4, h: 0.36, fontSize: 20, color: C.accent, align: "center", margin: 0 });

      // Precise
      s.addShape(pres.shapes.RECTANGLE, { x: 5.25, y, w: 4.4, h: 1.18, fill: { color: C.offWhite }, shadow: shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x: 5.25, y, w: 4.4, h: 0.3, fill: { color: C.green, transparency: 25 } });
      s.addText("✓  PRECISE  (testable)", { x: 5.32, y, w: 4.26, h: 0.3, fontSize: 10, color: C.white, bold: true, valign: "middle", margin: 0 });
      s.addText(p.precise, { x: 5.38, y: y + 0.35, w: 4.12, h: 0.76, fontSize: 10, color: C.text, margin: 0 });
    }
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 10 — Plans and Specs
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.navy };

    s.addText("PLANS AND SPECS  —  THE IMPLEMENTATION BLUEPRINT", { x: 0.4, y: 0.22, w: 9.2, h: 0.45, fontSize: 13, color: C.iceBlue, bold: true, charSpacing: 3, margin: 0 });
    s.addText("Where the PRD says what must be accomplished, the plan says how. It removes design decisions from the agent.", { x: 0.4, y: 0.74, w: 9.2, h: 0.3, fontSize: 12, color: C.pale, italic: true, margin: 0 });

    // Left — what the plan contains
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 1.18, w: 4.55, h: 4.15, fill: { color: C.mid, transparency: 20 }, shadow: shadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 1.18, w: 4.55, h: 0.4, fill: { color: C.teal } });
    s.addText("WHAT A GOOD PLAN CONTAINS", { x: 0.35, y: 1.18, w: 4.55, h: 0.4, fontSize: 11, color: C.white, bold: true, charSpacing: 2, align: "center", valign: "middle", margin: 0 });

    const planItems = [
      "Files to change — explicit list of files modified, created, or deleted",
      "Changes per file — what each change does at function/class level",
      "New components — names, responsibilities, and interfaces",
      "Data changes — schema migrations, API contracts, config changes",
      "Test strategy — what tests to write and what each covers",
      "Implementation sequence — order of changes with dependencies noted",
      "Open questions — decisions the team has not yet made",
    ];
    for (let i = 0; i < planItems.length; i++) {
      const y = 1.68 + i * 0.49;
      s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: y + 0.12, w: 0.1, h: 0.1, fill: { color: C.teal } });
      s.addText(planItems[i], { x: 0.72, y, w: 4.05, h: 0.45, fontSize: 10.5, color: C.pale, valign: "middle", margin: 0 });
    }

    // Right — depth calibration
    s.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.18, w: 4.45, h: 4.15, fill: { color: C.mid, transparency: 20 }, shadow: shadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.18, w: 4.45, h: 0.4, fill: { color: C.accent } });
    s.addText("DEPTH CALIBRATES CONFIDENCE", { x: 5.2, y: 1.18, w: 4.45, h: 0.4, fontSize: 11, color: C.white, bold: true, charSpacing: 2, align: "center", valign: "middle", margin: 0 });

    const depths = [
      { level: "Detailed plan", color: C.green, when: "High-stakes changes\nNew domains\nNew team members", gives: "Specific signatures, field names, test cases. Agent has almost no independent design decisions." },
      { level: "Standard plan", color: C.teal,  when: "Well-understood changes\nExisting patterns", gives: "Component names, responsibilities, interfaces. Agent fills in implementation within defined boundaries." },
      { level: "Light plan",    color: C.steel, when: "Low-risk changes\nAgent-familiar domain", gives: "Direction and constraints. Agent makes implementation decisions within known patterns." },
    ];

    for (let i = 0; i < 3; i++) {
      const d = depths[i];
      const y = 1.68 + i * 1.2;
      s.addShape(pres.shapes.RECTANGLE, { x: 5.32, y, w: 4.2, h: 1.08, fill: { color: C.mid, transparency: 40 } });
      s.addShape(pres.shapes.RECTANGLE, { x: 5.32, y, w: 0.06, h: 1.08, fill: { color: d.color } });
      s.addText(d.level, { x: 5.48, y: y + 0.04, w: 4.0, h: 0.3, fontSize: 12, color: d.color, bold: true, margin: 0 });
      s.addText("When: " + d.when, { x: 5.48, y: y + 0.36, w: 1.82, h: 0.64, fontSize: 9.5, color: C.pale, margin: 0 });
      s.addShape(pres.shapes.RECTANGLE, { x: 7.25, y: y + 0.1, w: 0.02, h: 0.85, fill: { color: C.steel, transparency: 50 } });
      s.addText(d.gives, { x: 7.35, y: y + 0.1, w: 2.05, h: 0.88, fontSize: 9.5, color: C.muted, margin: 0 });
    }
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 11 — Just-in-Time Context Assembly
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.offWhite };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.82, fill: { color: C.navy } });
    s.addText("JUST-IN-TIME CONTEXT ASSEMBLY", { x: 0.4, y: 0, w: 9.2, h: 0.82, fontSize: 13, color: C.white, bold: true, charSpacing: 3, valign: "middle", margin: 0 });
    s.addText("Load what is relevant to the current task. The context window is finite and expensive — fill it with signal, not noise.", { x: 0.4, y: 0.9, w: 9.2, h: 0.28, fontSize: 11.5, color: C.muted, italic: true, margin: 0 });

    const phases = [
      { phase: "Session start",              color: C.accent, load: "Rules file · Product summary" },
      { phase: "Before any task",            color: C.teal,   load: "Relevant ADRs · PRD for this task" },
      { phase: "Before writing code",        color: C.green,  load: "Plan section for this component · Relevant existing code" },
      { phase: "When a test fails",          color: C.amber,  load: "Failing test · Relevant spec section · Relevant code" },
      { phase: "When agent is uncertain",    color: C.steel,  load: "The specific ADR or constraint document that resolves the question" },
    ];

    for (let i = 0; i < phases.length; i++) {
      const p = phases[i];
      const y = 1.28 + i * 0.82;
      s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y, w: 9.3, h: 0.72, fill: { color: C.white }, shadow: shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y, w: 2.4, h: 0.72, fill: { color: p.color, transparency: 20 } });
      s.addText(p.phase, { x: 0.5, y, w: 2.2, h: 0.72, fontSize: 11.5, color: C.navy, bold: true, valign: "middle", margin: 0 });
      s.addText("→", { x: 2.8, y, w: 0.35, h: 0.72, fontSize: 18, color: p.color, align: "center", valign: "middle", margin: 0 });
      s.addText(p.load, { x: 3.22, y, w: 6.3, h: 0.72, fontSize: 11.5, color: C.text, valign: "middle", margin: 0 });
    }

    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 5.35, w: 9.3, h: 0.18, fill: { color: C.navy, transparency: 85 } });
    s.addText("What to exclude: sections unrelated to the current task · historical PRDs · unrelated test output · ADRs for untouched systems", { x: 0.35, y: 5.35, w: 9.3, h: 0.18, fontSize: 9.5, color: C.muted, italic: true, align: "center", valign: "middle", margin: 0 });
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 12 — Lab Exercise
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.white };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.82, fill: { color: C.navy } });
    s.addText("LAB EXERCISE", { x: 0.4, y: 0, w: 9.2, h: 0.82, fontSize: 13, color: C.white, bold: true, charSpacing: 3, valign: "middle", margin: 0 });
    s.addText("Engineering context for a real agent task on your own product or a representative scenario", { x: 0.4, y: 0.9, w: 9.2, h: 0.28, fontSize: 11.5, color: C.muted, italic: true, margin: 0 });

    const steps = [
      { n:"1", t:"Write a product summary",    min:"8 min",  d:"Draft a product summary for a system you work on. Include what it does, who uses it, and the three things it must never do. Swap with a neighbour — can they make a sound architecture decision from your summary alone?" },
      { n:"2", t:"Write two ADRs",             min:"10 min", d:"Identify two architectural decisions in your system that would surprise or constrain an agent. Write one ADR for each. For each: what would a well-intentioned agent get wrong without this ADR?" },
      { n:"3", t:"Write a Definition of Done", min:"7 min",  d:"Write the DoD for one task type on your team (a new API endpoint, a migration, a UI component). Be specific enough that an agent can self-evaluate against it without asking a clarifying question." },
      { n:"4", t:"Write acceptance criteria",  min:"7 min",  d:"Take a real upcoming feature. Write acceptance criteria as specific, testable conditions. For each criterion: can you write a test that verifies it? If not, rewrite it until you can." },
      { n:"5", t:"Identify context gaps",      min:"3 min",  d:"What external documentation would the agent need to implement this feature correctly? Is each one accessible from the repository? If not, what is the plan?" },
    ];

    for (let i = 0; i < steps.length; i++) {
      const st = steps[i];
      const y = 1.28 + i * 0.84;
      s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y, w: 9.3, h: 0.75, fill: { color: C.offWhite }, shadow: shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y, w: 0.5, h: 0.75, fill: { color: C.accent } });
      s.addText(st.n, { x: 0.35, y, w: 0.5, h: 0.75, fontSize: 16, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
      s.addText(st.t, { x: 0.96, y: y + 0.04, w: 2.5, h: 0.3, fontSize: 12, color: C.navy, bold: true, margin: 0 });
      s.addText(st.min, { x: 0.96, y: y + 0.38, w: 1.0, h: 0.26, fontSize: 10, color: C.accent, bold: true, margin: 0 });
      s.addText(st.d, { x: 2.1, y: y + 0.08, w: 7.45, h: 0.58, fontSize: 10.5, color: C.muted, valign: "middle", margin: 0 });
    }
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 13 — Discussion + Key Takeaways
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.navy };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.72, fill: { color: C.mid } });
    s.addText("MODULE 03  —  DISCUSSION & KEY TAKEAWAYS", { x: 0.4, y: 0, w: 9.2, h: 0.72, fontSize: 13, color: C.white, bold: true, charSpacing: 3, valign: "middle", margin: 0 });

    // Left — discussion questions
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 0.88, w: 4.55, h: 4.45, fill: { color: C.mid, transparency: 18 }, shadow: shadow() });
    s.addText("DISCUSSION", { x: 0.55, y: 1.0, w: 3.5, h: 0.35, fontSize: 11, color: C.iceBlue, bold: true, charSpacing: 3, margin: 0 });

    const questions = [
      "What is the most important thing a new developer needs to know about your codebase? Is it written down anywhere?",
      "How long would it take a new agent — given your current documentation — to understand your product well enough to implement a feature correctly?",
      "Which of the five context artifacts does your team most consistently skip? What class of agent errors would that produce?",
      "If you wrote acceptance criteria specific enough to become tests for your last three features, would they pass?",
    ];
    for (let i = 0; i < questions.length; i++) {
      const y = 1.46 + i * 0.92;
      s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y, w: 0.28, h: 0.28, fill: { color: C.accent } });
      s.addText(`Q${i+1}`, { x: 0.5, y, w: 0.28, h: 0.28, fontSize: 9, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
      s.addText(questions[i], { x: 0.9, y, w: 3.85, h: 0.82, fontSize: 10.5, color: C.pale, valign: "middle", margin: 0 });
    }

    // Right — key takeaways
    s.addShape(pres.shapes.RECTANGLE, { x: 5.1, y: 0.88, w: 4.55, h: 4.45, fill: { color: C.mid, transparency: 18 }, shadow: shadow() });
    s.addText("KEY TAKEAWAYS", { x: 5.3, y: 1.0, w: 3.5, h: 0.35, fontSize: 11, color: C.iceBlue, bold: true, charSpacing: 3, margin: 0 });

    const takeaways = [
      { color: C.accent, text: "Context determines output quality more than model choice. The five artifacts are your primary lever." },
      { color: C.teal,   text: "The Definition of Done belongs in the rules file. Without it, the agent decides what 'done' means." },
      { color: C.green,  text: "ADRs prevent agents from undoing settled decisions. What's not written down doesn't exist for the agent." },
      { color: C.amber,  text: "A PRD without testable acceptance criteria is a wish list. Vague input produces vague output at machine speed." },
      { color: C.steel,  text: "Documentation debt is now technical debt. It has a direct, measurable impact on agentic development quality." },
    ];
    for (let i = 0; i < takeaways.length; i++) {
      const t = takeaways[i];
      const y = 1.46 + i * 0.76;
      s.addShape(pres.shapes.RECTANGLE, { x: 5.25, y, w: 0.06, h: 0.65, fill: { color: t.color } });
      s.addText(t.text, { x: 5.42, y, w: 4.1, h: 0.65, fontSize: 10.5, color: C.pale, valign: "middle", margin: 0 });
    }

    // Next module banner
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.3, w: 10, h: 0.325, fill: { color: C.accent } });
    s.addText("NEXT:  Module 04 — Spec-Driven Development & PRDs  |  Writing the documents that agents build to", { x: 0.4, y: 5.3, w: 9.2, h: 0.325, fontSize: 11, color: C.white, bold: true, valign: "middle", margin: 0 });
  }

  await pres.writeFile({ fileName: "Module_03_Context_Engineering.pptx" });
  console.log("✅ Module 3 written");
}

build().catch(err => { console.error(err); process.exit(1); });
