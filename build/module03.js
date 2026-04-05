const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const { FaFileAlt, FaFolderOpen, FaBolt, FaCompress, FaSearch, FaLayerGroup, FaClock, FaCheckSquare, FaBook, FaCode, FaFilter, FaMemory, FaLightbulb, FaRobot, FaCogs } = require("react-icons/fa");

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
    s.addText("Optimising every token in the agent's context window", { x: 0.4, y: 3.38, w: 7.2, h: 0.52, fontSize: 18, color: C.iceBlue, italic: true, margin: 0 });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 4.0, w: 3.5, h: 0.04, fill: { color: C.accent } });
    s.addText([
      { text: "Duration: ", options: { bold: true, color: C.muted } },
      { text: "75–90 min  ", options: { color: C.muted } },
      { text: "  |  ", options: { color: C.muted } },
      { text: "Level: ", options: { bold: true, color: C.muted } },
      { text: "Intermediate", options: { color: C.muted } }
    ], { x: 0.4, y: 4.2, w: 5, h: 0.38, fontSize: 13, margin: 0 });

    // Right visual — context window diagram
    s.addShape(pres.shapes.RECTANGLE, { x: 7.2, y: 0.65, w: 2.45, h: 4.7, fill: { color: C.mid, transparency: 25 }, shadow: shadow() });
    s.addText("CONTEXT\nWINDOW", { x: 7.2, y: 0.75, w: 2.45, h: 0.55, fontSize: 10, color: C.iceBlue, bold: true, charSpacing: 2, align: "center", margin: 0 });

    const layers = [
      { label: "System Prompt", color: C.accent,  h: 0.52 },
      { label: "CLAUDE.md",     color: C.teal,    h: 0.42 },
      { label: "Skills",        color: C.green,   h: 0.42 },
      { label: "Spec / PRD",    color: C.teal,    h: 0.42 },
      { label: "Tool Results",  color: C.steel,   h: 0.52 },
      { label: "Conversation",  color: C.mid,     h: 0.62 },
      { label: "User Message",  color: C.accent,  h: 0.38 },
    ];
    let ly = 1.4;
    layers.forEach(l => {
      s.addShape(pres.shapes.RECTANGLE, { x: 7.32, y: ly, w: 2.21, h: l.h - 0.04, fill: { color: l.color, transparency: l.color === C.mid ? 30 : 15 } });
      s.addText(l.label, { x: 7.32, y: ly, w: 2.21, h: l.h - 0.04, fontSize: 9.5, color: C.white, align: "center", valign: "middle", margin: 0 });
      ly += l.h;
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
      { icon: FaFileAlt,    color: C.accent, title: "Write a CLAUDE.md that works",  body: "Apply the <300-line rule, progressive disclosure pattern, and universal-rules principle to craft effective agent instruction files." },
      { icon: FaFolderOpen, color: C.teal,   title: "Build and use Agent Skills",    body: "Structure SKILL.md folders, write trigger descriptions, and deploy skills for on-demand specialist knowledge injection." },
      { icon: FaFilter,     color: C.green,  title: "Choose the right context strategy", body: "Select the appropriate pattern — naive injection, just-in-time retrieval, agentic memory, or compaction — for each scenario." },
      { icon: FaBook,       color: C.steel,  title: "Use product docs as context",   body: "Embed PRDs, specs, ADRs, and DoD as persistent agent context so agents build what was actually intended." },
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
  // SLIDE 3 — What is Context Engineering?
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.navy };

    s.addText("WHAT IS CONTEXT ENGINEERING?", { x: 0.4, y: 0.22, w: 9, h: 0.45, fontSize: 13, color: C.iceBlue, bold: true, charSpacing: 3, margin: 0 });

    // The key distinction
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 0.82, w: 9.3, h: 1.35, fill: { color: C.mid, transparency: 18 }, shadow: shadow() });
    s.addText("\u201CPrompt engineering optimises human\u2013LLM interaction.\nContext engineering optimises agent\u2013LLM interaction.\u201D", {
      x: 0.65, y: 0.95, w: 8.7, h: 0.88,
      fontSize: 18, color: C.white, italic: true, align: "center", valign: "middle", margin: 0
    });
    s.addText("\u2014 Thoughtworks, 2025", { x: 0.65, y: 1.92, w: 8.7, h: 0.22, fontSize: 10, color: C.muted, align: "center", margin: 0 });

    const points = [
      { icon: FaBolt,      color: C.accent,  head: "The Core Discipline",    body: "Context engineering is the art and science of deciding what goes into the agent\u2019s context window, when, and in what form \u2014 to maximize useful work per token." },
      { icon: FaLayerGroup,color: C.teal,    head: "Why It\u2019s Different from Prompting", body: "Agents run for hundreds of tool calls across long tasks. A single prompt doesn\u2019t cut it. Context must be curated, compacted, and refreshed dynamically." },
      { icon: FaFilter,    color: C.green,   head: "The Central Constraint", body: "All LLMs have a finite context window. Everything the agent can \u201Csee\u201D must fit. Poor context engineering fills that window with noise instead of signal." },
      { icon: FaCode,      color: C.steel,   head: "Folder = Context",       body: "Anthropic: \u201CThe folder and file structure of an agent becomes a form of context engineering.\u201D How you organize your project IS how you communicate intent to the agent." },
    ];

    for (let i = 0; i < 4; i++) {
      const col = i % 2, row = Math.floor(i / 2);
      const x = col === 0 ? 0.35 : 5.1, y = 2.35 + row * 1.55, w = 4.55, h = 1.42;
      const p = points[i];
      s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color: C.mid, transparency: 15 }, shadow: shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.06, h, fill: { color: p.color } });
      const ic = await icon(p.icon, "#" + p.color);
      s.addImage({ data: ic, x: x + 0.16, y: y + 0.22, w: 0.36, h: 0.36 });
      s.addText(p.head, { x: x + 0.62, y: y + 0.12, w: w - 0.76, h: 0.38, fontSize: 12.5, color: p.color, bold: true, margin: 0 });
      s.addText(p.body, { x: x + 0.62, y: y + 0.54, w: w - 0.76, h: 0.78, fontSize: 11, color: C.pale, margin: 0 });
    }
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 4 — CLAUDE.md: The Agent's Standing Orders
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.white };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.82, fill: { color: C.navy } });
    s.addText("CLAUDE.md  \u2014  THE AGENT\u2019S STANDING ORDERS", { x: 0.4, y: 0, w: 9, h: 0.82, fontSize: 13, color: C.white, bold: true, charSpacing: 3, valign: "middle", margin: 0 });
    s.addText("The persistent instruction file loaded into every Claude Code session", { x: 0.4, y: 0.9, w: 9.2, h: 0.3, fontSize: 12.5, color: C.muted, italic: true, margin: 0 });

    // Left column — rules
    const rules = [
      { head: "Keep it under 300 lines",        color: C.accent, body: "Shorter is better. HumanLayer's production CLAUDE.md is under 60 lines. Claude\u2019s system prompt already consumes ~50 instructions before yours." },
      { head: "Universal rules only",           color: C.teal,   body: "Only content that applies to every session belongs here. Task-specific rules go in separate referenced files. Irrelevant content actively degrades performance." },
      { head: "Progressive disclosure",         color: C.green,  body: "Reference `agent_docs/building_the_project.md`, `agent_docs/code_conventions.md` etc. Claude reads them on-demand, not upfront." },
      { head: "LLMs are in-context learners",   color: C.steel,  body: "If your code follows a consistent style, the agent will follow it without being told. Show don\u2019t tell \u2014 examples outperform rules." },
    ];

    rules.forEach((r, i) => {
      const y = 1.3 + i * 1.05;
      s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y, w: 4.9, h: 0.95, fill: { color: C.offWhite }, shadow: shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y, w: 0.06, h: 0.95, fill: { color: r.color } });
      s.addText(r.head, { x: 0.52, y: y + 0.06, w: 4.6, h: 0.32, fontSize: 12.5, color: C.navy, bold: true, margin: 0 });
      s.addText(r.body, { x: 0.52, y: y + 0.42, w: 4.6, h: 0.46, fontSize: 11, color: C.muted, margin: 0 });
    });

    // Right column — structure diagram
    s.addShape(pres.shapes.RECTANGLE, { x: 5.5, y: 1.28, w: 4.15, h: 4.05, fill: { color: C.offWhite }, shadow: shadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: 5.5, y: 1.28, w: 4.15, h: 0.42, fill: { color: C.navy } });
    s.addText("RECOMMENDED STRUCTURE", { x: 5.5, y: 1.28, w: 4.15, h: 0.42, fontSize: 11, color: C.white, bold: true, charSpacing: 2, align: "center", valign: "middle", margin: 0 });

    const struct = [
      { file: "CLAUDE.md",                   note: "\u2264 60 lines, universal rules only",  color: C.accent },
      { file: "agent_docs/",                 note: "Task-specific detail (loaded on-demand)", color: C.teal },
      { file: "  building_the_project.md",   note: "How to build, test, run",                color: C.teal },
      { file: "  code_conventions.md",       note: "Style, patterns, naming",                color: C.teal },
      { file: "  service_architecture.md",   note: "System design, dependencies",            color: C.teal },
      { file: "  database_schema.md",        note: "Data models and relationships",          color: C.teal },
      { file: "SPEC.md",                     note: "Product requirements (see Module 4)",    color: C.green },
      { file: "NOTES.md",                    note: "Agent working memory (auto-managed)",    color: C.steel },
    ];

    struct.forEach((f, i) => {
      const y = 1.82 + i * 0.36;
      s.addShape(pres.shapes.RECTANGLE, { x: 5.62, y, w: 3.9, h: 0.32, fill: { color: f.color, transparency: i === 0 ? 0 : 85 } });
      s.addText(f.file, { x: 5.7, y, w: 1.6, h: 0.32, fontSize: 10, color: i === 0 ? C.white : f.color, bold: i === 0, fontFace: "Consolas", valign: "middle", margin: 0 });
      s.addText(f.note, { x: 7.3, y, w: 2.1, h: 0.32, fontSize: 9.5, color: C.muted, italic: true, valign: "middle", margin: 0 });
    });
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 5 — Agent Skills
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.offWhite };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.82, fill: { color: C.navy } });
    s.addText("AGENT SKILLS  \u2014  ON-DEMAND SPECIALIST KNOWLEDGE", { x: 0.4, y: 0, w: 9, h: 0.82, fontSize: 13, color: C.white, bold: true, charSpacing: 3, valign: "middle", margin: 0 });
    s.addText("Skills are folders of instructions, scripts, and resources that agents load dynamically  \u2014  Anthropic, Jan 2026", { x: 0.4, y: 0.9, w: 9.2, h: 0.3, fontSize: 11.5, color: C.muted, italic: true, margin: 0 });

    // CLAUDE.md vs Skills comparison
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 1.28, w: 4.4, h: 1.0, fill: { color: C.white }, shadow: shadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 1.28, w: 4.4, h: 0.42, fill: { color: C.steel } });
    s.addText("CLAUDE.md", { x: 0.35, y: 1.28, w: 4.4, h: 0.42, fontSize: 13, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
    s.addText("Universal context \u2014 loaded every session, every task", { x: 0.45, y: 1.76, w: 4.2, h: 0.42, fontSize: 11.5, color: C.muted, align: "center", margin: 0 });

    s.addText("vs", { x: 4.78, y: 1.55, w: 0.45, h: 0.42, fontSize: 16, color: C.muted, align: "center", bold: true, margin: 0 });

    s.addShape(pres.shapes.RECTANGLE, { x: 5.25, y: 1.28, w: 4.4, h: 1.0, fill: { color: C.white }, shadow: shadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: 5.25, y: 1.28, w: 4.4, h: 0.42, fill: { color: C.accent } });
    s.addText("Skills", { x: 5.25, y: 1.28, w: 4.4, h: 0.42, fontSize: 13, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
    s.addText("Domain-specific context \u2014 loaded on-demand when relevant", { x: 5.35, y: 1.76, w: 4.2, h: 0.42, fontSize: 11.5, color: C.muted, align: "center", margin: 0 });

    // Skill anatomy
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 2.45, w: 4.4, h: 2.95, fill: { color: C.white }, shadow: shadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 2.45, w: 4.4, h: 0.4, fill: { color: C.navy } });
    s.addText("SKILL FOLDER ANATOMY", { x: 0.35, y: 2.45, w: 4.4, h: 0.4, fontSize: 11, color: C.white, bold: true, charSpacing: 2, align: "center", valign: "middle", margin: 0 });

    const anatomy = [
      { f: "my-skill/",         note: "Self-contained folder",        color: C.accent },
      { f: "  SKILL.md",        note: "YAML frontmatter + instructions", color: C.accent },
      { f: "  scripts/",        note: "Executable tools",             color: C.teal },
      { f: "  reference/",      note: "Supporting docs, examples",    color: C.green },
    ];
    anatomy.forEach((a, i) => {
      const y = 2.97 + i * 0.38;
      s.addShape(pres.shapes.RECTANGLE, { x: 0.47, y, w: 4.15, h: 0.33, fill: { color: a.color, transparency: i === 0 ? 80 : 90 } });
      s.addText(a.f,    { x: 0.55, y, w: 1.8, h: 0.33, fontSize: 10.5, color: a.color, bold: i === 0, fontFace: "Consolas", valign: "middle", margin: 0 });
      s.addText(a.note, { x: 2.35, y, w: 2.15, h: 0.33, fontSize: 10, color: C.muted, italic: true, valign: "middle", margin: 0 });
    });

    s.addShape(pres.shapes.RECTANGLE, { x: 0.47, y: 4.3, w: 4.15, h: 0.88, fill: { color: C.pale } });
    s.addText("SKILL.md frontmatter:", { x: 0.57, y: 4.34, w: 3.9, h: 0.24, fontSize: 9.5, color: C.navy, bold: true, margin: 0 });
    s.addText("name: pdf-processor\ndescription: Use PROACTIVELY when user asks about PDFs", {
      x: 0.57, y: 4.57, w: 3.9, h: 0.52, fontSize: 9.5, color: C.text, fontFace: "Consolas", margin: 0
    });

    // Right — use cases
    s.addShape(pres.shapes.RECTANGLE, { x: 5.25, y: 2.45, w: 4.4, h: 2.95, fill: { color: C.white }, shadow: shadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: 5.25, y: 2.45, w: 4.4, h: 0.4, fill: { color: C.navy } });
    s.addText("SKILL USE CASES", { x: 5.25, y: 2.45, w: 4.4, h: 0.4, fontSize: 11, color: C.white, bold: true, charSpacing: 2, align: "center", valign: "middle", margin: 0 });

    const usecases = [
      { head: "General capability gaps",       body: "PDF, Excel, PowerPoint creation \u2014 things Claude can\u2019t do well out of the box" },
      { head: "Org / team workflows",          body: "Brand style guidelines, PR conventions, deployment runbooks" },
      { head: "Domain expertise",              body: "Your microservice patterns, data model, API conventions" },
      { head: "Tool interaction patterns",     body: "How to use your internal tools, custom MCP servers, CLI tools" },
    ];
    usecases.forEach((u, i) => {
      const y = 2.97 + i * 0.72;
      s.addShape(pres.shapes.RECTANGLE, { x: 5.35, y, w: 4.2, h: 0.64, fill: { color: C.offWhite } });
      s.addText(u.head, { x: 5.45, y: y + 0.05, w: 4.0, h: 0.24, fontSize: 11.5, color: C.navy, bold: true, margin: 0 });
      s.addText(u.body, { x: 5.45, y: y + 0.32, w: 4.0, h: 0.26, fontSize: 10.5, color: C.muted, margin: 0 });
    });
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 6 — The Four Context Strategies
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.white };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.82, fill: { color: C.teal } });
    s.addText("THE FOUR CONTEXT STRATEGIES", { x: 0.4, y: 0, w: 9, h: 0.82, fontSize: 13, color: C.white, bold: true, charSpacing: 3, valign: "middle", margin: 0 });
    s.addText("Choose the right pattern for the right situation \u2014 most production agents combine all four", { x: 0.4, y: 0.9, w: 9.2, h: 0.3, fontSize: 12, color: C.muted, italic: true, margin: 0 });

    const strategies = [
      {
        n: "01", icon: FaFileAlt, color: C.navy,   label: "Naive Injection",
        when: "Small, universally relevant content",
        how:  "Drop files into context upfront (CLAUDE.md, Skills). Claude reads everything before starting.",
        pro:  "Simple, reliable, immediate availability",
        con:  "Fills context window fast with potentially irrelevant content",
        ex:   "CLAUDE.md, coding conventions, project overview"
      },
      {
        n: "02", icon: FaBolt,    color: C.accent, label: "Just-in-Time Retrieval",
        when: "Large codebases, long-running tasks",
        how:  "Agent uses grep/glob/bash to load files dynamically at runtime when needed \u2014 lightweight identifiers held in context.",
        pro:  "Precise, efficient, scales to massive repos",
        con:  "Requires agent discipline; slightly slower",
        ex:   "Claude Code\u2019s codebase navigation, targeted file reads"
      },
      {
        n: "03", icon: FaMemory,  color: C.green,  label: "Agentic Memory",
        when: "Multi-step tasks crossing context limits",
        how:  "Agent regularly writes NOTES.md / TODO.md / MEMORY.md, reads them back as needed to persist state.",
        pro:  "Unlimited effective memory, transparent and auditable",
        con:  "Requires discipline; notes must be maintained accurately",
        ex:   "NOTES.md, Claude Code to-do lists, Pokémon-playing Claude"
      },
      {
        n: "04", icon: FaCompress, color: C.steel, label: "Compaction",
        when: "Context window approaching limit",
        how:  "Summarise conversation into a fresh context window \u2014 preserve decisions, bugs, implementation details; discard redundant tool outputs.",
        pro:  "Enables indefinite continuation of long agent runs",
        con:  "Aggressive compaction loses subtle but critical context",
        ex:   "Claude Code auto-compaction, tool result clearing"
      },
    ];

    strategies.forEach((st, i) => {
      const x = 0.35 + i * 2.38, y = 1.3;
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 2.2, h: 4.12, fill: { color: C.offWhite }, shadow: shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 2.2, h: 0.58, fill: { color: st.color } });
      s.addText(st.n, { x, y, w: 0.52, h: 0.58, fontSize: 20, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
      s.addText(st.label, { x: x + 0.54, y, w: 1.62, h: 0.58, fontSize: 12, color: C.white, bold: true, valign: "middle", margin: 0 });

      s.addText("WHEN", { x: x + 0.1, y: y + 0.65, w: 2.0, h: 0.22, fontSize: 8.5, color: st.color, bold: true, charSpacing: 2, margin: 0 });
      s.addText(st.when, { x: x + 0.1, y: y + 0.87, w: 2.0, h: 0.36, fontSize: 10, color: C.muted, margin: 0 });

      s.addText("HOW", { x: x + 0.1, y: y + 1.3, w: 2.0, h: 0.22, fontSize: 8.5, color: st.color, bold: true, charSpacing: 2, margin: 0 });
      s.addText(st.how, { x: x + 0.1, y: y + 1.52, w: 2.0, h: 0.68, fontSize: 10, color: C.text, margin: 0 });

      s.addText("\u2713 " + st.pro, { x: x + 0.1, y: y + 2.28, w: 2.0, h: 0.36, fontSize: 10, color: C.green, margin: 0 });
      s.addText("\u26A0 " + st.con, { x: x + 0.1, y: y + 2.64, w: 2.0, h: 0.36, fontSize: 10, color: C.steel, margin: 0 });

      s.addShape(pres.shapes.RECTANGLE, { x: x + 0.08, y: y + 3.06, w: 2.04, h: 0.88, fill: { color: st.color, transparency: 88 } });
      s.addText("e.g.", { x: x + 0.15, y: y + 3.1, w: 1.9, h: 0.22, fontSize: 9, color: st.color, bold: true, margin: 0 });
      s.addText(st.ex, { x: x + 0.15, y: y + 3.3, w: 1.9, h: 0.55, fontSize: 9.5, color: C.muted, italic: true, margin: 0 });
    });
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 7 — Compaction Deep Dive
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.navy };

    s.addText("COMPACTION  \u2014  DEEP DIVE", { x: 0.4, y: 0.22, w: 9, h: 0.45, fontSize: 13, color: C.iceBlue, bold: true, charSpacing: 3, margin: 0 });
    s.addText("How agents survive tasks longer than their context window", { x: 0.4, y: 0.72, w: 9, h: 0.36, fontSize: 17, color: C.white, italic: true, margin: 0 });

    // The flow diagram
    const stages = [
      { label: "Long\nConversation", color: C.steel,  sub: "Approaching limit" },
      { label: "Summarise\nHistory",  color: C.accent, sub: "Model compresses" },
      { label: "Fresh\nContext",      color: C.teal,   sub: "Summary + last 5 files" },
      { label: "Continue\nTask",      color: C.green,  sub: "Agent carries on" },
    ];

    stages.forEach((st, i) => {
      const x = 0.5 + i * 2.38, y = 1.3;
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 2.1, h: 1.35, fill: { color: C.mid, transparency: 15 }, shadow: shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 2.1, h: 0.55, fill: { color: st.color } });
      s.addText(st.label, { x, y, w: 2.1, h: 0.55, fontSize: 13, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
      s.addText(st.sub,   { x: x + 0.1, y: y + 0.62, w: 1.9, h: 0.55, fontSize: 11, color: C.pale, align: "center", margin: 0 });
      if (i < stages.length - 1) {
        s.addText("\u2192", { x: x + 2.1, y: y + 0.45, w: 0.28, h: 0.45, fontSize: 20, color: C.muted, align: "center", margin: 0 });
      }
    });

    // Keep vs Discard
    const keep = [
      "Architectural decisions made",
      "Unresolved bugs and blockers",
      "Implementation choices and reasoning",
      "Current task state and next steps",
      "Critical file paths and variable names",
      "Last 5 files accessed (always preserved)",
    ];
    const discard = [
      "Raw tool call outputs from early in history",
      "Repeated search results",
      "Intermediate reasoning chains",
      "Redundant file reads",
      "Superseded plans or approaches",
    ];

    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 2.82, w: 4.55, h: 2.6, fill: { color: C.mid, transparency: 18 } });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 2.82, w: 4.55, h: 0.4, fill: { color: C.green, transparency: 15 } });
    s.addText("\u2713  WHAT TO KEEP  (maximize recall)", { x: 0.45, y: 2.82, w: 4.35, h: 0.4, fontSize: 11, color: C.white, bold: true, valign: "middle", margin: 0 });
    s.addText(keep.map(k => `\u2022 ${k}`).join("\n"), { x: 0.5, y: 3.28, w: 4.3, h: 2.0, fontSize: 11, color: C.pale, margin: 0 });

    s.addShape(pres.shapes.RECTANGLE, { x: 5.1, y: 2.82, w: 4.55, h: 2.6, fill: { color: C.mid, transparency: 18 } });
    s.addShape(pres.shapes.RECTANGLE, { x: 5.1, y: 2.82, w: 4.55, h: 0.4, fill: { color: C.steel, transparency: 15 } });
    s.addText("\u2717  WHAT TO DISCARD  (improve precision)", { x: 5.2, y: 2.82, w: 4.35, h: 0.4, fontSize: 11, color: C.white, bold: true, valign: "middle", margin: 0 });
    s.addText(discard.map(d => `\u2022 ${d}`).join("\n"), { x: 5.2, y: 3.28, w: 4.3, h: 2.0, fontSize: 11, color: C.pale, margin: 0 });

    s.addText("Lightest-touch compaction: tool result clearing \u2014 raw results from early history rarely need to be re-read. Available now in Claude API as a native feature.", {
      x: 0.35, y: 5.3, w: 9.3, h: 0.27, fontSize: 10, color: C.muted, italic: true, margin: 0
    });
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 8 — Product Documentation as Context
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.offWhite };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.82, fill: { color: C.navy } });
    s.addText("PRODUCT DOCUMENTATION AS CONTEXT", { x: 0.4, y: 0, w: 9, h: 0.82, fontSize: 13, color: C.white, bold: true, charSpacing: 3, valign: "middle", margin: 0 });
    s.addText("The agent builds what it can see. If your intent isn\u2019t in context, it will guess.", { x: 0.4, y: 0.9, w: 9.2, h: 0.3, fontSize: 12.5, color: C.muted, italic: true, margin: 0 });

    const docs = [
      {
        icon: FaBook, color: C.accent, label: "SPEC.md / PRD",
        what: "Product requirements as a persistent file in the repo. The agent reads it at the start of every session.",
        why:  "Without spec context, agents optimise for the wrong outcomes. A spec gives the agent the \u2018why\u2019 behind every feature.",
        how:  "Commit SPEC.md to git. The agent can query history with git blame to understand when requirements changed."
      },
      {
        icon: FaCheckSquare, color: C.teal, label: "Definition of Done",
        what: "Explicit, verifiable acceptance criteria for every feature \u2014 written before coding starts.",
        why:  "Without DoD, \u201Cdone\u201D is whatever the agent decides. With it, the agent has a concrete completion target.",
        how:  "Embed DoD directly in SPEC.md. Agent uses it to write tests, verify output, and know when to stop."
      },
      {
        icon: FaFileAlt, color: C.green, label: "Architecture Decision Records",
        what: "Persistent records of architectural choices and their reasoning. Spotify captures these from Slack threads via agents.",
        why:  "Agents making code changes need to understand existing architectural constraints to avoid breaking invariants.",
        how:  "Maintain an `adr/` folder. Reference in CLAUDE.md so agents load relevant ADRs just-in-time."
      },
      {
        icon: FaCogs, color: C.steel, label: "API Contracts & Schemas",
        what: "OpenAPI specs, database schemas, type definitions \u2014 the machine-readable contracts your system depends on.",
        why:  "Agents with access to contracts hallucinate far less. They can validate their own output against the schema.",
        how:  "Use MCP servers like Context7 for real-time documentation. Or reference static schema files via just-in-time retrieval."
      },
    ];

    const cols = [0.35, 5.1];
    for (let i = 0; i < docs.length; i++) {
      const d = docs[i];
      const x = cols[i % 2], y = 1.28 + Math.floor(i / 2) * 2.05, w = 4.55, h = 1.9;
      s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color: C.white }, shadow: shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.07, h, fill: { color: d.color } });
      const ic = await icon(d.icon, "#" + d.color);
      s.addImage({ data: ic, x: x + 0.18, y: y + 0.2, w: 0.38, h: 0.38 });
      s.addText(d.label, { x: x + 0.68, y: y + 0.12, w: w - 0.82, h: 0.38, fontSize: 13, color: d.color, bold: true, margin: 0 });
      s.addText(d.what,  { x: x + 0.68, y: y + 0.54, w: w - 0.82, h: 0.38, fontSize: 10.5, color: C.text, margin: 0 });
      s.addText(d.how,   { x: x + 0.68, y: y + 0.96, w: w - 0.82, h: 0.72, fontSize: 10.5, color: C.muted, italic: true, margin: 0 });
    }
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 9 — Context Anti-Patterns
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.white };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.82, fill: { color: C.navy } });
    s.addText("CONTEXT ANTI-PATTERNS  \u2014  WHAT BREAKS AGENTS", { x: 0.4, y: 0, w: 9, h: 0.82, fontSize: 13, color: C.white, bold: true, charSpacing: 3, valign: "middle", margin: 0 });
    s.addText("These are the most common causes of unreliable, hallucinating, or scope-creeping agents", { x: 0.4, y: 0.9, w: 9.2, h: 0.3, fontSize: 12, color: C.muted, italic: true, margin: 0 });

    const antipatterns = [
      { n:"01", head: "Bloated CLAUDE.md",           fix: "Keep to <300 lines of universally applicable rules. Move task-specific content to agent_docs/.",     impact: "Agent ignores instructions it deems irrelevant \u2014 including the ones you care about most." },
      { n:"02", head: "No Definition of Done",       fix: "Add explicit acceptance criteria per feature. Without them, the agent decides when it\u2019s done.",   impact: "Agent marks tasks complete prematurely or keeps going past what you wanted." },
      { n:"03", head: "Stale context in long tasks", fix: "Implement compaction or use tool result clearing. Never let context grow unbounded.",                  impact: "Performance degrades quadratically. Later tool calls contradict earlier ones." },
      { n:"04", head: "No spec in context",          fix: "Commit SPEC.md to the repo. Reference it in CLAUDE.md so it\u2019s always available.",                 impact: "Agent builds the technically correct thing rather than the product thing." },
      { n:"05", head: "Vague non-goals",             fix: "State non-goals explicitly. Agents cannot infer scope from omission \u2014 only from explicit instruction.", impact: "Agent adds auth, logging, tests, or features you explicitly didn\u2019t want." },
      { n:"06", head: "Mixing concerns in context",  fix: "Separate business specs from technical specs. Keep each context source focused and purposeful.",        impact: "Agent confuses requirements and implementation, producing inconsistent output." },
    ];

    const cols = [0.35, 5.1];
    antipatterns.forEach((ap, i) => {
      const x = cols[i % 2], y = 1.28 + Math.floor(i / 3) * 2.1 + (i % 3) * 0.0;
      // Actually, let's do 3 per column
    });

    // 3 per column layout
    [[0,1,2],[3,4,5]].forEach((group, col) => {
      group.forEach((idx, row) => {
        const ap = antipatterns[idx];
        const x = col === 0 ? 0.35 : 5.1, y = 1.28 + row * 1.4, w = 4.55, h = 1.3;
        s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color: C.offWhite }, shadow: shadow() });
        s.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.45, h, fill: { color: "E8505B", transparency: 10 } });
        s.addText(ap.n, { x, y, w: 0.45, h, fontSize: 14, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
        s.addText(ap.head, { x: x + 0.55, y: y + 0.06, w: w - 0.65, h: 0.32, fontSize: 12, color: C.navy, bold: true, margin: 0 });
        s.addText("\u26A0 " + ap.impact, { x: x + 0.55, y: y + 0.42, w: w - 0.65, h: 0.38, fontSize: 10.5, color: "B03040", margin: 0 });
        s.addText("\u2713 " + ap.fix,    { x: x + 0.55, y: y + 0.84, w: w - 0.65, h: 0.38, fontSize: 10.5, color: C.green,  margin: 0 });
      });
    });
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 10 — Context Engineering Checklist
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.navy };

    s.addText("CONTEXT ENGINEERING CHECKLIST", { x: 0.4, y: 0.22, w: 9, h: 0.45, fontSize: 13, color: C.iceBlue, bold: true, charSpacing: 3, margin: 0 });
    s.addText("Apply this before every agent deployment", { x: 0.4, y: 0.72, w: 9, h: 0.36, fontSize: 17, color: C.white, italic: true, margin: 0 });

    const checks = [
      { cat: "CLAUDE.md",       color: C.accent, items: ["Under 300 lines?", "Only universal rules (no task-specific content)?", "References agent_docs/ for detail?", "Has a linter/formatter stop hook?"] },
      { cat: "Spec & DoD",      color: C.teal,   items: ["SPEC.md committed to repo?", "Acceptance criteria explicit for each feature?", "Non-goals stated positively?", "ADRs in adr/ folder?"] },
      { cat: "Context Strategy",color: C.green,  items: ["Identified which of 4 strategies applies?", "NOTES.md pattern for multi-step tasks?", "Compaction threshold defined?", "Tool result clearing enabled?"] },
      { cat: "Skills",          color: C.steel,  items: ["Skills created for domain knowledge?", "Trigger descriptions precise?", "SKILL.md under 200 lines?", "Tested that Claude triggers correctly?"] },
    ];

    checks.forEach((cat, i) => {
      const col = i % 2, row = Math.floor(i / 2);
      const x = col === 0 ? 0.35 : 5.15, y = 1.28 + row * 2.05, w = 4.6, h = 1.9;
      s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color: C.mid, transparency: 18 }, shadow: shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y, w, h: 0.42, fill: { color: cat.color, transparency: 10 } });
      s.addText(cat.cat, { x, y, w, h: 0.42, fontSize: 12, color: C.white, bold: true, charSpacing: 2, align: "center", valign: "middle", margin: 0 });
      cat.items.forEach((item, j) => {
        s.addShape(pres.shapes.RECTANGLE, { x: x + 0.12, y: y + 0.5 + j * 0.34, w: 0.28, h: 0.26, fill: { color: C.mid, transparency: 5 } });
        s.addText("\u25A1", { x: x + 0.12, y: y + 0.5 + j * 0.34, w: 0.28, h: 0.26, fontSize: 12, color: cat.color, align: "center", valign: "middle", margin: 0 });
        s.addText(item, { x: x + 0.48, y: y + 0.5 + j * 0.34, w: w - 0.6, h: 0.28, fontSize: 11, color: C.pale, valign: "middle", margin: 0 });
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
    s.addText("LAB EXERCISE  \u00B7  30 MINUTES", { x: 0.4, y: 0, w: 9, h: 0.82, fontSize: 13, color: C.white, bold: true, charSpacing: 3, valign: "middle", margin: 0 });
    s.addText("Write a CLAUDE.md and Skill for Your Team", { x: 0.4, y: 0.95, w: 9.2, h: 0.48, fontSize: 19, color: C.navy, bold: true, margin: 0 });

    const steps = [
      { n: "1", t: "Audit your current context", min: "5 min",
        d: "If you already have a CLAUDE.md or .cursorrules, open it. How many lines? What percentage is universally applicable? What\u2019s task-specific? What\u2019s missing entirely?" },
      { n: "2", t: "Write your CLAUDE.md",        min: "10 min",
        d: "Draft a 40\u201360-line CLAUDE.md for your team. Include: project overview, non-negotiable rules, reference to agent_docs/. No task-specific content. Swap with a neighbour for critique." },
      { n: "3", t: "Design a Skill",              min: "8 min",
        d: "Identify one domain knowledge gap (deployment process, data model, API conventions). Write the YAML frontmatter and first 20 lines of a SKILL.md that addresses it. Focus the trigger description carefully." },
      { n: "4", t: "Context strategy mapping",   min: "7 min",
        d: "For the agent workflow you designed in Module 2\u2019s lab: map each piece of context to one of the 4 strategies. Which content is naive injection? Which is JIT? Where would compaction trigger?" },
    ];

    steps.forEach((st, i) => {
      const y = 1.55 + i * 0.97;
      s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y, w: 9.3, h: 0.87, fill: { color: C.offWhite }, shadow: shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y, w: 0.55, h: 0.87, fill: { color: C.teal } });
      s.addText(st.n, { x: 0.35, y, w: 0.55, h: 0.87, fontSize: 22, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
      s.addText(st.t, { x: 1.0, y: y + 0.06, w: 2.4, h: 0.32, fontSize: 13, color: C.teal, bold: true, margin: 0 });
      s.addText(`(${st.min})`, { x: 3.4, y: y + 0.06, w: 0.9, h: 0.32, fontSize: 11, color: C.muted, italic: true, margin: 0 });
      s.addText(st.d, { x: 1.0, y: y + 0.44, w: 8.55, h: 0.38, fontSize: 11, color: C.muted, margin: 0 });
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
      "Q1.  What\u2019s the worst case of bloated context you\u2019ve seen cause an agent to fail or hallucinate?",
      "Q2.  What piece of your team\u2019s domain knowledge would make the highest-impact Skill to create?",
      "Q3.  Where in your current workflow does a missing Definition of Done cause the most rework?",
      "Q4.  Which of the 4 context strategies is your team currently NOT using? What\u2019s the cost?",
    ];
    s.addText(qs.join("\n\n"), { x: 0.5, y: 1.4, w: 5.1, h: 3.1, fontSize: 11.5, color: C.pale, margin: 0 });

    s.addShape(pres.shapes.RECTANGLE, { x: 6.05, y: 0.82, w: 3.6, h: 3.82, fill: { color: C.mid, transparency: 20 }, shadow: shadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: 6.05, y: 0.82, w: 3.6, h: 0.48, fill: { color: C.accent, transparency: 10 } });
    s.addText("KEY TAKEAWAYS", { x: 6.05, y: 0.82, w: 3.6, h: 0.48, fontSize: 11, color: C.white, bold: true, charSpacing: 2, align: "center", valign: "middle", margin: 0 });
    const tks = [
      "\u00B7 Context engineering = agent engineering",
      "\u00B7 CLAUDE.md: <300 lines, universal rules only",
      "\u00B7 Skills: on-demand specialist knowledge",
      "\u00B7 4 strategies: inject, JIT, memory, compact",
      "\u00B7 Spec, DoD, ADRs belong in context",
      "\u00B7 No DoD = agent decides when it\u2019s done",
      "\u00B7 Anti-patterns are predictable \u2014 avoid them early",
    ];
    s.addText(tks.join("\n\n"), { x: 6.2, y: 1.4, w: 3.35, h: 3.1, fontSize: 11.5, color: C.pale, margin: 0 });

    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 4.75, w: 9.3, h: 0.62, fill: { color: C.accent, transparency: 18 } });
    s.addText("NEXT  \u00B7  Module 04: Spec-Driven Development & PRDs  \u2014  Writing requirements agents can actually execute", {
      x: 0.35, y: 4.75, w: 9.3, h: 0.62, fontSize: 11.5, color: C.white, bold: true, align: "center", valign: "middle", margin: 0
    });
  }

  await pres.writeFile({ fileName: "Module_03_Context_Engineering.pptx" });
  console.log("✅ Module 3 written");
}

build().catch(console.error);
