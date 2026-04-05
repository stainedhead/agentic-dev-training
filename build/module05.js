const pptxgen = require("pptxgenjs");
const {
  FaVial, FaSync, FaBug, FaCodeBranch, FaRobot,
  FaLayerGroup, FaSearch, FaUserGraduate, FaClipboardCheck,
  FaBook, FaShieldAlt, FaGavel
} = require("react-icons/fa");

const { C, shadow, icon } = require("./shared");

async function build() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.title = "Module 5: Review Cycles, Human-in-the-Loop & Agent-to-Agent";

  // SLIDE 1 — Title
  {
    const s = pres.addSlide(); s.background = { color: C.navy };
    s.addShape(pres.shapes.RECTANGLE, { x:0, y:0, w:0.18, h:5.625, fill:{color:C.accent} });
    s.addText("ENTERPRISE AGENTIC PRACTICES", { x:0.4, y:0.32, w:9.2, h:0.35, fontSize:10, color:C.iceBlue, bold:true, charSpacing:4, margin:0 });
    s.addShape(pres.shapes.RECTANGLE, { x:0.4, y:0.82, w:1.5, h:0.38, fill:{color:C.accent} });
    s.addText("MODULE 05", { x:0.4, y:0.82, w:1.5, h:0.38, fontSize:11, color:C.white, bold:true, align:"center", valign:"middle", margin:0 });
    s.addText("Review Cycles,\nHuman-in-the-Loop\n& Agent-to-Agent", { x:0.4, y:1.22, w:7.2, h:2.2, fontSize:40, color:C.white, bold:true, margin:0 });
    s.addText("Designing the oversight loops that keep agents reliable and teams informed", { x:0.4, y:3.52, w:7.5, h:0.5, fontSize:17, color:C.iceBlue, italic:true, margin:0 });
    s.addShape(pres.shapes.RECTANGLE, { x:0.4, y:4.12, w:3.5, h:0.04, fill:{color:C.accent} });
    s.addText([
      {text:"Duration: ",options:{bold:true,color:C.muted}},{text:"75\u201390 min  ",options:{color:C.muted}},
      {text:"  |  ",options:{color:C.muted}},{text:"Level: ",options:{bold:true,color:C.muted}},{text:"Intermediate",options:{color:C.muted}}
    ], { x:0.4, y:4.3, w:5, h:0.38, fontSize:13, margin:0 });
    // Right: review loop visual
    const steps = [{l:"Artifact",c:C.navy},{l:"Agent Reviews",c:C.teal},{l:"Structured Output",c:C.accent},{l:"Human Gate",c:C.green},{l:"\u2713 Proceed / \u21BA Revise",c:C.steel}];
    for (let i = 0; i < steps.length; i++) {
      const st = steps[i];
      const y = 0.65 + i * 0.95;
      s.addShape(pres.shapes.RECTANGLE, { x:7.6, y, w:2.05, h:0.75, fill:{color:st.c, transparency:i===2?0:20}, shadow:shadow() });
      s.addText(st.l, { x:7.6, y, w:2.05, h:0.75, fontSize:13, color:C.white, bold:true, align:"center", valign:"middle", margin:0 });
      if(i<steps.length-1) s.addText("\u2193", { x:8.25, y:y+0.78, w:0.55, h:0.25, fontSize:14, color:C.muted, align:"center", margin:0 });
    }
  }

  // SLIDE 2 — Learning Objectives
  {
    const s = pres.addSlide(); s.background = { color: C.offWhite };
    s.addShape(pres.shapes.RECTANGLE, { x:0, y:0, w:10, h:0.82, fill:{color:C.navy} });
    s.addText("LEARNING OBJECTIVES", { x:0.4, y:0, w:9.2, h:0.82, fontSize:13, color:C.white, bold:true, charSpacing:3, valign:"middle", margin:0 });
    s.addText("By the end of this module you will be able to:", { x:0.35, y:0.9, w:9.3, h:0.28, fontSize:11, color:C.muted, italic:true, margin:0 });
    const objs = [
      { icon: FaLayerGroup,      color: C.accent, title: "Review Across All SDLC Artifacts",  body: "Understand that coding agents are reviewers across ALL artifacts \u2014 not just code. PRDs, specs, architecture proposals, docs, and ADRs are all in scope." },
      { icon: FaClipboardCheck,  color: C.teal,   title: "Design HITL Review Cycles",         body: "Apply human-in-the-loop patterns (approval gate, checkpoint, exception escalation, spot check) at the right granularity for each artifact and risk level." },
      { icon: FaGavel,           color: C.green,  title: "Implement Agent-to-Agent Review",   body: "Use a dedicated evaluator agent to review generator agent output before it reaches a human \u2014 catching pattern failures at scale." },
      { icon: FaUserGraduate,    color: C.steel,  title: "Use Agents as Educators",           body: "Leverage agents to explain codebase, design decisions, and team processes to new team members on demand \u2014 without interrupting senior developers." },
    ];
    const cols = [0.35, 5.1];
    for (let i = 0; i < 4; i++) {
      const x = cols[i % 2], y = 1.28 + Math.floor(i / 2) * 2.0, w = 4.55, h = 1.82;
      const o = objs[i];
      s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill:{color:C.white}, shadow:shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y, w:0.07, h, fill:{color:o.color} });
      const ic = await icon(o.icon, "#" + o.color);
      s.addImage({ data:ic, x:x+0.18, y:y+0.22, w:0.4, h:0.4 });
      s.addText(o.title, { x:x+0.7, y:y+0.18, w:w-0.85, h:0.42, fontSize:13, color:C.navy, bold:true, margin:0 });
      s.addText(o.body,  { x:x+0.7, y:y+0.64, w:w-0.85, h:1.05, fontSize:11.5, color:C.muted, margin:0 });
    }
  }

  // SLIDE 3 — The Full Scope of Agent Review
  {
    const s = pres.addSlide(); s.background = { color: C.white };
    s.addShape(pres.shapes.RECTANGLE, { x:0, y:0, w:10, h:0.82, fill:{color:C.navy} });
    s.addText("THE FULL SCOPE OF AGENT REVIEW", { x:0.4, y:0, w:9, h:0.82, fontSize:13, color:C.white, bold:true, charSpacing:3, valign:"middle", margin:0 });
    s.addText("Any artifact expressible in text and evaluable against criteria is reviewable by an agent", { x:0.4, y:0.9, w:9.2, h:0.3, fontSize:12, color:C.muted, italic:true, margin:0 });

    // Table
    const colX = [0.35, 2.55, 6.0];
    const colW = [2.1, 3.35, 3.6];
    const headers = ["Artifact", "Reviewed against", "Typical output"];
    const hColors = [C.navy, C.navy, C.navy];
    const hTextColors = [C.white, C.white, C.white];

    for (let ci = 0; ci < 3; ci++) {
      s.addShape(pres.shapes.RECTANGLE, { x:colX[ci], y:1.28, w:colW[ci], h:0.44, fill:{color:hColors[ci]} });
      s.addText(headers[ci], { x:colX[ci]+0.12, y:1.28, w:colW[ci]-0.14, h:0.44, fontSize:11.5, color:hTextColors[ci], bold:true, valign:"middle", charSpacing:2, margin:0 });
    }

    const rows = [
      ["PRD",                      "Completeness checklist, existing system constraints, prior ADRs",   "Gaps, conflicts, open questions"],
      ["Design / architecture",    "Existing codebase, architecture principles, security patterns",     "Violations, missing considerations, alternatives"],
      ["Technical spec",           "PRD requirements, coding standards, test strategy",                 "Requirement gaps, ambiguities, missing edge cases"],
      ["Code (PR)",                "Spec, coding standards, test coverage, security checklist",         "Failing requirements, style issues, coverage gaps"],
      ["Tests",                    "Spec acceptance criteria, coverage targets",                        "Missing cases, untested paths"],
      ["Documentation",            "Current implementation, API contracts",                             "Stale content, missing sections, accuracy errors"],
      ["ADRs",                     "Consistency with existing decisions, current architecture",         "Conflicts, superseded assumptions"],
    ];

    for (let ri = 0; ri < rows.length; ri++) {
      const y = 1.75 + ri * 0.52;
      const bg = ri % 2 === 0 ? C.white : C.offWhite;
      s.addShape(pres.shapes.RECTANGLE, { x:colX[0], y, w:colW[0], h:0.48, fill:{color:"D4E4F0"} });
      s.addShape(pres.shapes.RECTANGLE, { x:colX[1], y, w:colW[1], h:0.48, fill:{color:bg} });
      s.addShape(pres.shapes.RECTANGLE, { x:colX[2], y, w:colW[2], h:0.48, fill:{color:bg} });
      s.addText(rows[ri][0], { x:colX[0]+0.12, y, w:colW[0]-0.14, h:0.48, fontSize:11, color:C.navy, bold:true, valign:"middle", margin:0 });
      s.addText(rows[ri][1], { x:colX[1]+0.12, y, w:colW[1]-0.14, h:0.48, fontSize:10.5, color:C.muted, valign:"middle", margin:0 });
      s.addText(rows[ri][2], { x:colX[2]+0.12, y, w:colW[2]-0.14, h:0.48, fontSize:10.5, color:C.text, valign:"middle", margin:0 });
    }

    s.addText("The same HITL patterns apply to all of these. The agent reviews, produces structured feedback, and a human makes the final call on anything consequential.", {
      x:0.35, y:5.35, w:9.3, h:0.24, fontSize:9.5, color:C.muted, italic:true, margin:0
    });
  }

  // SLIDE 4 — Agents as Educators
  {
    const s = pres.addSlide(); s.background = { color: C.navy };
    s.addText("AGENTS AS EDUCATORS AND ONBOARDING GUIDES", { x:0.4, y:0.22, w:9, h:0.45, fontSize:13, color:C.iceBlue, bold:true, charSpacing:3, margin:0 });
    s.addText("Agents explain codebase, design decisions, and processes on demand \u2014 at any depth, without interrupting the team", { x:0.4, y:0.72, w:9, h:0.36, fontSize:13, color:C.white, italic:true, margin:0 });

    // Left: education use cases
    const useCases = [
      {
        head: "Codebase education",
        color: C.accent,
        prompt: "\"Walk me through how a payment request flows from the API endpoint to the bank.\"",
        result: "Agent reads PaymentController, PaymentService, BankAdapter and traces the actual code path \u2014 not stale documentation."
      },
      {
        head: "Design decision education",
        color: C.teal,
        prompt: "\"Why is the session token stored in Redis rather than the database?\"",
        result: "Agent reads ADR-004, SessionService, deployment config and surfaces the documented rationale with full context."
      },
      {
        head: "Process education",
        color: C.green,
        prompt: "\"How does this team run a sprint? What\u2019s the review process for a new feature?\"",
        result: "Agent reads CLAUDE.md, PRODUCT.md, and task structure and gives an accurate answer grounded in working documents."
      },
    ];

    for (let i = 0; i < useCases.length; i++) {
      const uc = useCases[i];
      const y = 1.22 + i * 1.42;
      s.addShape(pres.shapes.RECTANGLE, { x:0.35, y, w:5.6, h:1.28, fill:{color:C.mid, transparency:18}, shadow:shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x:0.35, y, w:0.06, h:1.28, fill:{color:uc.color} });
      s.addText(uc.head, { x:0.5, y:y+0.06, w:5.3, h:0.28, fontSize:12, color:uc.color, bold:true, margin:0 });
      s.addText(uc.prompt, { x:0.5, y:y+0.36, w:5.3, h:0.34, fontSize:10, color:C.pale, italic:true, fontFace:"Consolas", margin:0 });
      s.addText(uc.result, { x:0.5, y:y+0.76, w:5.3, h:0.44, fontSize:10.5, color:C.pale, margin:0 });
    }

    // Right: when to use agent vs human table
    s.addShape(pres.shapes.RECTANGLE, { x:6.2, y:1.22, w:3.45, h:3.94, fill:{color:C.mid, transparency:18}, shadow:shadow() });
    s.addShape(pres.shapes.RECTANGLE, { x:6.2, y:1.22, w:3.45, h:0.44, fill:{color:C.accent, transparency:10} });
    s.addText("AGENT vs. HUMAN", { x:6.2, y:1.22, w:3.45, h:0.44, fontSize:11, color:C.white, bold:true, align:"center", valign:"middle", charSpacing:2, margin:0 });

    const rows = [
      { situation: "\"How does this code work?\"",       agent: true,  human: false },
      { situation: "\"Why was this design decision made?\"",     agent: true,  human: false },
      { situation: "\"What does this team value in reviews?\"", agent: true,  human: false },
      { situation: "\"How do I grow in this org?\"",    agent: false, human: true  },
      { situation: "\"What should I work on next?\"",   agent: false, human: true  },
      { situation: "\"Is my approach right?\"",         agent: true,  human: true  },
    ];

    s.addShape(pres.shapes.RECTANGLE, { x:6.2, y:1.66, w:1.72, h:0.3, fill:{color:C.teal} });
    s.addShape(pres.shapes.RECTANGLE, { x:7.92, y:1.66, w:0.86, h:0.3, fill:{color:C.teal} });
    s.addShape(pres.shapes.RECTANGLE, { x:8.78, y:1.66, w:0.87, h:0.3, fill:{color:C.teal} });
    s.addText("Situation", { x:6.24, y:1.66, w:1.68, h:0.3, fontSize:9, color:C.white, bold:true, valign:"middle", margin:0 });
    s.addText("Agent", { x:7.92, y:1.66, w:0.86, h:0.3, fontSize:9, color:C.white, bold:true, align:"center", valign:"middle", margin:0 });
    s.addText("Human", { x:8.78, y:1.66, w:0.87, h:0.3, fontSize:9, color:C.white, bold:true, align:"center", valign:"middle", margin:0 });

    for (let ri = 0; ri < rows.length; ri++) {
      const r = rows[ri];
      const y = 1.98 + ri * 0.52;
      const bg = ri % 2 === 0 ? "253A52" : "1C3557";
      s.addShape(pres.shapes.RECTANGLE, { x:6.2, y, w:1.72, h:0.48, fill:{color:bg} });
      s.addShape(pres.shapes.RECTANGLE, { x:7.92, y, w:0.86, h:0.48, fill:{color:bg} });
      s.addShape(pres.shapes.RECTANGLE, { x:8.78, y, w:0.87, h:0.48, fill:{color:bg} });
      s.addText(r.situation, { x:6.24, y, w:1.68, h:0.48, fontSize:8.5, color:C.pale, valign:"middle", margin:0 });
      s.addText(r.agent ? "\u2705" : "\u274C", { x:7.92, y, w:0.86, h:0.48, fontSize:11, align:"center", valign:"middle", margin:0 });
      s.addText(r.human ? "\u2705" : "\u2014", { x:8.78, y, w:0.87, h:0.48, fontSize:11, color:r.human ? C.green : C.steel, align:"center", valign:"middle", margin:0 });
    }

    s.addText("Faster and more accurate than asking a colleague. The agent reads actual code \u2014 not documentation that may be out of date.", {
      x:0.35, y:5.35, w:9.3, h:0.24, fontSize:9.5, color:C.muted, italic:true, margin:0
    });
  }

  // SLIDE 5 — The 3 Agent Failure Modes
  {
    const s = pres.addSlide(); s.background = { color: C.navy };
    s.addText("THE 3 AGENT FAILURE MODES", { x:0.4, y:0.22, w:9, h:0.45, fontSize:13, color:C.iceBlue, bold:true, charSpacing:3, margin:0 });
    s.addText("Source: Spotify Engineering (Honk Part 3, 2025) \u2014 \u201CWithout feedback loops, agents often produce code that simply doesn\u2019t work.\u201D", { x:0.4, y:0.72, w:9, h:0.36, fontSize:13, color:C.white, italic:true, margin:0 });

    const modes = [
      { n:"01", head:"PR Fails CI", severity:"Caught", color:C.green,
        what:"The agent\u2019s PR fails automated tests, linting, or the build. The simplest failure mode.",
        impact:"Low \u2014 CI catches it immediately. Engineer knows and can redirect the agent.",
        fix:"Ensure CI runs fully before PR opens. Agent should run tests locally first via Verifier.",
        sym:"\u2713" },
      { n:"02", head:"Passes CI but Functionally Wrong", severity:"Critical", color:"B03040",
        what:"The PR merges successfully but the implementation is incorrect. Tests weren\u2019t comprehensive enough to catch the bug.",
        impact:"HIGH \u2014 erodes trust in automation. Hard to detect in PR review across thousands of components.",
        fix:"Write tests from AC before implementation. Judge LLM evaluates functional correctness, not just CI green.",
        sym:"\u26A0" },
      { n:"03", head:"Nonsensical PR", severity:"Expensive", color:C.steel,
        what:"Agent couldn\u2019t figure out how to run builds/tests, changed things outside scope, or got confused and produced garbage.",
        impact:"MEDIUM \u2014 wastes engineer review time. Expensive at scale across hundreds of PRs.",
        fix:"Tight scope in prompt. Verifier detects when agent changed files outside the specified scope.",
        sym:"\u2717" },
    ];

    modes.forEach((m,i) => {
      const x=0.35+i*3.15, y=1.25;
      s.addShape(pres.shapes.RECTANGLE, {x,y,w:2.95,h:4.15,fill:{color:C.mid,transparency:18},shadow:shadow()});
      s.addShape(pres.shapes.RECTANGLE, {x,y,w:2.95,h:0.62,fill:{color:m.color,transparency:m.color===C.green?10:0}});
      s.addText(m.n, {x,y,w:0.52,h:0.62,fontSize:18,color:C.white,bold:true,align:"center",valign:"middle",margin:0});
      s.addText(m.head, {x:x+0.55,y,w:2.32,h:0.62,fontSize:13,color:C.white,bold:true,valign:"middle",margin:0});

      s.addText("WHAT", {x:x+0.12,y:y+0.7,w:2.7,h:0.22,fontSize:8.5,color:m.color===C.green?C.green:m.color==="B03040"?"E8A0A8":C.steel,bold:true,charSpacing:2,margin:0});
      s.addText(m.what, {x:x+0.12,y:y+0.92,w:2.7,h:0.68,fontSize:10.5,color:C.pale,margin:0});

      s.addText("IMPACT", {x:x+0.12,y:y+1.66,w:2.7,h:0.22,fontSize:8.5,color:m.color===C.green?C.green:m.color==="B03040"?"E8A0A8":C.steel,bold:true,charSpacing:2,margin:0});
      s.addText(m.impact, {x:x+0.12,y:y+1.88,w:2.7,h:0.62,fontSize:10.5,color:C.pale,margin:0});

      s.addText("FIX", {x:x+0.12,y:y+2.56,w:2.7,h:0.22,fontSize:8.5,color:m.color===C.green?C.green:m.color==="B03040"?"E8A0A8":C.steel,bold:true,charSpacing:2,margin:0});
      s.addText(m.fix, {x:x+0.12,y:y+2.78,w:2.7,h:1.2,fontSize:10.5,color:C.pale,margin:0});
    });
  }

  // SLIDE 6 — HITL Patterns
  {
    const s = pres.addSlide(); s.background = { color: C.white };
    s.addShape(pres.shapes.RECTANGLE, {x:0,y:0,w:10,h:0.82,fill:{color:C.navy}});
    s.addText("HUMAN-IN-THE-LOOP PATTERNS", {x:0.4,y:0,w:9,h:0.82,fontSize:13,color:C.white,bold:true,charSpacing:3,valign:"middle",margin:0});
    s.addText("Match the pattern to the risk level and reversibility of the action", {x:0.4,y:0.9,w:9.2,h:0.3,fontSize:12,color:C.muted,italic:true,margin:0});

    const patterns = [
      {
        n:"A", head:"Approval Gate",
        flow:"Agent completes task \u2192 Creates PR/ticket \u2192 Human approves \u2192 Agent proceeds",
        when:"The next step is irreversible or high-blast-radius.",
        color: C.accent
      },
      {
        n:"B", head:"Checkpoint Review",
        flow:"Agent completes phase 1 \u2192 Human reviews output \u2192 [If approved] Agent proceeds to phase 2 \u2192 ...",
        when:"A long task has natural breakpoints where direction could be wrong.",
        color: C.teal
      },
      {
        n:"C", head:"Exception Escalation",
        flow:"Agent runs autonomously \u2192 Detects anomaly/uncertainty \u2192 Pauses and notifies human \u2192 Human resolves \u2192 Agent continues",
        when:"A well-understood task that may hit edge cases requiring human judgment.",
        color: C.green
      },
      {
        n:"D", head:"Spot Check",
        flow:"Agent runs autonomously \u2192 Random sample of outputs reviewed by human",
        when:"Volume is high, individual items are low-risk, systematic quality assurance is needed.",
        color: C.steel
      },
    ];

    const cols = [0.35, 5.1];
    for (let i = 0; i < 4; i++) {
      const x = cols[i % 2], y = 1.28 + Math.floor(i / 2) * 2.0, w = 4.55, h = 1.82;
      const p = patterns[i];
      s.addShape(pres.shapes.RECTANGLE, {x,y,w,h,fill:{color:C.offWhite},shadow:shadow()});
      s.addShape(pres.shapes.RECTANGLE, {x,y,w:0.44,h,fill:{color:p.color}});
      s.addText(p.n, {x,y,w:0.44,h:0.56,fontSize:22,color:C.white,bold:true,align:"center",valign:"middle",margin:0});
      s.addText(p.head, {x:x+0.54,y:y+0.06,w:w-0.64,h:0.36,fontSize:13,color:C.navy,bold:true,margin:0});
      s.addShape(pres.shapes.RECTANGLE, {x:x+0.12,y:y+0.52,w:w-0.2,h:0.62,fill:{color:p.color,transparency:88}});
      s.addText(p.flow, {x:x+0.18,y:y+0.54,w:w-0.3,h:0.58,fontSize:9.5,color:p.color,italic:true,margin:0});
      s.addText("Use when: "+p.when, {x:x+0.54,y:y+1.24,w:w-0.64,h:0.5,fontSize:10.5,color:C.muted,margin:0});
    }
  }

  // SLIDE 7 — Agent-to-Agent Review (Evaluator Pattern)
  {
    const s = pres.addSlide(); s.background = { color: C.offWhite };
    s.addShape(pres.shapes.RECTANGLE, {x:0,y:0,w:10,h:0.82,fill:{color:C.teal}});
    s.addShape(pres.shapes.RECTANGLE, {x:0,y:0,w:0.35,h:0.82,fill:{color:C.navy}});
    s.addText("AGENT-TO-AGENT REVIEW  \u00B7  The Evaluator Pattern", {x:0.5,y:0,w:9.1,h:0.82,fontSize:12,color:C.white,bold:true,charSpacing:2,valign:"middle",margin:0});
    s.addText("\u201CUse a dedicated evaluator agent to review generator agent output before it reaches a human.\u201D  \u2014 Anthropic & Spotify Engineering", {x:0.4,y:0.9,w:9.2,h:0.3,fontSize:11,color:C.muted,italic:true,margin:0});

    // Generator box
    s.addShape(pres.shapes.RECTANGLE, {x:0.5,y:1.35,w:2.5,h:2.8,fill:{color:C.white},shadow:shadow()});
    s.addShape(pres.shapes.RECTANGLE, {x:0.5,y:1.35,w:2.5,h:0.5,fill:{color:C.navy}});
    s.addText("Generator\nAgent", {x:0.5,y:1.35,w:2.5,h:0.5,fontSize:13,color:C.white,bold:true,align:"center",valign:"middle",margin:0});
    s.addText("\u2022 Reads spec and context\n\u2022 Makes code changes\n\u2022 Runs build locally\n\u2022 Self-corrects on errors\n\u2022 Bounded scope", {x:0.62,y:1.92,w:2.26,h:2.0,fontSize:11,color:C.text,margin:0});

    s.addText("\u2192", {x:3.05,y:2.52,w:0.5,h:0.45,fontSize:22,color:C.teal,align:"center",margin:0});

    // Evaluator box
    s.addShape(pres.shapes.RECTANGLE, {x:3.6,y:1.35,w:2.8,h:2.8,fill:{color:C.white},shadow:shadow()});
    s.addShape(pres.shapes.RECTANGLE, {x:3.6,y:1.35,w:2.8,h:0.5,fill:{color:C.teal}});
    s.addText("Evaluator Agent", {x:3.6,y:1.35,w:2.8,h:0.5,fontSize:13,color:C.white,bold:true,align:"center",valign:"middle",margin:0});
    const vchecks = ["Functional requirements (from spec)","Coding standards (from rules file)","Test coverage (from DoD)","Security checklist","Performance constraints"];
    vchecks.forEach((v,j) => {
      s.addText("\u2713  "+v, {x:3.72,y:1.92+j*0.42,w:2.56,h:0.38,fontSize:10.5,color:C.text,margin:0});
    });

    s.addText("\u2192", {x:6.45,y:2.52,w:0.5,h:0.45,fontSize:22,color:C.green,align:"center",margin:0});

    // Outcome split
    s.addShape(pres.shapes.RECTANGLE, {x:7.0,y:1.35,w:2.65,h:2.8,fill:{color:C.white},shadow:shadow()});
    s.addShape(pres.shapes.RECTANGLE, {x:7.0,y:1.35,w:2.65,h:0.5,fill:{color:C.green}});
    s.addText("Outcome", {x:7.0,y:1.35,w:2.65,h:0.5,fontSize:13,color:C.white,bold:true,align:"center",valign:"middle",margin:0});
    const outcomes2 = [
      {l:"\u2713 Passes",sub:"Moves to human review",c:C.green},
      {l:"\u21BA Fails",sub:"Returns to generator\nwith specific critique",c:C.accent},
    ];
    outcomes2.forEach((o,i) => {
      const y = 1.92 + i * 1.18;
      s.addShape(pres.shapes.RECTANGLE, {x:7.1,y,w:2.45,h:1.0,fill:{color:o.c,transparency:o.c===C.green?10:20}});
      s.addText(o.l, {x:7.1,y,w:2.45,h:0.46,fontSize:13,color:C.white,bold:true,align:"center",valign:"middle",margin:0});
      s.addText(o.sub, {x:7.1,y:y+0.46,w:2.45,h:0.5,fontSize:10,color:C.pale,align:"center",margin:0});
    });

    // Why it works
    s.addShape(pres.shapes.RECTANGLE, {x:0.35,y:4.32,w:9.3,h:1.1,fill:{color:C.navy},shadow:shadow()});
    s.addText("WHY THIS WORKS", {x:0.5,y:4.36,w:2.0,h:0.28,fontSize:10,color:C.iceBlue,bold:true,charSpacing:2,margin:0});
    s.addText("Evaluator agents apply checklists consistently at scale. They catch pattern-matching failures (missed tests, lint issues, missing error handling) before the human reviewer ever sees the PR. Human reviewers spend their time on architectural and business logic questions \u2014 not mechanical checks.", {x:0.5,y:4.66,w:9.0,h:0.68,fontSize:10.5,color:C.pale,margin:0});
  }

  // SLIDE 8 — Interrupt Conditions & PR Standards
  {
    const s = pres.addSlide(); s.background = { color: C.navy };
    s.addText("INTERRUPT CONDITIONS  \u00B7  PR STANDARDS", {x:0.4,y:0.22,w:9,h:0.45,fontSize:13,color:C.iceBlue,bold:true,charSpacing:3,margin:0});
    s.addText("Define when an agent must stop before deployment \u2014 and what every agent PR must contain", {x:0.4,y:0.72,w:9,h:0.36,fontSize:13,color:C.white,italic:true,margin:0});

    // Left: interrupt conditions
    s.addShape(pres.shapes.RECTANGLE, {x:0.35,y:1.2,w:4.6,h:4.25,fill:{color:C.mid,transparency:18},shadow:shadow()});
    s.addShape(pres.shapes.RECTANGLE, {x:0.35,y:1.2,w:4.6,h:0.48,fill:{color:C.accent,transparency:10}});
    s.addText("INTERRUPT CONDITIONS", {x:0.35,y:1.2,w:4.6,h:0.48,fontSize:11,color:C.white,bold:true,align:"center",valign:"middle",charSpacing:2,margin:0});

    const conditions = [
      {cond:"Proposed change touches > 50 files",   action:"pause_and_notify_lead"},
      {cond:"Test coverage drops below threshold",  action:"pause_and_notify_engineer"},
      {cond:"Change touches auth or authz code",    action:"require_security_review"},
      {cond:"External API call to non-allowlisted domain", action:"pause_and_notify_architect"},
      {cond:"Agent confidence below 0.7 on any decision", action:"pause_and_request_clarification"},
    ];
    conditions.forEach((c,i) => {
      const y = 1.78 + i * 0.72;
      s.addShape(pres.shapes.RECTANGLE, {x:0.47,y,w:4.36,h:0.62,fill:{color:C.navy}});
      s.addText("\u26A0 "+c.cond, {x:0.56,y:y+0.04,w:4.18,h:0.28,fontSize:10,color:"E8A0A8",margin:0});
      s.addText("\u21B3 "+c.action, {x:0.56,y:y+0.32,w:4.18,h:0.26,fontSize:9.5,color:C.iceBlue,fontFace:"Consolas",margin:0});
    });

    // Right: PR description standard
    s.addShape(pres.shapes.RECTANGLE, {x:5.15,y:1.2,w:4.5,h:4.25,fill:{color:C.mid,transparency:18},shadow:shadow()});
    s.addShape(pres.shapes.RECTANGLE, {x:5.15,y:1.2,w:4.5,h:0.48,fill:{color:C.teal,transparency:10}});
    s.addText("PR DESCRIPTION STANDARD", {x:5.15,y:1.2,w:4.5,h:0.48,fontSize:11,color:C.white,bold:true,align:"center",valign:"middle",charSpacing:2,margin:0});

    const prFields = [
      {field:"## What changed",   note:"Plain English summary of what the code does differently"},
      {field:"## Why",            note:"Link to PRD/ticket; business or technical rationale"},
      {field:"## Alternatives considered", note:"What other approaches were evaluated and why this one was chosen"},
      {field:"## Agent confidence", note:"[High/Medium/Low] \u2014 What the agent is uncertain about"},
      {field:"## Reviewer focus", note:"What the agent specifically wants the human reviewer to check"},
    ];
    prFields.forEach((f,i) => {
      const y = 1.78 + i * 0.72;
      s.addShape(pres.shapes.RECTANGLE, {x:5.27,y,w:4.26,h:0.62,fill:{color:C.navy}});
      s.addText(f.field, {x:5.36,y:y+0.04,w:4.08,h:0.26,fontSize:10,color:C.iceBlue,fontFace:"Consolas",margin:0});
      s.addText(f.note,  {x:5.36,y:y+0.32,w:4.08,h:0.26,fontSize:9.5,color:C.pale,margin:0});
    });

    s.addText("\u201CAgent confidence\u201D and \u201CReviewer focus\u201D are the most important fields \u2014 they direct human attention to where it is most needed.", {
      x:0.35,y:5.35,w:9.3,h:0.24,fontSize:9.5,color:C.muted,italic:true,margin:0
    });
  }

  // SLIDE 9 — Review Cycle Design Principles
  {
    const s = pres.addSlide(); s.background = { color: C.white };
    s.addShape(pres.shapes.RECTANGLE, {x:0,y:0,w:10,h:0.82,fill:{color:C.navy}});
    s.addText("REVIEW CYCLE DESIGN PRINCIPLES", {x:0.4,y:0,w:9,h:0.82,fontSize:13,color:C.white,bold:true,charSpacing:3,valign:"middle",margin:0});
    s.addText("These principles apply whether you are reviewing code, specs, architecture documents, or documentation", {x:0.4,y:0.9,w:9.2,h:0.3,fontSize:12,color:C.muted,italic:true,margin:0});

    const principles = [
      {head:"Match review granularity to risk",        body:"Low-risk, reversible changes (formatting, docs, test additions) can be auto-merged after agent review. High-risk, irreversible changes (schema migrations, security, public API) require human approval."},
      {head:"Humans review decisions, not diffs",       body:"A human reviewer should be answering: \u201CIs this the right approach?\u201D \u2014 not \u201CDid the agent make a typo?\u201D Automated checks handle the latter."},
      {head:"The agent must explain its reasoning",    body:"Every agent-generated PR must include what changed, why, what alternatives were considered, and what the agent is uncertain about. This is the context a human reviewer needs."},
      {head:"Never skip the gate for speed",           body:"Speed pressure is the most common reason review gates get bypassed. Gates exist for production incidents, not convenience. If your gates are too slow, fix the gates \u2014 don\u2019t remove them."},
      {head:"Review SLAs prevent pipeline stalls",     body:"If human review is required, define SLAs. An agent waiting indefinitely for human approval blocks the pipeline. Escalate automatically after SLA breach."},
      {head:"Review audit log for regulated changes",  body:"Log every review decision: who reviewed, when, what they approved/rejected, what comments were left. Required for change management in regulated environments."},
    ];

    const cols = [0.35, 5.1];
    principles.forEach((p,i) => {
      const x = cols[i % 2], y = 1.28 + Math.floor(i / 2) * 1.45, w = 4.55, h = 1.3;
      s.addShape(pres.shapes.RECTANGLE, {x,y,w,h,fill:{color:C.offWhite},shadow:shadow()});
      s.addShape(pres.shapes.RECTANGLE, {x,y,w:0.06,h,fill:{color:C.teal}});
      s.addText(p.head, {x:x+0.16,y:y+0.08,w:w-0.22,h:0.36,fontSize:12,color:C.navy,bold:true,margin:0});
      s.addText(p.body, {x:x+0.16,y:y+0.5,w:w-0.22,h:0.72,fontSize:11,color:C.muted,margin:0});
    });
  }

  // SLIDE 10 — Spotify Results
  {
    const s = pres.addSlide(); s.background = { color: C.navy };
    s.addText("REAL RESULTS  \u00B7  SPOTIFY HONK  \u00B7  2024\u20132026", {x:0.4,y:0.22,w:9,h:0.45,fontSize:13,color:C.iceBlue,bold:true,charSpacing:3,margin:0});
    s.addText("What happens when you build proper review and verification loops into an agentic pipeline", {x:0.4,y:0.72,w:9,h:0.36,fontSize:17,color:C.white,italic:true,margin:0});

    const stats = [
      {n:"~50%",l:"of all PRs automated",s:"by agents since mid-2024",c:C.accent},
      {n:"1,500+",l:"agent-generated PRs",s:"successfully merged",c:C.teal},
      {n:"50+",  l:"features shipped",s:"in 2025 via agent pipeline",c:C.green},
    ];
    stats.forEach((st,i) => {
      const x = 0.35 + i * 3.15;
      s.addShape(pres.shapes.RECTANGLE, {x,y:1.28,w:2.95,h:1.75,fill:{color:st.c},shadow:shadow()});
      s.addText(st.n, {x,y:1.32,w:2.95,h:0.82,fontSize:40,color:C.white,bold:true,align:"center",margin:0});
      s.addText(st.l, {x,y:2.14,w:2.95,h:0.36,fontSize:12.5,color:C.white,bold:true,align:"center",margin:0});
      s.addText(st.s, {x,y:2.5,w:2.95,h:0.38,fontSize:11,color:C.pale,align:"center",italic:true,margin:0});
    });

    const lessons = [
      {head:"Sandboxing = predictability",        body:"Agent in container with minimal permissions and binaries. Intentional restriction \u2192 more predictable behavior + security."},
      {head:"Verifier \u2260 optional",            body:"Without verifiers, agents produced code that \u201Csimply doesn\u2019t work.\u201D The verification loop isn\u2019t overhead \u2014 it\u2019s what makes automation viable."},
      {head:"Agent review spans all artifacts",   body:"Review was applied not just to code PRs but to specs, documentation, and architecture proposals \u2014 catching issues before they became code."},
      {head:"Coverage requirement changed everything", body:"Requiring test coverage on changed files eliminated failure mode 2. Agents could no longer hide wrong behavior behind passing CI."},
    ];
    lessons.forEach((l,i) => {
      const col = i % 2, row = Math.floor(i / 2);
      const x = col === 0 ? 0.35 : 5.15, y = 3.18 + row * 1.06, w = 4.6, h = 0.94;
      s.addShape(pres.shapes.RECTANGLE, {x,y,w,h,fill:{color:C.mid,transparency:15}});
      s.addShape(pres.shapes.RECTANGLE, {x,y,w:0.06,h,fill:{color:C.iceBlue}});
      s.addText(l.head, {x:x+0.16,y:y+0.06,w:w-0.22,h:0.3,fontSize:12,color:C.iceBlue,bold:true,margin:0});
      s.addText(l.body, {x:x+0.16,y:y+0.42,w:w-0.22,h:0.46,fontSize:10.5,color:C.pale,margin:0});
    });
  }

  // SLIDE 11 — Lab
  {
    const s = pres.addSlide(); s.background = { color: C.white };
    s.addShape(pres.shapes.RECTANGLE, {x:0,y:0,w:10,h:0.82,fill:{color:C.teal}});
    s.addText("LAB EXERCISE  \u00B7  45 MINUTES", {x:0.4,y:0,w:9,h:0.82,fontSize:13,color:C.white,bold:true,charSpacing:3,valign:"middle",margin:0});
    s.addText("Three-Part Exercise: Design, Expand, Educate", {x:0.4,y:0.95,w:9.2,h:0.46,fontSize:19,color:C.navy,bold:true,margin:0});
    const steps = [
      {n:"1",t:"Design a review cycle (lint scenario)",min:"15 min",
       d:"Your team wants an agent to fix all flake8 lint errors across a 200,000-line Python codebase (~800 files). Map the review cycle: where are the human gates? Write the interrupt conditions, the evaluator agent\u2019s checklist, the PR description template, and the 2am escalation path."},
      {n:"2",t:"Define review for 4 artifact types",min:"15 min",
       d:"For each: (a) a PRD for a new feature, (b) an architecture proposal for a new service, (c) the API docs after a sprint, (d) a new team member\u2019s first PR \u2014 define: what does the agent review it against? What structured output does it produce? Where is the human gate?"},
      {n:"3",t:"Education scenario: onboard a new developer",min:"15 min",
       d:"A developer has just joined your team and needs to understand the authentication flow. Write the prompt you would give Claude Code to educate them. What context (CLAUDE.md, PRODUCT.md, specific files) would you make sure is loaded? What would the agent get right that a wiki page would not?"},
    ];
    steps.forEach((st,i) => {
      const y = 1.52 + i * 1.32;
      s.addShape(pres.shapes.RECTANGLE, {x:0.35,y,w:9.3,h:1.2,fill:{color:C.offWhite},shadow:shadow()});
      s.addShape(pres.shapes.RECTANGLE, {x:0.35,y,w:0.52,h:1.2,fill:{color:C.teal}});
      s.addText(st.n, {x:0.35,y,w:0.52,h:1.2,fontSize:22,color:C.white,bold:true,align:"center",valign:"middle",margin:0});
      s.addText(st.t,  {x:0.97,y:y+0.06,w:4.5,h:0.32,fontSize:12.5,color:C.teal,bold:true,margin:0});
      s.addText("("+st.min+")",{x:5.47,y:y+0.06,w:0.85,h:0.32,fontSize:11,color:C.muted,italic:true,margin:0});
      s.addText(st.d,  {x:0.97,y:y+0.46,w:8.55,h:0.66,fontSize:10.5,color:C.muted,margin:0});
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
    s.addText([
      "Q1.  In the lint scenario, who is accountable if an agent-generated change breaks production at 2am?",
      "Q2.  Which SDLC artifact on your team has never been formally reviewed? What would an agent find if you pointed one at it today?",
      "Q3.  If you deployed an evaluator agent on your PR process this week, what would it need to check?",
      "Q4.  What question would you most want to ask an agent about your own codebase right now?",
    ].join("\n\n"), {x:0.5,y:1.4,w:5.1,h:3.1,fontSize:11.5,color:C.pale,margin:0});

    s.addShape(pres.shapes.RECTANGLE, {x:6.05,y:0.82,w:3.6,h:3.82,fill:{color:C.mid,transparency:20},shadow:shadow()});
    s.addShape(pres.shapes.RECTANGLE, {x:6.05,y:0.82,w:3.6,h:0.48,fill:{color:C.accent,transparency:10}});
    s.addText("KEY TAKEAWAYS", {x:6.05,y:0.82,w:3.6,h:0.48,fontSize:11,color:C.white,bold:true,charSpacing:2,align:"center",valign:"middle",margin:0});
    s.addText([
      "\u00B7 Agents review ALL SDLC artifacts, not just code",
      "\u00B7 Match HITL pattern to risk and reversibility",
      "\u00B7 Evaluator agent catches failures before humans",
      "\u00B7 Interrupt conditions must be defined upfront",
      "\u00B7 Agents as educators \u2014 codebase, decisions, process",
      "\u00B7 PR standards: confidence + reviewer focus fields",
      "\u00B7 Review SLAs prevent pipeline stalls",
    ].join("\n\n"), {x:6.2,y:1.4,w:3.35,h:3.1,fontSize:11.5,color:C.pale,margin:0});

    s.addShape(pres.shapes.RECTANGLE, {x:0.35,y:4.75,w:9.3,h:0.62,fill:{color:C.accent,transparency:18}});
    s.addText("NEXT  \u00B7  Module 06: Review Cycles, Hygiene & Continuous Improvement  \u2014  ADRs, supervised development, quality gates", {x:0.35,y:4.75,w:9.3,h:0.62,fontSize:11.5,color:C.white,bold:true,align:"center",valign:"middle",margin:0});
  }

  await pres.writeFile({ fileName: "Module_05_Testing_CICD.pptx" });
  console.log("\u2705 Module 5 written");
}
build().catch(console.error);
