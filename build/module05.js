const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const { FaVial, FaSync, FaCheckCircle, FaTimesCircle, FaBug, FaCodeBranch, FaRobot, FaShieldAlt, FaGavel, FaFlask, FaTools, FaCogs, FaLayerGroup } = require("react-icons/fa");

const C = {
  navy:"1C3557", iceBlue:"5B8DB8", pale:"D4E4F0", white:"FFFFFF",
  offWhite:"F3F6F9", accent:"3A7DC9", teal:"4A7FA8", mid:"2E5073",
  text:"1E2D3D", muted:"7A90A8", green:"3A7E6E", steel:"8096B0", red:"B03040"
};
const shadow = () => ({ type:"outer", color:"000000", blur:8, offset:3, angle:135, opacity:0.13 });
async function icon(C2, color="#FFFFFF", size=256) {
  const svg = ReactDOMServer.renderToStaticMarkup(React.createElement(C2, { color, size:String(size) }));
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64,"+buf.toString("base64");
}

async function build() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.title = "Module 5: Automated Testing, TDD & CI/CD";

  // SLIDE 1 — Title
  {
    const s = pres.addSlide(); s.background = { color: C.navy };
    s.addShape(pres.shapes.RECTANGLE, { x:0, y:0, w:0.18, h:5.625, fill:{color:C.accent} });
    s.addText("ENTERPRISE AGENTIC PRACTICES", { x:0.4, y:0.32, w:9.2, h:0.35, fontSize:10, color:C.iceBlue, bold:true, charSpacing:4, margin:0 });
    s.addShape(pres.shapes.RECTANGLE, { x:0.4, y:0.82, w:1.5, h:0.38, fill:{color:C.accent} });
    s.addText("MODULE 05", { x:0.4, y:0.82, w:1.5, h:0.38, fontSize:11, color:C.white, bold:true, align:"center", valign:"middle", margin:0 });
    s.addText("Automated Testing,\nTDD & CI/CD", { x:0.4, y:1.35, w:7.2, h:1.9, fontSize:44, color:C.white, bold:true, margin:0 });
    s.addText("Building the verification loops that make agents reliable at scale", { x:0.4, y:3.38, w:7.5, h:0.5, fontSize:18, color:C.iceBlue, italic:true, margin:0 });
    s.addShape(pres.shapes.RECTANGLE, { x:0.4, y:4.0, w:3.5, h:0.04, fill:{color:C.accent} });
    s.addText([
      {text:"Duration: ",options:{bold:true,color:C.muted}},{text:"75\u201390 min  ",options:{color:C.muted}},
      {text:"  |  ",options:{color:C.muted}},{text:"Level: ",options:{bold:true,color:C.muted}},{text:"Intermediate",options:{color:C.muted}}
    ], { x:0.4, y:4.2, w:5, h:0.38, fontSize:13, margin:0 });
    // Right: loop diagram
    const steps = [{l:"AC / Spec",c:C.navy},{l:"Write Tests",c:C.teal},{l:"Agent Codes",c:C.accent},{l:"Verifier Runs",c:C.green},{l:"\u2713 Pass / \u21BA Fix",c:C.steel}];
    steps.forEach((st,i) => {
      const y = 0.65 + i*0.95;
      s.addShape(pres.shapes.RECTANGLE, { x:7.6, y, w:2.05, h:0.75, fill:{color:st.c, transparency:i===2?0:20}, shadow:shadow() });
      s.addText(st.l, { x:7.6, y, w:2.05, h:0.75, fontSize:13, color:C.white, bold:true, align:"center", valign:"middle", margin:0 });
      if(i<steps.length-1) s.addText("\u2193", { x:8.25, y:y+0.78, w:0.55, h:0.25, fontSize:14, color:C.muted, align:"center", margin:0 });
    });
  }

  // SLIDE 2 — Learning Objectives
  {
    const s = pres.addSlide(); s.background = { color: C.offWhite };
    s.addShape(pres.shapes.RECTANGLE, { x:0, y:0, w:10, h:0.82, fill:{color:C.navy} });
    s.addText("LEARNING OBJECTIVES", { x:0.4, y:0, w:9.2, h:0.82, fontSize:13, color:C.white, bold:true, charSpacing:3, valign:"middle", margin:0 });
    s.addText("By the end of this module you will be able to:", { x:0.35, y:0.9, w:9.3, h:0.28, fontSize:11, color:C.muted, italic:true, margin:0 });
    const objs = [
      {icon:FaBug,      color:C.accent, title:"Name the 3 Agent Failure Modes",   body:"Classify agent failures as CI failure, functionally wrong (passes CI), or nonsensical \u2014 and understand how to prevent each."},
      {icon:FaVial,     color:C.teal,   title:"Apply TDD with Agents",            body:"Write acceptance criteria first, generate tests from AC, then let the agent implement against failing tests."},
      {icon:FaSync,     color:C.green,  title:"Design Verification Loops",        body:"Architect Verifier + Judge LLM patterns that catch errors before humans see them, inspired by Spotify\u2019s Honk system."},
      {icon:FaCodeBranch,color:C.steel, title:"Integrate Agents into CI/CD",     body:"Configure Claude Code to run in CI pipelines: scheduled PR reviews, overnight failure analysis, dependency audits."},
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

  // SLIDE 3 — The 3 Agent Failure Modes
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

  // SLIDE 4 — TDD with Agents
  {
    const s = pres.addSlide(); s.background = { color: C.white };
    s.addShape(pres.shapes.RECTANGLE, {x:0,y:0,w:10,h:0.82,fill:{color:C.navy}});
    s.addText("TEST-DRIVEN DEVELOPMENT WITH AGENTS", {x:0.4,y:0,w:9,h:0.82,fontSize:13,color:C.white,bold:true,charSpacing:3,valign:"middle",margin:0});
    s.addText("Acceptance criteria \u2192 tests \u2192 implementation: the loop that makes agent output verifiable", {x:0.4,y:0.9,w:9.2,h:0.3,fontSize:12,color:C.muted,italic:true,margin:0});

    const steps = [
      {n:"1",c:C.navy,  head:"Write AC (Human)",        body:"From your SPEC.md, write concrete Given/When/Then acceptance criteria. This is the single source of truth for what \u201Cdone\u201D means.",file:"spec.md \u2192 acceptance_criteria.md"},
      {n:"2",c:C.teal,  head:"Generate Tests (Agent)",  body:"Ask the agent to read the AC and write failing tests. No implementation yet \u2014 just tests. Human reviews: do tests actually verify the AC?",file:"test_board_creation.py \u2014 all failing"},
      {n:"3",c:C.accent,head:"Implement (Agent)",       body:"Agent implements against failing tests. Runs tests after each change. Iterates until all pass. Human defined the finish line; agent drives to it.",file:"board_service.py \u2014 agent writes"},
      {n:"4",c:C.green, head:"Verifier Runs (Auto)",    body:"Before PR opens: lint, types, all tests, coverage threshold. If any fail, agent self-corrects. PR only opens when Verifier is green.",file:"CI: 100% AC coverage required"},
      {n:"5",c:C.steel, head:"Human Reviews (HITL)",    body:"Engineer reviews the diff. Did the agent stay in scope? Is the implementation clean? Does the behaviour match what was intended?",file:"PR diff \u2014 human approves or redirects"},
    ];

    steps.forEach((st,i) => {
      const x=0.35+i*1.88, y=1.3;
      s.addShape(pres.shapes.RECTANGLE, {x,y,w:1.72,h:4.1,fill:{color:C.offWhite},shadow:shadow()});
      s.addShape(pres.shapes.RECTANGLE, {x,y,w:1.72,h:0.55,fill:{color:st.c}});
      s.addText(st.n, {x,y,w:0.42,h:0.55,fontSize:18,color:C.white,bold:true,align:"center",valign:"middle",margin:0});
      s.addText(st.head, {x:x+0.44,y,w:1.24,h:0.55,fontSize:10.5,color:C.white,bold:true,valign:"middle",margin:0});
      s.addText(st.body, {x:x+0.1,y:y+0.62,w:1.52,h:2.38,fontSize:10,color:C.text,margin:0});
      s.addShape(pres.shapes.RECTANGLE, {x:x+0.08,y:y+3.1,w:1.56,h:0.82,fill:{color:st.c,transparency:88}});
      s.addText(st.file, {x:x+0.12,y:y+3.14,w:1.48,h:0.74,fontSize:9,color:st.c,italic:true,margin:0});
      if(i<steps.length-1) s.addText("\u2192",{x:x+1.72,y:y+1.72,w:0.16,h:0.38,fontSize:16,color:C.muted,align:"center",margin:0});
    });
  }

  // SLIDE 5 — The Verification Loop (Spotify Honk)
  {
    const s = pres.addSlide(); s.background = { color: C.offWhite };
    s.addShape(pres.shapes.RECTANGLE, {x:0,y:0,w:10,h:0.82,fill:{color:C.teal}});
    s.addShape(pres.shapes.RECTANGLE, {x:0,y:0,w:0.35,h:0.82,fill:{color:C.navy}});
    s.addText("THE VERIFICATION LOOP  \u00B7  Spotify Honk Architecture", {x:0.5,y:0,w:9.1,h:0.82,fontSize:12,color:C.white,bold:true,charSpacing:2,valign:"middle",margin:0});
    s.addText("\u201CWith verifiers and a Judge to guide them, agents can solve increasingly complex tasks with a high degree of reliability.\u201D  \u2014 Spotify Engineering, Honk Part 3 (Dec 2025)", {x:0.4,y:0.9,w:9.2,h:0.3,fontSize:11,color:C.muted,italic:true,margin:0});

    // Agent loop with verifier and judge
    // Agent box
    s.addShape(pres.shapes.RECTANGLE, {x:0.5,y:1.35,w:2.5,h:2.8,fill:{color:C.white},shadow:shadow()});
    s.addShape(pres.shapes.RECTANGLE, {x:0.5,y:1.35,w:2.5,h:0.5,fill:{color:C.accent}});
    s.addText("Background\nCoding Agent", {x:0.5,y:1.35,w:2.5,h:0.5,fontSize:13,color:C.white,bold:true,align:"center",valign:"middle",margin:0});
    s.addText("\u2022 Reads prompt + spec\n\u2022 Makes code changes\n\u2022 Runs build locally\n\u2022 Self-corrects on errors\n\u2022 Bounded scope", {x:0.62,y:1.92,w:2.26,h:2.0,fontSize:11,color:C.text,margin:0});

    // Arrow to Verifier
    s.addText("\u2192", {x:3.05,y:2.52,w:0.5,h:0.45,fontSize:22,color:C.teal,align:"center",margin:0});

    // Verifier box
    s.addShape(pres.shapes.RECTANGLE, {x:3.6,y:1.35,w:2.8,h:2.8,fill:{color:C.white},shadow:shadow()});
    s.addShape(pres.shapes.RECTANGLE, {x:3.6,y:1.35,w:2.8,h:0.5,fill:{color:C.teal}});
    s.addText("Verifier Layer", {x:3.6,y:1.35,w:2.8,h:0.5,fontSize:13,color:C.white,bold:true,align:"center",valign:"middle",margin:0});
    const vchecks = ["Unit tests run & pass","Linter \u2014 zero warnings","Type checker clean","Build compiles","Coverage threshold met","Scope: only allowed files changed"];
    vchecks.forEach((v,j) => {
      s.addText("\u2713  "+v, {x:3.72,y:1.92+j*0.38,w:2.56,h:0.35,fontSize:10.5,color:C.text,margin:0});
    });

    // Arrow to Judge
    s.addText("\u2192", {x:6.45,y:2.52,w:0.5,h:0.45,fontSize:22,color:C.green,align:"center",margin:0});

    // Judge LLM box
    s.addShape(pres.shapes.RECTANGLE, {x:7.0,y:1.35,w:2.65,h:2.8,fill:{color:C.white},shadow:shadow()});
    s.addShape(pres.shapes.RECTANGLE, {x:7.0,y:1.35,w:2.65,h:0.5,fill:{color:C.green}});
    s.addText("Judge LLM", {x:7.0,y:1.35,w:2.65,h:0.5,fontSize:13,color:C.white,bold:true,align:"center",valign:"middle",margin:0});
    const jchecks = ["Diff is functionally correct","Stayed within scope","No hallucinated APIs","Logic matches spec intent","Quality acceptable for PR"];
    jchecks.forEach((v,j) => {
      s.addText("\u2713  "+v, {x:7.12,y:1.92+j*0.42,w:2.41,h:0.38,fontSize:10.5,color:C.text,margin:0});
    });

    // Outcomes
    const outcomes = [
      {label:"\u2713 Verifier + Judge pass",sub:"PR opens automatically",c:C.green},
      {label:"\u21BA Verifier fails",sub:"Agent self-corrects, loops",c:C.accent},
      {label:"\u2717 Judge rejects",sub:"Agent revises with feedback",c:C.steel},
    ];
    outcomes.forEach((o,i) => {
      const x=0.35+i*3.22;
      s.addShape(pres.shapes.RECTANGLE, {x,y:4.3,w:3.0,h:0.88,fill:{color:o.c,transparency:o.c===C.green?10:20},shadow:shadow()});
      s.addText(o.label, {x:x+0.12,y:4.3,w:2.76,h:0.46,fontSize:12,color:C.white,bold:true,valign:"middle",margin:0});
      s.addText(o.sub, {x:x+0.12,y:4.76,w:2.76,h:0.36,fontSize:11,color:C.pale,margin:0});
    });
  }

  // SLIDE 6 — Writing Good Tests for Agent Workflows
  {
    const s = pres.addSlide(); s.background = { color: C.white };
    s.addShape(pres.shapes.RECTANGLE, {x:0,y:0,w:10,h:0.82,fill:{color:C.navy}});
    s.addText("WRITING TESTS AGENTS CAN USE", {x:0.4,y:0,w:9,h:0.82,fontSize:13,color:C.white,bold:true,charSpacing:3,valign:"middle",margin:0});
    s.addText("Tests are the Verifier\u2019s language \u2014 write them before implementation and make them machine-verifiable", {x:0.4,y:0.9,w:9.2,h:0.3,fontSize:12,color:C.muted,italic:true,margin:0});

    const principles = [
      {head:"Test behaviour, not implementation",       body:"Tests should verify what the system does, not how it does it. If the agent refactors, tests should still pass. Test against your AC, not internal state."},
      {head:"100% AC coverage is non-negotiable",       body:"Every acceptance criterion must have at least one test. If there\u2019s no test for it, the agent has no way to know it\u2019s implemented correctly."},
      {head:"Include edge cases explicitly",            body:"Agents are excellent at the happy path. They\u2019re poor at inferring edge cases. Write tests for: empty input, boundary values, concurrent access, network failure."},
      {head:"Keep tests deterministic",                 body:"Non-deterministic tests (flaky tests, time-dependent tests) destroy agent confidence. The Verifier needs a reliable signal. Flaky \u2260 agent failure."},
      {head:"Tests run fast enough for agent loops",    body:"If your test suite takes 20 minutes, agents can\u2019t iterate quickly. Invest in fast test layers: unit (< 1s), integration (< 30s), e2e gated to CI."},
      {head:"Generate test scaffolding from AC",        body:"Ask the agent to generate test stubs from your AC file first. Then review those stubs before asking for implementation. Test structure \u2261 spec review."},
    ];
    const cols=[0.35,5.1];
    principles.forEach((p,i) => {
      const x=cols[i%2], y=1.28+Math.floor(i/2)*1.45, w=4.55, h=1.3;
      s.addShape(pres.shapes.RECTANGLE, {x,y,w,h,fill:{color:C.offWhite},shadow:shadow()});
      s.addShape(pres.shapes.RECTANGLE, {x,y,w:0.06,h,fill:{color:C.teal}});
      s.addText(p.head, {x:x+0.16,y:y+0.08,w:w-0.22,h:0.36,fontSize:12,color:C.navy,bold:true,margin:0});
      s.addText(p.body, {x:x+0.16,y:y+0.5,w:w-0.22,h:0.72,fontSize:11,color:C.muted,margin:0});
    });
  }

  // SLIDE 7 — CI/CD Integration Patterns
  {
    const s = pres.addSlide(); s.background = { color: C.navy };
    s.addText("CI/CD INTEGRATION PATTERNS", {x:0.4,y:0.22,w:9,h:0.45,fontSize:13,color:C.iceBlue,bold:true,charSpacing:3,margin:0});
    s.addText("Claude Code follows the Unix philosophy: composable, pipeable, scriptable", {x:0.4,y:0.72,w:9,h:0.36,fontSize:17,color:C.white,italic:true,margin:0});

    const patterns = [
      {head:"PR Security Review",       cmd:'git diff main --name-only | claude -p "review changed files for security issues"', when:"On every PR open/update", benefit:"Catches security issues before human review, not after"},
      {head:"CI Failure Analysis",      cmd:'tail -200 build.log | claude -p "summarise failures and suggest fixes"', when:"After failed CI run", benefit:"Engineer gets a digest, not a wall of logs"},
      {head:"Dependency Audit",         cmd:'claude -p "audit dependencies for vulnerabilities and outdated packages"', when:"Weekly scheduled task", benefit:"Proactive hygiene without engineer time"},
      {head:"Translation / Localisation",cmd:'claude -p "translate new strings into French and raise a PR for review"', when:"After new feature merge", benefit:"i18n stays current automatically"},
      {head:"Doc Sync",                 cmd:'claude -p "update API docs to reflect changes merged in last 24h"', when:"Nightly schedule", benefit:"Docs never go stale; engineers don\u2019t write them"},
      {head:"Overnight Analysis",       cmd:'claude -p "analyse test coverage gaps and suggest new tests for uncovered paths"', when:"Scheduled: 2am daily", benefit:"Coverage reporting arrives with coffee"},
    ];

    patterns.forEach((p,i) => {
      const col=i%2, row=Math.floor(i/2);
      const x=col===0?0.35:5.15, y=1.28+row*1.42, w=4.6, h=1.3;
      s.addShape(pres.shapes.RECTANGLE, {x,y,w,h,fill:{color:C.mid,transparency:18},shadow:shadow()});
      s.addShape(pres.shapes.RECTANGLE, {x,y,w:0.06,h,fill:{color:C.accent}});
      s.addText(p.head, {x:x+0.16,y:y+0.06,w:w-0.22,h:0.3,fontSize:12,color:C.accent,bold:true,margin:0});
      s.addShape(pres.shapes.RECTANGLE, {x:x+0.12,y:y+0.38,w:w-0.2,h:0.38,fill:{color:C.navy}});
      s.addText(p.cmd, {x:x+0.18,y:y+0.38,w:w-0.28,h:0.38,fontSize:9,color:C.iceBlue,fontFace:"Consolas",valign:"middle",margin:0});
      s.addText(p.benefit, {x:x+0.16,y:y+0.84,w:w-0.22,h:0.38,fontSize:10.5,color:C.pale,margin:0});
    });
  }

  // SLIDE 8 — Coverage Strategy
  {
    const s = pres.addSlide(); s.background = { color: C.offWhite };
    s.addShape(pres.shapes.RECTANGLE, {x:0,y:0,w:10,h:0.82,fill:{color:C.navy}});
    s.addText("TEST COVERAGE STRATEGY FOR AGENTIC SYSTEMS", {x:0.4,y:0,w:9,h:0.82,fontSize:13,color:C.white,bold:true,charSpacing:3,valign:"middle",margin:0});

    const tiers = [
      {tier:"Unit Tests",speed:"< 1 second",when:"Every code change",color:C.accent,
       what:"Test individual functions, methods, and classes in isolation. Agent runs these in the Verifier loop after every file change. Fast feedback = faster agent iteration.",
       ac:"100% of AC mapped to unit tests. No untested acceptance criteria.",must:"Must pass before agent attempts integration tests."},
      {tier:"Integration Tests",speed:"< 30 seconds",when:"Every PR",color:C.teal,
       what:"Test interactions between components, external APIs (mocked), and database operations. Run in the CI pipeline before human review.",
       ac:"Every API contract has an integration test. Every database operation tested.",must:"Must pass before PR can be reviewed."},
      {tier:"End-to-End Tests",speed:"1\u20135 minutes",when:"Before merge / nightly",color:C.green,
       what:"Full user-flow tests in a production-like environment. Too slow for agent loops but essential for catching regressions introduced by multi-file changes.",
       ac:"Every user-facing acceptance criterion covered by at least one E2E test.",must:"Must pass before merge to main."},
    ];

    tiers.forEach((t,i) => {
      const x=0.35+i*3.15, y=0.95;
      s.addShape(pres.shapes.RECTANGLE, {x,y,w:2.95,h:4.42,fill:{color:C.white},shadow:shadow()});
      s.addShape(pres.shapes.RECTANGLE, {x,y,w:2.95,h:0.62,fill:{color:t.color}});
      s.addText(t.tier, {x,y,w:2.95,h:0.38,fontSize:14,color:C.white,bold:true,align:"center",valign:"middle",margin:0});
      s.addText(t.speed+" \u00B7 "+t.when, {x,y:y+0.38,w:2.95,h:0.24,fontSize:10,color:C.white,align:"center",margin:0});
      s.addText("WHAT", {x:x+0.12,y:y+0.72,w:2.7,h:0.22,fontSize:8.5,color:t.color,bold:true,charSpacing:2,margin:0});
      s.addText(t.what, {x:x+0.12,y:y+0.94,w:2.7,h:1.12,fontSize:10.5,color:C.text,margin:0});
      s.addText("AC MAPPING", {x:x+0.12,y:y+2.12,w:2.7,h:0.22,fontSize:8.5,color:t.color,bold:true,charSpacing:2,margin:0});
      s.addText(t.ac, {x:x+0.12,y:y+2.34,w:2.7,h:0.72,fontSize:10.5,color:C.muted,margin:0});
      s.addShape(pres.shapes.RECTANGLE, {x:x+0.1,y:y+3.12,w:2.75,h:1.12,fill:{color:t.color,transparency:88}});
      s.addText("\u26A0 Gate", {x:x+0.16,y:y+3.16,w:2.63,h:0.26,fontSize:9.5,color:t.color,bold:true,charSpacing:2,margin:0});
      s.addText(t.must, {x:x+0.16,y:y+3.42,w:2.63,h:0.74,fontSize:10,color:C.muted,italic:true,margin:0});
    });

    s.addText("Coverage target: 100% of AC \u2260 100% line coverage. Line coverage without AC coverage is vanity. AC coverage without line coverage is risk. You need both.", {
      x:0.35, y:5.3, w:9.3, h:0.27, fontSize:10.5, color:C.muted, italic:true, margin:0
    });
  }

  // SLIDE 9 — Anti-Patterns
  {
    const s = pres.addSlide(); s.background = { color: C.white };
    s.addShape(pres.shapes.RECTANGLE, {x:0,y:0,w:10,h:0.82,fill:{color:C.navy}});
    s.addText("TESTING ANTI-PATTERNS WITH AGENTS", {x:0.4,y:0,w:9,h:0.82,fontSize:13,color:C.white,bold:true,charSpacing:3,valign:"middle",margin:0});
    s.addText("These patterns destroy the reliability that verification loops are supposed to guarantee", {x:0.4,y:0.9,w:9.2,h:0.3,fontSize:12,color:C.muted,italic:true,margin:0});

    const aps = [
      {n:"01",head:"No tests, just linting",   impact:"Agent thinks it\u2019s done; code is syntactically correct but wrong", fix:"Require functional tests in the Verifier. Lint is necessary but not sufficient."},
      {n:"02",head:"Tests written after code",  impact:"Agent writes tests to match its own (wrong) implementation \u2014 not the spec", fix:"AC first, tests second, implementation third. Always. Non-negotiable."},
      {n:"03",head:"Flaky tests in agent loop", impact:"Agent gets false failures, re-runs endlessly, or ignores tests as noise", fix:"Zero tolerance for non-deterministic tests in agent Verifier. Fix before agent adoption."},
      {n:"04",head:"No coverage on changed files", impact:"Agent changes file X; tests cover file Y. Failure mode 2 (functionally wrong) goes undetected.", fix:"Coverage gate: any file changed by agent must have test coverage. Fail PR if not."},
      {n:"05",head:"Test suite too slow",         impact:"Agent can\u2019t iterate; feedback loops become 20-minute cycles; productivity collapses", fix:"Build a fast unit test suite (< 5s) specifically for agent Verifier loops."},
      {n:"06",head:"Scope not enforced",          impact:"Agent changes 47 files when asked to fix a button. Code review becomes impossible.", fix:"Verifier checks: which files were changed? Were all of them in scope? Fail if not."},
    ];
    [[0,1,2],[3,4,5]].forEach((group,col) => {
      group.forEach((idx,row) => {
        const ap=aps[idx], x=col===0?0.35:5.1, y=1.28+row*1.42, w=4.55, h=1.3;
        s.addShape(pres.shapes.RECTANGLE, {x,y,w,h,fill:{color:C.offWhite},shadow:shadow()});
        s.addShape(pres.shapes.RECTANGLE, {x,y,w:0.45,h,fill:{color:C.red,transparency:10}});
        s.addText(ap.n, {x,y,w:0.45,h,fontSize:14,color:C.white,bold:true,align:"center",valign:"middle",margin:0});
        s.addText(ap.head, {x:x+0.55,y:y+0.06,w:w-0.65,h:0.3,fontSize:12,color:C.navy,bold:true,margin:0});
        s.addText("\u26A0 "+ap.impact, {x:x+0.55,y:y+0.42,w:w-0.65,h:0.38,fontSize:10.5,color:C.red,margin:0});
        s.addText("\u2713 "+ap.fix,    {x:x+0.55,y:y+0.84,w:w-0.65,h:0.38,fontSize:10.5,color:C.green,margin:0});
      });
    });
  }

  // SLIDE 10 — Spotify Honk Results
  {
    const s = pres.addSlide(); s.background = { color: C.navy };
    s.addText("REAL RESULTS  \u00B7  SPOTIFY HONK  \u00B7  2024\u20132026", {x:0.4,y:0.22,w:9,h:0.45,fontSize:13,color:C.iceBlue,bold:true,charSpacing:3,margin:0});
    s.addText("What happens when you build proper verification loops into an agentic CI/CD pipeline", {x:0.4,y:0.72,w:9,h:0.36,fontSize:17,color:C.white,italic:true,margin:0});

    // Stats
    const stats = [
      {n:"~50%",l:"of all PRs automated",s:"by agents since mid-2024",c:C.accent},
      {n:"1,500+",l:"agent-generated PRs",s:"successfully merged",c:C.teal},
      {n:"50+",  l:"features shipped",s:"in 2025 via agent pipeline",c:C.green},
    ];
    stats.forEach((st,i) => {
      const x=0.35+i*3.15;
      s.addShape(pres.shapes.RECTANGLE, {x,y:1.28,w:2.95,h:1.75,fill:{color:st.c},shadow:shadow()});
      s.addText(st.n, {x,y:1.32,w:2.95,h:0.82,fontSize:40,color:C.white,bold:true,align:"center",margin:0});
      s.addText(st.l, {x,y:2.14,w:2.95,h:0.36,fontSize:12.5,color:C.white,bold:true,align:"center",margin:0});
      s.addText(st.s, {x,y:2.5,w:2.95,h:0.38,fontSize:11,color:C.pale,align:"center",italic:true,margin:0});
    });

    // Lessons
    const lessons = [
      {head:"Sandboxing = predictability", body:"Agent in container with minimal permissions and binaries. Intentional restriction \u2192 more predictable behavior + security."},
      {head:"Verifier \u2260 optional",         body:"Without verifiers, agents produced code that \u201Csimply doesn\u2019t work.\u201D The verification loop isn\u2019t overhead \u2014 it\u2019s what makes automation viable."},
      {head:"Judge catches what CI misses",  body:"A separate LLM evaluating the diff for correctness caught functional failures that unit tests missed entirely."},
      {head:"Coverage requirement changed everything", body:"Requiring test coverage on changed files eliminated failure mode 2. Agents could no longer hide wrong behaviour behind passing CI."},
    ];
    lessons.forEach((l,i) => {
      const col=i%2, row=Math.floor(i/2);
      const x=col===0?0.35:5.15, y=3.18+row*1.06, w=4.6, h=0.94;
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
    s.addText("LAB EXERCISE  \u00B7  30 MINUTES", {x:0.4,y:0,w:9,h:0.82,fontSize:13,color:C.white,bold:true,charSpacing:3,valign:"middle",margin:0});
    s.addText("Build a Verification Loop for Your Team\u2019s First Automated PR", {x:0.4,y:0.95,w:9.2,h:0.46,fontSize:19,color:C.navy,bold:true,margin:0});
    const steps = [
      {n:"1",t:"Map your failure modes",min:"5 min",d:"In the last 3 sprints, classify each regression or defect into the 3 failure modes. Which mode is most common? That\u2019s where your Verifier needs to invest first."},
      {n:"2",t:"Write AC-to-test mapping",min:"10 min",d:"Take the SPEC.md you wrote in Module 4. Write test stubs (not implementations) for each acceptance criterion. Use Given/When/Then comments as test names. Swap with a neighbour: are they testable?"},
      {n:"3",t:"Design your Verifier",min:"8 min",d:"Define: what commands does your Verifier run? In what order? What does failure at each step trigger? Draw the decision tree: pass \u2192 PR opens, fail \u2192 agent self-corrects, threshold exceeded \u2192 human escalation."},
      {n:"4",t:"Write one CI integration",min:"7 min",d:"Using the CLI patterns from Slide 7, write a one-liner that your team could add to your CI config today. What would it catch? What would it have caught in the last quarter?"},
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
    s.addText(["Q1.  Which of the 3 failure modes have you personally experienced? What was the impact?","Q2.  What\u2019s the current gap between your fastest test suite and what an agent Verifier would need?","Q3.  If you added a Judge LLM to your PR process today, what would it be evaluating?","Q4.  Pick one CI integration from Slide 7. What would it have caught in your last sprint?"].join("\n\n"), {x:0.5,y:1.4,w:5.1,h:3.1,fontSize:11.5,color:C.pale,margin:0});

    s.addShape(pres.shapes.RECTANGLE, {x:6.05,y:0.82,w:3.6,h:3.82,fill:{color:C.mid,transparency:20},shadow:shadow()});
    s.addShape(pres.shapes.RECTANGLE, {x:6.05,y:0.82,w:3.6,h:0.48,fill:{color:C.accent,transparency:10}});
    s.addText("KEY TAKEAWAYS", {x:6.05,y:0.82,w:3.6,h:0.48,fontSize:11,color:C.white,bold:true,charSpacing:2,align:"center",valign:"middle",margin:0});
    s.addText(["\u00B7 3 failure modes: CI fail, wrong, nonsensical","\u00B7 AC first, tests second, code third","\u00B7 Verifier + Judge = reliability at scale","\u00B7 100% AC coverage \u2260 100% line coverage","\u00B7 Fast unit tests enable agent loops","\u00B7 Scope enforcement stops nonsensical PRs","\u00B7 CI integration multiplies agent value"].join("\n\n"), {x:6.2,y:1.4,w:3.35,h:3.1,fontSize:11.5,color:C.pale,margin:0});

    s.addShape(pres.shapes.RECTANGLE, {x:0.35,y:4.75,w:9.3,h:0.62,fill:{color:C.accent,transparency:18}});
    s.addText("NEXT  \u00B7  Module 06: Review Cycles, Hygiene & Continuous Improvement  \u2014  Human gates, ADRs, supervised development", {x:0.35,y:4.75,w:9.3,h:0.62,fontSize:11.5,color:C.white,bold:true,align:"center",valign:"middle",margin:0});
  }

  await pres.writeFile({ fileName: "Module_05_Testing_CICD.pptx" });
  console.log("\u2705 Module 5 written");
}
build().catch(console.error);
