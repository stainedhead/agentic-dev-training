const pptxgen = require("pptxgenjs");
const { C, shadow, icon } = require("./shared");
const {
  FaFileAlt, FaWrench, FaHistory, FaSync,
  FaBook, FaCog, FaCodeBranch, FaShieldAlt,
  FaClipboardList, FaRedo, FaDatabase, FaCheck
} = require("react-icons/fa");

async function build() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.title  = "Module 4: Product Documentation";
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
    s.addText("MODULE 04", { x: 0.4, y: 0.82, w: 1.5, h: 0.38, fontSize: 11, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });

    s.addText("Product\nDocumentation", { x: 0.4, y: 1.38, w: 7.2, h: 1.9, fontSize: 48, color: C.white, bold: true, margin: 0 });
    s.addText("The documentation layer that makes agents contextually aware", { x: 0.4, y: 3.38, w: 7.0, h: 0.52, fontSize: 17, color: C.iceBlue, italic: true, margin: 0 });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 4.05, w: 3.5, h: 0.04, fill: { color: C.accent } });
    s.addText([
      { text: "Duration: ", options: { bold: true, color: C.muted } },
      { text: "60–75 min  ", options: { color: C.muted } },
      { text: "  |  ", options: { color: C.muted } },
      { text: "Level: ", options: { bold: true, color: C.muted } },
      { text: "Foundational", options: { color: C.muted } }
    ], { x: 0.4, y: 4.25, w: 5, h: 0.38, fontSize: 13, margin: 0 });

    // Right visual — doc file stack
    s.addShape(pres.shapes.RECTANGLE, { x: 7.1, y: 0.55, w: 2.55, h: 4.8, fill: { color: C.mid, transparency: 25 }, shadow: shadow() });
    s.addText("THE DOC\nLAYER", { x: 7.1, y: 0.62, w: 2.55, h: 0.62, fontSize: 10, color: C.iceBlue, bold: true, charSpacing: 1, align: "center", margin: 0 });

    const docFiles = [
      { label: "CLAUDE.md",             sub: "Rules File — Agent's Standing Orders", color: C.accent },
      { label: "PRODUCT.md",            sub: "Vision · Users · Non-Negotiables",     color: C.teal },
      { label: "product-details.md",    sub: "Features · Requirements · Personas",   color: C.green },
      { label: "technical-details.md",  sub: "Architecture · Patterns · Stack",      color: C.teal },
      { label: "adr/",                  sub: "Architecture Decision Records",         color: C.steel },
    ];
    let ly = 1.38;
    for (let i = 0; i < docFiles.length; i++) {
      const f = docFiles[i];
      s.addShape(pres.shapes.RECTANGLE, { x: 7.22, y: ly, w: 2.31, h: 0.68, fill: { color: f.color, transparency: 18 } });
      s.addText(f.label, { x: 7.22, y: ly + 0.04, w: 2.31, h: 0.3, fontSize: 9, color: C.white, bold: true, align: "center", valign: "middle", fontFace: "Consolas", margin: 0 });
      s.addText(f.sub, { x: 7.22, y: ly + 0.36, w: 2.31, h: 0.26, fontSize: 7.5, color: C.pale, align: "center", margin: 0 });
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
      { icon: FaWrench,  color: C.accent, title: "Write a rules file that works",        body: "Instruct the agent to read product docs before any change, update them when architecture shifts, and reference ADRs before proposing design changes." },
      { icon: FaFileAlt, color: C.teal,   title: "Build the product documentation layer", body: "Create PRODUCT.md, product-details.md, technical-details.md, and an adr/ folder — the context layer that makes all subsequent modules work." },
      { icon: FaSync,    color: C.green,  title: "Keep docs in sync automatically",       body: "Apply the auto-update pattern: the PR that changes the code also changes the docs. Never let context drift." },
      { icon: FaHistory, color: C.steel,  title: "Apply greenfield and brownfield patterns", body: "Write docs upfront for new repos. Use the agent-generate, team-review, commit pattern to retrofit documentation to existing codebases." },
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
  // SLIDE 3 — Why Product Documentation Matters
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.navy };

    s.addText("WHY PRODUCT DOCUMENTATION MATTERS", { x: 0.4, y: 0.22, w: 9.2, h: 0.45, fontSize: 13, color: C.iceBlue, bold: true, charSpacing: 3, margin: 0 });

    // Two-column contrast
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 0.82, w: 4.55, h: 4.45, fill: { color: C.mid, transparency: 18 }, shadow: shadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 0.82, w: 4.55, h: 0.44, fill: { color: C.red, transparency: 20 } });
    s.addText("WITHOUT PRODUCT DOCS", { x: 0.42, y: 0.82, w: 4.4, h: 0.44, fontSize: 11, color: C.white, bold: true, charSpacing: 2, valign: "middle", margin: 0 });

    const withoutItems = [
      { label: "Starts from scratch",      body: "Every session: agent reconstructs the system from raw code. The reconstruction is incomplete." },
      { label: "Wrong product, right code", body: "Agent optimises technically and misses product intent. Correct implementation of the wrong thing." },
      { label: "Undoes settled decisions",  body: "Agent reverses architectural choices it doesn't know were made. Confident, plausible, expensive mistakes." },
      { label: "Context drift accumulates", body: "Each PR the agent makes slightly less consistent with what the product is actually for." },
    ];
    for (let i = 0; i < withoutItems.length; i++) {
      const item = withoutItems[i];
      const y = 1.38 + i * 0.86;
      s.addShape(pres.shapes.RECTANGLE, { x: 0.48, y, w: 0.08, h: 0.08, fill: { color: C.red } });
      s.addText(item.label, { x: 0.68, y: y - 0.04, w: 4.1, h: 0.32, fontSize: 11, color: C.amber, bold: true, margin: 0 });
      s.addText(item.body, { x: 0.68, y: y + 0.3, w: 4.1, h: 0.46, fontSize: 10, color: C.pale, margin: 0 });
    }

    s.addShape(pres.shapes.RECTANGLE, { x: 5.1, y: 0.82, w: 4.55, h: 4.45, fill: { color: C.mid, transparency: 18 }, shadow: shadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: 5.1, y: 0.82, w: 4.55, h: 0.44, fill: { color: C.green, transparency: 20 } });
    s.addText("WITH PRODUCT DOCS", { x: 5.18, y: 0.82, w: 4.4, h: 0.44, fontSize: 11, color: C.white, bold: true, charSpacing: 2, valign: "middle", margin: 0 });

    const withItems = [
      { label: "Context from the first message",  body: "Agent loads PRODUCT.md and technical-details.md. It knows the system before it touches it." },
      { label: "Architecturally consistent",      body: "Every change is proposed within the frame of what the product is actually for and how it is built." },
      { label: "ADRs protect settled decisions",   body: "Agent checks the adr/ folder. It knows what is off-limits and why. It does not revisit closed questions." },
      { label: "Self-updating context",            body: "Code change and doc update are the same PR. Context never drifts. The agent always works with current information." },
    ];
    for (let i = 0; i < withItems.length; i++) {
      const item = withItems[i];
      const y = 1.38 + i * 0.86;
      s.addShape(pres.shapes.RECTANGLE, { x: 5.23, y, w: 0.08, h: 0.08, fill: { color: C.green } });
      s.addText(item.label, { x: 5.42, y: y - 0.04, w: 4.1, h: 0.32, fontSize: 11, color: C.teal, bold: true, margin: 0 });
      s.addText(item.body, { x: 5.42, y: y + 0.3, w: 4.1, h: 0.46, fontSize: 10, color: C.pale, margin: 0 });
    }
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 4 — Rules Files: The Agent's Operating Manual
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.white };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.82, fill: { color: C.navy } });
    s.addText("RULES FILES  —  THE AGENT'S OPERATING MANUAL", { x: 0.4, y: 0, w: 9.2, h: 0.82, fontSize: 13, color: C.white, bold: true, charSpacing: 3, valign: "middle", margin: 0 });
    s.addText("CLAUDE.md · .cursorrules  —  loaded into every session, applies to every task", { x: 0.4, y: 0.9, w: 9.2, h: 0.28, fontSize: 11.5, color: C.muted, italic: true, margin: 0 });

    // Left: code example of the three mandatory sections
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 1.28, w: 5.35, h: 3.98, fill: { color: C.offWhite }, shadow: shadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 1.28, w: 5.35, h: 0.38, fill: { color: C.accent } });
    s.addText("THREE MANDATORY SECTIONS", { x: 0.35, y: 1.28, w: 5.35, h: 0.38, fontSize: 10.5, color: C.white, bold: true, charSpacing: 2, align: "center", valign: "middle", margin: 0 });

    const codeLines = [
      { text: "## Context Loading", color: C.iceBlue, bold: true },
      { text: "Before any change, read:", color: C.pale, bold: false },
      { text: "  1. PRODUCT.md", color: C.teal, bold: false },
      { text: "  2. technical-details.md", color: C.teal, bold: false },
      { text: "  3. Relevant ADRs in adr/", color: C.teal, bold: false },
      { text: "", color: C.pale, bold: false },
      { text: "## Definition of Done", color: C.iceBlue, bold: true },
      { text: "  - [ ] Tests pass in CI", color: C.pale, bold: false },
      { text: "  - [ ] Affected docs updated in same PR", color: C.amber, bold: false },
      { text: "  - [ ] ADRs created for decisions made", color: C.amber, bold: false },
      { text: "", color: C.pale, bold: false },
      { text: "## Architecture Decision Records", color: C.iceBlue, bold: true },
      { text: "Before proposing architectural changes,", color: C.pale, bold: false },
      { text: "read all ADRs in adr/.", color: C.pale, bold: false },
      { text: "Never proceed past a prohibition.", color: C.red, bold: false },
    ];

    s.addShape(pres.shapes.RECTANGLE, { x: 0.45, y: 1.74, w: 5.15, h: 3.44, fill: { color: C.navy } });
    for (let i = 0; i < codeLines.length; i++) {
      const cl = codeLines[i];
      s.addText(cl.text, {
        x: 0.6, y: 1.79 + i * 0.215, w: 4.85, h: 0.22,
        fontSize: 9, color: cl.color, bold: cl.bold,
        fontFace: "Consolas", margin: 0
      });
    }

    // Right: discipline rules
    const rules = [
      { n: "1", head: "Keep it under 300 lines",  color: C.accent, body: "Longer files are read but not absorbed. Move task-specific standards to referenced docs loaded just-in-time." },
      { n: "2", head: "Version-control as code",   color: C.teal,   body: "Every change through PR review. A DoD change is a policy change — it deserves the same scrutiny as a code change." },
      { n: "3", head: "Universal rules only",      color: C.green,  body: "Only what is true for every session. Task-specific guidance goes in referenced documents." },
    ];

    for (let i = 0; i < rules.length; i++) {
      const r = rules[i];
      const y = 1.28 + i * 1.35;
      s.addShape(pres.shapes.RECTANGLE, { x: 5.88, y, w: 3.77, h: 1.22, fill: { color: C.offWhite }, shadow: shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x: 5.88, y, w: 0.06, h: 1.22, fill: { color: r.color } });
      s.addShape(pres.shapes.RECTANGLE, { x: 6.04, y: y + 0.16, w: 0.34, h: 0.34, fill: { color: r.color } });
      s.addText(r.n, { x: 6.04, y: y + 0.16, w: 0.34, h: 0.34, fontSize: 12, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
      s.addText(r.head, { x: 6.5, y: y + 0.1, w: 3.05, h: 0.3, fontSize: 12, color: C.navy, bold: true, margin: 0 });
      s.addText(r.body, { x: 6.5, y: y + 0.48, w: 3.05, h: 0.62, fontSize: 10.5, color: C.muted, margin: 0 });
    }
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 5 — Product Documentation Files
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.offWhite };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.82, fill: { color: C.navy } });
    s.addText("THE DOCUMENTATION LAYER  —  FOUR FILES, ONE COHERENT CONTEXT", { x: 0.4, y: 0, w: 9.2, h: 0.82, fontSize: 13, color: C.white, bold: true, charSpacing: 3, valign: "middle", margin: 0 });
    s.addText("Every repository — new or existing — needs this layer. The rules file tells the agent to use it.", { x: 0.4, y: 0.9, w: 9.2, h: 0.28, fontSize: 11.5, color: C.muted, italic: true, margin: 0 });

    const docs = [
      {
        icon: FaBook, color: C.accent, filename: "PRODUCT.md",
        label: "Vision & Goals",
        desc: "What the product is for, who uses it, and what it must never do. The agent reads this first, before any task.",
        bullets: ["Product purpose and primary users", "3–5 non-negotiables: what must never happen", "Current state and explicit out-of-scope", "Key stakeholders and approval contacts"],
      },
      {
        icon: FaClipboardList, color: C.teal, filename: "product-details.md",
        label: "Features & Requirements",
        desc: "How the product works. User personas, feature behaviour, integrations, and accepted trade-offs.",
        bullets: ["User personas and primary workflows", "Feature behaviour and edge cases", "Integration constraints and rate limits", "Known limitations and their trade-offs"],
      },
      {
        icon: FaCog, color: C.green, filename: "technical-details.md",
        label: "Architecture & Patterns",
        desc: "How the system is built. Components, patterns, tech choices, security model. What a new senior engineer reads in week one.",
        bullets: ["Architecture overview and bounded contexts", "Required patterns the agent must follow", "Technology choices and the reasons", "Security model and data classification"],
      },
      {
        icon: FaHistory, color: C.steel, filename: "adr/",
        label: "Decision Records",
        desc: "What was decided and why. The agent checks these before proposing architectural changes. Closed questions stay closed.",
        bullets: ["One file per architectural decision", "Status: Accepted / Deprecated / Superseded", "Alternatives considered and why rejected", "What is now explicitly prohibited"],
      },
    ];

    const cols = [0.35, 5.1];
    for (let i = 0; i < 4; i++) {
      const d = docs[i];
      const x = cols[i % 2], y = 1.28 + Math.floor(i / 2) * 2.0, w = 4.55, h = 1.85;
      const ic = await icon(d.icon, "#" + d.color);
      s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color: C.white }, shadow: shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.07, h, fill: { color: d.color } });
      s.addImage({ data: ic, x: x + 0.18, y: y + 0.2, w: 0.36, h: 0.36 });
      s.addShape(pres.shapes.RECTANGLE, { x: x + 0.65, y: y + 0.1, w: 2.0, h: 0.28, fill: { color: d.color, transparency: 85 } });
      s.addText(d.filename, { x: x + 0.68, y: y + 0.1, w: 2.0, h: 0.28, fontSize: 9, color: d.color, bold: true, fontFace: "Consolas", valign: "middle", margin: 0 });
      s.addText(d.label, { x: x + 2.78, y: y + 0.14, w: w - 2.9, h: 0.28, fontSize: 11, color: C.navy, bold: true, valign: "middle", margin: 0 });
      s.addText(d.desc, { x: x + 0.68, y: y + 0.46, w: w - 0.82, h: 0.52, fontSize: 9.5, color: C.muted, italic: true, margin: 0 });
      for (let j = 0; j < d.bullets.length; j++) {
        const by = y + 1.04 + j * 0.19;
        s.addShape(pres.shapes.RECTANGLE, { x: x + 0.7, y: by + 0.06, w: 0.07, h: 0.07, fill: { color: d.color } });
        s.addText(d.bullets[j], { x: x + 0.88, y: by, w: w - 1.0, h: 0.19, fontSize: 9.5, color: C.text, valign: "middle", margin: 0 });
      }
    }
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 6 — README.md: Generated and Auto-Updated
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.white };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.82, fill: { color: C.navy } });
    s.addText("README.md  —  GENERATED FROM CODE, KEPT CURRENT BY AGENTS", { x: 0.4, y: 0, w: 9.2, h: 0.82, fontSize: 13, color: C.white, bold: true, charSpacing: 3, valign: "middle", margin: 0 });
    s.addText("A README that is wrong is worse than no README. The agent that changes the architecture also updates the README.", { x: 0.4, y: 0.9, w: 9.2, h: 0.28, fontSize: 11.5, color: C.muted, italic: true, margin: 0 });

    // Left: README sections
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 1.28, w: 4.55, h: 3.98, fill: { color: C.offWhite }, shadow: shadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 1.28, w: 4.55, h: 0.38, fill: { color: C.navy } });
    s.addText("WHAT A GOOD README CONTAINS", { x: 0.35, y: 1.28, w: 4.55, h: 0.38, fontSize: 10.5, color: C.white, bold: true, charSpacing: 2, align: "center", valign: "middle", margin: 0 });

    const readmeSections = [
      { section: "What This Does",       source: "generated from PRODUCT.md",            color: C.accent },
      { section: "Getting Started",      source: "verified by agent on each update",      color: C.teal },
      { section: "Architecture Overview", source: "generated from technical-details.md", color: C.green },
      { section: "Key Documentation",    source: "links to the full doc layer",           color: C.teal },
      { section: "Development",          source: "how to test, CI, contribution",         color: C.steel },
    ];
    for (let i = 0; i < readmeSections.length; i++) {
      const rs = readmeSections[i];
      const y = 1.76 + i * 0.72;
      s.addShape(pres.shapes.RECTANGLE, { x: 0.48, y, w: 4.28, h: 0.6, fill: { color: C.white }, shadow: shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x: 0.48, y, w: 0.06, h: 0.6, fill: { color: rs.color } });
      s.addText(rs.section, { x: 0.66, y: y + 0.04, w: 2.0, h: 0.26, fontSize: 11, color: C.navy, bold: true, margin: 0 });
      s.addText("→ " + rs.source, { x: 0.66, y: y + 0.32, w: 3.95, h: 0.22, fontSize: 9.5, color: C.muted, italic: true, margin: 0 });
    }

    // Right top: update when
    s.addShape(pres.shapes.RECTANGLE, { x: 5.1, y: 1.28, w: 4.55, h: 1.82, fill: { color: C.offWhite }, shadow: shadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: 5.1, y: 1.28, w: 4.55, h: 0.38, fill: { color: C.green, transparency: 20 } });
    s.addText("UPDATE README WHEN…", { x: 5.18, y: 1.28, w: 4.4, h: 0.38, fontSize: 10.5, color: C.navy, bold: true, charSpacing: 1, valign: "middle", margin: 0 });
    const updateWhen = [
      "A new component or service is added",
      "The tech stack changes",
      "The architecture boundary shifts",
      "The getting-started steps change",
    ];
    for (let i = 0; i < updateWhen.length; i++) {
      const y = 1.74 + i * 0.3;
      s.addShape(pres.shapes.RECTANGLE, { x: 5.22, y: y + 0.08, w: 0.09, h: 0.09, fill: { color: C.green } });
      s.addText(updateWhen[i], { x: 5.42, y, w: 4.1, h: 0.3, fontSize: 10.5, color: C.text, valign: "middle", margin: 0 });
    }

    // Right bottom: no separate doc PRs
    s.addShape(pres.shapes.RECTANGLE, { x: 5.1, y: 3.22, w: 4.55, h: 1.82, fill: { color: C.offWhite }, shadow: shadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: 5.1, y: 3.22, w: 4.55, h: 0.38, fill: { color: C.red, transparency: 30 } });
    s.addText("DO NOT CREATE SEPARATE DOC PRs", { x: 5.18, y: 3.22, w: 4.4, h: 0.38, fontSize: 10.5, color: C.navy, bold: true, charSpacing: 1, valign: "middle", margin: 0 });
    const noSeparate = [
      "Docs update in the same PR as code",
      "Reviewer checks accuracy, not just presence",
      "Never a separate docs sprint — that is drift",
      "If docs need updating: update them now",
    ];
    for (let i = 0; i < noSeparate.length; i++) {
      const y = 3.68 + i * 0.3;
      s.addShape(pres.shapes.RECTANGLE, { x: 5.22, y: y + 0.08, w: 0.09, h: 0.09, fill: { color: C.amber } });
      s.addText(noSeparate[i], { x: 5.42, y, w: 4.1, h: 0.3, fontSize: 10.5, color: C.text, valign: "middle", margin: 0 });
    }
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 7 — Architecture Decision Records
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.navy };

    s.addText("ARCHITECTURE DECISION RECORDS  —  WHAT THE AGENT MUST NOT UNDO", { x: 0.4, y: 0.22, w: 9.2, h: 0.45, fontSize: 13, color: C.iceBlue, bold: true, charSpacing: 3, margin: 0 });

    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 0.8, w: 9.3, h: 0.75, fill: { color: C.mid, transparency: 18 }, shadow: shadow() });
    s.addText("An agent that doesn't know about ADR-012 will see the Redis session code and consider migrating it back to the database.\nIt doesn't know this was settled. Without the ADR, it makes a confident, plausible, and expensive mistake.", {
      x: 0.6, y: 0.84, w: 8.8, h: 0.65,
      fontSize: 12, color: C.pale, italic: true, align: "center", valign: "middle", margin: 0
    });

    // ADR template left
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 1.68, w: 4.7, h: 3.64, fill: { color: C.mid, transparency: 25 }, shadow: shadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 1.68, w: 4.7, h: 0.38, fill: { color: C.accent } });
    s.addText("ADR TEMPLATE", { x: 0.35, y: 1.68, w: 4.7, h: 0.38, fontSize: 11, color: C.white, bold: true, charSpacing: 2, align: "center", valign: "middle", margin: 0 });

    const adrLines = [
      { text: "# ADR-[n]: Short Title", bold: true, color: C.iceBlue },
      { text: "Status: Accepted | Deprecated | Superseded", bold: false, color: C.muted },
      { text: "", bold: false, color: C.pale },
      { text: "## Context", bold: true, color: C.teal },
      { text: "What situation forced this decision?", bold: false, color: C.pale },
      { text: "", bold: false, color: C.pale },
      { text: "## Decision", bold: true, color: C.teal },
      { text: "What was chosen and why?", bold: false, color: C.pale },
      { text: "", bold: false, color: C.pale },
      { text: "## Alternatives Considered", bold: true, color: C.teal },
      { text: "What was rejected and why?", bold: false, color: C.pale },
      { text: "", bold: false, color: C.pale },
      { text: "## Consequences", bold: true, color: C.teal },
      { text: "What is now easier? What is prohibited?", bold: false, color: C.pale },
      { text: "", bold: false, color: C.pale },
      { text: "## Review Trigger", bold: true, color: C.teal },
      { text: "When should this be revisited?", bold: false, color: C.pale },
    ];

    s.addShape(pres.shapes.RECTANGLE, { x: 0.45, y: 2.12, w: 4.5, h: 3.12, fill: { color: C.navy } });
    for (let i = 0; i < adrLines.length; i++) {
      const al = adrLines[i];
      s.addText(al.text, {
        x: 0.6, y: 2.16 + i * 0.177, w: 4.2, h: 0.18,
        fontSize: 8.5, color: al.color, bold: al.bold,
        fontFace: "Consolas", margin: 0
      });
    }

    // Right: discipline rules
    const adrRules = [
      { icon: FaDatabase, color: C.teal,   head: "Store in adr/ folder",     body: "Version-controlled alongside the code. Referenced from the rules file so the agent always checks them." },
      { icon: FaHistory,  color: C.green,  head: "Never delete — deprecate", body: "Superseded ADRs link forward to the replacement. The history of why matters as much as the decision itself." },
      { icon: FaWrench,   color: C.amber,  head: "One decision per ADR",     body: "Compound decisions are harder to read and harder to reference. Keep them atomic." },
      { icon: FaCheck,    color: C.accent, head: "Agent-assisted drafting",  body: "Discuss the decision. Agent drafts the ADR. Team reviews and merges. Minutes not hours." },
    ];

    for (let i = 0; i < adrRules.length; i++) {
      const r = adrRules[i];
      const y = 1.68 + i * 0.9;
      const ic = await icon(r.icon, "#" + r.color);
      s.addShape(pres.shapes.RECTANGLE, { x: 5.32, y, w: 4.33, h: 0.8, fill: { color: C.mid, transparency: 15 }, shadow: shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x: 5.32, y, w: 0.06, h: 0.8, fill: { color: r.color } });
      s.addImage({ data: ic, x: 5.46, y: y + 0.18, w: 0.34, h: 0.34 });
      s.addText(r.head, { x: 5.9, y: y + 0.06, w: 3.62, h: 0.28, fontSize: 11.5, color: r.color, bold: true, margin: 0 });
      s.addText(r.body, { x: 5.9, y: y + 0.38, w: 3.62, h: 0.36, fontSize: 10, color: C.pale, margin: 0 });
    }
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 8 — The Brownfield Pattern
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.offWhite };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.82, fill: { color: C.navy } });
    s.addText("THE BROWNFIELD PATTERN  —  RETROFITTING EXISTING REPOSITORIES", { x: 0.4, y: 0, w: 9.2, h: 0.82, fontSize: 13, color: C.white, bold: true, charSpacing: 3, valign: "middle", margin: 0 });
    s.addText("Don't write docs from memory. Generate them from the code, review them with the team, commit them.", { x: 0.4, y: 0.9, w: 9.2, h: 0.28, fontSize: 11.5, color: C.muted, italic: true, margin: 0 });

    // Horizontal pipeline steps
    const steps = [
      { n: "1", head: "Agent reads codebase",   color: C.accent, body: "Prompt the agent to read the entire repository and produce draft PRODUCT.md, product-details.md, and technical-details.md. Note confidence level for each claim." },
      { n: "2", head: "Team reviews",            color: C.teal,   body: "Correct wrong inferences. Add context the agent cannot see from code (business history, rejected alternatives, compliance context). Editing is faster than authoring." },
      { n: "3", head: "ADR generation",          color: C.green,  body: "Agent lists 5–10 architectural decisions inferred from the code. Team confirms or corrects. Agent drafts each ADR. Team fills in the alternatives considered sections." },
      { n: "4", head: "Commit with rules file",  color: C.steel,  body: "Documentation layer and rules file are committed together. From this point the agent has a context layer and instructions to maintain it." },
    ];

    for (let i = 0; i < steps.length; i++) {
      const st = steps[i];
      const x = 0.35 + i * 2.38;
      s.addShape(pres.shapes.RECTANGLE, { x, y: 1.28, w: 2.22, h: 3.9, fill: { color: C.white }, shadow: shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y: 1.28, w: 2.22, h: 0.5, fill: { color: st.color, transparency: 15 } });
      s.addShape(pres.shapes.RECTANGLE, { x: x + 0.08, y: 1.34, w: 0.38, h: 0.38, fill: { color: st.color } });
      s.addText(st.n, { x: x + 0.08, y: 1.34, w: 0.38, h: 0.38, fontSize: 14, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
      s.addText(st.head, { x: x + 0.54, y: 1.32, w: 1.6, h: 0.46, fontSize: 10.5, color: C.navy, bold: true, valign: "middle", margin: 0 });
      s.addText(st.body, { x: x + 0.12, y: 1.86, w: 2.0, h: 3.22, fontSize: 10, color: C.muted, margin: 0 });
      if (i < 3) {
        s.addText("→", { x: x + 2.22, y: 2.62, w: 0.16, h: 0.45, fontSize: 20, color: st.color, align: "center", valign: "middle", margin: 0 });
      }
    }

    // Time callout
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 5.28, w: 9.3, h: 0.28, fill: { color: C.navy, transparency: 85 } });
    s.addText("Typical timeline: 30–60 min agent generation  ·  half-day team review  ·  one PR to commit. Medium-complexity repo: 2–4 days total.", {
      x: 0.35, y: 5.28, w: 9.3, h: 0.28,
      fontSize: 10, color: C.text, italic: true, align: "center", valign: "middle", margin: 0
    });
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 9 — Auto-updating: Keeping Docs in Sync
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.navy };

    s.addText("AUTO-UPDATING DOCS  —  THE WORKFLOW THAT PREVENTS DRIFT", { x: 0.4, y: 0.22, w: 9.2, h: 0.45, fontSize: 13, color: C.iceBlue, bold: true, charSpacing: 3, margin: 0 });
    s.addText("The PR that changes the code also changes the docs. One review, both things.", { x: 0.4, y: 0.74, w: 9.2, h: 0.3, fontSize: 12, color: C.pale, italic: true, margin: 0 });

    // Workflow timeline
    const workflow = [
      { step: "Task received",       color: C.steel,  detail: "Agent receives a task via PRD or direct instruction" },
      { step: "Context loaded",      color: C.accent, detail: "Agent reads PRODUCT.md, technical-details.md, relevant ADRs" },
      { step: "Change implemented",  color: C.teal,   detail: "Agent writes code, tests, and verifies against Definition of Done" },
      { step: "Docs updated",        color: C.green,  detail: "Agent re-reads affected doc sections and updates them in the same branch" },
      { step: "PR raised",           color: C.amber,  detail: "PR includes code changes AND documentation updates. Reviewer validates accuracy." },
    ];

    for (let i = 0; i < workflow.length; i++) {
      const w = workflow[i];
      const y = 1.16 + i * 0.82;
      s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y, w: 9.3, h: 0.72, fill: { color: C.mid, transparency: i % 2 === 0 ? 18 : 35 } });
      s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y, w: 2.1, h: 0.72, fill: { color: w.color, transparency: 25 } });
      s.addText(w.step, { x: 0.5, y, w: 1.9, h: 0.72, fontSize: 11, color: C.white, bold: true, valign: "middle", margin: 0 });
      s.addText("→", { x: 2.5, y, w: 0.38, h: 0.72, fontSize: 18, color: w.color, align: "center", valign: "middle", margin: 0 });
      s.addText(w.detail, { x: 2.95, y, w: 6.55, h: 0.72, fontSize: 11, color: C.pale, valign: "middle", margin: 0 });
    }

    // Trigger callout
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 5.28, w: 9.3, h: 0.28, fill: { color: C.accent, transparency: 75 } });
    s.addText("Doc update triggers: new component  ·  changed interface  ·  new dependency  ·  architectural decision  ·  behaviour change", {
      x: 0.35, y: 5.28, w: 9.3, h: 0.28,
      fontSize: 10, color: C.white, italic: true, align: "center", valign: "middle", margin: 0
    });
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 10 — Enterprise Considerations
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.white };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.82, fill: { color: C.navy } });
    s.addText("ENTERPRISE CONSIDERATIONS  —  GOVERNANCE, COMPLIANCE, SCALE", { x: 0.4, y: 0, w: 9.2, h: 0.82, fontSize: 13, color: C.white, bold: true, charSpacing: 3, valign: "middle", margin: 0 });
    s.addText("Product documentation serves compliance, audit, and multi-repo consistency — not just individual agent sessions.", { x: 0.4, y: 0.9, w: 9.2, h: 0.28, fontSize: 11.5, color: C.muted, italic: true, margin: 0 });

    const enterpriseItems = [
      {
        icon: FaShieldAlt,    color: C.accent,
        head: "Baseline rules file",
        body: "Maintain a corporate-level baseline (security rules, data handling policy, approved tech) that all project rules files inherit. Project rules extend — they do not override the baseline. Owned by the platform or EA team.",
      },
      {
        icon: FaFileAlt,      color: C.teal,
        head: "Documentation as a compliance artefact",
        body: "In regulated industries, PRODUCT.md's non-negotiables and ADRs are evidence of what the team knew and intended. Store in source control — not a separate doc system — so they cannot be separated from the code they describe.",
      },
      {
        icon: FaDatabase,     color: C.green,
        head: "Multi-repo consistency",
        body: "Establish a documentation template owned by EA. All repositories use it as a starting point. This makes cross-repo agent sessions coherent: the agent finds the same doc structure in every repo it touches.",
      },
      {
        icon: FaWrench,       color: C.amber,
        head: "Stale documentation risk",
        body: "Inaccurate docs are worse than no docs. An agent with inaccurate context builds on false premises. Add a documentation accuracy check to your PR review checklist: does the documentation accurately reflect this change?",
      },
      {
        icon: FaCog,          color: C.steel,
        head: "Multi-agent concurrency",
        body: "Multiple agents working on the same repo read the same docs — consistent context, consistent decisions. Manage doc-section ownership during concurrent workstreams the same way you manage schema migrations.",
      },
      {
        icon: FaSync,         color: C.red,
        head: "Documentation debt is technical debt",
        body: "Teams that deferred ADRs and product docs encounter them now as a productivity tax. Every session an agent works without this layer costs human intervention to correct the inconsistency.",
      },
    ];

    const cols = [0.35, 5.1];
    for (let i = 0; i < enterpriseItems.length; i++) {
      const ei = enterpriseItems[i];
      const x = cols[i % 2], y = 1.28 + Math.floor(i / 2) * 1.38;
      const ic = await icon(ei.icon, "#" + ei.color);
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 4.55, h: 1.25, fill: { color: C.offWhite }, shadow: shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.07, h: 1.25, fill: { color: ei.color } });
      s.addImage({ data: ic, x: x + 0.18, y: y + 0.18, w: 0.32, h: 0.32 });
      s.addText(ei.head, { x: x + 0.62, y: y + 0.1, w: 3.78, h: 0.28, fontSize: 11.5, color: C.navy, bold: true, margin: 0 });
      s.addText(ei.body, { x: x + 0.62, y: y + 0.42, w: 3.78, h: 0.75, fontSize: 9.5, color: C.muted, margin: 0 });
    }
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 11 — Lab Exercise
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.white };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.82, fill: { color: C.navy } });
    s.addText("LAB EXERCISE", { x: 0.4, y: 0, w: 9.2, h: 0.82, fontSize: 13, color: C.white, bold: true, charSpacing: 3, valign: "middle", margin: 0 });
    s.addText("Build the documentation layer for a real repository — your codebase, a representative project, or the sample repo", { x: 0.4, y: 0.9, w: 9.2, h: 0.28, fontSize: 11.5, color: C.muted, italic: true, margin: 0 });

    const steps = [
      {
        n: "1", min: "10 min", color: C.accent,
        title: "Write a rules file",
        desc: "Write a CLAUDE.md with three required sections: (a) context loading — which docs to read before any task; (b) doc update requirements — when to update in the same PR; (c) ADR instructions — when to check adr/ before proposing a change. Swap with a neighbour: is the doc requirement unambiguous?"
      },
      {
        n: "2", min: "12 min", color: C.teal,
        title: "Generate a PRODUCT.md",
        desc: "Write one for a system you know well, or run: \"Read this repository and produce a draft PRODUCT.md covering: what the system does, who uses it, three non-negotiables, current state. Note confidence level for each claim.\" Review the output: what is correct, what needs revision, what is missing?"
      },
      {
        n: "3", min: "10 min", color: C.green,
        title: "Identify your top three ADRs",
        desc: "List the three architectural decisions in your system that an agent would be most likely to reverse or violate without knowing they had been made. For each: what is the decision, why was it made, and what would a well-intentioned agent get wrong without knowing it? These are your first three ADRs."
      },
      {
        n: "4", min: "8 min", color: C.steel,
        title: "Write a README update prompt",
        desc: "Write the exact prompt you would give an agent to generate an accurate README from your documentation layer. Be specific: which files to read first, what sections must appear, what to verify before writing. The quality of this prompt reveals how clearly you understand your own codebase."
      },
    ];

    for (let i = 0; i < steps.length; i++) {
      const st = steps[i];
      const y = 1.28 + i * 1.0;
      s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y, w: 9.3, h: 0.9, fill: { color: C.offWhite }, shadow: shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y, w: 0.52, h: 0.9, fill: { color: st.color } });
      s.addText(st.n, { x: 0.35, y, w: 0.52, h: 0.9, fontSize: 18, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
      s.addText(st.title, { x: 0.98, y: y + 0.04, w: 2.4, h: 0.3, fontSize: 12, color: C.navy, bold: true, margin: 0 });
      s.addShape(pres.shapes.RECTANGLE, { x: 0.98, y: y + 0.38, w: 0.75, h: 0.22, fill: { color: st.color, transparency: 80 } });
      s.addText(st.min, { x: 0.98, y: y + 0.38, w: 0.75, h: 0.22, fontSize: 10, color: st.color, bold: true, align: "center", valign: "middle", margin: 0 });
      s.addText(st.desc, { x: 1.86, y: y + 0.06, w: 7.68, h: 0.78, fontSize: 10, color: C.muted, valign: "middle", margin: 0 });
    }
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 12 — Discussion + Key Takeaways + Next Module
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.navy };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.72, fill: { color: C.mid } });
    s.addText("MODULE 04  —  DISCUSSION & KEY TAKEAWAYS", { x: 0.4, y: 0, w: 9.2, h: 0.72, fontSize: 13, color: C.white, bold: true, charSpacing: 3, valign: "middle", margin: 0 });

    // Left — discussion questions
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 0.88, w: 4.55, h: 4.28, fill: { color: C.mid, transparency: 18 }, shadow: shadow() });
    s.addText("DISCUSSION", { x: 0.55, y: 1.0, w: 3.5, h: 0.35, fontSize: 11, color: C.iceBlue, bold: true, charSpacing: 3, margin: 0 });

    const questions = [
      "If an agent joined your project today and read only the files in your repository, what would it get wrong? What context is missing that would prevent it from making a good architectural decision?",
      "What is the one architectural decision in your codebase that, if reversed by an agent, would take the longest to fix? Is there an ADR for it?",
      "Which of your team's implicit standards — the things everyone knows but nobody has written down — would surprise an agent? Which of those should be in the rules file?",
      "How would you know if a documentation update in a PR was inaccurate? What does your code review look like for a doc-heavy PR?",
    ];

    for (let i = 0; i < questions.length; i++) {
      const y = 1.46 + i * 0.94;
      s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y, w: 0.28, h: 0.28, fill: { color: C.accent } });
      s.addText("Q" + (i + 1), { x: 0.5, y, w: 0.28, h: 0.28, fontSize: 9, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
      s.addText(questions[i], { x: 0.9, y, w: 3.85, h: 0.84, fontSize: 10, color: C.pale, valign: "middle", margin: 0 });
    }

    // Right — key takeaways
    s.addShape(pres.shapes.RECTANGLE, { x: 5.1, y: 0.88, w: 4.55, h: 4.28, fill: { color: C.mid, transparency: 18 }, shadow: shadow() });
    s.addText("KEY TAKEAWAYS", { x: 5.3, y: 1.0, w: 3.5, h: 0.35, fontSize: 11, color: C.iceBlue, bold: true, charSpacing: 3, margin: 0 });

    const takeaways = [
      { color: C.accent, text: "Without product docs, every agent interaction starts from scratch. The agent reconstructs from code — incompletely." },
      { color: C.teal,   text: "The rules file must tell the agent to read product docs before any change and update them in the same PR." },
      { color: C.green,  text: "ADRs protect settled decisions. What is not written down does not exist for the agent." },
      { color: C.amber,  text: "The brownfield pattern: agent generates, team reviews, commits. A half-day produces a usable documentation layer." },
      { color: C.steel,  text: "Documentation debt is now technical debt. It has a direct, measurable impact on every agentic session." },
    ];

    for (let i = 0; i < takeaways.length; i++) {
      const t = takeaways[i];
      const y = 1.46 + i * 0.76;
      s.addShape(pres.shapes.RECTANGLE, { x: 5.25, y, w: 0.06, h: 0.65, fill: { color: t.color } });
      s.addText(t.text, { x: 5.42, y, w: 4.1, h: 0.65, fontSize: 10.5, color: C.pale, valign: "middle", margin: 0 });
    }

    // Next module banner
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.3, w: 10, h: 0.325, fill: { color: C.accent } });
    s.addText("NEXT  ·  Module 05: Automated Testing  —  TDD, test coverage, agents as test generators, E2E strategy", {
      x: 0.4, y: 5.3, w: 9.2, h: 0.325,
      fontSize: 11, color: C.white, bold: true, valign: "middle", margin: 0
    });
  }

  await pres.writeFile({ fileName: "Module_04_Product_Documentation.pptx" });
  console.log("✅ Module 4 written");
}

build().catch(console.error);
