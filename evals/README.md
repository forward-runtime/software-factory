# Factory evaluations

100 versioned cases evaluate the factory process, not a model leaderboard: 24 executable offline
checks and 76 distinct scenario/rubric cases requiring real native agent outputs and independent
review. Shared rubric mechanics are intentional; each scenario has a different failure trigger.
A passing file-layout check does not establish native discovery or semantic instruction following.

## Run

Use Node.js with the repository's Git and Python environment. No dependencies or model API key
are needed for deterministic checks. Run from a clean committed checkout; generated output belongs
outside the checked source trees. Root `AGENTS.md` and `CLAUDE.md` must also be clean,
because native actors consume those instructions. Installer checks create and remove isolated temporary Git repos.

```bash
node evals/run.mjs list
node --test evals/run.test.mjs
node evals/run.mjs run --out .context/evals/report.json
node evals/run.mjs export --out .context/evals/packets
```

`--ids I01,ONBOARD-01` selects cases for either command. Exit code 1 means failed assertions or
invalid receipts; zero with `not_run` cases does not mean the full suite passed. Summaries separate
`pass`, `fail`, `blocked` and `not_run`. No report claims deployment, understanding, acceptance,
recurring monitoring or live integration.

## Real-agent cases

Each exported directory contains `actor.md` plus its HTML companion and a separate `reviewer.json`.
Packets name the canonical skill source path; resolve support links there, not against the
embedded copy or exported directory. Give only the actor document to the native subscription-backed actor; keep reviewer rubrics out of
its initial context. Use the exact exported source checkout and permit only local evaluation work.
No service actions, resources, provider spending, scheduled loops or external messages are allowed.
The packets are offline evaluation inputs, not new product instructions or approvals.

A different native reviewer session scores the actual response against the rubric, including
specific evidence for every criterion. Several cases may share one actor or reviewer session;
record that limitation rather than claim independent per-case model trials. Record harness,
model and effort in each actor/reviewer identity or extra metadata, plus the exact native invocation
recipe in the work record. Preserve actual
responses and review receipts; do not regenerate fictional answers to fill missing scores.

Copy reviewer metadata into `receipts/CASE-ID.json`, adding real `actor` and `reviewer` identities,
`artifact` path/hash and actual `checks`. The exported `receiptShape` illustrates required fields;
it is not a scored result. Artifact paths are relative to the receipt directory. Reviewer's
criterion statuses must be `pass`, `fail` or `blocked`; unperformed cases have no receipt.

```bash
node evals/run.mjs run --receipts .context/evals/receipts --out .context/evals/scored.json
```

Import requires exact case ID/hash, source revision, suite revision, distinct actor/reviewer
session IDs, all rubric criteria and SHA-256-matching local artifact bytes. Escaping artifact
paths, including symlinks, are refused. Receipt validation establishes consistency, not that a
reviewer's judgment is truthful. Human or independent audit remains necessary.

Reports bind the full checked-out source/suite revision and case manifest hash. A report from
an earlier commit remains historical evidence; check out that frozen candidate to import its
receipts. Do not relabel it a latest-HEAD pass. Re-run deterministic checks after integration;
rerun affected semantic cases when process changes. Preserve useful unaffected historical evidence.

## Component and criterion summaries

Each new report also contains stage/component counts and separate rubric observations. Installation
checks have case verdicts only; agent components derive from their case ID prefix. A mixed rubric
keeps each `pass`, `fail` and `blocked` observation instead of flattening all criteria to the final
case verdict. Missing agent receipts contribute one `not_run` per rubric criterion. An invalid
receipt may fail the case while its unobserved rubric criteria remain `not_run`.

Aggregate an existing report without running cases or changing its historical source identity:

```bash
node evals/run.mjs summarize --report .context/evals/scored.json --out .context/evals/components.json
```

This command retains source/suite revisions and binds the derived output to the input report hash.
It refuses mismatched case manifests, duplicate cases, inconsistent verdicts and totals. This is
an aggregation of recorded observations, not new execution or independent regrading. Cases omitted
by a selected run are outside its summary; they are not silently counted as completed or passed.

## Coverage and limits

Installer cases exercise preservation, exact repeats, symlinks, refusal before writes, payload
hashes, support links, product/history exclusion and committed blob identity. The existing
[installer regression suite](../tests/install.test.mjs) additionally exercises ignored private
files and Git worktree roots. Run it alongside this suite, not as 100 extra invented outcomes.

Agent cases cover onboarding governance, scoped intent changes, stale assignments, verification
routing, understanding and answer-key handling, native discovery/monitor receipts, signal profile
precedence, deduplication limits and escalation authority. They are rubric-scored response tests,
not proof that a platform action or human checkpoint occurred. Missing tools or observations must
remain explicit. The runner neither orchestrates agents nor supplies production scheduling.

Commit and push reviewed results selected for retention. `.context/`
is temporary and ignored. Sanitize secrets and unrelated data; preserve actual source pins and
response hashes. Code and case definitions alone do not preserve the results of a session.
