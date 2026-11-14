# Project enablement guide

This guide is portable. Local project rules and the owner's mandate determine which changes are authorized. Installation supplies skills; onboarding learns and adapts the process. Keep one authoritative local profile and the existing work-record home. No particular tracking service is mandatory.

## Repository and instruction entry points

Read AGENTS.md, CLAUDE.md, contribution guidance, architecture docs, current CI and local skills before proposing changes. Preserve their bytes and meaning. The installer appends a bounded factory block to both instruction entry points, vendors canonical files under `.software-factory/`, and creates native discovery wrappers under `.agents/skills/` and `.claude/skills/`. Existing compatible shared skill-directory symlinks stay shared; conflicts stop before writes.

After actual agreement, use the existing process document or `docs/FACTORY-PROFILE.md` for purpose, authority, stakes, checks, work progression, tool bindings and selected components at the installed revision. A blank repository can finish installation and first entry without an invented product. In an existing repository, show proposed process changes and their impact before reworking conventions.

## Conductor setup

Use the installed native-execution guidance. In a cloud workspace, verify organization/repository access, agent connection, environment setup and actual workspace/session identities. On a local Mac, the user controls local workspace creation. Read existing repository settings before suggesting changes; cloud organization setup belongs to the authorized administrator. Do not write imaginary repository settings files.

Map manager, builder, reviewer and observer responsibilities to existing sections. A minimal proposal for a new team is Managing, Building and Needs owner; create only agreed sections and verify membership. Sections group workspaces; ticket states describe delivery; working/idle describes execution. Do not equate these or rename a team's existing states. Record transition owner, waiting/resumption rule and evidence needed for closure. Launch only distinct, authorized work.

See [native execution](NATIVE-EXECUTION.md). Setup/section creation and connection verification are separate from copying instructions.

## Linear enablement

Linear has no factory-enabled switch. Bind the actual workspace, team and project IDs/URLs and access route in the target profile. Inspect the team's issue states and the project's statuses separately; they are distinct concepts. Preserve existing workflows. Verify required read/create/update/link operations in the actual worker environment, only within the permitted destination. If writes are not yet authorized, record them as unverified; do not create test issues elsewhere.

Propose an issue template containing outcome/source, current spec and revision, acceptance/evidence, responsible owner, authority, dependencies, workspace/branch/PR, next checkpoint and unresolved decisions. Reuse existing fields or description sections. Avoid new custom fields and workflow proliferation merely to host the factory.

Map intake, building, verification, waiting, awaiting acceptance and done to available issue states plus checkpoint notes. Merged, released and accepted remain separate facts even when a team uses one Done state. Specify who updates issues, resumes waiting work and closes them. Prefer existing GitHub linking/automation where already installed; verify behavior rather than assuming that linking a PR updates status. Missing bindings leave drafts in the existing work record/PR and do not block independent preparation.

Sources: [Linear concepts](https://linear.app/docs/conceptual-model), [project status](https://linear.app/docs/project-status), [issues](https://linear.app/docs/creating-issues).

## CI/CD and DevOps integration

Inventory current triggers, check commands, runner/runtime requirements, costs, secrets, protections, artifact retention, environments and release/rollback owners. Preserve successful automation. Never copy the factory core repository's skip-CI policy into a target project.

The first useful integration is evidence: attach exact revision, command, outcome, failed-check reproduction and artifact link to the work record. Next, propose targeted lint/type/build/test checks using the project's own commands. An agent explanation or understanding checkpoint complements these checks; it cannot establish that software passes them.

Where the team wants automated delivery, propose separate check, package and release jobs; promote the same immutable artifact with environment-specific configuration. Record deployment identity, smoke/health checks, rollback route and owner. Consider least-privilege job permissions, short-lived identity where supported, concurrency controls, environment protection and deployment branch restrictions. Check the host's plan and repository visibility: GitHub environment protections have availability limits. A workflow file alone does not prove a protection rule is active.

A first pilot should exercise one harmless failure and its repair, then an authorized non-production release/rollback only when a target and resources are supplied. Until then, prepare a reviewable pipeline proposal, not fabricated deployment proof. Do not enable workflows or create environments as a side effect of installing skills. Existing CI can supply check evidence; existing release tooling should keep ownership of deployment.

Sources: [GitHub deployment control](https://docs.github.com/en/actions/how-tos/deploy/configure-and-manage-deployments/control-deployments), [environment availability and setup](https://docs.github.com/en/actions/how-tos/deploy/configure-and-manage-deployments/manage-environments).

## Beyond software

Keep intent, accountable ownership, bounded execution, evidence, understanding and acceptance. Adapt the local work unit and verification surface: a campaign asset needs source/claim/rights checks and publishing authority; a deal brief needs provenance, mandate and an explicit human outreach/negotiation owner. A draft is neither publication nor a qualified deal.

Use a target-specific profile rather than expanding the core into a generic business platform. Do not require code/PR/deployment stages for non-code work when the team's own record supports the evidence. Keep software defaults strongest; domain-specific review and actual business outcomes need local expertise and real evidence.
