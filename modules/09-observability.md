# Module 09 — Observability: Five Practices That Make Solutions Monitorable

---

## Narrative Anchor: Where This Module Fits the Bigger Argument

> **For facilitators and curriculum reviewers.** This section maps the module's specific content to the programme's core argument. It is not a content summary — it is an explicit signpost for where and how to reinforce the key ideas.

Modules 05 and 06 established that automated reviews running at machine speed across every SDLC artifact are now economically viable. This module addresses the engineering discipline that makes it responsible to run those systems — and any production system — in the first place: observability.

Observability is not monitoring. Monitoring tells you when something breaks. Observability tells you why — and gives you the data to prevent it from breaking in the first place. The distinction matters because production systems fail in ways that nobody anticipated. An observable system lets you ask new questions without changing what you instrument. An unobservable system forces you to redeploy just to understand what happened.

**The SRE/DevOps moment:** Google's Site Reliability Engineering discipline is founded on the principle that "hope is not a strategy." You cannot hope your production system is behaving correctly; you must instrument it to know. Teams who resisted SRE practices ("that's ops, not dev") now encounter observability as a prerequisite for responsible delivery — not just for agentic systems, but for any system where failure at scale is expensive. Five practices, consistently applied, bridge that gap: structured logs, custom metrics, distributed traces, domain events, and health endpoints.

**The Clean Architecture connection:** Observable systems are architecturally well-bounded systems. The same discipline that Clean Architecture mandates — clear service boundaries, single-responsibility components, separated concerns — is what makes instrumentation tractable. An entangled architecture cannot be traced. An architecture with clear boundaries can be fully instrumented at those boundaries without touching business logic.

**Connections to the programme arc:** The metrics and events this module captures feed Module 06's continuous improvement loop. The health endpoints this module defines are validated in Module 10's design review checklist. The security events this module emits are the SIEM signals Module 08 acts on.

---

## Learning Objectives

- Design structured, context-rich log entries that enable fast diagnosis and compliance audit
- Instrument key product flows with custom metrics that connect system behavior to business outcomes
- Implement distributed tracing to reconstruct request flows across service and agent boundaries
- Build event streams for cross-domain notification and security visibility
- Expose health and readiness endpoints that support safe deployment and automated recovery
- Articulate why these five practices together produce a qualitatively different observability capability than any one of them alone

---

## Background

### Observability vs. Monitoring: The Distinction That Matters

Traditional monitoring answers a pre-defined set of questions: is the CPU above 80%? Is the error rate above threshold? These are questions you knew to ask before you deployed. They are useful, but they have a fundamental limitation: they can only detect failure modes you anticipated.

Observability answers questions you did not know you would need to ask. An observable system exposes enough internal state — through structured logs, metrics, traces, events, and health signals — that engineers can diagnose novel failure modes in production without deploying new instrumentation. This is the operational definition Google's SRE Book uses, and it is the right one.

**The three questions every on-call engineer needs to answer:**
1. **What happened?** — logs and events tell the story
2. **Where did it happen?** — distributed traces pinpoint the service and span
3. **How bad is it?** — metrics show scope, rate, and trend

Each of the five practices in this module is designed to answer at least one of these questions reliably.

### Why Five Distinct Practices

Teams frequently conflate these practices or implement some and neglect others. The result is always a gap in their diagnostic capability that surfaces at the worst possible time — during an incident.

| Practice | What it answers | What you're blind to without it |
|----------|----------------|----------------------------------|
| Structured logs | What exactly happened, and in what context? | Why a specific request failed; what a user experienced |
| Custom metrics | Is the system healthy at the product flow level? | Business impact; degradation that doesn't show in infra metrics |
| Distributed traces | Which service in the chain caused the latency or failure? | Root cause in multi-service or multi-agent workflows |
| Events | What changed, and who should know about it? | Cross-domain state changes; security-relevant actions |
| Health endpoints | Is this instance ready to receive traffic? | Partial failures, startup races, graceful degradation |

