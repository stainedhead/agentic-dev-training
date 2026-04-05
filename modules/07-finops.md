# Module 07 — FinOps for Agentic Systems

## Learning Objectives

- Understand the cost structure of agentic systems (tokens, compute, latency)
- Apply FinOps practices to LLM workloads
- Implement token budgets, model tiering, and cost attribution
- Define cost SLOs and alerting

---

## Background

Agentic systems have a fundamentally different cost model than traditional software. Traditional software costs are dominated by compute and storage — predictable, capacity-plannable, and relatively stable per-request. Agentic systems add a new dimension: **token costs** that vary based on context length, model choice, and the number of steps an agent takes.

A poorly designed agent can cost 100x more than an equivalent well-designed one. A runaway agent (infinite loop, context explosion) can accumulate thousands of dollars in minutes. FinOps for agentic systems is not optional — it is a first-class engineering requirement.

---

## Core Concepts

### 1. The Agentic Cost Model

```
Total cost = Σ (input_tokens × input_price + output_tokens × output_price)
             for every LLM call in the agent run
           + compute costs for tool execution
           + storage costs for memory/state
```

The dominant cost is usually token costs. Key drivers:

| Driver | Impact | Mitigation |
|--------|--------|------------|
| Context window size | Linear with tokens sent | Just-in-time context loading; compaction |
| Model tier | 10-50x price difference between frontier and mid-tier | Model routing (use cheapest model that works) |
| Number of LLM calls | Multiplies all per-call costs | Reduce unnecessary reasoning steps; batch where possible |
| Output length | Directly priced | Be specific in prompts; constrain output length |
| Retry rate | Multiplies costs for failed paths | Fix root causes; improve instructions |

### 2. Model Tiering and Routing

Not every task requires a frontier model. Apply the cheapest model that can reliably accomplish the task:

```
Task complexity → Model selection
─────────────────────────────────────────────────────
Simple classification / routing    → Haiku / small model
Standard code generation           → Sonnet / mid-tier
Complex reasoning / architecture   → Opus / frontier
```

Implement a **model router** that classifies task complexity and selects the appropriate model. This alone can reduce costs by 60-80% on typical agentic workloads.

### 3. Token Budgets

Every agent run should have a hard token budget. When the budget is exhausted:
1. The agent stops
2. A partial result (with explanation) is returned
3. An alert fires
4. The run is logged for analysis

```python
# Example: token budget enforcement
class TokenBudget:
    def __init__(self, max_tokens: int):
        self.max_tokens = max_tokens
        self.used = 0

    def consume(self, tokens: int) -> bool:
        self.used += tokens
        if self.used > self.max_tokens:
            raise TokenBudgetExceeded(
                f"Budget of {self.max_tokens} exhausted after {self.used} tokens"
            )
        return True

    @property
    def remaining(self) -> int:
        return self.max_tokens - self.used
```

Set budgets based on observed p95 cost for the task type, with a safety margin. Review and adjust quarterly.

### 4. Cost Attribution

For enterprise accountability, every agent run must be attributable:

```
Who triggered it?     → User ID / service account
What for?             → Business purpose / ticket ID
Which team owns it?   → Cost center / squad
What model was used?  → Model version and tier
What did it cost?     → Actual token count × price
```

This data goes into your FinOps platform (CloudHealth, Apptio, or a custom dashboard) and enables:
- Chargeback/showback to business units
- Cost anomaly detection
- Identification of expensive edge cases for optimisation

### 5. Context Optimisation for Cost

Context is cost. Every token in the context window costs money. Engineering for cost means engineering for context efficiency:

**Techniques:**

| Technique | Cost impact | Implementation effort |
|-----------|------------|----------------------|
| **Semantic retrieval** | High — fetch only relevant chunks | Medium |
| **Prompt compression** | Medium — shorter system prompts | Low |
| **Response caching** | Very high — zero cost for cache hits | Medium |
| **Batching** | High — amortise fixed costs | High |
| **Streaming with early stop** | Medium — stop when answer found | Medium |
| **Context compaction** | High — shorter history | Medium |

### 6. Response Caching

Agents often ask the same questions repeatedly — especially in orchestration patterns where multiple subagents receive similar context. Implement a **semantic cache**:

```
Request → Hash prompt → Check cache
                              │
                   ┌──────────┴───────────┐
                 Hit                    Miss
                  │                       │
            Return cached            Call LLM
            response                 Store in cache
            (zero cost)              Return response
```

Cache hit rates of 20-40% are achievable on typical enterprise agentic workloads, with proportional cost reduction.

### 7. Cost Anomaly Detection

Define normal cost ranges per task type. Alert when:
- A single run costs > 3× the p95 for its task type
- Daily cost for a workflow increases > 20% week-over-week without a corresponding increase in volume
- A new agent deployment causes a cost spike in its first 24 hours

Treat cost anomalies like performance anomalies — investigate and close them.

### 8. Cost SLOs

Define cost targets as SLOs, not just budgets:

```yaml
cost_slos:
  code_review_agent:
    target_cost_per_task: $0.08
    p95_cost_per_task: $0.25
    monthly_budget: $2000
    alert_at: 80%  # of monthly budget

  documentation_agent:
    target_cost_per_task: $0.03
    p95_cost_per_task: $0.10
    monthly_budget: $500
    alert_at: 80%
```

---

## Enterprise Considerations

**FinOps governance.** Establish an AI FinOps working group with representation from engineering, finance, and architecture. This group owns: model procurement, cost policy, and chargeback methodology.

**Procurement leverage.** At enterprise scale, negotiate directly with model providers for committed-use discounts. Anthropic, OpenAI, and Google all offer enterprise pricing. Consolidating on fewer providers increases leverage.

**Shadow AI costs.** Individual teams may be expensing API keys on personal or team credit cards, bypassing cost visibility. Establish a centralised API gateway that all agentic workloads route through. This enforces cost attribution and enables rate limiting.

**Make-vs-buy for inference.** At sufficient scale (typically >$500K/year in API costs), evaluate self-hosted open-source models for appropriate workloads. Not always the right answer, but always worth evaluating.

---

## Exercise

Take a workflow you are building or planning:

1. Estimate the token cost per run: how many LLM calls? What context size? Which model?
2. Calculate: at projected volume (runs/day), what is the monthly cost?
3. Identify the top two cost drivers. What would you change to reduce each by 50%?
4. Design the cost attribution schema for this workflow.
5. Write the cost anomaly alert: what would trigger it? Who gets paged?

---

## Facilitator Notes

The cost estimation exercise is usually sobering. Teams routinely underestimate costs by 5-10x when they first design agentic workflows. The goal is not to discourage agentic development — it is to build the habit of cost-awareness from the start.

Discussion: *"If you had to reduce the cost of this workflow by 80% without reducing quality, what would you do?"*

---

## Further Reading

- FinOps Foundation: [finops.org](https://www.finops.org/)
- Anthropic pricing documentation
- AWS/Azure/GCP AI cost management guides
- Martin Fowler: Cost of LLM applications

