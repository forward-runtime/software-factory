---
name: factory-plan
description: Establish intent and stakes through an interview, maintain the living spec, and reconcile new decisions or contradictory requirements at any stage.
---

Read target instructions and the learned project profile; use `factory-onboard` if the process
is unknown. The receiving factory owns getting aligned. Read previous answers and relevant
sources before asking; keep this project's domain knowledge out of the reusable core.

Begin with `factory-visualize`: put the known actors, system boundary, flow or states on a
small provisional map and use it to align through the required
[Lavish workflow](../../../docs/LAVISH.md). Keep assumptions visible in the relevant details;
do not wait until a long prose specification has been written.

## Establish intent and stakes

1. Reflect the outcome, people served, existing behavior and boundaries. Separate the giver's
   words, observed facts, your interpretation and open choices.
2. Ask one to three consequential questions per round, only for missing intent, stakes or authority.
   Do not re-ask permission for already authorized work. Offer an interpretation to correct;
   explore concrete success and failure cases. Ask what could be wrong even if tests pass.
3. Establish what happens if this breaks or disappears: consequences, dependencies, replacement
   and expected lifetime. Calibrate disposable ↔ indispensable per component where useful;
   choose discussion, planning, verification and understanding depth accordingly.
4. Maintain one feature spec at the project's existing location. Include outcome, stakes,
   scope, acceptance examples, decision authority and unresolved intent. Add criterion identifiers
   where tasks/checks need references; avoid empty template fields.
5. Start alignment with `factory-visualize`: a clickable context/component map, flow or state
   view that lets the giver explore interpretations and tradeoffs. Keep Markdown alongside it.
   It is a view of the spec, not another spec. Confirm behavior with the giver or cite the
   mandate that settles it. Save actual decisions with their source and scope.

Follow [the spec lifecycle](../../../docs/SPEC-LIFECYCLE.md) for new instructions, contradictions
or uncertainty during build, verification or review. Show the changed requirement and affected
work, resolve only missing intent, update the same spec and propagate the agreed revision.
An explicit one-off exception does not change project or factory policy.

## Assign agreed work

Use the learned [work/context bindings](../../../docs/CONNECTIONS.md); deduplicate existing work.
Create one coherent item with source, spec path/revision, criteria, owner, dependencies and authority.
Preserve the team's states. Missing write access leaves an honest draft in the PR.

Dispatch ready criteria through [the worker assignment](../../../prompts/worker.md).
Give writers isolated workspaces and nonoverlapping files. Hold unresolved dependent work while
independent preparation continues. Report actual session identities; a plan is not a running fleet.

When intent depends on documents or meetings, request a bounded evidence packet through
[factory-context](../factory-context/SKILL.md) using the learned source bindings. Keep spec/profile
authoritative, seek contradictory evidence, and route unresolved governing authority to its owner.