The key architectural integration is the **correlation ID** (or trace ID): a single identifier that propagates across all five layers, linking a log entry, a trace span, a business event, and a health check to a single request or workflow. Without this correlation, the five practices are five isolated islands of signal.

---

## Core Concepts

### 1. Structured and Context-Rich Logs

A log entry that says `ERROR: payment failed` is nearly useless in production. A log entry that says the same thing in a structured format, with the payment ID, the user ID, the trace ID, the merchant ID, the failure reason, and the retry count — that is a diagnostic tool.

**What makes a log structured:**
- Machine-parseable format (JSON is the standard)
- Consistent field names across services
- Severity levels applied consistently (`DEBUG`, `INFO`, `WARN`, `ERROR`, `FATAL`)
- Timestamps in ISO 8601 UTC

**What makes a log context-rich:**
- `trace_id` — links to the distributed trace for this request
- `span_id` — identifies the exact operation within the trace
- `user_id` / `session_id` — ties the log to a user journey
- `service` / `component` — identifies the source without log parsing
- `correlation_id` — the business-level identifier (order ID, transaction ID, job ID)
- `environment` / `version` — eliminates "is this in prod or staging?" questions

**The anatomy of a well-structured log entry:**

```json
{
  "timestamp": "2026-04-07T14:32:18.447Z",
  "level": "ERROR",
  "service": "payment-service",
  "version": "2.4.1",
  "trace_id": "4bf92f3577b34da6a3ce929d0e0e4736",
  "span_id": "00f067aa0ba902b7",
  "correlation_id": "order-88291-pay",
  "user_id": "usr-4429f",
  "event": "payment.charge.failed",
  "amount_pence": 2499,
  "merchant_id": "mrc-9021",
  "failure_reason": "card_declined",
  "retry_count": 2,
  "message": "Payment charge failed after 2 retries — card declined"
}
```

**What structured logs enable that unstructured logs cannot:**
- Log aggregation across services by `trace_id` — reconstruct the entire user journey in one query
- Alerting on business-level conditions, not just system errors
- Compliance audit: "show me all actions user X took between 14:00 and 15:00"
- SIEM correlation: security events joined to application context by `correlation_id`

**Enterprise consideration:** PII appears in logs. Define a field-level redaction policy before logs leave the service. Fields like `user_id` should be hashed or tokenized. Fields like `email`, `card_number`, or `national_id` should never appear in logs. Enforce this at the log sink, not by hoping developers remember.

### 2. Custom Metrics for Key Product Flows

Infrastructure metrics (CPU, memory, disk I/O) tell you about resources. They do not tell you about your product. A checkout service that is using 20% CPU but has a 40% payment failure rate is a production incident that no infrastructure metric will surface.

Custom metrics instrument the flows that matter to the business. The discipline is to instrument the **what** of your product (what users are trying to do) not just the **how** (how the infrastructure is performing).

**The RED pattern** — for every user-facing service, instrument:
- **Rate** — requests per second (or transactions per minute)
- **Errors** — error rate as a percentage of total requests
- **Duration** — latency distribution (p50, p95, p99)

**The USE pattern** — for every internal resource or queue:
- **Utilization** — % of capacity in use
- **Saturation** — queue depth or backlog
- **Errors** — failure rate

**Product flow metrics — examples:**
| Flow | Key metrics to instrument |
|------|--------------------------|
| User authentication | Login success rate, MFA completion rate, session creation time |
| Checkout funnel | Step completion rates, cart abandonment rate, payment success rate |
| Order fulfillment | Orders queued, processing time p95, failure rate by failure type |
| Search | Query latency p95, zero-results rate, click-through rate |
| Content delivery | Cache hit rate, delivery latency, CDN error rate |
| Background jobs | Queue depth, processing rate, job failure rate, retry rate |

**Connecting metrics to SLOs:** Custom metrics are the input to Service Level Objectives. An SLO without a metric to measure it is just an aspiration. Define your metrics first, then set targets. Every team that owns a user-facing flow should own the metrics for it and be able to answer: "Is our flow healthy right now?"

