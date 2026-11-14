# Factory workflow skills

Software Factory is the operating process for real software delivery. Install it in a target
repository, learn that team's context and governance, then establish intent/stakes, build,
verify and explain the result. Use the factory itself to deliver and maintain this product.

## Acceptance

| Criterion  | Required behavior                                                                                                                                                                                                                 |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| INSTALL    | One local installation command brings the portable core into a fresh or existing Git repository, preserves local instructions and exposes skills to both harnesses. Conflicts stop before writes; repeating installation is safe. |
| ONBOARD    | First entry without a learned profile starts a repository-grounded interview, maps new or existing Conductor/work-tracking setup and materializes the agreed process before dependent product work.                               |
| INTENT     | Reuse known answers; interview consequential unknowns; keep agreed intent, stakes and authority in one living feature spec.                                                                                                       |
| CHANGE     | Reconcile new instructions with earlier decisions and scope; update affected work/evidence while preserving independent work.                                                                                                     |
| BUILD      | Use bounded builders in isolated native workspaces with agreed criteria/revisions, explicit authority and learned section/state mappings.                                                                                         |
| OBSERVE    | Provide native five-minute observation/nudging with actual registration/lifetime checks; report unavailable controls honestly.                                                                                                    |
| VERIFY     | Run meaningful checks and independent review; route clear defects to repair and intent gaps to alignment; missing evidence is not a pass.                                                                                         |
| UNDERSTAND | Produce concise interactive explanations; resolve questions and collect actual understanding evidence at the agreed checkpoint.                                                                                                   |
| PERSIST    | Maintain current specs and product knowledge; keep decision history/evidence in work records or PRs, with HTML as a derived view.                                                                                                 |

## Installation contract

Vendor the portable skills, role prompts and their supporting references under `.software-factory/`.
Link the six skills into native discovery directories and add a bounded managed instruction block
to the target's `AGENTS.md` and `CLAUDE.md`. The block routes through the factory contract and
starts onboarding when a profile is missing. Existing local rules and skills remain intact.
Use `node scripts/install.mjs /absolute/target-repo` from a pinned source checkout. Discovery
wrappers load the canonical installed skill so its supporting links resolve relative to that file.
A shared Claude/Codex skill directory remains shared. Preserve existing instruction bytes and
local CI/release policy; installation does not agree a project profile on the owner’s behalf.

Record the source revision; never copy source-project domain knowledge, development-only rules,
credentials, real connection IDs, interview history or example-product specs into the target.

Installation prepares instructions, not organization access or running agents. Onboarding verifies
actual tools/destinations and agrees authority. Native controls remain the execution platform;
a custom runtime requires a demonstrated unmet need. No additional provider/API spending or
production mutation follows from installing instructions.

## Validation

Verify installation in a separate Git repository, reference resolution, preserved local rules,
repeat behavior, conflict handling and native skill discovery. Start a real onboarding session
against the installed files and retain its actual decisions/remaining questions. Workflow fixtures
can protect specific behaviors; they do not replace a successful cold start or prove recurrence,
product correctness, a human understanding pass or release.

## References

- [Product specification](../FACTORY-DESIGN.md)
- [Spec changes and persistence](../SPEC-LIFECYCLE.md)
- [Native execution](../NATIVE-EXECUTION.md)
- [Interactive views](../HTML-ARTIFACTS.md)
