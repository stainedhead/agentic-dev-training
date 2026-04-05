const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const { FaRobot, FaCogs, FaBrain, FaLayerGroup, FaNetworkWired, FaCodeBranch, FaExchangeAlt, FaShieldAlt, FaCheckCircle, FaArrowRight, FaMemory, FaPlug, FaSitemap, FaUserTie, FaLightbulb, FaTools } = require("react-icons/fa");
const { MdLoop, MdHub } = require("react-icons/md");

// ─── Corporate Slate Palette (matches Module 1 v2) ────────────────────────────
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
  pres.title  = "Module 2: Core Agentic Concepts & Terms";
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
    s.addText("MODULE 02", { x: 0.4, y: 0.82, w: 1.5, h: 0.38, fontSize: 11, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });

    s.addText("Core Agentic\nConcepts & Terms", { x: 0.4, y: 1.38, w: 8.0, h: 1.9, fontSize: 48, color: C.white, bold: true, margin: 0 });
    s.addText("The vocabulary and architecture every enterprise developer must own", { x: 0.4, y: 3.38, w: 7.0, h: 0.55, fontSize: 18, color: C.iceBlue, italic: true, margin: 0 });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 4.0, w: 3.5, h: 0.04, fill: { color: C.accent } });
    s.addText([
      { text: "Duration: ", options: { bold: true, color: C.muted } },
      { text: "60–90 min  ", options: { color: C.muted } },
      { text: "  |  ", options: { color: C.muted } },
      { text: "Level: ", options: { bold: true, color: C.muted } },
      { text: "Foundation", options: { color: C.muted } }
    ], { x: 0.4, y: 4.2, w: 5, h: 0.38, fontSize: 13, margin: 0 });

    // Right visual — interconnected node diagram
    const cx = 7.8, cy = 2.8;
    s.addShape(pres.shapes.OVAL, { x: cx - 0.5, y: cy - 0.5, w: 1.0, h: 1.0, fill: { color: C.accent } });
    const spokes = [[cx-1.8, cy-1.4],[cx+0.8, cy-1.5],[cx+1.4, cy+0.2],[cx+0.4, cy+1.4],[cx-1.6, cy+1.1]];
    spokes.forEach(([sx, sy]) => {
      s.addShape(pres.shapes.LINE, { x: Math.min(cx, sx)+0.4, y: Math.min(cy, sy)+0.4, w: Math.abs(cx-sx), h: 0, line: { color: C.teal, width: 1.2 } });
      s.addShape(pres.shapes.OVAL, { x: sx, y: sy, w: 0.7, h: 0.7, fill: { color: C.mid, transparency: 20 } });
    });
    const iRobot = await icon(FaRobot, "#FFFFFF");
    s.addImage({ data: iRobot, x: cx - 0.28, y: cy - 0.28, w: 0.55, h: 0.55 });
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
      { icon: FaTools,      color: C.accent,  title: "Name the Core Vocabulary",     body: "Define Agent, Tool, Memory, Orchestrator, Subagent, MCP — with precision, not jargon." },
      { icon: FaSitemap,    color: C.teal,    title: "Read Multi-Agent Architecture", body: "Interpret orchestrator/subagent diagrams and explain how tasks are decomposed and recombined." },
      { icon: FaPlug,       color: C.green,   title: "Explain MCP",                  body: "Describe how Model Context Protocol standardises agent-to-tool and agent-to-service communication." },
      { icon: FaLayerGroup, color: C.steel,   title: "Apply 12-Factor Principles",   body: "Map the 12 factors of reliable LLM applications (Dex Horthy / HumanLayer) to enterprise practices." },
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
  // SLIDE 3 — The Core Vocabulary (8-term reference)
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.navy };

    s.addText("THE CORE VOCABULARY", { x: 0.4, y: 0.22, w: 9, h: 0.45, fontSize: 13, color: C.iceBlue, bold: true, charSpacing: 3, margin: 0 });
    s.addText("Eight terms that everything else builds on", { x: 0.4, y: 0.72, w: 9, h: 0.38, fontSize: 17, color: C.white, italic: true, margin: 0 });

    const terms = [
      { term: "Agent",         color: C.accent,  def: "An AI that autonomously plans and executes multi-step tasks using tools, memory, and a feedback loop" },
      { term: "Tool",          color: C.teal,    def: "A callable function the agent can invoke: bash, file read/write, web search, API call, database query" },
      { term: "Memory",        color: C.green,   def: "How an agent stores and retrieves context: in-window (short-term), files/notes (working), or vector DB (long-term)" },
      { term: "Orchestrator",  color: C.iceBlue, def: "A lead agent that decomposes a task, assigns subtasks to subagents, and merges results" },
      { term: "Subagent",      color: C.steel,   def: "A child agent spawned by an orchestrator to handle a specific parallel or specialised subtask" },
      { term: "MCP",           color: C.accent,  def: "Model Context Protocol — the open standard for connecting agents to external tools and services" },
      { term: "Context Window", color: C.teal,   def: "The finite token space an LLM reasons over in one call — the central engineering constraint" },
      { term: "HITL",          color: C.green,   def: "Human-in-the-Loop: a governance gate requiring human approval before an irreversible agent action" },
    ];

    const half = 4;
    terms.forEach((t, i) => {
      const col = i < half ? 0 : 1;
      const row = i < half ? i : i - half;
      const x = col === 0 ? 0.35 : 5.15, y = 1.28 + row * 1.05;
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 4.6, h: 0.95, fill: { color: C.mid, transparency: 18 } });
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.06, h: 0.95, fill: { color: t.color } });
      s.addText(t.term, { x: x + 0.16, y: y + 0.06, w: 4.3, h: 0.32, fontSize: 13, color: t.color, bold: true, margin: 0 });
      s.addText(t.def,  { x: x + 0.16, y: y + 0.42, w: 4.3, h: 0.46, fontSize: 10.5, color: C.pale, margin: 0 });
    });
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 4 — Tools: What Agents Can Do
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.white };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.82, fill: { color: C.navy } });
    s.addText("TOOLS  —  AN AGENT'S HANDS", { x: 0.4, y: 0, w: 9, h: 0.82, fontSize: 13, color: C.white, bold: true, charSpacing: 3, valign: "middle", margin: 0 });
    s.addText("Without tools, an agent can only generate text. Tools are what make agents useful.", { x: 0.4, y: 0.9, w: 9.2, h: 0.36, fontSize: 12.5, color: C.muted, italic: true, margin: 0 });

    const toolCats = [
      { cat: "Compute",      color: C.navy,   tools: ["bash / shell", "Python execution", "Docker containers", "CI/CD runners"] },
      { cat: "Files & Data", color: C.teal,   tools: ["read / write files", "grep / glob search", "SQL queries", "Vector DB retrieval"] },
      { cat: "Web & APIs",   color: C.accent, tools: ["web search", "REST API calls", "Browser automation", "Webhook triggers"] },
      { cat: "Comms",        color: C.green,  tools: ["Slack / Teams messages", "Email send", "GitHub PRs & issues", "Jira ticket creation"] },
      { cat: "AI Services",  color: C.steel,  tools: ["Vision / image analysis", "Speech-to-text", "Embeddings generation", "Sub-LLM calls"] },
    ];

    toolCats.forEach((cat, i) => {
      const x = 0.35 + i * 1.88, y = 1.38;
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 1.72, h: 3.95, fill: { color: C.offWhite }, shadow: shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 1.72, h: 0.55, fill: { color: cat.color } });
      s.addText(cat.cat, { x, y, w: 1.72, h: 0.55, fontSize: 12, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
      cat.tools.forEach((tool, j) => {
        s.addShape(pres.shapes.RECTANGLE, { x: x + 0.12, y: y + 0.65 + j * 0.78, w: 1.48, h: 0.65, fill: { color: C.white }, shadow: shadow() });
        s.addText(tool, { x: x + 0.12, y: y + 0.65 + j * 0.78, w: 1.48, h: 0.65, fontSize: 10.5, color: C.text, align: "center", valign: "middle", margin: 0 });
      });
    });

    s.addText("Tool design principle: every tool must be self-contained, non-overlapping, and purpose-specific. \"Every tool must justify its existence.\"  — Anthropic Context Engineering", {
      x: 0.35, y: 5.22, w: 9.3, h: 0.3, fontSize: 10, color: C.muted, italic: true, margin: 0
    });
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 5 — Memory: Three Tiers
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.offWhite };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.82, fill: { color: C.navy } });
    s.addText("MEMORY  —  THREE TIERS", { x: 0.4, y: 0, w: 9, h: 0.82, fontSize: 13, color: C.white, bold: true, charSpacing: 3, valign: "middle", margin: 0 });

    const tiers = [
      {
        n: "1", label: "In-Context\n(Working Memory)", color: C.accent,
        speed: "Instant", cost: "High (tokens)", limit: "128K–1M tokens",
        what: "Everything the agent can currently \"see\" — conversation history, tool results, loaded files, instructions.",
        pattern: "CLAUDE.md, loaded specs, recent tool outputs",
        limit2: "Context window fills up — use compaction"
      },
      {
        n: "2", label: "File-Based\n(Session Memory)", color: C.teal,
        speed: "Fast", cost: "Low", limit: "Unlimited",
        what: "Notes, task lists, and state the agent writes to disk and reads back — persistence beyond context window.",
        pattern: "NOTES.md, TODO.md, MEMORY.md, project state files",
        limit2: "Requires disciplined read/write hygiene"
      },
      {
        n: "3", label: "Semantic\n(Long-Term Memory)", color: C.green,
        speed: "Moderate", cost: "Medium", limit: "Millions of docs",
        what: "Vector-embedded knowledge stores searched by semantic similarity — entire codebases, doc libraries, past conversations.",
        pattern: "Pinecone, pgvector, Chroma, Weaviate — RAG pipelines",
        limit2: "Start with agentic search; add semantic when scale demands"
      },
    ];

    tiers.forEach((t, i) => {
      const x = 0.35 + i * 3.15, y = 0.95;
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 2.95, h: 4.4, fill: { color: C.white }, shadow: shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 2.95, h: 0.65, fill: { color: t.color } });
      s.addText(`TIER ${t.n}`, { x, y, w: 2.95, h: 0.32, fontSize: 11, color: C.white, bold: true, charSpacing: 2, align: "center", valign: "middle", margin: 0 });
      s.addText(t.label, { x, y: y + 0.32, w: 2.95, h: 0.33, fontSize: 12, color: C.white, bold: true, align: "center", margin: 0 });

      const stats = [["Speed", t.speed], ["Cost", t.cost], ["Capacity", t.limit]];
      stats.forEach(([k, v], j) => {
        s.addShape(pres.shapes.RECTANGLE, { x: x + 0.1, y: y + 0.72 + j * 0.38, w: 2.75, h: 0.34, fill: { color: t.color, transparency: 88 } });
        s.addText(`${k}: `, { x: x + 0.18, y: y + 0.72 + j * 0.38, w: 0.8, h: 0.34, fontSize: 10, color: C.muted, bold: true, valign: "middle", margin: 0 });
        s.addText(v, { x: x + 0.88, y: y + 0.72 + j * 0.38, w: 1.85, h: 0.34, fontSize: 10, color: C.text, valign: "middle", margin: 0 });
      });

      s.addText("WHAT IT IS", { x: x + 0.12, y: y + 1.9, w: 2.7, h: 0.26, fontSize: 9, color: t.color, bold: true, charSpacing: 2, margin: 0 });
      s.addText(t.what, { x: x + 0.12, y: y + 2.16, w: 2.7, h: 0.72, fontSize: 10.5, color: C.text, margin: 0 });

      s.addText("PATTERNS", { x: x + 0.12, y: y + 2.98, w: 2.7, h: 0.26, fontSize: 9, color: t.color, bold: true, charSpacing: 2, margin: 0 });
      s.addText(t.pattern, { x: x + 0.12, y: y + 3.24, w: 2.7, h: 0.4, fontSize: 10, color: C.muted, italic: true, margin: 0 });

      s.addText(`⚠ ${t.limit2}`, { x: x + 0.1, y: y + 3.72, w: 2.75, h: 0.48, fontSize: 9.5, color: C.steel, margin: 0 });
    });
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 6 — Multi-Agent Architecture
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.white };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.82, fill: { color: C.teal } });
    s.addText("MULTI-AGENT ARCHITECTURE", { x: 0.4, y: 0, w: 9, h: 0.82, fontSize: 13, color: C.white, bold: true, charSpacing: 3, valign: "middle", margin: 0 });
    s.addText("Orchestrators decompose work. Subagents execute in parallel. Results merge.", { x: 0.4, y: 0.9, w: 9.2, h: 0.34, fontSize: 12.5, color: C.muted, italic: true, margin: 0 });

    // Framing note
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 1.28, w: 9.3, h: 0.36, fill: { color: C.pale, transparency: 20 } });
    s.addText("These patterns apply in two contexts: (1) inside your coding agent — explaining why Claude Code behaves as it does; and (2) in production agent systems your team may eventually build.", {
      x: 0.42, y: 1.28, w: 9.1, h: 0.36, fontSize: 10, color: C.navy, valign: "middle", margin: 0
    });

    // Orchestrator box top-center
    s.addShape(pres.shapes.RECTANGLE, { x: 3.5, y: 1.72, w: 3.0, h: 0.82, fill: { color: C.navy }, shadow: shadow() });
    s.addText("ORCHESTRATOR", { x: 3.5, y: 1.72, w: 3.0, h: 0.42, fontSize: 13, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
    s.addText("decomposes task → assigns → merges", { x: 3.5, y: 2.14, w: 3.0, h: 0.38, fontSize: 10, color: C.iceBlue, align: "center", margin: 0 });

    // Subagent boxes bottom row
    const agents = [
      { label: "Subagent A", sub: "Code generation", color: C.accent },
      { label: "Subagent B", sub: "Web research",    color: C.teal },
      { label: "Subagent C", sub: "File operations", color: C.green },
      { label: "Subagent D", sub: "API calls",       color: C.steel },
    ];

    agents.forEach((a, i) => {
      const x = 0.35 + i * 2.38, y = 3.72;
      // Arrow from orchestrator down
      s.addShape(pres.shapes.LINE, { x: 5.0, y: 2.54, w: 0, h: 1.18, line: { color: C.muted, width: 1.2 } });
      s.addShape(pres.shapes.LINE, { x: x + 1.0, y: 3.72, w: 0, h: -0.85, line: { color: a.color, width: 1.5, dashType: "dash" } });
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 2.1, h: 1.28, fill: { color: C.offWhite }, shadow: shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 2.1, h: 0.4, fill: { color: a.color } });
      s.addText(a.label, { x, y, w: 2.1, h: 0.4, fontSize: 12, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
      s.addText(a.sub,   { x, y: y + 0.45, w: 2.1, h: 0.28, fontSize: 11, color: C.muted, align: "center", margin: 0 });
      s.addText("Tools: bash, files, APIs", { x: x + 0.1, y: y + 0.8, w: 1.9, h: 0.38, fontSize: 9.5, color: C.steel, align: "center", italic: true, margin: 0 });
    });

    // Why section
    const whys = [
      { h: "Parallelisation", d: "Tasks that don't depend on each other run simultaneously — hours become minutes" },
      { h: "Fresh Context",   d: "Each subagent starts clean, avoiding context pollution from unrelated task history" },
      { h: "Specialisation",  d: "Give each subagent specific tools, permissions, and system prompts for its job" },
    ];

    whys.forEach((w, i) => {
      const x = 0.35 + i * 3.15, y = 5.12;
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 2.95, h: 0.38, fill: { color: C.pale } });
      s.addText(w.h, { x: x + 0.1, y, w: 2.75, h: 0.38, fontSize: 11, color: C.navy, bold: true, valign: "middle", margin: 0 });
    });
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 7 — MCP: Model Context Protocol
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.navy };

    s.addText("MODEL CONTEXT PROTOCOL  (MCP)", { x: 0.4, y: 0.22, w: 9, h: 0.45, fontSize: 13, color: C.iceBlue, bold: true, charSpacing: 3, margin: 0 });
    s.addText("The USB-C of AI tools — one standard to connect everything", { x: 0.4, y: 0.72, w: 9, h: 0.38, fontSize: 18, color: C.white, italic: true, margin: 0 });

    // Left — What/Why
    const points = [
      { head: "What it is", body: "An open protocol (Anthropic, 2024) that standardises how agents connect to external tools, data sources, and services via structured tool definitions." },
      { head: "Before MCP", body: "Every tool integration was bespoke — custom code, custom auth, custom schemas. 10 tools meant 10 different integration patterns." },
      { head: "With MCP",   body: "Any MCP-compatible agent connects to any MCP server with the same interface. Build once, use across Claude, Cursor, Copilot, and any compliant agent." },
      { head: "In CI/CD",   body: "MCP servers run as local processes or URLs. Claude Code uses MCP for linting, formatting, testing — giving agents deterministic tool access." },
    ];

    points.forEach((p, i) => {
      const y = 1.3 + i * 1.05;
      s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y, w: 0.06, h: 0.78, fill: { color: C.accent } });
      s.addText(p.head, { x: 0.52, y, w: 4.5, h: 0.32, fontSize: 13, color: C.accent, bold: true, margin: 0 });
      s.addText(p.body, { x: 0.52, y: y + 0.32, w: 4.5, h: 0.48, fontSize: 11, color: C.pale, margin: 0 });
    });

    // Right — MCP ecosystem diagram
    const rx = 5.5;
    s.addShape(pres.shapes.RECTANGLE, { x: rx, y: 1.18, w: 4.1, h: 4.15, fill: { color: C.mid, transparency: 25 }, shadow: shadow() });
    s.addText("MCP ECOSYSTEM", { x: rx, y: 1.18, w: 4.1, h: 0.42, fontSize: 11, color: C.iceBlue, bold: true, charSpacing: 2, align: "center", valign: "middle", margin: 0 });

    // Agent in center
    s.addShape(pres.shapes.RECTANGLE, { x: rx + 1.35, y: 2.45, w: 1.4, h: 0.65, fill: { color: C.accent } });
    s.addText("Agent\n(Claude)", { x: rx + 1.35, y: 2.45, w: 1.4, h: 0.65, fontSize: 11, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });

    // MCP servers around it
    const servers = [
      { label: "GitHub\nMCP",     x: rx + 0.12, y: 1.72 },
      { label: "Slack\nMCP",      x: rx + 2.85, y: 1.72 },
      { label: "Postgres\nMCP",   x: rx + 0.12, y: 3.55 },
      { label: "Browser\nMCP",    x: rx + 2.85, y: 3.55 },
      { label: "Custom\nMCP",     x: rx + 1.48, y: 4.52 },
    ];

    servers.forEach(sv => {
      s.addShape(pres.shapes.RECTANGLE, { x: sv.x, y: sv.y, w: 1.15, h: 0.65, fill: { color: C.teal, transparency: 15 } });
      s.addText(sv.label, { x: sv.x, y: sv.y, w: 1.15, h: 0.65, fontSize: 9.5, color: C.white, align: "center", valign: "middle", margin: 0 });
    });

    s.addText("Latest MCP spec (June 2025): structured tool outputs, OAuth, server-initiated requests, security best practices", {
      x: 0.35, y: 5.28, w: 9.3, h: 0.28, fontSize: 9.5, color: C.muted, italic: true, margin: 0
    });
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 8 — The Claude Agent SDK
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.offWhite };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.82, fill: { color: C.navy } });
    s.addText("THE CLAUDE AGENT SDK", { x: 0.4, y: 0, w: 9, h: 0.82, fontSize: 13, color: C.white, bold: true, charSpacing: 3, valign: "middle", margin: 0 });
    s.addText("The harness that powers Claude Code — now available for any agent you build", { x: 0.4, y: 0.9, w: 9.2, h: 0.32, fontSize: 12.5, color: C.muted, italic: true, margin: 0 });

    const features = [
      { icon: FaCodeBranch, color: C.accent, head: "Full Filesystem Access",    body: "Agents read, write, execute — treating your repo as a working environment, not just a text prompt." },
      { icon: FaNetworkWired, color: C.teal,  head: "Tool Orchestration",        body: "Compose bash, grep, glob, Python, and MCP tools into agent workflows with full control over permissions." },
      { icon: FaSitemap,    color: C.green,  head: "Subagent Parallelisation",  body: "Spawn subagents by default. Lead agents coordinate work; subagents execute. Results merge automatically." },
      { icon: FaMemory,     color: C.steel,  head: "Context Management",        body: "Auto-compaction, tool result clearing, and agentic memory — the SDK manages the context window for you." },
      { icon: FaShieldAlt,  color: C.accent, head: "Permission Scoping",        body: "Grant or deny tool access per agent. Sandbox subagents for security — exactly what Spotify does with Honk." },
      { icon: FaExchangeAlt,color: C.teal,   head: "CI/CD Integration",         body: "Run on a schedule: morning PR reviews, overnight CI failure analysis, weekly dependency audits, doc sync." },
    ];

    for (let i = 0; i < 6; i++) {
      const col = i % 2, row = Math.floor(i / 2);
      const x = col === 0 ? 0.35 : 5.1, y = 1.3 + row * 1.4, w = 4.55, h = 1.28;
      const f = features[i];
      s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color: C.white }, shadow: shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.06, h, fill: { color: f.color } });
      const ic = await icon(f.icon, "#" + f.color);
      s.addImage({ data: ic, x: x + 0.18, y: y + 0.2, w: 0.38, h: 0.38 });
      s.addText(f.head, { x: x + 0.66, y: y + 0.14, w: w - 0.8, h: 0.38, fontSize: 12.5, color: C.navy, bold: true, margin: 0 });
      s.addText(f.body, { x: x + 0.66, y: y + 0.56, w: w - 0.8, h: 0.65, fontSize: 11, color: C.muted, margin: 0 });
    }
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 9 — 12-Factor Agents (Dex Horthy / HumanLayer)
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.white };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.82, fill: { color: C.navy } });
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.35, h: 0.82, fill: { color: C.accent } });
    s.addText("12-FACTOR AGENTS  ·  Dex Horthy, HumanLayer  ·  AI Engineer 2024", { x: 0.5, y: 0, w: 9.1, h: 0.82, fontSize: 12, color: C.white, bold: true, charSpacing: 2, valign: "middle", margin: 0 });
    s.addText("Patterns for building reliable LLM applications at production scale", { x: 0.4, y: 0.88, w: 9.2, h: 0.3, fontSize: 12, color: C.muted, italic: true, margin: 0 });

    const factors = [
      { n:"01", group:"Foundation",    label:"Natural Language to Tool Calls",  note:"Own your prompts; don't hide them in abstractions" },
      { n:"02", group:"Foundation",    label:"Own Your Context Window",          note:"Context engineering IS agent engineering" },
      { n:"03", group:"Foundation",    label:"Own Your Control Flow",            note:"Loops, branches, and retries belong in your code" },
      { n:"04", group:"Reliability",   label:"Tools Are Structured Outputs",     note:"Model outputs JSON, your code calls the real function" },
      { n:"05", group:"Reliability",   label:"Unify Execution State & Steps",    note:"Store what happened — not just what to do next" },
      { n:"06", group:"Reliability",   label:"Launch Small, Focused Agents",     note:"Decompose to subagents before context gets polluted" },
      { n:"07", group:"Human Control", label:"Contact Humans with Tools",        note:"HITL is just another tool call — not a framework" },
      { n:"08", group:"Human Control", label:"Own Your Control Plane",           note:"Interrupt, pause, resume — agents need kill switches" },
      { n:"09", group:"Ops",           label:"Compact Errors into Context",      note:"Errors are signal — summarise and continue, don't crash" },
      { n:"10", group:"Ops",           label:"Small, Focused Context Windows",   note:"Tight context = predictable behaviour" },
      { n:"11", group:"Ops",           label:"Trigger from Events, Not Cron",    note:"Agents are reactive — wire to events not schedules" },
      { n:"12", group:"Ops",           label:"Stateless Reducer Architecture",   note:"Replay any agent run from its event log" },
    ];

    const groupColors = { Foundation: C.accent, Reliability: C.teal, "Human Control": C.green, Ops: C.steel };

    const cols = [0.35, 3.37, 6.37];
    const rows4each = [0, 4, 8];
    [0, 1, 2].forEach(col => {
      const startIdx = col * 4;
      for (let r = 0; r < 4; r++) {
        const f = factors[startIdx + r];
        if (!f) return;
        const x = cols[col], y = 1.28 + r * 1.05, w = 2.88;
        const gc = groupColors[f.group];
        s.addShape(pres.shapes.RECTANGLE, { x, y, w, h: 0.95, fill: { color: C.offWhite }, shadow: shadow() });
        s.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.42, h: 0.95, fill: { color: gc, transparency: 10 } });
        s.addText(f.n, { x, y, w: 0.42, h: 0.95, fontSize: 14, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
        s.addText(f.label, { x: x + 0.5, y: y + 0.06, w: w - 0.58, h: 0.38, fontSize: 11, color: C.navy, bold: true, margin: 0 });
        s.addText(f.note,  { x: x + 0.5, y: y + 0.48, w: w - 0.58, h: 0.38, fontSize: 9.5, color: C.muted, italic: true, margin: 0 });
      }
    });

    // Group legend
    const groups = Object.entries(groupColors);
    groups.forEach(([g, c], i) => {
      s.addShape(pres.shapes.RECTANGLE, { x: 0.35 + i * 2.38, y: 5.3, w: 2.1, h: 0.24, fill: { color: c, transparency: 10 } });
      s.addText(g, { x: 0.35 + i * 2.38, y: 5.3, w: 2.1, h: 0.24, fontSize: 10, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
    });
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 10 — Multi-Agent Patterns (with coding agent examples)
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.navy };

    s.addText("MULTI-AGENT PATTERNS  ·  WITH CODING AGENT EXAMPLES", { x: 0.4, y: 0.22, w: 9, h: 0.45, fontSize: 13, color: C.iceBlue, bold: true, charSpacing: 3, margin: 0 });
    s.addText("Each pattern applies both inside Claude Code and in production agent systems", { x: 0.4, y: 0.72, w: 9, h: 0.35, fontSize: 13, color: C.white, italic: true, margin: 0 });

    const patterns = [
      {
        n: "01", label: "Sequential Pipeline", color: C.accent,
        desc: "Each agent's output is the next agent's input. Simple and debuggable. Use when tasks have clear sequential dependencies.",
        example: "Claude Code: reads spec → writes tests → writes code → runs tests → opens PR. Each step feeds the next."
      },
      {
        n: "02", label: "Parallel Fan-Out", color: C.teal,
        desc: "Parallelise independent subtasks. Reduces wall-clock time for research or analysis. Use when subtasks are independent.",
        example: "Claude Code simultaneously searches multiple codebase areas before synthesising an implementation plan."
      },
      {
        n: "03", label: "Evaluator-Optimizer Loop", color: C.green,
        desc: "An evaluator scores the generator's output and feeds back a critique. The generator revises until quality threshold is met.",
        example: "Claude Code writes a function, runs tests, reads failures, revises — autonomously — until tests pass."
      },
      {
        n: "04", label: "Specialist Routing", color: C.steel,
        desc: "A lightweight router examines the request and delegates to the right specialist agent for the job.",
        example: "Copilot Chat routes to codebase search vs. documentation lookup vs. code generation depending on intent."
      },
    ];

    for (let i = 0; i < 4; i++) {
      const p = patterns[i];
      const col = i % 2, row = Math.floor(i / 2);
      const x = col === 0 ? 0.35 : 5.15, y = 1.18 + row * 2.1, w = 4.55, h = 1.95;
      s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color: C.mid, transparency: 20 }, shadow: shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.55, h, fill: { color: p.color, transparency: 15 } });
      s.addText(p.n, { x, y, w: 0.55, h, fontSize: 18, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
      s.addText(p.label, { x: x + 0.65, y: y + 0.1, w: w - 0.75, h: 0.36, fontSize: 13, color: p.color, bold: true, margin: 0 });
      s.addText(p.desc,  { x: x + 0.65, y: y + 0.48, w: w - 0.75, h: 0.62, fontSize: 10.5, color: C.pale, margin: 0 });
      s.addShape(pres.shapes.RECTANGLE, { x: x + 0.65, y: y + 1.16, w: w - 0.75, h: 0.68, fill: { color: p.color, transparency: 75 } });
      s.addText("Claude Code / Copilot: " + p.example, { x: x + 0.72, y: y + 1.18, w: w - 0.85, h: 0.64, fontSize: 9.5, color: C.white, italic: true, valign: "middle", margin: 0 });
    }

    s.addText("Understanding these patterns helps you reason about Claude Code behaviour and design production systems when the time comes.", {
      x: 0.35, y: 5.42, w: 9.3, h: 0.24, fontSize: 9.5, color: C.iceBlue, italic: true, align: "center", margin: 0
    });
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 11 — Lab Exercise (PaymentService Refactor Scenario)
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.white };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.82, fill: { color: C.teal } });
    s.addText("LAB EXERCISE  ·  25 MINUTES", { x: 0.4, y: 0, w: 9, h: 0.82, fontSize: 13, color: C.white, bold: true, charSpacing: 3, valign: "middle", margin: 0 });
    s.addText("Apply the Vocabulary to a Real Claude Code Scenario", { x: 0.4, y: 0.9, w: 9.2, h: 0.4, fontSize: 17, color: C.navy, bold: true, margin: 0 });

    // Scenario box
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 1.38, w: 9.3, h: 0.72, fill: { color: C.offWhite }, shadow: shadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 1.38, w: 0.06, h: 0.72, fill: { color: C.accent } });
    s.addText("SCENARIO", { x: 0.5, y: 1.38, w: 1.2, h: 0.32, fontSize: 10, color: C.accent, bold: true, charSpacing: 2, margin: 0 });
    s.addText("A developer asks Claude Code: \"Refactor the PaymentService to extract a separate InvoiceService, move the relevant methods, update all call sites, and make sure the tests still pass.\"", {
      x: 0.5, y: 1.66, w: 9.05, h: 0.38, fontSize: 11.5, color: C.text, italic: true, margin: 0
    });

    const tasks = [
      { n:"1", t:"Map the Agent Loop", min:"5 min",
        d:"Break this task into the steps Claude Code would take. For each step: what tool does it call? What does it observe? What decision does it make next?" },
      { n:"2", t:"Classify the Tools", min:"5 min",
        d:"List every tool Claude Code would need (file read, file write, shell execution, etc.) and classify each as read, write, or communication." },
      { n:"3", t:"Identify Memory Use", min:"5 min",
        d:"What information must the agent carry forward across steps? Which memory type (in-context, external, semantic, episodic) applies to each piece of state?" },
      { n:"4", t:"Define the Trust Boundary", min:"5 min",
        d:"What should Claude Code do autonomously? Where should it pause for human confirmation? Write the interrupt conditions for this specific task." },
      { n:"5", t:"Apply a Pattern", min:"5 min",
        d:"Which multi-agent pattern best describes how Claude Code should approach this refactor — sequential pipeline, fan-out, or evaluator-optimizer? Why?" },
    ];

    tasks.forEach((t, i) => {
      const y = 2.2 + i * 0.64;
      s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y, w: 9.3, h: 0.58, fill: { color: C.offWhite }, shadow: shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y, w: 0.45, h: 0.58, fill: { color: C.teal } });
      s.addText(t.n, { x: 0.35, y, w: 0.45, h: 0.58, fontSize: 18, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
      s.addText(t.t, { x: 0.9, y: y + 0.04, w: 2.0, h: 0.26, fontSize: 12, color: C.teal, bold: true, margin: 0 });
      s.addText(`(${t.min})`, { x: 2.9, y: y + 0.04, w: 0.8, h: 0.26, fontSize: 10.5, color: C.muted, italic: true, margin: 0 });
      s.addText(t.d, { x: 0.9, y: y + 0.3, w: 8.65, h: 0.25, fontSize: 10.5, color: C.muted, margin: 0 });
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
      "Q1.  Which of the 12 factors maps most directly to a production failure you have seen?",
      "Q2.  For your team's next automation candidate, which memory tier does it primarily need?",
      "Q3.  Where in your SDLC would you first introduce an orchestrator/subagent pattern — and why?",
      "Q4.  What's the first MCP server you would build or adopt for your team? What would it connect to?",
    ];
    s.addText(qs.join("\n\n"), { x: 0.5, y: 1.4, w: 5.1, h: 3.1, fontSize: 11.5, color: C.pale, margin: 0 });

    s.addShape(pres.shapes.RECTANGLE, { x: 6.05, y: 0.82, w: 3.6, h: 3.82, fill: { color: C.mid, transparency: 20 }, shadow: shadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: 6.05, y: 0.82, w: 3.6, h: 0.48, fill: { color: C.accent, transparency: 10 } });
    s.addText("KEY TAKEAWAYS", { x: 6.05, y: 0.82, w: 3.6, h: 0.48, fontSize: 11, color: C.white, bold: true, charSpacing: 2, align: "center", valign: "middle", margin: 0 });
    const tks = [
      "· Agent = Tool + Memory + Loop",
      "· Tools are the agent's hands — design them carefully",
      "· Three memory tiers — match to task complexity",
      "· Orchestrators decompose; subagents specialise",
      "· MCP is the standard — adopt it now",
      "· 12-Factor = reliability checklist for production",
      "· Spotify proves this works at enterprise scale",
    ];
    s.addText(tks.join("\n\n"), { x: 6.2, y: 1.4, w: 3.35, h: 3.1, fontSize: 11.5, color: C.pale, margin: 0 });

    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 4.75, w: 9.3, h: 0.62, fill: { color: C.accent, transparency: 18 } });
    s.addText("NEXT  ·  Module 03: Context Engineering  —  CLAUDE.md, Rules Files, Skills, Just-in-Time Retrieval, Compaction", {
      x: 0.35, y: 4.75, w: 9.3, h: 0.62, fontSize: 11.5, color: C.white, bold: true, align: "center", valign: "middle", margin: 0
    });
  }

  await pres.writeFile({ fileName: "Module_02_Core_Concepts.pptx" });
  console.log("✅ Module 2 written");
}

build().catch(console.error);