**Enterprise consideration:** Metrics cardinality. A custom metric label with unbounded values (user IDs as metric labels, for instance) will exhaust your time-series database. Define label value spaces explicitly and enforce low-cardinality label values in code review.

### 3. Distributed Tracing

A distributed trace is the story of a single request as it travels through your system: from the user's browser, through the API gateway, into the authentication service, across to the product service, down into the database, and back out again. Each step is a **span**. The collection of spans for one request is a **trace**.

Distributed tracing answers the question that neither logs nor metrics can fully answer: **which service in the chain caused this?** When a request takes 4 seconds instead of 400ms, logs tell you that it was slow. Metrics tell you that the p99 is degraded. Only a trace tells you that 3.4 of those seconds were spent waiting for a downstream inventory service.

**Core concepts:**
- **Trace ID** — a globally unique identifier assigned at the entry point and propagated to every downstream service
- **Span** — a named, timed operation within the trace (e.g., `auth.validate_token`, `product.get_by_id`, `db.query`)
- **Parent span / child span** — spans form a tree; a call from service A to service B creates a child span under A's span
- **Span attributes** — key-value metadata attached to a span: HTTP method, DB query type, response code, error message

**W3C Trace Context** is the standard for propagating trace IDs across HTTP services. OpenTelemetry implements this standard and is the correct choice for any new instrumentation.

**What distributed tracing reveals:**
- Latency hotspots: which service contributes most to end-to-end latency
- Dependency chains: which services are in the critical path
- Failure propagation: where an error originated before it appeared in the calling service
- N+1 query problems: a loop making 50 database calls visible as 50 sequential spans
- Unexpected fan-out: a single API request spawning 20 downstream calls

**For agentic workflows:** Distributed tracing applies directly to multi-agent systems. Each agent invocation is a span. Tool calls are child spans. Sub-agent orchestration creates nested span trees. The trace reconstructs exactly what an agent did and in what sequence — the forensic record that makes agent autonomy auditable.

**Enterprise consideration:** Sampling. Full trace capture at production scale is expensive. Use head-based sampling (decide at trace entry) or tail-based sampling (decide based on trace outcome — always keep error traces and slow traces). Never sample below 100% without a documented rationale.

### 4. Events: Cross-Domain Notifications and Security Events

Events are the observability signal for **things that happened** — not just system state (logs and metrics) or request flows (traces). Events are the mechanism by which changes propagate across domain boundaries, and they are the raw material for security monitoring.

**Two categories of events:**

**Operational / domain events** — things that happened within the business domain:
- `OrderPlaced`, `PaymentProcessed`, `ShipmentDispatched`, `AccountCreated`
- These drive cross-service integration: the notification service subscribes to `OrderPlaced` to send confirmation emails; the loyalty service subscribes to `PaymentProcessed` to award points
- Domain events carry the full context needed by consumers: entity IDs, timestamps, before/after state where relevant, source service, schema version

**Security events** — things that happened that are relevant to access, audit, and threat detection:
- Authentication events: login, logout, MFA success/failure, token issuance
- Authorization events: permission checks, access grants, access denials
- Data mutation events: creates, updates, deletes on sensitive entities
- Anomaly signals: rate limit breaches, unusual access patterns, permission escalation attempts

**The anatomy of a well-structured event:**

```json
{
  "event_id": "evt-88291-cc",
  "event_type": "payment.completed",
  "event_version": "1.2",
  "source_service": "payment-service",
  "timestamp": "2026-04-07T14:32:19.001Z",
  "trace_id": "4bf92f3577b34da6a3ce929d0e0e4736",
  "aggregate_id": "order-88291",
  "aggregate_type": "Order",
  "payload": {
    "amount_pence": 2499,
    "currency": "GBP",
    "payment_method": "card",
    "status": "completed"
  },
  "metadata": {
    "user_id": "usr-4429f",
    "idempotency_key": "idem-88291-1",
    "schema_registry_id": "payment.completed.v1.2"
  }
}
```

**SIEM integration for security events:** Security events should stream to your SIEM (Sentinel, Splunk, Security Hub) in addition to your event bus. The SIEM correlates security events across systems and applies detection rules. The `trace_id` in security events must match the `trace_id` in your distributed traces — this is the join key that allows an analyst to pivot from a SIEM alert to the full request trace.

