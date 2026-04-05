const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const { FaDollarSign, FaChartLine, FaRoute, FaLayerGroup, FaCompress, FaTachometerAlt, FaBalanceScale, FaDatabase, FaCogs, FaFilter } = require("react-icons/fa");

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
  pres.title = "Module 9: FinOps for Agentic Systems";

  // SLIDE 1 — Title
  {
    const s = pres.addSlide();
    s.background = { color:C.navy };
    s.addShape(pres.shapes.RECTANGLE, { x:0, y:0, w:0.18, h:5.625, fill:{ color:C.accent } });
    s.addText("ENTERPRISE AGENTIC PRACTICES", { x:0.4, y:0.32, w:9.2, h:0.35, fontSize:10, color:C.iceBlue, bold:true, charSpacing:4, margin:0 });
    s.addShape(pres.shapes.RECTANGLE, { x:0.4, y:0.82, w:1.5, h:0.38, fill:{ color:C.accent } });
    s.addText("MODULE 09", { x:0.4, y:0.82, w:1.5, h:0.38, fontSize:11, color:C.white, bold:true, align:"center", valign:"middle", margin:0 });
    s.addText("FinOps for\nAgentic Systems", { x:0.4, y:1.38, w:6.8, h:1.85, fontSize:48, color:C.white, bold:true, margin:0 });
    s.addText("Token economics, cost governance, and maximising ROI at agent scale", { x:0.4, y:3.3, w:7.0, h:0.52, fontSize:18, color:C.iceBlue, italic:true, margin:0 });
    s.addShape(pres.shapes.RECTANGLE, { x:0.4, y:3.98, w:3.5, h:0.04, fill:{ color:C.accent } });
    s.addText([
      { text:"Duration: ", options:{ bold:true, color:C.muted } },
      { text:"60–75 min  ", options:{ color:C.muted } },
      { text:"  |  ", options:{ color:C.muted } },
      { text:"Level: ", options:{ bold:true, color:C.muted } },
      { text:"Advanced", options:{ color:C.muted } }
    ], { x:0.4, y:4.15, w:5, h:0.38, fontSize:13, margin:0 });

    // Right — cost breakdown visual
    const metrics = [
      { label:"Input tokens", val:"$0.003/K", color:C.teal },
      { label:"Output tokens", val:"$0.015/K", color:C.accent },
      { label:"Agent steps", val:"\u00D7 loop depth", color:C.green },
      { label:"Retrieval ops", val:"\u00D7 chunk count", color:C.steel },
    ];
    metrics.forEach((m, i) => {
      const y = 0.85 + i*1.18;
      s.addShape(pres.shapes.RECTANGLE, { x:7.3, y, w:2.35, h:0.92, fill:{ color:m.color, transparency:15 }, shadow:shadow() });
      s.addText(m.label, { x:7.3, y, w:2.35, h:0.48, fontSize:12.5, color:C.white, bold:true, align:"center", valign:"middle", margin:0 });
      s.addText(m.val, { x:7.3, y:y+0.48, w:2.35, h:0.42, fontSize:14, color:C.pale, bold:true, align:"center", margin:0 });
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
      { icon:FaDollarSign,  color:C.accent, title:"Understand AI Cost Structure",   body:"Explain why AI costs are non-linear — token pricing, context window quadratics, output premiums, and how agent loops multiply costs." },
      { icon:FaTachometerAlt,color:C.teal,  title:"Define FinOps Metrics",          body:"Implement cost-per-token, cost-per-inference, cost-per-unit-of-work, and token efficiency ratio as operational KPIs." },
      { icon:FaRoute,       color:C.green,  title:"Apply Optimisation Levers",      body:"Use model routing, prompt compression, semantic caching, compaction, and context hygiene to reduce costs without sacrificing quality." },
      { icon:FaBalanceScale,color:C.steel,  title:"Build Cost Governance",          body:"Design budget limits, token quotas, alerting thresholds, and FinOps dashboards that give engineering and finance a shared view." },
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

  // SLIDE 3 — Why AI Costs Are Different
  {
    const s = pres.addSlide();
    s.background = { color:C.navy };
    s.addText("WHY AI COSTS ARE DIFFERENT", { x:0.4, y:0.22, w:9, h:0.45, fontSize:13, color:C.iceBlue, bold:true, charSpacing:3, margin:0 });
    s.addText("Cloud bills CPU hours. AI bills semantic units \u2014 and they compound in ways that aren\u2019t obvious", { x:0.4, y:0.72, w:9, h:0.36, fontSize:17, color:C.white, italic:true, margin:0 });

    const diffs = [
      { head:"Output tokens cost 3\u20138\u00D7 more", body:"Nearly all major providers price output tokens significantly higher than input tokens. Agents that generate verbose intermediate reasoning (chain-of-thought) pay this premium on every step." },
      { head:"Context window scales quadratically", body:"A 128K-token context costs 64\u00D7 more to process than an 8K context due to attention matrix scaling. Unbounded context growth is a FinOps disaster." },
      { head:"Agent loops multiply everything", body:"A ReAct loop running 10 cycles can consume 50\u00D7 the tokens of a single linear pass. Each iteration sends the full conversation history as context." },
      { head:"Retrieval adds a third cost dimension", body:"RAG pipelines incur embedding costs, retrieval costs, and re-ranking costs before the LLM even sees a token. Tune chunk size and retrieval depth carefully." },
      { head:"Quality and safety cost money", body:"Guardrails, Judge LLMs, verifiers, and evaluation runs all add cost. Budget for reliability infrastructure, not just generation." },
      { head:"Costs are non-linear with scale", body:"A feature that costs $0.001/request seems cheap until it runs 1M times/day. Plan for 10\u00D7 scale from day one and model cost growth curves." },
    ];

    [[0,1,2],[3,4,5]].forEach((group, col) => {
      group.forEach((idx, row) => {
        const d = diffs[idx];
        const x = col===0 ? 0.35 : 5.15, y = 1.28+row*1.42, w=4.6, h=1.28;
        s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill:{ color:C.mid, transparency:18 }, shadow:shadow() });
        s.addShape(pres.shapes.RECTANGLE, { x, y, w:0.06, h, fill:{ color:C.accent } });
        s.addText(d.head, { x:x+0.16, y:y+0.08, w:4.3, h:0.34, fontSize:13, color:C.accent, bold:true, margin:0 });
        s.addText(d.body,  { x:x+0.16, y:y+0.48, w:4.3, h:0.72, fontSize:11, color:C.pale, margin:0 });
      });
    });
  }

  // SLIDE 4 — Key FinOps Metrics
  {
    const s = pres.addSlide();
    s.background = { color:C.white };
    s.addShape(pres.shapes.RECTANGLE, { x:0, y:0, w:10, h:0.82, fill:{ color:C.navy } });
    s.addText("KEY FINOPS METRICS FOR AGENTS", { x:0.4, y:0, w:9, h:0.82, fontSize:13, color:C.white, bold:true, charSpacing:3, valign:"middle", margin:0 });
    s.addText("Connect every metric to business value. If you can\u2019t answer \u201Cis this justified?\u201D, you don\u2019t have enough visibility.", { x:0.4, y:0.9, w:9.2, h:0.3, fontSize:12, color:C.muted, italic:true, margin:0 });

    const metrics = [
      { metric:"Cost per token", tier:"Base", color:C.steel, how:"Provider API billing", why:"Baseline unit. Varies by model, input vs output, and cached vs fresh." },
      { metric:"Cost per request", tier:"Operational", color:C.teal, how:"(Input + Output tokens) \u00D7 rate", why:"Enables per-feature cost tracking and user-level attribution." },
      { metric:"Cost per unit of work", tier:"Business", color:C.accent, how:"Cost / (PRs, tickets, features)", why:"The only metric finance understands. Everything else is implementation." },
      { metric:"Token efficiency ratio", tier:"Quality", color:C.green, how:"Output quality score / tokens spent", why:"Are you getting value per token? Detects wasteful verbose prompts." },
      { metric:"Tokens per user session", tier:"Ops", color:C.teal, how:"Total tokens / active sessions", why:"Track flat or declining as usage grows. Rising = efficiency problem." },
      { metric:"Cost per agent loop iteration", tier:"Agent-specific", color:C.accent, how:"Total cost / loop count", why:"Exposes runaway loops. Should decrease as agents get better at one-shot." },
    ];

    const colX = [0.35, 2.62, 5.0];
    const colW = [2.17, 2.28, 4.65];
    const hColors = [C.pale, "D6E8FB", "D0EDE5"];

    ["Metric", "Tier", "How to measure  \u00B7  Why it matters"].forEach((h, ci) => {
      s.addShape(pres.shapes.RECTANGLE, { x:colX[ci], y:1.28, w:colW[ci], h:0.42, fill:{ color:hColors[ci] } });
      s.addText(h, { x:colX[ci]+0.08, y:1.28, w:colW[ci]-0.1, h:0.42, fontSize:11, color:C.navy, bold:true, charSpacing:ci===0?2:0, valign:"middle", margin:0 });
    });

    metrics.forEach((m, i) => {
      const y = 1.76 + i*0.625;
      const bg = i%2===0 ? C.white : C.offWhite;
      s.addShape(pres.shapes.RECTANGLE, { x:colX[0], y, w:colW[0], h:0.58, fill:{ color:C.pale } });
      s.addShape(pres.shapes.RECTANGLE, { x:colX[1], y, w:colW[1], h:0.58, fill:{ color:bg } });
      s.addShape(pres.shapes.RECTANGLE, { x:colX[2], y, w:colW[2], h:0.58, fill:{ color:bg } });
      s.addShape(pres.shapes.RECTANGLE, { x:colX[0], y, w:0.06, h:0.58, fill:{ color:m.color } });
      s.addText(m.metric, { x:colX[0]+0.14, y, w:colW[0]-0.2, h:0.58, fontSize:11.5, color:C.navy, bold:true, valign:"middle", margin:0 });
      s.addShape(pres.shapes.RECTANGLE, { x:colX[1]+0.08, y:y+0.14, w:colW[1]-0.16, h:0.3, fill:{ color:m.color, transparency:80 } });
      s.addText(m.tier, { x:colX[1]+0.08, y:y+0.14, w:colW[1]-0.16, h:0.3, fontSize:10, color:m.color, bold:true, align:"center", valign:"middle", margin:0 });
      s.addText(m.how + "  \u00B7  " + m.why, { x:colX[2]+0.1, y, w:colW[2]-0.16, h:0.58, fontSize:10.5, color:C.muted, valign:"middle", margin:0 });
    });
  }

  // SLIDE 5 — The Six Optimisation Levers
  {
    const s = pres.addSlide();
    s.background = { color:C.offWhite };
    s.addShape(pres.shapes.RECTANGLE, { x:0, y:0, w:10, h:0.82, fill:{ color:C.teal } });
    s.addText("THE SIX OPTIMISATION LEVERS", { x:0.4, y:0, w:9, h:0.82, fontSize:13, color:C.white, bold:true, charSpacing:3, valign:"middle", margin:0 });
    s.addText("Apply in order of effort vs impact. Start with levers 1\u20133 before building infrastructure for 4\u20136.", { x:0.4, y:0.9, w:9.2, h:0.3, fontSize:12, color:C.muted, italic:true, margin:0 });

    const levers = [
      { n:"01", head:"Prompt Optimisation",     color:C.navy,   saving:"15\u201325% cost reduction",
        how:"Add \u201Cbe concise\u201D to prompts. Remove examples that don\u2019t contribute. Strip redundant instructions. Spot expensive prompts in telemetry and refine.\u201CBe concise\u201D alone saves 15\u201325% (FinOps Foundation)." },
      { n:"02", head:"Model Routing",           color:C.teal,   saving:"30\u201370% cost reduction",
        how:"Route simple queries to cheaper/faster models (Claude Haiku, GPT-4o mini). Reserve frontier models (Opus, GPT-4o) for complex reasoning. LiteLLM, Portkey, OpenRouter all support this out of the box." },
      { n:"03", head:"Context Compaction",      color:C.accent, saving:"40\u201360% cost reduction",
        how:"Prevent quadratic context growth. Clear tool results from history. Compact conversation at defined thresholds. A 10-cycle ReAct loop without compaction can cost 50\u00D7 a compacted equivalent." },
      { n:"04", head:"Semantic Caching",        color:C.green,  saving:"20\u201350% cost reduction",
        how:"Cache LLM responses for semantically similar queries. Portkey/Helicone provide caching layers with configurable similarity thresholds. Most effective for repeated lookup patterns." },
      { n:"05", head:"Prompt Compression",      color:C.steel,  saving:"Up to 90% input cost reduction",
        how:"LLMLingua and similar tools compress prompts with a small, fast model before sending to the large model. 20\u00D7 compression ratios on verbose prompts. Acceptable quality degradation for most tasks." },
      { n:"06", head:"Provisioned Throughput",  color:C.accent, saving:"33% cost vs on-demand",
        how:"For predictable, high-volume workloads: purchase provisioned throughput (PTUs on Azure, reserved capacity on AWS Bedrock). Tradeoff: commit to volume, gain cost predictability and lower latency." },
    ];

    [[0,1,2],[3,4,5]].forEach((group, col) => {
      group.forEach((idx, row) => {
        const lv = levers[idx];
        const x = col===0 ? 0.35 : 5.1, y = 1.28+row*1.42, w=4.55, h=1.3;
        s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill:{ color:C.white }, shadow:shadow() });
        s.addShape(pres.shapes.RECTANGLE, { x, y, w:0.46, h, fill:{ color:lv.color } });
        s.addText(lv.n, { x, y, w:0.46, h, fontSize:16, color:C.white, bold:true, align:"center", valign:"middle", margin:0 });
        s.addText(lv.head, { x:x+0.56, y:y+0.06, w:w-0.66, h:0.3, fontSize:13, color:C.navy, bold:true, margin:0 });
        s.addShape(pres.shapes.RECTANGLE, { x:x+3.2, y:y+0.08, w:1.28, h:0.24, fill:{ color:lv.color, transparency:80 } });
        s.addText(lv.saving, { x:x+3.2, y:y+0.08, w:1.28, h:0.24, fontSize:9, color:lv.color, bold:true, align:"center", valign:"middle", margin:0 });
        s.addText(lv.how, { x:x+0.56, y:y+0.42, w:w-0.66, h:0.8, fontSize:10, color:C.muted, margin:0 });
      });
    });
  }

  // SLIDE 6 — Cost Governance Model
  {
    const s = pres.addSlide();
    s.background = { color:C.white };
    s.addShape(pres.shapes.RECTANGLE, { x:0, y:0, w:10, h:0.82, fill:{ color:C.navy } });
    s.addText("COST GOVERNANCE MODEL", { x:0.4, y:0, w:9, h:0.82, fontSize:13, color:C.white, bold:true, charSpacing:3, valign:"middle", margin:0 });
    s.addText("Visibility \u2192 Allocation \u2192 Optimisation  \u2014  the three FinOps pillars applied to agent workloads", { x:0.4, y:0.9, w:9.2, h:0.3, fontSize:12, color:C.muted, italic:true, margin:0 });

    const pillars = [
      {
        head:"VISIBILITY", color:C.navy, icon:FaTachometerAlt,
        items:[
          "Make cost of every model call visible to engineers",
          "Per-feature, per-team, per-user cost breakdowns",
          "Real-time spend dashboards (Grafana, Datadog)",
          "Alert on anomalies within minutes, not months",
          "Connect token usage to business outcomes",
        ]
      },
      {
        head:"ALLOCATION", color:C.teal, icon:FaLayerGroup,
        items:[
          "Tag requests by team, feature, and customer",
          "Standardise API key naming conventions",
          "Enforce one key per team/feature boundary",
          "Chargeback to cost centres by consumption",
          "Track cost-per-user for SaaS products",
        ]
      },
      {
        head:"OPTIMISATION", color:C.green, icon:FaFilter,
        items:[
          "Identify most expensive prompts in telemetry",
          "Apply routing: cheap model first, escalate only if needed",
          "Set hard token budget limits at gateway level",
          "Auto-throttle/pause when budget is exhausted",
          "Run optimisation sprints quarterly against KPIs",
        ]
      },
    ];

    for (let i = 0; i < 3; i++) {
      const p = pillars[i];
      const x = 0.35 + i*3.15, y = 1.28;
      s.addShape(pres.shapes.RECTANGLE, { x, y, w:2.95, h:4.1, fill:{ color:C.offWhite }, shadow:shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y, w:2.95, h:0.58, fill:{ color:p.color } });
      const ic = await icon(p.icon, "#FFFFFF");
      s.addImage({ data:ic, x:x+0.2, y:y+0.13, w:0.32, h:0.32 });
      s.addText(p.head, { x:x+0.58, y, w:2.28, h:0.58, fontSize:16, color:C.white, bold:true, valign:"middle", margin:0 });
      p.items.forEach((item, j) => {
        s.addText(`\u2022 ${item}`, { x:x+0.15, y:y+0.66+j*0.68, w:2.65, h:0.62, fontSize:11, color:C.text, margin:0 });
      });
    }
  }

  // SLIDE 7 — FinOps Tooling
  {
    const s = pres.addSlide();
    s.background = { color:C.navy };
    s.addText("FINOPS TOOLING FOR AI WORKLOADS", { x:0.4, y:0.22, w:9, h:0.45, fontSize:13, color:C.iceBlue, bold:true, charSpacing:3, margin:0 });
    s.addText("The LLM observability stack has matured to include cost dimensions alongside traditional metrics  \u2014 Zylos Research, 2026", { x:0.4, y:0.72, w:9, h:0.36, fontSize:14, color:C.white, italic:true, margin:0 });

    const tools = [
      { name:"Vantage", cat:"FinOps Platform", color:C.accent,
        desc:"Native Anthropic + cloud cost in one view. MCP server for agent-driven cost queries. Best for: teams scaling Claude/GPT usage who need cost next to infra spend." },
      { name:"Langfuse / Traceloop", cat:"LLM Tracing", color:C.teal,
        desc:"Open-source LLM tracing with cost attribution at trace and span level. Integrates with existing observability stacks. Best for: teams wanting open-source cost visibility." },
      { name:"Portkey / Helicone", cat:"LLM Gateway Proxy", color:C.green,
        desc:"LLM gateway proxies that inject per-request cost tracking, budget limits, and usage breakdowns without code changes. Also enables semantic caching and model routing." },
      { name:"Datadog LLM Obs.", cat:"Enterprise APM", color:C.steel,
        desc:"Enterprise-grade cost monitoring integrated with existing cloud cost management. Pulls from provider APIs. Best for: orgs already on Datadog with existing cloud cost dashboards." },
      { name:"FinOps Foundation", cat:"Framework + Community", color:C.iceBlue,
        desc:"Working groups on FinOps for AI, benchmark data, cost optimisation guides, and FOCUS standard for multi-cloud billing normalisation. Free resources at finops.org." },
      { name:"Natively (Grafana)", cat:"DIY Dashboard", color:C.mid,
        desc:"Export token usage from provider APIs, build Grafana panels: cost by team, tokens per request by model, budget burn rate. Full control, more engineering investment." },
    ];

    [[0,1,2],[3,4,5]].forEach((group, col) => {
      group.forEach((idx, row) => {
        const t = tools[idx];
        const x = col===0 ? 0.35 : 5.15, y = 1.28+row*1.42, w=4.6, h=1.28;
        s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill:{ color:C.mid, transparency:18 }, shadow:shadow() });
        s.addShape(pres.shapes.RECTANGLE, { x, y, w, h:0.42, fill:{ color:t.color, transparency:10 } });
        s.addText(t.name, { x:x+0.1, y, w:2.8, h:0.42, fontSize:14, color:C.white, bold:true, valign:"middle", margin:0 });
        s.addShape(pres.shapes.RECTANGLE, { x:x+3.2, y:y+0.07, w:1.32, h:0.28, fill:{ color:t.color, transparency:60 } });
        s.addText(t.cat, { x:x+3.2, y:y+0.07, w:1.32, h:0.28, fontSize:8.5, color:C.white, align:"center", valign:"middle", margin:0 });
        s.addText(t.desc, { x:x+0.1, y:y+0.48, w:w-0.2, h:0.72, fontSize:10.5, color:C.pale, margin:0 });
      });
    });
  }

  // SLIDE 8 — The ROI Equation
  {
    const s = pres.addSlide();
    s.background = { color:C.offWhite };
    s.addShape(pres.shapes.RECTANGLE, { x:0, y:0, w:10, h:0.82, fill:{ color:C.navy } });
    s.addText("THE ROI EQUATION", { x:0.4, y:0, w:9, h:0.82, fontSize:13, color:C.white, bold:true, charSpacing:3, valign:"middle", margin:0 });
    s.addText("FinOps is not just cost cutting \u2014 it\u2019s maximising value per dollar spent on AI", { x:0.4, y:0.9, w:9.2, h:0.3, fontSize:12.5, color:C.muted, italic:true, margin:0 });

    // ROI formula
    s.addShape(pres.shapes.RECTANGLE, { x:0.35, y:1.28, w:9.3, h:0.9, fill:{ color:C.pale }, shadow:shadow() });
    s.addText("ROI  =  (Value Generated \u2212 Total AI Cost)  \u00F7  Total AI Cost  \u00D7  100", {
      x:0.35, y:1.28, w:9.3, h:0.9, fontSize:22, color:C.navy, bold:true, align:"center", valign:"middle", margin:0
    });
    s.addText("Companies deploying agentic AI report average ROI of 171% (U.S. enterprises: ~192%) \u2014 3\u00D7 traditional automation ROI", {
      x:0.35, y:2.25, w:9.3, h:0.28, fontSize:11, color:C.muted, italic:true, align:"center", margin:0
    });

    // Value drivers vs cost drivers
    s.addShape(pres.shapes.RECTANGLE, { x:0.35, y:2.65, w:4.55, h:2.73, fill:{ color:C.white }, shadow:shadow() });
    s.addShape(pres.shapes.RECTANGLE, { x:0.35, y:2.65, w:4.55, h:0.42, fill:{ color:C.green } });
    s.addText("\u2191  VALUE DRIVERS", { x:0.35, y:2.65, w:4.55, h:0.42, fontSize:12, color:C.white, bold:true, align:"center", valign:"middle", margin:0 });
    const values = [
      "Developer velocity (features / sprint)",
      "Reduced QA and rework cycles",
      "Lower cost of routine operations",
      "Faster time-to-market",
      "24/7 operation without human overtime",
    ];
    values.forEach((v, i) => {
      s.addText(`\u2713  ${v}`, { x:0.5, y:3.15+i*0.42, w:4.25, h:0.38, fontSize:11.5, color:C.text, margin:0 });
    });

    s.addShape(pres.shapes.RECTANGLE, { x:5.1, y:2.65, w:4.55, h:2.73, fill:{ color:C.white }, shadow:shadow() });
    s.addShape(pres.shapes.RECTANGLE, { x:5.1, y:2.65, w:4.55, h:0.42, fill:{ color:"B03040" } });
    s.addText("\u2193  COST DRIVERS", { x:5.1, y:2.65, w:4.55, h:0.42, fontSize:12, color:C.white, bold:true, align:"center", valign:"middle", margin:0 });
    const costs = [
      "Token consumption (input + output)",
      "Infrastructure (compute, networking)",
      "Reliability layer (verifiers, judges)",
      "Human oversight time (HITL gates)",
      "Observability and monitoring stack",
    ];
    costs.forEach((c, i) => {
      s.addText(`\u2715  ${c}`, { x:5.25, y:3.15+i*0.42, w:4.25, h:0.38, fontSize:11.5, color:C.muted, margin:0 });
    });

    s.addText("Avoid vanity metrics: 1M requests at $0.001 = $1,000. Is it generating at least $1,000 of value? Always connect usage metrics to cost, and cost to business value.", {
      x:0.35, y:5.3, w:9.3, h:0.28, fontSize:10, color:C.muted, italic:true, margin:0
    });
  }

  // SLIDE 9 — FinOps Anti-Patterns
  {
    const s = pres.addSlide();
    s.background = { color:C.white };
    s.addShape(pres.shapes.RECTANGLE, { x:0, y:0, w:10, h:0.82, fill:{ color:C.navy } });
    s.addText("FINOPS ANTI-PATTERNS", { x:0.4, y:0, w:9, h:0.82, fontSize:13, color:C.white, bold:true, charSpacing:3, valign:"middle", margin:0 });
    s.addText("These patterns are burning enterprise AI budgets right now. Know them before they hit your P&L.", { x:0.4, y:0.9, w:9.2, h:0.3, fontSize:12, color:C.muted, italic:true, margin:0 });

    const aps = [
      { n:"01", head:"No cost visibility",         impact:"Costs discovered at month-end. No ability to detect anomalies or attribute spend to teams.", fix:"Deploy an LLM gateway proxy day one. Cost tracking is not optional infrastructure." },
      { n:"02", head:"One model for everything",   impact:"Using GPT-4o or Claude Opus for every task, including simple lookups that Haiku handles fine.", fix:"Implement model routing. Classify request complexity, route to cheapest model that handles it." },
      { n:"03", head:"Unbounded context windows",  impact:"Agents accumulating history across 100+ tool calls, paying quadratic compute costs.", fix:"Set compaction thresholds. Implement tool result clearing. Define max context per agent type." },
      { n:"04", head:"Verbose prompts at scale",   impact:"Unnecessary examples, redundant instructions, and boilerplate burning 20\u201330% of budget.", fix:"\u201CBe concise\u201D saves 15\u201325%. Audit top 10 most expensive prompts quarterly and refine." },
      { n:"05", head:"No budget guardrails",        impact:"Single runaway agent loop exhausts monthly AI budget overnight. Discovered in morning standup.", fix:"Hard token budget limits at gateway level. Auto-throttle at 80% of budget. Alert at 50%." },
      { n:"06", head:"Vanity metrics only",         impact:"Tracking request count and uptime but not cost-per-unit-of-work. Cannot justify AI investment to CFO.", fix:"Define and track 3 business-level metrics: cost per feature, cost per support deflection, etc." },
    ];

    [[0,1,2],[3,4,5]].forEach((group, col) => {
      group.forEach((idx, row) => {
        const ap = aps[idx];
        const x = col===0 ? 0.35 : 5.1, y = 1.28+row*1.42, w=4.55, h=1.3;
        s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill:{ color:C.offWhite }, shadow:shadow() });
        s.addShape(pres.shapes.RECTANGLE, { x, y, w:0.45, h, fill:{ color:"B03040", transparency:10 } });
        s.addText(ap.n, { x, y, w:0.45, h, fontSize:14, color:C.white, bold:true, align:"center", valign:"middle", margin:0 });
        s.addText(ap.head, { x:x+0.55, y:y+0.06, w:w-0.65, h:0.3, fontSize:12.5, color:C.navy, bold:true, margin:0 });
        s.addText(`\u26A0 ${ap.impact}`, { x:x+0.55, y:y+0.42, w:w-0.65, h:0.36, fontSize:10.5, color:"B03040", margin:0 });
        s.addText(`\u2713 ${ap.fix}`,    { x:x+0.55, y:y+0.82, w:w-0.65, h:0.4,  fontSize:10.5, color:C.green,  margin:0 });
      });
    });
  }

  // SLIDE 10 — FinOps Governance Dashboard
  {
    const s = pres.addSlide();
    s.background = { color:C.navy };
    s.addText("FINOPS GOVERNANCE DASHBOARD", { x:0.4, y:0.22, w:9, h:0.45, fontSize:13, color:C.iceBlue, bold:true, charSpacing:3, margin:0 });
    s.addText("What engineering, finance, and product need to see together in one view", { x:0.4, y:0.72, w:9, h:0.36, fontSize:17, color:C.white, italic:true, margin:0 });

    const panels = [
      { title:"Spend Overview", color:C.accent, metrics:["Total AI spend this month: $12,450", "Budget remaining: $7,550 (38%)", "Projected month-end: $18,200", "MoM change: +23%"] },
      { title:"Cost by Team", color:C.teal, metrics:["Platform: $4,200 (34%)", "Product: $3,800 (31%)", "Data: $2,900 (23%)", "Infra: $1,550 (12%)"] },
      { title:"Model Distribution", color:C.green, metrics:["Claude Sonnet: $6,800 (55%)", "Claude Haiku: $2,100 (17%)", "Claude Opus: $3,550 (28%)", "Routing efficiency: 72%"] },
      { title:"Unit Economics", color:C.steel, metrics:["Cost per PR: $0.42", "Cost per support deflection: $0.18", "Cost per feature shipped: $156", "Token efficiency: 84% (target: 90%)"] },
      { title:"Alerts & Anomalies", color:"B03040", metrics:["1 alert: Data team 140% of daily budget", "3 runaway loops detected (auto-stopped)", "New model API key detected (untagged)", "Cost spike +340% at 02:14 UTC"] },
      { title:"Optimisation Wins", color:C.green, metrics:["Routing saved $1,240 this month", "Compaction saved $880 this month", "\u201CBe concise\u201D prompts saved $320", "Caching hit rate: 31% (\u2191 from 18%)"] },
    ];

    [[0,1,2],[3,4,5]].forEach((group, col) => {
      group.forEach((idx, row) => {
        const p = panels[idx];
        const x = col===0 ? 0.35 : 5.15, y = 1.28+row*1.42, w=4.6, h=1.28;
        s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill:{ color:C.mid, transparency:18 }, shadow:shadow() });
        s.addShape(pres.shapes.RECTANGLE, { x, y, w, h:0.38, fill:{ color:p.color, transparency:10 } });
        s.addText(p.title, { x:x+0.1, y, w:w-0.2, h:0.38, fontSize:12, color:C.white, bold:true, valign:"middle", margin:0 });
        p.metrics.forEach((m, j) => {
          s.addText(m, { x:x+0.1, y:y+0.45+j*0.21, w:w-0.2, h:0.2, fontSize:10.5, color:C.pale, margin:0 });
        });
      });
    });
  }

  // SLIDE 11 — Lab
  {
    const s = pres.addSlide();
    s.background = { color:C.white };
    s.addShape(pres.shapes.RECTANGLE, { x:0, y:0, w:10, h:0.82, fill:{ color:C.teal } });
    s.addText("LAB EXERCISE  \u00B7  30 MINUTES", { x:0.4, y:0, w:9, h:0.82, fontSize:13, color:C.white, bold:true, charSpacing:3, valign:"middle", margin:0 });
    s.addText("Cost-Model Your Team\u2019s Claude Code Usage", { x:0.4, y:0.92, w:9.2, h:0.42, fontSize:19, color:C.navy, bold:true, margin:0 });
    s.addShape(pres.shapes.RECTANGLE, { x:0.35, y:1.4, w:9.3, h:0.26, fill:{ color:C.pale } });
    s.addText("Scope: focuses on the cost of using Claude Code and GitHub Copilot in your development workflow \u2014 not production agent costs (same principles apply once you ship production agents)", { x:0.45, y:1.4, w:9.1, h:0.26, fontSize:9.5, color:C.navy, italic:true, valign:"middle", margin:0 });

    const steps = [
      { n:"1", t:"Estimate token costs", min:"7 min", d:"Pick one real Claude Code workflow your team uses. Estimate: LLM calls per run, context size, model tier. Use current Claude Sonnet pricing. What does one run cost? What does 20 developer runs/day cost?" },
      { n:"2", t:"Apply the five levers", min:"6 min", d:"Which of the five optimisation levers apply to your coding agent workflow? For each applicable lever: estimate % savings and implementation effort (1\u20135). Which single change would you make first?" },
      { n:"3", t:"Design your budget architecture", min:"6 min", d:"Define cost limits at each level: org, team, per-developer session, per-task request. What triggers each alert? What is automated vs manual?" },
      { n:"4", t:"Choose your tooling", min:"4 min", d:"Langfuse, Vantage, Portkey, or native Anthropic usage dashboards? What is the one view your tech lead checks weekly?" },
      { n:"5", t:"Share your $/day estimate", min:"2 min", d:"What surprised you? Where is the biggest cost risk in your current usage patterns? What habit would you change today?" },
    ];

    for (let i = 0; i < steps.length; i++) {
      const st = steps[i];
      const y = 1.74+i*0.78;
      s.addShape(pres.shapes.RECTANGLE, { x:0.35, y, w:9.3, h:0.7, fill:{ color:C.offWhite }, shadow:shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x:0.35, y, w:0.52, h:0.7, fill:{ color:C.teal } });
      s.addText(st.n, { x:0.35, y, w:0.52, h:0.7, fontSize:20, color:C.white, bold:true, align:"center", valign:"middle", margin:0 });
      s.addText(st.t, { x:0.97, y:y+0.06, w:2.3, h:0.26, fontSize:12.5, color:C.teal, bold:true, margin:0 });
      s.addText("("+st.min+")", { x:3.27, y:y+0.06, w:0.8, h:0.26, fontSize:11, color:C.muted, italic:true, margin:0 });
      s.addText(st.d, { x:0.97, y:y+0.36, w:8.55, h:0.3, fontSize:10.5, color:C.muted, margin:0 });
    }
  }

  // SLIDE 12 — Discussion + Summary
  {
    const s = pres.addSlide();
    s.background = { color:C.navy };
    s.addShape(pres.shapes.RECTANGLE, { x:9.82, y:0, w:0.18, h:5.625, fill:{ color:C.accent } });
    s.addText("DISCUSSION + MODULE SUMMARY", { x:0.4, y:0.22, w:9, h:0.45, fontSize:13, color:C.iceBlue, bold:true, charSpacing:3, margin:0 });

    s.addShape(pres.shapes.RECTANGLE, { x:0.35, y:0.82, w:5.5, h:3.82, fill:{ color:C.mid, transparency:20 }, shadow:shadow() });
    s.addShape(pres.shapes.RECTANGLE, { x:0.35, y:0.82, w:5.5, h:0.48, fill:{ color:C.iceBlue, transparency:15 } });
    s.addText("DISCUSSION QUESTIONS", { x:0.35, y:0.82, w:5.5, h:0.48, fontSize:11, color:C.white, bold:true, charSpacing:2, align:"center", valign:"middle", margin:0 });
    const qs = [
      "Q1.  Do you currently have cost-per-unit-of-work visibility for your AI features? If not, what\u2019s the nearest proxy?",
      "Q2.  Which of the six optimisation levers could you deploy in the next sprint with no new infrastructure?",
      "Q3.  If your AI spend doubled tomorrow, would you know within the hour? What\u2019s your alert setup today?",
      "Q4.  How do you currently justify AI investment to your CFO or leadership? What would cost-per-feature data change?",
    ];
    s.addText(qs.join("\n\n"), { x:0.5, y:1.4, w:5.1, h:3.1, fontSize:11.5, color:C.pale, margin:0 });

    s.addShape(pres.shapes.RECTANGLE, { x:6.05, y:0.82, w:3.6, h:3.82, fill:{ color:C.mid, transparency:20 }, shadow:shadow() });
    s.addShape(pres.shapes.RECTANGLE, { x:6.05, y:0.82, w:3.6, h:0.48, fill:{ color:C.accent, transparency:10 } });
    s.addText("KEY TAKEAWAYS", { x:6.05, y:0.82, w:3.6, h:0.48, fontSize:11, color:C.white, bold:true, charSpacing:2, align:"center", valign:"middle", margin:0 });
    const tks = [
      "\u00B7 Output tokens cost 3\u20138\u00D7 more than input",
      "\u00B7 10-cycle loops = 50\u00D7 cost without compaction",
      "\u00B7 \u201CBe concise\u201D alone saves 15\u201325%",
      "\u00B7 Route: cheap model first, escalate if needed",
      "\u00B7 Visibility \u2192 Allocation \u2192 Optimisation",
      "\u00B7 Define cost-per-unit-of-work before deploying",
      "\u00B7 Average agent ROI: 171% \u2014 but only if governed",
    ];
    s.addText(tks.join("\n\n"), { x:6.2, y:1.4, w:3.35, h:3.1, fontSize:11.5, color:C.pale, margin:0 });

    s.addShape(pres.shapes.RECTANGLE, { x:0.35, y:4.75, w:9.3, h:0.62, fill:{ color:C.accent, transparency:18 } });
    s.addText("NEXT  \u00B7  Module 10: Design Reviews  \u2014  Agent-first design, AX, ADRs, and the pre-deployment design review", {
      x:0.35, y:4.75, w:9.3, h:0.62, fontSize:11.5, color:C.white, bold:true, align:"center", valign:"middle", margin:0
    });
  }

  await pres.writeFile({ fileName: "Module_09_FinOps.pptx" });
  console.log("\u2705 Module 9 written");
}

build().catch(console.error);
