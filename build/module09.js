const pptxgen = require("pptxgenjs");
const { C, shadow, icon } = require("./shared");
const {
  FaStream, FaChartLine, FaProjectDiagram, FaBell, FaHeartbeat,
  FaLayerGroup, FaSearch, FaShieldAlt, FaCheckCircle, FaExclamationTriangle,
  FaCode, FaServer
} = require("react-icons/fa");

async function build() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.title = "Module 9: Observability";

  // ─────────────────────────────────────────────
  // SLIDE 1 — Title
  // ─────────────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.navy };
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.18, h: 5.625, fill: { color: C.accent } });
    s.addText("ENTERPRISE AGENTIC PRACTICES", { x: 0.4, y: 0.32, w: 9.2, h: 0.35, fontSize: 10, color: C.iceBlue, bold: true, charSpacing: 4, margin: 0 });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 0.82, w: 1.5, h: 0.38, fill: { color: C.accent } });
    s.addText("MODULE 09", { x: 0.4, y: 0.82, w: 1.5, h: 0.38, fontSize: 11, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
    s.addText("Observability", { x: 0.4, y: 1.38, w: 7.5, h: 1.1, fontSize: 52, color: C.white, bold: true, margin: 0 });
    s.addText("Five engineering practices that make your solution monitorable, manageable, and trustworthy", { x: 0.4, y: 2.62, w: 7.5, h: 0.7, fontSize: 17, color: C.iceBlue, italic: true, margin: 0 });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 3.44, w: 3.5, h: 0.04, fill: { color: C.accent } });
    s.addText([{ text: "Duration: ", options: { bold: true, color: C.muted } }, { text: "60\u201375 min  ", options: { color: C.muted } }, { text: "  |  ", options: { color: C.muted } }, { text: "Level: ", options: { bold: true, color: C.muted } }, { text: "Intermediate", options: { color: C.muted } }], { x: 0.4, y: 3.62, w: 5, h: 0.38, fontSize: 13, margin: 0 });

    const practices = [
      { l: "Structured Logs", c: C.accent },
      { l: "Custom Metrics", c: C.teal },
      { l: "Distributed Traces", c: C.green },
      { l: "Events", c: C.mid },
      { l: "Health Endpoints", c: C.steel },
    ];
    for (let i = 0; i < practices.length; i++) {
      const p = practices[i];
      s.addShape(pres.shapes.RECTANGLE, { x: 7.55, y: 0.55 + i * 0.98, w: 2.1, h: 0.82, fill: { color: p.c, transparency: i > 2 ? 20 : 0 }, shadow: shadow() });
      s.addText(p.l, { x: 7.55, y: 0.55 + i * 0.98, w: 2.1, h: 0.82, fontSize: 13, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
    }
    s.addText("The 5 Practices", { x: 7.55, y: 5.45, w: 2.1, h: 0.28, fontSize: 10, color: C.muted, align: "center", italic: true, margin: 0 });
  }

  // ─────────────────────────────────────────────
  // SLIDE 2 — Learning Objectives
  // ─────────────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.offWhite };
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.82, fill: { color: C.navy } });
    s.addText("LEARNING OBJECTIVES", { x: 0.4, y: 0, w: 9, h: 0.82, fontSize: 13, color: C.white, bold: true, charSpacing: 3, valign: "middle", margin: 0 });

    const objs = [
      { icon: FaStream, color: C.accent, title: "Structured Logs", body: "Design context-rich log entries with consistent schemas that enable fast diagnosis, compliance audit, and cross-service correlation." },
      { icon: FaChartLine, color: C.teal, title: "Custom Metrics", body: "Instrument key product flows — not just infrastructure — with RED and USE metrics that connect system behavior to business outcomes." },
      { icon: FaProjectDiagram, color: C.green, title: "Traces & Events", body: "Implement distributed tracing to pinpoint root cause across service boundaries, and emit domain and security events for cross-team visibility." },
      { icon: FaHeartbeat, color: C.steel, title: "Health Endpoints", body: "Expose liveness, readiness, and startup endpoints that enable safe zero-downtime deployments and automated recovery in any platform." },
    ];

    for (let i = 0; i < 4; i++) {
      const obj = objs[i];
      const col = i % 2, row = Math.floor(i / 2);
      const x = col === 0 ? 0.35 : 5.2, y = 1.0 + row * 2.22, w = 4.55, h = 2.0;
      s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color: C.white }, shadow: shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y, w, h: 0.52, fill: { color: obj.color } });
      const ic = await icon(obj.icon, "#" + C.white);
      s.addImage({ data: ic, x: x + 0.14, y: y + 0.1, w: 0.32, h: 0.32 });
      s.addText(obj.title, { x: x + 0.54, y, w: w - 0.62, h: 0.52, fontSize: 13, color: C.white, bold: true, valign: "middle", margin: 0 });
      s.addText(obj.body, { x: x + 0.18, y: y + 0.62, w: w - 0.32, h: 1.28, fontSize: 11, color: C.text, margin: 0 });
    }
  }

  // ─────────────────────────────────────────────
  // SLIDE 3 — Observability vs Monitoring
  // ─────────────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.navy };
    s.addText("OBSERVABILITY VS. MONITORING", { x: 0.4, y: 0.22, w: 9, h: 0.45, fontSize: 13, color: C.iceBlue, bold: true, charSpacing: 3, margin: 0 });
    s.addText("Monitoring answers questions you knew to ask. Observability lets you ask questions you didn\u2019t know you\u2019d need.", { x: 0.4, y: 0.72, w: 9.2, h: 0.36, fontSize: 15, color: C.white, italic: true, margin: 0 });

    const rows = [
      { q: "What failed?", mon: "Pre-defined alerts on known thresholds", obs: "Any question \u2014 including ones you didn\u2019t anticipate at deploy time" },
      { q: "Where did it fail?", mon: "Service-level error rate or CPU spike", obs: "Exact span in the distributed trace across all services" },
      { q: "Why did it fail?", mon: "Log grep \u2014 if you logged the right thing", obs: "Correlated log + trace + event by shared trace_id" },
      { q: "How bad is it?", mon: "Infrastructure metrics: requests/sec, error rate", obs: "Business flow metrics: checkout completion, payment success rate" },
      { q: "Is it getting worse?", mon: "Alert fires when threshold crossed", obs: "Trend visible in metrics before alert threshold is reached" },
      { q: "What changed?", mon: "Deployment timestamp, config diff (if you kept it)", obs: "Domain events + trace context show causal chain from change to impact" },
    ];

    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 1.26, w: 9.3, h: 0.38, fill: { color: C.mid, transparency: 10 } });
    s.addText("QUESTION", { x: 0.45, y: 1.26, w: 2.1, h: 0.38, fontSize: 10, color: C.iceBlue, bold: true, charSpacing: 2, valign: "middle", margin: 0 });
    s.addText("MONITORING ANSWER", { x: 2.7, y: 1.26, w: 3.4, h: 0.38, fontSize: 10, color: C.steel, bold: true, charSpacing: 2, valign: "middle", margin: 0 });
    s.addText("OBSERVABILITY ANSWER", { x: 6.25, y: 1.26, w: 3.4, h: 0.38, fontSize: 10, color: C.accent, bold: true, charSpacing: 2, valign: "middle", margin: 0 });

    for (let i = 0; i < rows.length; i++) {
      const r = rows[i], y = 1.7 + i * 0.62, bg = i % 2 === 0 ? C.mid : "2A4870";
      s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y, w: 9.3, h: 0.56, fill: { color: bg, transparency: 25 } });
      s.addText(r.q, { x: 0.45, y, w: 2.1, h: 0.56, fontSize: 11, color: C.iceBlue, bold: true, valign: "middle", margin: 0 });
      s.addText(r.mon, { x: 2.7, y, w: 3.4, h: 0.56, fontSize: 10.5, color: C.pale, valign: "middle", margin: 0 });
      s.addText(r.obs, { x: 6.25, y, w: 3.4, h: 0.56, fontSize: 10.5, color: C.white, valign: "middle", margin: 0 });
    }

    s.addText("The SRE principle: \u201CHope is not a strategy.\u201D You cannot hope your system is behaving correctly \u2014 you must instrument it to know.  \u2014 Google SRE Book", { x: 0.35, y: 5.5, w: 9.3, h: 0.2, fontSize: 9.5, color: C.muted, italic: true, margin: 0 });
  }

  // ─────────────────────────────────────────────
  // SLIDE 4 — Structured & Context-Rich Logs
  // ─────────────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.white };
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.82, fill: { color: C.accent } });
    s.addText("PRACTICE 1  \u00B7  STRUCTURED AND CONTEXT-RICH LOGS", { x: 0.4, y: 0, w: 9, h: 0.82, fontSize: 13, color: C.white, bold: true, charSpacing: 3, valign: "middle", margin: 0 });

    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 1.0, w: 4.7, h: 4.38, fill: { color: C.navy }, shadow: shadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 1.0, w: 4.7, h: 0.42, fill: { color: C.accent } });
    s.addText("ANATOMY OF A WELL-STRUCTURED LOG", { x: 0.45, y: 1.0, w: 4.5, h: 0.42, fontSize: 10, color: C.white, bold: true, charSpacing: 2, valign: "middle", margin: 0 });

    const logLines = [
      { k: '"timestamp":', v: ' "2026-04-07T14:32:18Z"', c: C.iceBlue },
      { k: '"level":', v: ' "ERROR"', c: C.red },
      { k: '"service":', v: ' "payment-service"', c: C.iceBlue },
      { k: '"trace_id":', v: ' "4bf92f35\u2026"', c: C.green },
      { k: '"span_id":', v: ' "00f067aa\u2026"', c: C.green },
      { k: '"correlation_id":', v: ' "order-88291"', c: C.amber },
      { k: '"user_id":', v: ' "usr-4429f"', c: C.pale },
      { k: '"event":', v: ' "payment.charge.failed"', c: C.iceBlue },
      { k: '"failure_reason":', v: ' "card_declined"', c: C.pale },
      { k: '"retry_count":', v: ' 2', c: C.pale },
      { k: '"message":', v: ' "Payment failed after 2 retries"', c: C.muted },
    ];
    for (let i = 0; i < logLines.length; i++) {
      const l = logLines[i], y = 1.54 + i * 0.34;
      s.addText(l.k, { x: 0.55, y, w: 2.0, h: 0.3, fontSize: 9.5, color: C.iceBlue, bold: true, margin: 0 });
      s.addText(l.v, { x: 2.48, y, w: 2.4, h: 0.3, fontSize: 9.5, color: l.c, margin: 0 });
    }

    const points = [
      { head: "Correlated by trace_id", body: "Join all log entries for one user request across every service with a single query. No manual log parsing." },
      { head: "Business context, not just system state", body: "correlation_id, user_id, and event type connect log entries to business entities and user journeys." },
      { head: "PII redaction by design", body: "Define which fields are redacted at capture time \u2014 before logs leave the service \u2014 not as an afterthought." },
      { head: "Compliance audit on demand", body: "\u201CShow me all actions user X took between 14:00 and 15:00\u201D is a log query, not a manual investigation." },
      { head: "SIEM feed", body: "Security events in structured logs join to distributed traces by trace_id \u2014 the pivot key for incident investigation." },
    ];
    for (let i = 0; i < points.length; i++) {
      const p = points[i], y = 1.0 + i * 0.82;
      s.addShape(pres.shapes.RECTANGLE, { x: 5.25, y, w: 4.4, h: 0.72, fill: { color: C.offWhite }, shadow: shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x: 5.25, y, w: 0.06, h: 0.72, fill: { color: C.accent } });
      s.addText(p.head, { x: 5.4, y: y + 0.06, w: 4.1, h: 0.28, fontSize: 11.5, color: C.navy, bold: true, margin: 0 });
      s.addText(p.body, { x: 5.4, y: y + 0.38, w: 4.1, h: 0.28, fontSize: 10, color: C.muted, margin: 0 });
    }
  }

  // ─────────────────────────────────────────────
  // SLIDE 5 — Custom Metrics
  // ─────────────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.navy };
    s.addText("PRACTICE 2  \u00B7  CUSTOM METRICS FOR KEY PRODUCT FLOWS", { x: 0.4, y: 0.22, w: 9, h: 0.45, fontSize: 13, color: C.iceBlue, bold: true, charSpacing: 3, margin: 0 });
    s.addText("Infrastructure metrics tell you about resources. Custom metrics tell you about your product.", { x: 0.4, y: 0.72, w: 9.2, h: 0.36, fontSize: 15, color: C.white, italic: true, margin: 0 });

    const patterns = [
      { name: "RED Pattern", sub: "For every user-facing service", color: C.accent, items: [{ l: "Rate", d: "Requests per second \u2014 is volume normal?" }, { l: "Errors", d: "Error rate as % of requests \u2014 is quality normal?" }, { l: "Duration", d: "Latency distribution p50/p95/p99 \u2014 is speed normal?" }] },
      { name: "USE Pattern", sub: "For every internal resource or queue", color: C.teal, items: [{ l: "Utilization", d: "% of capacity in use \u2014 how loaded is it?" }, { l: "Saturation", d: "Queue depth / backlog \u2014 is demand exceeding supply?" }, { l: "Errors", d: "Failure rate \u2014 is it working reliably?" }] },
    ];
    for (let i = 0; i < 2; i++) {
      const p = patterns[i], x = 0.35 + i * 4.75;
      s.addShape(pres.shapes.RECTANGLE, { x, y: 1.22, w: 4.4, h: 2.0, fill: { color: C.mid, transparency: 18 }, shadow: shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y: 1.22, w: 4.4, h: 0.52, fill: { color: p.color, transparency: 10 } });
      s.addText(p.name, { x: x + 0.12, y: 1.22, w: 4.1, h: 0.32, fontSize: 13, color: C.white, bold: true, valign: "middle", margin: 0 });
      s.addText(p.sub, { x: x + 0.12, y: 1.52, w: 4.1, h: 0.2, fontSize: 10, color: C.iceBlue, italic: true, margin: 0 });
      for (let j = 0; j < p.items.length; j++) {
        const it = p.items[j];
        s.addText(it.l + ":", { x: x + 0.18, y: 1.86 + j * 0.42, w: 1.1, h: 0.36, fontSize: 11.5, color: p.color, bold: true, valign: "middle", margin: 0 });
        s.addText(it.d, { x: x + 1.28, y: 1.86 + j * 0.42, w: 2.95, h: 0.36, fontSize: 10.5, color: C.pale, valign: "middle", margin: 0 });
      }
    }

    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 3.38, w: 9.3, h: 0.36, fill: { color: C.mid, transparency: 10 } });
    s.addText("PRODUCT FLOW", { x: 0.45, y: 3.38, w: 2.4, h: 0.36, fontSize: 10, color: C.iceBlue, bold: true, charSpacing: 2, valign: "middle", margin: 0 });
    s.addText("KEY METRICS TO INSTRUMENT", { x: 3.0, y: 3.38, w: 6.55, h: 0.36, fontSize: 10, color: C.iceBlue, bold: true, charSpacing: 2, valign: "middle", margin: 0 });

    const flows = [
      { flow: "User authentication", metrics: "Login success rate \u00B7 MFA completion rate \u00B7 Session creation time p95" },
      { flow: "Checkout / payment", metrics: "Step completion rates \u00B7 Cart abandonment \u00B7 Payment success rate \u00B7 Decline rate by reason" },
      { flow: "Background jobs", metrics: "Queue depth \u00B7 Processing rate \u00B7 Job failure rate \u00B7 Retry rate \u00B7 Time-to-completion p95" },
      { flow: "Search / recommendations", metrics: "Query latency p95 \u00B7 Zero-results rate \u00B7 Click-through rate \u00B7 Relevance score trend" },
    ];
    for (let i = 0; i < flows.length; i++) {
      const f = flows[i], y = 3.8 + i * 0.42, bg = i % 2 === 0 ? C.mid : "2A4870";
      s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y, w: 9.3, h: 0.38, fill: { color: bg, transparency: 25 } });
      s.addText(f.flow, { x: 0.45, y, w: 2.42, h: 0.38, fontSize: 11, color: C.iceBlue, bold: true, valign: "middle", margin: 0 });
      s.addText(f.metrics, { x: 3.0, y, w: 6.5, h: 0.38, fontSize: 10.5, color: C.pale, valign: "middle", margin: 0 });
    }
    s.addText("Custom metrics are the input to SLOs. Every team that owns a user-facing flow should own the metrics for it.", { x: 0.35, y: 5.5, w: 9.3, h: 0.2, fontSize: 9.5, color: C.muted, italic: true, margin: 0 });
  }

  // ─────────────────────────────────────────────
  // SLIDE 6 — Distributed Tracing
  // ─────────────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.offWhite };
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.82, fill: { color: C.green } });
    s.addText("PRACTICE 3  \u00B7  DISTRIBUTED TRACING", { x: 0.4, y: 0, w: 9, h: 0.82, fontSize: 13, color: C.white, bold: true, charSpacing: 3, valign: "middle", margin: 0 });
    s.addText("Logs say something was slow. Metrics say how often. Traces tell you exactly where, in which service, in which span.", { x: 0.4, y: 0.9, w: 9.2, h: 0.3, fontSize: 12, color: C.muted, italic: true, margin: 0 });

    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 1.28, w: 5.0, h: 4.1, fill: { color: C.white }, shadow: shadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 1.28, w: 5.0, h: 0.42, fill: { color: C.green } });
    s.addText("TRACE WATERFALL  \u00B7  Order Placement", { x: 0.45, y: 1.28, w: 4.8, h: 0.42, fontSize: 10.5, color: C.white, bold: true, valign: "middle", margin: 0 });

    const spans = [
      { name: "api-gateway: POST /orders", indent: 0, w: 4.5, color: C.navy, ms: "420ms" },
      { name: "  auth-service: validate_token", indent: 0.2, w: 0.8, color: C.accent, ms: "18ms" },
      { name: "  order-service: place_order", indent: 0.2, w: 3.4, color: C.teal, ms: "395ms" },
      { name: "    inventory: check_stock", indent: 0.42, w: 0.9, color: C.green, ms: "22ms" },
      { name: "    payment-service: charge", indent: 0.42, w: 2.1, color: C.amber, ms: "340ms \u26A0" },
      { name: "      payment-gw: authorize", indent: 0.64, w: 1.9, color: C.red, ms: "320ms" },
      { name: "    fulfil-service: dispatch", indent: 0.42, w: 0.5, color: C.steel, ms: "14ms" },
    ];
    for (let i = 0; i < spans.length; i++) {
      const sp = spans[i], y = 1.82 + i * 0.48;
      s.addText(sp.name, { x: 0.45, y, w: 3.2, h: 0.36, fontSize: 9.5, color: sp.color, bold: i === 0 || i === 2, margin: 0 });
      s.addShape(pres.shapes.RECTANGLE, { x: 3.7 + sp.indent, y: y + 0.06, w: sp.w, h: 0.24, fill: { color: sp.color, transparency: i > 4 ? 20 : 0 } });
      s.addText(sp.ms, { x: 3.72 + sp.indent + sp.w, y, w: 0.8, h: 0.36, fontSize: 9, color: C.muted, valign: "middle", margin: 0 });
    }

    const reveals = [
      { head: "Root cause in the critical path", body: "payment-gw:authorize takes 320ms \u2014 that one span explains 76% of end-to-end latency. Logs alone would not surface this." },
      { head: "N+1 query detection", body: "50 sequential DB spans under a single parent span is a trace pattern \u2014 invisible in aggregate metrics." },
      { head: "Cross-service failure propagation", body: "Error in downstream service A becomes a 500 in service B. Trace shows the origin; logs in B only show the symptom." },
      { head: "Standard: OpenTelemetry + W3C Trace Context", body: "Propagate trace_id in W3C headers across all HTTP calls including async queues. OpenTelemetry is the vendor-neutral standard." },
    ];
    for (let i = 0; i < reveals.length; i++) {
      const r = reveals[i], y = 1.28 + i * 1.04;
      s.addShape(pres.shapes.RECTANGLE, { x: 5.55, y, w: 4.1, h: 0.92, fill: { color: C.white }, shadow: shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x: 5.55, y, w: 0.06, h: 0.92, fill: { color: C.green } });
      s.addText(r.head, { x: 5.7, y: y + 0.08, w: 3.85, h: 0.3, fontSize: 11.5, color: C.navy, bold: true, margin: 0 });
      s.addText(r.body, { x: 5.7, y: y + 0.44, w: 3.85, h: 0.42, fontSize: 10, color: C.muted, margin: 0 });
    }
    s.addShape(pres.shapes.RECTANGLE, { x: 5.55, y: 5.42, w: 4.1, h: 0.28, fill: { color: C.green, transparency: 85 } });
    s.addText("Enterprise: always retain error traces 100%. Apply tail-based sampling for successful requests.", { x: 5.65, y: 5.44, w: 3.9, h: 0.24, fontSize: 9.5, color: C.green, bold: true, margin: 0 });
  }

  // ─────────────────────────────────────────────
  // SLIDE 7 — Events
  // ─────────────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.white };
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.82, fill: { color: C.navy } });
    s.addText("PRACTICE 4  \u00B7  EVENTS: CROSS-DOMAIN NOTIFICATIONS & SECURITY SIGNALS", { x: 0.4, y: 0, w: 9.2, h: 0.82, fontSize: 12, color: C.white, bold: true, charSpacing: 2, valign: "middle", margin: 0 });

    const cols = [
      {
        title: "Operational / Domain Events", color: C.teal, sub: "State changes that other services need to know about",
        items: [
          { e: "OrderPlaced", t: "Triggers: notification, loyalty award, analytics" },
          { e: "PaymentProcessed", t: "Triggers: fulfilment dispatch, invoice generation" },
          { e: "AccountCreated", t: "Triggers: onboarding email, CRM record creation" },
          { e: "ShipmentDispatched", t: "Triggers: customer notification, tracking activation" },
        ],
        schema: ["event_id  \u00B7 event_type  \u00B7 event_version", "source_service  \u00B7 timestamp  \u00B7 trace_id", "aggregate_id  \u00B7 aggregate_type  \u00B7 payload", "idempotency_key  \u00B7 schema_registry_id"]
      },
      {
        title: "Security Events", color: C.red, sub: "Actions relevant to access, audit, and threat detection",
        items: [
          { e: "AuthenticationFailed", t: "SIEM: brute-force detection, account lockout" },
          { e: "PrivilegedOperationPerformed", t: "SIEM: admin action audit, SOX compliance" },
          { e: "SensitiveDataExported", t: "SIEM: data loss prevention correlation" },
          { e: "PermissionEscalationAttempted", t: "SIEM: lateral movement detection" },
        ],
        schema: ["event_id  \u00B7 event_type  \u00B7 severity", "actor_id  \u00B7 source_ip  \u00B7 trace_id", "resource_type  \u00B7 resource_id  \u00B7 action", "outcome  \u00B7 risk_score  \u00B7 schema_version"]
      },
    ];

    for (let i = 0; i < 2; i++) {
      const col = cols[i], x = i === 0 ? 0.35 : 5.2, w = 4.5;
      s.addShape(pres.shapes.RECTANGLE, { x, y: 0.9, w, h: 4.5, fill: { color: C.offWhite }, shadow: shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y: 0.9, w, h: 0.52, fill: { color: col.color } });
      s.addText(col.title, { x: x + 0.12, y: 0.9, w: w - 0.18, h: 0.32, fontSize: 12, color: C.white, bold: true, valign: "middle", margin: 0 });
      s.addText(col.sub, { x: x + 0.12, y: 1.2, w: w - 0.18, h: 0.2, fontSize: 9.5, color: C.white, italic: true, margin: 0 });
      for (let j = 0; j < col.items.length; j++) {
        const it = col.items[j], y = 1.52 + j * 0.54;
        s.addShape(pres.shapes.RECTANGLE, { x: x + 0.12, y, w: w - 0.22, h: 0.44, fill: { color: col.color, transparency: 90 } });
        s.addText(it.e, { x: x + 0.2, y: y + 0.02, w: w - 0.32, h: 0.2, fontSize: 11, color: col.color, bold: true, margin: 0 });
        s.addText(it.t, { x: x + 0.2, y: y + 0.22, w: w - 0.32, h: 0.18, fontSize: 9.5, color: C.muted, margin: 0 });
      }
      s.addShape(pres.shapes.RECTANGLE, { x: x + 0.1, y: 3.74, w: w - 0.18, h: 1.54, fill: { color: col.color, transparency: 92 } });
      s.addText("EVENT SCHEMA FIELDS", { x: x + 0.18, y: 3.78, w: w - 0.28, h: 0.24, fontSize: 9, color: col.color, bold: true, charSpacing: 2, margin: 0 });
      for (let k = 0; k < col.schema.length; k++) {
        s.addText(col.schema[k], { x: x + 0.18, y: 4.04 + k * 0.3, w: w - 0.28, h: 0.26, fontSize: 9.5, color: C.text, margin: 0 });
      }
    }
    s.addText("The trace_id in security events must match the trace_id in distributed traces \u2014 the join key for SIEM incident investigation.", { x: 0.35, y: 5.52, w: 9.3, h: 0.2, fontSize: 9.5, color: C.muted, italic: true, margin: 0 });
  }

  // ─────────────────────────────────────────────
  // SLIDE 8 — Health & Readiness Endpoints
  // ─────────────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.navy };
    s.addText("PRACTICE 5  \u00B7  HEALTH AND READINESS ENDPOINTS", { x: 0.4, y: 0.22, w: 9, h: 0.45, fontSize: 13, color: C.iceBlue, bold: true, charSpacing: 3, margin: 0 });
    s.addText("The operational interface between your service and its platform \u2014 how infrastructure knows whether to route traffic, restart, or wait.", { x: 0.4, y: 0.72, w: 9.2, h: 0.36, fontSize: 13, color: C.white, italic: true, margin: 0 });

    const endpoints = [
      { path: "/health/live", name: "Liveness", color: C.green, question: "Is this process alive and not deadlocked?", healthy: "200 OK \u2014 process is running", unhealthy: "500 \u2014 container will be restarted", checks: ["Process is responsive", "No deadlock or OOM condition", "Internal watchdog heartbeat"], avoid: "Do NOT check downstream dependencies \u2014 DB outage \u2260 restart your process" },
      { path: "/health/ready", name: "Readiness", color: C.accent, question: "Is this instance ready to serve traffic?", healthy: "200 OK \u2014 instance in load balancer pool", unhealthy: "503 \u2014 removed from pool, no traffic sent", checks: ["DB connection pool healthy", "Required dependencies reachable", "Cache connected", "Warm-up complete"], avoid: "Do NOT do expensive operations \u2014 probes run every few seconds" },
      { path: "/health/startup", name: "Startup", color: C.amber, question: "Has this instance finished initialising?", healthy: "200 OK \u2014 liveness probes begin", unhealthy: "503 \u2014 no traffic until startup complete", checks: ["Config loaded successfully", "DB schema validated", "Cache pre-warmed", "ML model loaded"], avoid: "Use a long initial delay \u2014 prevents liveness probe killing a slow-start service" },
    ];

    for (let i = 0; i < 3; i++) {
      const ep = endpoints[i], x = 0.35 + i * 3.18;
      s.addShape(pres.shapes.RECTANGLE, { x, y: 1.22, w: 3.0, h: 4.18, fill: { color: C.mid, transparency: 18 }, shadow: shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y: 1.22, w: 3.0, h: 0.72, fill: { color: ep.color, transparency: 10 } });
      s.addText(ep.path, { x: x + 0.1, y: 1.22, w: 2.8, h: 0.38, fontSize: 12, color: C.white, bold: true, valign: "middle", margin: 0 });
      s.addText(ep.name + " Probe", { x: x + 0.1, y: 1.58, w: 2.8, h: 0.32, fontSize: 11, color: C.white, italic: true, margin: 0 });
      s.addText(ep.question, { x: x + 0.1, y: 2.06, w: 2.8, h: 0.44, fontSize: 11, color: C.pale, bold: true, margin: 0 });
      s.addText("\u2713 " + ep.healthy, { x: x + 0.1, y: 2.58, w: 2.8, h: 0.3, fontSize: 10, color: C.green, margin: 0 });
      s.addText("\u2717 " + ep.unhealthy, { x: x + 0.1, y: 2.9, w: 2.8, h: 0.3, fontSize: 10, color: C.red, margin: 0 });
      s.addText("WHAT TO CHECK:", { x: x + 0.1, y: 3.32, w: 2.8, h: 0.24, fontSize: 9, color: ep.color, bold: true, charSpacing: 2, margin: 0 });
      for (let j = 0; j < ep.checks.length; j++) {
        s.addText("\u00B7 " + ep.checks[j], { x: x + 0.1, y: 3.58 + j * 0.3, w: 2.8, h: 0.26, fontSize: 10, color: C.pale, margin: 0 });
      }
      s.addShape(pres.shapes.RECTANGLE, { x: x + 0.08, y: 4.82, w: 2.84, h: 0.48, fill: { color: ep.color, transparency: 88 } });
      s.addText(ep.avoid, { x: x + 0.14, y: 4.84, w: 2.74, h: 0.44, fontSize: 9.5, color: ep.color, italic: true, margin: 0 });
    }
  }

  // ─────────────────────────────────────────────
  // SLIDE 9 — The Five Practices Together
  // ─────────────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.offWhite };
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.82, fill: { color: C.navy } });
    s.addText("THE FIVE PRACTICES TOGETHER: THE CORRELATION LAYER", { x: 0.4, y: 0, w: 9, h: 0.82, fontSize: 13, color: C.white, bold: true, charSpacing: 3, valign: "middle", margin: 0 });
    s.addText("A shared trace_id links all five signals to the same request \u2014 turning five isolated islands into one diagnostic system.", { x: 0.4, y: 0.9, w: 9.2, h: 0.3, fontSize: 12, color: C.muted, italic: true, margin: 0 });

    const rows2 = [
      { p: "Structured Logs", q: "What exactly happened, in what context?", wo: "Log grep across unstructured text; manual reconstruction of sequence" },
      { p: "Custom Metrics", q: "Is the product flow healthy? How bad is it?", wo: "Infra metrics only \u2014 20% CPU, but 40% payment failures invisible" },
      { p: "Distributed Traces", q: "Which service in the chain caused this?", wo: "Per-service logs correlated manually; root cause guesswork" },
      { p: "Events", q: "What changed? Who should know?", wo: "Polling for state changes; security actions not forwarded to SIEM" },
      { p: "Health Endpoints", q: "Is this instance ready for traffic?", wo: "All-or-nothing deployment; partial failures invisible to load balancer" },
    ];

    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 1.28, w: 9.3, h: 0.38, fill: { color: C.navy } });
    s.addText("PRACTICE", { x: 0.45, y: 1.28, w: 2.0, h: 0.38, fontSize: 10, color: C.white, bold: true, charSpacing: 2, valign: "middle", margin: 0 });
    s.addText("QUESTION IT ANSWERS", { x: 2.6, y: 1.28, w: 3.4, h: 0.38, fontSize: 10, color: C.white, bold: true, charSpacing: 2, valign: "middle", margin: 0 });
    s.addText("WITHOUT IT YOU FACE\u2026", { x: 6.15, y: 1.28, w: 3.4, h: 0.38, fontSize: 10, color: C.white, bold: true, charSpacing: 2, valign: "middle", margin: 0 });

    const rowColors = [C.accent, C.teal, C.green, "4A7FA8", C.steel];
    for (let i = 0; i < rows2.length; i++) {
      const r = rows2[i], y = 1.72 + i * 0.66, bg = i % 2 === 0 ? C.white : C.offWhite;
      s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y, w: 9.3, h: 0.6, fill: { color: bg } });
      s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y, w: 0.08, h: 0.6, fill: { color: rowColors[i] } });
      s.addText(r.p, { x: 0.52, y, w: 1.9, h: 0.6, fontSize: 11, color: rowColors[i], bold: true, valign: "middle", margin: 0 });
      s.addText(r.q, { x: 2.6, y, w: 3.4, h: 0.6, fontSize: 10.5, color: C.text, valign: "middle", margin: 0 });
      s.addText(r.wo, { x: 6.15, y, w: 3.4, h: 0.6, fontSize: 10.5, color: C.muted, valign: "middle", margin: 0 });
    }

    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 5.18, w: 9.3, h: 0.38, fill: { color: C.accent, transparency: 15 } });
    s.addText("All five signals carry the same trace_id \u2014 the single key that joins a log entry, a trace span, a metric, a domain event, and a health check to one request.", { x: 0.45, y: 5.18, w: 9.1, h: 0.38, fontSize: 11, color: C.navy, bold: true, valign: "middle", margin: 0 });
  }

  // ─────────────────────────────────────────────
  // SLIDE 10 — Enterprise Considerations
  // ─────────────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.navy };
    s.addText("ENTERPRISE CONSIDERATIONS", { x: 0.4, y: 0.22, w: 9, h: 0.45, fontSize: 13, color: C.iceBlue, bold: true, charSpacing: 3, margin: 0 });
    s.addText("Observability in regulated, multi-team enterprise environments requires deliberate governance decisions.", { x: 0.4, y: 0.72, w: 9.2, h: 0.36, fontSize: 14, color: C.white, italic: true, margin: 0 });

    const considerations = [
      { head: "PII and data residency", color: C.red, body: "Logs and events are regulated data. Redact PII at capture time \u2014 before logs leave the service. GDPR, HIPAA, and PCI-DSS all apply to what you log." },
      { head: "Retention policies", color: C.amber, body: "SOX requires access logs retained for 7 years. PCI-DSS requires 12 months of security event logs. Define retention per data classification before first deployment." },
      { head: "Observability cost governance", color: C.accent, body: "High-cardinality metrics, full-trace retention, and high-volume event streaming scale with request volume. Budget explicitly. Apply sampling strategies." },
      { head: "Centralised SIEM \u2014 non-negotiable", color: C.teal, body: "Security events must go to a centralised SIEM. Per-team SIEM is not compliance. Cross-team correlation requires centralisation." },
      { head: "Schema governance for events and logs", color: C.green, body: "Log fields and event schemas are contracts. A field rename breaks queries and dashboards. Use a schema registry; define field names at platform level." },
      { head: "Cross-team trace propagation", color: C.steel, body: "When requests cross team boundaries, trace context must propagate across that boundary. A missing trace context creates a gap in every incident investigation." },
    ];

    for (let i = 0; i < 6; i++) {
      const con = considerations[i], col = i % 2 === 0 ? 0 : 1;
      const x = col === 0 ? 0.35 : 5.15, y = 1.28 + Math.floor(i / 2) * 1.44, w = 4.6, h = 1.32;
      s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color: C.mid, transparency: 18 }, shadow: shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.06, h, fill: { color: con.color } });
      s.addText(con.head, { x: x + 0.16, y: y + 0.08, w: w - 0.22, h: 0.3, fontSize: 12, color: con.color, bold: true, margin: 0 });
      s.addText(con.body, { x: x + 0.16, y: y + 0.44, w: w - 0.22, h: 0.82, fontSize: 10, color: C.pale, margin: 0 });
    }
  }

  // ─────────────────────────────────────────────
  // SLIDE 11 — Lab Exercise
  // ─────────────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.white };
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.82, fill: { color: C.teal } });
    s.addText("LAB EXERCISE  \u00B7  30 MINUTES", { x: 0.4, y: 0, w: 9, h: 0.82, fontSize: 13, color: C.white, bold: true, charSpacing: 3, valign: "middle", margin: 0 });
    s.addText("Instrument an Order Management Service: Structured Logs \u00B7 Metrics \u00B7 Trace \u00B7 Events \u00B7 Health", { x: 0.4, y: 0.92, w: 9.2, h: 0.42, fontSize: 16, color: C.navy, bold: true, margin: 0 });

    const steps = [
      { n: "1", t: "Structured log schema", min: "6 min", d: "Design the JSON log entry for order.placed. Mandatory fields? Where does PII appear and how do you redact it? How does trace_id propagate to downstream service logs?" },
      { n: "2", t: "Custom metrics", min: "7 min", d: "Name the five most important metrics for your order flow. For each: RED or USE pattern, alert threshold, and what fires when the threshold is breached." },
      { n: "3", t: "Distributed trace span tree", min: "7 min", d: "Draw the span tree for a successful order placement: span names, owning services, critical path, and where you\u2019d expect latency to concentrate under load." },
      { n: "4", t: "Security event catalogue", min: "5 min", d: "List the security events this service should emit. For each: event type, what triggered it, which SIEM detection rule it feeds, and the trace_id join strategy." },
      { n: "5", t: "Health endpoint spec", min: "5 min", d: "Write the /health/ready JSON response when: (a) fully healthy; (b) payment processor degraded. What should the load balancer do in each case?" },
    ];

    for (let i = 0; i < steps.length; i++) {
      const st = steps[i], y = 1.44 + i * 0.84;
      s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y, w: 9.3, h: 0.74, fill: { color: C.offWhite }, shadow: shadow() });
      s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y, w: 0.52, h: 0.74, fill: { color: C.teal } });
      s.addText(st.n, { x: 0.35, y, w: 0.52, h: 0.74, fontSize: 20, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
      s.addText(st.t, { x: 0.97, y: y + 0.06, w: 2.4, h: 0.28, fontSize: 12, color: C.teal, bold: true, margin: 0 });
      s.addText("(" + st.min + ")", { x: 3.37, y: y + 0.06, w: 0.85, h: 0.28, fontSize: 11, color: C.muted, italic: true, margin: 0 });
      s.addText(st.d, { x: 0.97, y: y + 0.4, w: 8.55, h: 0.28, fontSize: 10.5, color: C.muted, margin: 0 });
    }
  }

  // ─────────────────────────────────────────────
  // SLIDE 12 — Discussion + Summary
  // ─────────────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.navy };
    s.addShape(pres.shapes.RECTANGLE, { x: 9.82, y: 0, w: 0.18, h: 5.625, fill: { color: C.accent } });
    s.addText("DISCUSSION + MODULE SUMMARY", { x: 0.4, y: 0.22, w: 9, h: 0.45, fontSize: 13, color: C.iceBlue, bold: true, charSpacing: 3, margin: 0 });

    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 0.82, w: 5.5, h: 3.82, fill: { color: C.mid, transparency: 20 }, shadow: shadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 0.82, w: 5.5, h: 0.48, fill: { color: C.iceBlue, transparency: 15 } });
    s.addText("DISCUSSION QUESTIONS", { x: 0.35, y: 0.82, w: 5.5, h: 0.48, fontSize: 11, color: C.white, bold: true, charSpacing: 2, align: "center", valign: "middle", margin: 0 });
    s.addText("Q1.  For the last production incident your team experienced, which of the five practices would have cut your diagnosis time in half?\n\nQ2.  Walk through your current log entries. Are they structured? Do they carry a trace_id? What is missing?\n\nQ3.  Your payment service has a 5% error rate but infrastructure metrics look normal. Which practice surfaces this?\n\nQ4.  A security analyst asks: \u201CShow me all external API calls made by automated processes in the last 24 hours.\u201D Can you answer today?", { x: 0.5, y: 1.4, w: 5.1, h: 3.1, fontSize: 11, color: C.pale, margin: 0 });

    s.addShape(pres.shapes.RECTANGLE, { x: 6.05, y: 0.82, w: 3.6, h: 3.82, fill: { color: C.mid, transparency: 20 }, shadow: shadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: 6.05, y: 0.82, w: 3.6, h: 0.48, fill: { color: C.accent, transparency: 10 } });
    s.addText("KEY TAKEAWAYS", { x: 6.05, y: 0.82, w: 3.6, h: 0.48, fontSize: 11, color: C.white, bold: true, charSpacing: 2, align: "center", valign: "middle", margin: 0 });
    s.addText("\u00B7 5 practices: logs \u00B7 metrics \u00B7 traces \u00B7 events \u00B7 health\n\n\u00B7 Monitoring answers known questions \u2014 observability answers new ones\n\n\u00B7 Structured logs + trace_id = cross-service diagnosis in one query\n\n\u00B7 Custom metrics connect infra to business outcomes\n\n\u00B7 Events bridge SIEM and cross-domain integration\n\n\u00B7 Health endpoints are the platform\u2019s operating contract\n\n\u00B7 trace_id is the join key that makes all five work as one", { x: 6.2, y: 1.4, w: 3.35, h: 3.1, fontSize: 11, color: C.pale, margin: 0 });

    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 4.75, w: 9.3, h: 0.62, fill: { color: C.accent, transparency: 18 } });
    s.addText("NEXT  \u00B7  Module 10: Design Reviews  \u2014  Design principles, security & FinOps reviews, the 12-point checklist", { x: 0.35, y: 4.75, w: 9.3, h: 0.62, fontSize: 11.5, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
  }

  await pres.writeFile({ fileName: "Module_09_Observability.pptx" });
  console.log("\u2705 Module 9 written");
}
build().catch(console.error);