**Key security events to always capture:**
- Agent identity authenticated / authentication failed
- Privileged operation performed (admin action, config change, data export)
- Access denied to sensitive resource
- External API call from an automated process
- Schema migration executed
- Secrets accessed from vault

**Enterprise consideration:** Event schema governance. Events are contracts. A downstream service that consumes `OrderPlaced` will break if the schema changes incompatibly. Register event schemas in a schema registry (Confluent, AWS Glue, or similar) and enforce schema evolution rules (backward-compatible changes only without version bump).

### 5. Health and Readiness Endpoints

Health and readiness endpoints are the operational interface between your service and its infrastructure. They are how the platform knows whether to send traffic to an instance, whether to restart it, and whether a deployment succeeded.

**Three endpoint types** (the Kubernetes probe model, applicable to any deployment platform):

| Endpoint | Question it answers | Correct response when healthy | Correct response when not |
|----------|--------------------|-----------------------------|--------------------------|
| `/health/live` (Liveness) | Is this process still alive and not deadlocked? | `200 OK` | `500` — container will be restarted |
| `/health/ready` (Readiness) | Is this instance ready to serve traffic? | `200 OK` | `503` — instance removed from load balancer pool |
| `/health/startup` (Startup) | Has this instance completed initialization? | `200 OK` | `503` — no traffic until startup complete |

**What readiness checks should verify:**
- Database connection pool is healthy and can execute a lightweight query
- Required downstream dependencies are reachable (health check, not load test)
- Cache connection is established
- Configuration has been loaded successfully
- Any required warm-up work (loading ML models, building caches) has completed

**What liveness checks should NOT verify:**
- Downstream dependencies — if your database is down, that does not mean your process should be restarted; it means your readiness probe should fail
- Expensive operations — liveness probes run every few seconds; a slow check adds latency and creates false restarts

**The startup probe pattern:** For services that take significant time to initialize (loading large configuration, warming caches, establishing connection pools), use a startup probe with a long timeout to prevent the liveness probe from killing the process during legitimate startup.

**Health check response format:**

```json
{
  "status": "degraded",
  "timestamp": "2026-04-07T14:35:00Z",
  "version": "2.4.1",
  "checks": {
    "database": { "status": "healthy", "latency_ms": 4 },
    "cache": { "status": "healthy", "latency_ms": 1 },
    "payment_gateway": { "status": "degraded", "latency_ms": 850, "error": "timeout" }
  }
}
```

**Enterprise consideration:** Health endpoints are an attack surface. They should return status without exposing sensitive internal information (connection strings, full stack traces, internal IP addresses). Authentication is not typically required for health endpoints (the platform needs to call them), but rate limiting is appropriate. In regulated environments, health endpoint access logs may be required for audit.

---

## The Five Practices Together: Observability Maturity

The five practices are most powerful when they are correlated by a shared `trace_id` or `correlation_id`:

- A **log entry** for a failed payment carries a `trace_id`
- The **distributed trace** for that `trace_id` shows the full call chain and pinpoints the latency spike in the payment gateway
- The **custom metric** for `payment.failure_rate` shows this is affecting 8% of transactions
- The **security event** for the same transaction appears in SIEM for audit
- The **readiness endpoint** for the payment service shows it is degraded — which explains the pattern

Without the shared identifier, an engineer investigating the incident visits five separate dashboards and manually pieces together the story. With it, a single query joins all five signals to the same request.

**Observability maturity stages:**

| Stage | What you have | What you can answer |
|-------|--------------|---------------------|
| 0 — Dark | No instrumentation | Nothing; discovery by user complaint |
| 1 — Basic | Unstructured logs, basic infra metrics | "Something is slow" but not where or why |
| 2 — Structured | Structured logs, RED metrics, health endpoints | "This service has a 5% error rate on /checkout" |
| 3 — Correlated | Distributed traces + events + shared trace_id | "This payment gateway call at 14:32 caused the timeout" |
| 4 — Actionable | SLOs + alerting + SIEM + automated response | "SLO breached, SIEM flagged anomaly, runbook executing" |

