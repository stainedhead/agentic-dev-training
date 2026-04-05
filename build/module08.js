const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const { FaShieldAlt, FaIdBadge, FaLock, FaEye, FaBan, FaCheckCircle, FaBug, FaNetworkWired, FaKey, FaExclamationTriangle, FaUserShield, FaToggleOff } = require("react-icons/fa");

const C = {
  navy:"1C3557", iceBlue:"5B8DB8", pale:"D4E4F0", white:"FFFFFF",
  offWhite:"F3F6F9", accent:"3A7DC9", teal:"4A7FA8", mid:"2E5073",
  text:"1E2D3D", muted:"7A90A8", green:"3A7E6E", steel:"8096B0", red:"B03040",
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
  pres.title = "Module 8: Reliability & Security Engineering";

  // SLIDE 1 — Title
  {
    const s = pres.addSlide();
    s.background = { color: C.navy };
    s.addShape(pres.shapes.RECTANGLE, { x:0, y:0, w:0.18, h:5.625, fill:{ color:C.accent } });
    s.addText("ENTERPRISE AGENTIC PRACTICES", { x:0.4, y:0.32, w:9.2, h:0.35, fontSize:10, color:C.iceBlue, bold:true, charSpacing:4, margin:0 });
    s.addShape(pres.shapes.RECTANGLE, { x:0.4, y:0.82, w:1.5, h:0.38, fill:{ color:C.accent } });
    s.addText("MODULE 08", { x:0.4, y:0.82, w:1.5, h:0.38, fontSize:11, color:C.white, bold:true, align:"center", valign:"middle", margin:0 });
    s.addText("Reliability &\nSecurity\nEngineering", { x:0.4, y:1.32, w:6.8, h:2.2, fontSize:44, color:C.white, bold:true, margin:0 });
    s.addText("Building agents that are safe, sandboxed, and production-grade", { x:0.4, y:3.6, w:7.0, h:0.5, fontSize:18, color:C.iceBlue, italic:true, margin:0 });
    s.addShape(pres.shapes.RECTANGLE, { x:0.4, y:4.22, w:3.5, h:0.04, fill:{ color:C.accent } });
    s.addText([
      { text:"Duration: ", options:{ bold:true, color:C.muted } },
      { text:"75–90 min  ", options:{ color:C.muted } },
      { text:"  |  ", options:{ color:C.muted } },
      { text:"Level: ", options:{ bold:true, color:C.muted } },
      { text:"Advanced", options:{ color:C.muted } }
    ], { x:0.4, y:4.38, w:5, h:0.38, fontSize:13, margin:0 });

    // Right: security layers visual
    const layers = [
      { label:"Identity & IAM", color:C.accent },
      { label:"Sandboxing", color:C.teal },
      { label:"Least Privilege", color:C.green },
      { label:"Kill Switches", color:C.steel },
      { label:"Audit Logs", color:C.mid },
    ];
    layers.forEach((l, i) => {
      const y = 0.65 + i * 0.98;
      s.addShape(pres.shapes.RECTANGLE, { x:7.25, y, w:2.4, h:0.72, fill:{ color:l.color, transparency:i*8 }, shadow:shadow() });
      s.addText(l.label, { x:7.25, y, w:2.4, h:0.72, fontSize:13, color:C.white, bold:true, align:"center", valign:"middle", margin:0 });
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
      { icon:FaIdBadge,      color:C.accent, title:"Manage Agent Identities",     body:"Apply first-class identity governance to agents — service accounts, workload identities, just-in-time provisioning, and zero standing privileges." },
      { icon:FaLock,         color:C.teal,   title:"Design Sandboxed Agents",     body:"Structure agents to run in containers with minimal permissions, few binaries, and intentionally reduced flexibility for predictability and security." },
      { icon:FaShieldAlt,    color:C.green,  title:"Apply OWASP GenAI Top 10",    body:"Identify and mitigate the top threat classes: prompt injection, tool misuse, memory leakage, privilege escalation, and agent impersonation." },
      { icon:FaToggleOff,    color:C.steel,  title:"Build Kill Switches & Audit", body:"Design circuit breakers, emergency stop mechanisms, and full audit trails so every agent action is traceable and reversible where possible." },
    ];
    const cols = [0.35, 5.1];
    for (let i = 0; i < 4; i++) {
      const x = cols[i%2], y = 1.28 + Math.floor(i/2)*2.0, w=4.55, h=1.82;
      const o = objs[i];
      s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill:{ color:C.white }, shadow:shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y, w:0.07, h, fill:{ color:o.color } });
      const ic = await icon(o.icon, "#"+o.color);
      s.addImage({ data:ic, x:x+0.18, y:y+0.22, w:0.4, h:0.4 });
      s.addText(o.title, { x:x+0.7, y:y+0.18, w:w-0.85, h:0.42, fontSize:13, color:C.navy, bold:true, margin:0 });
      s.addText(o.body,  { x:x+0.7, y:y+0.64, w:w-0.85, h:1.05, fontSize:11.5, color:C.muted, margin:0 });
    }
  }

  // SLIDE 3 — Agents as Digital Workers
  {
    const s = pres.addSlide();
    s.background = { color:C.navy };
    s.addText("AGENTS AS DIGITAL WORKERS", { x:0.4, y:0.22, w:9, h:0.45, fontSize:13, color:C.iceBlue, bold:true, charSpacing:3, margin:0 });
    s.addText("Non-human identities outnumber humans ~50:1 in the average enterprise today", { x:0.4, y:0.72, w:9, h:0.36, fontSize:17, color:C.white, italic:true, margin:0 });

    const facts = [
      { head:"They need identity",  body:"Unique service accounts, Kubernetes pod identities, or workload identities — not generic shared credentials. Each agent = one identity." },
      { head:"They need privileges", body:"Strict, scoped permissions per tool. Default-deny, explicit-allow. Every tool is a potential escalation path." },
      { head:"They need oversight", body:"80% of IT leaders report agents acting outside expected behavior (Strata, 2025). Legacy IAM was not designed for this scale." },
      { head:"They need traceability", body:"Every agent action must map to an identity, an intent, and a timestamp. Without audit trails, compliance fails and incidents can't be investigated." },
    ];

    for (let i = 0; i < 4; i++) {
      const col = i%2, row = Math.floor(i/2);
      const x = col===0 ? 0.35 : 5.15, y = 1.3 + row*2.1, w=4.6, h=1.88;
      s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill:{ color:C.mid, transparency:18 }, shadow:shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y, w:0.06, h, fill:{ color:C.accent } });
      s.addText(facts[i].head, { x:x+0.16, y:y+0.1, w:4.3, h:0.38, fontSize:14, color:C.accent, bold:true, margin:0 });
      s.addText(facts[i].body, { x:x+0.16, y:y+0.56, w:4.3, h:1.15, fontSize:12, color:C.pale, margin:0 });
    }

    s.addText("Traditional IAM assumed long-lived human identities. Agents are ephemeral, delegated, and cross-boundary — a fundamentally different trust model.", {
      x:0.35, y:5.3, w:9.3, h:0.28, fontSize:10, color:C.muted, italic:true, margin:0
    });
  }

  // SLIDE 4 — Zero Trust for Agents
  {
    const s = pres.addSlide();
    s.background = { color:C.white };
    s.addShape(pres.shapes.RECTANGLE, { x:0, y:0, w:10, h:0.82, fill:{ color:C.navy } });
    s.addText("ZERO TRUST FOR AGENTS", { x:0.4, y:0, w:9, h:0.82, fontSize:13, color:C.white, bold:true, charSpacing:3, valign:"middle", margin:0 });
    s.addText("Never trust, always verify — even when the request comes from your own agent", { x:0.4, y:0.9, w:9.2, h:0.3, fontSize:12.5, color:C.muted, italic:true, margin:0 });

    const principles = [
      { n:"01", head:"Least Privilege by Default", color:C.accent,
        body:"Every tool is a potential escalation path. Default-deny; add explicit allow rules per agent persona. If you wouldn't give a junior contractor root access, don't give it to an agent." },
      { n:"02", head:"Just-in-Time Provisioning", color:C.teal,
        body:"Grant access only when the task requires it. Revoke immediately after. No standing admin rights. Agents that complete and terminate should leave no residual permissions." },
      { n:"03", head:"Short-Lived Secrets", color:C.green,
        body:"Rotate credentials often. Store in Vault or cloud KMS. Never bake credentials into prompts, memory, or context files. Secrets in context = secrets in logs." },
      { n:"04", head:"Signed Tools & Plugins", color:C.steel,
        body:"Require signature verification (Sigstore/Cosign) before an agent can load or invoke a tool. Prevents untrusted modules from entering your toolchain via MCP or plugin injection." },
      { n:"05", head:"Zero Trust OAuth Scopes", color:C.accent,
        body:"Enforce OAuth scopes at the MCP/tool boundary. Each tool call should be authorised by scope, not by the agent's general session token." },
      { n:"06", head:"Network Egress Allowlists", color:C.teal,
        body:"Agents should only be able to reach pre-approved endpoints. Spotify's Honk runs with virtually no access to surrounding systems — by design." },
    ];

    [[0,1,2],[3,4,5]].forEach((group, col) => {
      group.forEach((idx, row) => {
        const p = principles[idx];
        const x = col===0 ? 0.35 : 5.1, y = 1.28 + row*1.42, w=4.55, h=1.3;
        s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill:{ color:C.offWhite }, shadow:shadow() });
        s.addShape(pres.shapes.RECTANGLE, { x, y, w:0.44, h, fill:{ color:p.color, transparency:10 } });
        s.addText(p.n, { x, y, w:0.44, h, fontSize:14, color:C.white, bold:true, align:"center", valign:"middle", margin:0 });
        s.addText(p.head, { x:x+0.54, y:y+0.06, w:w-0.64, h:0.3, fontSize:12.5, color:C.navy, bold:true, margin:0 });
        s.addText(p.body, { x:x+0.54, y:y+0.42, w:w-0.64, h:0.8, fontSize:10.5, color:C.muted, margin:0 });
      });
    });
  }

  // SLIDE 5 — Sandboxing
  {
    const s = pres.addSlide();
    s.background = { color:C.offWhite };
    s.addShape(pres.shapes.RECTANGLE, { x:0, y:0, w:10, h:0.82, fill:{ color:C.teal } });
    s.addText("SANDBOXING  \u2014  SPOTIFY\u2019S DESIGN PHILOSOPHY", { x:0.4, y:0, w:9, h:0.82, fontSize:13, color:C.white, bold:true, charSpacing:3, valign:"middle", margin:0 });
    s.addText("\u201CIntentional flexibility reduction = more predictable behavior + secondary security benefits\u201D  \u2014 Spotify Engineering (Honk Part 3)", { x:0.4, y:0.9, w:9.2, h:0.32, fontSize:11.5, color:C.muted, italic:true, margin:0 });

    // Left — what to sandbox
    const sandboxItems = [
      { head:"Container with minimal permissions", body:"Agent runs as a non-root user in a gVisor/GKE Sandbox or Firecracker microVM. No host filesystem access." },
      { head:"Few binaries available", body:"Only the tools the agent needs to do its job. Every additional binary is an attack surface and an unpredictability vector." },
      { head:"No access to surrounding systems", body:"Agents cannot call internal APIs, databases, or services not in the explicit allowlist. Network egress via allowlist only." },
      { head:"Bounded execution time", body:"Every agent run has a timeout. Unbounded execution enables resource exhaustion and runaway agentic loops." },
      { head:"Immutable infrastructure", body:"Agents run from verified, signed images. No in-place mutations. Each run is a fresh container from a known-good state." },
    ];

    sandboxItems.forEach((item, i) => {
      const y = 1.3 + i*0.85;
      s.addShape(pres.shapes.RECTANGLE, { x:0.35, y, w:5.05, h:0.76, fill:{ color:C.white }, shadow:shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x:0.35, y, w:0.06, h:0.76, fill:{ color:C.teal } });
      s.addText(item.head, { x:0.52, y:y+0.06, w:4.72, h:0.28, fontSize:12, color:C.navy, bold:true, margin:0 });
      s.addText(item.body, { x:0.52, y:y+0.38, w:4.72, h:0.32, fontSize:11, color:C.muted, margin:0 });
    });

    // Right — execution plane diagram
    s.addShape(pres.shapes.RECTANGLE, { x:5.65, y:1.28, w:4.0, h:4.1, fill:{ color:C.white }, shadow:shadow() });
    s.addShape(pres.shapes.RECTANGLE, { x:5.65, y:1.28, w:4.0, h:0.42, fill:{ color:C.navy } });
    s.addText("LAYERED EXECUTION PLANE", { x:5.65, y:1.28, w:4.0, h:0.42, fontSize:11, color:C.white, bold:true, charSpacing:2, align:"center", valign:"middle", margin:0 });

    const planes = [
      { label:"Assurance Plane", sub:"Sigstore/Cosign, SLSA, SBOMs", color:C.steel },
      { label:"Observability Plane", sub:"OTel spans, SIEM, SOAR playbooks", color:C.accent },
      { label:"Data/Memory Plane", sub:"Vector stores on private subnets, PII redaction", color:C.teal },
      { label:"Execution Plane", sub:"gVisor/Firecracker, WASI, egress allowlists", color:C.green },
    ];
    planes.forEach((p, i) => {
      const y = 1.82 + i*0.85;
      s.addShape(pres.shapes.RECTANGLE, { x:5.77, y, w:3.76, h:0.75, fill:{ color:p.color, transparency:15 } });
      s.addText(p.label, { x:5.85, y:y+0.05, w:3.6, h:0.28, fontSize:12, color:C.white, bold:true, margin:0 });
      s.addText(p.sub, { x:5.85, y:y+0.35, w:3.6, h:0.34, fontSize:10, color:C.pale, italic:true, margin:0 });
    });
  }

  // SLIDE 6 — OWASP GenAI Top 10
  {
    const s = pres.addSlide();
    s.background = { color:C.navy };
    s.addText("OWASP GENAI TOP 10 v2025  \u2014  AGENT THREAT CLASSES", { x:0.4, y:0.22, w:9, h:0.45, fontSize:13, color:C.iceBlue, bold:true, charSpacing:3, margin:0 });
    s.addText("The exact failure modes your enterprise agents will face in production", { x:0.4, y:0.72, w:9, h:0.36, fontSize:17, color:C.white, italic:true, margin:0 });

    const threats = [
      { n:"LLM01", head:"Prompt Injection",          sev:"CRITICAL", mitigation:"Input validation, output filtering, sandboxed execution. Never trust external content as instructions." },
      { n:"LLM02", head:"Insecure Output Handling",  sev:"HIGH",     mitigation:"Treat all LLM output as untrusted. Sanitise before passing to shell, DB, or browser." },
      { n:"LLM03", head:"Training Data Poisoning",   sev:"HIGH",     mitigation:"For fine-tuned models: validate training data provenance. For RAG: validate retrieval sources." },
      { n:"LLM06", head:"Excessive Agency",          sev:"CRITICAL", mitigation:"Least privilege. Require explicit HITL approval for irreversible actions. Kill switches required." },
      { n:"LLM07", head:"System Prompt Leakage",     sev:"MEDIUM",   mitigation:"Never put secrets in system prompts. Assume all prompt content can be extracted by adversarial users." },
      { n:"LLM08", head:"Vector / Embedding Attacks",sev:"MEDIUM",   mitigation:"Validate and sanitise content before embedding. Monitor for retrieval anomalies in RAG pipelines." },
      { n:"LLM09", head:"Misinformation at Scale",   sev:"HIGH",     mitigation:"Ground agents in validated sources. Implement citation requirements. Human review for high-stakes outputs." },
      { n:"LLM10", head:"Unbounded Consumption",     sev:"HIGH",     mitigation:"Hard token budgets, cost guardrails, rate limits at gateway level. Monitor cost per agent run." },
    ];

    const sevColor = { "CRITICAL":"E05555", "HIGH":"E08855", "MEDIUM":C.steel };

    [[0,1,2,3],[4,5,6,7]].forEach((group, col) => {
      group.forEach((idx, row) => {
        const t = threats[idx];
        const x = col===0 ? 0.35 : 5.15, y = 1.28 + row*1.05, w=4.6;
        s.addShape(pres.shapes.RECTANGLE, { x, y, w, h:0.95, fill:{ color:C.mid, transparency:18 } });
        s.addShape(pres.shapes.RECTANGLE, { x, y, w:0.72, h:0.95, fill:{ color:C.mid, transparency:5 } });
        s.addText(t.n, { x:x+0.04, y, w:0.68, h:0.95, fontSize:9, color:C.iceBlue, bold:true, align:"center", valign:"middle", margin:0 });
        s.addShape(pres.shapes.RECTANGLE, { x:x+3.65, y:y+0.08, w:0.88, h:0.26, fill:{ color:sevColor[t.sev]||C.steel, transparency:20 } });
        s.addText(t.sev, { x:x+3.65, y:y+0.08, w:0.88, h:0.26, fontSize:8, color:C.white, bold:true, align:"center", valign:"middle", margin:0 });
        s.addText(t.head, { x:x+0.8, y:y+0.06, w:2.75, h:0.3, fontSize:12, color:C.white, bold:true, margin:0 });
        s.addText(t.mitigation, { x:x+0.8, y:y+0.42, w:3.72, h:0.44, fontSize:10, color:C.pale, margin:0 });
      });
    });
  }

  // SLIDE 7 — Kill Switches & Audit
  {
    const s = pres.addSlide();
    s.background = { color:C.white };
    s.addShape(pres.shapes.RECTANGLE, { x:0, y:0, w:10, h:0.82, fill:{ color:C.navy } });
    s.addText("KILL SWITCHES & AUDIT TRAILS", { x:0.4, y:0, w:9, h:0.82, fontSize:13, color:C.white, bold:true, charSpacing:3, valign:"middle", margin:0 });
    s.addText("Every production agent deployment needs a reliable mechanism to pause or stop it immediately", { x:0.4, y:0.9, w:9.2, h:0.3, fontSize:12.5, color:C.muted, italic:true, margin:0 });

    // Left — Kill switch patterns
    s.addShape(pres.shapes.RECTANGLE, { x:0.35, y:1.28, w:4.55, h:4.1, fill:{ color:C.offWhite }, shadow:shadow() });
    s.addShape(pres.shapes.RECTANGLE, { x:0.35, y:1.28, w:4.55, h:0.42, fill:{ color:C.navy } });
    s.addText("KILL SWITCH PATTERNS", { x:0.35, y:1.28, w:4.55, h:0.42, fontSize:11, color:C.white, bold:true, charSpacing:2, align:"center", valign:"middle", margin:0 });

    const killPatterns = [
      { head:"Hard stop (immediate)", body:"Terminate agent container. Revoke all credentials. Quarantine the agent namespace. Use when: unexpected behavior detected or security incident." },
      { head:"Graceful pause", body:"Agent completes current tool call, saves state to NOTES.md, awaits human instruction. Use when: review needed before proceeding." },
      { head:"HITL escalation gate", body:"Agent reaches a pre-defined checkpoint and cannot proceed without explicit human approval. Use when: irreversible action required." },
      { head:"Budget exhaustion", body:"Agent automatically stops when token/cost budget is exceeded. Prevents runaway loops from burning compute. Use as a secondary safety net." },
    ];

    killPatterns.forEach((kp, i) => {
      const y = 1.82 + i*0.88;
      s.addShape(pres.shapes.RECTANGLE, { x:0.47, y, w:4.3, h:0.8, fill:{ color:C.white } });
      s.addShape(pres.shapes.RECTANGLE, { x:0.47, y, w:0.08, h:0.8, fill:{ color:C.red } });
      s.addText(kp.head, { x:0.65, y:y+0.06, w:4.0, h:0.28, fontSize:12, color:C.navy, bold:true, margin:0 });
      s.addText(kp.body, { x:0.65, y:y+0.38, w:4.0, h:0.36, fontSize:10.5, color:C.muted, margin:0 });
    });

    // Right — Audit trail requirements
    s.addShape(pres.shapes.RECTANGLE, { x:5.1, y:1.28, w:4.55, h:4.1, fill:{ color:C.offWhite }, shadow:shadow() });
    s.addShape(pres.shapes.RECTANGLE, { x:5.1, y:1.28, w:4.55, h:0.42, fill:{ color:C.navy } });
    s.addText("AUDIT TRAIL REQUIREMENTS", { x:5.1, y:1.28, w:4.55, h:0.42, fontSize:11, color:C.white, bold:true, charSpacing:2, align:"center", valign:"middle", margin:0 });

    const auditItems = [
      "User prompts and model responses — full fidelity",
      "Retrieval provenance (what was fetched and from where)",
      "Every tool invocation: name, arguments, output",
      "Permissions in effect at time of each action",
      "Agent identity and session token for each call",
      "Diff / output before human approval gate",
      "Compaction events (what was summarised and discarded)",
      "Cost and token usage per run and per tool call",
    ];

    auditItems.forEach((item, i) => {
      const y = 1.82 + i*0.41;
      s.addShape(pres.shapes.RECTANGLE, { x:5.22, y, w:4.3, h:0.36, fill:{ color:i%2===0 ? C.white : C.offWhite } });
      s.addText(`\u2713  ${item}`, { x:5.3, y, w:4.14, h:0.36, fontSize:10.5, color:C.text, valign:"middle", margin:0 });
    });
  }

  // SLIDE 8 — Security Frameworks
  {
    const s = pres.addSlide();
    s.background = { color:C.navy };
    s.addText("ENTERPRISE SECURITY FRAMEWORKS FOR AGENTS", { x:0.4, y:0.22, w:9, h:0.45, fontSize:13, color:C.iceBlue, bold:true, charSpacing:3, margin:0 });
    s.addText("Align to existing frameworks — don't reinvent. Agents extend existing risk surfaces, not create new categories.", { x:0.4, y:0.72, w:9, h:0.36, fontSize:14, color:C.white, italic:true, margin:0 });

    const frameworks = [
      { name:"NIST AI RMF", color:C.accent,
        scope:"AI Risk Management Framework",
        covers:["Role-based access controls", "Continuous monitoring & adversarial testing", "Lifecycle logging for traceability", "Govern, Map, Measure, Manage lifecycle"],
        url:"nist.gov/artificial-intelligence/ai-rmf" },
      { name:"OWASP GenAI\nTop 10 v2025", color:C.teal,
        scope:"Application-level threat catalogue",
        covers:["15 agent-specific threat categories", "Prompt injection, tool misuse, memory leakage", "Mitigation checklists per threat class", "Quarterly incident round-ups"],
        url:"owasp.org/www-project-top-10-for-llm" },
      { name:"ISO/IEC 42001", color:C.green,
        scope:"AI Management System Standard",
        covers:["Oversight, logging, continual improvement", "AI governance documentation requirements", "Audit and accountability mechanisms", "Compatible with ISO 27001"],
        url:"iso.org/standard/81230.html" },
      { name:"CSA / Cloud\nSecurity Alliance", color:C.steel,
        scope:"Cloud-specific AI security",
        covers:["Trait-based risk model for agents", "Agent identity in multi-cloud environments", "Data residency and sovereignty controls", "Shared responsibility model for LLM APIs"],
        url:"cloudsecurityalliance.org/ai" },
    ];

    frameworks.forEach((f, i) => {
      const x = 0.35 + i*2.38, y = 1.28;
      s.addShape(pres.shapes.RECTANGLE, { x, y, w:2.2, h:4.1, fill:{ color:C.mid, transparency:18 }, shadow:shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y, w:2.2, h:0.72, fill:{ color:f.color } });
      s.addText(f.name, { x, y, w:2.2, h:0.72, fontSize:13, color:C.white, bold:true, align:"center", valign:"middle", margin:0 });
      s.addText(f.scope, { x:x+0.1, y:y+0.78, w:2.0, h:0.32, fontSize:10, color:f.color, bold:true, italic:true, margin:0 });
      f.covers.forEach((c, j) => {
        s.addText(`\u2022 ${c}`, { x:x+0.1, y:y+1.16+j*0.56, w:2.0, h:0.5, fontSize:10, color:C.pale, margin:0 });
      });
      s.addText(f.url, { x:x+0.08, y:y+3.75, w:2.04, h:0.28, fontSize:8.5, color:C.muted, italic:true, margin:0 });
    });
  }

  // SLIDE 9 — Security Checklist
  {
    const s = pres.addSlide();
    s.background = { color:C.offWhite };
    s.addShape(pres.shapes.RECTANGLE, { x:0, y:0, w:10, h:0.82, fill:{ color:C.navy } });
    s.addText("PRE-DEPLOYMENT SECURITY CHECKLIST", { x:0.4, y:0, w:9, h:0.82, fontSize:13, color:C.white, bold:true, charSpacing:3, valign:"middle", margin:0 });
    s.addText("Run this before every agent goes to production. Every unchecked item is a known risk you\u2019re accepting.", { x:0.4, y:0.9, w:9.2, h:0.3, fontSize:12, color:C.muted, italic:true, margin:0 });

    const checks = [
      { cat:"Identity & Access", color:C.accent, items:["Agent has unique identity (not shared creds)?","Least-privilege tool permissions applied?","JIT provisioning (no standing admin rights)?","Secrets in Vault/KMS (not in prompts/memory)?"] },
      { cat:"Sandboxing", color:C.teal, items:["Agent runs in isolated container?","Network egress allowlist configured?","Execution timeout defined and enforced?","Binary allowlist minimized?"] },
      { cat:"Threat Mitigations", color:C.green, items:["Input validation for prompt injection?","Output sanitisation before shell/DB/browser?","HITL gate for irreversible actions?","Cost budget and token limits set?"] },
      { cat:"Audit & Response", color:C.steel, items:["Full audit trail enabled (prompts, tools, outputs)?","Kill switch mechanism tested?","SIEM/SOAR alerts configured?","Incident response runbook written?"] },
    ];

    checks.forEach((cat, i) => {
      const col = i%2, row = Math.floor(i/2);
      const x = col===0 ? 0.35 : 5.15, y = 1.28+row*2.05, w=4.6, h=1.9;
      s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill:{ color:C.white }, shadow:shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y, w, h:0.42, fill:{ color:cat.color } });
      s.addText(cat.cat, { x, y, w, h:0.42, fontSize:12, color:C.white, bold:true, charSpacing:2, align:"center", valign:"middle", margin:0 });
      cat.items.forEach((item, j) => {
        s.addShape(pres.shapes.RECTANGLE, { x:x+0.12, y:y+0.52+j*0.34, w:0.28, h:0.26, fill:{ color:cat.color, transparency:80 } });
        s.addText("\u25A1", { x:x+0.12, y:y+0.52+j*0.34, w:0.28, h:0.26, fontSize:12, color:cat.color, align:"center", valign:"middle", margin:0 });
        s.addText(item, { x:x+0.48, y:y+0.52+j*0.34, w:w-0.6, h:0.28, fontSize:11, color:C.text, valign:"middle", margin:0 });
      });
    });
  }

  // SLIDE 10 — Case Study: Spotify Honk Security Design
  {
    const s = pres.addSlide();
    s.background = { color:C.white };
    s.addShape(pres.shapes.RECTANGLE, { x:0, y:0, w:10, h:0.82, fill:{ color:C.navy } });
    s.addShape(pres.shapes.RECTANGLE, { x:0, y:0, w:0.35, h:0.82, fill:{ color:C.green } });
    s.addText("CASE STUDY  \u00B7  SPOTIFY HONK  \u00B7  SECURITY DESIGN DECISIONS", { x:0.55, y:0, w:9.1, h:0.82, fontSize:12, color:C.white, bold:true, charSpacing:2, valign:"middle", margin:0 });

    const decisions = [
      { head:"Sandboxed container by design", color:C.accent,
        detail:"Agent runs with limited permissions, few binaries, and virtually no access to surrounding systems. Not as an afterthought \u2014 as the primary design constraint.",
        result:"Predictable behavior AND security. Intentional flexibility reduction serves both goals simultaneously." },
      { head:"Infrastructure outside the agent", color:C.teal,
        detail:"Slack interactions, git push, prompt authoring all happen OUTSIDE the agent boundary. The agent only touches code. The blast radius of any failure is contained.",
        result:"Even if the agent misbehaves, it cannot send unauthorised messages, push to wrong branches, or escalate beyond code changes." },
      { head:"Audit logs for compliance", color:C.green,
        detail:"Every agent action is logged. Spotify maintains full audit trails for their automated PR pipeline, enabling compliance reporting and incident investigation.",
        result:"1,500+ automated PRs merged with full traceability. Compliance teams can answer any question about who authorised what, when." },
      { head:"Human merge gate (non-negotiable)", color:C.steel,
        detail:"Agents open PRs. Humans merge. No agent ever directly commits to main without human approval. The HITL gate is hardcoded into the pipeline, not configurable.",
        result:"~50% of PRs automated, zero bypassing of human review. Speed AND governance coexist." },
    ];

    decisions.forEach((d, i) => {
      const col = i%2, row = Math.floor(i/2);
      const x = col===0 ? 0.35 : 5.1, y = 0.95+row*2.38, w=4.55, h=2.2;
      s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill:{ color:C.offWhite }, shadow:shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y, w:0.06, h, fill:{ color:d.color } });
      s.addText(`\u2713 ${d.head}`, { x:x+0.16, y:y+0.1, w:w-0.26, h:0.36, fontSize:13, color:d.color, bold:true, margin:0 });
      s.addText(d.detail, { x:x+0.16, y:y+0.52, w:w-0.26, h:0.85, fontSize:11, color:C.text, margin:0 });
      s.addShape(pres.shapes.RECTANGLE, { x:x+0.12, y:y+1.44, w:w-0.22, h:0.65, fill:{ color:d.color, transparency:88 } });
      s.addText("Result: " + d.result, { x:x+0.2, y:y+1.48, w:w-0.32, h:0.57, fontSize:10, color:d.color, italic:true, margin:0 });
    });
  }

  // SLIDE 11 — Lab
  {
    const s = pres.addSlide();
    s.background = { color:C.white };
    s.addShape(pres.shapes.RECTANGLE, { x:0, y:0, w:10, h:0.82, fill:{ color:C.teal } });
    s.addText("LAB EXERCISE  \u00B7  30 MINUTES", { x:0.4, y:0, w:9, h:0.82, fontSize:13, color:C.white, bold:true, charSpacing:3, valign:"middle", margin:0 });
    s.addText("Security Design Review: Threat Model Your Module 2 Agent", { x:0.4, y:0.95, w:9.2, h:0.46, fontSize:18, color:C.navy, bold:true, margin:0 });

    const steps = [
      { n:"1", t:"Identity mapping", min:"5 min", d:"For the agent you designed in Module 2: list every identity it needs. What tools does it call? What systems does it access? Assign one identity per distinct permission boundary." },
      { n:"2", t:"OWASP threat pass", min:"8 min", d:"Run your agent through the OWASP GenAI Top 10. For LLM01 (Prompt Injection) and LLM06 (Excessive Agency): what\u2019s your specific risk? What mitigation applies?" },
      { n:"3", t:"Kill switch design", min:"7 min", d:"Define the three conditions under which your agent must immediately stop. What triggers hard stop vs graceful pause vs HITL gate? Who has the authority to trigger each?" },
      { n:"4", t:"Audit trail spec", min:"5 min", d:"List the 5 most important things to log about your agent\u2019s actions. For each: what format, what retention, who can access, and what alert fires if the log is missing?" },
      { n:"5", t:"Pre-deployment checklist", min:"5 min", d:"Work through the slide 9 checklist for your agent. Which boxes can you check today? Which require new infrastructure? Prioritize the top 3 gaps." },
    ];

    steps.forEach((st, i) => {
      const y = 1.52 + i*0.8;
      s.addShape(pres.shapes.RECTANGLE, { x:0.35, y, w:9.3, h:0.72, fill:{ color:C.offWhite }, shadow:shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x:0.35, y, w:0.52, h:0.72, fill:{ color:C.teal } });
      s.addText(st.n, { x:0.35, y, w:0.52, h:0.72, fontSize:20, color:C.white, bold:true, align:"center", valign:"middle", margin:0 });
      s.addText(st.t, { x:0.97, y:y+0.06, w:2.2, h:0.28, fontSize:12.5, color:C.teal, bold:true, margin:0 });
      s.addText(`(${st.min})`, { x:3.17, y:y+0.06, w:0.8, h:0.28, fontSize:11, color:C.muted, italic:true, margin:0 });
      s.addText(st.d, { x:0.97, y:y+0.38, w:8.55, h:0.3, fontSize:10.5, color:C.muted, margin:0 });
    });
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
      "Q1.  Which OWASP GenAI threat is your organization least prepared for today? What would remediation require?",
      "Q2.  Non-human identities outnumber humans 50:1. Does your current IAM system treat agents as first-class identities?",
      "Q3.  Could you answer a compliance audit about every action your current agents took last week? What\u2019s missing?",
      "Q4.  Where in your organization would a compromised agent cause the most damage? Is that pathway protected?",
    ];
    s.addText(qs.join("\n\n"), { x:0.5, y:1.4, w:5.1, h:3.1, fontSize:11.5, color:C.pale, margin:0 });

    s.addShape(pres.shapes.RECTANGLE, { x:6.05, y:0.82, w:3.6, h:3.82, fill:{ color:C.mid, transparency:20 }, shadow:shadow() });
    s.addShape(pres.shapes.RECTANGLE, { x:6.05, y:0.82, w:3.6, h:0.48, fill:{ color:C.accent, transparency:10 } });
    s.addText("KEY TAKEAWAYS", { x:6.05, y:0.82, w:3.6, h:0.48, fontSize:11, color:C.white, bold:true, charSpacing:2, align:"center", valign:"middle", margin:0 });
    const tks = [
      "\u00B7 Agents are digital workers needing first-class identity",
      "\u00B7 Default-deny: every tool is an escalation path",
      "\u00B7 Sandbox intentionally \u2014 limits flexibility AND risk",
      "\u00B7 OWASP GenAI Top 10: know your threats by name",
      "\u00B7 Kill switches are non-negotiable in production",
      "\u00B7 Audit everything: prompts, tools, outputs, permissions",
      "\u00B7 Spotify: speed + governance coexist by design",
    ];
    s.addText(tks.join("\n\n"), { x:6.2, y:1.4, w:3.35, h:3.1, fontSize:11.5, color:C.pale, margin:0 });

    s.addShape(pres.shapes.RECTANGLE, { x:0.35, y:4.75, w:9.3, h:0.62, fill:{ color:C.accent, transparency:18 } });
    s.addText("NEXT  \u00B7  Module 09: FinOps for Agentic Systems  \u2014  Token economics, cost governance, model routing, and ROI", {
      x:0.35, y:4.75, w:9.3, h:0.62, fontSize:11.5, color:C.white, bold:true, align:"center", valign:"middle", margin:0
    });
  }

  await pres.writeFile({ fileName: "Module_08_Security.pptx" });
  console.log("\u2705 Module 8 written");
}

build().catch(console.error);
