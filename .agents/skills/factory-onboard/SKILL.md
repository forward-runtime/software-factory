---
name: factory-onboard
description: Bring Software Factory into a repository, interview its people about their project and process, and tailor the local skills, prompts and checkpoints.
---

Software Factory is a reusable product. Its core contains no customer domain, product feature,
repository identity or team-specific workflow. Learn those after entering the target repository.
Project knowledge stays in that project's context; do not copy it back into the factory core.

Read the target repository's instructions first. Inventory its existing docs, architecture,
check commands, work tracking and review process with bounded read-only inspection. Preserve
local rules. Distinguish observed facts, the giver's statements and your proposed interpretation.
Do not transplant this factory repository's development policies into the target project.
Its own instructions and agreed profile determine tools, CI, merge and release rules.

Use [project enablement](../../../docs/ENABLEMENT.md) for repository instructions, Conductor,
Linear and staged CI/CD integration. Preserve working automation and map existing conventions;
installation alone does not authorize external setup or releases.

Lead a short interview. Reuse known answers; ask one to three consequential questions per round:

- What outcome does this project serve, and what does successful delivery mean to its people?
- How does work arrive, who decides, who accepts the result, and what should the factory own?
- Which decisions must return to the giver? What happens when evidence or intent is unclear?
- What is disposable, what do people depend on, and what depth of checks and explanation follows?
- Which existing tools, checks and human checkpoints must the factory work through?

Learn the decision surface separately from notification channels and their allowed content.
A notification-only channel links back to the current question/artifact; it does not host the
interview or establish agreement. Preserve the team’s actual choice of discussion surface.

For work tracking, learn the platform, exact destination and available access method: MCP/API,
CLI or computer use. Verify needed read/create/update/link actions in the actual worker
environment; another session's connection is not proof of access here.

Learn how roles, Conductor sections and delivery states relate; runtime state is separate.
For a new organization, propose the minimal setup; for an existing team, map its meanings and
preserve its workflow. Use [native execution](../../../docs/NATIVE-EXECUTION.md#sections-roles-and-delivery-status)
for setup, transition ownership and closure; verify actual setup before declaring readiness.

Use concrete examples to resolve ambiguities rather than presenting a generic questionnaire.
Explain what each answer changes. Recommend a process and invite correction. Getting aligned
is the receiving factory's responsibility; the giver confirms or corrects its interpretation.

Produce one desktop HTML onboarding agreement, using Lavish when available. Show what was
learned, the proposed operating process, decision rights, rigor, evidence and unresolved choices.
Include a preview of the resulting project profile and the files/components selected for installation.
Bind actual feedback to the artifact version; an unsent choice or an opened page is not agreement.

After agreement, materialize the selected process in the target repository:

- Reuse its existing process document, or create one concise `docs/FACTORY-PROFILE.md`.
- Reference the selected portable roles, skills and prompts at a pinned factory version.
- Add project-specific instructions only when the interview or repository supplies a reason.
- Keep the selected skills' supporting guidance and references resolvable in the installed layout.
- Connect existing instruction entry points without overwriting them. Verify skill discovery in
  the actual harness; use explicit paths when needed.

Use [the profile outline](references/process-profile.md) as a prompt, not a schema requiring
empty fields. Keep one authoritative process profile; do not build a new configuration service.
Respect the agreed authority for repository changes, connections, spending and releases.

Finish with the learned profile, a reviewable installation diff, remaining decisions and the
first agreed checkpoint. Product tasks then use `factory-plan`; onboarding does not silently
authorize product implementation. Revisit the local profile when the team changes its process.

If the project selects the separately installed signals kit, invoke `.factory/signals/onboard.md`
after the core interview. Keep one authoritative process profile; link signal configuration to it,
reuse its decisions and leave unconnected paths blocked. Core onboarding needs no live signals.
