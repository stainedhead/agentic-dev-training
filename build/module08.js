const pptxgen = require("pptxgenjs");
const {
  FaLayerGroup, FaCodeBranch, FaHistory, FaRedo
} = require("react-icons/fa");

const { C, shadow, icon } = require("./shared");

async function build() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.title = "Module 8: Review Hygiene & Continuous Improvement";

  // SLIDE 1 — Title
  {
    const s = pres.addSlide(); s.background = { color: C.navy };
    s.addShape(pres.shapes.RECTANGLE, { x:0, y:0, w:0.18, h:5.625, fill:{color:C.accent} });
    s.addText("ENTERPRISE AGENTIC PRACTICES", { x:0.4, y:0.32, w:9.2, h:0.35, fontSize:10, color:C.iceBlue, bold:true, charSpacing:4, margin:0 });
    s.addShape(pres.shapes.RECTANGLE, { x:0.4, y:0.82, w:1.5, h:0.38, fill:{color:C.accent} });
    s.addText("MODULE 08", { x:0.4, y:0.82, w:1.5, h:0.38, fontSize:11, color:C.white, bold:true, align:"center", valign:"middle", margin:0 });
    s.addText("Review Hygiene &\nContinuous\nImprovement", { x:0.4, y:1.22, w:7.0, h:2.2, fontSize:40, color:C.white, bold:true, margin:0 });
    s.addText("HITL tier design, AI-generated PR review, living ADRs, and the improvement loop that keeps automation accurate", { x:0.4, y:3.52, w:7.5, h:0.6, fontSize:14, color:C.iceBlue, italic:true, margin:0 });
    s.addShape(pres.shapes.RECTANGLE, { x:0.4, y:4.2, w:3.5, h:0.04, fill:{color:C.accent} });
    s.addText([
      {text:"Duration: ",options:{bold:true,color:C.muted}},{text:"75\u201390 min  ",options:{color:C.muted}},
      {text:"  |  ",options:{color:C.muted}},{text:"Level: ",options:{bold:true,color:C.muted}},{text:"Intermediate",options:{color:C.muted}}
    ], { x:0.4, y:4.38, w:5, h:0.38, fontSize:13, margin:0 });

    // Right: 4 stacked practice badges
    const badges = [
      { label:"HITL Tiers",        color:C.accent },
      { label:"PR Review",         color:C.teal },
      { label:"Living ADRs",       color:C.green },
      { label:"Improvement Loop",  color:C.steel },
    ];
    for (let i = 0; i < badges.length; i++) {
      const b = badges[i];
      const y = 0.65 + i * 1.1;
      s.addShape(pres.shapes.RECTANGLE, { x:7.6, y, w:2.05, h:0.82, fill:{color:b.color}, shadow:shadow() });
      s.addText(b.label, { x:7.6, y, w:2.05, h:0.82, fontSize:13, color:C.white, bold:true, align:"center", valign:"middle", margin:0 });
    }
  }

  // SLIDE 2 — Learning Objectives
  {
    const s = pres.addSlide(); s.background = { color: C.offWhite };
    s.addShape(pres.shapes.RECTANGLE, { x:0, y:0, w:10, h:0.82, fill:{color:C.navy} });
    s.addText("LEARNING OBJECTIVES", { x:0.4, y:0, w:9.2, h:0.82, fontSize:13, color:C.white, bold:true, charSpacing:3, valign:"middle", margin:0 });
    s.addText("By the end of this module you will be able to:", { x:0.35, y:0.9, w:9.3, h:0.28, fontSize:11, color:C.muted, italic:true, margin:0 });

    const objs = [
      { icon: FaLayerGroup,  color: C.accent, title: "HITL Tier Architecture",  body: "Design a three-tier human oversight system that matches review level to decision risk" },
      { icon: FaCodeBranch,  color: C.teal,   title: "AI PR Review",            body: "Apply the six dimensions of AI-generated PR review to focus human attention where it matters" },
      { icon: FaHistory,     color: C.green,  title: "Living ADRs",             body: "Maintain Architecture Decision Records as persistent agent context, not static documentation" },
      { icon: FaRedo,        color: C.steel,  title: "Improvement Loop",        body: "Build and run a continuous improvement cycle for your agentic development process" },
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

  // SLIDE 3 — The Drift Problem
  {
    const s = pres.addSlide(); s.background = { color: C.navy };
    s.addText("WITHOUT IMPROVEMENT LOOPS, AUTOMATION DRIFTS", { x:0.4, y:0.22, w:9.2, h:0.45, fontSize:13, color:C.iceBlue, bold:true, charSpacing:3, margin:0 });
    s.addText("A rules file written in January stops reflecting team standards by March. An evaluator from six months ago rejects correct code.", { x:0.4, y:0.72, w:9.2, h:0.45, fontSize:13, color:C.white, italic:true, margin:0 });

    // Left column: WITHOUT
    s.addShape(pres.shapes.RECTANGLE, { x:0.35, y:1.28, w:4.4, h:3.72, fill:{color:C.mid, transparency:18}, shadow:shadow() });
    s.addShape(pres.shapes.RECTANGLE, { x:0.35, y:1.28, w:4.4, h:0.44, fill:{color:C.red, transparency:10} });
    s.addText("WITHOUT IMPROVEMENT LOOPS", { x:0.35, y:1.28, w:4.4, h:0.44, fontSize:10.5, color:C.white, bold:true, charSpacing:2, align:"center", valign:"middle", margin:0 });

    const withoutItems = [
      "Evaluator passes code violating current standards",
      "ADRs diverge from actual implementation decisions",
      "HITL thresholds miscalibrated \u2014 too tight or too loose",
      "Rules file reflects old patterns, new ones go unchecked",
      "Team loses confidence in automated review",
    ];
    for (let i = 0; i < withoutItems.length; i++) {
      const y = 1.84 + i * 0.6;
      s.addShape(pres.shapes.OVAL, { x:0.52, y:y+0.1, w:0.16, h:0.16, fill:{color:C.red} });
      s.addText(withoutItems[i], { x:0.8, y, w:3.78, h:0.52, fontSize:11, color:C.pale, valign:"middle", margin:0 });
    }

    // Right column: WITH
    s.addShape(pres.shapes.RECTANGLE, { x:5.25, y:1.28, w:4.4, h:3.72, fill:{color:C.mid, transparency:18}, shadow:shadow() });
    s.addShape(pres.shapes.RECTANGLE, { x:5.25, y:1.28, w:4.4, h:0.44, fill:{color:C.green, transparency:10} });
    s.addText("WITH IMPROVEMENT LOOPS", { x:5.25, y:1.28, w:4.4, h:0.44, fontSize:10.5, color:C.white, bold:true, charSpacing:2, align:"center", valign:"middle", margin:0 });

    const withItems = [
      "Evaluator criteria updated monthly from PR pattern data",
      "ADRs drafted by agents from Slack discussions, reviewed by engineers",
      "HITL tiers re-calibrated quarterly from escalation rate data",
      "Rules file versioned, reviewed, and updated on a cadence",
      "Team trust in automation grows as accuracy improves",
    ];
    for (let i = 0; i < withItems.length; i++) {
      const y = 1.84 + i * 0.6;
      s.addShape(pres.shapes.OVAL, { x:5.42, y:y+0.1, w:0.16, h:0.16, fill:{color:C.green} });
      s.addText(withItems[i], { x:5.7, y, w:3.78, h:0.52, fontSize:11, color:C.pale, valign:"middle", margin:0 });
    }

    s.addText("This is kaizen applied to development process: small, continuous improvements compounding over time rather than large, infrequent overhauls.", {
      x:0.35, y:5.35, w:9.3, h:0.24, fontSize:9.5, color:C.muted, italic:true, margin:0
    });
  }

  // SLIDE 4 — HITL Tier Architecture
  {
    const s = pres.addSlide(); s.background = { color: C.white };
    s.addShape(pres.shapes.RECTANGLE, { x:0, y:0, w:10, h:0.82, fill:{color:C.navy} });
    s.addText("HITL TIER ARCHITECTURE  \u2014  MATCH OVERSIGHT TO DECISION RISK", { x:0.4, y:0, w:9.2, h:0.82, fontSize:13, color:C.white, bold:true, charSpacing:3, valign:"middle", margin:0 });
    s.addText("Not all decisions carry the same risk. A uniform policy either creates bottlenecks or creates gaps.", { x:0.4, y:0.9, w:9.2, h:0.3, fontSize:12, color:C.muted, italic:true, margin:0 });

    const tiers = [
      {
        color: C.green, num: "Tier 1",
        head: "Fully Automated", sub: "No human required",
        what: "Reversible, low blast-radius, well-understood",
        examples: [
          "Style / formatting fixes",
          "Test additions without behaviour change",
          "Doc updates for internal APIs",
          "Dependency upgrades (no API changes, tests pass)",
        ],
        note: "Agent acts immediately. No gate.",
      },
      {
        color: C.amber, num: "Tier 2",
        head: "Soft Gate", sub: "Human notified, not required",
        what: "Medium-risk or partially reversible",
        examples: [
          "New feature matching approved spec",
          "Refactoring within a module (full coverage)",
          "Config changes in non-production",
          "Dependency upgrades with API changes",
        ],
        note: "Agent acts, human has a window to intervene.",
      },
      {
        color: C.red, num: "Tier 3",
        head: "Hard Gate", sub: "Human approval before action",
        what: "Irreversible, high blast-radius, or cross-team",
        examples: [
          "Schema migrations on production data",
          "Auth / crypto code changes",
          "External API contract changes",
          "Changes touching > N files \u00B7 Production deploys",
        ],
        note: "Agent waits. No action without approval.",
      },
    ];

    for (let i = 0; i < tiers.length; i++) {
      const t = tiers[i];
      const x = 0.35 + i * 3.12;
      const w = 3.0, h = 4.2;
      s.addShape(pres.shapes.RECTANGLE, { x, y:1.26, w, h, fill:{color:C.offWhite}, shadow:shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y:1.26, w, h:0.52, fill:{color:t.color} });
      s.addText(t.num, { x, y:1.26, w, h:0.28, fontSize:10, color:C.white, bold:true, align:"center", valign:"middle", margin:0 });
      s.addText(t.head, { x, y:1.5, w, h:0.28, fontSize:12, color:C.white, bold:true, align:"center", margin:0 });
      s.addShape(pres.shapes.RECTANGLE, { x, y:1.78, w, h:0.24, fill:{color:t.color, transparency:40} });
      s.addText(t.sub, { x, y:1.78, w, h:0.24, fontSize:9.5, color:C.white, italic:true, align:"center", valign:"middle", margin:0 });
      s.addText("What:", { x:x+0.14, y:2.1, w:w-0.28, h:0.22, fontSize:9.5, color:C.muted, bold:true, margin:0 });
      s.addText(t.what, { x:x+0.14, y:2.3, w:w-0.28, h:0.3, fontSize:10, color:C.text, margin:0 });
      s.addText("Examples:", { x:x+0.14, y:2.68, w:w-0.28, h:0.22, fontSize:9.5, color:C.muted, bold:true, margin:0 });
      for (let j = 0; j < t.examples.length; j++) {
        s.addText("\u00B7  " + t.examples[j], { x:x+0.14, y:2.9 + j * 0.28, w:w-0.28, h:0.26, fontSize:9.5, color:C.text, margin:0 });
      }
      s.addShape(pres.shapes.RECTANGLE, { x:x+0.1, y:4.16, w:w-0.2, h:0.22, fill:{color:t.color, transparency:30} });
      s.addText(t.note, { x:x+0.1, y:4.16, w:w-0.2, h:0.22, fontSize:9, color:C.text, italic:true, align:"center", valign:"middle", margin:0 });
    }

    s.addText("The tier system belongs in your CLAUDE.md \u2014 an explicit policy that agents, engineers, and stakeholders can all read.", {
      x:0.35, y:5.35, w:9.3, h:0.24, fontSize:9.5, color:C.muted, italic:true, margin:0
    });
  }

  // SLIDE 5 — Reviewing AI-Generated PRs
  {
    const s = pres.addSlide(); s.background = { color: C.navy };
    s.addText("THE SIX DIMENSIONS OF AI-GENERATED PR REVIEW", { x:0.4, y:0.22, w:9.2, h:0.45, fontSize:13, color:C.iceBlue, bold:true, charSpacing:3, margin:0 });
    s.addText("An agent makes mistakes through hallucination, specification drift, or over-literal interpretation \u2014 not human distraction.", { x:0.4, y:0.72, w:9.2, h:0.36, fontSize:13, color:C.white, italic:true, margin:0 });

    const dims = [
      { n:"1", color:C.accent, title:"Scope alignment",     body:"Does the change do exactly what the spec required? Agents tend toward overreach (solving adjacent problems) or underreach (implementing the literal instruction while missing intent)." },
      { n:"2", color:C.teal,   title:"Intent clarity",      body:"Can you explain in one sentence why this change was made? If not, the PR description is insufficient \u2014 regardless of code correctness." },
      { n:"3", color:C.green,  title:"AC coverage",         body:"Map each acceptance criterion to a test. Agents generate tests that pass but don\u2019t test what the AC actually requires." },
      { n:"4", color:C.steel,  title:"Hallucinated APIs",   body:"Does every function and import reference something that actually exists? Agents occasionally invent plausible-looking APIs. Linting catches most; not all." },
      { n:"5", color:C.amber,  title:"Technical debt",      body:"Does the implementation follow current architectural patterns? Agents trained on mixed old/new code may reproduce deprecated patterns." },
      { n:"6", color:C.red,    title:"Behaviour match",     body:"Does the code do what the description says? Read description first, verify code matches. Catches subtle behavioural mismatches." },
    ];

    const cols = [0.35, 3.5, 6.65];
    for (let i = 0; i < dims.length; i++) {
      const d = dims[i];
      const col = i % 3;
      const row = Math.floor(i / 3);
      const x = cols[col], y = 1.24 + row * 2.08, w = 2.95, h = 1.88;
      s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill:{color:C.mid, transparency:18}, shadow:shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y, w:0.36, h:0.36, fill:{color:d.color} });
      s.addText(d.n, { x, y, w:0.36, h:0.36, fontSize:13, color:C.white, bold:true, align:"center", valign:"middle", margin:0 });
      s.addText(d.title, { x:x+0.44, y:y+0.04, w:w-0.52, h:0.3, fontSize:12, color:d.color, bold:true, margin:0 });
      s.addText(d.body, { x:x+0.12, y:y+0.44, w:w-0.24, h:1.36, fontSize:10.5, color:C.pale, margin:0 });
    }
  }

  // SLIDE 6 — Architecture Decision Records
  {
    const s = pres.addSlide(); s.background = { color: C.offWhite };
    s.addShape(pres.shapes.RECTANGLE, { x:0, y:0, w:10, h:0.82, fill:{color:C.green} });
    s.addText("ARCHITECTURE DECISION RECORDS: LIVING AGENT CONTEXT", { x:0.4, y:0, w:9.2, h:0.82, fontSize:13, color:C.white, bold:true, charSpacing:3, valign:"middle", margin:0 });
    s.addText("ADRs are not documentation artifacts \u2014 they are persistent context that agents use to understand why constraints exist.", { x:0.4, y:0.9, w:9.2, h:0.3, fontSize:12, color:C.muted, italic:true, margin:0 });

    // Left: ADR template code block
    s.addShape(pres.shapes.RECTANGLE, { x:0.35, y:1.28, w:5.0, h:4.1, fill:{color:C.navy}, shadow:shadow() });
    const adrTemplate = [
      "# ADR-[number]: [Short title]",
      "Status: Proposed | Accepted | Deprecated",
      "Date: YYYY-MM-DD",
      "",
      "## Context",
      "What forced this decision?",
      "",
      "## Decision",
      "What was decided, and why?",
      "",
      "## Alternatives considered",
      "What was rejected and why?",
      "",
      "## Consequences",
      "+ What becomes easier",
      "- What becomes harder / prohibited",
      "~ What must be monitored",
      "",
      "## Review trigger",
      "What would require revisiting?",
    ].join("\n");
    s.addText(adrTemplate, { x:0.52, y:1.36, w:4.66, h:3.92, fontSize:9.5, color:C.pale, fontFace:"Consolas", valign:"top", margin:0 });

    // Right: 4 principle cards
    const principles = [
      { head:"One decision per ADR",       body:"Each ADR answers one architectural question. Not a design document. Not a meeting summary." },
      { head:"Commit to adr/ folder",      body:"Version-controlled, referenced in CLAUDE.md. Agent loads on demand. Never in a wiki." },
      { head:"Agent-assisted drafting",    body:"Engineers decide in Slack. Agent summarises discussion, drafts ADR. Human reviews and merges. Sustainable." },
      { head:"Link superseded ADRs",       body:"When a decision changes, mark old ADR as superseded and link forward to the new one." },
    ];
    for (let i = 0; i < principles.length; i++) {
      const p = principles[i];
      const y = 1.28 + i * 1.02;
      s.addShape(pres.shapes.RECTANGLE, { x:5.55, y, w:4.1, h:0.92, fill:{color:C.white}, shadow:shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x:5.55, y, w:0.06, h:0.92, fill:{color:C.green} });
      s.addText(p.head, { x:5.7, y:y+0.06, w:3.88, h:0.28, fontSize:11.5, color:C.navy, bold:true, margin:0 });
      s.addText(p.body, { x:5.7, y:y+0.38, w:3.88, h:0.48, fontSize:10.5, color:C.muted, margin:0 });
    }
  }

  // SLIDE 7 — Definition of Done
  {
    const s = pres.addSlide(); s.background = { color: C.white };
    s.addShape(pres.shapes.RECTANGLE, { x:0, y:0, w:10, h:0.82, fill:{color:C.navy} });
    s.addText("AGENTIC DEFINITION OF DONE", { x:0.4, y:0, w:9.2, h:0.82, fontSize:13, color:C.white, bold:true, charSpacing:3, valign:"middle", margin:0 });
    s.addText("A DoD that exists only as a wiki page is not enforced. An agentic DoD is encoded in the evaluator\u2019s checklist.", { x:0.4, y:0.9, w:9.2, h:0.3, fontSize:12, color:C.muted, italic:true, margin:0 });

    // Left: DoD YAML code block
    s.addShape(pres.shapes.RECTANGLE, { x:0.35, y:1.28, w:4.5, h:4.0, fill:{color:C.navy}, shadow:shadow() });
    const yaml = [
      "definition_of_done:",
      "  all_tests_pass: true",
      "  coverage_threshold: 85%",
      "  no_new_lint_errors: true",
      "  spec_requirements_mapped: true",
      "  pr_description_complete: true",
      "  no_secrets_in_code: true",
      "  no_hallucinated_imports: true",
      "  adr_conflicts_checked: true",
    ].join("\n");
    s.addText(yaml, { x:0.52, y:1.38, w:4.16, h:3.8, fontSize:11, color:C.pale, fontFace:"Consolas", valign:"top", margin:0 });

    // Right: 4 principle boxes
    const dodPrinciples = [
      { head:"Automated, not aspirational",  body:"Every item the evaluator can check is one fewer thing the human reviewer spends time on." },
      { head:"Coverage threshold in DoD",    body:"85% coverage enforced at the gate. Not a guideline. The PR fails if coverage drops." },
      { head:"adr_conflicts_checked",        body:"Before merging, verify no new code contradicts an accepted ADR. The evaluator reads the ADR folder." },
      { head:"Review trigger",               body:"DoD changes require team review. Lowering the bar silently is how quality debt accumulates." },
    ];
    for (let i = 0; i < dodPrinciples.length; i++) {
      const p = dodPrinciples[i];
      const y = 1.28 + i * 1.02;
      s.addShape(pres.shapes.RECTANGLE, { x:5.15, y, w:4.5, h:0.92, fill:{color:C.offWhite}, shadow:shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x:5.15, y, w:0.06, h:0.92, fill:{color:C.navy} });
      s.addText(p.head, { x:5.3, y:y+0.06, w:4.28, h:0.28, fontSize:11.5, color:C.navy, bold:true, margin:0 });
      s.addText(p.body, { x:5.3, y:y+0.38, w:4.28, h:0.48, fontSize:10.5, color:C.muted, margin:0 });
    }
  }

  // SLIDE 8 — Continuous Improvement Loop
  {
    const s = pres.addSlide(); s.background = { color: C.navy };
    s.addText("THE CONTINUOUS IMPROVEMENT LOOP", { x:0.4, y:0.22, w:9.2, h:0.45, fontSize:13, color:C.iceBlue, bold:true, charSpacing:3, margin:0 });
    s.addText("The DevOps feedback cycle applied to the development process itself, not just the production system.", { x:0.4, y:0.72, w:9.2, h:0.36, fontSize:13, color:C.white, italic:true, margin:0 });

    const steps = [
      { label:"Deploy",   color:C.accent, desc:"Agent changes ship within HITL tier constraints. Observability captures every run." },
      { label:"Observe",  color:C.teal,   desc:"Metrics accumulate: evaluator rejection rate, escalation rate, most common failure modes, PR cycle time." },
      { label:"Review",   color:C.green,  desc:"Monthly/quarterly: are the standards accurate? Are ADRs current? Are HITL tiers calibrated? Not production review \u2014 process review." },
      { label:"Improve",  color:C.amber,  desc:"Update rules file, checklist, and HITL configuration from observed patterns. Agent summarises; human decides." },
      { label:"Repeat",   color:C.steel,  desc:"The improved configuration is the input to the next cycle. Compound returns over time." },
    ];

    const boxW = 1.7, boxH = 2.72, startX = 0.35, y = 1.22;
    for (let i = 0; i < steps.length; i++) {
      const st = steps[i];
      const x = startX + i * (boxW + 0.12);
      s.addShape(pres.shapes.RECTANGLE, { x, y, w:boxW, h:boxH, fill:{color:C.mid, transparency:18}, shadow:shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y, w:boxW, h:0.46, fill:{color:st.color} });
      s.addText(st.label, { x, y, w:boxW, h:0.46, fontSize:13, color:C.white, bold:true, align:"center", valign:"middle", margin:0 });
      s.addText(st.desc, { x:x+0.1, y:y+0.56, w:boxW-0.2, h:2.06, fontSize:10.5, color:C.pale, margin:0 });
      if (i < steps.length - 1) {
        s.addText("\u2192", { x:x+boxW, y:y+1.0, w:0.18, h:0.6, fontSize:18, color:C.iceBlue, align:"center", valign:"middle", margin:0 });
      }
    }

    s.addShape(pres.shapes.RECTANGLE, { x:0.35, y:4.1, w:9.3, h:0.98, fill:{color:C.mid, transparency:18} });
    s.addShape(pres.shapes.RECTANGLE, { x:0.35, y:4.1, w:0.06, h:0.98, fill:{color:C.iceBlue} });
    s.addText("DevOps teams who implemented measurement-driven improvement got compound returns. This is kaizen applied to development process. The improvement is incremental; the compound effect is large.", {
      x:0.52, y:4.16, w:9.0, h:0.86, fontSize:11, color:C.pale, italic:true, margin:0
    });
  }

  // SLIDE 9 — SLOs for the Development Workflow
  {
    const s = pres.addSlide(); s.background = { color: C.offWhite };
    s.addShape(pres.shapes.RECTANGLE, { x:0, y:0, w:10, h:0.82, fill:{color:C.navy} });
    s.addText("SLOs FOR YOUR AGENTIC DEVELOPMENT WORKFLOW", { x:0.4, y:0, w:9.2, h:0.82, fontSize:13, color:C.white, bold:true, charSpacing:3, valign:"middle", margin:0 });
    s.addText("Define SLOs for the coding agent workflow \u2014 objective triggers for the improvement cycle, not just production metrics.", { x:0.4, y:0.9, w:9.2, h:0.3, fontSize:12, color:C.muted, italic:true, margin:0 });

    const slos = [
      { name:"evaluator_pass_rate",   target:"85%",    window:"7d",  alert:"70%",   desc:"% of agent outputs passing evaluator on first attempt" },
      { name:"human_escalation_rate", target:"< 15%",  window:"7d",  alert:"25%",   desc:"% of tasks requiring human HITL intervention" },
      { name:"pr_cycle_time",         target:"4 h",    window:"7d",  alert:"8 h",   desc:"Median time from agent task start to PR merge" },
      { name:"adr_coverage",          target:"90%",    window:"30d", alert:"75%",   desc:"% of significant architectural decisions with ADRs" },
      { name:"rules_file_staleness",  target:"< 30 d", window:"\u2014", alert:"60 d", desc:"Days since last rules file update" },
    ];

    // Header row
    const colX = [0.35, 3.0, 4.5, 5.9, 7.2];
    const colW = [2.55, 1.4, 1.3, 1.2, 2.42];
    const headers = ["SLO", "Target", "Window", "Alert at", "Description"];
    for (let ci = 0; ci < 5; ci++) {
      s.addShape(pres.shapes.RECTANGLE, { x:colX[ci], y:1.28, w:colW[ci], h:0.4, fill:{color:C.navy} });
      s.addText(headers[ci], { x:colX[ci]+0.1, y:1.28, w:colW[ci]-0.12, h:0.4, fontSize:11, color:C.white, bold:true, valign:"middle", margin:0 });
    }

    for (let ri = 0; ri < slos.length; ri++) {
      const slo = slos[ri];
      const rowY = 1.72 + ri * 0.66;
      const bg = ri % 2 === 0 ? C.white : C.offWhite;
      const rowData = [slo.name, slo.target, slo.window, slo.alert, slo.desc];
      for (let ci = 0; ci < 5; ci++) {
        s.addShape(pres.shapes.RECTANGLE, { x:colX[ci], y:rowY, w:colW[ci], h:0.6, fill:{color:bg} });
        const isName = ci === 0;
        s.addText(rowData[ci], {
          x:colX[ci]+0.1, y:rowY, w:colW[ci]-0.12, h:0.6,
          fontSize:10.5, color:isName ? C.navy : C.muted,
          bold:isName, fontFace:isName ? "Consolas" : undefined,
          valign:"middle", margin:0
        });
      }
    }

    s.addText("When an alert fires, it triggers the Review step of the improvement loop \u2014 not an incident response. These are process health signals, not production alarms.", {
      x:0.35, y:5.35, w:9.3, h:0.24, fontSize:9.5, color:C.muted, italic:true, margin:0
    });
  }

  // SLIDE 10 — Enterprise Considerations
  {
    const s = pres.addSlide(); s.background = { color: C.white };
    s.addShape(pres.shapes.RECTANGLE, { x:0, y:0, w:10, h:0.82, fill:{color:C.navy} });
    s.addText("ENTERPRISE CONSIDERATIONS", { x:0.4, y:0, w:9.2, h:0.82, fontSize:13, color:C.white, bold:true, charSpacing:3, valign:"middle", margin:0 });

    const cards = [
      { color:C.accent, title:"ADR governance",           body:"Who can approve an ADR? Who can deprecate one? ADRs are architectural policy. Changes without review silently lower the quality bar." },
      { color:C.teal,   title:"Rules file as policy",     body:"CLAUDE.md and evaluator checklists are subject to change management. Version them. Review changes. An unauthorized rules file change is a policy violation." },
      { color:C.green,  title:"Multi-team hygiene",       body:"When multiple teams share an agent pipeline, define who owns the shared evaluator criteria and who approves changes to HITL thresholds." },
      { color:C.red,    title:"Improvement loop cadence", body:"Monthly reviews are aspirational without calendar commitment. Book the recurring improvement session at the same time as sprint planning. It will not happen otherwise." },
    ];

    const cols = [0.35, 5.1];
    for (let i = 0; i < cards.length; i++) {
      const c = cards[i];
      const x = cols[i % 2], y = 0.96 + Math.floor(i / 2) * 2.28, w = 4.55, h = 2.08;
      s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill:{color:C.offWhite}, shadow:shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y, w:0.07, h, fill:{color:c.color} });
      s.addShape(pres.shapes.RECTANGLE, { x, y, w, h:0.48, fill:{color:c.color, transparency:10} });
      s.addText(c.title, { x:x+0.16, y, w:w-0.22, h:0.48, fontSize:12.5, color:C.white, bold:true, valign:"middle", margin:0 });
      s.addText(c.body, { x:x+0.16, y:y+0.56, w:w-0.22, h:1.42, fontSize:11.5, color:C.muted, margin:0 });
    }
  }

  // SLIDE 11 — Lab Exercise
  {
    const s = pres.addSlide(); s.background = { color: C.white };
    s.addShape(pres.shapes.RECTANGLE, { x:0, y:0, w:10, h:0.82, fill:{color:C.teal} });
    s.addText("LAB EXERCISE  \u00B7  30 MINUTES", { x:0.4, y:0, w:9.2, h:0.82, fontSize:13, color:C.white, bold:true, charSpacing:3, valign:"middle", margin:0 });
    s.addText("Design the Review Hygiene System for Your Team\u2019s Coding Agent Workflow", { x:0.4, y:0.95, w:9.2, h:0.46, fontSize:17, color:C.navy, bold:true, margin:0 });

    const steps = [
      { n:"1", t:"HITL tier design",        min:"8 min",
        d:"For your team\u2019s most common agent task, define the three HITL tiers. For each tier: what qualifies? Who gets notified? What is the intervention window for Tier 2?" },
      { n:"2", t:"PR review dimensions",    min:"7 min",
        d:"For the last AI-generated PR your team reviewed: apply all six dimensions. Which dimensions had issues? Which were strong? What would the evaluator need to check to surface the issues automatically?" },
      { n:"3", t:"ADR backlog",             min:"8 min",
        d:"Identify the three most important architectural decisions your team has made in the last year that do not have an ADR. Draft the header and context section for one of them." },
      { n:"4", t:"Improvement loop design", min:"7 min",
        d:"Define your team\u2019s improvement loop: What metrics do you collect? When do you review? Who makes changes to the rules file? What would trigger an out-of-cycle review?" },
    ];

    for (let i = 0; i < steps.length; i++) {
      const st = steps[i];
      const y = 1.52 + i * 1.02;
      s.addShape(pres.shapes.RECTANGLE, { x:0.35, y, w:9.3, h:0.9, fill:{color:C.offWhite}, shadow:shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x:0.35, y, w:0.52, h:0.9, fill:{color:C.teal} });
      s.addText(st.n, { x:0.35, y, w:0.52, h:0.9, fontSize:22, color:C.white, bold:true, align:"center", valign:"middle", margin:0 });
      s.addText(st.t, { x:0.97, y:y+0.06, w:3.5, h:0.28, fontSize:12, color:C.teal, bold:true, margin:0 });
      s.addText("(" + st.min + ")", { x:4.47, y:y+0.06, w:0.9, h:0.28, fontSize:10.5, color:C.muted, italic:true, margin:0 });
      s.addText(st.d, { x:0.97, y:y+0.4, w:8.55, h:0.44, fontSize:10.5, color:C.muted, margin:0 });
    }
  }

  // SLIDE 12 — Discussion + Summary
  {
    const s = pres.addSlide(); s.background = { color: C.navy };
    s.addShape(pres.shapes.RECTANGLE, { x:9.82, y:0, w:0.18, h:5.625, fill:{color:C.accent} });
    s.addText("DISCUSSION + MODULE SUMMARY", { x:0.4, y:0.22, w:9, h:0.45, fontSize:13, color:C.iceBlue, bold:true, charSpacing:3, margin:0 });

    // Left: discussion questions
    s.addShape(pres.shapes.RECTANGLE, { x:0.35, y:0.82, w:5.5, h:3.82, fill:{color:C.mid, transparency:20}, shadow:shadow() });
    s.addShape(pres.shapes.RECTANGLE, { x:0.35, y:0.82, w:5.5, h:0.48, fill:{color:C.iceBlue, transparency:15} });
    s.addText("DISCUSSION QUESTIONS", { x:0.35, y:0.82, w:5.5, h:0.48, fontSize:11, color:C.white, bold:true, charSpacing:2, align:"center", valign:"middle", margin:0 });
    s.addText([
      "Q1.  You discover your evaluator has been passing code that violates a standard you changed 3 months ago. How did this happen, and what improvement loop change would prevent it?",
      "Q2.  A developer pushes back: \u201CThe HITL tier for schema migrations requires approval but it\u2019s slowing us down.\u201D Walk through the right way to evaluate and potentially change that tier.",
      "Q3.  Your team has 47 architectural decisions recorded in Slack over the past year and zero ADRs. What is your plan?",
      "Q4.  Your evaluator pass rate is 58% (target 85%). What does this tell you, and what are the first three things you investigate?",
    ].join("\n\n"), { x:0.5, y:1.4, w:5.1, h:3.1, fontSize:11.5, color:C.pale, margin:0 });

    // Right: key takeaways
    s.addShape(pres.shapes.RECTANGLE, { x:6.05, y:0.82, w:3.6, h:3.82, fill:{color:C.mid, transparency:20}, shadow:shadow() });
    s.addShape(pres.shapes.RECTANGLE, { x:6.05, y:0.82, w:3.6, h:0.48, fill:{color:C.accent, transparency:10} });
    s.addText("KEY TAKEAWAYS", { x:6.05, y:0.82, w:3.6, h:0.48, fontSize:11, color:C.white, bold:true, charSpacing:2, align:"center", valign:"middle", margin:0 });
    s.addText([
      "\u00B7 Automated review drifts without improvement loops",
      "\u00B7 HITL tiers match oversight level to decision risk",
      "\u00B7 AI PRs need 6 dimensions \u2014 scope, intent, AC, APIs, debt, behaviour",
      "\u00B7 ADRs are agent context, not documentation \u2014 keep them in git",
      "\u00B7 Improvement loop: Deploy \u2192 Observe \u2192 Review \u2192 Improve \u2192 Repeat",
      "\u00B7 SLOs for dev workflow trigger improvement, not incident response",
      "\u00B7 Rules file and evaluator criteria are team policy \u2014 govern them",
    ].join("\n\n"), { x:6.2, y:1.4, w:3.35, h:3.1, fontSize:11, color:C.pale, margin:0 });

    // NEXT banner
    s.addShape(pres.shapes.RECTANGLE, { x:0.35, y:4.75, w:9.3, h:0.62, fill:{color:C.accent, transparency:18} });
    s.addText("NEXT  \u00B7  Module 09: Observability  \u2014  Structured logs, custom metrics, distributed traces, events, and health endpoints", {
      x:0.35, y:4.75, w:9.3, h:0.62, fontSize:11.5, color:C.white, bold:true, align:"center", valign:"middle", margin:0
    });
  }

  await pres.writeFile({ fileName: "Module_08_Review_Hygiene.pptx" });
  console.log("\u2705 Module 8 written");
}
build().catch(console.error);
