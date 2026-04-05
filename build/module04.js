const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const {
  FaFileContract, FaClipboardList, FaCheckDouble, FaExchangeAlt,
  FaRoute, FaUserCheck, FaBan, FaExclamationTriangle,
  FaCode, FaSearch, FaTasks, FaCodeBranch, FaLightbulb, FaTools
} = require("react-icons/fa");

// ─── Corporate Slate Palette ──────────────────────────────────────────────────
const C = {
  navy:    "1C3557",
  iceBlue: "5B8DB8",
  pale:    "D4E4F0",
  white:   "FFFFFF",
  offWhite:"F3F6F9",
  accent:  "3A7DC9",
  teal:    "4A7FA8",
  mid:     "2E5073",
  text:    "1E2D3D",
  muted:   "7A90A8",
  green:   "3A7E6E",
  steel:   "8096B0",
  red:     "B03040",
};

const shadow = () => ({ type: "outer", color: "000000", blur: 8, offset: 3, angle: 135, opacity: 0.13 });

async function icon(Component, color = "#FFFFFF", size = 256) {
  const svg = ReactDOMServer.renderToStaticMarkup(React.createElement(Component, { color, size: String(size) }));
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}

async function build() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.title  = "Module 4: Spec-Driven Development & PRDs";
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

    s.addText("Spec-Driven\nDevelopment\n& PRDs", { x: 0.4, y: 1.32, w: 6.8, h: 2.15, fontSize: 44, color: C.white, bold: true, margin: 0 });
    s.addText("Writing requirements that agents can actually execute", { x: 0.4, y: 3.55, w: 7.0, h: 0.5, fontSize: 18, color: C.iceBlue, italic: true, margin: 0 });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 4.18, w: 3.5, h: 0.04, fill: { color: C.accent } });
    s.addText([
      { text: "Duration: ", options: { bold: true, color: C.muted } },
      { text: "75–90 min  ", options: { color: C.muted } },
      { text: "  |  ", options: { color: C.muted } },
      { text: "Level: ", options: { bold: true, color: C.muted } },
      { text: "Intermediate", options: { color: C.muted } }
    ], { x: 0.4, y: 4.35, w: 5, h: 0.38, fontSize: 13, margin: 0 });

    // Right: Intent → Spec → Code flow
    const rx = 7.5;
    const steps = [
      { label: "Intent", sub: "What we want", color: C.steel },
      { label: "Spec",   sub: "Precise contract", color: C.accent },
      { label: "Plan",   sub: "How to build it", color: C.teal },
      { label: "Code",   sub: "Agent executes", color: C.green },
    ];
    steps.forEach((st, i) => {
      const y = 0.75 + i * 1.18;
      s.addShape(pres.shapes.RECTANGLE, { x: rx, y, w: 2.15, h: 0.85, fill: { color: st.color, transparency: i === 1 ? 0 : 20 }, shadow: shadow() });
      s.addText(st.label, { x: rx, y, w: 2.15, h: 0.48, fontSize: 16, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
      s.addText(st.sub,   { x: rx, y: y + 0.48, w: 2.15, h: 0.34, fontSize: 10, color: C.pale, align: "center", margin: 0 });
      if (i < steps.length - 1) {
        s.addText("\u2193", { x: rx + 0.8, y: y + 0.88, w: 0.55, h: 0.28, fontSize: 16, color: C.muted, align: "center", margin: 0 });
      }
    });
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
      { icon: FaExchangeAlt,   color: C.accent, title: "Distinguish PRD from Spec",     body: "Articulate why a Product Requirements Doc is not the same as an agent-executable specification, and when you need each." },
      { icon: FaRoute,         color: C.teal,   title: "Apply the SDD Workflow",        body: "Walk the full loop: Requirements \u2192 Plan \u2192 Tasks \u2192 Implementation \u2192 Verification, with agents at each step." },
      { icon: FaCheckDouble,   color: C.green,  title: "Write Acceptance Criteria",     body: "Define concrete, verifiable conditions that give agents a clear completion target and prevent scope creep." },
      { icon: FaUserCheck,     color: C.steel,  title: "Design Review Cycles",          body: "Build human review gates into the spec process so agents and humans stay aligned through implementation." },
    ];

    const cols = [0.35, 5.1];
    for (let i = 0; i < 4; i++) {
      const x = cols[i % 2], y = 1.28 + Math.floor(i / 2) * 2.0, w = 4.55, h = 1.82;
      const o = objs[i];
      s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color: C.white }, shadow: shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.07, h, fill: { color: o.color } });
      const ic = await icon(o.icon, "#" + o.color);
      s.addImage({ data: ic, x: x + 0.18, y: y + 0.22, w: 0.4, h: 0.4 });
      s.addText(o.title, { x: x + 0.7, y: y + 0.18, w: w - 0.85, h: 0.42, fontSize: 13, color: C.navy, bold: true, margin: 0 });
      s.addText(o.body,  { x: x + 0.7, y: y + 0.64, w: w - 0.85, h: 1.05, fontSize: 11.5, color: C.muted, margin: 0 });
    }
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 3 — The Specification Problem
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.navy };

    s.addText("THE SPECIFICATION PROBLEM", { x: 0.4, y: 0.22, w: 9, h: 0.45, fontSize: 13, color: C.iceBlue, bold: true, charSpacing: 3, margin: 0 });

    // Opening quote
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 0.82, w: 9.3, h: 1.1, fill: { color: C.mid, transparency: 18 }, shadow: shadow() });
    s.addText(
      "\u201CThe specification becomes the source of truth and determines what gets built.\u201D\n\u2014 GitHub Engineering, September 2025  \u00B7  90% of Fortune 100 companies have adopted agentic coding",
      { x: 0.55, y: 0.88, w: 9.0, h: 0.98, fontSize: 14.5, color: C.white, italic: true, align: "center", valign: "middle", margin: 0 }
    );

    const panels = [
      {
        head: "The Old World (PRD era)",
        color: C.steel,
        points: [
          "PRD is a negotiated human-to-human alignment document",
          "Engineers read it, interpret it, ask questions, push back",
          "Ambiguity is resolved in meetings and Slack threads",
          "The PRD captures intent \u2014 humans translate intent to code",
        ]
      },
      {
        head: "The New World (Agent era)",
        color: C.accent,
        points: [
          "Agents cannot ask clarifying questions mid-task",
          "Ambiguity is resolved by the agent \u2014 usually wrong",
          "Omission is not scope reduction \u2014 agents infer from gaps",
          "Agents need a programming interface, not an alignment doc",
        ]
      },
    ];

    panels.forEach((p, col) => {
      const x = col === 0 ? 0.35 : 5.15, y = 2.08, w = 4.6;
      s.addShape(pres.shapes.RECTANGLE, { x, y, w, h: 3.3, fill: { color: C.mid, transparency: 18 }, shadow: shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y, w, h: 0.48, fill: { color: p.color, transparency: 10 } });
      s.addText(p.head, { x, y, w, h: 0.48, fontSize: 13, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
      p.points.forEach((pt, j) => {
        const icon = col === 0 ? "\u2715" : "\u2713";
        const ic = col === 0 ? C.steel : C.accent;
        s.addText(icon, { x: x + 0.15, y: y + 0.6 + j * 0.64, w: 0.28, h: 0.52, fontSize: 14, color: ic, bold: true, valign: "middle", margin: 0 });
        s.addText(pt, { x: x + 0.5, y: y + 0.6 + j * 0.64, w: w - 0.62, h: 0.52, fontSize: 11, color: C.pale, valign: "middle", margin: 0 });
      });
    });

    s.addText("Two-thirds of developers cite frustration with \u201CAI solutions that are almost right, but not quite.\u201D This is a specification problem, not a capability problem.  \u2014 Stack Overflow 2025", {
      x: 0.35, y: 5.3, w: 9.3, h: 0.26, fontSize: 9.5, color: C.muted, italic: true, margin: 0
    });
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 4 — PRD vs Spec: The Critical Distinction
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.white };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.82, fill: { color: C.navy } });
    s.addText("PRD vs. SPEC  \u2014  THE CRITICAL DISTINCTION", { x: 0.4, y: 0, w: 9, h: 0.82, fontSize: 13, color: C.white, bold: true, charSpacing: 3, valign: "middle", margin: 0 });

    // Comparison table - manual rows
    const headers = ["Dimension", "PRD", "Specification (SDD)"];
    const hColors = [C.pale, "D6E8FB", "D0EDE5"];
    const hTextColors = [C.navy, C.navy, C.teal];
    const colX = [0.35, 2.85, 6.35];
    const colW = [2.4, 3.4, 3.3];

    headers.forEach((h, ci) => {
      s.addShape(pres.shapes.RECTANGLE, { x: colX[ci], y: 0.9, w: colW[ci], h: 0.48, fill: { color: hColors[ci] } });
      s.addText(h, { x: colX[ci] + 0.1, y: 0.9, w: colW[ci] - 0.1, h: 0.48, fontSize: 12, color: hTextColors[ci], bold: true, valign: "middle", charSpacing: ci === 0 ? 2 : 0, margin: 0 });
    });

    const rows = [
      ["Purpose",       "Align stakeholders on goals",         "Give the agent an executable contract"],
      ["Audience",      "Humans who interpret and push back",   "Agents that execute literally"],
      ["Ambiguity",     "Resolved in meetings/Slack",          "Must be eliminated upfront"],
      ["Format",        "Prose, user stories, mockups",        "I/O contracts, preconditions, invariants"],
      ["Non-goals",     "Implied by omission",                 "Stated explicitly and positively"],
      ["Scope control", "Negotiated at standup",               "Enforced by AC — agent stops at criteria"],
      ["Edge cases",    "Handled ad-hoc by engineers",         "Specified or agent invents the answer"],
    ];

    rows.forEach((row, ri) => {
      const y = 1.44 + ri * 0.555;
      const bg = ri % 2 === 0 ? C.white : C.offWhite;
      s.addShape(pres.shapes.RECTANGLE, { x: colX[0], y, w: colW[0], h: 0.52, fill: { color: C.pale } });
      s.addShape(pres.shapes.RECTANGLE, { x: colX[1], y, w: colW[1], h: 0.52, fill: { color: bg } });
      s.addShape(pres.shapes.RECTANGLE, { x: colX[2], y, w: colW[2], h: 0.52, fill: { color: bg } });
      s.addShape(pres.shapes.LINE, { x: colX[0], y: y + 0.52, w: colW[0] + colW[1] + colW[2], h: 0, line: { color: "C8D5E3", width: 0.5 } });
      s.addText(row[0], { x: colX[0] + 0.1, y, w: colW[0] - 0.14, h: 0.52, fontSize: 12, color: C.navy, bold: true, valign: "middle", margin: 0 });
      s.addText(row[1], { x: colX[1] + 0.1, y, w: colW[1] - 0.14, h: 0.52, fontSize: 11.5, color: C.muted, valign: "middle", margin: 0 });
      s.addText(row[2], { x: colX[2] + 0.1, y, w: colW[2] - 0.14, h: 0.52, fontSize: 11.5, color: C.text, valign: "middle", margin: 0 });
    });

    s.addText("In practice, blend both: PRD captures the \u2018why\u2019 (user-centric context), Spec defines the \u2018what\u2019 (precise external behaviour). Neither alone is enough.", {
      x: 0.35, y: 5.33, w: 9.3, h: 0.26, fontSize: 10, color: C.muted, italic: true, margin: 0
    });
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 5 — The SDD Workflow
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.offWhite };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.82, fill: { color: C.teal } });
    s.addText("THE SDD WORKFLOW", { x: 0.4, y: 0, w: 9, h: 0.82, fontSize: 13, color: C.white, bold: true, charSpacing: 3, valign: "middle", margin: 0 });
    s.addText("Separating planning from implementation is the single most impactful practice in agentic development", { x: 0.4, y: 0.9, w: 9.2, h: 0.3, fontSize: 12, color: C.muted, italic: true, margin: 0 });

    const phases = [
      {
        n: "01", label: "Requirements\nrequirements.md", color: C.navy,
        who: "PM + Architect",
        what: [
          "High-level goals, not implementation",
          "User-centric: who benefits and why",
          "Domain language, not tech terms",
          "Explicit non-goals stated positively",
        ],
        tool: "requirements.md in repo root"
      },
      {
        n: "02", label: "Planning\nplan.md", color: C.teal,
        who: "Agent + Human review",
        what: [
          "Agent reads requirements, thinks first",
          "Proposes approach, dependencies, risks",
          "Human reviews plan BEFORE any code",
          "\u201CAsk agent to think, not code\u201D \u2014 JetBrains",
        ],
        tool: "plan.md \u2014 agent-generated, human-approved"
      },
      {
        n: "03", label: "Tasks\ntasks.md", color: C.accent,
        who: "Agent + Human verify",
        what: [
          "Atomic, ordered implementation steps",
          "Each task has clear entry/exit criteria",
          "Sequenced to enable incremental review",
          "Maps to tests and acceptance criteria",
        ],
        tool: "tasks.md with checkboxes \u2014 agent tracks progress"
      },
      {
        n: "04", label: "Implement\n+ Verify", color: C.green,
        who: "Agent codes, Human reviews",
        what: [
          "Agent executes one task at a time",
          "Verifiers run after each task",
          "Human reviews diff at each milestone",
          "Spec stays in context throughout",
        ],
        tool: "PR per milestone \u2014 agent opens, human merges"
      },
    ];

    phases.forEach((ph, i) => {
      const x = 0.35 + i * 2.38, y = 1.3;
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 2.2, h: 4.1, fill: { color: C.white }, shadow: shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 2.2, h: 0.7, fill: { color: ph.color } });
      s.addText(ph.n, { x, y, w: 0.52, h: 0.7, fontSize: 20, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
      s.addText(ph.label, { x: x + 0.55, y, w: 1.6, h: 0.7, fontSize: 11, color: C.white, bold: true, valign: "middle", margin: 0 });

      s.addText("WHO", { x: x + 0.1, y: y + 0.76, w: 2.0, h: 0.22, fontSize: 8.5, color: ph.color, bold: true, charSpacing: 2, margin: 0 });
      s.addText(ph.who, { x: x + 0.1, y: y + 0.98, w: 2.0, h: 0.32, fontSize: 10.5, color: C.muted, italic: true, margin: 0 });

      s.addText("WHAT", { x: x + 0.1, y: y + 1.36, w: 2.0, h: 0.22, fontSize: 8.5, color: ph.color, bold: true, charSpacing: 2, margin: 0 });
      ph.what.forEach((w, j) => {
        s.addText(`\u2022 ${w}`, { x: x + 0.1, y: y + 1.58 + j * 0.42, w: 2.0, h: 0.38, fontSize: 10, color: C.text, margin: 0 });
      });

      s.addShape(pres.shapes.RECTANGLE, { x: x + 0.08, y: y + 3.42, w: 2.04, h: 0.52, fill: { color: ph.color, transparency: 88 } });
      s.addText(ph.tool, { x: x + 0.14, y: y + 3.46, w: 1.92, h: 0.44, fontSize: 9, color: ph.color, italic: true, margin: 0 });

      if (i < phases.length - 1) {
        s.addText("\u2192", { x: x + 2.2, y: y + 1.55, w: 0.18, h: 0.45, fontSize: 18, color: C.muted, align: "center", margin: 0 });
      }
    });
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 6 — Writing a Spec Agents Can Execute
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.white };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.82, fill: { color: C.navy } });
    s.addText("WRITING A SPEC AGENTS CAN EXECUTE", { x: 0.4, y: 0, w: 9, h: 0.82, fontSize: 13, color: C.white, bold: true, charSpacing: 3, valign: "middle", margin: 0 });
    s.addText("A specification defines external behaviour \u2014 not just what the business wants, but what the system does", { x: 0.4, y: 0.9, w: 9.2, h: 0.3, fontSize: 12, color: C.muted, italic: true, margin: 0 });

    // Left: anatomy of a good spec section
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 1.28, w: 4.55, h: 4.1, fill: { color: C.offWhite }, shadow: shadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 1.28, w: 4.55, h: 0.42, fill: { color: C.navy } });
    s.addText("SPEC SECTION ANATOMY", { x: 0.35, y: 1.28, w: 4.55, h: 0.42, fontSize: 11, color: C.white, bold: true, charSpacing: 2, align: "center", valign: "middle", margin: 0 });

    const anatomy = [
      { label: "Feature Name",          desc: "Short, domain-oriented noun phrase. Not tech-bound." },
      { label: "User Story",            desc: "As a [user], I want [outcome] so that [reason]." },
      { label: "Preconditions",         desc: "What must be true for this feature to activate." },
      { label: "Input/Output Contract", desc: "Exact inputs, outputs, and transformations. No ambiguity." },
      { label: "Acceptance Criteria",   desc: "Concrete, verifiable conditions. See slide 7." },
      { label: "Non-Goals",             desc: "What this feature explicitly does NOT do. Stated positively." },
      { label: "Edge Cases",            desc: "What happens in the 10 non-happy-path scenarios." },
    ];

    anatomy.forEach((a, i) => {
      const y = 1.82 + i * 0.5;
      s.addShape(pres.shapes.RECTANGLE, { x: 0.47, y, w: 4.3, h: 0.44, fill: { color: i % 2 === 0 ? C.white : C.offWhite } });
      s.addText(a.label, { x: 0.55, y, w: 1.52, h: 0.44, fontSize: 11.5, color: C.accent, bold: true, valign: "middle", margin: 0 });
      s.addText(a.desc,  { x: 2.1,  y, w: 2.55, h: 0.44, fontSize: 10.5, color: C.muted,  valign: "middle", margin: 0 });
    });

    // Right: good vs bad examples
    s.addShape(pres.shapes.RECTANGLE, { x: 5.1, y: 1.28, w: 4.55, h: 4.1, fill: { color: C.offWhite }, shadow: shadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: 5.1, y: 1.28, w: 4.55, h: 0.42, fill: { color: C.navy } });
    s.addText("GOOD vs. BAD", { x: 5.1, y: 1.28, w: 4.55, h: 0.42, fontSize: 11, color: C.white, bold: true, charSpacing: 2, align: "center", valign: "middle", margin: 0 });

    const examples = [
      {
        bad:  "Users should be able to create boards.",
        good: "WHEN a user submits a board name (3\u201364 chars, unique per workspace), the system SHALL create a board and return its ID within 200ms.",
        label: "Feature Description"
      },
      {
        bad:  "Handle errors gracefully.",
        good: "WHEN a board name already exists in the workspace, the system SHALL return HTTP 409 with error code BOARD_NAME_CONFLICT.",
        label: "Error Handling"
      },
      {
        bad:  "Don\u2019t add authentication in this phase.",
        good: "Non-goal: This feature does not implement board-level permission controls. All workspace members can see all boards.",
        label: "Non-Goals"
      },
    ];

    examples.forEach((ex, i) => {
      const y = 1.82 + i * 1.18;
      s.addText(ex.label, { x: 5.22, y, w: 4.3, h: 0.26, fontSize: 10, color: C.steel, bold: true, charSpacing: 1, margin: 0 });
      s.addShape(pres.shapes.RECTANGLE, { x: 5.22, y: y + 0.26, w: 4.3, h: 0.4, fill: { color: "F8E8E8" } });
      s.addText(`\u2717  ${ex.bad}`, { x: 5.3, y: y + 0.26, w: 4.14, h: 0.4, fontSize: 10, color: C.red, valign: "middle", margin: 0 });
      s.addShape(pres.shapes.RECTANGLE, { x: 5.22, y: y + 0.68, w: 4.3, h: 0.44, fill: { color: "E8F4EC" } });
      s.addText(`\u2713  ${ex.good}`, { x: 5.3, y: y + 0.68, w: 4.14, h: 0.44, fontSize: 9.5, color: C.green, valign: "middle", margin: 0 });
    });
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 7 — Acceptance Criteria: The Agent's Finish Line
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.navy };

    s.addText("ACCEPTANCE CRITERIA  \u2014  THE AGENT\u2019S FINISH LINE", { x: 0.4, y: 0.22, w: 9, h: 0.45, fontSize: 13, color: C.iceBlue, bold: true, charSpacing: 3, margin: 0 });
    s.addText("Without AC, \u201Cdone\u201D is whatever the agent decides it is", { x: 0.4, y: 0.72, w: 9, h: 0.36, fontSize: 17, color: C.white, italic: true, margin: 0 });

    // Why AC matters
    const whys = [
      { head: "Concrete completion target",  body: "Agent knows exactly when to stop. No more endless refinement or premature termination." },
      { head: "Prevents scope creep",        body: "Agent cannot add auth, logging, or tests you didn\u2019t ask for if AC doesn\u2019t mention them." },
      { head: "Generates test cases",        body: "Every AC becomes a test. If you write AC before implementation, tests write themselves." },
      { head: "Enables verification loops",  body: "The Verifier and Judge LLM check output against AC automatically before opening a PR." },
    ];

    whys.forEach((w, i) => {
      const col = i % 2, row = Math.floor(i / 2);
      const x = col === 0 ? 0.35 : 5.15, y = 1.28 + row * 1.0;
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 4.6, h: 0.88, fill: { color: C.mid, transparency: 18 } });
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.06, h: 0.88, fill: { color: C.accent } });
      s.addText(w.head, { x: x + 0.16, y: y + 0.08, w: 4.3, h: 0.3, fontSize: 12.5, color: C.accent, bold: true, margin: 0 });
      s.addText(w.body, { x: x + 0.16, y: y + 0.42, w: 4.3, h: 0.38, fontSize: 11, color: C.pale, margin: 0 });
    });

    // Formats
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 3.42, w: 9.3, h: 0.36, fill: { color: C.mid, transparency: 10 } });
    s.addText("TWO AC FORMATS THAT WORK WELL WITH AGENTS", { x: 0.35, y: 3.42, w: 9.3, h: 0.36, fontSize: 11, color: C.iceBlue, bold: true, charSpacing: 2, align: "center", valign: "middle", margin: 0 });

    // Given/When/Then
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 3.85, w: 4.55, h: 1.55, fill: { color: C.mid, transparency: 18 } });
    s.addText("Given / When / Then  (BDD style)", { x: 0.45, y: 3.88, w: 4.35, h: 0.3, fontSize: 11, color: C.teal, bold: true, margin: 0 });
    s.addText(
      "Given: a board name that already exists in the workspace\nWhen: a user submits a create board request with that name\nThen: the API returns HTTP 409 with BOARD_NAME_CONFLICT\nAnd: no new board is created in the database",
      { x: 0.45, y: 4.22, w: 4.35, h: 1.1, fontSize: 10.5, color: C.pale, fontFace: "Consolas", margin: 0 }
    );

    // EARS
    s.addShape(pres.shapes.RECTANGLE, { x: 5.1, y: 3.85, w: 4.55, h: 1.55, fill: { color: C.mid, transparency: 18 } });
    s.addText("EARS notation  (system-level constraints)", { x: 5.2, y: 3.88, w: 4.35, h: 0.3, fontSize: 11, color: C.teal, bold: true, margin: 0 });
    s.addText(
      "WHEN a user submits a board name,\nthe SYSTEM SHALL create the board within 200ms.\n\nWHEN the name contains > 64 chars,\nthe SYSTEM SHALL reject with HTTP 422.",
      { x: 5.2, y: 4.22, w: 4.35, h: 1.1, fontSize: 10.5, color: C.pale, fontFace: "Consolas", margin: 0 }
    );
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 8 — The Research-Plan-Implement Pattern
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.offWhite };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.82, fill: { color: C.navy } });
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.35, h: 0.82, fill: { color: C.accent } });
    s.addText("RESEARCH \u2192 PLAN \u2192 IMPLEMENT  \u00B7  Dex Horthy, HumanLayer", { x: 0.55, y: 0, w: 9.1, h: 0.82, fontSize: 12, color: C.white, bold: true, charSpacing: 2, valign: "middle", margin: 0 });
    s.addText("\u201CAsk agents to think before coding\u201D \u2014 the single practice that most improves agent output quality", { x: 0.4, y: 0.9, w: 9.2, h: 0.3, fontSize: 12, color: C.muted, italic: true, margin: 0 });

    const phases = [
      {
        phase: "RESEARCH", color: C.navy, icon: FaSearch,
        steps: [
          "Agent reads requirements.md and any referenced docs",
          "Agent searches codebase for relevant patterns",
          "Agent identifies existing implementations to reuse or extend",
          "Agent flags knowledge gaps or ambiguous requirements",
          "Human reviews research summary before proceeding",
        ],
        warning: "Don\u2019t skip this phase. Agents that skip research hallucinate dependencies and ignore existing patterns."
      },
      {
        phase: "PLAN", color: C.teal, icon: FaClipboardList,
        steps: [
          "Agent produces detailed plan.md \u2014 not code",
          "Plan covers: approach, file changes, dependencies, risks",
          "Human reviews plan and approves or redirects",
          "\u201CEnable Think More to force careful reasoning\u201D \u2014 JetBrains",
          "Approval gate: no implementation starts without plan sign-off",
        ],
        warning: "The plan is a human-AI contract. Time spent here saves 10x in debugging later."
      },
      {
        phase: "IMPLEMENT", color: C.accent, icon: FaCode,
        steps: [
          "Agent executes against the approved plan, task by task",
          "Verifiers run after each task (tests, lint, types)",
          "Agent self-corrects against failures before escalating",
          "Human reviews diff at each milestone checkpoint",
          "Spec and plan stay in context throughout \u2014 anchor agent",
        ],
        warning: "Implementation without a plan gate produces code that passes tests but fails the product."
      },
    ];

    for (let i = 0; i < phases.length; i++) {
      const ph = phases[i];
      const x = 0.35 + i * 3.15, y = 1.28;
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 2.95, h: 4.1, fill: { color: C.white }, shadow: shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 2.95, h: 0.52, fill: { color: ph.color } });
      const ic = await icon(ph.icon, "#FFFFFF");
      s.addImage({ data: ic, x: x + 0.18, y: y + 0.1, w: 0.32, h: 0.32 });
      s.addText(ph.phase, { x: x + 0.58, y, w: 2.3, h: 0.52, fontSize: 15, color: C.white, bold: true, valign: "middle", margin: 0 });

      ph.steps.forEach((step, j) => {
        s.addText(`${j + 1}.`, { x: x + 0.12, y: y + 0.6 + j * 0.54, w: 0.24, h: 0.48, fontSize: 11, color: ph.color, bold: true, valign: "middle", margin: 0 });
        s.addText(step, { x: x + 0.38, y: y + 0.6 + j * 0.54, w: 2.48, h: 0.48, fontSize: 10.5, color: C.text, valign: "middle", margin: 0 });
      });

      s.addShape(pres.shapes.RECTANGLE, { x: x + 0.1, y: y + 3.42, w: 2.75, h: 0.58, fill: { color: ph.color, transparency: 88 } });
      s.addText(`\u26A0 ${ph.warning}`, { x: x + 0.16, y: y + 3.46, w: 2.63, h: 0.5, fontSize: 9, color: ph.color, italic: true, margin: 0 });

      if (i < phases.length - 1) {
        s.addText("\u2192", { x: x + 2.95, y: y + 1.62, w: 0.2, h: 0.45, fontSize: 18, color: C.muted, align: "center", margin: 0 });
      }
    }
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 9 — Review Cycles & Human Gates
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.white };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.82, fill: { color: C.navy } });
    s.addText("REVIEW CYCLES  \u2014  HUMAN GATES IN THE SDD LOOP", { x: 0.4, y: 0, w: 9, h: 0.82, fontSize: 13, color: C.white, bold: true, charSpacing: 3, valign: "middle", margin: 0 });
    s.addText("Every gate is a decision point: approve and continue, redirect, or stop. Design them upfront.", { x: 0.4, y: 0.9, w: 9.2, h: 0.3, fontSize: 12, color: C.muted, italic: true, margin: 0 });

    // Timeline with gates
    s.addShape(pres.shapes.LINE, { x: 0.55, y: 2.88, w: 8.9, h: 0, line: { color: C.pale, width: 2 } });

    const gates = [
      { label: "Requirements\nReview",   x: 0.55,  color: C.navy,   who: "PM + Architect", what: "Goals clear? Non-goals explicit? Domain language correct?" },
      { label: "Plan\nApproval",         x: 2.78,  color: C.teal,   who: "Tech Lead",       what: "Approach sound? Dependencies identified? Risks called out?" },
      { label: "Task List\nSign-off",    x: 5.0,   color: C.accent, who: "Developer",       what: "Tasks atomic? Sequence correct? AC mapped to tasks?" },
      { label: "PR Review\n(per task)",  x: 7.22,  color: C.green,  who: "Peer review",     what: "Diff matches plan? Tests pass? No scope creep?" },
    ];

    gates.forEach((g, i) => {
      // Diamond gate marker on timeline
      s.addShape(pres.shapes.RECTANGLE, { x: g.x + 0.36, y: 2.68, w: 0.4, h: 0.4, fill: { color: g.color }, rotate: 45 });
      // Card below
      s.addShape(pres.shapes.RECTANGLE, { x: g.x, y: 3.08, w: 2.05, h: 2.35, fill: { color: C.offWhite }, shadow: shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x: g.x, y: 3.08, w: 2.05, h: 0.5, fill: { color: g.color } });
      s.addText(g.label, { x: g.x, y: 3.08, w: 2.05, h: 0.5, fontSize: 11, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
      s.addText("WHO", { x: g.x + 0.1, y: 3.64, w: 1.85, h: 0.22, fontSize: 8.5, color: g.color, bold: true, charSpacing: 2, margin: 0 });
      s.addText(g.who, { x: g.x + 0.1, y: 3.86, w: 1.85, h: 0.26, fontSize: 10.5, color: C.muted, italic: true, margin: 0 });
      s.addText("ASK", { x: g.x + 0.1, y: 4.18, w: 1.85, h: 0.22, fontSize: 8.5, color: g.color, bold: true, charSpacing: 2, margin: 0 });
      s.addText(g.what, { x: g.x + 0.1, y: 4.4, w: 1.85, h: 0.88, fontSize: 10, color: C.text, margin: 0 });

      // Label above timeline
      s.addText(`GATE ${i + 1}`, { x: g.x, y: 2.12, w: 2.05, h: 0.28, fontSize: 9.5, color: g.color, bold: true, align: "center", charSpacing: 2, margin: 0 });
      s.addShape(pres.shapes.LINE, { x: g.x + 0.8, y: 2.4, w: 0, h: 0.28, line: { color: g.color, width: 1 } });
    });

    s.addText("Gate outcome: \u2713 Approve  \u21BA Redirect (agent revises)  \u2717 Stop (scope change needed, go back to requirements)", {
      x: 0.35, y: 5.33, w: 9.3, h: 0.26, fontSize: 10.5, color: C.muted, italic: true, margin: 0
    });
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 10 — SDD Anti-Patterns
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.navy };

    s.addText("SDD ANTI-PATTERNS  \u2014  WHAT BREAKS THE LOOP", { x: 0.4, y: 0.22, w: 9, h: 0.45, fontSize: 13, color: C.iceBlue, bold: true, charSpacing: 3, margin: 0 });
    s.addText("84% of devs use AI tools. Two-thirds are frustrated. The cause is almost always a spec failure.", { x: 0.4, y: 0.72, w: 9, h: 0.36, fontSize: 14, color: C.white, italic: true, margin: 0 });

    const aps = [
      { n: "01", head: "Vague prompts as specs",       impact: "Agent invents answers to every unstated requirement", fix: "Write requirements.md before touching the agent. If you can\u2019t spec it, you can\u2019t build it." },
      { n: "02", head: "Missing non-goals",            impact: "Agent adds auth, DB migrations, or entire subsystems you didn\u2019t want", fix: "State every non-goal explicitly and positively. Agents cannot infer scope from omission." },
      { n: "03", head: "No acceptance criteria",       impact: "\u201CDone\u201D is whatever the agent decides. Tasks never truly close.", fix: "Every feature needs verifiable AC before the agent starts. No AC = no finish line." },
      { n: "04", head: "Skipping the plan gate",       impact: "Agent codes in the wrong direction for hours before you notice", fix: "Require plan.md approval before implementation. 5 min review saves 2 hours of rework." },
      { n: "05", head: "Spec not in context",          impact: "Agent drifts from requirements as context window fills with code", fix: "Keep SPEC.md in context throughout. Reference it in CLAUDE.md so agent always reloads it." },
      { n: "06", head: "300+ instruction specs",       impact: "Agent performance degrades; critical requirements get ignored", fix: "Keep each phase spec to 30\u201350 requirements. Phase your work \u2014 spec what you\u2019re building now." },
    ];

    [[0,1,2],[3,4,5]].forEach((group, col) => {
      group.forEach((idx, row) => {
        const ap = aps[idx];
        const x = col === 0 ? 0.35 : 5.1, y = 1.28 + row * 1.4, w = 4.55, h = 1.28;
        s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color: C.mid, transparency: 18 }, shadow: shadow() });
        s.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.45, h, fill: { color: "B03040", transparency: 10 } });
        s.addText(ap.n, { x, y, w: 0.45, h, fontSize: 14, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
        s.addText(ap.head, { x: x + 0.55, y: y + 0.06, w: w - 0.65, h: 0.3, fontSize: 12, color: C.white, bold: true, margin: 0 });
        s.addText(`\u26A0 ${ap.impact}`, { x: x + 0.55, y: y + 0.4, w: w - 0.65, h: 0.36, fontSize: 10.5, color: "E8A0A8", margin: 0 });
        s.addText(`\u2713 ${ap.fix}`, { x: x + 0.55, y: y + 0.8, w: w - 0.65, h: 0.4, fontSize: 10.5, color: C.pale, margin: 0 });
      });
    });
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 11 — Lab Exercise
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.white };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.82, fill: { color: C.teal } });
    s.addText("LAB EXERCISE  \u00B7  35 MINUTES", { x: 0.4, y: 0, w: 9, h: 0.82, fontSize: 13, color: C.white, bold: true, charSpacing: 3, valign: "middle", margin: 0 });
    s.addText("Write a Spec for a Real Feature Your Team Needs", { x: 0.4, y: 0.95, w: 9.2, h: 0.46, fontSize: 19, color: C.navy, bold: true, margin: 0 });

    const steps = [
      { n: "1", t: "Pick a feature",          min: "5 min",
        d: "Choose a real feature your team will build in the next sprint. It should be well-understood at the business level but not yet designed technically. Write the user story." },
      { n: "2", t: "Write requirements.md",   min: "8 min",
        d: "Write 8\u201312 requirements using domain language. For each, ask: is this implementation-free? Would a non-technical stakeholder understand it? Include 3 explicit non-goals." },
      { n: "3", t: "Write acceptance criteria", min: "10 min",
        d: "Write AC for your top 3 requirements using Given/When/Then. Each AC must be machine-verifiable. Swap with a neighbour: can they write a test from your AC without asking questions?" },
      { n: "4", t: "Run the research phase",  min: "7 min",
        d: "Open Claude Code. Ask it to READ your requirements.md and produce a research summary ONLY \u2014 no code. What does it identify as ambiguous? What existing code does it find relevant?" },
      { n: "5", t: "Review + debrief",        min: "5 min",
        d: "What did the agent flag that you hadn\u2019t considered? What did it miss? What would have gone wrong if it had gone straight to implementation without the research phase?" },
    ];

    steps.forEach((st, i) => {
      const y = 1.52 + i * 0.8;
      s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y, w: 9.3, h: 0.72, fill: { color: C.offWhite }, shadow: shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y, w: 0.52, h: 0.72, fill: { color: C.teal } });
      s.addText(st.n, { x: 0.35, y, w: 0.52, h: 0.72, fontSize: 20, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
      s.addText(st.t, { x: 0.97, y: y + 0.06, w: 2.3, h: 0.28, fontSize: 12.5, color: C.teal, bold: true, margin: 0 });
      s.addText(`(${st.min})`, { x: 3.27, y: y + 0.06, w: 0.85, h: 0.28, fontSize: 11, color: C.muted, italic: true, margin: 0 });
      s.addText(st.d, { x: 0.97, y: y + 0.38, w: 8.55, h: 0.3, fontSize: 10.5, color: C.muted, margin: 0 });
    });
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 12 — Discussion + Summary
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.navy };

    s.addShape(pres.shapes.RECTANGLE, { x: 9.82, y: 0, w: 0.18, h: 5.625, fill: { color: C.accent } });
    s.addText("DISCUSSION + MODULE SUMMARY", { x: 0.4, y: 0.22, w: 9, h: 0.45, fontSize: 13, color: C.iceBlue, bold: true, charSpacing: 3, margin: 0 });

    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 0.82, w: 5.5, h: 3.82, fill: { color: C.mid, transparency: 20 }, shadow: shadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 0.82, w: 5.5, h: 0.48, fill: { color: C.iceBlue, transparency: 15 } });
    s.addText("DISCUSSION QUESTIONS", { x: 0.35, y: 0.82, w: 5.5, h: 0.48, fontSize: 11, color: C.white, bold: true, charSpacing: 2, align: "center", valign: "middle", margin: 0 });
    const qs = [
      "Q1.  Think of a recent bug or rework. Was it caused by a spec failure, an implementation failure, or both?",
      "Q2.  Which of the 4 SDD phases is your team currently skipping entirely? What\u2019s the cost?",
      "Q3.  What would have to be true about your team\u2019s process to make plan approval a hard gate before implementation?",
      "Q4.  Andrew Ng: \u201CManagers are proposing 2x as many PMs as engineers.\u201D Do you agree this is where the world is going?",
    ];
    s.addText(qs.join("\n\n"), { x: 0.5, y: 1.4, w: 5.1, h: 3.1, fontSize: 11.5, color: C.pale, margin: 0 });

    s.addShape(pres.shapes.RECTANGLE, { x: 6.05, y: 0.82, w: 3.6, h: 3.82, fill: { color: C.mid, transparency: 20 }, shadow: shadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: 6.05, y: 0.82, w: 3.6, h: 0.48, fill: { color: C.accent, transparency: 10 } });
    s.addText("KEY TAKEAWAYS", { x: 6.05, y: 0.82, w: 3.6, h: 0.48, fontSize: 11, color: C.white, bold: true, charSpacing: 2, align: "center", valign: "middle", margin: 0 });
    const tks = [
      "\u00B7 PRD aligns humans. Spec executes agents.",
      "\u00B7 SDD: Requirements \u2192 Plan \u2192 Tasks \u2192 Code",
      "\u00B7 Research before planning. Plan before coding.",
      "\u00B7 AC = agent\u2019s finish line. No AC = no done.",
      "\u00B7 Non-goals must be stated, not implied",
      "\u00B7 Human gates at every phase transition",
      "\u00B7 Spec in context throughout \u2014 anchor the agent",
    ];
    s.addText(tks.join("\n\n"), { x: 6.2, y: 1.4, w: 3.35, h: 3.1, fontSize: 11.5, color: C.pale, margin: 0 });

    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 4.75, w: 9.3, h: 0.62, fill: { color: C.accent, transparency: 18 } });
    s.addText("NEXT  \u00B7  Module 05: Automated Testing, TDD & CI/CD  \u2014  Verifier loops, feedback cycles, agent-driven testing", {
      x: 0.35, y: 4.75, w: 9.3, h: 0.62, fontSize: 11.5, color: C.white, bold: true, align: "center", valign: "middle", margin: 0
    });
  }

  await pres.writeFile({ fileName: "Module_04_SDD_PRDs.pptx" });
  console.log("\u2705 Module 4 written");
}

build().catch(console.error);
