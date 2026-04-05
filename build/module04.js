const pptxgen = require("pptxgenjs");
const {
  FaFileContract, FaExchangeAlt,
  FaLayerGroup, FaSitemap
} = require("react-icons/fa");

const { C, shadow, icon } = require("./shared");

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
      { text: "75\u201390 min  ", options: { color: C.muted } },
      { text: "  |  ", options: { color: C.muted } },
      { text: "Level: ", options: { bold: true, color: C.muted } },
      { text: "Intermediate", options: { color: C.muted } }
    ], { x: 0.4, y: 4.35, w: 5, h: 0.38, fontSize: 13, margin: 0 });

    // Right: PRD evolution visual
    const rx = 7.5;
    const steps = [
      { label: "Intent",     sub: "What we want",       color: C.steel },
      { label: "PRD",        sub: "Approved by human",  color: C.accent },
      { label: "Spec Suite", sub: "Agent-generated",    color: C.teal },
      { label: "Code",       sub: "Agent executes",     color: C.green },
    ];
    for (let i = 0; i < steps.length; i++) {
      const st = steps[i];
      const y = 0.75 + i * 1.18;
      s.addShape(pres.shapes.RECTANGLE, { x: rx, y, w: 2.15, h: 0.85, fill: { color: st.color, transparency: i === 1 ? 0 : 20 }, shadow: shadow() });
      s.addText(st.label, { x: rx, y, w: 2.15, h: 0.48, fontSize: 16, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
      s.addText(st.sub,   { x: rx, y: y + 0.48, w: 2.15, h: 0.34, fontSize: 10, color: C.pale, align: "center", margin: 0 });
      if (i < steps.length - 1) {
        s.addText("\u2193", { x: rx + 0.8, y: y + 0.88, w: 0.55, h: 0.28, fontSize: 16, color: C.muted, align: "center", margin: 0 });
      }
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
      { icon: FaExchangeAlt, color: C.accent, title: "Distinguish Historical vs. Modern PRD",   body: "Understand how the PRD has evolved from a human alignment document to an agent-operationalisable artifact." },
      { icon: FaFileContract, color: C.teal,  title: "Write Agent-Operationalisable PRDs",      body: "Produce PRDs with numbered requirements, explicit non-goals, acceptance criteria, and surfaced open questions." },
      { icon: FaLayerGroup,  color: C.green,  title: "Understand the Automated Spec Suite",     body: "See how an approved PRD automatically generates SPEC.md, ARCHITECTURE.md, PLAN.md, TASKS.md, and schema docs." },
      { icon: FaSitemap,     color: C.steel,  title: "Apply the PRD \u2192 Spec Pipeline",      body: "Walk the full pipeline: PRD \u2192 Spec \u2192 Plan \u2192 Tasks \u2192 Architecture \u2192 Code \u2192 PR, with the human as decision-maker at each stage." },
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
  // SLIDE 3 — The Historical PRD
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.navy };

    s.addText("THE HISTORICAL PRD", { x: 0.4, y: 0.22, w: 9, h: 0.45, fontSize: 13, color: C.iceBlue, bold: true, charSpacing: 3, margin: 0 });
    s.addText("A human artifact written in isolation \u2014 useful for human teams, unusable by agents", { x: 0.4, y: 0.72, w: 9, h: 0.36, fontSize: 15, color: C.white, italic: true, margin: 0 });

    // Table header
    const colX = [0.35, 3.2, 6.6];
    const colW = [2.75, 3.3, 3.1];
    const headers = ["Dimension", "The Reality", "Agent Impact"];
    const hColors = [C.mid, C.mid, C.mid];
    const hTextColors = [C.iceBlue, C.iceBlue, C.iceBlue];

    for (let ci = 0; ci < 3; ci++) {
      s.addShape(pres.shapes.RECTANGLE, { x: colX[ci], y: 1.25, w: colW[ci], h: 0.44, fill: { color: hColors[ci] } });
      s.addText(headers[ci], { x: colX[ci] + 0.12, y: 1.25, w: colW[ci] - 0.14, h: 0.44, fontSize: 11.5, color: hTextColors[ci], bold: true, valign: "middle", charSpacing: 2, margin: 0 });
    }

    const rows = [
      ["Authorship",        "One or two people, from memory and stakeholder interviews",  "No codebase knowledge baked in"],
      ["Codebase awareness","None \u2014 written without reading the existing system",    "Agent has no grounding; hallucinates conflicts"],
      ["Time to produce",   "Days to weeks",                                              "Slow; stale before development begins"],
      ["Review process",    "Async comments, email chains, meetings",                    "Gaps pile up; unresolved by the time agent starts"],
      ["Drift",             "Begins drifting from reality the day dev starts",           "Agent works from outdated truth"],
      ["Completeness",      "Implicitly incomplete \u2014 gaps filled by developer Q&A", "Agent cannot ask; decides silently"],
      ["Agent usability",   "Low \u2014 ambiguous language, no machine-verifiable criteria", "Agent interprets ambiguity incorrectly"],
    ];

    for (let ri = 0; ri < rows.length; ri++) {
      const y = 1.72 + ri * 0.54;
      const bg = ri % 2 === 0 ? "253A52" : "1C3557";
      s.addShape(pres.shapes.RECTANGLE, { x: colX[0], y, w: colW[0], h: 0.5, fill: { color: C.mid, transparency: 30 } });
      s.addShape(pres.shapes.RECTANGLE, { x: colX[1], y, w: colW[1], h: 0.5, fill: { color: bg, transparency: 0 } });
      s.addShape(pres.shapes.RECTANGLE, { x: colX[2], y, w: colW[2], h: 0.5, fill: { color: bg, transparency: 0 } });
      s.addText(rows[ri][0], { x: colX[0] + 0.12, y, w: colW[0] - 0.14, h: 0.5, fontSize: 11, color: C.iceBlue, bold: true, valign: "middle", margin: 0 });
      s.addText(rows[ri][1], { x: colX[1] + 0.12, y, w: colW[1] - 0.14, h: 0.5, fontSize: 10.5, color: C.pale, valign: "middle", margin: 0 });
      s.addText(rows[ri][2], { x: colX[2] + 0.12, y, w: colW[2] - 0.14, h: 0.5, fontSize: 10.5, color: "E8A0A8", valign: "middle", margin: 0 });
    }

    s.addText("The problem: agents cannot fill gaps from experience. An agent encountering ambiguity does not ask \u2014 it decides. And that decision may not be the one you wanted.", {
      x: 0.35, y: 5.35, w: 9.3, h: 0.24, fontSize: 9.5, color: C.muted, italic: true, margin: 0
    });
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 4 — The Modern Agentic PRD
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.offWhite };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.82, fill: { color: C.navy } });
    s.addText("THE MODERN AGENTIC PRD", { x: 0.4, y: 0, w: 9, h: 0.82, fontSize: 13, color: C.white, bold: true, charSpacing: 3, valign: "middle", margin: 0 });
    s.addText("Written with an agent as collaborator and read by an agent as its primary instruction set", { x: 0.4, y: 0.9, w: 9.2, h: 0.3, fontSize: 12, color: C.muted, italic: true, margin: 0 });

    const colX = [0.35, 3.2, 6.6];
    const colW = [2.75, 3.3, 3.1];
    const headers = ["Dimension", "The Reality", "Agent Benefit"];
    const hColors = [C.navy, C.navy, C.navy];
    const hTextColors = [C.white, C.white, C.white];

    for (let ci = 0; ci < 3; ci++) {
      s.addShape(pres.shapes.RECTANGLE, { x: colX[ci], y: 1.25, w: colW[ci], h: 0.44, fill: { color: hColors[ci] } });
      s.addText(headers[ci], { x: colX[ci] + 0.12, y: 1.25, w: colW[ci] - 0.14, h: 0.44, fontSize: 11.5, color: hTextColors[ci], bold: true, valign: "middle", charSpacing: 2, margin: 0 });
    }

    const rows = [
      ["Authorship",        "Human intent + agent draft, expand, stress-test",           "Codebase-grounded from the start"],
      ["Codebase awareness","High \u2014 agent reads code, ADRs, architecture docs first", "No hallucinated conflicts; real constraints surfaced"],
      ["Time to produce",   "Hours not days \u2014 agent handles prose; human handles decisions", "PRD is current, not stale"],
      ["Review process",    "Agent finds gaps and contradictions before human review",    "Human reviews decisions, not omissions"],
      ["Drift",             "Minimal \u2014 agent can re-check PRD against code at any time", "Divergence is caught, not discovered in prod"],
      ["Completeness",      "Structurally enforced \u2014 agent flags every undefined edge case", "Nothing left implicit; open questions resolved first"],
      ["Agent usability",   "High \u2014 numbered requirements, explicit non-goals, machine-readable AC", "Agent implements precisely what was approved"],
    ];

    for (let ri = 0; ri < rows.length; ri++) {
      const y = 1.72 + ri * 0.54;
      const bg = ri % 2 === 0 ? C.white : C.offWhite;
      s.addShape(pres.shapes.RECTANGLE, { x: colX[0], y, w: colW[0], h: 0.5, fill: { color: "D0EDE5" } });
      s.addShape(pres.shapes.RECTANGLE, { x: colX[1], y, w: colW[1], h: 0.5, fill: { color: bg } });
      s.addShape(pres.shapes.RECTANGLE, { x: colX[2], y, w: colW[2], h: 0.5, fill: { color: bg } });
      s.addText(rows[ri][0], { x: colX[0] + 0.12, y, w: colW[0] - 0.14, h: 0.5, fontSize: 11, color: C.green, bold: true, valign: "middle", margin: 0 });
      s.addText(rows[ri][1], { x: colX[1] + 0.12, y, w: colW[1] - 0.14, h: 0.5, fontSize: 10.5, color: C.text, valign: "middle", margin: 0 });
      s.addText(rows[ri][2], { x: colX[2] + 0.12, y, w: colW[2] - 0.14, h: 0.5, fontSize: 10.5, color: C.green, valign: "middle", margin: 0 });
    }

    s.addText("Not longer or more formal \u2014 more precise, more grounded, and continuously maintained.", {
      x: 0.35, y: 5.35, w: 9.3, h: 0.24, fontSize: 9.5, color: C.muted, italic: true, margin: 0
    });
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 5 — How an Agent Improves a PRD
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.navy };

    s.addText("HOW AN AGENT IMPROVES A PRD", { x: 0.4, y: 0.22, w: 9, h: 0.45, fontSize: 13, color: C.iceBlue, bold: true, charSpacing: 3, margin: 0 });
    s.addText("The agent is a collaborator in authoring, not just a reader of the finished document", { x: 0.4, y: 0.72, w: 9, h: 0.36, fontSize: 15, color: C.white, italic: true, margin: 0 });

    const steps = [
      { n: "1", head: "Human writes intent",         body: "Rough draft or bullet points — what problem to solve, what it must do, what it must not do.", color: C.steel },
      { n: "2", head: "Agent reads codebase",        body: "Agent reads existing code, PRODUCT.md, ADRs, architecture docs before drafting anything.", color: C.teal },
      { n: "3", head: "Agent drafts full PRD",       body: "Agent generates all required sections with codebase context baked in — not isolated from reality.", color: C.accent },
      { n: "4", head: "Agent reviews its own draft", body: "\u201CRequirement FR-4 conflicts with UserService contract.\u201D  \u201CLatency NFR is undefined.\u201D  \u201CThis touches PII \u2014 no data handling requirement specified.\u201D", color: C.amber },
      { n: "5", head: "Human resolves flagged issues", body: "Human reviews the agent\u2019s critique and makes decisions. This is the highest-value human step in the pipeline.", color: C.green },
    ];

    for (let i = 0; i < steps.length; i++) {
      const st = steps[i];
      const x = 0.35 + i * 1.9;
      const y = 1.25;
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 1.74, h: 3.95, fill: { color: C.mid, transparency: 18 }, shadow: shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 1.74, h: 0.56, fill: { color: st.color } });
      s.addText(st.n, { x, y, w: 0.44, h: 0.56, fontSize: 20, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
      s.addText(st.head, { x: x + 0.46, y, w: 1.22, h: 0.56, fontSize: 10.5, color: C.white, bold: true, valign: "middle", margin: 0 });
      s.addText(st.body, { x: x + 0.1, y: y + 0.64, w: 1.54, h: 3.1, fontSize: 10, color: C.pale, margin: 0 });
      if (i < steps.length - 1) {
        s.addText("\u2192", { x: x + 1.74, y: y + 1.5, w: 0.16, h: 0.4, fontSize: 16, color: C.muted, align: "center", margin: 0 });
      }
    }

    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 5.32, w: 9.3, h: 0.28, fill: { color: C.accent, transparency: 80 } });
    s.addText("PRD is approved \u2014 ready to generate the spec suite", { x: 0.35, y: 5.32, w: 9.3, h: 0.28, fontSize: 11, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 6 — Modern PRD Structure
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.white };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.82, fill: { color: C.navy } });
    s.addText("MODERN PRD STRUCTURE", { x: 0.4, y: 0, w: 9, h: 0.82, fontSize: 13, color: C.white, bold: true, charSpacing: 3, valign: "middle", margin: 0 });
    s.addText("Explicit where the historical PRD could be vague \u2014 every section exists to eliminate agent guesswork", { x: 0.4, y: 0.9, w: 9.2, h: 0.3, fontSize: 12, color: C.muted, italic: true, margin: 0 });

    const sections = [
      { label: "Problem statement",        desc: "What is wrong or missing today? Concrete, not abstract.",                             highlight: false },
      { label: "Goals",                    desc: "What does success look like? Measurable outcomes, not features.",                     highlight: false },
      { label: "Non-goals",                desc: "Explicitly what is out of scope \u2014 tells the agent where to stop.",               highlight: true  },
      { label: "Functional requirements",  desc: "Numbered, testable statements: \u201CThe system SHALL\u2026\u201D",                   highlight: false },
      { label: "Non-functional requirements", desc: "Latency, throughput, security, compliance, cost ceiling.",                        highlight: false },
      { label: "Constraints",              desc: "Existing systems the solution must integrate with or not break.",                     highlight: false },
      { label: "Codebase context",         desc: "Which existing modules, services, or schemas are affected.",                         highlight: false },
      { label: "Acceptance criteria",      desc: "The machine-verifiable conditions that close this PRD.",                             highlight: false },
      { label: "Open questions",           desc: "Explicit list of unresolved decisions \u2014 agent flags these before speccing.",    highlight: true  },
    ];

    const colX = [0.35, 3.15];
    const colW = [2.7, 6.5];

    s.addShape(pres.shapes.RECTANGLE, { x: colX[0], y: 1.28, w: colW[0], h: 0.4, fill: { color: C.navy } });
    s.addShape(pres.shapes.RECTANGLE, { x: colX[1], y: 1.28, w: colW[1], h: 0.4, fill: { color: C.navy } });
    s.addText("Section", { x: colX[0] + 0.12, y: 1.28, w: colW[0] - 0.14, h: 0.4, fontSize: 11, color: C.white, bold: true, valign: "middle", charSpacing: 2, margin: 0 });
    s.addText("What it specifies", { x: colX[1] + 0.12, y: 1.28, w: colW[1] - 0.14, h: 0.4, fontSize: 11, color: C.white, bold: true, valign: "middle", charSpacing: 2, margin: 0 });

    for (let ri = 0; ri < sections.length; ri++) {
      const sec = sections[ri];
      const y = 1.72 + ri * 0.42;
      const bg = ri % 2 === 0 ? C.white : C.offWhite;
      const labelFill = sec.highlight ? C.accent : (ri % 2 === 0 ? "D4E4F0" : "C4D8EC");
      s.addShape(pres.shapes.RECTANGLE, { x: colX[0], y, w: colW[0], h: 0.38, fill: { color: labelFill } });
      s.addShape(pres.shapes.RECTANGLE, { x: colX[1], y, w: colW[1], h: 0.38, fill: { color: bg } });
      s.addText(sec.label, { x: colX[0] + 0.12, y, w: colW[0] - 0.14, h: 0.38, fontSize: 11, color: sec.highlight ? C.white : C.navy, bold: sec.highlight, valign: "middle", margin: 0 });
      s.addText(sec.desc,  { x: colX[1] + 0.12, y, w: colW[1] - 0.14, h: 0.38, fontSize: 10.5, color: C.muted, valign: "middle", margin: 0 });
    }

    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 5.33, w: 9.3, h: 0.24, fill: { color: C.accent, transparency: 88 } });
    s.addText("\u26A0  Non-goals and Open questions are the most important sections for agents. They define the boundary of autonomous decision-making.", {
      x: 0.45, y: 5.33, w: 9.1, h: 0.24, fontSize: 9.5, color: C.accent, italic: true, valign: "middle", margin: 0
    });
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 7 — PRD → Spec Suite Pipeline
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.offWhite };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.82, fill: { color: C.teal } });
    s.addText("PRD \u2192 SPEC SUITE PIPELINE", { x: 0.4, y: 0, w: 9, h: 0.82, fontSize: 13, color: C.white, bold: true, charSpacing: 3, valign: "middle", margin: 0 });
    s.addText("The approved PRD is the beginning of an automated pipeline \u2014 not the end of the documentation chain", { x: 0.4, y: 0.9, w: 9.2, h: 0.3, fontSize: 12, color: C.muted, italic: true, margin: 0 });

    // PRD box (top center)
    s.addShape(pres.shapes.RECTANGLE, { x: 3.3, y: 1.3, w: 3.4, h: 0.72, fill: { color: C.navy }, shadow: shadow() });
    s.addText("APPROVED PRD", { x: 3.3, y: 1.3, w: 3.4, h: 0.4, fontSize: 14, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
    s.addText("human intent + agent-verified, codebase-aware", { x: 3.3, y: 1.7, w: 3.4, h: 0.3, fontSize: 9.5, color: C.pale, align: "center", margin: 0 });

    // Down arrow from PRD
    s.addText("\u2193 Agent generates:", { x: 3.6, y: 2.06, w: 2.8, h: 0.3, fontSize: 11, color: C.teal, bold: true, align: "center", margin: 0 });

    // 5 generated artifacts
    const artifacts = [
      { label: "SPEC.md",          sub: "How the system works",       color: C.accent },
      { label: "ARCHITECTURE.md",  sub: "Components & integrations",  color: C.teal },
      { label: "SCHEMA DOCS",      sub: "Data models, API contracts",  color: C.navy },
      { label: "PLAN.md",          sub: "Ordered phases & risks",      color: C.green },
      { label: "TASKS.md",         sub: "Discrete agent work units",   color: C.steel },
    ];

    for (let i = 0; i < artifacts.length; i++) {
      const a = artifacts[i];
      const x = 0.35 + i * 1.88;
      s.addShape(pres.shapes.RECTANGLE, { x, y: 2.44, w: 1.72, h: 1.2, fill: { color: C.white }, shadow: shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y: 2.44, w: 1.72, h: 0.42, fill: { color: a.color } });
      s.addText(a.label, { x, y: 2.44, w: 1.72, h: 0.42, fontSize: 10, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
      s.addText(a.sub, { x: x + 0.1, y: 2.9, w: 1.52, h: 0.68, fontSize: 9.5, color: C.text, align: "center", margin: 0 });
    }

    // Arrow down to Code and PR
    s.addText("\u2193 Agent implements:", { x: 3.6, y: 3.72, w: 2.8, h: 0.3, fontSize: 11, color: C.accent, bold: true, align: "center", margin: 0 });

    const outputs = [
      { label: "CODE",  sub: "Tests written first (TDD), then implementation", color: C.accent },
      { label: "PR",    sub: "Human reviews decision, not diff",                color: C.green },
    ];

    for (let i = 0; i < outputs.length; i++) {
      const o = outputs[i];
      const x = 2.3 + i * 3.0;
      s.addShape(pres.shapes.RECTANGLE, { x, y: 4.08, w: 2.6, h: 1.0, fill: { color: C.white }, shadow: shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y: 4.08, w: 2.6, h: 0.42, fill: { color: o.color } });
      s.addText(o.label, { x, y: 4.08, w: 2.6, h: 0.42, fontSize: 14, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
      s.addText(o.sub, { x: x + 0.1, y: 4.54, w: 2.4, h: 0.48, fontSize: 10, color: C.text, align: "center", margin: 0 });
    }

    s.addText("\u2192", { x: 4.9, y: 4.28, w: 0.4, h: 0.42, fontSize: 20, color: C.muted, align: "center", margin: 0 });
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 8 — What Each Artifact Contains
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.white };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.82, fill: { color: C.navy } });
    s.addText("WHAT EACH ARTIFACT CONTAINS", { x: 0.4, y: 0, w: 9, h: 0.82, fontSize: 13, color: C.white, bold: true, charSpacing: 3, valign: "middle", margin: 0 });
    s.addText("Each file is agent-generated, human-reviewed \u2014 no artifact proceeds without approval", { x: 0.4, y: 0.9, w: 9.2, h: 0.3, fontSize: 12, color: C.muted, italic: true, margin: 0 });

    const artifacts = [
      { name: "SPEC.md",           color: C.accent, desc: "The technical translation of the PRD. How the system will be built: component design, API contracts, error handling, security model, test strategy." },
      { name: "ARCHITECTURE.md",   color: C.teal,   desc: "Which existing components are involved, how new components integrate, data flow, trust boundaries. Generated from PRD + agent reading of existing codebase." },
      { name: "Schema docs",       color: C.navy,   desc: "Data models, database schemas, API request/response shapes, event payload definitions. Agent generates from functional requirements; human reviews for correctness." },
      { name: "PLAN.md",           color: C.green,  desc: "The ordered approach: phases, sequencing rationale, dependencies between tasks, risks and mitigations. Allows the human to review strategy before a line of code is written." },
      { name: "TASKS.md",          color: C.steel,  desc: "Discrete, agent-executable work units. Each task has: a description, acceptance criteria, files it will touch, and a definition of done. Tasks are small enough each produces a reviewable PR." },
    ];

    for (let i = 0; i < artifacts.length; i++) {
      const a = artifacts[i];
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = col === 0 ? 0.35 : 5.15;
      const y = 1.28 + row * 1.42;
      const w = 4.6;
      const h = 1.28;
      if (i === 4) {
        // Last item centerd
        const cx = 2.7;
        s.addShape(pres.shapes.RECTANGLE, { x: cx, y, w: 4.6, h, fill: { color: C.offWhite }, shadow: shadow() });
        s.addShape(pres.shapes.RECTANGLE, { x: cx, y, w: 0.07, h, fill: { color: a.color } });
        s.addText(a.name, { x: cx + 0.16, y: y + 0.06, w: 4.3, h: 0.3, fontSize: 13, color: C.navy, bold: true, margin: 0 });
        s.addText(a.desc, { x: cx + 0.16, y: y + 0.44, w: 4.3, h: 0.76, fontSize: 10.5, color: C.muted, margin: 0 });
      } else {
        s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color: C.offWhite }, shadow: shadow() });
        s.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.07, h, fill: { color: a.color } });
        s.addText(a.name, { x: x + 0.16, y: y + 0.06, w: w - 0.22, h: 0.3, fontSize: 13, color: C.navy, bold: true, margin: 0 });
        s.addText(a.desc, { x: x + 0.16, y: y + 0.44, w: w - 0.22, h: 0.76, fontSize: 10.5, color: C.muted, margin: 0 });
      }
    }
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 9 — Human Role in the Pipeline
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.navy };

    s.addText("THE HUMAN\u2019S ROLE IN THE PIPELINE", { x: 0.4, y: 0.22, w: 9, h: 0.45, fontSize: 13, color: C.iceBlue, bold: true, charSpacing: 3, margin: 0 });
    s.addText("The pipeline is automated \u2014 but the human is not removed. The role shifts from writer to decision-maker.", { x: 0.4, y: 0.72, w: 9, h: 0.36, fontSize: 15, color: C.white, italic: true, margin: 0 });

    const colX = [0.35, 2.6, 6.15];
    const colW = [2.15, 3.45, 3.5];
    const headers = ["Stage", "Human does", "Agent does"];
    const hColors = [C.mid, C.accent, C.teal];
    const hTextColors = [C.iceBlue, C.white, C.white];

    for (let ci = 0; ci < 3; ci++) {
      s.addShape(pres.shapes.RECTANGLE, { x: colX[ci], y: 1.28, w: colW[ci], h: 0.44, fill: { color: hColors[ci] } });
      s.addText(headers[ci], { x: colX[ci] + 0.12, y: 1.28, w: colW[ci] - 0.14, h: 0.44, fontSize: 11.5, color: hTextColors[ci], bold: true, valign: "middle", charSpacing: 2, margin: 0 });
    }

    const rows = [
      ["PRD draft",      "Provides intent, resolves open questions",     "Drafts content, reads codebase, flags gaps"],
      ["PRD review",     "Approves intent and completeness",             "Checks for contradictions, missing edge cases, compliance gaps"],
      ["Spec generation","Reviews spec for domain correctness",          "Generates spec, architecture, schema docs from PRD"],
      ["Plan review",    "Approves sequencing and strategy",             "Generates plan and task breakdown"],
      ["Implementation", "Reviews PRs",                                  "Implements tasks, writes tests, self-checks against AC"],
      ["Merge",          "Approves",                                     "Opens PR with full context"],
    ];

    for (let ri = 0; ri < rows.length; ri++) {
      const y = 1.75 + ri * 0.6;
      const bg = ri % 2 === 0 ? "253A52" : "1C3557";
      s.addShape(pres.shapes.RECTANGLE, { x: colX[0], y, w: colW[0], h: 0.56, fill: { color: C.mid, transparency: 30 } });
      s.addShape(pres.shapes.RECTANGLE, { x: colX[1], y, w: colW[1], h: 0.56, fill: { color: bg } });
      s.addShape(pres.shapes.RECTANGLE, { x: colX[2], y, w: colW[2], h: 0.56, fill: { color: bg } });
      s.addText(rows[ri][0], { x: colX[0] + 0.12, y, w: colW[0] - 0.14, h: 0.56, fontSize: 11, color: C.iceBlue, bold: true, valign: "middle", margin: 0 });
      s.addText(rows[ri][1], { x: colX[1] + 0.12, y, w: colW[1] - 0.14, h: 0.56, fontSize: 10.5, color: C.accent, valign: "middle", margin: 0 });
      s.addText(rows[ri][2], { x: colX[2] + 0.12, y, w: colW[2] - 0.14, h: 0.56, fontSize: 10.5, color: C.pale, valign: "middle", margin: 0 });
    }

    s.addText("The human never reviews a diff without first having approved the plan that produced it. By the time code appears, every significant decision has already been made and documented.", {
      x: 0.35, y: 5.35, w: 9.3, h: 0.24, fontSize: 9.5, color: C.muted, italic: true, margin: 0
    });
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 10 — Enterprise Considerations
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.offWhite };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.82, fill: { color: C.navy } });
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.35, h: 0.82, fill: { color: C.accent } });
    s.addText("ENTERPRISE CONSIDERATIONS", { x: 0.55, y: 0, w: 9.1, h: 0.82, fontSize: 13, color: C.white, bold: true, charSpacing: 3, valign: "middle", margin: 0 });
    s.addText("Regulated environments, corporate templates, and traceability requirements", { x: 0.4, y: 0.9, w: 9.2, h: 0.3, fontSize: 12, color: C.muted, italic: true, margin: 0 });

    const cards = [
      {
        title: "PRD as a compliance artifact",
        color: C.accent,
        body: "For regulated changes, the approved PRD (with its audit trail of agent-flagged issues and human resolutions) is evidence of due diligence before development. Store it with your change management records."
      },
      {
        title: "Centralised PRD templates",
        color: C.teal,
        body: "Maintain a corporate PRD template in your shared CLAUDE.md baseline. This ensures every agent-generated PRD covers compliance, security, and data handling requirements \u2014 not just functional ones."
      },
      {
        title: "Agent-authored specs need human review",
        color: C.navy,
        body: "Agents generate excellent specs but may confidently omit edge cases that a domain expert would catch. The spec review is not optional \u2014 it is the last human checkpoint before autonomous implementation begins."
      },
      {
        title: "Traceability for SOC 2 and beyond",
        color: C.green,
        body: "Requirement (PRD) \u2192 Test \u2192 Code \u2192 Deployment must be traceable in your tooling. Tag each task in TASKS.md with its requirement ID. Tag PRs with the task ID. This satisfies SOC 2 and similar requirements without manual effort."
      },
    ];

    const cols = [0.35, 5.1];
    for (let i = 0; i < 4; i++) {
      const x = cols[i % 2], y = 1.28 + Math.floor(i / 2) * 2.0, w = 4.55, h = 1.82;
      s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color: C.white }, shadow: shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.07, h, fill: { color: cards[i].color } });
      s.addText(cards[i].title, { x: x + 0.16, y: y + 0.12, w: w - 0.22, h: 0.38, fontSize: 12.5, color: C.navy, bold: true, margin: 0 });
      s.addText(cards[i].body,  { x: x + 0.16, y: y + 0.58, w: w - 0.22, h: 1.12, fontSize: 11, color: C.muted, margin: 0 });
    }
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 11 — Lab Exercise
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.white };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.82, fill: { color: C.teal } });
    s.addText("LAB EXERCISE  \u00B7  30 MINUTES", { x: 0.4, y: 0, w: 9, h: 0.82, fontSize: 13, color: C.white, bold: true, charSpacing: 3, valign: "middle", margin: 0 });
    s.addText("Write a PRD That an Agent Can Actually Execute", { x: 0.4, y: 0.95, w: 9.2, h: 0.46, fontSize: 19, color: C.navy, bold: true, margin: 0 });

    const steps = [
      { n: "1", t: "Write a rough PRD",           min: "8 min",
        d: "Pick a real feature your team is planning. Write 5\u201310 bullet points: what problem it solves, what it must do, what it must not do, and how you\u2019ll know it\u2019s done." },
      { n: "2", t: "Agent review pass",            min: "7 min",
        d: "Open Claude Code. Paste your bullets and the relevant section of your codebase (or PRODUCT.md). Ask: \u201CReview this as a PRD. What is ambiguous? What edge cases are missing? What open questions must be resolved before you could write a spec?\u201D Record the gaps it finds." },
      { n: "3", t: "Resolve and formalise",        min: "8 min",
        d: "Address the gaps the agent flagged. Produce a one-page PRD using the required sections from Slide 6. Non-goals and Open questions sections are mandatory." },
      { n: "4", t: "Generate the spec",            min: "7 min",
        d: "Ask the agent to generate a SPEC.md from your approved PRD. Review the output: does it faithfully translate your intent? What would you change? What did the agent get right that you hadn\u2019t explicitly specified?" },
    ];

    steps.forEach((st, i) => {
      const y = 1.52 + i * 0.97;
      s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y, w: 9.3, h: 0.87, fill: { color: C.offWhite }, shadow: shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y, w: 0.52, h: 0.87, fill: { color: C.teal } });
      s.addText(st.n, { x: 0.35, y, w: 0.52, h: 0.87, fontSize: 22, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
      s.addText(st.t,  { x: 0.97, y: y + 0.06, w: 2.3, h: 0.32, fontSize: 12.5, color: C.teal, bold: true, margin: 0 });
      s.addText("(" + st.min + ")", { x: 3.27, y: y + 0.06, w: 0.85, h: 0.32, fontSize: 11, color: C.muted, italic: true, margin: 0 });
      s.addText(st.d, { x: 0.97, y: y + 0.44, w: 8.55, h: 0.36, fontSize: 10.5, color: C.muted, margin: 0 });
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
      "Q1.  In the historical model, who resolved the gaps in the PRD? When? What did that cost?",
      "Q2.  What did the agent surface in the lab that you hadn\u2019t noticed? Was it a real gap?",
      "Q3.  Which section of the modern PRD structure would your team find hardest to adopt? Why?",
      "Q4.  What would need to change in your workflow to make the agent review pass a mandatory step before any PRD is approved?",
    ];
    s.addText(qs.join("\n\n"), { x: 0.5, y: 1.4, w: 5.1, h: 3.1, fontSize: 11.5, color: C.pale, margin: 0 });

    s.addShape(pres.shapes.RECTANGLE, { x: 6.05, y: 0.82, w: 3.6, h: 3.82, fill: { color: C.mid, transparency: 20 }, shadow: shadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: 6.05, y: 0.82, w: 3.6, h: 0.48, fill: { color: C.accent, transparency: 10 } });
    s.addText("KEY TAKEAWAYS", { x: 6.05, y: 0.82, w: 3.6, h: 0.48, fontSize: 11, color: C.white, bold: true, charSpacing: 2, align: "center", valign: "middle", margin: 0 });
    const tks = [
      "\u00B7 Historical PRD = human alignment doc",
      "\u00B7 Modern PRD = agent instruction set",
      "\u00B7 Agent reads codebase before drafting",
      "\u00B7 Non-goals + Open questions are critical",
      "\u00B7 Approved PRD generates the full spec suite",
      "\u00B7 Human shifts from writer to decision-maker",
      "\u00B7 PRD is a compliance artifact in regulated envs",
    ];
    s.addText(tks.join("\n\n"), { x: 6.2, y: 1.4, w: 3.35, h: 3.1, fontSize: 11.5, color: C.pale, margin: 0 });

    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 4.75, w: 9.3, h: 0.62, fill: { color: C.accent, transparency: 18 } });
    s.addText("NEXT  \u00B7  Module 05: Review Cycles, Human-in-the-Loop & Agent-to-Agent  \u2014  Human gates, evaluator patterns, agent as educator", {
      x: 0.35, y: 4.75, w: 9.3, h: 0.62, fontSize: 11.5, color: C.white, bold: true, align: "center", valign: "middle", margin: 0
    });
  }

  await pres.writeFile({ fileName: "Module_04_SDD_PRDs.pptx" });
  console.log("\u2705 Module 4 written");
}

build().catch(console.error);
