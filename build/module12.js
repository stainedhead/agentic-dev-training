const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const {
  FaUsers, FaUserTie, FaDraftingCompass, FaCogs, FaCodeBranch,
  FaExchangeAlt, FaBalanceScale, FaShieldAlt, FaHandshake,
  FaNetworkWired, FaSyncAlt, FaChartLine, FaClipboardList,
  FaTools, FaCheckDouble, FaLightbulb, FaRoute, FaBullseye,
  FaHeartbeat, FaCompass
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
  // Role colours — distinct but harmonious
  roleA:   "2D6A8A",   // Solution Architect — deep teal-blue
  roleB:   "3A7DC9",   // Spec Engineer — accent blue
  roleC:   "3A7E6E",   // DevOps Guardian — green
  roleOwner:"2E5073",  // Product Owner — mid-navy
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
  pres.title  = "Module 12: The Three-Person Product Team";
  pres.author = "Enterprise Architect Training Series";

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 1 — Title
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color:C.navy };

    s.addShape(pres.shapes.RECTANGLE, { x:0, y:0, w:0.18, h:5.625, fill:{ color:C.accent } });
    s.addText("ENTERPRISE AGENTIC PRACTICES", { x:0.4, y:0.32, w:9.2, h:0.35, fontSize:10, color:C.iceBlue, bold:true, charSpacing:4, margin:0 });

    s.addShape(pres.shapes.RECTANGLE, { x:0.4, y:0.82, w:1.5, h:0.38, fill:{ color:C.accent } });
    s.addText("MODULE 12", { x:0.4, y:0.82, w:1.5, h:0.38, fontSize:11, color:C.white, bold:true, align:"center", valign:"middle", margin:0 });

    s.addText("The Three-Person\nProduct Team", { x:0.4, y:1.35, w:7.0, h:1.75, fontSize:46, color:C.white, bold:true, margin:0 });
    s.addText("Equal partners, rotating roles, shared ownership — the agentic team model", { x:0.4, y:3.18, w:7.2, h:0.55, fontSize:17, color:C.iceBlue, italic:true, margin:0 });
    s.addShape(pres.shapes.RECTANGLE, { x:0.4, y:3.88, w:3.5, h:0.04, fill:{ color:C.accent } });
    s.addText([
      { text:"Duration: ", options:{ bold:true, color:C.muted } },
      { text:"75 min  ", options:{ color:C.muted } },
      { text:"  |  Level: ", options:{ color:C.muted } },
      { text:"Advanced", options:{ bold:true, color:C.muted } }
    ], { x:0.4, y:4.08, w:5, h:0.38, fontSize:13, margin:0 });

    // Right: equilateral triangle of equals
    const cx = 8.45, cy = 2.9;

    // Triangle connecting lines
    const pts = [
      { x:cx,       y:cy-1.55 },   // top: Architect
      { x:cx-1.35,  y:cy+0.78 },   // bottom-left: Spec
      { x:cx+1.35,  y:cy+0.78 },   // bottom-right: DevOps
    ];
    // Draw three connecting lines
    [[0,1],[1,2],[2,0]].forEach(([a,b]) => {
      s.addShape(pres.shapes.LINE, {
        x:pts[a].x, y:pts[a].y+0.28,
        w:pts[b].x-pts[a].x, h:pts[b].y-pts[a].y,
        line:{ color:C.iceBlue, width:1.5, dashType:"dash" }
      });
    });

    // Node circles and labels
    const nodes = [
      { label:"Solution\nArchitect", color:C.roleA, ...pts[0] },
      { label:"Spec\nEngineer",      color:C.roleB, ...pts[1] },
      { label:"DevOps\nGuardian",    color:C.roleC, ...pts[2] },
    ];
    nodes.forEach(n => {
      s.addShape(pres.shapes.OVAL, { x:n.x-0.52, y:n.y-0.1, w:1.04, h:0.84, fill:{ color:n.color }, shadow:shadow() });
      s.addText(n.label, { x:n.x-0.52, y:n.y-0.08, w:1.04, h:0.8, fontSize:10, color:C.white, bold:true, align:"center", valign:"middle", margin:0 });
    });

    // Center: Product Owner
    s.addShape(pres.shapes.OVAL, { x:cx-0.52, y:cy-0.3, w:1.04, h:0.72, fill:{ color:C.roleOwner, transparency:20 } });
    s.addText("Product\nOwner", { x:cx-0.52, y:cy-0.28, w:1.04, h:0.68, fontSize:9.5, color:C.pale, align:"center", valign:"middle", margin:0 });

    s.addText("All Roles Equal  \u00B7  All Roles Shared  \u00B7  All Roles Rotating", {
      x:6.9, y:4.55, w:2.7, h:0.36, fontSize:9, color:C.muted, align:"center", italic:true, margin:0
    });
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
      { icon:FaUsers,       color:C.accent,    title:"Understand the Team Model",          body:"Explain why three equals with rotating roles is the optimal unit for agentic product delivery — and why it avoids the failure modes of traditional team structures." },
      { icon:FaDraftingCompass, color:C.roleA, title:"Execute Each Role with Excellence",  body:"Describe the scope, responsibilities, and agent-collaboration patterns for Solution Architect, Spec Engineer, and DevOps Guardian." },
      { icon:FaExchangeAlt, color:C.roleB,     title:"Operate Role Rotation Effectively",  body:"Design a rotation schedule that builds shared understanding, prevents knowledge silos, and maintains continuity during transitions." },
      { icon:FaNetworkWired,color:C.roleC,     title:"Navigate System Collaboration",      body:"Manage dependency teams, avoid local optimizations that harm the wider system, and advocate for NFR health and technical debt prevention." },
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
  // SLIDE 3 — Why Three? The Communication Advantage
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color:C.navy };

    s.addText("WHY THREE?  THE COMMUNICATION ADVANTAGE", { x:0.4, y:0.22, w:9, h:0.45, fontSize:13, color:C.iceBlue, bold:true, charSpacing:3, margin:0 });
    s.addText("Team size is not arbitrary. Three is the minimum that covers all roles and the maximum that avoids communication overhead.", { x:0.4, y:0.72, w:9, h:0.36, fontSize:14, color:C.white, italic:true, margin:0 });

    // Communication links formula
    s.addShape(pres.shapes.RECTANGLE, { x:0.35, y:1.22, w:9.3, h:1.28, fill:{ color:C.mid, transparency:18 }, shadow:shadow() });
    s.addText("Communication paths = n(n\u22121) \u00F7 2", {
      x:0.55, y:1.3, w:4.5, h:0.45, fontSize:20, color:C.accent, bold:true, fontFace:"Consolas", margin:0
    });
    const teamSizes = [
      { n:3, paths:3, label:"3 people" },
      { n:5, paths:10, label:"5 people" },
      { n:7, paths:21, label:"7 people" },
      { n:10, paths:45, label:"10 people" },
    ];
    teamSizes.forEach((t,i) => {
      const x = 5.15 + i*1.12;
      s.addShape(pres.shapes.RECTANGLE, { x, y:1.3, w:1.0, h:0.42, fill:{ color:i===0?C.accent:C.mid } });
      s.addText(t.label, { x, y:1.3, w:1.0, h:0.22, fontSize:9.5, color:C.white, align:"center", bold:i===0, margin:0 });
      s.addText(`${t.paths} paths`, { x, y:1.52, w:1.0, h:0.2, fontSize:9, color:i===0?C.white:C.muted, align:"center", margin:0 });
    });

    const reasons = [
      {
        head: "All key roles covered at all times",
        color: C.accent,
        body: "Three roles \u2014 Architect, Spec Engineer, DevOps Guardian \u2014 map to the three phases of product evolution: intent, implementation, operation. A team of three never has a gap. A team of two always does."
      },
      {
        head: "No coordination tax",
        color: C.teal,
        body: "Three people: 3 communication paths, minimal meeting overhead, no organizational politics, no consensus-building paralysis. Every person can hold the full team\u2019s state in their head at once."
      },
      {
        head: "Complete accountability",
        color: C.green,
        body: "With three equals, there is no hiding. Everyone is accountable for every aspect of the product. No silos, no \u2018that\u2019s not my area\u2019, no knowledge single points of failure."
      },
      {
        head: "Agents multiply three people\u2019s output",
        color: C.steel,
        body: "A three-person team with agents can match the feature output of a 10-person team without agents \u2014 while maintaining the communication simplicity of three. The leverage comes from the agents, not the headcount."
      },
    ];

    const cols = [0.35, 5.1];
    reasons.forEach((r,i) => {
      const x=cols[i%2], y=2.68+Math.floor(i/2)*1.45, w=4.55, h=1.32;
      s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill:{ color:C.mid, transparency:18 }, shadow:shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y, w:0.06, h, fill:{ color:r.color } });
      s.addText(r.head, { x:x+0.16, y:y+0.1, w:w-0.24, h:0.32, fontSize:13, color:r.color, bold:true, margin:0 });
      s.addText(r.body, { x:x+0.16, y:y+0.48, w:w-0.24, h:0.76, fontSize:11, color:C.pale, margin:0 });
    });
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 4 — The Three Roles
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color:C.white };

    s.addShape(pres.shapes.RECTANGLE, { x:0, y:0, w:10, h:0.82, fill:{ color:C.navy } });
    s.addText("THE THREE ROLES  \u2014  SCOPE & RESPONSIBILITIES", { x:0.4, y:0, w:9, h:0.82, fontSize:13, color:C.white, bold:true, charSpacing:3, valign:"middle", margin:0 });
    s.addText("These are roles, not job titles. Every team member holds all three roles over time. Every team member is responsible for everything.", { x:0.4, y:0.9, w:9.2, h:0.3, fontSize:12, color:C.muted, italic:true, margin:0 });

    const roles = [
      {
        label:"Solution Architect",
        color: C.roleA,
        icon: FaDraftingCompass,
        tagline: "Develops, reviews, and approves the PRD",
        scope: [
          "Deeply understands the product, users, and business context",
          "Translates business needs into Product Requirements Documents",
          "Reviews and approves specs for architectural alignment",
          "Owns the PRODUCT.md and Architecture Decision Records",
          "Represents product intent in cross-team collaboration",
          "Guards against architectural drift and system-level conflicts",
        ],
        agents: "Uses agents to research domain context, draft PRD sections, check for conflicts with existing ADRs, and generate architectural options."
      },
      {
        label:"Spec Engineer",
        color: C.roleB,
        icon: FaClipboardList,
        tagline: "Transforms PRDs into executable specifications",
        scope: [
          "Takes approved PRDs and produces complete SDD artifacts",
          "Writes requirements.md, plan.md, tasks.md, test specs",
          "Orchestrates agentic teams for code, tests, and documentation",
          "Verifies agent output against acceptance criteria",
          "Ensures implementation matches intent throughout delivery",
          "Captures learnings as ADRs and updates PRODUCT.md",
        ],
        agents: "Orchestrates multi-agent delivery pipelines: spec \u2192 plan \u2192 implementation \u2192 tests \u2192 documentation. Reviews all agent PRs before merge."
      },
      {
        label:"DevOps Guardian",
        color: C.roleC,
        icon: FaShieldAlt,
        tagline: "Owns environments, operations, and code health",
        scope: [
          "Manages CI/CD pipelines, deployment infrastructure, and tooling",
          "Conducts code and design reviews on all merged changes",
          "Runs hygiene cadence: dependency updates, security scans, coverage",
          "Manages build and deployment tooling including agent tools",
          "Handles production issues, user support, and incident response",
          "Monitors NFR health: performance, reliability, security, cost",
        ],
        agents: "Uses agents for automated hygiene, monitoring, tooling, and scheduled CI tasks. Reviews agent tool quality and infrastructure as code."
      },
    ];

    for (let i=0; i<3; i++) {
      const r=roles[i], x=0.35+i*3.15, y=1.28;
      const ic = await icon(r.icon, "#FFFFFF");
      s.addShape(pres.shapes.RECTANGLE, { x, y, w:2.95, h:4.1, fill:{ color:C.offWhite }, shadow:shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y, w:2.95, h:0.72, fill:{ color:r.color } });
      s.addImage({ data:ic, x:x+0.16, y:y+0.14, w:0.4, h:0.4 });
      s.addText(r.label, { x:x+0.65, y:y+0.08, w:2.22, h:0.34, fontSize:13, color:C.white, bold:true, valign:"middle", margin:0 });
      s.addText(r.tagline, { x:x+0.65, y:y+0.44, w:2.22, h:0.26, fontSize:9.5, color:C.pale, italic:true, margin:0 });

      r.scope.forEach((item,j) => {
        s.addText(`\u2022 ${item}`, { x:x+0.14, y:y+0.82+j*0.46, w:2.68, h:0.42, fontSize:10.5, color:C.text, margin:0 });
      });

      s.addShape(pres.shapes.RECTANGLE, { x:x+0.1, y:y+3.54, w:2.75, h:0.46, fill:{ color:r.color, transparency:88 } });
      s.addText(`Agent: ${r.agents}`, { x:x+0.14, y:y+3.56, w:2.68, h:0.42, fontSize:8.5, color:r.color, italic:true, margin:0 });
    }
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 5 — Equal Peers, Rotating Roles
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color:C.navy };

    s.addText("EQUAL PEERS  \u2014  ROTATING ROLES", { x:0.4, y:0.22, w:9, h:0.45, fontSize:13, color:C.iceBlue, bold:true, charSpacing:3, margin:0 });
    s.addText("The role is temporary. The responsibility is permanent. Every team member owns everything, always.", { x:0.4, y:0.72, w:9, h:0.36, fontSize:15, color:C.white, italic:true, margin:0 });

    // Rotation diagram
    const teamMembers = ["Alex", "Jordan", "Sam"];
    const roleNames    = ["Solution Architect", "Spec Engineer", "DevOps Guardian"];
    const roleColors   = [C.roleA, C.roleB, C.roleC];

    // Quarter grid
    const quarters = ["Q1", "Q2", "Q3", "Q4"];
    // Rotation pattern: each person cycles through all three roles
    const rotation = [
      [0, 1, 2, 0],  // Alex: Arch, Spec, DevOps, Arch
      [1, 2, 0, 1],  // Jordan: Spec, DevOps, Arch, Spec
      [2, 0, 1, 2],  // Sam: DevOps, Arch, Spec, DevOps
    ];

    // Header row
    s.addShape(pres.shapes.RECTANGLE, { x:0.35, y:1.22, w:2.0, h:0.42, fill:{ color:C.mid } });
    s.addText("TEAM MEMBER", { x:0.35, y:1.22, w:2.0, h:0.42, fontSize:10, color:C.iceBlue, bold:true, charSpacing:2, align:"center", valign:"middle", margin:0 });
    quarters.forEach((q,i) => {
      s.addShape(pres.shapes.RECTANGLE, { x:2.45+i*1.88, y:1.22, w:1.78, h:0.42, fill:{ color:C.mid } });
      s.addText(q, { x:2.45+i*1.88, y:1.22, w:1.78, h:0.42, fontSize:13, color:C.white, bold:true, align:"center", valign:"middle", margin:0 });
    });

    teamMembers.forEach((name,ri) => {
      const y = 1.7+ri*0.78;
      s.addShape(pres.shapes.RECTANGLE, { x:0.35, y, w:2.0, h:0.68, fill:{ color:C.mid, transparency:20 } });
      s.addText(name, { x:0.35, y, w:2.0, h:0.68, fontSize:14, color:C.white, bold:true, align:"center", valign:"middle", margin:0 });
      rotation[ri].forEach((roleIdx,qi) => {
        const x = 2.45+qi*1.88;
        s.addShape(pres.shapes.RECTANGLE, { x, y, w:1.78, h:0.68, fill:{ color:roleColors[roleIdx], transparency:15 } });
        s.addText(roleNames[roleIdx], { x, y, w:1.78, h:0.68, fontSize:10.5, color:C.white, bold:true, align:"center", valign:"middle", margin:0 });
      });
    });

    // Legend
    roleColors.forEach((c,i) => {
      s.addShape(pres.shapes.RECTANGLE, { x:0.35+i*3.15, y:3.14, w:2.95, h:0.26, fill:{ color:c } });
      s.addText(roleNames[i], { x:0.35+i*3.15, y:3.14, w:2.95, h:0.26, fontSize:10.5, color:C.white, bold:true, align:"center", valign:"middle", margin:0 });
    });

    // Why rotation matters
    const whys = [
      { head:"Eliminates knowledge silos",      color:C.accent, body:"Every team member knows every part of the system. No single points of failure. No \u2018only Alex knows how that works\u2019." },
      { head:"Builds empathy across roles",      color:C.teal,   body:"A developer who has worked as DevOps Guardian writes more deployable code. A Spec Engineer who has done Architecture writes better specs." },
      { head:"Maintains full accountability",   color:C.green,  body:"When you know you\u2019ll be the DevOps Guardian next quarter, you write code you\u2019d want to deploy and maintain. Incentives align." },
      { head:"Resilience and continuity",        color:C.steel,  body:"The team functions identically if one member is absent. No critical path through a single person. No bus factor greater than one." },
    ];

    const cols=[0.35,5.1];
    whys.forEach((w,i) => {
      const x=cols[i%2], y=3.52+Math.floor(i/2)*0.98, wd=4.55, h=0.88;
      s.addShape(pres.shapes.RECTANGLE, { x, y, w:wd, h, fill:{ color:C.mid, transparency:18 } });
      s.addShape(pres.shapes.RECTANGLE, { x, y, w:0.06, h, fill:{ color:w.color } });
      s.addText(w.head, { x:x+0.16, y:y+0.08, w:wd-0.24, h:0.28, fontSize:12, color:w.color, bold:true, margin:0 });
      s.addText(w.body, { x:x+0.16, y:y+0.4, w:wd-0.24, h:0.42, fontSize:11, color:C.pale, margin:0 });
    });
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 6 — The Product Owner Relationship
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color:C.white };

    s.addShape(pres.shapes.RECTANGLE, { x:0, y:0, w:10, h:0.82, fill:{ color:C.navy } });
    s.addText("THE PRODUCT OWNER RELATIONSHIP", { x:0.4, y:0, w:9, h:0.82, fontSize:13, color:C.white, bold:true, charSpacing:3, valign:"middle", margin:0 });
    s.addText("The Product Owner provides direction and priority. The team provides expertise, capability, and long-term product health advocacy.", { x:0.4, y:0.9, w:9.2, h:0.3, fontSize:12, color:C.muted, italic:true, margin:0 });

    // PO responsibilities
    s.addShape(pres.shapes.RECTANGLE, { x:0.35, y:1.28, w:4.55, h:4.1, fill:{ color:C.offWhite }, shadow:shadow() });
    s.addShape(pres.shapes.RECTANGLE, { x:0.35, y:1.28, w:4.55, h:0.46, fill:{ color:C.roleOwner } });
    s.addText("PRODUCT OWNER  \u2014  RESPONSIBILITIES", { x:0.35, y:1.28, w:4.55, h:0.46, fontSize:11, color:C.white, bold:true, charSpacing:1.5, align:"center", valign:"middle", margin:0 });
    const poResp = [
      { head:"Business priority",   body:"Owns the product roadmap. Defines what to build next and why. Balances business requests with team input." },
      { head:"Stakeholder bridge",  body:"Represents external business stakeholders, users, and customers. Translates business language into product intent." },
      { head:"PRD collaboration",   body:"Works with the Solution Architect to develop and refine PRDs. Approves PRDs before they advance to specification." },
      { head:"Capacity allocation", body:"Allocates team capacity across features, hygiene, NFR investment, and technical debt prevention." },
      { head:"One-to-many",         body:"One Product Owner may own multiple products, each served by its own three-person team. Teams collaborate on shared dependencies." },
    ];
    poResp.forEach((r,i) => {
      const y = 1.84+i*0.68;
      s.addShape(pres.shapes.RECTANGLE, { x:0.47, y, w:4.3, h:0.6, fill:{ color:i%2===0?C.white:C.offWhite } });
      s.addShape(pres.shapes.RECTANGLE, { x:0.47, y, w:0.06, h:0.6, fill:{ color:C.roleOwner } });
      s.addText(r.head, { x:0.62, y:y+0.05, w:1.5, h:0.26, fontSize:12, color:C.navy, bold:true, margin:0 });
      s.addText(r.body, { x:0.62, y:y+0.32, w:4.05, h:0.24, fontSize:10.5, color:C.muted, margin:0 });
    });

    // Team advocacy
    s.addShape(pres.shapes.RECTANGLE, { x:5.1, y:1.28, w:4.55, h:4.1, fill:{ color:C.offWhite }, shadow:shadow() });
    s.addShape(pres.shapes.RECTANGLE, { x:5.1, y:1.28, w:4.55, h:0.46, fill:{ color:C.accent } });
    s.addText("TEAM  \u2014  NFR & HEALTH ADVOCACY", { x:5.1, y:1.28, w:4.55, h:0.46, fontSize:11, color:C.white, bold:true, charSpacing:1.5, align:"center", valign:"middle", margin:0 });

    const nfrs = [
      { nfr:"Performance",   desc:"Advocate for performance budgets. Flag when velocity is being prioritized at the cost of system responsiveness." },
      { nfr:"Reliability",   desc:"Push back on feature volume when test coverage, error handling, or observability is below standard." },
      { nfr:"Security",      desc:"Surface security debt before it becomes a breach. Demand time for OWASP checklist maintenance." },
      { nfr:"Maintainability", desc:"Flag when code complexity is growing unsustainably. Advocate for refactoring as first-class delivery." },
      { nfr:"Technical Debt", desc:"Quantify tech debt in business terms. Present the cost of not addressing it alongside the cost of features." },
    ];
    nfrs.forEach((n,i) => {
      const y = 1.84+i*0.68;
      s.addShape(pres.shapes.RECTANGLE, { x:5.22, y, w:4.3, h:0.6, fill:{ color:i%2===0?C.white:C.offWhite } });
      s.addShape(pres.shapes.RECTANGLE, { x:5.22, y, w:0.06, h:0.6, fill:{ color:C.accent } });
      s.addText(n.nfr, { x:5.38, y:y+0.05, w:1.3, h:0.26, fontSize:12, color:C.navy, bold:true, margin:0 });
      s.addText(n.desc, { x:5.38, y:y+0.32, w:3.88, h:0.24, fontSize:10.5, color:C.muted, margin:0 });
    });
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 7 — The Full Delivery Flow
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color:C.offWhite };

    s.addShape(pres.shapes.RECTANGLE, { x:0, y:0, w:10, h:0.82, fill:{ color:C.teal } });
    s.addText("THE FULL DELIVERY FLOW", { x:0.4, y:0, w:9, h:0.82, fontSize:13, color:C.white, bold:true, charSpacing:3, valign:"middle", margin:0 });
    s.addText("From business need to deployed software \u2014 how the three roles and the Product Owner collaborate in practice", { x:0.4, y:0.9, w:9.2, h:0.3, fontSize:12, color:C.muted, italic:true, margin:0 });

    const flow = [
      { n:"01", who:"Product Owner", role:"Business Need", color:C.roleOwner,
        what:"Identifies a business need or opportunity. Brings it to the team with context: users affected, business value, urgency, and any known constraints." },
      { n:"02", who:"Solution Architect", role:"PRD Development", color:C.roleA,
        what:"Works with PO to develop the PRD. Deep-dives on user needs, system constraints, architectural implications. Validates against PRODUCT.md and ADRs." },
      { n:"03", who:"Product Owner +\nSolution Architect", role:"PRD Approval", color:C.roleOwner,
        what:"PRD reviewed jointly. PO approves business intent. Architect approves architectural soundness. No spec starts without a signed-off PRD." },
      { n:"04", who:"Spec Engineer", role:"Specification", color:C.roleB,
        what:"Transforms PRD into: requirements.md, plan.md, tasks.md, test specs, acceptance criteria, arch-decisions. Runs research phase with agents." },
      { n:"05", who:"Spec Engineer +\nAgent Teams", role:"Implementation", color:C.roleB,
        what:"Orchestrates agentic delivery: code, tests, documentation, migration scripts. Verifier and Judge loops ensure quality. Reviews all agent PRs." },
      { n:"06", who:"DevOps Guardian", role:"Review & Deploy", color:C.roleC,
        what:"Code review, design review, CI/CD pipeline, deployment. Monitors post-deploy metrics. Updates runbooks and dependency documentation." },
      { n:"07", who:"Whole Team", role:"Retrospective + Capture", color:C.navy,
        what:"ADRs updated. PRODUCT.md refreshed. Hygiene actions identified. Learnings fed back into next PRD cycle. System collaboration updated." },
    ];

    flow.forEach((f, i) => {
      const col = i < 4 ? 0 : 1;
      const row = i < 4 ? i : i-4;
      const x = col===0 ? 0.35 : 5.22, y = 1.28+row*1.08, w = col===0 ? 4.72 : 4.43;

      if (i === 4) {
        // start second column at row 0
      }

      s.addShape(pres.shapes.RECTANGLE, { x, y, w, h:0.96, fill:{ color:C.white }, shadow:shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y, w:0.46, h:0.96, fill:{ color:f.color } });
      s.addText(f.n, { x, y, w:0.46, h:0.46, fontSize:14, color:C.white, bold:true, align:"center", valign:"middle", margin:0 });
      s.addText(f.role, { x, y:y+0.48, w:0.46, h:0.46, fontSize:8.5, color:C.pale, align:"center", valign:"middle", margin:0 });
      s.addText(f.who, { x:x+0.56, y:y+0.04, w:w-0.66, h:0.28, fontSize:10.5, color:f.color, bold:true, margin:0 });
      s.addText(f.what, { x:x+0.56, y:y+0.36, w:w-0.66, h:0.56, fontSize:10.5, color:C.text, margin:0 });
    });
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 8 — System Collaboration & Avoiding Local Optimization
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color:C.white };

    s.addShape(pres.shapes.RECTANGLE, { x:0, y:0, w:10, h:0.82, fill:{ color:C.navy } });
    s.addText("SYSTEM COLLABORATION  \u2014  NO LOCAL OPTIMISATION", { x:0.4, y:0, w:9, h:0.82, fontSize:13, color:C.white, bold:true, charSpacing:3, valign:"middle", margin:0 });
    s.addText("A product team that optimizes only for its own product will eventually damage the wider system it operates within.", { x:0.4, y:0.9, w:9.2, h:0.3, fontSize:12, color:C.muted, italic:true, margin:0 });

    // System diagram
    s.addShape(pres.shapes.OVAL, { x:3.6, y:1.2, w:2.8, h:2.1, fill:{ color:C.pale }, shadow:shadow() });
    s.addText("Your\nProduct Team", { x:3.6, y:1.55, w:2.8, h:0.75, fontSize:12, color:C.navy, bold:true, align:"center", margin:0 });

    const depTeams = [
      { label:"Platform\nTeam",     x:0.35, y:1.55, angle:"right" },
      { label:"Shared\nServices",   x:7.3,  y:1.55, angle:"left" },
      { label:"Consumer\nTeams",    x:3.7,  y:4.05, angle:"up" },
      { label:"Dependency\nProducts",x:0.35, y:3.85, angle:"right" },
    ];
    depTeams.forEach(d => {
      s.addShape(pres.shapes.RECTANGLE, { x:d.x, y:d.y, w:2.0, h:0.72, fill:{ color:C.offWhite }, shadow:shadow() });
      s.addText(d.label, { x:d.x, y:d.y, w:2.0, h:0.72, fontSize:11, color:C.navy, bold:true, align:"center", valign:"middle", margin:0 });
    });

    // Collaboration principles
    const principles = [
      { head:"API contracts before implementation",
        body:"Agree on interfaces with dependency teams before writing a line of code. Breaking changes need upstream coordination, not last-minute surprises." },
      { head:"Share your roadmap, learn theirs",
        body:"Regular syncs with dependency and consumer teams. Your quarterly roadmap context helps them plan. Theirs reveals conflicts early." },
      { head:"Platform over duplication",
        body:"Before building capability, check whether the platform team or a shared service already provides it. Local duplicates fragment the system." },
      { head:"NFRs are system-wide, not local",
        body:"A performance optimization that creates a bottleneck for consumer teams is not an optimization. Measure impact at the system level." },
    ];

    principles.forEach((p,i) => {
      const col=i%2, row=Math.floor(i/2);
      const x=col===0?0.35:5.1, y=3.38+row*1.08, w=4.55, h=0.96;
      s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill:{ color:C.offWhite }, shadow:shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y, w:0.06, h, fill:{ color:C.accent } });
      s.addText(p.head, { x:x+0.16, y:y+0.08, w:w-0.24, h:0.3, fontSize:12, color:C.navy, bold:true, margin:0 });
      s.addText(p.body, { x:x+0.16, y:y+0.44, w:w-0.24, h:0.46, fontSize:11, color:C.muted, margin:0 });
    });
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 9 — Technical Debt Prevention & NFR Advocacy
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color:C.navy };

    s.addText("TECHNICAL DEBT PREVENTION  &  NFR ADVOCACY", { x:0.4, y:0.22, w:9, h:0.45, fontSize:13, color:C.iceBlue, bold:true, charSpacing:3, margin:0 });
    s.addText("Legacy teams suffered technical debt because no one was empowered to say no. This team is.", { x:0.4, y:0.72, w:9, h:0.36, fontSize:15, color:C.white, italic:true, margin:0 });

    // The debt conversation
    s.addShape(pres.shapes.RECTANGLE, { x:0.35, y:1.22, w:9.3, h:1.28, fill:{ color:C.mid, transparency:18 }, shadow:shadow() });
    s.addText("HOW TO ADVOCATE FOR NFR INVESTMENT  \u2014  THE BUSINESS LANGUAGE", {
      x:0.45, y:1.25, w:9.1, h:0.32, fontSize:11, color:C.iceBlue, bold:true, charSpacing:2, margin:0
    });
    const debtFrames = [
      { label:"Frame as risk", desc:"This service has no circuit breaker. One downstream failure causes a cascade. That\u2019s a P1 incident waiting to happen. Estimated cost: $X." },
      { label:"Frame as velocity tax", desc:"Our test coverage is at 48%. Every feature change requires 3 days of manual regression testing. We\u2019re paying 30% of our velocity on insurance we never collected." },
      { label:"Frame as opportunity cost", desc:"We can\u2019t take on this new feature in Q3 because the data model can\u2019t support it safely. We need one sprint to address the design constraint first." },
    ];
    debtFrames.forEach((df,i) => {
      s.addShape(pres.shapes.RECTANGLE, { x:0.45+i*3.0, y:1.6, w:2.88, h:0.8, fill:{ color:i===0?C.red:i===1?C.amber:C.teal, transparency:20 } });
      s.addText(df.label, { x:0.48+i*3.0, y:1.63, w:2.82, h:0.22, fontSize:10.5, color:C.white, bold:true, margin:0 });
      s.addText(df.desc, { x:0.48+i*3.0, y:1.86, w:2.82, h:0.5, fontSize:9.5, color:C.pale, margin:0 });
    });

    // Structural protections
    const protections = [
      { head:"Capacity allocation floor",  color:C.accent, body:"Negotiate a standing allocation with the PO: minimum 20% of sprint capacity for hygiene, NFR improvement, and technical debt reduction. Non-negotiable." },
      { head:"Quality contract",           color:C.teal,   body:"Written, team-agreed standards: test coverage floor, performance budgets, security checklist, complexity limits. Posted. Enforced. Reviewed quarterly." },
      { head:"Debt quantification",        color:C.green,  body:"Track tech debt as a metric alongside velocity and quality. Present the \u2018debt compound interest\u2019 curve to POs: debt left unaddressed costs more to fix every quarter." },
      { head:"NFR as acceptance criteria", color:C.steel,  body:"Every PRD includes NFR acceptance criteria: \u201CThis feature must not degrade p95 latency by more than 10ms\u201D. Non-functional becomes non-negotiable." },
      { head:"Rotation builds advocates",  color:C.accent, body:"A team member who has done DevOps Guardian knows exactly how painful bad code is to operate. Rotation creates NFR advocates naturally, not through policy." },
      { head:"Agent hygiene cadence",      color:C.teal,   body:"Automate the hygiene cadence from Module 11. Agents run daily/weekly/sprint health checks. Humans review results. Trend data goes to PO as evidence." },
    ];

    for (let i=0; i<6; i++) {
      const col=i%2, row=Math.floor(i/2);
      const x=col===0?0.35:5.15, y=2.65+row*0.94, w=4.6, h=0.82;
      const p=protections[i];
      s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill:{ color:C.mid, transparency:18 } });
      s.addShape(pres.shapes.RECTANGLE, { x, y, w:0.06, h, fill:{ color:p.color } });
      s.addText(p.head, { x:x+0.16, y:y+0.06, w:w-0.24, h:0.26, fontSize:12, color:p.color, bold:true, margin:0 });
      s.addText(p.body, { x:x+0.16, y:y+0.36, w:w-0.24, h:0.4, fontSize:10.5, color:C.pale, margin:0 });
    }
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 10 — Team Operating Principles
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color:C.offWhite };

    s.addShape(pres.shapes.RECTANGLE, { x:0, y:0, w:10, h:0.82, fill:{ color:C.navy } });
    s.addText("TEAM OPERATING PRINCIPLES", { x:0.4, y:0, w:9, h:0.82, fontSize:13, color:C.white, bold:true, charSpacing:3, valign:"middle", margin:0 });
    s.addText("The agreements that make three equals more effective than ten in a hierarchy", { x:0.4, y:0.9, w:9.2, h:0.3, fontSize:12, color:C.muted, italic:true, margin:0 });

    const principles = [
      { n:"P1", head:"All members review all changes", color:C.accent,
        body:"No change merges without at least one other team member\u2019s review. Not for bureaucracy \u2014 for shared understanding. The reviewer learns as much as the author." },
      { n:"P2", head:"Role holder is a servant to the role", color:C.teal,
        body:"The Spec Engineer for this sprint doesn\u2019t own specs forever. They serve the role, complete the work, and hand it over cleanly. No ego in the role." },
      { n:"P3", head:"The product\u2019s health is always team business", color:C.green,
        body:"Any team member can raise a product health concern regardless of their current role. Health is not the DevOps Guardian\u2019s problem alone." },
      { n:"P4", head:"Context is shared, not siloed", color:C.steel,
        body:"Any insight \u2014 about users, architecture, business, code \u2014 gets written down immediately. In PRODUCT.md, in an ADR, in a NOTES.md. It\u2019s not yours, it\u2019s the team\u2019s." },
      { n:"P5", head:"Velocity is a team metric, not individual", color:C.accent,
        body:"No one tracks individual story points or output. The team ships together. One person stuck on a hard problem means everyone helps. Features belong to the team, not to the ticket author." },
      { n:"P6", head:"Agents are team tools, not individual assistants", color:C.teal,
        body:"Agent workflows, CLAUDE.md, Skills, and tools are owned by the whole team. They are maintained as shared infrastructure. No one agent setup belongs to one person." },
    ];

    for (let i=0; i<6; i++) {
      const col=i%2, row=Math.floor(i/2);
      const x=col===0?0.35:5.1, y=1.28+row*1.42, w=4.55, h=1.28;
      const p=principles[i];
      s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill:{ color:C.white }, shadow:shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y, w:0.48, h, fill:{ color:p.color } });
      s.addText(p.n, { x, y, w:0.48, h, fontSize:14, color:C.white, bold:true, align:"center", valign:"middle", margin:0 });
      s.addText(p.head, { x:x+0.58, y:y+0.06, w:w-0.68, h:0.32, fontSize:12, color:C.navy, bold:true, margin:0 });
      s.addText(p.body, { x:x+0.58, y:y+0.44, w:w-0.68, h:0.76, fontSize:11, color:C.muted, margin:0 });
    }
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 11 — Lab Exercise
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color:C.white };

    s.addShape(pres.shapes.RECTANGLE, { x:0, y:0, w:10, h:0.82, fill:{ color:C.teal } });
    s.addText("LAB EXERCISE  \u00B7  45 MINUTES", { x:0.4, y:0, w:9, h:0.82, fontSize:13, color:C.white, bold:true, charSpacing:3, valign:"middle", margin:0 });
    s.addText("Design Your Three-Person Team  \u2014  Real Product, Real Plan", { x:0.4, y:0.95, w:9.2, h:0.46, fontSize:18, color:C.navy, bold:true, margin:0 });

    const steps = [
      { n:"1", t:"Map your current team to the model", min:"7 min",
        d:"Using your real team today: identify which people would fill the three roles. Who is naturally inclined toward each? What gaps or overlaps do you see? What would need to change to operate this model?" },
      { n:"2", t:"Design your rotation schedule",      min:"8 min",
        d:"Design a 6-month rotation schedule for your three-person team. How long per rotation? What does handover look like? What documentation is required before a role transitions? How do you ensure continuity?" },
      { n:"3", t:"Define your NFR floor",              min:"8 min",
        d:"Write the quality contract your team would commit to: minimum test coverage, performance budget, security checklist frequency, complexity limits. These are your non-negotiables. How would you present them to your PO?" },
      { n:"4", t:"Map your system dependencies",       min:"7 min",
        d:"Draw your product\u2019s dependency graph. Which teams do you consume from? Which consume from you? Where are the highest-risk coupling points? What contracts are missing? What collaboration cadence would prevent local optimization?" },
      { n:"5", t:"Draft your tech debt case",          min:"8 min",
        d:"Identify your single largest source of technical debt. Frame it in business language using one of the three frames: risk, velocity tax, or opportunity cost. Present a 1-sprint investment proposal with expected return." },
      { n:"6", t:"Present: what changes this week?",  min:"7 min",
        d:"Each group shares one change they will make to their team\u2019s operating model this week \u2014 not next quarter. What is the smallest concrete step toward the product team model starting Monday?" },
    ];

    steps.forEach((st, i) => {
      const y = 1.52 + i * 0.68;
      s.addShape(pres.shapes.RECTANGLE, { x:0.35, y, w:9.3, h:0.62, fill:{ color:C.offWhite }, shadow:shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x:0.35, y, w:0.52, h:0.62, fill:{ color:C.teal } });
      s.addText(st.n, { x:0.35, y, w:0.52, h:0.62, fontSize:18, color:C.white, bold:true, align:"center", valign:"middle", margin:0 });
      s.addText(st.t, { x:0.97, y:y+0.04, w:2.6, h:0.26, fontSize:12, color:C.teal, bold:true, margin:0 });
      s.addText(`(${st.min})`, { x:3.57, y:y+0.04, w:0.88, h:0.26, fontSize:11, color:C.muted, italic:true, margin:0 });
      s.addText(st.d, { x:0.97, y:y+0.34, w:8.55, h:0.24, fontSize:10.5, color:C.muted, margin:0 });
    });
  }

  // ══════════════════════════════════════════════════════════════════
  // SLIDE 12 — Program Close
  // ══════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color:C.navy };

    s.addShape(pres.shapes.RECTANGLE, { x:9.82, y:0, w:0.18, h:5.625, fill:{ color:C.accent } });
    s.addText("DISCUSSION  +  PROGRAM CLOSE", { x:0.4, y:0.22, w:9, h:0.45, fontSize:13, color:C.iceBlue, bold:true, charSpacing:3, margin:0 });

    s.addShape(pres.shapes.RECTANGLE, { x:0.35, y:0.82, w:5.5, h:2.72, fill:{ color:C.mid, transparency:20 }, shadow:shadow() });
    s.addShape(pres.shapes.RECTANGLE, { x:0.35, y:0.82, w:5.5, h:0.48, fill:{ color:C.iceBlue, transparency:15 } });
    s.addText("DISCUSSION QUESTIONS", { x:0.35, y:0.82, w:5.5, h:0.48, fontSize:11, color:C.white, bold:true, charSpacing:2, align:"center", valign:"middle", margin:0 });
    const qs = [
      "Q1.  What is the single biggest cultural barrier to adopting the three-person equal-peers model in your organization?",
      "Q2.  If you had to start a new product team from scratch today, who would your three people be? Why?",
      "Q3.  What would it take for your Product Owner to agree to a standing 20% NFR/hygiene allocation? What evidence would change their mind?",
      "Q4.  What\u2019s one local optimization your team makes today that you know is harming another team?",
    ];
    s.addText(qs.join("\n\n"), { x:0.5, y:1.4, w:5.1, h:2.0, fontSize:11, color:C.pale, margin:0 });

    // Full program summary
    s.addShape(pres.shapes.RECTANGLE, { x:6.05, y:0.82, w:3.6, h:2.72, fill:{ color:C.mid, transparency:20 }, shadow:shadow() });
    s.addShape(pres.shapes.RECTANGLE, { x:6.05, y:0.82, w:3.6, h:0.48, fill:{ color:C.accent, transparency:10 } });
    s.addText("KEY TAKEAWAYS", { x:6.05, y:0.82, w:3.6, h:0.48, fontSize:11, color:C.white, bold:true, charSpacing:2, align:"center", valign:"middle", margin:0 });
    const tks = [
      "\u00B7 Three equals: minimal comms, full coverage",
      "\u00B7 Rotation = shared knowledge, no silos",
      "\u00B7 All three own everything, always",
      "\u00B7 Agents multiply the team, not replace it",
      "\u00B7 NFR advocacy is every member\u2019s job",
      "\u00B7 System collaboration prevents local optimization",
    ];
    s.addText(tks.join("\n"), { x:6.2, y:1.4, w:3.35, h:2.0, fontSize:12, color:C.pale, margin:0 });

    // Complete program view
    s.addShape(pres.shapes.RECTANGLE, { x:0.35, y:3.68, w:9.3, h:1.72, fill:{ color:C.mid, transparency:15 }, shadow:shadow() });
    s.addShape(pres.shapes.RECTANGLE, { x:0.35, y:3.68, w:9.3, h:0.4, fill:{ color:C.accent, transparency:10 } });
    s.addText("ENTERPRISE AGENTIC PRACTICES  \u2014  12-MODULE PROGRAM  COMPLETE", {
      x:0.35, y:3.68, w:9.3, h:0.4, fontSize:12, color:C.white, bold:true, charSpacing:2, align:"center", valign:"middle", margin:0
    });

    const modules = [
      ["M01 Chat vs Agents", "M02 Core Concepts", "M03 Context Engineering", "M04 Spec-Driven Dev"],
      ["M05 Testing & CI/CD", "M06 Review & Hygiene", "M07 Observability", "M08 Security & Reliability"],
      ["M09 FinOps", "M10 Design Reviews", "M11 Product-First Eng.", "M12 Three-Person Team"],
    ];
    modules.forEach((row, ri) => {
      row.forEach((mod, ci) => {
        const x = 0.45+ci*2.35, y = 4.15+ri*0.38;
        s.addShape(pres.shapes.RECTANGLE, { x, y, w:2.2, h:0.3, fill:{ color:C.accent, transparency:50 } });
        s.addText(`\u2713 ${mod}`, { x, y, w:2.2, h:0.3, fontSize:10, color:C.white, align:"center", valign:"middle", margin:0 });
      });
    });

    s.addText("\u201CThe engineers who thrive in the agent era master intent, oversight, and architecture \u2014 and they do it together.\u201D", {
      x:0.35, y:5.38, w:9.3, h:0.2, fontSize:10.5, color:C.muted, italic:true, align:"center", margin:0
    });
  }

  await pres.writeFile({ fileName:"Module_12_Three_Person_Team.pptx" });
  console.log("\u2705 Module 12 written");
}

build().catch(console.error);
