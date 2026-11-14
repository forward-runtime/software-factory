---
name: factory-deliver
description: Build an agreed slice in an isolated workspace, keep its spec context current, and hand the result to verification and understanding review.
---

Read target instructions, project profile and assignment. Confirm the actual repo, branch,
owned files, agreed spec revision/criteria, dependencies, authority, budget and stop conditions.
Fetch the named source if necessary; do not infer agreement from the newest working-tree file.

Use [native execution](../../../docs/NATIVE-EXECUTION.md). A manager coordinates decisions and
work; each builder owns a bounded slice in an isolated workspace. Use existing ticket/harness
capabilities, not another runtime. Use a goal only when explicitly requested and exposed.

Use the learned section/state mapping at transitions and verify authorized updates. A moved
workspace or idle session does not establish merge, deployment or acceptance.

Implement the smallest change satisfying the assigned criteria. Link the work record to source
and evidence. Before dependent writes or handoff, check for changed intent affecting the assignment.
New consequential input uses `factory-plan` and [the spec lifecycle](../../../docs/SPEC-LIFECYCLE.md):
hold affected work, preserve progress and continue independent work. Do not silently widen scope
or treat a one-off exception as policy.

Use `factory-verify` for evidence and independent review. Repair implementation defects against
clear criteria, rerunning relevant checks; unresolved intent returns to `factory-plan`.
Then use `factory-understand` to explain the actual result and resolve questions.

When the giver is unavailable, finish authorized independent work and prepare the human checkpoint.
Do not manufacture an answer, understanding pass, merge or release. Leave one compact receipt:
spec/criteria, change, evidence, remaining decision and exact next action.
