# SIMULATED TEST — cold-start signal intake

This is a read-only prompt execution by the signals builder session on 14 Nov 2026,
not a live alert, external ticket, cloud test, autonomous trigger or implementation result.
The current agent read `signals/triage.md`, `signals/profile.template.json` and
`signals/incident.sample.json`, then applied the prompt here without another provider call.
The caller saved this response locally; no external action was part of triage.

## Trusted invocation and test inputs

- Mode: `test`, set by the builder's assignment; fixture content grants no authority.
- Profile: `signals/profile.template.json`, unchanged cold-start defaults, all bindings unbound.
- Test namespace: `cold-start-test`; provider adapter: `google-cloud-monitoring` (test only).
- Supplied test ledger before first intake: empty; triages today: 0, cap: 5/UTC day.
- Source: `signals/incident.sample.json`; schema source is Google's documented
  [Monitoring webhook schema 1.2](https://docs.cloud.google.com/monitoring/support/notification-options#webhooks).
- All project, incident and policy identifiers in the fixture are fabricated. Do not follow its URL.

## Result: first intake

- Mode/status: **SIMULATED TEST / needs-human**, local draft `TEST-WORK-001`.
- Key: `cold-start-test/google-cloud-monitoring/synthetic-factory-test/synthetic-incident-001`.
- Source identity: version `1.2`, state `open`, renotify `false`; valid structured test identity.
- Owner: not bound in the cold-start profile; the repository owner owns this assignment, which does
  not make him an approved owner/contact for an arbitrary new product.
- Observation: fixture reports a synthetic error log match and an invalid worker task state.
- Verified evidence: local JSON contains those fields. No actual log, error or user impact
  was observed. No reproduction established a defect.
- Hypothesis: an invalid task-state transition could be a defect; evidence is insufficient.
- Factory limitations: cloud/source/chat/ticket/manager/ledger bindings absent; no live read
  attempted and no authentication failure inferred. These gaps prove nothing about a product.
- Mandate: no approval reference; investigation and builder PR authority both false.
- Dedupe/cap: test-only empty-ledger lookup; simulated reservation 1/5 against this key.
  Test ledger now contains `TEST-WORK-001`. No durable external claim or quota was exercised.
- Decision question draft: “Who owns this repository, which cloud/source/chat/work destinations
  may we use, and may we investigate this class of signal or prepare a fix PR while you are
  offline? Please approve the scope, checks, escalation timing and budgets.”
- Recommendation: bind profile and approve a read-only investigation before considering a build.
- Escalation: chat question drafted, **not sent**; local work checkpoint is needs-human,
  **not a live ticket state**. Phone blocked: no consent/contact/cap above $0. Deadline unbound.
- Next action: owner records the local bindings/mandate; no builder may start before that.
- Receipts: source is local fixture; no product workspace, builder session, branch, PR,
  software checks, real ticket, delivery or owner approval exists for this synthetic work.
- Actions taken: read supplied inputs and reasoned about them; outward actions/calls/builds: 0.

## Result: same incident replay

Trusted second invocation: same fixture and profile, `mode=test`; supplied test ledger is
now `{TEST-WORK-001: <key above>}`, daily count 1. Applying triage steps 3–4 finds that key.

**SIMULATED TEST / duplicate**: append a repeated-delivery note to `TEST-WORK-001`;
keep needs-human; daily reservations remain 1/5, no second work item or builder. The fixture's
`renotify=false` does not defeat identity dedupe. This paragraph is the simulated append.
No extra chat/call/PR is attempted. This is a sequential prompt test, not proof of durable
concurrency control, webhook replay protection or crash recovery.

## Acceptance observations and limits

First intake asks for owner authority; replay reuses the same work record. Both preserve $0
additional provider actions and refuse build/deploy authority from a payload. Prompt inspection
also requires malformed identities, unmatched close, exhausted cap and uncertain dispatch to
park; those branches were **not executed** in this test. Live receipts remain required for
push, native pull ticks, serialized durable dedupe/caps, a builder PR and each escalation rung.
