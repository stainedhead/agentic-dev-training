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
      { icon: FaSync,     color: C.accent,title: "Map the Autonomy Spectrum",     body: "Apply the three-tier model to classify agent deployments by risk and human oversight." },
      { icon: FaUserTie,  color: C.coral, title: "Adopt the Supervisor Mindset",  body: "Describe the engineer's new role as intent-setter and reviewer rather than code author." },
      { icon: FaChartLine,color: C.green, title: "Map Coding Agents Across the SDLC", body: "Show where coding agents add value beyond code generation — at every phase from ideation to ops." },
    ];

    // 5-objective layout: 2×2 grid + 1 wide card at bottom
    const cols = [0.35, 5.1];
    const rows = [1.05, 2.9];
    for (let i = 0; i < 4; i++) {
      const col = i % 2, row = Math.floor(i / 2);
      const x = cols[col], y = rows[row], w = 4.55, h = 1.68;
      const obj = objectives[i];

      s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color: C.white }, shadow: shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.07, h, fill: { color: obj.color } });

      const ic = await icon(obj.icon, "#" + obj.color);
      s.addImage({ data: ic, x: x + 0.18, y: y + 0.18, w: 0.42, h: 0.42 });

      s.addText(obj.title, {
        x: x + 0.7, y: y + 0.14, w: w - 0.85, h: 0.42,
        fontSize: 13, color: C.text, bold: true, margin: 0
      });
      s.addText(obj.body, {
        x: x + 0.7, y: y + 0.58, w: w - 0.85, h: 0.9,
        fontSize: 11, color: C.muted, margin: 0
      });
    }

    // 5th objective — full-width card
    {
      const obj = objectives[4], x = 0.35, y = 4.7, w = 9.3, h = 0.68;
      s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color: C.white }, shadow: shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.07, h, fill: { color: obj.color } });
      const ic = await icon(obj.icon, "#" + obj.color);
      s.addImage({ data: ic, x: x + 0.18, y: y + 0.13, w: 0.38, h: 0.38 });
      s.addText(obj.title, { x: x + 0.68, y: y + 0.1, w: 3.5, h: 0.35, fontSize: 13, color: C.text, bold: true, margin: 0 });
      s.addText(obj.body, { x: x + 0.68, y: y + 0.36, w: 8.4, h: 0.26, fontSize: 11, color: C.muted, margin: 0 });
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
  // SLIDE 7 — Choosing the Right Mode
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.navy };

    s.addText("CHOOSING THE RIGHT MODE", {
      x: 0.4, y: 0.2, w: 9, h: 0.45,
      fontSize: 13, color: C.iceBlue, bold: true, charSpacing: 3, margin: 0
    });
    s.addText("Use the simplest mode that works — match autonomy to the task and risk level", {
      x: 0.4, y: 0.68, w: 9, h: 0.35,
      fontSize: 13, color: C.white, italic: true, margin: 0
    });

    // Table of task → mode → tool
    const modeRows = [
      { task: "Look up a syntax question",                     mode: "None — use search / docs",          tool: "—",                          color: C.steel },
      { task: "Explain a function or decision",                mode: "Augmented chat",                     tool: "Copilot Chat / Claude chat",  color: C.teal },
      { task: "Inline code completion",                        mode: "Augmented chat",                     tool: "GitHub Copilot inline",       color: C.teal },
      { task: "Explore a design option or ideation",           mode: "Augmented chat",                     tool: "Claude chat + codebase context", color: C.teal },
      { task: "Review a PRD for gaps",                         mode: "Supervised agent",                   tool: "Claude Code",                 color: C.accent },
      { task: "Review a design proposal against the codebase", mode: "Supervised agent",                   tool: "Claude Code",                 color: C.accent },
      { task: "Review a PR against a spec",                    mode: "Supervised agent",                   tool: "Claude Code",                 color: C.accent },
      { task: "Review docs for accuracy against code",         mode: "Supervised agent",                   tool: "Claude Code",                 color: C.accent },
      { task: "Write a new feature end-to-end",                mode: "Supervised agent",                   tool: "Claude Code",                 color: C.accent },
      { task: "Onboard a developer to a codebase",             mode: "Augmented chat",                     tool: "Claude Code / Copilot Chat",  color: C.teal },
      { task: "Nightly hygiene (deps, coverage, lint)",        mode: "Supervised agent with review gate",  tool: "Claude Code scheduled",       color: C.green },
      { task: "Fully autonomous merge without review",         mode: "Do not do this",                     tool: "—",                           color: C.coral },
    ];

    const rowH = 0.38;
    const startY = 1.1;
    // Header
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: startY, w: 9.3, h: 0.35, fill: { color: C.mid } });
    s.addText("TASK",             { x: 0.42, y: startY, w: 4.0, h: 0.35, fontSize: 9.5, color: C.iceBlue, bold: true, charSpacing: 1, valign: "middle", margin: 0 });
    s.addText("RECOMMENDED MODE", { x: 4.5,  y: startY, w: 2.8, h: 0.35, fontSize: 9.5, color: C.iceBlue, bold: true, charSpacing: 1, valign: "middle", margin: 0 });
    s.addText("TOOL",             { x: 7.38, y: startY, w: 2.2, h: 0.35, fontSize: 9.5, color: C.iceBlue, bold: true, charSpacing: 1, valign: "middle", margin: 0 });

    for (let i = 0; i < modeRows.length; i++) {
      const r = modeRows[i];
      const y = startY + 0.35 + i * rowH;
      const bg = i % 2 === 0 ? C.mid : "1E3D5A";
      s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y, w: 9.3, h: rowH - 0.02, fill: { color: bg, transparency: 40 } });
      s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y, w: 0.05, h: rowH - 0.02, fill: { color: r.color } });
      s.addText(r.task, { x: 0.48, y, w: 3.94, h: rowH - 0.02, fontSize: 10, color: C.pale, valign: "middle", margin: 0 });
      s.addText(r.mode, { x: 4.5,  y, w: 2.78, h: rowH - 0.02, fontSize: 10, color: r.color, bold: true, valign: "middle", margin: 0 });
      s.addText(r.tool, { x: 7.38, y, w: 2.18, h: rowH - 0.02, fontSize: 9.5, color: C.muted, italic: true, valign: "middle", margin: 0 });
    }

    s.addText("Enterprise default: Supervised Agent. Full autonomy only for low-stakes, reversible actions in sandboxed environments.", {
      x: 0.35, y: 5.5, w: 9.3, h: 0.24, fontSize: 9.5, color: C.iceBlue, italic: true, align: "center", margin: 0
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
  // SLIDE 9 — Programme Scope: Coding Agents vs. Production Agents
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.offWhite };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.82, fill: { color: C.navy } });
    s.addText("PROGRAMME SCOPE  ·  TWO KINDS OF AGENT", {
      x: 0.4, y: 0, w: 9, h: 0.82,
      fontSize: 13, color: C.white, bold: true, charSpacing: 3, valign: "middle", margin: 0
    });
    s.addText("The word \"agent\" covers two very different things — conflating them causes confusion throughout the SDLC.", {
      x: 0.35, y: 0.9, w: 9.3, h: 0.32, fontSize: 11.5, color: C.muted, italic: true, margin: 0
    });

    // Left card — Coding Agents (our focus)
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 1.3, w: 4.35, h: 4.05, fill: { color: C.white }, shadow: shadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 1.3, w: 4.35, h: 0.58, fill: { color: C.accent } });
    s.addText("CODING AGENTS  ·  OUR FOCUS", { x: 0.35, y: 1.3, w: 4.35, h: 0.58, fontSize: 12, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });

    const codingTools = [
      { label: "Claude Code", desc: "Anthropic's CLI agent. Full filesystem + shell access. Reads your codebase, writes code, runs tests, commits and pushes." },
      { label: "GitHub Copilot", desc: "IDE-integrated. Inline suggestions + Copilot Chat. Agentic mode in Copilot Workspace. Supervised by default." },
    ];
    codingTools.forEach((t, i) => {
      const y = 1.98 + i * 1.28;
      s.addShape(pres.shapes.RECTANGLE, { x: 0.55, y, w: 3.95, h: 1.15, fill: { color: C.offWhite } });
      s.addShape(pres.shapes.RECTANGLE, { x: 0.55, y, w: 0.06, h: 1.15, fill: { color: C.accent } });
      s.addText(t.label, { x: 0.72, y: y + 0.08, w: 3.65, h: 0.3, fontSize: 12, color: C.navy, bold: true, margin: 0 });
      s.addText(t.desc,  { x: 0.72, y: y + 0.4,  w: 3.65, h: 0.65, fontSize: 10.5, color: C.muted, margin: 0 });
    });
    s.addText("Both sit at the supervised agent point — multi-step actions, developer in the loop.", {
      x: 0.42, y: 4.82, w: 4.18, h: 0.38, fontSize: 10, color: C.accent, bold: true, italic: true, align: "center", margin: 0
    });

    // Arrow
    s.addText("vs.", { x: 4.78, y: 2.9, w: 0.44, h: 0.5, fontSize: 20, color: C.muted, bold: true, align: "center", margin: 0 });

    // Right card — Production Agents (out of scope)
    s.addShape(pres.shapes.RECTANGLE, { x: 5.3, y: 1.3, w: 4.35, h: 4.05, fill: { color: C.white }, shadow: shadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: 5.3, y: 1.3, w: 4.35, h: 0.58, fill: { color: C.steel } });
    s.addText("PRODUCTION AGENTS  ·  OUT OF SCOPE", { x: 5.3, y: 1.3, w: 4.35, h: 0.58, fontSize: 12, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });

    s.addText("AI systems that operate as runtime components of your product or platform — customer-facing bots, autonomous workflow automations, orchestration services.", {
      x: 5.48, y: 1.98, w: 3.98, h: 0.72, fontSize: 11, color: C.muted, margin: 0
    });
    s.addText("Examples:", { x: 5.48, y: 2.78, w: 3.98, h: 0.28, fontSize: 11, color: C.navy, bold: true, margin: 0 });
    ["AWS Bedrock / Amazon Agent Core", "Azure AI Foundry agents", "Custom LLM orchestration services"].forEach((ex, i) => {
      s.addText("· " + ex, { x: 5.55, y: 3.08 + i * 0.35, w: 3.9, h: 0.3, fontSize: 11, color: C.text, margin: 0 });
    });
    s.addText("Different concerns: runtime reliability, cost at scale, customer data, blast radius in live environments.", {
      x: 5.48, y: 4.2, w: 3.98, h: 0.5, fontSize: 10.5, color: C.muted, italic: true, margin: 0
    });
    s.addShape(pres.shapes.RECTANGLE, { x: 5.3, y: 4.82, w: 4.35, h: 0.38, fill: { color: C.offWhite } });
    s.addText("Refer to the Enterprise AI Platform practice for guidance.", {
      x: 5.3, y: 4.82, w: 4.35, h: 0.38, fontSize: 10, color: C.steel, italic: true, align: "center", valign: "middle", margin: 0
    });
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 10 — Coding Agents Across the Full SDLC
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.navy };

    s.addText("CODING AGENTS ACROSS THE FULL SDLC", {
      x: 0.4, y: 0.2, w: 9.2, h: 0.45,
      fontSize: 13, color: C.iceBlue, bold: true, charSpacing: 3, margin: 0
    });
    s.addText("Coding agents add value at every phase — not just code generation", {
      x: 0.4, y: 0.68, w: 9.2, h: 0.35,
      fontSize: 14, color: C.white, italic: true, margin: 0
    });

    // Table rows: phase | role | example (abbreviated)
    const rows = [
      { phase: "Ideation & Planning",          color: C.accent,  role: "Research options, assess feasibility", example: "\"Which caching approach has least impact on SessionService?\"" },
      { phase: "PRD & Requirements",           color: C.teal,    role: "Draft reqs, flag gaps & conflicts",    example: "\"Review this PRD — what edge cases are missing?\"" },
      { phase: "Design & Architecture",        color: C.green,   role: "Review design against codebase",       example: "\"Where does this caching layer break the current data flow?\"" },
      { phase: "Specification",                color: C.iceBlue, role: "Generate SPEC, PLAN, TASKS docs",      example: "\"Generate a full spec suite from this PRD.\"" },
      { phase: "Implementation",               color: C.accent,  role: "Write code, fix tests, refactor",      example: "\"Implement task 3 from TASKS.md. Write tests first.\"" },
      { phase: "Code Review",                  color: C.teal,    role: "Review PR against spec & standards",   example: "\"Flag any requirement in SPEC.md not satisfied by this PR.\"" },
      { phase: "Design Review",                color: C.green,   role: "Read proposal + codebase, find issues", example: "\"What does this architecture break in the current system?\"" },
      { phase: "Documentation & Education",    color: C.iceBlue, role: "Update docs, explain codebase to team", example: "\"Compare API docs to implementation — what's out of date?\"" },
      { phase: "Operations & Hygiene",         color: C.steel,   role: "Dep updates, security scans, debt",    example: "Nightly run: scan deps, open low-risk update PRs" },
    ];

    const rowH = 0.49;
    const startY = 1.12;
    // Header row
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: startY, w: 9.3, h: 0.38, fill: { color: C.mid } });
    s.addText("SDLC PHASE",     { x: 0.42, y: startY, w: 2.4, h: 0.38, fontSize: 10, color: C.iceBlue, bold: true, charSpacing: 1, valign: "middle", margin: 0 });
    s.addText("CODING AGENT ROLE", { x: 2.9, y: startY, w: 2.8, h: 0.38, fontSize: 10, color: C.iceBlue, bold: true, charSpacing: 1, valign: "middle", margin: 0 });
    s.addText("EXAMPLE",        { x: 5.78, y: startY, w: 3.8, h: 0.38, fontSize: 10, color: C.iceBlue, bold: true, charSpacing: 1, valign: "middle", margin: 0 });

    for (let i = 0; i < rows.length; i++) {
      const r = rows[i];
      const y = startY + 0.38 + i * rowH;
      const bg = i % 2 === 0 ? C.mid : "1E3D5A";
      s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y, w: 9.3, h: rowH - 0.02, fill: { color: bg, transparency: 35 } });
      s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y, w: 0.06, h: rowH - 0.02, fill: { color: r.color } });
      s.addText(r.phase, { x: 0.5, y, w: 2.32, h: rowH - 0.02, fontSize: 10, color: r.color, bold: true, valign: "middle", margin: 0 });
      s.addText(r.role,  { x: 2.9, y, w: 2.78, h: rowH - 0.02, fontSize: 9.5, color: C.pale, valign: "middle", margin: 0 });
      s.addText(r.example, { x: 5.78, y, w: 3.75, h: rowH - 0.02, fontSize: 9, color: C.muted, italic: true, valign: "middle", margin: 0 });
    }

    s.addText("Most teams start with implementation only. The highest-value gains are often at ideation, design review, and operations — where quality problems are cheapest to fix.", {
      x: 0.35, y: 5.42, w: 9.3, h: 0.25, fontSize: 9.5, color: C.iceBlue, italic: true, align: "center", margin: 0
    });
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 11 — Lab Exercise (Two-Part)
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.white };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.82, fill: { color: C.teal } });
    s.addText("LAB EXERCISE  ·  25 MINUTES", {
      x: 0.4, y: 0, w: 9, h: 0.82,
      fontSize: 13, color: C.white, bold: true, charSpacing: 3, valign: "middle", margin: 0
    });

    s.addText("Map Scenarios to the Spectrum  ·  Audit Your Own Team's SDLC Coverage", {
      x: 0.4, y: 0.9, w: 9.2, h: 0.4,
      fontSize: 15, color: C.navy, bold: true, margin: 0
    });

    // Part 1
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 1.42, w: 9.3, h: 0.38, fill: { color: C.teal } });
    s.addText("PART 1  ·  Map to the Spectrum  (12 min)", { x: 0.42, y: 1.42, w: 9.1, h: 0.38, fontSize: 12, color: C.white, bold: true, valign: "middle", margin: 0 });

    const scenarios = [
      "A developer asks Copilot Chat to explain why the AuthService uses a refresh token pattern",
      "Claude Code reviews a proposed database schema in a Jira ticket against the existing data model",
      "A developer runs claude \"implement task 4 from TASKS.md, write tests, open a PR\" in their terminal",
      "Claude Code triggers nightly: scan for dependency vulnerabilities, open PRs for Tier-1 updates",
      "Claude Code walks a new team member through the payment flow — files to read, design rationale, constraints",
    ];

    scenarios.forEach((sc, i) => {
      const y = 1.88 + i * 0.44;
      s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y, w: 0.38, h: 0.38, fill: { color: C.accent, transparency: 20 } });
      s.addText(String(i + 1), { x: 0.35, y, w: 0.38, h: 0.38, fontSize: 13, color: C.accent, bold: true, align: "center", valign: "middle", margin: 0 });
      s.addText(sc, { x: 0.82, y, w: 8.7, h: 0.38, fontSize: 11, color: C.text, valign: "middle", margin: 0 });
    });
    s.addText("For each: Where on the spectrum? Which tool fits best? Where is the human?", {
      x: 0.35, y: 4.12, w: 9.3, h: 0.28, fontSize: 10.5, color: C.teal, italic: true, bold: true, margin: 0
    });

    // Part 2
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 4.46, w: 9.3, h: 0.38, fill: { color: C.navy } });
    s.addText("PART 2  ·  Audit Your Team's SDLC Coverage  (13 min)", { x: 0.42, y: 4.46, w: 9.1, h: 0.38, fontSize: 12, color: C.white, bold: true, valign: "middle", margin: 0 });

    s.addText("Look at the SDLC phase table (slide 10). For each row: Is your team using a coding agent here? If not — what would it take? If yes — how supervised? Share your map with a peer: where are the biggest gaps?", {
      x: 0.42, y: 4.9, w: 9.1, h: 0.6, fontSize: 11, color: C.muted, margin: 0
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
      "Look at the SDLC phase table. Which phase beyond code generation could deliver the biggest value for your team?",
      "What would need to be true about a task's spec before you'd trust an agent with it?",
      "How does your organisation's risk culture affect where you set your HITL gates?",
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
      "Coding agents vs. production agents — know the scope",
      "Coding agents add value at every SDLC phase",
      "Match mode to risk — supervised is the enterprise default",
      "Your role shifts: intent + oversight, not typing",
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