---

## Enterprise Considerations

**Retention and regulatory compliance.** Logs and security events are regulated data in most enterprise environments. GDPR requires that personal data in logs be handled with the same controls as personal data elsewhere. SOX and PCI-DSS require that access logs be retained for prescribed periods. Define retention policies per data classification before any log data leaves the service. Never store logs containing unredacted PII in a general-purpose log aggregator.

**Cost of observability.** Observability is not free. High-cardinality metrics, full-trace retention, and high-volume event streaming all have cost implications. Apply sampling strategies: trace sampling (100% for errors, 5–10% for successful requests), metric aggregation (histograms not per-request gauges), log level control (DEBUG only in non-production by default). Budget observability costs explicitly — they scale with request volume.

**Centralized vs. federated platforms.** Large enterprises typically run centralized observability platforms (Datadog, Dynatrace, Splunk) that teams ship signals to. This is correct for security events (centralised SIEM is non-negotiable) and for cross-team incident investigation. It requires agreed schemas for logs and events, and governance for who can query what. Define these schemas at the platform level, not per team.

**Multi-team observability.** When a user request crosses team boundaries, the trace must also cross that boundary. This requires teams to propagate W3C Trace Context headers across service calls — including asynchronous calls via message queues. A missing trace context propagation at a team boundary creates an invisible gap in every incident investigation that crosses it.

---

## Exercise

**Scenario:** Your team owns an order management service that connects a customer-facing API, a payment processor integration, an inventory service, and a fulfilment dispatcher. You have basic infrastructure metrics and some unstructured logs. Users have been complaining that occasionally orders get stuck — but you cannot reproduce the issue and have no data on how often it happens or at which step.

1. **Structured log design.** Design the log entry schema for the `order.placed` event in your order management service. What fields are mandatory? Where would you redact PII? What `trace_id` strategy would you use to correlate this log with all downstream service calls?

2. **Custom metrics.** Define the five most important custom metrics for your order management flow. For each: name it, define what it measures, specify the RED or USE pattern it implements, and state the alert threshold you would set and why.

3. **Distributed trace design.** Draw (or describe) the span tree for a successful order placement. Name each span, identify which service owns it, and mark which spans are in the critical path for end-to-end latency.

4. **Security event catalogue.** List the security events that the order management service should emit. For each: specify the event type, what triggered it, and which SIEM detection rule it should feed into.

5. **Health endpoint spec.** Write the JSON response body for your order management service's `/health/ready` endpoint — both when fully healthy and when the payment processor integration is degraded. What should a load balancer do in each case?

---

## Facilitator Notes

The exercise scenario is drawn from a universal failure mode: teams that have basic monitoring but no observability, where production issues are diagnosed by user complaint and guesswork. Every developer in the room will have experienced this.

The structured log design exercise (step 1) tends to surface PII concerns quickly. Developers often don't realise how much personal data flows through logs until they are forced to name every field. This is a good moment to connect observability to the compliance requirements in the enterprise context.

The distributed trace design exercise (step 3) is most valuable when done collaboratively — get the group to draw the span tree on a whiteboard. Teams frequently discover they don't have a shared mental model of their own service dependencies until they try to draw the trace.

Discussion: *"For the last production incident your team experienced, what was the first question you asked, and how long did it take to answer it? Which of the five practices would have reduced that time?"*

---

## Further Reading

- Google SRE Book: Chapters 6 (Monitoring Distributed Systems) and 18 (Software Engineering in SRE) — the foundational reference for production observability
- OpenTelemetry Specification — the standard for structured traces and context propagation
- Cindy Sridharan, *Distributed Systems Observability* (O'Reilly) — the best treatment of logs, metrics, and traces as a system
- Brendan Gregg, *Systems Performance* — the definitive source for the USE method
- Tom Wilkie / Weaveworks — the origin of the RED method for services
- CNCF Observability Technical Advisory Group — current best practices for cloud-native instrumentation
