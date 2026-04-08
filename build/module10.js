const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const { FaDraftingCompass, FaRoute, FaUserTie, FaFileAlt, FaCheckDouble, FaLayerGroup, FaCogs, FaLightbulb, FaShieldAlt, FaChartLine, FaCode, FaRobot } = require("react-icons/fa");

const C = {
  navy:"1C3557", iceBlue:"5B8DB8", pale:"D4E4F0", white:"FFFFFF",
  offWhite:"F3F6F9", accent:"3A7DC9", teal:"4A7FA8", mid:"2E5073",
  text:"1E2D3D", muted:"7A90A8", green:"3A7E6E", steel:"8096B0",
};
const shadow = () => ({ type:"outer", color:"000000", blur:8, offset:3, angle:135, opacity:0.13 });
async function icon(C2, color="#FFFFFF", size=256) {
  const svg = ReactDOMServer.renderToStaticMarkup(React.createElement(C2, { color, size: String(size) }));
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}

async function build() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.title = "Module 10: Design Reviews";

  // SLIDE 1 — Title
  {
    const s = pres.addSlide();
    s.background = { color:C.navy };
    s.addShape(pres.shapes.RECTANGLE, { x:0, y:0, w:0.18, h:5.625, fill:{ color:C.accent } });
    s.addText("ENTERPRISE AGENTIC PRACTICES", { x:0.4, y:0.32, w:9.2, h:0.35, fontSize:10, color:C.iceBlue, bold:true, charSpacing:4, margin:0 });
    s.addShape(pres.shapes.RECTANGLE, { x:0.4, y:0.82, w:1.5, h:0.38, fill:{ color:C.accent } });
    s.addText("MODULE 10", { x:0.4, y:0.82, w:1.5, h:0.38, fontSize:11, color:C.white, bold:true, align:"center", valign:"middle", margin:0 });
    s.addText("Design Reviews\nfor Agentic\nSystems", { x:0.4, y:1.28, w:6.8, h:2.25, fontSize:44, color:C.white, bold:true, margin:0 });
    s.addText("Designing for Agent Experience (AX) before writing a single line of code", { x:0.4, y:3.6, w:7.2, h:0.52, fontSize:18, color:C.iceBlue, italic:true, margin:0 });
    s.addShape(pres.shapes.RECTANGLE, { x:0.4, y:4.25, w:3.5, h:0.04, fill:{ color:C.accent } });
    s.addText([
      { text:"Duration: ", options:{ bold:true, color:C.muted } },
      { text:"60–75 min  ", options:{ color:C.muted } },
      { text:"  |  ", options:{ color:C.muted } },
      { text:"Level: ", options:{ bold:true, color:C.muted } },
      { text:"Advanced", options:{ color:C.muted } }
    ], { x:0.4, y:4.42, w:5, h:0.38, fontSize:13, margin:0 });

    // Right: design review stages
    const stages = [
      { label:"Architecture\nDecision", color:C.steel },
      { label:"AX Design", color:C.teal },
      { label:"Security\nReview", color:C.accent },
      { label:"FinOps\nReview", color:C.green },
      { label:"Deploy\nApproval", color:C.mid },
    ];
    stages.forEach((st, i) => {
      const y = 0.65 + i*0.98;
      s.addShape(pres.shapes.RECTANGLE, { x:7.3, y, w:2.35, h:0.8, fill:{ color:st.color, transparency:i*6 }, shadow:shadow() });
      s.addText(st.label, { x:7.3, y, w:2.35, h:0.8, fontSize:12.5, color:C.white, bold:true, align:"center", valign:"middle", margin:0 });
    });
  }

  // SLIDE 2 — Learning Objectives
  {
    const s = pres.addSlide();
    s.background = { color:C.offWhite };
    s.addShape(pres.shapes.RECTANGLE, { x:0, y:0, w:10, h:0.82, fill:{ color:C.navy } });
    s.addText("LEARNING OBJECTIVES", { x:0.4, y:0, w:9.2, h:0.82, fontSize:13, color:C.white, bold:true, charSpacing:3, valign:"middle", margin:0 });
    s.addText("By the end of this module you will be able to:", { x:0.35, y:0.9, w:9.3, h:0.28, fontSize:11, color:C.muted, italic:true, margin:0 });
    const objs = [
      { icon:FaDraftingCompass, color:C.accent, title:"Apply Agent-First Design",     body:"Articulate the core principles of designing systems where agents are the primary actors, not afterthoughts added to human-first architectures." },
      { icon:FaRoute,          color:C.teal,   title:"Design for AX",                body:"Apply Agent Experience (AX) design patterns: clean interfaces, parseable schemas, MCP-compatible tool definitions, and llms.txt documentation." },
      { icon:FaFileAlt,        color:C.green,  title:"Write Effective ADRs",         body:"Create Architecture Decision Records that capture decisions, context, and consequences in a format agents can consume as just-in-time context." },
      { icon:FaCheckDouble,    color:C.steel,  title:"Run the Design Review",        body:"Facilitate a structured pre-deployment design review covering architecture, security, FinOps, and Agent Experience dimensions." },
    ];
    const cols = [0.35, 5.1];
    for (let i = 0; i < 4; i++) {
      const x = cols[i%2], y = 1.28+Math.floor(i/2)*2.0, w=4.55, h=1.82;
      const o = objs[i];
      s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill:{ color:C.white }, shadow:shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y, w:0.07, h, fill:{ color:o.color } });
      const ic = await icon(o.icon, "#"+o.color);
      s.addImage({ data:ic, x:x+0.18, y:y+0.22, w:0.4, h:0.4 });
      s.addText(o.title, { x:x+0.7, y:y+0.18, w:w-0.85, h:0.42, fontSize:13, color:C.navy, bold:true, margin:0 });
      s.addText(o.body,  { x:x+0.7, y:y+0.64, w:w-0.85, h:1.05, fontSize:11.5, color:C.muted, margin:0 });
    }
  }

  // SLIDE 3 — Agent-First Design Principles
  {
    const s = pres.addSlide();
    s.background = { color:C.navy };
    s.addText("AGENT-FIRST DESIGN PRINCIPLES", { x:0.4, y:0.22, w:9, h:0.45, fontSize:13, color:C.iceBlue, bold:true, charSpacing:3, margin:0 });
    s.addText("Speed of AI-generated code makes design discipline MORE important, not less", { x:0.4, y:0.72, w:9, h:0.36, fontSize:17, color:C.white, italic:true, margin:0 });

    const principles = [
      { n:"1", head:"Reduced flexibility = predictability", color:C.accent,
        body:"Spotify\u2019s most important design decision: intentionally limit what the agent can do. Tightly scoped agents are predictable agents. Flexibility is an enemy of reliability at scale." },
      { n:"2", head:"Infrastructure outside the agent", color:C.teal,
        body:"Slack comms, git push, prompt authoring, logging \u2014 all happen in surrounding infrastructure. The agent touches only its designated domain. This contains blast radius and improves security." },
      { n:"3", head:"Every tool must justify its existence", color:C.green,
        body:"Self-contained, non-overlapping, purpose-specific. If you can\u2019t explain in one sentence what a tool does and when it\u2019s called, don\u2019t build it yet. Tool proliferation creates chaos." },
      { n:"4", head:"Folder structure IS context engineering", color:C.steel,
        body:"How you organize the project communicates intent to the agent. CLAUDE.md at root, specs in /specs, ADRs in /adr, agent docs in /agent_docs. Structure first, then prompt." },
      { n:"5", head:"Design for Agent Experience (AX)", color:C.iceBlue,
        body:"Just as you design APIs for Developer Experience (DX), design your system for Agent Experience. OpenAPI schemas, llms.txt, MCP-compatible interfaces, parseable formats." },
      { n:"6", head:"Observability before deployment", color:C.accent,
        body:"Instrument first. If you can\u2019t observe it, you can\u2019t debug it. Tracing, logging, and evaluation must be designed in from day one \u2014 retrofitting is extremely expensive." },
    ];

    [[0,1,2],[3,4,5]].forEach((group, col) => {
      group.forEach((idx, row) => {
        const p = principles[idx];
        const x = col===0 ? 0.35 : 5.15, y = 1.28+row*1.42, w=4.6, h=1.28;
        s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill:{ color:C.mid, transparency:18 }, shadow:shadow() });
        s.addShape(pres.shapes.RECTANGLE, { x, y, w:0.38, h, fill:{ color:p.color, transparency:10 } });
        s.addText(p.n, { x, y, w:0.38, h, fontSize:18, color:C.white, bold:true, align:"center", valign:"middle", margin:0 });
        s.addText(p.head, { x:x+0.48, y:y+0.06, w:w-0.58, h:0.34, fontSize:12, color:p.color, bold:true, margin:0 });
        s.addText(p.body, { x:x+0.48, y:y+0.46, w:w-0.58, h:0.74, fontSize:10.5, color:C.pale, margin:0 });
      });
    });
  }

  // SLIDE 4 — Designing for Agent Experience (AX)
  {
    const s = pres.addSlide();
    s.background = { color:C.white };
    s.addShape(pres.shapes.RECTANGLE, { x:0, y:0, w:10, h:0.82, fill:{ color:C.teal } });
    s.addText("DESIGNING FOR AGENT EXPERIENCE  (AX)", { x:0.4, y:0, w:9, h:0.82, fontSize:13, color:C.white, bold:true, charSpacing:3, valign:"middle", margin:0 });
    s.addText("Just as we design APIs for Developer Experience (DX), design your system for the agents that will use it", { x:0.4, y:0.9, w:9.2, h:0.3, fontSize:12, color:C.muted, italic:true, margin:0 });

    const axItems = [
      { head:"OpenAPI schemas for every API", color:C.navy,
        detail:"Agents handle OpenAPI schemas reliably. They can validate parameters, understand response shapes, and auto-generate correct API calls from a spec. No schema = hallucinated calls.",
        do:"Provide machine-readable OpenAPI/JSON Schema for every API the agent will consume",
        dont:"Expect agents to infer API contracts from prose documentation or examples alone" },
      { head:"llms.txt for documentation", color:C.teal,
        detail:"llms.txt is an emerging standard (like robots.txt) that summarises what an LLM needs to know about a site or service in a compact, LLM-optimized format.",
        do:"Add llms.txt to your services. Keep it current. Reference it in agent skills.",
        dont:"Expect agents to parse full HTML docs, changelogs, or wiki pages for context" },
      { head:"MCP-compatible tool definitions", color:C.accent,
        detail:"Tools built to the MCP spec work across Claude, Cursor, Copilot, and any compliant agent. Build once, integrate everywhere. Non-MCP tools are single-platform dead ends.",
        do:"Define tools with MCP schemas: name, description, input schema, output shape",
        dont:"Write bespoke tool integrations per agent platform or per agent version" },
      { head:"Explicit type definitions", color:C.green,
        detail:"Strongly-typed interfaces reduce hallucinations dramatically. Agents that see exact types produce correct outputs. Loose or missing types produce creative but wrong outputs.",
        do:"Use TypeScript types, Pydantic models, or JSON Schema for all inputs/outputs",
        dont:"Use Dict[str, Any] or untyped JSON blobs as agent I/O interfaces" },
    ];

    for (let i = 0; i < 4; i++) {
      const col = i%2, row = Math.floor(i/2);
      const x = col===0 ? 0.35 : 5.1, y = 1.28+row*2.12, w=4.55, h=1.95;
      const ax = axItems[i];
      s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill:{ color:C.offWhite }, shadow:shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y, w:0.06, h, fill:{ color:ax.color } });
      s.addText(ax.head, { x:x+0.16, y:y+0.08, w:w-0.26, h:0.34, fontSize:13, color:ax.color, bold:true, margin:0 });
      s.addText(ax.detail, { x:x+0.16, y:y+0.48, w:w-0.26, h:0.58, fontSize:10.5, color:C.text, margin:0 });
      s.addText(`\u2713 ${ax.do}`,   { x:x+0.16, y:y+1.1,  w:w-0.26, h:0.36, fontSize:10, color:C.green, margin:0 });
      s.addText(`\u2715 ${ax.dont}`, { x:x+0.16, y:y+1.48, w:w-0.26, h:0.36, fontSize:10, color:"B03040", margin:0 });
    }
  }

  // SLIDE 5 — Architecture Decision Records (ADRs)
  {
    const s = pres.addSlide();
    s.background = { color:C.offWhite };
    s.addShape(pres.shapes.RECTANGLE, { x:0, y:0, w:10, h:0.82, fill:{ color:C.navy } });
    s.addText("ARCHITECTURE DECISION RECORDS  (ADRs)", { x:0.4, y:0, w:9, h:0.82, fontSize:13, color:C.white, bold:true, charSpacing:3, valign:"middle", margin:0 });
    s.addText("Spotify captures ADRs from Slack threads via agents  \u2014  architecture reasoning as continuous, machine-readable context", { x:0.4, y:0.9, w:9.2, h:0.3, fontSize:11.5, color:C.muted, italic:true, margin:0 });

    // Left: why ADRs for agents
    s.addShape(pres.shapes.RECTANGLE, { x:0.35, y:1.28, w:4.55, h:1.32, fill:{ color:C.white }, shadow:shadow() });
    s.addShape(pres.shapes.RECTANGLE, { x:0.35, y:1.28, w:4.55, h:0.4, fill:{ color:C.navy } });
    s.addText("WHY AGENTS NEED ADRs", { x:0.35, y:1.28, w:4.55, h:0.4, fontSize:11, color:C.white, bold:true, charSpacing:2, align:"center", valign:"middle", margin:0 });
    s.addText("Agents making code changes need architectural context to avoid breaking invariants. Without ADRs, agents \u201Cremember\u201D nothing from the last design session and will confidently re-introduce rejected patterns.", {
      x:0.45, y:1.74, w:4.35, h:0.78, fontSize:11.5, color:C.text, margin:0
    });

    // ADR template
    s.addShape(pres.shapes.RECTANGLE, { x:0.35, y:2.72, w:4.55, h:2.66, fill:{ color:C.offWhite }, shadow:shadow() });
    s.addShape(pres.shapes.RECTANGLE, { x:0.35, y:2.72, w:4.55, h:0.38, fill:{ color:C.accent } });
    s.addText("ADR TEMPLATE (adr/NNN-title.md)", { x:0.35, y:2.72, w:4.55, h:0.38, fontSize:11, color:C.white, bold:true, charSpacing:2, align:"center", valign:"middle", margin:0 });

    const template = [
      { section:"# ADR-NNN: [Title]", indent:0 },
      { section:"## Status: [Proposed | Accepted | Deprecated]", indent:0 },
      { section:"## Context", indent:0 },
      { section:"What problem are we solving? What constraints exist?", indent:1 },
      { section:"## Decision", indent:0 },
      { section:"What did we decide to do?", indent:1 },
      { section:"## Consequences", indent:0 },
      { section:"What changes? What are the tradeoffs?", indent:1 },
    ];

    template.forEach((t, i) => {
      s.addText(t.indent ? `  ${t.section}` : t.section, {
        x:0.47, y:3.17+i*0.28, w:4.3, h:0.26,
        fontSize:10, color:t.indent ? C.muted : C.accent,
        fontFace:"Consolas", margin:0
      });
    });

    // Right: ADR lifecycle
    s.addShape(pres.shapes.RECTANGLE, { x:5.1, y:1.28, w:4.55, h:4.1, fill:{ color:C.white }, shadow:shadow() });
    s.addShape(pres.shapes.RECTANGLE, { x:5.1, y:1.28, w:4.55, h:0.4, fill:{ color:C.navy } });
    s.addText("ADR LIFECYCLE IN AN AGENTIC TEAM", { x:5.1, y:1.28, w:4.55, h:0.4, fontSize:11, color:C.white, bold:true, charSpacing:2, align:"center", valign:"middle", margin:0 });

    const lifecycle = [
      { step:"1. Decision Arises", color:C.steel, desc:"Design discussion happens in Slack, PR, or architecture meeting. A significant architectural choice is made." },
      { step:"2. ADR Captured", color:C.teal,   desc:"Human or agent writes ADR from conversation. Spotify: agents extract ADRs from Slack threads automatically." },
      { step:"3. ADR Committed", color:C.accent, desc:"ADR committed to /adr folder in the repo. Becomes part of the project\u2019s persistent knowledge base." },
      { step:"4. Agent Reads JIT", color:C.green, desc:"Future agents read relevant ADRs via just-in-time retrieval before making changes. Referenced in CLAUDE.md." },
      { step:"5. ADR Updated", color:C.steel, desc:"When decision changes, ADR is updated or superseded. Agents always see current architectural intent." },
    ];

    lifecycle.forEach((lc, i) => {
      const y = 1.8+i*0.72;
      s.addShape(pres.shapes.RECTANGLE, { x:5.22, y, w:4.3, h:0.64, fill:{ color:C.offWhite } });
      s.addShape(pres.shapes.RECTANGLE, { x:5.22, y, w:0.06, h:0.64, fill:{ color:lc.color } });
      s.addText(lc.step, { x:5.36, y:y+0.06, w:3.98, h:0.24, fontSize:11.5, color:lc.color, bold:true, margin:0 });
      s.addText(lc.desc, { x:5.36, y:y+0.34, w:3.98, h:0.24, fontSize:10, color:C.muted, margin:0 });
    });
  }

  // SLIDE 6 — Program Scope Bridge
  {
    const s = pres.addSlide();
    s.background = { color:C.navy };
    s.addShape(pres.shapes.RECTANGLE, { x:0, y:0, w:0.18, h:5.625, fill:{ color:C.accent } });
    s.addText("MODULE SCOPE  \u2014  WHAT THIS MODULE COVERS", { x:0.4, y:0.22, w:9, h:0.45, fontSize:13, color:C.iceBlue, bold:true, charSpacing:3, margin:0 });
    s.addText("Both parts use the same vocabulary and review discipline. The difference is the blast radius.", { x:0.4, y:0.72, w:9, h:0.36, fontSize:16, color:C.white, italic:true, margin:0 });

    // Part 1 panel
    s.addShape(pres.shapes.RECTANGLE, { x:0.35, y:1.22, w:4.55, h:3.72, fill:{ color:C.mid, transparency:15 }, shadow:shadow() });
    s.addShape(pres.shapes.RECTANGLE, { x:0.35, y:1.22, w:4.55, h:0.52, fill:{ color:C.teal, transparency:10 } });
    s.addText("PART 1 \u2014 Coding Agent Workflows", { x:0.35, y:1.22, w:4.55, h:0.52, fontSize:12.5, color:C.white, bold:true, align:"center", valign:"middle", margin:0 });
    s.addText("Reviewing your use of coding agents (Claude Code, Copilot) in the SDLC", { x:0.45, y:1.82, w:4.35, h:0.3, fontSize:10.5, color:C.iceBlue, italic:true, margin:0 });
    const p1Items = [
      "Agent-first design principles (P1\u2013P6) govern how your team works today",
      "AX design thinking shapes your CLAUDE.md, folder structure, and tool schemas",
      "ADR practices capture decisions agents and engineers both need",
      "Lightweight checklist subset: items 01, 04, 05, 06, 07, 10",
      "Applies NOW \u2014 to your codebase, your workflows, your team",
    ];
    for (let i = 0; i < p1Items.length; i++) {
      s.addText(`\u2022 ${p1Items[i]}`, { x:0.52, y:2.2+i*0.48, w:4.25, h:0.42, fontSize:11, color:C.pale, margin:0 });
    }

    // Part 2 panel
    s.addShape(pres.shapes.RECTANGLE, { x:5.1, y:1.22, w:4.55, h:3.72, fill:{ color:C.mid, transparency:15 }, shadow:shadow() });
    s.addShape(pres.shapes.RECTANGLE, { x:5.1, y:1.22, w:4.55, h:0.52, fill:{ color:C.accent, transparency:10 } });
    s.addText("PART 2 \u2014 Production Agent Systems", { x:5.1, y:1.22, w:4.55, h:0.52, fontSize:12.5, color:C.white, bold:true, align:"center", valign:"middle", margin:0 });
    s.addText("Designing agent systems your team ships as products (AWS Bedrock, Agent Core\u2026)", { x:5.2, y:1.82, w:4.35, h:0.3, fontSize:10.5, color:C.iceBlue, italic:true, margin:0 });
    const p2Items = [
      "Full 12-point checklist required before production deployment",
      "Security: identity, sandboxing, kill switches, audit trail",
      "Governance: HITL gates, compliance, data retention",
      "FinOps: cost-per-unit model, budget guardrails, routing",
      "Shadow mode rollout before full production traffic",
    ];
    for (let i = 0; i < p2Items.length; i++) {
      s.addText(`\u2022 ${p2Items[i]}`, { x:5.2, y:2.2+i*0.48, w:4.35, h:0.42, fontSize:11, color:C.pale, margin:0 });
    }

    // Bottom callout
    s.addShape(pres.shapes.RECTANGLE, { x:0.35, y:5.06, w:9.3, h:0.38, fill:{ color:C.accent, transparency:18 } });
    s.addText("\u25B6  Same vocabulary. Same review discipline. Different blast radius.", {
      x:0.35, y:5.06, w:9.3, h:0.38, fontSize:12, color:C.white, bold:true, align:"center", valign:"middle", margin:0
    });
  }

  // SLIDE 7 — The Pre-Deployment Design Review Checklist
  {
    const s = pres.addSlide();
    s.background = { color:C.navy };
    s.addText("FULL 12-POINT CHECKLIST  \u2014  PRODUCTION AGENT SYSTEMS", { x:0.4, y:0.22, w:9, h:0.45, fontSize:13, color:C.iceBlue, bold:true, charSpacing:3, margin:0 });
    s.addText("Production agents: full 12 items required.  Coding agent workflows: use the lightweight subset \u2014 items 01, 04, 05, 06, 07, 10.", { x:0.4, y:0.72, w:9, h:0.36, fontSize:13.5, color:C.pale, italic:true, margin:0 });

    const checks = [
      { cat:"Context", color:C.teal, items:["CLAUDE.md \u2264 300 lines?","SPEC.md / DoD in repo?","ADRs for all key decisions?","Skills created for domain knowledge?"] },
      { cat:"Architecture", color:C.accent, items:["Agent scope bounded?","Tools self-contained?","Subagent boundaries defined?","Rollback plan documented?"] },
      { cat:"Agent Experience", color:C.iceBlue, items:["OpenAPI schemas available?","llms.txt created?","MCP-compatible tools?","Types strongly defined?"] },
      { cat:"Security", color:"E05555", items:["Unique agent identity?","Sandboxed execution?","Kill switch tested?","Audit trail enabled?"] },
      { cat:"FinOps", color:C.green, items:["Cost-per-unit modelled?","Model routing designed?","Budget guardrails set?","Cost alerts configured?"] },
      { cat:"Observability", color:C.steel, items:["OTel spans instrumented?","Evaluation set defined?","Drift detection alerts?","MTTD target set?"] },
    ];

    [[0,1,2],[3,4,5]].forEach((group, col) => {
      group.forEach((idx, row) => {
        const cat = checks[idx];
        const x = col===0 ? 0.35 : 5.15, y = 1.28+row*1.42, w=4.6, h=1.28;
        s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill:{ color:C.mid, transparency:18 }, shadow:shadow() });
        s.addShape(pres.shapes.RECTANGLE, { x, y, w, h:0.38, fill:{ color:cat.color, transparency:10 } });
        s.addText(cat.cat, { x, y, w, h:0.38, fontSize:13, color:C.white, bold:true, charSpacing:2, align:"center", valign:"middle", margin:0 });
        cat.items.forEach((item, j) => {
          s.addShape(pres.shapes.RECTANGLE, { x:x+0.12, y:y+0.46+j*0.22, w:0.2, h:0.19, fill:{ color:C.mid, transparency:5 } });
          s.addText("\u25A1", { x:x+0.12, y:y+0.46+j*0.22, w:0.2, h:0.19, fontSize:9, color:cat.color, align:"center", valign:"middle", margin:0 });
          s.addText(item, { x:x+0.38, y:y+0.46+j*0.22, w:w-0.5, h:0.2, fontSize:10.5, color:C.pale, valign:"middle", margin:0 });
        });
      });
    });
  }

  // SLIDE 8 — Common Design Mistakes
  {
    const s = pres.addSlide();
    s.background = { color:C.offWhite };
    s.addShape(pres.shapes.RECTANGLE, { x:0, y:0, w:10, h:0.82, fill:{ color:C.navy } });
    s.addText("COMMON DESIGN MISTAKES", { x:0.4, y:0, w:9, h:0.82, fontSize:13, color:C.white, bold:true, charSpacing:3, valign:"middle", margin:0 });
    s.addText("These patterns appear in almost every first-generation enterprise agent deployment", { x:0.4, y:0.9, w:9.2, h:0.3, fontSize:12, color:C.muted, italic:true, margin:0 });

    const mistakes = [
      { n:"01", head:"Adding agents to human-first architecture",
        impact:"Agent inherits human-centric assumptions (session state, UI interactions, manual checkpoints) and fails unpredictably.",
        fix:"Redesign the workflow for agents first. Human touchpoints are explicit HITL gates, not implicit assumptions." },
      { n:"02", head:"Tools with overlapping responsibilities",
        impact:"Agent gets confused about which tool to call. Calls multiple tools for the same task. Produces inconsistent results.",
        fix:"One tool, one responsibility. If two tools share 50% of their purpose, merge or split them more radically." },
      { n:"03", head:"Design without observability",
        impact:"First production incident is untraceable. No spans, no logs, no evaluation baseline. Fix requires full observability retrofit.",
        fix:"Observability is a design artifact, not an operational afterthought. Specify what to trace in the design doc." },
      { n:"04", head:"No explicit agent permission model",
        impact:"Agent accumulates permissions organically as features are added. Audit reveals least-privilege was never applied.",
        fix:"Define agent permissions as a table in the design doc. Review it in the security gate before writing any code." },
      { n:"05", head:"Context designed for humans",
        impact:"Documentation is in HTML, changelogs are in unstructured text, APIs have no schemas. Agent hallucinates constantly.",
        fix:"Treat agents as first-class API consumers. Design all interfaces for machine readability, not just human readability." },
      { n:"06", head:"No rollback plan",
        impact:"Agent is deployed with no tested rollback mechanism. First serious incident causes extended outage.",
        fix:"Rollback plan is a required section of every design doc. Test it in staging before production deployment." },
    ];

    [[0,1,2],[3,4,5]].forEach((group, col) => {
      group.forEach((idx, row) => {
        const m = mistakes[idx];
        const x = col===0 ? 0.35 : 5.1, y = 1.28+row*1.42, w=4.55, h=1.3;
        s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill:{ color:C.white }, shadow:shadow() });
        s.addShape(pres.shapes.RECTANGLE, { x, y, w:0.44, h, fill:{ color:"B03040", transparency:10 } });
        s.addText(m.n, { x, y, w:0.44, h, fontSize:14, color:C.white, bold:true, align:"center", valign:"middle", margin:0 });
        s.addText(m.head, { x:x+0.54, y:y+0.06, w:w-0.64, h:0.3, fontSize:12, color:C.navy, bold:true, margin:0 });
        s.addText(`\u26A0 ${m.impact}`, { x:x+0.54, y:y+0.42, w:w-0.64, h:0.36, fontSize:10.5, color:"B03040", margin:0 });
        s.addText(`\u2713 ${m.fix}`,    { x:x+0.54, y:y+0.82, w:w-0.64, h:0.4,  fontSize:10.5, color:C.green,  margin:0 });
      });
    });
  }

  // SLIDE 9 — Putting It All Together: The Agentic SDLC
  {
    const s = pres.addSlide();
    s.background = { color:C.navy };
    s.addText("PUTTING IT ALL TOGETHER  \u2014  THE AGENTIC SDLC", { x:0.4, y:0.22, w:9, h:0.45, fontSize:13, color:C.iceBlue, bold:true, charSpacing:3, margin:0 });
    s.addText("All 10 modules as one integrated development lifecycle", { x:0.4, y:0.72, w:9, h:0.36, fontSize:17, color:C.white, italic:true, margin:0 });

    const phases = [
      { phase:"Design", color:C.steel, mods:"Modules 1, 2, 10",
        activities:["Agent-first architecture", "AX design (schemas, MCP, types)", "Design review gate", "ADRs documented"] },
      { phase:"Specify", color:C.teal, mods:"Modules 3, 4",
        activities:["Context engineering (CLAUDE.md, Skills)", "requirements.md + plan.md", "SPEC.md + Acceptance Criteria", "Non-goals stated explicitly"] },
      { phase:"Build", color:C.accent, mods:"Modules 2, 5",
        activities:["Research \u2192 Plan \u2192 Implement", "TDD with verifier loops", "CI/CD integration", "Agent self-correction"] },
      { phase:"Govern", color:C.green, mods:"Modules 6, 7",
        activities:["HITL review cycles", "Observability & tracing", "Evaluation baselines", "Drift detection alerts"] },
      { phase:"Secure", color:"D04040", mods:"Module 8",
        activities:["Identity & sandboxing", "OWASP threat mitigation", "Kill switches tested", "Audit trail live"] },
      { phase:"Optimize", color:C.iceBlue, mods:"Module 9",
        activities:["Cost-per-unit measured", "Model routing deployed", "Budget guardrails set", "FinOps dashboard live"] },
    ];

    phases.forEach((ph, i) => {
      const x = 0.35 + (i%3)*3.15, y = i<3 ? 1.28 : 3.2;
      const w=2.95, h=1.72;
      s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill:{ color:C.mid, transparency:18 }, shadow:shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y, w, h:0.52, fill:{ color:ph.color, transparency:10 } });
      s.addText(ph.phase, { x, y, w:1.6, h:0.52, fontSize:16, color:C.white, bold:true, valign:"middle", margin:0 });
      s.addText(ph.mods,  { x:x+1.62, y, w:1.3, h:0.52, fontSize:9, color:C.pale, italic:true, valign:"middle", margin:0 });
      ph.activities.forEach((a, j) => {
        s.addText(`\u00B7 ${a}`, { x:x+0.12, y:y+0.6+j*0.28, w:w-0.2, h:0.26, fontSize:10, color:C.pale, margin:0 });
      });
    });

    s.addText("The agentic SDLC is not waterfall \u2014 it\u2019s iterative and continuous. Each cycle tightens the spec, improves the context, and reduces the cost.", {
      x:0.35, y:5.3, w:9.3, h:0.28, fontSize:10, color:C.muted, italic:true, margin:0
    });
  }

  // SLIDE 10 — What Great Looks Like
  {
    const s = pres.addSlide();
    s.background = { color:C.white };
    s.addShape(pres.shapes.RECTANGLE, { x:0, y:0, w:10, h:0.82, fill:{ color:C.navy } });
    s.addShape(pres.shapes.RECTANGLE, { x:0, y:0, w:0.35, h:0.82, fill:{ color:C.green } });
    s.addText("WHAT GREAT LOOKS LIKE  \u00B7  ENTERPRISE AGENTIC MATURITY", { x:0.55, y:0, w:9.1, h:0.82, fontSize:12, color:C.white, bold:true, charSpacing:2, valign:"middle", margin:0 });

    const maturity = [
      { level:"Level 1\nFoundation", color:C.steel,
        markers:["Chat tools in use (Copilot, Claude.ai)", "Developers prompting ad-hoc", "No structured context or specs", "No cost visibility"] },
      { level:"Level 2\nStructured", color:C.teal,
        markers:["CLAUDE.md and Skills in repos", "SDD workflow adopted by some teams", "Basic cost tracking per team", "First agent in CI pipeline"] },
      { level:"Level 3\nManaged", color:C.accent,
        markers:["Design reviews before agent deployment", "Verifier loops and HITL gates standard", "Cost-per-unit tracked for AI features", "ADR process adopted"] },
      { level:"Level 4\nOptimized", color:C.green,
        markers:["Agents primary authors of code (Spotify model)", "Full observability and drift detection", "FinOps governance with routing and caching", "Security audited quarterly"] },
    ];

    maturity.forEach((m, i) => {
      const x = 0.35 + i*2.38, y = 1.28;
      s.addShape(pres.shapes.RECTANGLE, { x, y, w:2.2, h:4.1, fill:{ color:C.offWhite }, shadow:shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y, w:2.2, h:0.65, fill:{ color:m.color } });
      s.addText(m.level, { x, y, w:2.2, h:0.65, fontSize:13, color:C.white, bold:true, align:"center", valign:"middle", margin:0 });
      m.markers.forEach((mk, j) => {
        s.addText(`\u2022 ${mk}`, { x:x+0.12, y:y+0.75+j*0.8, w:1.96, h:0.72, fontSize:10.5, color:C.text, margin:0 });
      });
      // Current org indicator for level 2
      if (i === 1) {
        s.addShape(pres.shapes.RECTANGLE, { x, y:y+3.82, w:2.2, h:0.22, fill:{ color:m.color, transparency:70 } });
        s.addText("Most enterprises today \u2191", { x, y:y+3.82, w:2.2, h:0.22, fontSize:9, color:C.white, bold:true, align:"center", valign:"middle", margin:0 });
      }
    });

    s.addText("The goal of this training program: move your teams from Level 2 to Level 3 within 90 days, with a clear path to Level 4.", {
      x:0.35, y:5.35, w:9.3, h:0.24, fontSize:11, color:C.muted, italic:true, margin:0
    });
  }

  // SLIDE 11 — Lab
  {
    const s = pres.addSlide();
    s.background = { color:C.white };
    s.addShape(pres.shapes.RECTANGLE, { x:0, y:0, w:10, h:0.82, fill:{ color:C.teal } });
    s.addText("LAB EXERCISE  \u00B7  45 MINUTES  \u00B7  CAPSTONE", { x:0.4, y:0, w:9, h:0.82, fontSize:13, color:C.white, bold:true, charSpacing:3, valign:"middle", margin:0 });
    s.addText("Run a Full Design Review (Production) or Apply the Lightweight Subset (Coding Agent Workflow)", { x:0.4, y:0.9, w:9.2, h:0.46, fontSize:15, color:C.navy, bold:true, margin:0 });

    // Track selector
    s.addShape(pres.shapes.RECTANGLE, { x:0.35, y:1.44, w:4.4, h:0.3, fill:{ color:C.teal, transparency:15 } });
    s.addText("Track A: Production agent system \u2014 run all 12 checklist items", { x:0.42, y:1.44, w:4.28, h:0.3, fontSize:10, color:C.white, bold:true, valign:"middle", margin:0 });
    s.addShape(pres.shapes.RECTANGLE, { x:4.9, y:1.44, w:4.75, h:0.3, fill:{ color:C.accent, transparency:15 } });
    s.addText("Track B: Coding agent workflow \u2014 items 01, 04, 05, 06, 07, 10 only", { x:4.97, y:1.44, w:4.6, h:0.3, fontSize:10, color:C.white, bold:true, valign:"middle", margin:0 });

    const steps = [
      { n:"1", t:"Finalise your architecture", min:"10 min", d:"Draw the complete system: orchestrator/subagents, tools, memory, context sources, HITL gates, kill switch, budget model. For coding-agent track: map your CLAUDE.md, skills, verifier loop, and HITL points." },
      { n:"2", t:"Run the checklist", min:"12 min", d:"Work through every applicable checklist item: \u2713 Pass, \u26A0 Partial, \u2717 Gap. Document every gap with an owner and timeline. Production track: all 12. Coding-agent track: items 01, 04, 05, 06, 07, 10." },
      { n:"3", t:"Write one ADR", min:"8 min", d:"Identify the single most important architectural decision in your system. Write a full ADR: Context, Decision, Consequences. It must be specific, consequential, and irreversible. Swap with a neighbour." },
      { n:"4", t:"Threat model + FinOps", min:"8 min", d:"Identify your top 3 OWASP threats with mitigations and owners. Estimate $/day at 1,000 runs. Identify the highest-ROI cost optimization lever. (Coding-agent track: estimate cost-per-session and set a budget cap.)" },
      { n:"5", t:"Present to peer review", min:"7 min", d:"10-minute presentation. Panel plays enterprise architecture review board. Focus questions: security gaps, cost model, and what happens when the agent fails." },
    ];

    steps.forEach((st, i) => {
      const y = 1.84+i*0.74;
      s.addShape(pres.shapes.RECTANGLE, { x:0.35, y, w:9.3, h:0.66, fill:{ color:C.offWhite }, shadow:shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x:0.35, y, w:0.52, h:0.66, fill:{ color:C.teal } });
      s.addText(st.n, { x:0.35, y, w:0.52, h:0.66, fontSize:20, color:C.white, bold:true, align:"center", valign:"middle", margin:0 });
      s.addText(st.t, { x:0.97, y:y+0.04, w:2.7, h:0.26, fontSize:12.5, color:C.teal, bold:true, margin:0 });
      s.addText(`(${st.min})`, { x:3.67, y:y+0.04, w:0.8, h:0.26, fontSize:11, color:C.muted, italic:true, margin:0 });
      s.addText(st.d, { x:0.97, y:y+0.34, w:8.55, h:0.28, fontSize:10.5, color:C.muted, margin:0 });
    });
  }

  // SLIDE 12 — Program Wrap-Up
  {
    const s = pres.addSlide();
    s.background = { color:C.navy };
    s.addShape(pres.shapes.RECTANGLE, { x:9.82, y:0, w:0.18, h:5.625, fill:{ color:C.accent } });
    s.addText("PROGRAM WRAP-UP  \u00B7  MODULE 10 SUMMARY", { x:0.4, y:0.22, w:9, h:0.45, fontSize:13, color:C.iceBlue, bold:true, charSpacing:3, margin:0 });

    s.addShape(pres.shapes.RECTANGLE, { x:0.35, y:0.82, w:5.5, h:3.82, fill:{ color:C.mid, transparency:20 }, shadow:shadow() });
    s.addShape(pres.shapes.RECTANGLE, { x:0.35, y:0.82, w:5.5, h:0.48, fill:{ color:C.iceBlue, transparency:15 } });
    s.addText("10-MODULE JOURNEY RECAP", { x:0.35, y:0.82, w:5.5, h:0.48, fontSize:11, color:C.white, bold:true, charSpacing:2, align:"center", valign:"middle", margin:0 });
    const recap = [
      "M01: Chat vs. Agents \u2014 the autonomy spectrum",
      "M02: Core Concepts \u2014 tools, memory, MCP, 12-Factor",
      "M03: Context Engineering \u2014 CLAUDE.md, Skills, strategies",
      "M04: Product Documentation \u2014 rules files, PRODUCT.md, ADRs, README",
      "M05: Automated Testing \u2014 TDD, coverage \u226585%, AC-to-test pipeline",
      "M06: Spec-Driven Development \u2014 PRD \u2192 Spec \u2192 Plan \u2192 Code",
      "M07: Review Cycles \u2014 HITL, verifiers, evaluators, feedback loops",
      "M08: Review Hygiene \u2014 HITL tiers, ADRs, improvement loop",
      "M09: Observability \u2014 logs, metrics, traces, events, health",
      "M10: Design Reviews \u2014 design principles, security & FinOps review, 12-point checklist",
    ];
    s.addText(recap.join("\n"), { x:0.5, y:1.4, w:5.1, h:3.1, fontSize:11, color:C.pale, margin:0 });

    s.addShape(pres.shapes.RECTANGLE, { x:6.05, y:0.82, w:3.6, h:3.82, fill:{ color:C.mid, transparency:20 }, shadow:shadow() });
    s.addShape(pres.shapes.RECTANGLE, { x:6.05, y:0.82, w:3.6, h:0.48, fill:{ color:C.accent, transparency:10 } });
    s.addText("YOUR 90-DAY PLAN", { x:6.05, y:0.82, w:3.6, h:0.48, fontSize:11, color:C.white, bold:true, charSpacing:2, align:"center", valign:"middle", margin:0 });
    const plan = [
      "Week 1\u20132: Deploy CLAUDE.md + Skills for your team",
      "Week 3\u20134: Run SDD for your next sprint feature",
      "Week 5\u20136: Add verifier loop to one CI pipeline",
      "Week 7\u20138: Instrument one agent with OTel tracing",
      "Week 9\u201310: Run first formal design review",
      "Week 11\u201312: FinOps dashboard live, cost-per-unit tracked",
    ];
    s.addText(plan.join("\n\n"), { x:6.2, y:1.4, w:3.35, h:3.1, fontSize:11, color:C.pale, margin:0 });

    s.addShape(pres.shapes.RECTANGLE, { x:0.35, y:4.75, w:9.3, h:0.62, fill:{ color:C.green, transparency:15 } });
    s.addText("\u2705  Program Complete  \u00B7  Enterprise Agentic Practices  \u00B7  10 Modules  \u00B7  Delivered", {
      x:0.35, y:4.75, w:9.3, h:0.62, fontSize:14, color:C.white, bold:true, align:"center", valign:"middle", margin:0
    });
  }

  await pres.writeFile({ fileName: "Module_10_Design_Reviews.pptx" });
  console.log("\u2705 Module 10 written");
}

build().catch(console.error);
