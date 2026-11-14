# Intent and spec changes

## Authority and persistence

| Material              | Purpose and lifetime                                                                                                           |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Project profile       | Enduring process, authority, checks and context links. Reuse the project's existing home.                                      |
| Feature spec          | One stable path for current agreed intent, stakes, acceptance and consequential decisions. Version it in Git.                  |
| Interview/review HTML | A view used to explore or explain. Regenerate it; preserve a snapshot only when a decision or evidence relies on that version. |
| Work record / PR      | Assignment, stage, human answers, decision history and verification evidence.                                                  |

Do not create `spec-v2`, `spec-final` or a parallel HTML authority. Keep the current spec readable;
Git and the linked work record preserve previous states. Durable product docs describe the
current system, not the history of an agent session. Update their existing pages when behavior
or maintenance knowledge changes; do not archive every generated report there.

Use acceptance identifiers when assignments or checks need particular requirements. An assignment
names the spec path and agreed revision, relevant criteria, authority and next checkpoint.
Record what the giver actually confirmed, with its source. A committed proposal, unsent form,
screenshot or model interpretation is not a new agreement.

## When new input arrives

`factory-plan` owns reconciliation throughout work, including build and verification.

1. **Classify.** Explanation question, repair under existing criteria, proposed intent change,
   or process-policy change? Logs and agent reports supply evidence, not authority.
2. **Find scope and conflicts.** Identify the giver, affected criteria and earlier decisions.
   An explicit work-item exception stays there. Ask when scope, authority or conflicting intent
   is unresolved; recency alone does not supersede an earlier requirement or another owner's rule.
3. **Hold affected work.** Notify its owner and stop dependent actions at the next safe boundary;
   cancel active execution when the mandate permits and an immediate stop is necessary. Continue
   independent work. If the affected boundary cannot be isolated, hold that assignment.
4. **Show a small delta.** Present old → proposed behavior, scope, affected work/evidence and the
   one unresolved decision. State what remains unchanged; do not ask for a whole-project review.
   If the instruction already settles these points, record it without asking again.
5. **Reconcile.** Resolve material contradictions with the appropriate owner. Revise the same spec
   for the agreed change; retain the answer, source and superseded decision link in the work record.
6. **Propagate before resuming.** Publish the agreed revision, update affected assignments and
   criteria, invalidate affected checks/reviews, and regenerate relevant explanation views. Reuse
   unaffected evidence. Resume after the writer has the revised assignment and source.

A compact decision receipt is sufficient:

> Changed: [old → new]. Scope: [work item / project policy / factory core].
> Source: [giver's actual answer]. Affects: [criteria, assignments, checks, explanation].
> Spec: [path + agreed revision]. Unchanged: [relevant boundary]. Open: [decision, if any].

Review proposed changes in the work record or a patch; do not replace agreed criteria with an
unconfirmed interpretation. A worker reading an older revision must reconcile its criteria
before dependent writes or handoff. Formatting-only changes do not invalidate checks. Inspect
uncertain dependencies rather than inventing an exact impact list.

## Verification and understanding feed back into intent

- A defect against clear criteria returns to build and relevant checks. No new human decision
  is needed merely to repair what the factory already promised.
- Missing or contradictory criteria return to alignment. Ask about the smallest unresolved behavior.
- A failed tool, unavailable environment or flaky check is missing evidence, not a product result.
- A review question first needs an explanation. A discovered mismatch uses this same protocol;
  it does not silently become an implementation instruction.

Before consequential handoff, compare work/evidence to current agreed criteria. Prompts guide
behavior; they do not supply atomic cross-workspace enforcement. Use actual harness permissions
and controls, and rehearse changes, failures and resumed sessions before claiming automation.

## Optional context retrieval

[HydraDB](https://docs.hydradb.com/get-started/v2/introduction) stores documents and memories and
builds a context graph. It is a candidate derived index for finding earlier decisions and related
requirements across sources, not another authority for the agreed spec.

If adopted, retain project scope, canonical source/revision and decision provenance. A proposed
mapping is source → decision → criterion → assignment → check → explanation. Superseded decisions
must not reappear as current; validate retrieved context against the current source. Inferred
relations cannot grant authority or settle a contradiction. Keep the index rebuildable from
canonical records. This mapping is a design proposal; no hosted integration is required or
configured by these instructions.
