const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");

// Icon imports
const { FaComments, FaRobot, FaArrowRight, FaSync, FaSearch, FaCheckCircle, FaCogs, FaUserTie, FaCode, FaLightbulb, FaChartLine, FaShieldAlt, FaBolt, FaLayerGroup } = require("react-icons/fa");
const { MdLoop, MdOutlineAutoAwesome } = require("react-icons/md");

// ─── Color Palette: Corporate Slate ─────────────────────────────────────────
const C = {
  navy:    "1C3557",   // deep slate blue — primary dark
  iceBlue: "5B8DB8",   // medium blue — secondary
  pale:    "D4E4F0",   // pale blue-grey — light tint
  white:   "FFFFFF",
  offWhite:"F3F6F9",   // near-white with blue cast
  accent:  "3A7DC9",   // bright medium blue — primary accent
  teal:    "4A7FA8",   // steel blue — highlight
  mid:     "2E5073",   // mid slate — cards on dark
  text:    "1E2D3D",   // near-black with blue cast
  muted:   "7A90A8",   // blue-grey muted text
  green:   "3A7E6E",   // muted teal-green
  coral:   "8096B0",   // steel grey (replaces coral — all warnings use this)
};

// ─── Icon helper ─────────────────────────────────────────────────────────────
async function icon(Component, color = "#FFFFFF", size = 256) {
  const svg = ReactDOMServer.renderToStaticMarkup(
    React.createElement(Component, { color, size: String(size) })
  );
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}

// ─── Shadow factory (never reuse object) ─────────────────────────────────────
const shadow = () => ({ type: "outer", color: "000000", blur: 8, offset: 3, angle: 135, opacity: 0.15 });

