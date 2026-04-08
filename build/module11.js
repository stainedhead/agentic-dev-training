const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const {
  FaUsers, FaHeart, FaMapMarkedAlt, FaChartLine, FaSyncAlt,
  FaLightbulb, FaCode, FaShieldAlt, FaCompass, FaLayerGroup,
  FaUserTie, FaHandshake, FaBookOpen, FaRocket, FaRecycle,
  FaBullseye, FaEye, FaBrain, FaTree, FaCogs
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
  amber:   "B87820",
};

const shadow = () => ({ type:"outer", color:"000000", blur:8, offset:3, angle:135, opacity:0.13 });

async function icon(Comp, color="#FFFFFF", size=256) {
  const svg = ReactDOMServer.renderToStaticMarkup(React.createElement(Comp, { color, size:String(size) }));
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}

async function build() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.title  = "Module 11: Product-First Engineering";
  pres.author = "Enterprise Architect Training Series";

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 1 — Title
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.navy };

    s.addShape(pres.shapes.RECTANGLE, { x:0, y:0, w:0.18, h:5.625, fill:{ color:C.accent } });
    s.addText("ENTERPRISE AGENTIC PRACTICES", { x:0.4, y:0.32, w:9.2, h:0.35, fontSize:10, color:C.iceBlue, bold:true, charSpacing:4, margin:0 });

    s.addShape(pres.shapes.RECTANGLE, { x:0.4, y:0.82, w:1.5, h:0.38, fill:{ color:C.accent } });
    s.addText("MODULE 11", { x:0.4, y:0.82, w:1.5, h:0.38, fontSize:11, color:C.white, bold:true, align:"center", valign:"middle", margin:0 });

    s.addText("Product-First\nEngineering", { x:0.4, y:1.35, w:7.0, h:1.75, fontSize:50, color:C.white, bold:true, margin:0 });
    s.addText("Developers as product people — building long-lived systems that grow with the business", { x:0.4, y:3.18, w:7.2, h:0.62, fontSize:17, color:C.iceBlue, italic:true, margin:0 });
    s.addShape(pres.shapes.RECTANGLE, { x:0.4, y:3.92, w:3.5, h:0.04, fill:{ color:C.accent } });
    s.addText([
      { text:"Duration: ", options:{ bold:true, color:C.muted } },
      { text:"75 min  ", options:{ color:C.muted } },
      { text:"  |  Level: ", options:{ color:C.muted } },
      { text:"All Levels", options:{ bold:true, color:C.muted } }
    ], { x:0.4, y:4.1, w:5, h:0.38, fontSize:13, margin:0 });

    // Right: product lifecycle spiral
    const cx = 8.55, cy = 2.85;
    const rings = [
      { r:1.55, color:C.steel,  label:"Understand",  transparency:70 },
      { r:1.15, color:C.teal,   label:"Guide",       transparency:55 },
      { r:0.78, color:C.accent, label:"Grow",        transparency:40 },
      { r:0.42, color:C.green,  label:"Evolve",      transparency:20 },
    ];
    rings.forEach(r => {
      s.addShape(pres.shapes.OVAL, { x:cx-r.r, y:cy-r.r*0.9, w:r.r*2, h:r.r*1.8, fill:{ color:r.color, transparency:r.transparency } });
    });
    // Center label
    s.addShape(pres.shapes.OVAL, { x:cx-0.28, y:cy-0.22, w:0.56, h:0.44, fill:{ color:C.accent } });
    s.addText("Product", { x:cx-0.55, y:cy+0.28, w:1.1, h:0.28, fontSize:10, color:C.iceBlue, align:"center", bold:true, margin:0 });
    s.addText("Understand", { x:cx+0.85, y:cy-0.85, w:1.2, h:0.26, fontSize:9, color:C.pale, margin:0 });
    s.addText("Guide", { x:cx+0.62, y:cy-0.38, w:0.9, h:0.26, fontSize:9, color:C.pale, margin:0 });
    s.addText("Grow", { x:cx+0.42, y:cy+0.02, w:0.8, h:0.26, fontSize:9, color:C.pale, margin:0 });
    s.addText("Evolve", { x:cx+0.22, y:cy+0.42, w:0.9, h:0.26, fontSize:9, color:C.pale, margin:0 });
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 2 — Learning Objectives
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color:C.offWhite };

    s.addShape(pres.shapes.RECTANGLE, { x:0, y:0, w:10, h:0.82, fill:{ color:C.navy } });
    s.addText("LEARNING OBJECTIVES", { x:0.4, y:0, w:9.2, h:0.82, fontSize:13, color:C.white, bold:true, charSpacing:3, valign:"middle", margin:0 });
    s.addText("By the end of this module you will be able to:", { x:0.35, y:0.9, w:9.3, h:0.28, fontSize:11, color:C.muted, italic:true, margin:0 });

    const objs = [
      { icon:FaCompass,   color:C.accent, title:"Shift from Project to Product Thinking", body:"Articulate why treating software as a long-lived product — not a series of projects — changes every decision about architecture, quality, and team structure." },
      { icon:FaBrain,     color:C.teal,   title:"Build Deep Product Understanding",      body:"Develop and maintain team-wide shared context: the users, the business goals, the codebase, the constraints, and the architectural decisions that shaped it." },
      { icon:FaUsers,     color:C.green,  title:"Align the Team as Product People",      body:"Move the whole team — developers, architects, PMs — to a shared understanding where everyone can guide the product, not just implement tickets." },
      { icon:FaSyncAlt,   color:C.steel,  title:"Build Hygiene & Continuous Improvement", body:"Establish the rituals, practices, and agent workflows that keep a long-lived product healthy, evolvable, and aligned with changing business needs." },
    ];

    const cols = [0.35, 5.1];
    for (let i=0; i<4; i++) {
      const x=cols[i%2], y=1.28+Math.floor(i/2)*2.0, w=4.55, h=1.82;
      const o=objs[i];
      s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill:{ color:C.white }, shadow:shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y, w:0.07, h, fill:{ color:o.color } });
      const ic = await icon(o.icon, "#"+o.color);
      s.addImage({ data:ic, x:x+0.18, y:y+0.22, w:0.4, h:0.4 });
      s.addText(o.title, { x:x+0.7, y:y+0.18, w:w-0.85, h:0.42, fontSize:13, color:C.navy, bold:true, margin:0 });
      s.addText(o.body,  { x:x+0.7, y:y+0.64, w:w-0.85, h:1.05, fontSize:11.5, color:C.muted, margin:0 });
    }
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 3 — Project vs Product: The Paradigm Shift
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color:C.navy };

    s.addText("THE PROJECT-TO-PRODUCT SHIFT", { x:0.4, y:0.22, w:9, h:0.45, fontSize:13, color:C.iceBlue, bold:true, charSpacing:3, margin:0 });
    s.addText("This is the most important mental model change in the program. Everything else depends on it.", { x:0.4, y:0.72, w:9, h:0.36, fontSize:15, color:C.white, italic:true, margin:0 });

    const rows = [
      ["Dimension",          "Project Mindset",                        "Product Mindset"],
      ["Time horizon",       "Bounded: start date, end date, go-live", "Unbounded: evolves as long as the business needs it"],
      ["Success definition", "Delivered on time and budget",           "Users succeed. Business goals met. Codebase is healthy."],
      ["Team relationship",  "Temporary: assembled, then disbanded",   "Permanent: team owns the product through its lifecycle"],
      ["Context",            "Rebuilt each time. Tribal knowledge lost","Accumulated, documented, shared, and agent-accessible"],
      ["Quality mindset",    "Good enough to ship",                    "Sustainable: designed to last and be extended safely"],
      ["Developer role",     "Implements tickets assigned by PM",      "Co-owns the product. Guides its evolution. Improves it."],
      ["Agentic implication","Agents build features in isolation",      "Agents grow a well-understood, well-specified system"],
    ];

    const colX = [0.35, 2.88, 6.38];
    const colW = [2.42, 3.4, 3.27];
    const hColors = [C.pale, C.mid, C.teal];
    const hTextC  = [C.navy, C.white, C.white];

    rows.forEach((row, ri) => {
      const y = 1.18 + ri * 0.54;
      const bg = ri === 0 ? null : (ri % 2 === 0 ? C.white : "EAF0F6");
      row.forEach((cell, ci) => {
        const bg2 = ri === 0 ? hColors[ci] : (ci===0 ? C.pale : (ri%2===0 ? C.white : "EAF0F6"));
        s.addShape(pres.shapes.RECTANGLE, { x:colX[ci], y, w:colW[ci], h:0.5, fill:{ color:bg2 } });
        s.addShape(pres.shapes.LINE, { x:colX[ci], y:y+0.5, w:colW[ci], h:0, line:{ color:"C8D5E3", width:0.5 } });
        const fc = ri===0 ? hTextC[ci] : (ci===0 ? C.navy : (ci===1 ? C.muted : C.text));
        s.addText(cell, {
          x:colX[ci]+0.1, y, w:colW[ci]-0.14, h:0.5,
          fontSize:ri===0 ? 11 : 10.5, color:fc, bold:ri===0 || ci===0,
          valign:"middle", charSpacing:ri===0?1.5:0, margin:0
        });
      });
    });

    s.addText("With agents writing code 10\u00D7 faster, a product mindset is not optional \u2014 it\u2019s the only way to ensure that speed produces value rather than accelerating toward a wall of technical debt.", {
      x:0.35, y:5.3, w:9.3, h:0.26, fontSize:10, color:C.muted, italic:true, margin:0
    });
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 4 — Deep Product Understanding
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color:C.white };

    s.addShape(pres.shapes.RECTANGLE, { x:0, y:0, w:10, h:0.82, fill:{ color:C.navy } });
    s.addText("DEEP PRODUCT UNDERSTANDING", { x:0.4, y:0, w:9, h:0.82, fontSize:13, color:C.white, bold:true, charSpacing:3, valign:"middle", margin:0 });
    s.addText("The agent builds what the team understands. If your team doesn\u2019t deeply know the product, neither will your agent.", { x:0.4, y:0.9, w:9.2, h:0.3, fontSize:12, color:C.muted, italic:true, margin:0 });

    const domains = [
      {
        icon: FaUsers, color: C.accent, label: "The Users",
        must: ["Who uses this product and why?", "What jobs are they trying to do?", "Where do they succeed? Where do they struggle?", "How do their needs change over time?"],
        agent: "Feed user research, journey maps, and feedback themes into context. Agents that know the user write better code."
      },
      {
        icon: FaMapMarkedAlt, color: C.teal, label: "The Architecture",
        must: ["What are the core bounded contexts?", "What are the integration points and contracts?", "Where are the known weak spots?", "What constraints shaped the current design?"],
        agent: "ADRs, architecture docs, and schema definitions in the agent\u2019s context window prevent architectural violations."
      },
      {
        icon: FaChartLine, color: C.green, label: "The Business",
        must: ["What business capabilities does this system enable?", "What are the north star metrics?", "What\u2019s the cost of downtime or quality failure?", "What is the competitive differentiation this system provides?"],
        agent: "Agents that understand business context prioritize correctly and avoid building features that conflict with strategy."
      },
      {
        icon: FaLayerGroup, color: C.steel, label: "The Codebase",
        must: ["What are the dominant patterns and idioms?", "Where is the most-changed code? (hotspots)", "Where is the highest-risk code? (complexity)", "What does the test coverage picture look like?"],
        agent: "Code understanding = better context. Map hotspots, complexity, and coverage. Agents use these to make safer changes."
      },
    ];

    for (let i=0; i<4; i++) {
      const col=i%2, row=Math.floor(i/2);
      const x=col===0?0.35:5.1, y=1.28+row*2.12, w=4.55, h=1.98;
      const d=domains[i];
      s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill:{ color:C.offWhite }, shadow:shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y, w, h:0.48, fill:{ color:d.color } });
      const ic = await icon(d.icon, "#FFFFFF");
      s.addImage({ data:ic, x:x+0.14, y:y+0.1, w:0.3, h:0.3 });
      s.addText(d.label, { x:x+0.52, y, w:w-0.62, h:0.48, fontSize:14, color:C.white, bold:true, valign:"middle", margin:0 });

      d.must.forEach((m, j) => {
        s.addText(`\u2022 ${m}`, { x:x+0.15, y:y+0.56+j*0.28, w:w-0.28, h:0.26, fontSize:10.5, color:C.text, margin:0 });
      });

      s.addShape(pres.shapes.RECTANGLE, { x:x+0.1, y:y+1.62, w:w-0.2, h:0.28, fill:{ color:d.color, transparency:88 } });
      s.addText(`Agent: ${d.agent}`, { x:x+0.15, y:y+1.62, w:w-0.3, h:0.28, fontSize:9.5, color:d.color, italic:true, valign:"middle", margin:0 });
    }
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 5 — The Product Context Document
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color:C.offWhite };

    s.addShape(pres.shapes.RECTANGLE, { x:0, y:0, w:10, h:0.82, fill:{ color:C.teal } });
    s.addText("THE PRODUCT CONTEXT DOCUMENT", { x:0.4, y:0, w:9, h:0.82, fontSize:13, color:C.white, bold:true, charSpacing:3, valign:"middle", margin:0 });
    s.addText("A living document that is both the team\u2019s shared mental model and the agent\u2019s primary product context source", { x:0.4, y:0.9, w:9.2, h:0.3, fontSize:12, color:C.muted, italic:true, margin:0 });

    // Left: structure
    s.addShape(pres.shapes.RECTANGLE, { x:0.35, y:1.28, w:4.55, h:4.1, fill:{ color:C.white }, shadow:shadow() });
    s.addShape(pres.shapes.RECTANGLE, { x:0.35, y:1.28, w:4.55, h:0.44, fill:{ color:C.navy } });
    s.addText("PRODUCT.md  \u2014  RECOMMENDED STRUCTURE", { x:0.35, y:1.28, w:4.55, h:0.44, fontSize:11, color:C.white, bold:true, charSpacing:1.5, align:"center", valign:"middle", margin:0 });

    const sections = [
      { section:"# Product Vision",        color:C.accent, note:"One paragraph. What does this system exist to do?" },
      { section:"## Users",                color:C.teal,   note:"Personas, jobs-to-be-done, key pain points" },
      { section:"## Business Context",     color:C.green,  note:"North star metrics, strategic importance, cost of failure" },
      { section:"## Architecture Overview",color:C.steel,  note:"Bounded contexts, integration contracts, key constraints" },
      { section:"## Design Principles",    color:C.accent, note:"The non-negotiable rules governing how we build" },
      { section:"## Known Hotspots",       color:C.teal,   note:"High-change and high-complexity code areas" },
      { section:"## Roadmap Context",      color:C.green,  note:"What\u2019s coming that agents must not contradict" },
      { section:"## Non-Negotiables",      color:C.steel,  note:"Security, compliance, and quality floors" },
    ];

    sections.forEach((sec, i) => {
      const y = 1.82 + i * 0.44;
      s.addShape(pres.shapes.RECTANGLE, { x:0.47, y, w:4.3, h:0.38, fill:{ color:i%2===0?C.white:C.offWhite } });
      s.addText(sec.section, { x:0.55, y, w:1.82, h:0.38, fontSize:10.5, color:sec.color, bold:true, fontFace:"Consolas", valign:"middle", margin:0 });
      s.addText(sec.note,    { x:2.42, y, w:2.22, h:0.38, fontSize:10, color:C.muted, italic:true, valign:"middle", margin:0 });
    });

    // Right: how to use it
    s.addShape(pres.shapes.RECTANGLE, { x:5.1, y:1.28, w:4.55, h:1.82, fill:{ color:C.white }, shadow:shadow() });
    s.addShape(pres.shapes.RECTANGLE, { x:5.1, y:1.28, w:4.55, h:0.44, fill:{ color:C.accent } });
    s.addText("HOW THE TEAM USES IT", { x:5.1, y:1.28, w:4.55, h:0.44, fontSize:11, color:C.white, bold:true, charSpacing:2, align:"center", valign:"middle", margin:0 });
    const teamUses = [
      "Onboarding: every new team member reads it first",
      "Sprint planning: referenced before writing any spec",
      "Architecture decisions: checked for conflicts",
      "Retrospectives: updated to reflect what changed",
    ];
    teamUses.forEach((u,i) => {
      s.addText(`\u2713 ${u}`, { x:5.22, y:1.82+i*0.3, w:4.32, h:0.28, fontSize:11, color:C.text, margin:0 });
    });

    s.addShape(pres.shapes.RECTANGLE, { x:5.1, y:3.18, w:4.55, h:2.2, fill:{ color:C.white }, shadow:shadow() });
    s.addShape(pres.shapes.RECTANGLE, { x:5.1, y:3.18, w:4.55, h:0.44, fill:{ color:C.teal } });
    s.addText("HOW THE AGENT USES IT", { x:5.1, y:3.18, w:4.55, h:0.44, fontSize:11, color:C.white, bold:true, charSpacing:2, align:"center", valign:"middle", margin:0 });
    const agentUses = [
      "Referenced in CLAUDE.md \u2014 loaded every session",
      "Prevents architectural drift and feature conflicts",
      "Gives agent the \u2018why\u2019 behind every design constraint",
      "Enables agent to self-check: \u201CDoes this fit the product?\u201D",
      "Guides prioritisation when spec is ambiguous",
    ];
    agentUses.forEach((u,i) => {
      s.addText(`\u2022 ${u}`, { x:5.22, y:3.72+i*0.32, w:4.32, h:0.3, fontSize:11, color:C.text, margin:0 });
    });
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 6 — Developers as Product People
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color:C.navy };

    s.addText("DEVELOPERS AS PRODUCT PEOPLE", { x:0.4, y:0.22, w:9, h:0.45, fontSize:13, color:C.iceBlue, bold:true, charSpacing:3, margin:0 });
    s.addText("When agents write the code, the developer\u2019s highest-value activity becomes understanding and guiding the product.", { x:0.4, y:0.72, w:9, h:0.36, fontSize:15, color:C.white, italic:true, margin:0 });

    // Old role vs new role
    const oldRole = [
      "Write code to satisfy a ticket",
      "Implement what the PM specifies",
      "Optimize for story points delivered",
      "Hand off and move to next ticket",
      "System knowledge stays in one person\u2019s head",
      "Quality is a test run before shipping",
    ];
    const newRole = [
      "Guide the product\u2019s evolution intelligently",
      "Co-author the spec with context the PM doesn\u2019t have",
      "Optimize for user outcomes and system health",
      "Own the outcome end-to-end",
      "System knowledge is documented, shared, agent-accessible",
      "Quality is a continuous practice, not a gate",
    ];

    s.addShape(pres.shapes.RECTANGLE, { x:0.35, y:1.28, w:4.5, h:3.82, fill:{ color:C.mid, transparency:18 }, shadow:shadow() });
    s.addShape(pres.shapes.RECTANGLE, { x:0.35, y:1.28, w:4.5, h:0.48, fill:{ color:C.steel, transparency:15 } });
    s.addText("OLD ROLE  \u00B7  Code Implementer", { x:0.35, y:1.28, w:4.5, h:0.48, fontSize:12, color:C.white, bold:true, align:"center", valign:"middle", margin:0 });
    oldRole.forEach((item,i) => {
      s.addText(`\u2715  ${item}`, { x:0.5, y:1.88+i*0.56, w:4.2, h:0.5, fontSize:11.5, color:"A0B0C8", margin:0 });
    });

    s.addShape(pres.shapes.RECTANGLE, { x:5.15, y:1.28, w:4.5, h:3.82, fill:{ color:C.mid, transparency:18 }, shadow:shadow() });
    s.addShape(pres.shapes.RECTANGLE, { x:5.15, y:1.28, w:4.5, h:0.48, fill:{ color:C.accent, transparency:15 } });
    s.addText("NEW ROLE  \u00B7  Product Guide", { x:5.15, y:1.28, w:4.5, h:0.48, fontSize:12, color:C.white, bold:true, align:"center", valign:"middle", margin:0 });
    newRole.forEach((item,i) => {
      s.addText(`\u2713  ${item}`, { x:5.3, y:1.88+i*0.56, w:4.2, h:0.5, fontSize:11.5, color:C.pale, margin:0 });
    });

    s.addText("Andrew Ng (YC AI Startup School, 2025): \u201CFor the first time in my life, managers are proposing having 2\u00D7 as many PMs as engineers. The engineer who understands the product is the engineer who is indispensable.\u201D", {
      x:0.35, y:5.22, w:9.3, h:0.32, fontSize:10, color:C.muted, italic:true, margin:0
    });
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 7 — Shared Team Understanding
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color:C.white };

    s.addShape(pres.shapes.RECTANGLE, { x:0, y:0, w:10, h:0.82, fill:{ color:C.navy } });
    s.addText("BUILDING SHARED TEAM UNDERSTANDING", { x:0.4, y:0, w:9, h:0.82, fontSize:13, color:C.white, bold:true, charSpacing:3, valign:"middle", margin:0 });
    s.addText("A team where everyone shares deep product knowledge produces dramatically better agent-guided systems than a team of specialists working in silos.", { x:0.4, y:0.9, w:9.2, h:0.32, fontSize:11.5, color:C.muted, italic:true, margin:0 });

    const practices = [
      {
        icon: FaBookOpen, color: C.accent, head: "Living Documentation",
        desc: "PRODUCT.md, ADRs, architecture diagrams, user journey maps — all committed to the repo, all current, all readable by humans AND agents.",
        ritual: "Weekly: one team member updates one section of PRODUCT.md as part of the definition of done."
      },
      {
        icon: FaEye, color: C.teal, head: "Code Literacy for Everyone",
        desc: "Every team member — including PMs and designers — can navigate the codebase, read hotspot reports, and understand the risk profile of major changes.",
        ritual: "Monthly: 30-min codebase walkthrough covering what changed, what\u2019s growing, and what\u2019s risky."
      },
      {
        icon: FaHandshake, color: C.green, head: "Cross-Functional Spec Writing",
        desc: "Specs are written collaboratively. PM brings user context. Developer brings system constraints. Architect brings design principles. Agent gets all three.",
        ritual: "Every sprint: spec review session before agents write a single line of code."
      },
      {
        icon: FaBullseye, color: C.steel, head: "Shared Definition of Quality",
        desc: "The whole team agrees on what \u2018good\u2019 looks like: test coverage floors, performance budgets, accessibility standards, security baselines. Written down. Enforced.",
        ritual: "Quarterly: team reviews and updates the quality contract. Non-negotiables are non-negotiable."
      },
      {
        icon: FaLightbulb, color: C.accent, head: "Domain Knowledge Capture",
        desc: "When a developer has an insight about why the system works the way it does, it gets written down \u2014 as an ADR, a NOTES.md update, or a PRODUCT.md edit.",
        ritual: "Agent-assisted: developers narrate insight to agent; agent drafts the ADR for review."
      },
      {
        icon: FaRocket, color: C.teal, head: "Outcome-Focused Retrospectives",
        desc: "Retros focus on product outcomes, not just process. Did users succeed? Did the system get healthier? Did the team\u2019s shared understanding deepen?",
        ritual: "Bi-weekly: retro includes a \u2018product health\u2019 check alongside the usual process questions."
      },
    ];

    for (let idx=0; idx<practices.length; idx++) {
      const p=practices[idx];
      const col = idx<3 ? 0 : 1;
      const row = idx<3 ? idx : idx-3;
      const x=col===0?0.35:5.1, y=1.3+row*1.42, w=4.55, h=1.3;
      s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill:{ color:C.offWhite }, shadow:shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y, w:0.06, h, fill:{ color:p.color } });
      const ic = await icon(p.icon, "#"+p.color);
      s.addImage({ data:ic, x:x+0.16, y:y+0.16, w:0.34, h:0.34 });
      s.addText(p.head, { x:x+0.6, y:y+0.1, w:w-0.72, h:0.32, fontSize:12.5, color:C.navy, bold:true, margin:0 });
      s.addText(p.desc, { x:x+0.16, y:y+0.52, w:w-0.28, h:0.5, fontSize:10.5, color:C.muted, margin:0 });
      s.addShape(pres.shapes.RECTANGLE, { x:x+0.1, y:y+1.06, w:w-0.2, h:0.18, fill:{ color:p.color, transparency:88 } });
      s.addText(`\u25B6 ${p.ritual}`, { x:x+0.14, y:y+1.06, w:w-0.26, h:0.18, fontSize:9, color:p.color, italic:true, valign:"middle", margin:0 });
    }
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 8 — Hygiene & Continuous Improvement
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color:C.offWhite };

    s.addShape(pres.shapes.RECTANGLE, { x:0, y:0, w:10, h:0.82, fill:{ color:C.navy } });
    s.addText("HYGIENE  &  CONTINUOUS IMPROVEMENT", { x:0.4, y:0, w:9, h:0.82, fontSize:13, color:C.white, bold:true, charSpacing:3, valign:"middle", margin:0 });
    s.addText("A dedicated product team can run continuous improvement as a first-class activity, not an afterthought squeezed between features.", { x:0.4, y:0.9, w:9.2, h:0.3, fontSize:12, color:C.muted, italic:true, margin:0 });

    // Cadence rings
    const cadences = [
      {
        freq: "DAILY", color: C.accent,
        items: ["Agent auto-runs dependency vulnerability scans", "Linter and type coverage report generated", "Test flakiness tracked and alerted", "Cost-per-request monitored (FinOps)"]
      },
      {
        freq: "WEEKLY", color: C.teal,
        items: ["Codebase hotspot review (most-changed files)", "Agent generates PR summary for tech lead", "PRODUCT.md section updated by rotating owner", "Spec backlog groomed against product context"]
      },
      {
        freq: "SPRINT", color: C.green,
        items: ["Architecture compliance check vs ADRs", "Test coverage gap analysis \u2014 agent writes missing tests", "Performance budget vs. benchmarks review", "Security posture check (OWASP checklist item)"]
      },
      {
        freq: "QUARTERLY", color: C.steel,
        items: ["Full codebase complexity + health report", "Quality contract review and update", "Architecture decision records reviewed", "Agent workflow retrospective \u2014 what improved?"]
      },
    ];

    cadences.forEach((c, i) => {
      const x = 0.35 + i * 2.38, y = 1.28;
      s.addShape(pres.shapes.RECTANGLE, { x, y, w:2.2, h:4.1, fill:{ color:C.white }, shadow:shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y, w:2.2, h:0.52, fill:{ color:c.color } });
      s.addText(c.freq, { x, y, w:2.2, h:0.52, fontSize:14, color:C.white, bold:true, charSpacing:2, align:"center", valign:"middle", margin:0 });
      c.items.forEach((item, j) => {
        s.addShape(pres.shapes.RECTANGLE, { x:x+0.1, y:y+0.6+j*0.86, w:2.0, h:0.78, fill:{ color:c.color, transparency:88 } });
        s.addText(item, { x:x+0.16, y:y+0.64+j*0.86, w:1.88, h:0.7, fontSize:10, color:C.text, margin:0 });
      });
    });

    s.addText("The key insight: a project team never has time for hygiene. A product team builds it into the cadence because the product is always running.", {
      x:0.35, y:5.32, w:9.3, h:0.26, fontSize:10.5, color:C.muted, italic:true, margin:0
    });
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 9 — Agent-Assisted Continuous Improvement
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color:C.white };

    s.addShape(pres.shapes.RECTANGLE, { x:0, y:0, w:10, h:0.82, fill:{ color:C.teal } });
    s.addText("AGENT-ASSISTED CONTINUOUS IMPROVEMENT", { x:0.4, y:0, w:9, h:0.82, fontSize:13, color:C.white, bold:true, charSpacing:3, valign:"middle", margin:0 });
    s.addText("Agents make hygiene economically viable at scale \u2014 and are available for review and education continuously, not just when a senior developer has spare time.", { x:0.4, y:0.88, w:9.2, h:0.3, fontSize:11, color:C.muted, italic:true, margin:0 });

    const workflows = [
      {
        name: "Dependency Hygiene",      color:C.navy,
        trigger: "Weekly scheduled",
        detail: "Scan for outdated / vulnerable dependencies. Group by risk level. Open low-risk PRs automatically (Tier 1). Flag high-risk changes for human review.",
      },
      {
        name: "Test Coverage Growth",    color:C.teal,
        trigger: "Post-merge",
        detail: "Identify files modified with <80% coverage. Agent generates missing unit tests. Verifier confirms tests pass and are meaningful. PR opened for human review.",
      },
      {
        name: "Documentation Refresh",   color:C.accent,
        trigger: "On significant PR merge",
        detail: "Agent reads diff and identifies doc gaps. Updates API docs and architecture notes. Flags PRODUCT.md sections that may be outdated. PR opened; team reviews.",
      },
      {
        name: "Code Quality Enforcement", color:C.green,
        trigger: "Pre-PR hook",
        detail: "Linter, formatter, type checker, complexity check, security pattern check. Agent self-corrects formatting issues before the human sees the diff.",
      },
      {
        name: "Design & Artifact Review", color:C.steel,
        trigger: "Before human review",
        detail: "Agent reads the proposal alongside the codebase and flags: conflicts with existing architecture, missing edge cases, undefined NFRs, ADR violations. Humans review with findings already surfaced.",
      },
      {
        name: "Team Education & Onboarding", color:C.amber,
        trigger: "On-demand / new team member",
        detail: "New members use Claude Code to understand the codebase without interrupting senior developers. Encode starting questions in CLAUDE.md: \u201CRead PRODUCT.md and the adr/ folder. Explain the three most important architectural constraints and why they exist.\u201D",
      },
    ];

    for (let i = 0; i < workflows.length; i++) {
      const wf = workflows[i];
      const col = i % 2, row = Math.floor(i / 2);
      const x = col === 0 ? 0.35 : 5.1, y = 1.28 + row * 1.36, w = 4.55, h = 1.24;
      s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill:{ color:C.offWhite }, shadow:shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y, w:0.06, h, fill:{ color:wf.color } });
      s.addText(wf.name, { x:x+0.16, y:y+0.08, w:w-0.26, h:0.3, fontSize:12.5, color:wf.color, bold:true, margin:0 });
      s.addText(`\u25B6 ${wf.trigger}`, { x:x+0.16, y:y+0.42, w:w-0.26, h:0.22, fontSize:9.5, color:wf.color, italic:true, margin:0 });
      s.addText(wf.detail, { x:x+0.16, y:y+0.64, w:w-0.26, h:0.56, fontSize:10, color:C.muted, margin:0 });
    }
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 10 — Guiding the Product with Agents
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color:C.navy };

    s.addText("GUIDING THE PRODUCT WITH AGENTS", { x:0.4, y:0.22, w:9, h:0.45, fontSize:13, color:C.iceBlue, bold:true, charSpacing:3, margin:0 });
    s.addText("When the team has deep product understanding, agents become force multipliers for the right outcomes.", { x:0.4, y:0.72, w:9, h:0.36, fontSize:15, color:C.white, italic:true, margin:0 });

    const principles = [
      {
        head: "Context-rich agents make better decisions",
        body: "An agent with PRODUCT.md, ADRs, user personas, and architecture docs in context will self-correct toward the right solution. Without context, it optimizes for the technically correct solution, not the product-correct one.",
        color: C.accent
      },
      {
        head: "The team guides intent; agents execute",
        body: "Product people define WHAT and WHY with precision. Agents determine HOW and DO it at scale. The team\u2019s job is to write better specs, richer context, and more explicit acceptance criteria \u2014 not more code.",
        color: C.teal
      },
      {
        head: "Quality is a team sport, not a QA phase",
        body: "Every team member \u2014 PM, developer, architect \u2014 shares ownership of code quality, test coverage, security posture, and technical health. Agents automate the measurement; humans own the standards.",
        color: C.green
      },
      {
        head: "Evolve fast and safely because you understand deeply",
        body: "Teams that deeply understand their product can guide agents to change it quickly without breaking it. Speed without understanding produces accelerated technical debt. Speed with understanding produces competitive advantage.",
        color: C.steel
      },
    ];

    principles.forEach((p, i) => {
      const col=i%2, row=Math.floor(i/2);
      const x=col===0?0.35:5.15, y=1.28+row*2.05, w=4.6, h=1.88;
      s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill:{ color:C.mid, transparency:18 }, shadow:shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y, w:0.06, h, fill:{ color:p.color } });
      s.addText(p.head, { x:x+0.16, y:y+0.1, w:w-0.24, h:0.42, fontSize:13, color:p.color, bold:true, margin:0 });
      s.addText(p.body, { x:x+0.16, y:y+0.58, w:w-0.24, h:1.2, fontSize:11.5, color:C.pale, margin:0 });
    });
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 11 — Lab Exercise
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color:C.white };

    s.addShape(pres.shapes.RECTANGLE, { x:0, y:0, w:10, h:0.82, fill:{ color:C.teal } });
    s.addText("LAB EXERCISE  \u00B7  40 MINUTES", { x:0.4, y:0, w:9, h:0.82, fontSize:13, color:C.white, bold:true, charSpacing:3, valign:"middle", margin:0 });
    s.addText("Write Your Team\u2019s PRODUCT.md \u2014 and Use It to Guide an Agent", { x:0.4, y:0.95, w:9.2, h:0.46, fontSize:18, color:C.navy, bold:true, margin:0 });

    const steps = [
      { n:"1", t:"Assess your current state",       min:"5 min",
        d:"How much of your product context is written down today? Rate each of the 4 domains (Users, Architecture, Business, Codebase) from 1 (none documented) to 5 (fully documented and current). What\u2019s your average?" },
      { n:"2", t:"Write the Vision section",        min:"8 min",
        d:"Write the \u201CProduct Vision\u201D section of your PRODUCT.md. One paragraph: what does this system exist to do, for whom, and why does it matter? Swap with a neighbour \u2014 does it tell them enough to make a sensible architecture decision?" },
      { n:"3", t:"Map the Users and Business",      min:"8 min",
        d:"Write the Users and Business Context sections. Include: the top 3 user personas, their jobs-to-be-done, your north star metric, and the cost of a major quality failure. These go into the agent\u2019s context." },
      { n:"4", t:"Identify hotspots and non-negotiables", min:"7 min",
        d:"Use your knowledge of the codebase to identify: (a) the 3 files or modules most likely to cause problems, and (b) the 3 non-negotiable quality or architecture constraints. Add both to PRODUCT.md." },
      { n:"5", t:"Test the agent with your document", min:"8 min",
        d:"Open Claude Code. Load your PRODUCT.md. Ask it to propose an approach to a real upcoming feature. Does it make better decisions with the context? What\u2019s still missing from the document?" },
      { n:"6", t:"Design your hygiene cadence",    min:"4 min",
        d:"Choose one daily, one weekly, and one sprint-cadence hygiene practice to implement. For each: what agent workflow enables it? Who owns reviewing the output?" },
    ];
    steps.forEach((st, i) => {
      const y = 1.52 + i * 0.68;
      s.addShape(pres.shapes.RECTANGLE, { x:0.35, y, w:9.3, h:0.62, fill:{ color:C.offWhite }, shadow:shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x:0.35, y, w:0.52, h:0.62, fill:{ color:C.teal } });
      s.addText(st.n, { x:0.35, y, w:0.52, h:0.62, fontSize:18, color:C.white, bold:true, align:"center", valign:"middle", margin:0 });
      s.addText(st.t, { x:0.97, y:y+0.04, w:2.5, h:0.26, fontSize:12, color:C.teal, bold:true, margin:0 });
      s.addText(`(${st.min})`, { x:3.47, y:y+0.04, w:0.85, h:0.26, fontSize:11, color:C.muted, italic:true, margin:0 });
      s.addText(st.d, { x:0.97, y:y+0.32, w:8.55, h:0.26, fontSize:10.5, color:C.muted, margin:0 });
    });
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 12 — Discussion + Summary
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color:C.navy };

    s.addShape(pres.shapes.RECTANGLE, { x:9.82, y:0, w:0.18, h:5.625, fill:{ color:C.accent } });
    s.addText("DISCUSSION + MODULE SUMMARY", { x:0.4, y:0.22, w:9, h:0.45, fontSize:13, color:C.iceBlue, bold:true, charSpacing:3, margin:0 });

    s.addShape(pres.shapes.RECTANGLE, { x:0.35, y:0.82, w:5.5, h:3.82, fill:{ color:C.mid, transparency:20 }, shadow:shadow() });
    s.addShape(pres.shapes.RECTANGLE, { x:0.35, y:0.82, w:5.5, h:0.48, fill:{ color:C.iceBlue, transparency:15 } });
    s.addText("DISCUSSION QUESTIONS", { x:0.35, y:0.82, w:5.5, h:0.48, fontSize:11, color:C.white, bold:true, charSpacing:2, align:"center", valign:"middle", margin:0 });
    const qs = [
      "Q1.  Does your team currently operate as a product team or a project team? What would have to change?",
      "Q2.  If a new developer joined today, how long would it take them to understand the product well enough to guide an agent safely?",
      "Q3.  What\u2019s one piece of critical product context that lives only in one person\u2019s head? What\u2019s the risk?",
      "Q4.  Which hygiene practice, if automated by an agent today, would have the biggest positive impact on your codebase?",
    ];
    s.addText(qs.join("\n\n"), { x:0.5, y:1.4, w:5.1, h:3.1, fontSize:11.5, color:C.pale, margin:0 });

    s.addShape(pres.shapes.RECTANGLE, { x:6.05, y:0.82, w:3.6, h:3.82, fill:{ color:C.mid, transparency:20 }, shadow:shadow() });
    s.addShape(pres.shapes.RECTANGLE, { x:6.05, y:0.82, w:3.6, h:0.48, fill:{ color:C.accent, transparency:10 } });
    s.addText("KEY TAKEAWAYS", { x:6.05, y:0.82, w:3.6, h:0.48, fontSize:11, color:C.white, bold:true, charSpacing:2, align:"center", valign:"middle", margin:0 });
    const tks = [
      "\u00B7 Product \u2260 project. Mindset matters.",
      "\u00B7 Agents build what the team understands",
      "\u00B7 PRODUCT.md is context for humans AND agents",
      "\u00B7 Developers are now product guides, not ticket closers",
      "\u00B7 Shared understanding is a team practice, not a doc",
      "\u00B7 Hygiene must be a cadence, not a cleanup sprint",
      "\u00B7 Speed + understanding = competitive advantage",
    ];
    s.addText(tks.join("\n\n"), { x:6.2, y:1.4, w:3.35, h:3.1, fontSize:11.5, color:C.pale, margin:0 });

    s.addShape(pres.shapes.RECTANGLE, { x:0.35, y:4.75, w:9.3, h:0.62, fill:{ color:C.accent, transparency:18 } });
    s.addText("NEXT  \u00B7  Module 12: [Your second topic] \u2014 Tell me the theme and we\u2019ll build it next", {
      x:0.35, y:4.75, w:9.3, h:0.62, fontSize:11.5, color:C.white, bold:true, align:"center", valign:"middle", margin:0
    });
  }

  await pres.writeFile({ fileName:"Module_11_Product_First.pptx" });
  console.log("\u2705 Module 11 written");
}

build().catch(console.error);
