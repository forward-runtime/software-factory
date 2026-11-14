---
name: factory-verify
description: Verify a change against agreed criteria, run focused checks and independent review, and route defects or intent gaps to the appropriate step.
---

Read target checks/profile, current agreed spec and actual diff. Establish which claim each
criterion needs proved. A simulation can prove its interaction, not production behavior.
Existing features or unrelated passing tests are not evidence for a new claim.

- Choose the smallest useful checks for changed behavior and important failures. Reuse fast
  project checks; add tests where a new contract or regression needs protection. Avoid tests
  that merely repeat implementation wording or assert no meaningful behavior.
- For UI, exercise agreed behavior and applicable platforms, including failure states. Record
  actual screenshots/video when useful. Factory review artifacts themselves are desktop-only.
- Independent read-only agent review is required, not optional, through
  [the review prompt](../../../prompts/reviewer.md). Reviewing your own work does not satisfy it:
  the reviewer must be a separate session that did not write the change and does not share your
  reasoning about it. Fix material findings; record unperformed checks and limitations without
  calling them passes.
  If no independent reviewer can be obtained, say so plainly and report the change as checked but
  not independently reviewed. That is an honest, useful state. Self-review reported as review is
  not.

Classify failures: clear implementation defect → repair through `factory-deliver`;
missing/conflicting intent → `factory-plan`; broken environment/tool or inconclusive check →
restore evidence collection or state the limitation. Do not ask a person to redefine already
clear intent because code failed, and do not invent an acceptance threshold.

Apply [the spec lifecycle](../../../docs/SPEC-LIFECYCLE.md) when criteria change. Re-check affected
behavior and mark old affected evidence historical; retain unaffected evidence. Report spec/criteria,
code revision, checks actually run, pass/fail results and limits in the work record/PR.
Verification does not establish human understanding, acceptance or release.
