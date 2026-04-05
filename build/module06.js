const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const { FaUserCheck, FaSync, FaHistory, FaClipboardCheck, FaCommentAlt, FaBookOpen, FaChartLine, FaLayerGroup, FaShieldAlt, FaRegCheckSquare, FaTools, FaRedo } = require("react-icons/fa");

const C = { navy:"1C3557", iceBlue:"5B8DB8", pale:"D4E4F0", white:"FFFFFF", offWhite:"F3F6F9", accent:"3A7DC9", teal:"4A7FA8", mid:"2E5073", text:"1E2D3D", muted:"7A90A8", green:"3A7E6E", steel:"8096B0", red:"B03040" };
const shadow = () => ({ type:"outer", color:"000000", blur:8, offset:3, angle:135, opacity:0.13 });
async function icon(C2, color="#FFFFFF", size=256) {
  const svg = ReactDOMServer.renderToStaticMarkup(React.createElement(C2, { color, size:String(size) }));
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64,"+buf.toString("base64");
}

async function build() {
  const pres = new pptxgen(); pres.layout = "LAYOUT_16x9"; pres.title = "Module 6: Review Cycles, Hygiene & Continuous Improvement";

  // SLIDE 1 — Title
  {
    const s = pres.addSlide(); s.background = { color: C.navy };
    s.addShape(pres.shapes.RECTANGLE, {x:0,y:0,w:0.18,h:5.625,fill:{color:C.accent}});
    s.addText("ENTERPRISE AGENTIC PRACTICES", {x:0.4,y:0.32,w:9.2,h:0.35,fontSize:10,color:C.iceBlue,bold:true,charSpacing:4,margin:0});
    s.addShape(pres.shapes.RECTANGLE, {x:0.4,y:0.82,w:1.5,h:0.38,fill:{color:C.accent}});
    s.addText("MODULE 06", {x:0.4,y:0.82,w:1.5,h:0.38,fontSize:11,color:C.white,bold:true,align:"center",valign:"middle",margin:0});
    s.addText("Review Cycles,\nHygiene &\nContinuous Improvement", {x:0.4,y:1.28,w:7.2,h:2.2,fontSize:38,color:C.white,bold:true,margin:0});
    s.addText("Keeping humans in control while agents move at machine speed", {x:0.4,y:3.6,w:7.2,h:0.5,fontSize:18,color:C.iceBlue,italic:true,margin:0});
    s.addShape(pres.shapes.RECTANGLE, {x:0.4,y:4.22,w:3.5,h:0.04,fill:{color:C.accent}});
    s.addText([{text:"Duration: ",options:{bold:true,color:C.muted}},{text:"60\u201375 min  ",options:{color:C.muted}},{text:"  |  ",options:{color:C.muted}},{text:"Level: ",options:{bold:true,color:C.muted}},{text:"Intermediate",options:{color:C.muted}}], {x:0.4,y:4.38,w:5,h:0.38,fontSize:13,margin:0});
    // Right visual: continuous loop
    const loop = [{l:"Deploy",c:C.navy},{l:"Observe",c:C.teal},{l:"Review",c:C.accent},{l:"Improve",c:C.green},{l:"Repeat",c:C.navy}];
    loop.forEach((l,i) => {
      const y=0.62+i*0.95;
      s.addShape(pres.shapes.RECTANGLE, {x:7.55,y,w:2.1,h:0.75,fill:{color:l.c,transparency:i===4?35:0},shadow:shadow()});
      s.addText(l.l, {x:7.55,y,w:2.1,h:0.75,fontSize:14,color:C.white,bold:true,align:"center",valign:"middle",margin:0});
      if(i<loop.length-1) s.addText("\u2193",{x:8.25,y:y+0.76,w:0.5,h:0.24,fontSize:14,color:C.muted,align:"center",margin:0});
    });
  }

  // SLIDE 2 — Learning Objectives
  {
    const s = pres.addSlide(); s.background = { color: C.offWhite };
    s.addShape(pres.shapes.RECTANGLE, {x:0,y:0,w:10,h:0.82,fill:{color:C.navy}});
    s.addText("LEARNING OBJECTIVES", {x:0.4,y:0,w:9.2,h:0.82,fontSize:13,color:C.white,bold:true,charSpacing:3,valign:"middle",margin:0});
    s.addText("By the end of this module you will be able to:", {x:0.35,y:0.9,w:9.3,h:0.28,fontSize:11,color:C.muted,italic:true,margin:0});
    const objs = [
      {icon:FaUserCheck,    color:C.accent, title:"Design HITL Architecture",     body:"Specify human-in-the-loop gates, approval flows, and escalation paths that balance speed with control."},
      {icon:FaCommentAlt,   color:C.teal,   title:"Run Effective Agent PR Reviews",body:"Apply the new mental model for reviewing AI-generated diffs: scope, intent, hallucination, and debt."},
      {icon:FaBookOpen,     color:C.green,  title:"Maintain Living ADRs",         body:"Capture architectural decisions continuously using agents \u2014 turning Slack threads into auditable records."},
      {icon:FaChartLine,    color:C.steel,  title:"Build a Continuous Improvement Loop", body:"Deploy \u2192 observe \u2192 detect drift \u2192 update spec \u2192 re-run agent. The self-improving agentic system."},
    ];
    const cols=[0.35,5.1];
    for(let i=0;i<4;i++){
      const x=cols[i%2],y=1.28+Math.floor(i/2)*2.0,w=4.55,h=1.82,o=objs[i];
      s.addShape(pres.shapes.RECTANGLE, {x,y,w,h,fill:{color:C.white},shadow:shadow()});
      s.addShape(pres.shapes.RECTANGLE, {x,y,w:0.07,h,fill:{color:o.color}});
      const ic=await icon(o.icon,"#"+o.color);
      s.addImage({data:ic,x:x+0.18,y:y+0.22,w:0.4,h:0.4});
      s.addText(o.title,{x:x+0.7,y:y+0.18,w:w-0.85,h:0.42,fontSize:13,color:C.navy,bold:true,margin:0});
      s.addText(o.body, {x:x+0.7,y:y+0.64,w:w-0.85,h:1.05,fontSize:11.5,color:C.muted,margin:0});
    }
  }

  // SLIDE 3 — Supervised Development: The New Contract
  {
    const s = pres.addSlide(); s.background = { color: C.navy };
    s.addText("SUPERVISED DEVELOPMENT  \u2014  THE NEW CONTRACT", {x:0.4,y:0.22,w:9,h:0.45,fontSize:13,color:C.iceBlue,bold:true,charSpacing:3,margin:0});
    // Spotify quote
    s.addShape(pres.shapes.RECTANGLE, {x:0.35,y:0.82,w:9.3,h:1.1,fill:{color:C.mid,transparency:15},shadow:shadow()});
    s.addText("\u201CWhen I speak to my most senior engineers \u2014 the best developers we have \u2014 they say they have not written a single line of code since December. They only generate code and supervise it.\u201D\n\u2014 Alex S\u00F6derstr\u00F6m, Spotify Co-CEO  \u00B7  Q4 2025 Earnings Call", {x:0.55,y:0.88,w:9.0,h:0.98,fontSize:14,color:C.white,italic:true,align:"center",valign:"middle",margin:0});

    // Old vs New
    const old_new = [
      {role:"Code Author",    old:"Types every line. Owns syntax, logic, and tests.",new:"Defines intent via spec and AC. Reviews and approves agent output."},
      {role:"Architect",      old:"Designs system, documents decisions after-the-fact.",new:"Designs agent architecture, reviews plans, signs off before implementation."},
      {role:"Tech Lead",      old:"Writes code alongside team. Reviews human PRs.",new:"Approves agent plans and task lists. Sets HITL gates. Owns verification criteria."},
      {role:"Engineering Manager",old:"Tracks velocity, manages human developers.",new:"Tracks agent throughput, manages context quality, defines DoD and review standards."},
    ];
    s.addShape(pres.shapes.RECTANGLE, {x:0.35,y:2.08,w:9.3,h:0.36,fill:{color:C.mid,transparency:10}});
    s.addText("ROLE", {x:0.45,y:2.08,w:1.8,h:0.36,fontSize:10,color:C.iceBlue,bold:true,charSpacing:2,valign:"middle",margin:0});
    s.addText("BEFORE (Chat Era)", {x:2.4,y:2.08,w:3.4,h:0.36,fontSize:10,color:C.steel,bold:true,charSpacing:2,valign:"middle",margin:0});
    s.addText("AFTER (Agent Era)", {x:6.0,y:2.08,w:3.5,h:0.36,fontSize:10,color:C.accent,bold:true,charSpacing:2,valign:"middle",margin:0});
    old_new.forEach((r,i) => {
      const y=2.5+i*0.74, bg=i%2===0?C.mid:"2A4870";
      s.addShape(pres.shapes.RECTANGLE, {x:0.35,y,w:9.3,h:0.68,fill:{color:bg,transparency:25}});
      s.addText(r.role, {x:0.45,y,w:1.85,h:0.68,fontSize:12,color:C.iceBlue,bold:true,valign:"middle",margin:0});
      s.addText(r.old, {x:2.4,y,w:3.4,h:0.68,fontSize:10.5,color:C.pale,valign:"middle",margin:0});
      s.addText(r.new, {x:6.0,y,w:3.5,h:0.68,fontSize:10.5,color:C.white,valign:"middle",margin:0});
    });
  }

  // SLIDE 4 — HITL Design
  {
    const s = pres.addSlide(); s.background = { color: C.white };
    s.addShape(pres.shapes.RECTANGLE, {x:0,y:0,w:10,h:0.82,fill:{color:C.navy}});
    s.addText("DESIGNING HUMAN-IN-THE-LOOP GATES", {x:0.4,y:0,w:9,h:0.82,fontSize:13,color:C.white,bold:true,charSpacing:3,valign:"middle",margin:0});
    s.addText("HITL must be designed into the agent system from day one \u2014 retrofitting it is expensive and fragile", {x:0.4,y:0.9,w:9.2,h:0.3,fontSize:12,color:C.muted,italic:true,margin:0});

    const tiers = [
      {tier:"FULLY AUTOMATED",color:C.green,desc:"Low-risk, reversible, self-correcting",
       actions:["Dependency version bumps","Doc generation and sync","Translation of new strings","Log analysis and alerting","Test coverage gap reports"],
       override:"Humans review aggregate reports, not individual actions"},
      {tier:"SOFT GATE",color:C.accent,desc:"Medium-risk, recoverable, agent opens PR",
       actions:["Feature implementation PRs","Refactoring PRs","API integration changes","Configuration changes","New test generation"],
       override:"Human must approve PR before merge. Can reject and redirect agent."},
      {tier:"HARD GATE",color:C.red,desc:"High-risk, irreversible, human decides",
       actions:["Production database changes","Security config modification","Public API contract changes","Production deploys","Payments or financial ops"],
       override:"Human authorises explicitly. Agent surfaces options only, does not execute."},
    ];
    tiers.forEach((t,i) => {
      const x=0.35+i*3.15, y=1.28;
      s.addShape(pres.shapes.RECTANGLE, {x,y,w:2.95,h:4.1,fill:{color:C.offWhite},shadow:shadow()});
      s.addShape(pres.shapes.RECTANGLE, {x,y,w:2.95,h:0.62,fill:{color:t.color}});
      s.addText(t.tier, {x,y,w:2.95,h:0.42,fontSize:12,color:C.white,bold:true,align:"center",valign:"middle",charSpacing:2,margin:0});
      s.addText(t.desc, {x,y:y+0.42,w:2.95,h:0.22,fontSize:9.5,color:C.white,align:"center",margin:0});
      s.addText("EXAMPLE ACTIONS", {x:x+0.12,y:y+0.72,w:2.7,h:0.22,fontSize:8.5,color:t.color,bold:true,charSpacing:2,margin:0});
      t.actions.forEach((a,j) => s.addText("\u2022 "+a, {x:x+0.12,y:y+0.94+j*0.44,w:2.7,h:0.4,fontSize:10.5,color:C.text,margin:0}));
      s.addShape(pres.shapes.RECTANGLE, {x:x+0.1,y:y+3.28,w:2.75,h:0.68,fill:{color:t.color,transparency:88}});
      s.addText("HUMAN ROLE", {x:x+0.16,y:y+3.32,w:2.63,h:0.22,fontSize:8.5,color:t.color,bold:true,charSpacing:2,margin:0});
      s.addText(t.override, {x:x+0.16,y:y+3.54,w:2.63,h:0.36,fontSize:9.5,color:C.muted,italic:true,margin:0});
    });
  }

  // SLIDE 5 — Reviewing AI-Generated PRs
  {
    const s = pres.addSlide(); s.background = { color: C.offWhite };
    s.addShape(pres.shapes.RECTANGLE, {x:0,y:0,w:10,h:0.82,fill:{color:C.teal}});
    s.addText("REVIEWING AI-GENERATED PULL REQUESTS", {x:0.4,y:0,w:9,h:0.82,fontSize:13,color:C.white,bold:true,charSpacing:3,valign:"middle",margin:0});
    s.addText("Reviewing AI code takes as much mental energy as writing it \u2014 reviewers must be paranoid about hallucinations and scope creep", {x:0.4,y:0.9,w:9.2,h:0.3,fontSize:11.5,color:C.muted,italic:true,margin:0});

    const dimensions = [
      {q:"1. Did the agent stay in scope?",      how:"Check which files changed. Were all of them listed in the task spec? Any unexpected files changed = scope creep. Fail the PR.",color:C.accent},
      {q:"2. Does the diff match the plan?",     how:"Compare implementation against plan.md. Did agent execute what was agreed? If it deviated, was the deviation justified in a comment?",color:C.teal},
      {q:"3. Are AC tests present and correct?", how:"Every AC must have a corresponding test. Read the test names against the acceptance criteria \u2014 not just line coverage.",color:C.green},
      {q:"4. Are there hallucinated APIs or deps?",how:"Agents invent APIs and package versions that don\u2019t exist. Check every import, every external call, every version number.",color:C.steel},
      {q:"5. Is technical debt being introduced?",how:"Agents optimise for passing tests, not maintainability. Check for: magic numbers, duplicated logic, missing error handling, no comments.",color:C.navy},
      {q:"6. Does behaviour match intent?",       how:"Run the feature mentally against your AC. Did the agent build what you wanted, even if tests pass? Functional correctness matters.",color:C.accent},
    ];
    [[0,1,2],[3,4,5]].forEach((group,col) => {
      group.forEach((idx,row) => {
        const d=dimensions[idx], x=col===0?0.35:5.1, y=1.28+row*1.42, w=4.55, h=1.3;
        s.addShape(pres.shapes.RECTANGLE, {x,y,w,h,fill:{color:C.white},shadow:shadow()});
        s.addShape(pres.shapes.RECTANGLE, {x,y,w:0.06,h,fill:{color:d.color}});
        s.addText(d.q,   {x:x+0.16,y:y+0.06,w:w-0.22,h:0.38,fontSize:12,color:C.navy,bold:true,margin:0});
        s.addText(d.how, {x:x+0.16,y:y+0.5,w:w-0.22,h:0.72,fontSize:11,color:C.muted,margin:0});
      });
    });
  }

  // SLIDE 6 — ADRs as Living Context
  {
    const s = pres.addSlide(); s.background = { color: C.white };
    s.addShape(pres.shapes.RECTANGLE, {x:0,y:0,w:10,h:0.82,fill:{color:C.navy}});
    s.addText("ARCHITECTURE DECISION RECORDS AS LIVING CONTEXT", {x:0.4,y:0,w:9,h:0.82,fontSize:13,color:C.white,bold:true,charSpacing:3,valign:"middle",margin:0});
    s.addText("Spotify engineers use agents to capture ADRs from Slack threads \u2014 making architectural reasoning continuous, not retrospective", {x:0.4,y:0.9,w:9.2,h:0.3,fontSize:11.5,color:C.muted,italic:true,margin:0});

    // Left: what goes in an ADR
    s.addShape(pres.shapes.RECTANGLE, {x:0.35,y:1.28,w:4.55,h:4.1,fill:{color:C.offWhite},shadow:shadow()});
    s.addShape(pres.shapes.RECTANGLE, {x:0.35,y:1.28,w:4.55,h:0.42,fill:{color:C.navy}});
    s.addText("ADR ANATOMY", {x:0.35,y:1.28,w:4.55,h:0.42,fontSize:11,color:C.white,bold:true,charSpacing:2,align:"center",valign:"middle",margin:0});
    const sections = [
      {s:"Title",v:"ADR-0042: Use PostgreSQL for board state"},
      {s:"Status",v:"Accepted / Proposed / Deprecated"},
      {s:"Context",v:"Why did we face this decision? What were the constraints?"},
      {s:"Decision",v:"What exactly did we decide to do?"},
      {s:"Consequences",v:"What are the trade-offs? What does this enable/prevent?"},
      {s:"Alternatives Considered",v:"What did we reject and why?"},
    ];
    sections.forEach((sec,i) => {
      const y=1.82+i*0.5;
      s.addShape(pres.shapes.RECTANGLE, {x:0.47,y,w:4.3,h:0.44,fill:{color:i%2===0?C.white:C.offWhite}});
      s.addText(sec.s,  {x:0.55,y,w:1.55,h:0.44,fontSize:11.5,color:C.accent,bold:true,valign:"middle",margin:0});
      s.addText(sec.v,  {x:2.12,y,w:2.55,h:0.44,fontSize:10.5,color:C.muted,valign:"middle",margin:0});
    });
    s.addShape(pres.shapes.RECTANGLE, {x:0.47,y:4.88,w:4.3,h:0.4,fill:{color:C.pale}});
    s.addText("Store in: adr/ folder in repo root \u00B7 Reference in CLAUDE.md for JIT loading", {x:0.55,y:4.88,w:4.14,h:0.4,fontSize:10,color:C.navy,valign:"middle",margin:0});

    // Right: agent workflow for ADRs
    s.addShape(pres.shapes.RECTANGLE, {x:5.1,y:1.28,w:4.55,h:4.1,fill:{color:C.offWhite},shadow:shadow()});
    s.addShape(pres.shapes.RECTANGLE, {x:5.1,y:1.28,w:4.55,h:0.42,fill:{color:C.navy}});
    s.addText("AGENT-ASSISTED ADR WORKFLOW", {x:5.1,y:1.28,w:4.55,h:0.42,fontSize:11,color:C.white,bold:true,charSpacing:2,align:"center",valign:"middle",margin:0});
    const wflow = [
      {n:"1",t:"Architectural discussion happens",d:"Engineers debate an approach in Slack, GitHub comments, or a design doc."},
      {n:"2",t:"Agent reads the thread",d:"Ask the agent: \u201CRead this Slack thread and produce a draft ADR in our standard format.\u201D"},
      {n:"3",t:"Human reviews and edits",d:"Engineer fills in missing context, verifies accuracy, and updates the status."},
      {n:"4",t:"ADR committed to repo",d:"The decision is now in version control alongside the code it governs."},
      {n:"5",t:"Agent references ADR in future",d:"When making related changes, agent loads the relevant ADR as just-in-time context."},
    ];
    wflow.forEach((w,i) => {
      const y=1.82+i*0.7;
      s.addShape(pres.shapes.RECTANGLE, {x:5.22,y,w:0.36,h:0.6,fill:{color:C.accent}});
      s.addText(w.n, {x:5.22,y,w:0.36,h:0.6,fontSize:13,color:C.white,bold:true,align:"center",valign:"middle",margin:0});
      s.addText(w.t, {x:5.66,y:y+0.04,w:3.87,h:0.28,fontSize:12,color:C.navy,bold:true,margin:0});
      s.addText(w.d, {x:5.66,y:y+0.32,w:3.87,h:0.26,fontSize:10.5,color:C.muted,margin:0});
    });
  }

  // SLIDE 7 — Definition of Done Enforcement
  {
    const s = pres.addSlide(); s.background = { color: C.navy };
    s.addText("DEFINITION OF DONE  \u2014  ENFORCED BY THE SYSTEM", {x:0.4,y:0.22,w:9,h:0.45,fontSize:13,color:C.iceBlue,bold:true,charSpacing:3,margin:0});
    s.addText("Without DoD embedded in the agent system, \u201Cdone\u201D is whatever the agent or reviewer decides in the moment", {x:0.4,y:0.72,w:9,h:0.36,fontSize:15,color:C.white,italic:true,margin:0});

    const dod_items = [
      {cat:"Specification",  color:C.accent, items:["All AC from SPEC.md explicitly met","No features added beyond spec scope","Non-goals have not been implemented","Edge cases from spec are handled"]},
      {cat:"Code Quality",   color:C.teal,   items:["Linter: zero warnings","Type checker: clean","No dead code or commented-out blocks","No magic numbers or hardcoded strings"]},
      {cat:"Testing",        color:C.green,  items:["100% of AC have corresponding tests","All tests passing in CI","Coverage threshold met on changed files","Edge case tests present"]},
      {cat:"Documentation",  color:C.steel,  items:["ADR updated if architectural decision made","API docs reflect changes","CLAUDE.md updated if agent rules changed","Inline comments for complex logic"]},
    ];
    const cols=[0.35,5.15];
    dod_items.forEach((cat,i) => {
      const x=cols[i%2], y=1.25+Math.floor(i/2)*2.12, w=4.6, h=2.0;
      s.addShape(pres.shapes.RECTANGLE, {x,y,w,h,fill:{color:C.mid,transparency:18},shadow:shadow()});
      s.addShape(pres.shapes.RECTANGLE, {x,y,w,h:0.42,fill:{color:cat.color,transparency:10}});
      s.addText(cat.cat, {x:x+0.12,y,w:w-0.18,h:0.42,fontSize:13,color:C.white,bold:true,valign:"middle",charSpacing:2,margin:0});
      cat.items.forEach((item,j) => {
        s.addShape(pres.shapes.RECTANGLE, {x:x+0.12,y:y+0.5+j*0.36,w:0.26,h:0.28,fill:{color:cat.color,transparency:20}});
        s.addText("\u25A1",{x:x+0.12,y:y+0.5+j*0.36,w:0.26,h:0.28,fontSize:12,color:cat.color,align:"center",valign:"middle",margin:0});
        s.addText(item, {x:x+0.46,y:y+0.5+j*0.36,w:w-0.58,h:0.3,fontSize:11,color:C.pale,valign:"middle",margin:0});
      });
    });
    s.addText("Embed this DoD as a checklist in your PR template. Make it the Verifier\u2019s exit criteria. Agents that don\u2019t meet DoD don\u2019t get to open PRs.", {
      x:0.35,y:5.33,w:9.3,h:0.26,fontSize:10.5,color:C.muted,italic:true,margin:0
    });
  }

  // SLIDE 8 — Continuous Improvement Loop
  {
    const s = pres.addSlide(); s.background = { color: C.offWhite };
    s.addShape(pres.shapes.RECTANGLE, {x:0,y:0,w:10,h:0.82,fill:{color:C.navy}});
    s.addText("THE CONTINUOUS IMPROVEMENT LOOP", {x:0.4,y:0,w:9,h:0.82,fontSize:13,color:C.white,bold:true,charSpacing:3,valign:"middle",margin:0});
    s.addText("The self-improving agentic system: every deployment is an opportunity to make the next one better", {x:0.4,y:0.9,w:9.2,h:0.3,fontSize:12,color:C.muted,italic:true,margin:0});

    const phases = [
      {n:"01",l:"Deploy",      c:C.navy,  d:"Agent opens PR. Human reviews and merges. Agent output enters production."},
      {n:"02",l:"Observe",     c:C.teal,  d:"Monitor for regressions, user feedback, performance issues. Agents help here too (log analysis, alerting)."},
      {n:"03",l:"Detect Drift",c:C.accent,d:"Identify where agent output diverged from intent: new bugs, edge cases missed, scope that should have been in spec."},
      {n:"04",l:"Update Spec", c:C.green, d:"Update SPEC.md with clarifications, new AC, or corrected non-goals. Update CLAUDE.md or Skills if agent behaviour needs tuning."},
      {n:"05",l:"Re-run Agent",c:C.steel, d:"Apply the updated spec to the fix or new feature. Better context \u2192 better agent output. The loop compounds."},
    ];
    phases.forEach((ph,i) => {
      const x=0.35+i*1.88, y=1.3;
      s.addShape(pres.shapes.RECTANGLE, {x,y,w:1.72,h:3.9,fill:{color:C.white},shadow:shadow()});
      s.addShape(pres.shapes.RECTANGLE, {x,y,w:1.72,h:0.62,fill:{color:ph.c}});
      s.addText(ph.n, {x,y,w:0.48,h:0.62,fontSize:18,color:C.white,bold:true,align:"center",valign:"middle",margin:0});
      s.addText(ph.l, {x:x+0.5,y,w:1.18,h:0.62,fontSize:13,color:C.white,bold:true,valign:"middle",margin:0});
      s.addText(ph.d, {x:x+0.1,y:y+0.7,w:1.52,h:3.02,fontSize:11,color:C.text,margin:0});
      if(i<phases.length-1) s.addText("\u2192",{x:x+1.72,y:y+1.72,w:0.16,h:0.38,fontSize:16,color:C.muted,align:"center",margin:0});
    });

    // Hygiene practices
    s.addShape(pres.shapes.RECTANGLE, {x:0.35,y:5.28,w:9.3,h:0.3,fill:{color:C.pale}});
    s.addText("Hygiene practices: weekly SPEC.md review \u00B7 monthly CLAUDE.md audit \u00B7 quarterly Skills refresh \u00B7 continuous ADR capture", {
      x:0.45,y:5.28,w:9.1,h:0.3,fontSize:11,color:C.navy,bold:true,valign:"middle",margin:0
    });
  }

  // SLIDE 9 — Code Review Anti-Patterns for AI Teams
  {
    const s = pres.addSlide(); s.background = { color: C.white };
    s.addShape(pres.shapes.RECTANGLE, {x:0,y:0,w:10,h:0.82,fill:{color:C.navy}});
    s.addText("REVIEW HYGIENE ANTI-PATTERNS", {x:0.4,y:0,w:9,h:0.82,fontSize:13,color:C.white,bold:true,charSpacing:3,valign:"middle",margin:0});
    s.addText("Common ways that review processes break down when agents write the code", {x:0.4,y:0.9,w:9.2,h:0.3,fontSize:12,color:C.muted,italic:true,margin:0});
    const aps = [
      {n:"01",head:"Rubber-stamping agent PRs",impact:"Reviewers merge without reading diffs. Technical debt accumulates at machine speed.",fix:"Review AI PRs with the same rigour as human PRs. Scope + intent + correctness. No exceptions."},
      {n:"02",head:"Not checking for scope creep",impact:"Agent adds 47 files when asked to change 3. Nobody notices. Codebase becomes incoherent.",fix:"First review question: which files changed and were they all in scope? Hard fail if not."},
      {n:"03",head:"Trusting tests implicitly",impact:"Agent writes tests to match its implementation, not the spec. Tests pass; feature is wrong.",fix:"Read test names against AC. Do the tests verify the spec, or the agent\u2019s interpretation of it?"},
      {n:"04",head:"Letting ADRs go stale",impact:"Agent makes architectural decisions contradicting past decisions nobody remembers.",fix:"Make ADR capture part of the PR checklist. Agent can draft the ADR from the PR description."},
      {n:"05",head:"No feedback loop to spec",impact:"Same types of errors recur. Agent keeps making the same mistakes. Process doesn\u2019t improve.",fix:"When a bug is found in agent output, trace it to a spec gap and fix SPEC.md before next sprint."},
      {n:"06",head:"HITL gates too late",impact:"Agent has already done irreversible things (prod write, email sent) before human can intervene.",fix:"Design HITL gates before irreversible actions, not after. Treat hard gates as non-negotiable."},
    ];
    [[0,1,2],[3,4,5]].forEach((group,col) => {
      group.forEach((idx,row) => {
        const ap=aps[idx],x=col===0?0.35:5.1,y=1.28+row*1.42,w=4.55,h=1.3;
        s.addShape(pres.shapes.RECTANGLE, {x,y,w,h,fill:{color:C.offWhite},shadow:shadow()});
        s.addShape(pres.shapes.RECTANGLE, {x,y,w:0.45,h,fill:{color:C.red,transparency:10}});
        s.addText(ap.n, {x,y,w:0.45,h,fontSize:14,color:C.white,bold:true,align:"center",valign:"middle",margin:0});
        s.addText(ap.head, {x:x+0.55,y:y+0.06,w:w-0.65,h:0.3,fontSize:12,color:C.navy,bold:true,margin:0});
        s.addText("\u26A0 "+ap.impact, {x:x+0.55,y:y+0.42,w:w-0.65,h:0.38,fontSize:10.5,color:C.red,margin:0});
        s.addText("\u2713 "+ap.fix,    {x:x+0.55,y:y+0.84,w:w-0.65,h:0.38,fontSize:10.5,color:C.green,margin:0});
      });
    });
  }

  // SLIDE 10 — Metrics for a Healthy Agentic Team
  {
    const s = pres.addSlide(); s.background = { color: C.navy };
    s.addText("METRICS FOR A HEALTHY AGENTIC TEAM", {x:0.4,y:0.22,w:9,h:0.45,fontSize:13,color:C.iceBlue,bold:true,charSpacing:3,margin:0});
    s.addText("If you can\u2019t measure it, you can\u2019t improve it. Track these to know if your agentic process is working.", {x:0.4,y:0.72,w:9,h:0.36,fontSize:15,color:C.white,italic:true,margin:0});

    const metrics = [
      {cat:"Quality",color:C.accent,items:[
        {m:"Agent PR failure mode ratio",t:"% of PRs in each of the 3 failure modes. Shift over time shows Verifier maturity."},
        {m:"AC coverage per PR",t:"% of AC items covered by tests. Target: 100%. Decline indicates spec quality issue."},
        {m:"Rework rate",t:"% of agent PRs that required >1 human redirect before merge. Measures spec clarity."},
      ]},
      {cat:"Velocity",color:C.teal,items:[
        {m:"Agent PRs per sprint",t:"Volume of agent-generated PRs. Rising = adoption. Flat = bottleneck in review or spec."},
        {m:"Time to HITL approval",t:"How long humans take to review agent output. Rising = too many PRs or too-complex diffs."},
        {m:"Spec-to-merge cycle time",t:"From requirements.md to merged PR. Measures end-to-end SDD efficiency."},
      ]},
      {cat:"Hygiene",color:C.green,items:[
        {m:"ADR creation rate",t:"ADRs per sprint. Measures whether architectural decisions are being captured continuously."},
        {m:"SPEC.md staleness",t:"Days since last SPEC.md update. Rising = spec and reality diverging."},
        {m:"CLAUDE.md line count",t:"Lines in CLAUDE.md. Rising = bloat. Should stay under 300."},
      ]},
    ];
    metrics.forEach((cat,i) => {
      const x=0.35+i*3.15, y=1.25;
      s.addShape(pres.shapes.RECTANGLE, {x,y,w:2.95,h:4.15,fill:{color:C.mid,transparency:18},shadow:shadow()});
      s.addShape(pres.shapes.RECTANGLE, {x,y,w:2.95,h:0.42,fill:{color:cat.color,transparency:10}});
      s.addText(cat.cat, {x,y,w:2.95,h:0.42,fontSize:13,color:C.white,bold:true,charSpacing:2,align:"center",valign:"middle",margin:0});
      cat.items.forEach((item,j) => {
        const iy=y+0.52+j*1.18;
        s.addShape(pres.shapes.RECTANGLE, {x:x+0.1,y:iy,w:2.75,h:1.1,fill:{color:C.navy}});
        s.addText(item.m, {x:x+0.18,y:iy+0.06,w:2.59,h:0.32,fontSize:11,color:cat.color,bold:true,margin:0});
        s.addText(item.t, {x:x+0.18,y:iy+0.42,w:2.59,h:0.6,fontSize:10,color:C.pale,margin:0});
      });
    });
  }

  // SLIDE 11 — Lab
  {
    const s = pres.addSlide(); s.background = { color: C.white };
    s.addShape(pres.shapes.RECTANGLE, {x:0,y:0,w:10,h:0.82,fill:{color:C.teal}});
    s.addText("LAB EXERCISE  \u00B7  30 MINUTES", {x:0.4,y:0,w:9,h:0.82,fontSize:13,color:C.white,bold:true,charSpacing:3,valign:"middle",margin:0});
    s.addText("Design Your Team\u2019s Review System for an Agentic Pipeline", {x:0.4,y:0.95,w:9.2,h:0.46,fontSize:19,color:C.navy,bold:true,margin:0});
    const steps = [
      {n:"1",t:"Map your HITL gates",min:"8 min",d:"For the workflow you designed in Module 2, place every agent action into the 3-tier HITL model. Where are your hard gates? Where can you fully automate? Where are the soft gates?"},
      {n:"2",t:"Write your PR review checklist",min:"8 min",d:"Using the 6-dimension framework from Slide 5, create a PR template checklist for your team\u2019s first agentic PR. What would a reviewer actually check for AI-generated code?"},
      {n:"3",t:"Draft a DoD",min:"7 min",d:"Write a Definition of Done for a feature your team is planning. Include: AC coverage, code quality, test requirements, and documentation. Make every item machine-verifiable."},
      {n:"4",t:"Identify your feedback loop gap",min:"7 min",d:"Where in your current process does the loop from production bug back to SPEC.md update break down? What\u2019s missing? Design the one improvement that would have the highest impact."},
    ];
    steps.forEach((st,i) => {
      const y=1.52+i*0.97;
      s.addShape(pres.shapes.RECTANGLE, {x:0.35,y,w:9.3,h:0.87,fill:{color:C.offWhite},shadow:shadow()});
      s.addShape(pres.shapes.RECTANGLE, {x:0.35,y,w:0.52,h:0.87,fill:{color:C.teal}});
      s.addText(st.n, {x:0.35,y,w:0.52,h:0.87,fontSize:22,color:C.white,bold:true,align:"center",valign:"middle",margin:0});
      s.addText(st.t,  {x:0.97,y:y+0.06,w:2.3,h:0.32,fontSize:12.5,color:C.teal,bold:true,margin:0});
      s.addText("("+st.min+")",{x:3.27,y:y+0.06,w:0.85,h:0.32,fontSize:11,color:C.muted,italic:true,margin:0});
      s.addText(st.d,  {x:0.97,y:y+0.44,w:8.55,h:0.36,fontSize:11,color:C.muted,margin:0});
    });
  }

  // SLIDE 12 — Discussion + Summary
  {
    const s = pres.addSlide(); s.background = { color: C.navy };
    s.addShape(pres.shapes.RECTANGLE, {x:9.82,y:0,w:0.18,h:5.625,fill:{color:C.accent}});
    s.addText("DISCUSSION + MODULE SUMMARY", {x:0.4,y:0.22,w:9,h:0.45,fontSize:13,color:C.iceBlue,bold:true,charSpacing:3,margin:0});
    s.addShape(pres.shapes.RECTANGLE, {x:0.35,y:0.82,w:5.5,h:3.82,fill:{color:C.mid,transparency:20},shadow:shadow()});
    s.addShape(pres.shapes.RECTANGLE, {x:0.35,y:0.82,w:5.5,h:0.48,fill:{color:C.iceBlue,transparency:15}});
    s.addText("DISCUSSION QUESTIONS", {x:0.35,y:0.82,w:5.5,h:0.48,fontSize:11,color:C.white,bold:true,charSpacing:2,align:"center",valign:"middle",margin:0});
    s.addText(["Q1.  How would your team\u2019s review culture need to change to adopt the 6-dimension PR review framework?","Q2.  Which of the 3 HITL tiers do you think would be most contentious to agree on with your manager?","Q3.  What architectural decision from last quarter should have been an ADR? What did you lose by not capturing it?","Q4.  If you could only track one metric from Slide 10 to start, which would give you the most insight?"].join("\n\n"), {x:0.5,y:1.4,w:5.1,h:3.1,fontSize:11.5,color:C.pale,margin:0});
    s.addShape(pres.shapes.RECTANGLE, {x:6.05,y:0.82,w:3.6,h:3.82,fill:{color:C.mid,transparency:20},shadow:shadow()});
    s.addShape(pres.shapes.RECTANGLE, {x:6.05,y:0.82,w:3.6,h:0.48,fill:{color:C.accent,transparency:10}});
    s.addText("KEY TAKEAWAYS", {x:6.05,y:0.82,w:3.6,h:0.48,fontSize:11,color:C.white,bold:true,charSpacing:2,align:"center",valign:"middle",margin:0});
    s.addText(["\u00B7 Supervised development = the new engineer","\u00B7 HITL: design 3 tiers before you start","\u00B7 AI PR review needs 6-dimension checklist","\u00B7 ADRs: capture continuously, not retrospectively","\u00B7 DoD must be machine-verifiable","\u00B7 Continuous improvement = spec \u2192 agent \u2192 observe \u2192 update","\u00B7 Anti-patterns compound at machine speed"].join("\n\n"), {x:6.2,y:1.4,w:3.35,h:3.1,fontSize:11.5,color:C.pale,margin:0});
    s.addShape(pres.shapes.RECTANGLE, {x:0.35,y:4.75,w:9.3,h:0.62,fill:{color:C.accent,transparency:18}});
    s.addText("NEXT  \u00B7  Module 07: Observability  \u2014  Tracing, logging, evaluation, and monitoring for production agent systems", {x:0.35,y:4.75,w:9.3,h:0.62,fontSize:11.5,color:C.white,bold:true,align:"center",valign:"middle",margin:0});
  }

  await pres.writeFile({ fileName: "Module_06_Review_Hygiene.pptx" });
  console.log("\u2705 Module 6 written");
}
build().catch(console.error);
