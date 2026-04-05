const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const { FaEye, FaStream, FaClipboardList, FaCheckCircle, FaChartLine, FaBell, FaSearch, FaLock, FaServer, FaLayerGroup, FaTools, FaShieldAlt } = require("react-icons/fa");

const C = { navy:"1C3557", iceBlue:"5B8DB8", pale:"D4E4F0", white:"FFFFFF", offWhite:"F3F6F9", accent:"3A7DC9", teal:"4A7FA8", mid:"2E5073", text:"1E2D3D", muted:"7A90A8", green:"3A7E6E", steel:"8096B0", red:"B03040" };
const shadow = () => ({ type:"outer", color:"000000", blur:8, offset:3, angle:135, opacity:0.13 });
async function icon(C2, color="#FFFFFF", size=256) {
  const svg = ReactDOMServer.renderToStaticMarkup(React.createElement(C2, { color, size:String(size) }));
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64,"+buf.toString("base64");
}

async function build() {
  const pres = new pptxgen(); pres.layout = "LAYOUT_16x9"; pres.title = "Module 7: Observability";

  // SLIDE 1
  {
    const s = pres.addSlide(); s.background = { color: C.navy };
    s.addShape(pres.shapes.RECTANGLE, {x:0,y:0,w:0.18,h:5.625,fill:{color:C.accent}});
    s.addText("ENTERPRISE AGENTIC PRACTICES", {x:0.4,y:0.32,w:9.2,h:0.35,fontSize:10,color:C.iceBlue,bold:true,charSpacing:4,margin:0});
    s.addShape(pres.shapes.RECTANGLE, {x:0.4,y:0.82,w:1.5,h:0.38,fill:{color:C.accent}});
    s.addText("MODULE 07", {x:0.4,y:0.82,w:1.5,h:0.38,fontSize:11,color:C.white,bold:true,align:"center",valign:"middle",margin:0});
    s.addText("Observability", {x:0.4,y:1.38,w:7.5,h:1.2,fontSize:56,color:C.white,bold:true,margin:0});
    s.addText("Seeing inside your agents: tracing, logging, evaluation, and monitoring in production", {x:0.4,y:2.72,w:7.5,h:0.7,fontSize:18,color:C.iceBlue,italic:true,margin:0});
    s.addShape(pres.shapes.RECTANGLE, {x:0.4,y:3.52,w:3.5,h:0.04,fill:{color:C.accent}});
    s.addText([{text:"Duration: ",options:{bold:true,color:C.muted}},{text:"60\u201375 min  ",options:{color:C.muted}},{text:"  |  ",options:{color:C.muted}},{text:"Level: ",options:{bold:true,color:C.muted}},{text:"Advanced",options:{color:C.muted}}], {x:0.4,y:3.7,w:5,h:0.38,fontSize:13,margin:0});
    // Right: the 4 pillars
    const pillars = [{l:"Monitoring",c:C.accent},{l:"Tracing",c:C.teal},{l:"Logging",c:C.green},{l:"Evaluation",c:C.steel}];
    pillars.forEach((p,i) => {
      s.addShape(pres.shapes.RECTANGLE, {x:7.55,y:0.72+i*1.18,w:2.1,h:0.92,fill:{color:p.c,transparency:i===0?0:20},shadow:shadow()});
      s.addText(p.l, {x:7.55,y:0.72+i*1.18,w:2.1,h:0.92,fontSize:15,color:C.white,bold:true,align:"center",valign:"middle",margin:0});
    });
    s.addText("The 4 Pillars", {x:7.55,y:5.0,w:2.1,h:0.3,fontSize:11,color:C.muted,align:"center",italic:true,margin:0});
  }

  // SLIDE 2 — Why Agent Observability is Different
  {
    const s = pres.addSlide(); s.background = { color: C.navy };
    s.addText("WHY AGENT OBSERVABILITY IS DIFFERENT", {x:0.4,y:0.22,w:9,h:0.45,fontSize:13,color:C.iceBlue,bold:true,charSpacing:3,margin:0});
    s.addText("Traditional APM tells you what happened. Agent observability must tell you why, how, and whether it was correct.", {x:0.4,y:0.72,w:9,h:0.36,fontSize:15,color:C.white,italic:true,margin:0});

    const compare = [
      {dim:"Input",        trad:"HTTP request with defined schema",    agent:"Natural language prompt + conversation history + loaded context"},
      {dim:"Processing",   trad:"Deterministic code path, predictable",agent:"Non-deterministic LLM reasoning — same input \u2260 same output"},
      {dim:"Output",       trad:"Structured response, validatable",    agent:"Natural language, code, tool calls \u2014 correctness is semantic"},
      {dim:"Error Signal", trad:"Exception, 500 status, stacktrace",   agent:"Plausible-sounding wrong answer \u2014 no exception thrown"},
      {dim:"Performance",  trad:"Latency, throughput, error rate",     agent:"Latency + token cost + quality + safety + alignment"},
      {dim:"Root Cause",   trad:"Code bug, infra failure, timeout",    agent:"Context pollution, prompt drift, tool misuse, hallucination"},
    ];
    s.addShape(pres.shapes.RECTANGLE, {x:0.35,y:1.28,w:9.3,h:0.36,fill:{color:C.mid,transparency:10}});
    s.addText("DIMENSION", {x:0.45,y:1.28,w:1.85,h:0.36,fontSize:10,color:C.iceBlue,bold:true,charSpacing:2,valign:"middle",margin:0});
    s.addText("TRADITIONAL SOFTWARE", {x:2.45,y:1.28,w:3.5,h:0.36,fontSize:10,color:C.steel,bold:true,charSpacing:2,valign:"middle",margin:0});
    s.addText("AGENTIC SYSTEM", {x:6.1,y:1.28,w:3.5,h:0.36,fontSize:10,color:C.accent,bold:true,charSpacing:2,valign:"middle",margin:0});
    compare.forEach((r,i) => {
      const y=1.7+i*0.64, bg=i%2===0?C.mid:"2A4870";
      s.addShape(pres.shapes.RECTANGLE, {x:0.35,y,w:9.3,h:0.58,fill:{color:bg,transparency:25}});
      s.addText(r.dim,  {x:0.45,y,w:1.85,h:0.58,fontSize:12,color:C.iceBlue,bold:true,valign:"middle",margin:0});
      s.addText(r.trad, {x:2.45,y,w:3.5, h:0.58,fontSize:10.5,color:C.pale,valign:"middle",margin:0});
      s.addText(r.agent,{x:6.1,y, w:3.5, h:0.58,fontSize:10.5,color:C.white,valign:"middle",margin:0});
    });
    s.addText("Microsoft Security Blog (March 2026): \u201CMaking enterprise AI systems observable transforms opaque model behavior into actionable security signals.\u201D", {x:0.35,y:5.5,w:9.3,h:0.2,fontSize:9.5,color:C.muted,italic:true,margin:0});
  }

  // SLIDE 3 — The 4 Pillars
  {
    const s = pres.addSlide(); s.background = { color: C.offWhite };
    s.addShape(pres.shapes.RECTANGLE, {x:0,y:0,w:10,h:0.82,fill:{color:C.teal}});
    s.addText("THE FOUR PILLARS OF AGENT OBSERVABILITY", {x:0.4,y:0,w:9,h:0.82,fontSize:13,color:C.white,bold:true,charSpacing:3,valign:"middle",margin:0});

    const pillars = [
      {n:"01",icon:FaChartLine,label:"Continuous\nMonitoring",color:C.navy,
       what:"Real-time tracking of agent actions, decisions, and tool calls. Surface anomalies, unexpected behaviour, and performance drift before humans notice.",
       what2:"Track: request volume, latency, token cost, tool invocation frequency, error rate, model version drift.",
       tool:"Azure AI Foundry, Dynatrace, Datadog LLM Observability"},
      {n:"02",icon:FaStream,label:"Tracing",color:C.accent,
       what:"Capture full execution flows: how the agent reasoned through a task, which tools it selected, what arguments it passed, and in what order.",
       what2:"Answer not just \u201Cwhat happened\u201D but \u201Cwhy and how did it happen\u201D \u2014 enabling forensic reconstruction of agent decisions.",
       tool:"OpenTelemetry GenAI spans, Langfuse, Traceloop"},
      {n:"03",icon:FaClipboardList,label:"Logging",color:C.green,
       what:"Record agent decisions, tool calls, internal state changes, and context snapshots at each significant step. Support debugging and audit.",
       what2:"Log: user prompt, model response, tools invoked, arguments passed, permissions in effect, context size at each step.",
       tool:"Structured JSON logs \u2192 SIEM (Sentinel, Splunk)"},
      {n:"04",icon:FaCheckCircle,label:"Evaluation",color:C.steel,
       what:"Systematically assess agent outputs for quality, safety, compliance, and alignment with user intent. Both automated and human-in-the-loop.",
       what2:"Evaluate: did the output meet AC? Was it factually correct? Did it stay in scope? Is it safe for the use case?",
       tool:"Azure Red Teaming Agent, LLM-as-judge, human spot-checks"},
    ];

    for(let i=0;i<4;i++){
      const p=pillars[i], x=0.35+i*2.38, y=1.0;
      s.addShape(pres.shapes.RECTANGLE, {x,y,w:2.2,h:4.42,fill:{color:C.white},shadow:shadow()});
      s.addShape(pres.shapes.RECTANGLE, {x,y,w:2.2,h:0.68,fill:{color:p.color}});
      s.addText(p.n, {x,y,w:0.5,h:0.68,fontSize:18,color:C.white,bold:true,align:"center",valign:"middle",margin:0});
      s.addText(p.label, {x:x+0.52,y,w:1.64,h:0.68,fontSize:13,color:C.white,bold:true,valign:"middle",margin:0});
      s.addText("WHAT", {x:x+0.1,y:y+0.74,w:2.0,h:0.22,fontSize:8.5,color:p.color,bold:true,charSpacing:2,margin:0});
      s.addText(p.what, {x:x+0.1,y:y+0.96,w:2.0,h:1.12,fontSize:10,color:C.text,margin:0});
      s.addText(p.what2, {x:x+0.1,y:y+2.12,w:2.0,h:1.0,fontSize:10,color:C.muted,margin:0});
      s.addShape(pres.shapes.RECTANGLE, {x:x+0.08,y:y+3.18,w:2.04,h:1.08,fill:{color:p.color,transparency:88}});
      s.addText("TOOLING", {x:x+0.14,y:y+3.22,w:1.92,h:0.24,fontSize:8.5,color:p.color,bold:true,charSpacing:2,margin:0});
      s.addText(p.tool, {x:x+0.14,y:y+3.46,w:1.92,h:0.72,fontSize:9.5,color:p.color,italic:true,margin:0});
    }
  }

  // SLIDE 4 — What to Capture
  {
    const s = pres.addSlide(); s.background = { color: C.white };
    s.addShape(pres.shapes.RECTANGLE, {x:0,y:0,w:10,h:0.82,fill:{color:C.navy}});
    s.addText("WHAT TO CAPTURE IN EVERY AGENT TRACE", {x:0.4,y:0,w:9,h:0.82,fontSize:13,color:C.white,bold:true,charSpacing:3,valign:"middle",margin:0});
    s.addText("Capture the full context at every decision point \u2014 enough to enable forensic reconstruction from any agent run", {x:0.4,y:0.9,w:9.2,h:0.3,fontSize:12,color:C.muted,italic:true,margin:0});

    const categories = [
      {cat:"Input Context",color:C.accent,items:["User prompt (verbatim)","System prompt and CLAUDE.md version","Skills loaded and their trigger reasons","Context window size at invocation","Conversation history length and token count"]},
      {cat:"Agent Reasoning",color:C.teal,items:["Tool selection and arguments passed","Reasoning chain (if extended thinking enabled)","Files read / grepped / searched","Planning steps taken","Self-corrections and retry attempts"]},
      {cat:"Tool Execution",color:C.green,items:["Every tool call: name, args, result, latency","Files modified (before and after diff)","External API calls made","Bash commands executed","Permissions in effect for each action"]},
      {cat:"Output & Assessment",color:C.steel,items:["Final response or artifact","Token usage (input vs output, cost)","Verifier/Judge verdicts","AC items checked and results","PR opened / changes merged"]},
    ];
    categories.forEach((cat,i) => {
      const col=i%2, row=Math.floor(i/2);
      const x=col===0?0.35:5.15, y=1.28+row*2.05, w=4.6, h=1.9;
      s.addShape(pres.shapes.RECTANGLE, {x,y,w,h,fill:{color:C.offWhite},shadow:shadow()});
      s.addShape(pres.shapes.RECTANGLE, {x,y,w,h:0.42,fill:{color:cat.color}});
      s.addText(cat.cat, {x:x+0.12,y,w:w-0.18,h:0.42,fontSize:13,color:C.white,bold:true,valign:"middle",margin:0});
      cat.items.forEach((item,j) => s.addText("\u2022 "+item, {x:x+0.16,y:y+0.5+j*0.28,w:w-0.28,h:0.26,fontSize:10.5,color:C.text,margin:0}));
    });
    s.addText("Data contracts must balance forensic needs against privacy, data residency, and retention requirements. Redact PII at capture time.", {x:0.35,y:5.3,w:9.3,h:0.26,fontSize:10,color:C.muted,italic:true,margin:0});
  }

  // SLIDE 5 — Key Metrics
  {
    const s = pres.addSlide(); s.background = { color: C.navy };
    s.addText("KEY OBSERVABILITY METRICS", {x:0.4,y:0.22,w:9,h:0.45,fontSize:13,color:C.iceBlue,bold:true,charSpacing:3,margin:0});
    s.addText("Measure what matters: reliability, quality, cost, and safety \u2014 not just latency", {x:0.4,y:0.72,w:9,h:0.36,fontSize:17,color:C.white,italic:true,margin:0});

    const mgroups = [
      {group:"Reliability",color:C.accent,metrics:[
        {m:"MTTD",full:"Mean Time to Detect unsafe/unexpected behaviour"},
        {m:"MTTI",full:"Mean Time to Intervene once unsafe behaviour detected"},
        {m:"Agent PR failure mode ratio",full:"% of PRs in each of the 3 failure modes (CI fail / wrong / nonsensical)"},
        {m:"Task success rate by tier",full:"Success rate segmented by task complexity tier"},
      ]},
      {group:"Quality",color:C.teal,metrics:[
        {m:"AC coverage per run",full:"% of acceptance criteria verified in each agent task"},
        {m:"Hallucination rate",full:"% of tool calls or facts that were fabricated (requires Judge evaluation)"},
        {m:"Scope adherence",full:"% of runs where agent stayed within specified file/task boundaries"},
        {m:"Rework rate",full:"% of agent PRs requiring >1 human redirect before merge"},
      ]},
      {group:"Cost",color:C.green,metrics:[
        {m:"Cost per task",full:"Total token spend divided by tasks completed (input + output tokens)"},
        {m:"Token efficiency",full:"Output quality per token spent \u2014 track flat or declining as scale grows"},
        {m:"Context utilisation",full:"% of context window used at peak \u2014 high utilisation signals compaction need"},
        {m:"Model routing efficiency",full:"% of tasks routed to cheaper models without quality loss"},
      ]},
      {group:"Safety",color:C.steel,metrics:[
        {m:"Anomalous tool invocations",full:"Spike in tool calls to unexpected domains or with unusual arguments"},
        {m:"Permission boundary violations",full:"Agent attempted action outside its granted permission scope"},
        {m:"Prompt injection signals",full:"Detected patterns consistent with prompt injection attempts"},
        {m:"HITL gate trigger rate",full:"How often agents hit hard gates \u2014 rising rate = escalating risk profile"},
      ]},
    ];
    mgroups.forEach((g,i) => {
      const col=i%2, row=Math.floor(i/2);
      const x=col===0?0.35:5.15, y=1.28+row*2.1, w=4.6, h=1.96;
      s.addShape(pres.shapes.RECTANGLE, {x,y,w,h,fill:{color:C.mid,transparency:18},shadow:shadow()});
      s.addShape(pres.shapes.RECTANGLE, {x,y,w,h:0.42,fill:{color:g.color,transparency:10}});
      s.addText(g.group, {x:x+0.12,y,w:w-0.18,h:0.42,fontSize:13,color:C.white,bold:true,charSpacing:2,valign:"middle",margin:0});
      g.metrics.forEach((m2,j) => {
        s.addText(m2.m+":", {x:x+0.14,y:y+0.5+j*0.36,w:w-0.22,h:0.2,fontSize:10.5,color:g.color,bold:true,margin:0});
        s.addText(m2.full, {x:x+0.14,y:y+0.7+j*0.36,w:w-0.22,h:0.14,fontSize:9.5,color:C.pale,margin:0});
      });
    });
  }

  // SLIDE 6 — Tooling Stack
  {
    const s = pres.addSlide(); s.background = { color: C.offWhite };
    s.addShape(pres.shapes.RECTANGLE, {x:0,y:0,w:10,h:0.82,fill:{color:C.navy}});
    s.addText("THE OBSERVABILITY TOOLING STACK", {x:0.4,y:0,w:9,h:0.82,fontSize:13,color:C.white,bold:true,charSpacing:3,valign:"middle",margin:0});
    s.addText("Start with OpenTelemetry GenAI semantic conventions as the foundation \u2014 everything else plugs in on top", {x:0.4,y:0.9,w:9.2,h:0.3,fontSize:12,color:C.muted,italic:true,margin:0});

    const layers = [
      {layer:"Instrumentation",color:C.navy,tools:[
        {name:"OpenTelemetry GenAI",desc:"Standard spans for prompts, tool calls, and safety filters. The foundation."},
        {name:"Anthropic Admin API",desc:"Token usage, cost, per-request metadata. Native to Claude."},
        {name:"Custom span attributes",desc:"Add business context: task ID, user ID, feature flag, spec version."},
      ]},
      {layer:"Tracing & Logging",color:C.accent,tools:[
        {name:"Langfuse / Traceloop",desc:"Open-source LLM tracing with cost attribution at trace and span level."},
        {name:"Portkey / Helicone",desc:"LLM gateway proxies: per-request cost tracking, budget limits, routing."},
        {name:"Datadog LLM Observability",desc:"Enterprise-grade; integrates with existing cloud cost management."},
      ]},
      {layer:"Enterprise SIEM",color:C.teal,tools:[
        {name:"Microsoft Sentinel + KQL",desc:"Stream agent telemetry. Define analytics rules to flag anomalies."},
        {name:"Splunk",desc:"Correlate agent events with broader security signals across the enterprise."},
        {name:"Azure AI Foundry",desc:"Native tracing for Claude deployments via Foundry. OTel-based."},
      ]},
      {layer:"Evaluation",color:C.green,tools:[
        {name:"LLM-as-Judge",desc:"Use a separate LLM to evaluate output correctness, scope, and quality."},
        {name:"Azure AI Red Teaming Agent",desc:"Automated adversarial testing against your deployed agent."},
        {name:"Human spot-check queues",desc:"Random sampling of agent runs for human quality review."},
      ]},
    ];

    layers.forEach((layer,i) => {
      const y=1.28+i*1.05;
      s.addShape(pres.shapes.RECTANGLE, {x:0.35,y,w:9.3,h:0.95,fill:{color:C.white},shadow:shadow()});
      s.addShape(pres.shapes.RECTANGLE, {x:0.35,y,w:1.5,h:0.95,fill:{color:layer.color}});
      s.addText(layer.layer, {x:0.35,y,w:1.5,h:0.95,fontSize:11,color:C.white,bold:true,align:"center",valign:"middle",margin:0});
      layer.tools.forEach((t,j) => {
        const tx=1.98+j*2.48;
        s.addShape(pres.shapes.RECTANGLE, {x:tx,y:y+0.12,w:2.34,h:0.72,fill:{color:layer.color,transparency:92}});
        s.addText(t.name, {x:tx+0.08,y:y+0.14,w:2.18,h:0.28,fontSize:11,color:layer.color,bold:true,margin:0});
        s.addText(t.desc, {x:tx+0.08,y:y+0.44,w:2.18,h:0.34,fontSize:9.5,color:C.muted,margin:0});
      });
    });
  }

  // SLIDE 7 — SIEM Integration
  {
    const s = pres.addSlide(); s.background = { color: C.white };
    s.addShape(pres.shapes.RECTANGLE, {x:0,y:0,w:10,h:0.82,fill:{color:C.navy}});
    s.addText("SIEM INTEGRATION  \u2014  AGENTS AS SECURITY SIGNALS", {x:0.4,y:0,w:9,h:0.82,fontSize:13,color:C.white,bold:true,charSpacing:3,valign:"middle",margin:0});
    s.addText("Agent telemetry must stream to your SIEM. In Sentinel, define KQL analytics rules to flag agent anomalies.", {x:0.4,y:0.9,w:9.2,h:0.3,fontSize:12,color:C.muted,italic:true,margin:0});

    // Alert rules
    const rules = [
      {rule:"Sudden spike in tool invocations",sig:"Agent called bash 40x in 5 minutes vs. baseline of 3-5",severity:"High",action:"Alert SOC, quarantine agent namespace"},
      {rule:"New external domain accessed",sig:"Agent made HTTP call to domain not on allowlist",severity:"Critical",action:"Immediate SOAR playbook: revoke agent credentials"},
      {rule:"Prompt injection signature",sig:"Tool call arguments contain known injection patterns",severity:"Critical",action:"Kill agent session, escalate to security team"},
      {rule:"Permission boundary breach attempt",sig:"Agent attempted action on file/API outside granted scope",severity:"High",action:"Block action, log full trace, alert Tech Lead"},
      {rule:"Unusual output volume",sig:"Agent response >50K tokens vs. baseline of <2K",severity:"Medium",action:"Flag for human review, check for data exfiltration pattern"},
      {rule:"HITL gate bypass attempt",sig:"Agent attempted irreversible action without hard gate approval",severity:"Critical",action:"Immediate halt, full forensic trace to security team"},
    ];
    rules.forEach((r,i) => {
      const y=1.28+i*0.72, c=r.severity==="Critical"?C.red:r.severity==="High"?"E07030":C.steel;
      s.addShape(pres.shapes.RECTANGLE, {x:0.35,y,w:9.3,h:0.66,fill:{color:i%2===0?C.offWhite:C.white}});
      s.addShape(pres.shapes.RECTANGLE, {x:0.35,y,w:0.06,h:0.66,fill:{color:c}});
      s.addShape(pres.shapes.RECTANGLE, {x:8.35,y:y+0.08,w:1.2,h:0.3,fill:{color:c,transparency:c===C.red?0:20}});
      s.addText(r.severity, {x:8.35,y:y+0.08,w:1.2,h:0.3,fontSize:10,color:C.white,bold:true,align:"center",valign:"middle",margin:0});
      s.addText(r.rule, {x:0.5,y:y+0.06,w:3.5,h:0.28,fontSize:12,color:C.navy,bold:true,margin:0});
      s.addText("Signal: "+r.sig, {x:0.5,y:y+0.36,w:7.7,h:0.24,fontSize:10,color:C.muted,margin:0});
    });
    s.addText("SOAR automation: quarantine agent namespace, revoke credentials, or force HITL gates when alert fires \u2014 Skywork AI Best Practices 2025", {x:0.35,y:5.62,w:9.3,h:0.22,fontSize:9.5,color:C.muted,italic:true,margin:0});
  }

  // SLIDE 8 — Building an Observability-First Culture
  {
    const s = pres.addSlide(); s.background = { color: C.navy };
    s.addText("OBSERVABILITY-FIRST CULTURE", {x:0.4,y:0.22,w:9,h:0.45,fontSize:13,color:C.iceBlue,bold:true,charSpacing:3,margin:0});
    s.addText("Gartner: 40% of agentic AI projects will be cancelled by 2027 due to unclear business value and inadequate risk controls", {x:0.4,y:0.72,w:9,h:0.36,fontSize:14,color:C.white,italic:true,margin:0});

    const principles = [
      {head:"Observe before you optimise",body:"Don\u2019t tune agents based on intuition. Collect baseline traces first, then let data drive improvement. You cannot optimise what you cannot see."},
      {head:"Every trace tells a story",body:"A trace is a forensic record of an agent\u2019s decisions. Treat it like a flight data recorder \u2014 invaluable after an incident, essential for continuous improvement."},
      {head:"Make cost visible to engineers",body:"Token spend is engineering spend. Show per-request cost on every PR. Engineers who see the cost of their prompt design change their behaviour."},
      {head:"Evaluation is continuous, not periodic",body:"Don\u2019t evaluate quality quarterly. Run evaluation on every significant agent run. Automated Judge + human spot-checks. Quality drift is invisible without it."},
      {head:"Security and observability are the same problem",body:"Every observability gap is a security gap. An agent action you can\u2019t see is an agent action you can\u2019t audit, control, or roll back."},
      {head:"Build trust through transparency",body:"44% of organisations rely on manual methods to monitor agent interactions. The path to full automation runs through full visibility first."},
    ];

    [[0,1,2],[3,4,5]].forEach((group,col) => {
      group.forEach((idx,row) => {
        const p=principles[idx], x=col===0?0.35:5.15, y=1.28+row*1.4, w=4.6, h=1.28;
        s.addShape(pres.shapes.RECTANGLE, {x,y,w,h,fill:{color:C.mid,transparency:18},shadow:shadow()});
        s.addShape(pres.shapes.RECTANGLE, {x,y,w:0.06,h,fill:{color:C.accent}});
        s.addText(p.head, {x:x+0.16,y:y+0.08,w:w-0.22,h:0.36,fontSize:12,color:C.accent,bold:true,margin:0});
        s.addText(p.body, {x:x+0.16,y:y+0.5,w:w-0.22,h:0.7,fontSize:11,color:C.pale,margin:0});
      });
    });
  }

  // SLIDE 9 — The 90-Day Observability Action Plan (Dynatrace)
  {
    const s = pres.addSlide(); s.background = { color: C.offWhite };
    s.addShape(pres.shapes.RECTANGLE, {x:0,y:0,w:10,h:0.82,fill:{color:C.teal}});
    s.addShape(pres.shapes.RECTANGLE, {x:0,y:0,w:0.35,h:0.82,fill:{color:C.navy}});
    s.addText("90-DAY OBSERVABILITY ACTION PLAN  \u00B7  Dynatrace 2026 Research", {x:0.5,y:0,w:9.1,h:0.82,fontSize:12,color:C.white,bold:true,charSpacing:2,valign:"middle",margin:0});
    s.addText("From experimentation to production \u2014 the research-backed path to observable agentic systems", {x:0.4,y:0.9,w:9.2,h:0.3,fontSize:12,color:C.muted,italic:true,margin:0});

    const phases = [
      {phase:"Days 1\u201330",title:"Foundation",color:C.navy,
       items:["Instrument all agent calls with OpenTelemetry GenAI spans","Establish baseline metrics: latency, token cost, task success rate","Define data contracts: what to log, retain, and redact","Set up SIEM integration and first anomaly detection rules","Identify top 3 failure patterns from existing agent runs"]},
      {phase:"Days 31\u201360",title:"Quality Gates",color:C.accent,
       items:["Deploy LLM-as-Judge evaluation on all production agent runs","Add cost visibility to every PR (per-request cost in CI)","Create human spot-check queue for 5% random sample","Define MTTD and MTTI baselines, set alert thresholds","Run first red-team exercise using Azure AI Red Teaming Agent"]},
      {phase:"Days 61\u201390",title:"Full Control Plane",color:C.green,
       items:["SOAR automation: quarantine, revoke, escalate on critical alerts","Continuous evaluation dashboard: quality drift visible in real time","Cost optimisation: model routing based on trace-informed complexity","Monthly observability review: what did we learn, what did we miss?","Publish agent health score: single metric visible to engineering org"]},
    ];

    phases.forEach((ph,i) => {
      const x=0.35+i*3.15, y=1.28;
      s.addShape(pres.shapes.RECTANGLE, {x,y,w:2.95,h:4.1,fill:{color:C.white},shadow:shadow()});
      s.addShape(pres.shapes.RECTANGLE, {x,y,w:2.95,h:0.72,fill:{color:ph.color}});
      s.addText(ph.phase, {x,y,w:2.95,h:0.38,fontSize:12,color:C.white,bold:true,align:"center",valign:"middle",margin:0});
      s.addText(ph.title, {x,y:y+0.38,w:2.95,h:0.32,fontSize:11,color:C.white,align:"center",margin:0});
      ph.items.forEach((item,j) => s.addText(`${j+1}. ${item}`, {x:x+0.14,y:y+0.82+j*0.64,w:2.68,h:0.6,fontSize:10.5,color:C.text,margin:0}));
      if(i<phases.length-1) s.addText("\u2192",{x:x+2.95,y:y+1.72,w:0.2,h:0.45,fontSize:18,color:C.muted,align:"center",margin:0});
    });
  }

  // SLIDE 10 — Anti-Patterns
  {
    const s = pres.addSlide(); s.background = { color: C.white };
    s.addShape(pres.shapes.RECTANGLE, {x:0,y:0,w:10,h:0.82,fill:{color:C.navy}});
    s.addText("OBSERVABILITY ANTI-PATTERNS", {x:0.4,y:0,w:9,h:0.82,fontSize:13,color:C.white,bold:true,charSpacing:3,valign:"middle",margin:0});
    s.addText("88% of AI pilots fail to reach production. Lack of observability is a primary cause.", {x:0.4,y:0.9,w:9.2,h:0.3,fontSize:12,color:C.muted,italic:true,margin:0});
    const aps = [
      {n:"01",head:"Logging only outputs",impact:"You can see what the agent said but not why, what tools it used, or what context it had.",fix:"Log the full trace: prompt, context, tool calls, reasoning, and output. All of it."},
      {n:"02",head:"No cost visibility",impact:"Token spend explodes unnoticed. Finance discovers the overrun at month-end.",fix:"Track cost per request in real time. Show it in CI. Set budget alerts that fire before damage is done."},
      {n:"03",head:"Manual monitoring only",impact:"44% of orgs use manual monitoring. It doesn\u2019t scale. Incidents are discovered by users, not operators.",fix:"Automate anomaly detection with KQL/SIEM rules. Human monitoring of exception queues only."},
      {n:"04",head:"Evaluation as an afterthought",impact:"Quality drift is invisible until users complain. By then, technical debt is compounded.",fix:"Run automated evaluation on every production run. Don\u2019t wait for quarterly reviews."},
      {n:"05",head:"No forensic retention",impact:"When an incident occurs, you have no way to reconstruct what the agent did and why.",fix:"Retain full traces for 90 days minimum. Define data contracts for PII redaction at capture time."},
      {n:"06",head:"Monitoring metrics not business value",impact:"You know the latency but not whether the agent is creating value. ROI stays invisible.",fix:"Connect metrics to business outcomes: cost-per-task vs. value-per-task. Justify investment with data."},
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

  // SLIDE 11 — Lab
  {
    const s = pres.addSlide(); s.background = { color: C.white };
    s.addShape(pres.shapes.RECTANGLE, {x:0,y:0,w:10,h:0.82,fill:{color:C.teal}});
    s.addText("LAB EXERCISE  \u00B7  30 MINUTES", {x:0.4,y:0,w:9,h:0.82,fontSize:13,color:C.white,bold:true,charSpacing:3,valign:"middle",margin:0});
    s.addText("Design an Observability Plan for Your Agentic Pipeline", {x:0.4,y:0.95,w:9.2,h:0.46,fontSize:19,color:C.navy,bold:true,margin:0});
    const steps = [
      {n:"1",t:"Define your capture contract",min:"8 min",d:"For the agent workflow from Module 2, list every data point you would capture at each step. What\u2019s a prompt, what\u2019s a tool call, what\u2019s an output? Where would PII appear and how would you redact it?"},
      {n:"2",t:"Choose your metrics",min:"7 min",d:"From the 4 metric categories (Reliability, Quality, Cost, Safety), pick 2 from each that are most relevant to your team. For each, define: baseline, alert threshold, and remediation action."},
      {n:"3",t:"Design 3 SIEM alert rules",min:"8 min",d:"Write 3 KQL-style alert rules for your agent workflow. Describe the signal, the threshold, the severity, and the automated response. Think like an attacker: what would a compromised agent look like in your logs?"},
      {n:"4",t:"Build your 90-day roadmap",min:"7 min",d:"Using the Dynatrace framework, draft your team\u2019s 90-day observability plan. What can you do in month 1 with no new tooling? What needs budget? What\u2019s the single most important first step?"},
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
    s.addText(["Q1.  If an agent produced a wrong answer in production today, how would you find out, and how quickly?","Q2.  Which of the 4 pillars is most absent from your current tooling? What\u2019s the impact?","Q3.  What would a \u2018daily agent health score\u2019 look like for your team? What would go into it?","Q4.  An agent in your pipeline just made 40 bash calls in 5 minutes. Walk through your incident response."].join("\n\n"), {x:0.5,y:1.4,w:5.1,h:3.1,fontSize:11.5,color:C.pale,margin:0});
    s.addShape(pres.shapes.RECTANGLE, {x:6.05,y:0.82,w:3.6,h:3.82,fill:{color:C.mid,transparency:20},shadow:shadow()});
    s.addShape(pres.shapes.RECTANGLE, {x:6.05,y:0.82,w:3.6,h:0.48,fill:{color:C.accent,transparency:10}});
    s.addText("KEY TAKEAWAYS", {x:6.05,y:0.82,w:3.6,h:0.48,fontSize:11,color:C.white,bold:true,charSpacing:2,align:"center",valign:"middle",margin:0});
    s.addText(["\u00B7 4 pillars: monitor, trace, log, evaluate","\u00B7 Agent observability \u2260 traditional APM","\u00B7 Capture the full context at every decision","\u00B7 MTTD + MTTI are your reliability metrics","\u00B7 OpenTelemetry GenAI is the standard","\u00B7 Stream to SIEM: agents = security signals","\u00B7 90-day plan: foundation \u2192 gates \u2192 control"].join("\n\n"), {x:6.2,y:1.4,w:3.35,h:3.1,fontSize:11.5,color:C.pale,margin:0});
    s.addShape(pres.shapes.RECTANGLE, {x:0.35,y:4.75,w:9.3,h:0.62,fill:{color:C.accent,transparency:18}});
    s.addText("NEXT  \u00B7  Module 08: Reliability & Security Engineering  \u2014  Identity, sandboxing, OWASP GenAI, kill switches", {x:0.35,y:4.75,w:9.3,h:0.62,fontSize:11.5,color:C.white,bold:true,align:"center",valign:"middle",margin:0});
  }

  await pres.writeFile({ fileName: "Module_07_Observability.pptx" });
  console.log("\u2705 Module 7 written");
}
build().catch(console.error);