// ─── Main ─────────────────────────────────────────────────────────────────────
async function build() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.title  = "Module 1: Chat vs. Agents";
  pres.author = "Enterprise Architect Training Series";

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 1 — Title
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.navy };

    // Left accent bar
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.18, h: 5.625, fill: { color: C.accent } });

    // Top label
    s.addText("ENTERPRISE AGENTIC PRACTICES", {
      x: 0.4, y: 0.35, w: 9.2, h: 0.35,
      fontSize: 10, color: C.iceBlue, bold: true, charSpacing: 4, margin: 0
    });

    // Module badge
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.4, y: 0.85, w: 1.5, h: 0.38,
      fill: { color: C.accent }
    });
    s.addText("MODULE 01", {
      x: 0.4, y: 0.85, w: 1.5, h: 0.38,
      fontSize: 11, color: C.navy, bold: true, align: "center", valign: "middle", margin: 0
    });

    // Main title
    s.addText("Chat vs. Agents", {
      x: 0.4, y: 1.45, w: 8.8, h: 1.5,
      fontSize: 56, color: C.white, bold: true, margin: 0
    });

    // Subtitle
    s.addText("From reactive responses to autonomous action", {
      x: 0.4, y: 3.05, w: 7.0, h: 0.55,
      fontSize: 20, color: C.iceBlue, italic: true, margin: 0
    });

    // Divider
    s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 3.75, w: 3.5, h: 0.04, fill: { color: C.accent } });

    // Bottom meta
    s.addText([
      { text: "Duration: ", options: { bold: true, color: C.muted } },
      { text: "60–90 min  ", options: { color: C.muted } },
      { text: "  |  ", options: { color: C.muted } },
      { text: "Level: ", options: { bold: true, color: C.muted } },
      { text: "Foundation", options: { color: C.muted } }
    ], { x: 0.4, y: 4.0, w: 5, h: 0.4, fontSize: 13, margin: 0 });

    // Right side visual — overlapping circles suggestion
    s.addShape(pres.shapes.OVAL, { x: 6.8, y: 0.7, w: 2.8, h: 2.8, fill: { color: C.mid, transparency: 30 } });
    s.addShape(pres.shapes.OVAL, { x: 7.6, y: 1.5, w: 2.8, h: 2.8, fill: { color: C.teal, transparency: 50 } });
    s.addShape(pres.shapes.OVAL, { x: 6.4, y: 1.8, w: 2.8, h: 2.8, fill: { color: C.accent, transparency: 65 } });

    const iChat = await icon(FaComments, "#FFFFFF");
    const iRobot = await icon(FaRobot, "#FFFFFF");
    s.addImage({ data: iChat,  x: 7.05, y: 1.35, w: 0.7, h: 0.7 });
    s.addImage({ data: iRobot, x: 8.15, y: 2.05, w: 0.7, h: 0.7 });
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 2 — Learning Objectives
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.offWhite };

    // Header bar
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.9, fill: { color: C.navy } });
    s.addText("LEARNING OBJECTIVES", {
      x: 0.4, y: 0, w: 9.2, h: 0.9,
      fontSize: 14, color: C.white, bold: true, charSpacing: 3, valign: "middle", margin: 0
    });

    const objectives = [
      { icon: FaComments, color: C.navy,  title: "Understand the Chat Paradigm", body: "Define reactive AI, prompt-response cycles, and why chat has limits for enterprise work." },
      { icon: FaRobot,    color: C.teal,  title: "Define Agentic AI",             body: "Articulate what makes an AI system an agent: autonomy, tools, memory, and feedback loops." },
      { icon: FaSync,     color: C.accent,title: "Map the Autonomy Spectrum",     body: "Apply IBM's three-tier model to classify agent deployments by risk and human oversight." },
      { icon: FaUserTie,  color: C.coral, title: "Adopt the Supervisor Mindset",  body: "Describe the engineer's new role as intent-setter and reviewer rather than code author." },
    ];

    const cols = [0.35, 5.1];
    const rows = [1.05, 3.15];
    for (let i = 0; i < 4; i++) {
      const col = i % 2, row = Math.floor(i / 2);
      const x = cols[col], y = rows[row], w = 4.55, h = 1.85;
      const obj = objectives[i];

      s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color: C.white }, shadow: shadow() });
      // left accent
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.07, h, fill: { color: obj.color } });

      const ic = await icon(obj.icon, "#" + obj.color);
      s.addImage({ data: ic, x: x + 0.18, y: y + 0.2, w: 0.42, h: 0.42 });

      s.addText(obj.title, {
        x: x + 0.7, y: y + 0.16, w: w - 0.85, h: 0.48,
        fontSize: 13, color: C.text, bold: true, margin: 0
      });
      s.addText(obj.body, {
        x: x + 0.7, y: y + 0.66, w: w - 0.85, h: 1.0,
        fontSize: 11.5, color: C.muted, margin: 0
      });
    }

    s.addText("By the end of this module you will be able to:", {
      x: 0.35, y: 0.92, w: 9.3, h: 0.28, fontSize: 11, color: C.muted, italic: true, margin: 0
    });
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 3 — The Chat Paradigm
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.white };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.82, fill: { color: C.navy } });
    s.addText("THE CHAT PARADIGM", {
      x: 0.4, y: 0, w: 9, h: 0.82,
      fontSize: 13, color: C.white, bold: true, charSpacing: 3, valign: "middle", margin: 0
    });

    // Left: description
    s.addText("How most developers first encounter AI", {
      x: 0.4, y: 0.95, w: 5.0, h: 0.4,
      fontSize: 15, color: C.muted, italic: true, margin: 0
    });

    const chatPoints = [
      { title: "Reactive", body: "Responds only when prompted. Waits for human input at every step." },
      { title: "Stateless (by default)", body: "Each message is largely independent. No persistent memory across sessions." },
      { title: "Single-turn", body: "One prompt → one response. The human orchestrates the workflow." },
      { title: "Human-driven", body: "The human decides every next step. AI is a smart autocomplete." },
    ];

    chatPoints.forEach((p, i) => {
      const y = 1.45 + i * 0.95;
      s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y, w: 0.06, h: 0.65, fill: { color: C.iceBlue } });
      s.addText(p.title, { x: 0.58, y, w: 4.5, h: 0.3, fontSize: 13, color: C.navy, bold: true, margin: 0 });
      s.addText(p.body,  { x: 0.58, y: y + 0.3, w: 4.5, h: 0.35, fontSize: 11.5, color: C.muted, margin: 0 });
    });

    // Right: diagram — request / response loop
    const dx = 5.7;
    s.addShape(pres.shapes.RECTANGLE, { x: dx, y: 0.92, w: 4.0, h: 4.5, fill: { color: C.offWhite }, shadow: shadow() });

    // Human box
    s.addShape(pres.shapes.RECTANGLE, { x: dx + 0.3, y: 1.2, w: 1.4, h: 0.7, fill: { color: C.navy } });
    s.addText("Human", { x: dx + 0.3, y: 1.2, w: 1.4, h: 0.7, fontSize: 13, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });

    // AI box
    s.addShape(pres.shapes.RECTANGLE, { x: dx + 2.3, y: 1.2, w: 1.4, h: 0.7, fill: { color: C.iceBlue } });
    s.addText("LLM", { x: dx + 2.3, y: 1.2, w: 1.4, h: 0.7, fontSize: 13, color: C.navy, bold: true, align: "center", valign: "middle", margin: 0 });

    // Arrow right: prompt
    s.addShape(pres.shapes.LINE, { x: dx + 1.7, y: 1.42, w: 0.6, h: 0, line: { color: C.navy, width: 2 } });
    s.addText("prompt →", { x: dx + 1.55, y: 1.2, w: 0.9, h: 0.3, fontSize: 9, color: C.navy, align: "center", margin: 0 });

    // Arrow left: response
    s.addShape(pres.shapes.LINE, { x: dx + 1.7, y: 1.72, w: 0.6, h: 0, line: { color: C.teal, width: 2 } });
    s.addText("← response", { x: dx + 1.55, y: 1.72, w: 0.9, h: 0.3, fontSize: 9, color: C.teal, align: "center", margin: 0 });

    // Repeat x3 stacked
    [2.15, 3.1, 4.05].forEach((yy) => {
      s.addShape(pres.shapes.RECTANGLE, { x: dx + 0.3, y: yy, w: 1.4, h: 0.6, fill: { color: C.navy, transparency: 15 } });
      s.addText("Human", { x: dx + 0.3, y: yy, w: 1.4, h: 0.6, fontSize: 11, color: C.white, align: "center", valign: "middle", margin: 0 });
      s.addShape(pres.shapes.RECTANGLE, { x: dx + 2.3, y: yy, w: 1.4, h: 0.6, fill: { color: C.iceBlue, transparency: 25 } });
      s.addText("LLM", { x: dx + 2.3, y: yy, w: 1.4, h: 0.6, fontSize: 11, color: C.navy, align: "center", valign: "middle", margin: 0 });
      s.addShape(pres.shapes.LINE, { x: dx + 1.7, y: yy + 0.22, w: 0.6, h: 0, line: { color: C.navy, width: 1.5 } });
      s.addShape(pres.shapes.LINE, { x: dx + 1.7, y: yy + 0.44, w: 0.6, h: 0, line: { color: C.teal, width: 1.5 } });
    });

    s.addText("Human orchestrates every step", {
      x: dx + 0.2, y: 4.85, w: 3.6, h: 0.35,
      fontSize: 10.5, color: C.muted, italic: true, align: "center", margin: 0
    });
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 4 — The Agent Paradigm (dark)
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.navy };

    s.addText("THE AGENT PARADIGM", {
      x: 0.4, y: 0.28, w: 9.2, h: 0.45,
      fontSize: 13, color: C.iceBlue, bold: true, charSpacing: 3, margin: 0
    });
    s.addText("AI that acts, not just responds", {
      x: 0.4, y: 0.78, w: 9.2, h: 0.4,
      fontSize: 20, color: C.white, italic: true, margin: 0
    });

    // Four pillars
    const pillars = [
      { icon: FaBolt,       color: C.accent,  label: "Autonomous",   desc: "Takes sequences of actions without human approval at each step" },
      { icon: FaCogs,       color: C.teal,    label: "Tool-Enabled",  desc: "Executes code, reads files, calls APIs, searches the web" },
      { icon: FaLayerGroup, color: C.iceBlue, label: "Memory-Aware",  desc: "Maintains context across steps; reads and writes its own notes" },
      { icon: FaSync,       color: C.coral,   label: "Self-Verifying", desc: "Checks its own output, self-corrects, loops until task is done" },
    ];

    for (let i = 0; i < 4; i++) {
      const x = 0.35 + i * 2.37, y = 1.45;
      const p = pillars[i];
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 2.2, h: 3.6, fill: { color: C.mid, transparency: 25 }, shadow: shadow() });

      const ic = await icon(p.icon, "#" + p.color);
      s.addImage({ data: ic, x: x + 0.75, y: y + 0.3, w: 0.65, h: 0.65 });

      s.addShape(pres.shapes.RECTANGLE, { x: x + 0.5, y: y + 1.1, w: 1.2, h: 0.04, fill: { color: p.color } });

      s.addText(p.label, {
        x: x + 0.1, y: y + 1.25, w: 2.0, h: 0.45,
        fontSize: 14, color: C.white, bold: true, align: "center", margin: 0
      });
      s.addText(p.desc, {
        x: x + 0.1, y: y + 1.78, w: 2.0, h: 1.4,
        fontSize: 11, color: C.pale, align: "center", margin: 0
      });
    }

    s.addText("Agents combine these four properties to complete multi-step tasks independently", {
      x: 0.35, y: 5.18, w: 9.3, h: 0.33,
      fontSize: 11, color: C.iceBlue, italic: true, align: "center", margin: 0
    });
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 5 — Side-by-Side Comparison (manual rows)
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.offWhite };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.75, fill: { color: C.navy } });
    s.addText("CHAT vs. AGENTS  —  SIDE BY SIDE", {
      x: 0.35, y: 0, w: 9.3, h: 0.75,
      fontSize: 13, color: C.white, bold: true, charSpacing: 3, valign: "middle", margin: 0
    });

    const c0 = 0.35, c1 = 2.85, c2 = 6.22;
    const w0 = 2.4,  w1 = 3.27, w2 = 3.43;

    // Column headers
    s.addShape(pres.shapes.RECTANGLE, { x: c0, y: 0.82, w: w0, h: 0.5, fill: { color: C.pale } });
    s.addShape(pres.shapes.RECTANGLE, { x: c1, y: 0.82, w: w1, h: 0.5, fill: { color: "DCE9F5" } });
    s.addShape(pres.shapes.RECTANGLE, { x: c2, y: 0.82, w: w2, h: 0.5, fill: { color: "D8E8F3" } });
    s.addText("DIMENSION",      { x: c0+0.12, y: 0.82, w: w0-0.14, h: 0.5, fontSize: 11, color: C.navy, bold: true, charSpacing: 2, valign: "middle", margin: 0 });
    s.addText("CHAT INTERFACE", { x: c1+0.12, y: 0.82, w: w1-0.14, h: 0.5, fontSize: 11, color: C.navy, bold: true, charSpacing: 2, valign: "middle", margin: 0 });
    s.addText("AGENTIC SYSTEM", { x: c2+0.12, y: 0.82, w: w2-0.14, h: 0.5, fontSize: 11, color: C.teal, bold: true, charSpacing: 2, valign: "middle", margin: 0 });

    const dataRows = [
      ["Control",        "Human decides every step",    "Agent decides steps autonomously"],
      ["Memory",         "Stateless — each turn fresh", "Persistent across steps & sessions"],
      ["Tool Use",       "None — text output only",     "Code, files, APIs, bash, search"],
      ["Error Handling", "Human notices, re-prompts",   "Agent self-detects and self-corrects"],
      ["Task Length",    "Single exchange",             "Hours-long multi-step workflows"],
      ["Oversight",      "Always human-in-the-loop",   "HITL at defined checkpoints only"],
      ["Output",         "Text response",              "PRs, reports, deployed changes"],
    ];

    dataRows.forEach((row, i) => {
      const y = 1.38 + i * 0.565;
      const bg = i % 2 === 0 ? C.white : C.offWhite;
      s.addShape(pres.shapes.RECTANGLE, { x: c0, y, w: w0, h: 0.55, fill: { color: C.pale } });
      s.addShape(pres.shapes.RECTANGLE, { x: c1, y, w: w1, h: 0.55, fill: { color: bg } });
      s.addShape(pres.shapes.RECTANGLE, { x: c2, y, w: w2, h: 0.55, fill: { color: bg } });
      s.addShape(pres.shapes.LINE, { x: c0, y: y+0.55, w: w0+w1+w2, h: 0, line: { color: "C8D5E3", width: 0.5 } });

      s.addText(row[0], { x: c0+0.12, y, w: w0-0.2,  h: 0.55, fontSize: 12,   color: C.navy, bold: true, valign: "middle", margin: 0 });
      s.addText(row[1], { x: c1+0.12, y, w: w1-0.18, h: 0.55, fontSize: 11.5, color: C.muted,            valign: "middle", margin: 0 });
      s.addText(row[2], { x: c2+0.12, y, w: w2-0.2,  h: 0.55, fontSize: 11.5, color: C.text,             valign: "middle", margin: 0 });
    });
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 6 — The Agent Loop
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.white };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.82, fill: { color: C.teal } });
    s.addText("THE AGENT LOOP", {
      x: 0.4, y: 0, w: 9, h: 0.82,
      fontSize: 13, color: C.white, bold: true, charSpacing: 3, valign: "middle", margin: 0
    });

    s.addText("The fundamental execution pattern — used by Claude Code, Spotify's Honk, and every production agent", {
      x: 0.4, y: 0.92, w: 9.2, h: 0.38,
      fontSize: 12, color: C.muted, italic: true, margin: 0
    });

    // 4 step boxes in a horizontal flow
    const steps = [
      { num: "01", label: "Gather\nContext",  color: C.navy,   desc: "Read files, search docs, inspect codebase, retrieve memory" },
      { num: "02", label: "Take\nAction",     color: C.teal,   desc: "Write code, call API, run bash command, update file" },
      { num: "03", label: "Verify\nWork",     color: C.accent, desc: "Run tests, check linter, evaluate output against spec" },
      { num: "04", label: "Repeat\nor Done",  color: C.green,  desc: "Loop back if needed; stop when acceptance criteria met" },
    ];

    for (let i = 0; i < 4; i++) {
      const x = 0.35 + i * 2.38;
      const p = steps[i];

      // Main card
      s.addShape(pres.shapes.RECTANGLE, { x, y: 1.5, w: 2.1, h: 3.5, fill: { color: C.offWhite }, shadow: shadow() });
      // Number header
      s.addShape(pres.shapes.RECTANGLE, { x, y: 1.5, w: 2.1, h: 0.75, fill: { color: p.color } });
      s.addText(p.num, { x, y: 1.5, w: 2.1, h: 0.75, fontSize: 28, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
      // Label
      s.addText(p.label, { x, y: 2.35, w: 2.1, h: 0.75, fontSize: 15, color: p.color, bold: true, align: "center", margin: 0 });
      // Description
      s.addText(p.desc, { x: x + 0.1, y: 3.15, w: 1.9, h: 1.65, fontSize: 11, color: C.muted, align: "center", margin: 0 });

      // Arrow between steps
      if (i < 3) {
        s.addShape(pres.shapes.RECTANGLE, { x: x + 2.12, y: 2.22, w: 0.24, h: 0.08, fill: { color: C.muted } });
        s.addText("→", { x: x + 2.1, y: 2.05, w: 0.3, h: 0.38, fontSize: 20, color: C.muted, align: "center", margin: 0 });
      }
    }

    // Loop-back arrow annotation
    s.addShape(pres.shapes.LINE, { x: 0.7, y: 5.2, w: 8.3, h: 0, line: { color: C.teal, width: 1.5, dashType: "dash" } });
    s.addText("← — — — — — — Loops until task complete or human checkpoint — — — — — — →", {
      x: 0.35, y: 5.2, w: 9.3, h: 0.3,
      fontSize: 9.5, color: C.teal, align: "center", italic: true, margin: 0
    });
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 7 — The Autonomy Spectrum
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.navy };

    s.addText("THE AUTONOMY SPECTRUM", {
      x: 0.4, y: 0.28, w: 9, h: 0.45,
      fontSize: 13, color: C.iceBlue, bold: true, charSpacing: 3, margin: 0
    });
    s.addText("Not all agents are equal — match autonomy to risk  (IBM three-tier model)", {
      x: 0.4, y: 0.78, w: 9, h: 0.38,
      fontSize: 14, color: C.white, italic: true, margin: 0
    });

    const tiers = [
      {
        tier: "TIER 1", label: "Fully Automated", color: C.green,
        when: "Low-risk, reversible tasks",
        examples: ["Log analysis", "Test environment ops", "Dependency version bumps", "Doc generation"],
        oversight: "Minimal — humans review reports, not every action"
      },
      {
        tier: "TIER 2", label: "Supervised Execution", color: C.accent,
        when: "Medium-risk, recoverable tasks",
        examples: ["Feature PRs for review", "Data pipeline changes", "API integrations", "Content generation"],
        oversight: "Human approves before merge/deploy"
      },
      {
        tier: "TIER 3", label: "Human-Directed", color: C.coral,
        when: "High-risk, irreversible tasks",
        examples: ["Production DB writes", "Financial transactions", "Security config changes", "External communications"],
        oversight: "Human decides; agent surfaces options only"
      },
    ];

    tiers.forEach((t, i) => {
      const x = 0.35 + i * 3.15, y = 1.45;
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 2.95, h: 3.85, fill: { color: C.mid, transparency: 20 }, shadow: shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 2.95, h: 0.6, fill: { color: t.color } });
      s.addText(`${t.tier}  ·  ${t.label}`, { x, y, w: 2.95, h: 0.6, fontSize: 12, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });

      s.addText("WHEN TO USE", { x: x + 0.15, y: y + 0.7, w: 2.65, h: 0.28, fontSize: 9, color: t.color, bold: true, charSpacing: 2, margin: 0 });
      s.addText(t.when, { x: x + 0.15, y: y + 0.98, w: 2.65, h: 0.38, fontSize: 11.5, color: C.white, margin: 0 });

      s.addText("EXAMPLES", { x: x + 0.15, y: y + 1.48, w: 2.65, h: 0.28, fontSize: 9, color: t.color, bold: true, charSpacing: 2, margin: 0 });
      s.addText(t.examples.map(e => `· ${e}`).join("\n"), {
        x: x + 0.15, y: y + 1.76, w: 2.65, h: 1.1,
        fontSize: 11, color: C.pale, margin: 0
      });

      s.addText("OVERSIGHT", { x: x + 0.15, y: y + 2.95, w: 2.65, h: 0.25, fontSize: 9, color: t.color, bold: true, charSpacing: 2, margin: 0 });
      s.addText(t.oversight, { x: x + 0.15, y: y + 3.2, w: 2.65, h: 0.5, fontSize: 10.5, color: C.pale, italic: true, margin: 0 });
    });

    // Gradient arrow across bottom
    s.addShape(pres.shapes.LINE, { x: 0.35, y: 5.42, w: 9.3, h: 0, line: { color: C.iceBlue, width: 1 } });
    s.addText("← More human control                                                              More agent autonomy →", {
      x: 0.35, y: 5.28, w: 9.3, h: 0.28, fontSize: 10, color: C.iceBlue, italic: true, align: "center", margin: 0
    });
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 8 — Spotify Case Study
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.white };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.82, fill: { color: C.navy } });
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.35, h: 0.82, fill: { color: C.green } });
    s.addText("INDUSTRY SIGNAL  ·  SPOTIFY  ·  2025–2026", {
      x: 0.5, y: 0, w: 9.1, h: 0.82,
      fontSize: 12, color: C.white, bold: true, charSpacing: 3, valign: "middle", margin: 0
    });

    // Big quote
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 0.95, w: 9.3, h: 1.5, fill: { color: C.offWhite }, shadow: shadow() });
    s.addText("\u201C", { x: 0.45, y: 0.88, w: 0.5, h: 0.8, fontSize: 60, color: C.iceBlue, bold: true, margin: 0 });
    s.addText(
      "When I speak to my most senior engineers — the best developers we have — they say they have not written a single line of code since December. They only generate code and supervise it.",
      { x: 0.8, y: 1.02, w: 8.4, h: 1.28, fontSize: 14, color: C.text, italic: true, margin: 0 }
    );
    s.addText("— Daniel Ek / Alex Söderström, Spotify Co-CEO  ·  Q4 2025 Earnings Call", {
      x: 0.8, y: 2.38, w: 8.4, h: 0.3, fontSize: 10, color: C.muted, margin: 0
    });

    // 3 stat callouts
    const stats = [
      { num: "~50%",  label: "of all Spotify PRs", sub: "automated by agents since mid-2024" },
      { num: "1,500+", label: "agent-generated PRs", sub: "merged across their codebase" },
      { num: "50+",   label: "features shipped",   sub: "in 2025, accelerated by Honk agents" },
    ];

    stats.forEach((st, i) => {
      const x = 0.35 + i * 3.15;
      s.addShape(pres.shapes.RECTANGLE, { x, y: 2.82, w: 2.95, h: 2.0, fill: { color: i === 0 ? C.navy : (i === 1 ? C.teal : C.accent) }, shadow: shadow() });
      s.addText(st.num,   { x, y: 2.95, w: 2.95, h: 0.75, fontSize: 36, color: C.white, bold: true, align: "center", margin: 0 });
      s.addText(st.label, { x, y: 3.68, w: 2.95, h: 0.38, fontSize: 12, color: C.white, bold: true, align: "center", margin: 0 });
      s.addText(st.sub,   { x, y: 4.06, w: 2.95, h: 0.58, fontSize: 10, color: C.pale,  align: "center", italic: true, margin: 0 });
    });
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 9 — What Changes for Enterprise Developers
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.offWhite };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.82, fill: { color: C.navy } });
    s.addText("THE ROLE SHIFT FOR ENTERPRISE DEVELOPERS", {
      x: 0.4, y: 0, w: 9, h: 0.82,
      fontSize: 13, color: C.white, bold: true, charSpacing: 3, valign: "middle", margin: 0
    });

    // Before / After
    const beforeItems = [
      "Write every line of code manually",
      "Debug syntax and boilerplate",
      "Context-switch between tasks",
      "Orchestrate your own workflow step-by-step",
      "Review your own output before committing",
    ];
    const afterItems = [
      "Define intent: spec, acceptance criteria, DoD",
      "Review and approve agent-generated diffs",
      "Design agent architecture and tool boundaries",
      "Set oversight gates and HITL checkpoints",
      "Evaluate quality at the system level",
    ];

    // Before card
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 0.95, w: 4.3, h: 4.4, fill: { color: C.white }, shadow: shadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 0.95, w: 4.3, h: 0.55, fill: { color: "B8CADA" } });
    s.addText("BEFORE  ·  Chat Era", { x: 0.35, y: 0.95, w: 4.3, h: 0.55, fontSize: 12, color: C.text, bold: true, align: "center", valign: "middle", margin: 0 });
    beforeItems.forEach((t, i) => {
      s.addText('✗  ' + t, { x: 0.55, y: 1.56 + i * 0.62, w: 3.9, h: 0.55, fontSize: 11.5, color: C.muted, margin: 0 });
    });

    // Arrow
    s.addText("→", { x: 4.75, y: 2.7, w: 0.5, h: 0.6, fontSize: 28, color: C.accent, bold: true, align: "center", margin: 0 });

    // After card
    s.addShape(pres.shapes.RECTANGLE, { x: 5.35, y: 0.95, w: 4.3, h: 4.4, fill: { color: C.white }, shadow: shadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: 5.35, y: 0.95, w: 4.3, h: 0.55, fill: { color: C.teal } });
    s.addText("AFTER  ·  Agent Era", { x: 5.35, y: 0.95, w: 4.3, h: 0.55, fontSize: 12, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
    afterItems.forEach((t, i) => {
      s.addText('✓  ' + t, { x: 5.55, y: 1.56 + i * 0.62, w: 3.9, h: 0.55, fontSize: 11.5, color: C.text, margin: 0 });
    });
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 10 — Key Terms Reference
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.navy };

    s.addText("KEY TERMS  ·  MODULE 1 REFERENCE", {
      x: 0.4, y: 0.2, w: 9.2, h: 0.5,
      fontSize: 13, color: C.iceBlue, bold: true, charSpacing: 3, margin: 0
    });

    const terms = [
      { term: "Agent",         def: "AI that autonomously plans and executes multi-step tasks using tools and memory" },
      { term: "Tool",          def: "A callable function — bash command, file read/write, API call, web search" },
      { term: "HITL",          def: "Human-in-the-Loop: a design gate requiring human approval before irreversible action" },
      { term: "Agent Loop",    def: "Gather Context → Take Action → Verify Work → Repeat" },
      { term: "Subagent",      def: "A child agent spawned by an orchestrator for parallel or specialized work" },
      { term: "Orchestrator",  def: "A lead agent that coordinates subagents, assigns subtasks, and merges results" },
      { term: "Supervised Dev",def: "Spotify's model: engineers set intent and review output; agents write the code" },
      { term: "MCP",           def: "Model Context Protocol — standard for agent-to-tool and agent-to-service integration" },
    ];

    const half = Math.ceil(terms.length / 2);
    terms.forEach((t, i) => {
      const col = i < half ? 0 : 1;
      const row = i < half ? i : i - half;
      const x = col === 0 ? 0.35 : 5.15, y = 0.9 + row * 1.08;

      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 4.6, h: 0.95, fill: { color: C.mid, transparency: 15 } });
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.06, h: 0.95, fill: { color: C.accent } });
      s.addText(t.term, { x: x + 0.16, y: y + 0.06, w: 4.3, h: 0.32, fontSize: 13, color: C.accent, bold: true, margin: 0 });
      s.addText(t.def,  { x: x + 0.16, y: y + 0.42, w: 4.3, h: 0.46, fontSize: 10.5, color: C.pale, margin: 0 });
    });
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 11 — Lab Exercise
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.white };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.82, fill: { color: C.teal } });
    s.addText("LAB EXERCISE  ·  20 MINUTES", {
      x: 0.4, y: 0, w: 9, h: 0.82,
      fontSize: 13, color: C.white, bold: true, charSpacing: 3, valign: "middle", margin: 0
    });

    s.addText("Map Your Current Tools to the Autonomy Spectrum", {
      x: 0.4, y: 0.98, w: 9.2, h: 0.5,
      fontSize: 20, color: C.navy, bold: true, margin: 0
    });

    const tasks = [
      { step: "1", title: "Inventory",    time: "5 min",  desc: "List 5–8 development tasks you performed last week. Be specific (e.g., 'added null check to payment handler', 'reviewed PR #2341')." },
      { step: "2", title: "Classify",     time: "7 min",  desc: "Place each task on the autonomy spectrum: Tier 1 (fully automate), Tier 2 (supervised), or Tier 3 (human-directed). Justify your reasoning." },
      { step: "3", title: "Identify",     time: "5 min",  desc: "For your Tier 1 and 2 tasks: what context (files, specs, rules) would an agent need to complete them reliably?" },
      { step: "4", title: "Share",        time: "3 min",  desc: "Share one surprising classification with the group. Where did your intuition and your classification disagree?" },
    ];

    tasks.forEach((t, i) => {
      const y = 1.6 + i * 0.95;
      s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y, w: 9.3, h: 0.85, fill: { color: C.offWhite }, shadow: shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y, w: 0.52, h: 0.85, fill: { color: C.teal } });
      s.addText(t.step, { x: 0.35, y, w: 0.52, h: 0.85, fontSize: 22, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });

      s.addText(t.title, { x: 0.98, y: y + 0.06, w: 1.2, h: 0.32, fontSize: 13, color: C.teal, bold: true, margin: 0 });
      s.addText(`(${t.time})`, { x: 2.18, y: y + 0.06, w: 0.9, h: 0.32, fontSize: 11, color: C.muted, italic: true, margin: 0 });
      s.addText(t.desc, { x: 0.98, y: y + 0.42, w: 8.55, h: 0.38, fontSize: 11, color: C.muted, margin: 0 });
    });
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 12 — Discussion + Summary
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.navy };

    // Right decorative
    s.addShape(pres.shapes.RECTANGLE, { x: 9.82, y: 0, w: 0.18, h: 5.625, fill: { color: C.accent } });

    s.addText("DISCUSSION + MODULE SUMMARY", {
      x: 0.4, y: 0.28, w: 9, h: 0.45,
      fontSize: 13, color: C.iceBlue, bold: true, charSpacing: 3, margin: 0
    });

    // Discussion questions — left column
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 0.9, w: 5.5, h: 3.7, fill: { color: C.mid, transparency: 20 }, shadow: shadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 0.9, w: 5.5, h: 0.5, fill: { color: C.iceBlue, transparency: 10 } });
    s.addText("DISCUSSION QUESTIONS", { x: 0.35, y: 0.9, w: 5.5, h: 0.5, fontSize: 11, color: C.white, bold: true, charSpacing: 2, align: "center", valign: "middle", margin: 0 });

    const questions = [
      "Where on the autonomy spectrum are your team's current AI tools?",
      "What's one task in your domain that's clearly Tier 1? What makes it safe to automate?",
      "What would need to be true about a task's spec before you'd trust an agent with it?",
      "How does your organization's risk culture affect where you set your HITL gates?",
    ];
    s.addText(questions.map((q, i) => `Q${i+1}.  ${q}`).join("\n\n"), {
      x: 0.5, y: 1.52, w: 5.2, h: 2.9, fontSize: 11.5, color: C.pale, margin: 0
    });

    // Summary — right column
    s.addShape(pres.shapes.RECTANGLE, { x: 6.05, y: 0.9, w: 3.6, h: 3.7, fill: { color: C.mid, transparency: 20 }, shadow: shadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: 6.05, y: 0.9, w: 3.6, h: 0.5, fill: { color: C.accent, transparency: 10 } });
    s.addText("KEY TAKEAWAYS", { x: 6.05, y: 0.9, w: 3.6, h: 0.5, fontSize: 11, color: C.white, bold: true, charSpacing: 2, align: "center", valign: "middle", margin: 0 });

    const takeaways = [
      "Chat = reactive. Agents = autonomous.",
      "Agents loop: gather → act → verify → repeat",
      "Match autonomy level to risk — use the spectrum",
      "Your role shifts: intent + oversight, not typing",
      "Spotify's senior engineers now supervise, not code",
    ];
    s.addText(takeaways.map(t => `· ${t}`).join("\n\n"), {
      x: 6.2, y: 1.52, w: 3.35, h: 2.9, fontSize: 11.5, color: C.pale, margin: 0
    });

    // Next module teaser
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 4.75, w: 9.3, h: 0.65, fill: { color: C.accent, transparency: 15 } });
    s.addText("NEXT  ·  Module 02: Core Agentic Concepts & Terms  —  Tools, Memory, Orchestrators, MCP, and the Agent SDK", {
      x: 0.35, y: 4.75, w: 9.3, h: 0.65,
      fontSize: 11.5, color: C.white, bold: true, align: "center", valign: "middle", margin: 0
    });
  }

  await pres.writeFile({ fileName: "Module_01_Chat_vs_Agents_v2.pptx" });
  console.log("✅ Deck written");
}

build().catch(console.error);
