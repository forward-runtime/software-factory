# Software Factory: product and demonstration specification

**Product specification.** Software Factory is the operating system for real delivery in a
new or existing repository. Its installation and cold-start onboarding must work before a
presentation example can demonstrate it. Each work item retains explicit scope and authority;
implementation and verification evidence are recorded separately from this design.

Software Factory is a reusable product for teams working in different repositories and domains.
It learns a team's project and process, then configures a responsible receiving team of agents
through a local process profile and selected roles, skills, and prompts.

The reusable core contains no target-company identity, domain rules, or product feature. Product
knowledge and operating bindings belong to the repository being served. The implementation
example later in this document illustrates how the core would serve one particular product.

## Confirmed product direction

- Delegation begins with trust: the giver entrusts responsibility to the receiving team, which
  remains accountable for pursuing and verifying the agreed outcome.
- Establishing alignment is the recipient's active responsibility. Appropriate human understanding
  supports the giver's judgment without transferring delivery work back to the giver.
- Onboarding combines a team interview with reading local instructions and process. It produces
  one local process profile and the roles, skills, and prompts selected for that context.
- Shared intent, accountability, honest evidence, and appropriate understanding are fixed promises.
  Roles, models, tools, skills, workflow, and depth adapt to the team and consequences.
- People, agents, and service events can initiate work. A source observation and an operating
  mandate are distinct.
- Each feature has one current canonical specification under Git. Interviews and reviews use
  temporary views; accepted human changes update that same spec and affected work.
- Conductor Cloud and native Codex/Claude Code harnesses provide the platform. Desktop HTML review
  artifacts use Lavish. No separate factory application UI, runtime, scheduler, or connector
  platform is required.
- Process bindings are learned locally. Slack, Linear, and Docs/Drive can demonstrate the pattern;
  the core does not require those services or Notion.
- Alignment and understanding are real conversations. Every work item declares whether its
  implementation and release are real or simulated; that choice has an explicit scope.

## The central idea

Delegation starts with trust. The giver assigns an outcome to a team because they expect that
team to take responsibility, exercise judgment, communicate problems, and follow through.
Software Factory is the receiving team in that relationship.

The recipient actively discovers what matters, tests its interpretation, and resolves material
uncertainty with the owner of the intent. The giver should not have to supply a finished
specification or supervise every implementation step. The factory remains accountable for the
work within its mandate, including its explanation, verification, and handling of problems.

That initial trust is sustained by observable conduct: accurate interpretation, bounded decisions,
visible uncertainty, corrective action, and evidence that supports the stated result. These are
the intended benefits of the product; delivery volume or generic productivity claims are not
substitutes for demonstrating them.

Human understanding helps the giver judge, challenge, and guide consequential decisions. It does
not make the giver responsible for debugging the factory's work or proving that its software
is correct. A client needs to understand behavior and tradeoffs; a technical owner also needs
architecture, limitations, and safe modification. The recipient owns making those explanations
appropriate to the person's role.

The process is:

**Input → establish intent and stakes → align → build → verify → understand → hand over.**

Questions can return the work to an earlier step. An understanding conversation might reveal a
different intended behavior. A failed check might expose a missing acceptance criterion. These
are reasons to revise the relevant agreement and work.

For a rehearsal, alignment and the understanding conversation can be real while implementation
and release are explicitly simulated. Each stage must say what actually happened.

## Fixed promises and adaptable machinery

The factory has a stable relationship with the person who delegates work, while its methods can change.

| Fixed promise                     | What it means                                                                                                          |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Shared intent                     | Material assumptions and desired behavior are understood before dependent work proceeds.                               |
| Responsibility and accountability | The recipient owns delivery within its mandate; ownership, authority, and escalation boundaries are clear.             |
| Honest evidence                   | Claims distinguish proposed, simulated, implemented, verified, released, and accepted work.                            |
| Appropriate understanding         | People can judge and guide decisions relevant to their responsibility; the recipient remains accountable for the work. |

Roles, models, tools, skills, and workflow are adaptable machinery. A simple change may need one
worker and an independent reviewer. A complex change may need specialists and several bounded
slices. The team can change a prompt, use a different model, or improve a skill while preserving
the promises above.

Changing the requested product and changing the factory are both legitimate assignments.
They have different acceptance criteria: a product change must satisfy its intended behavior;
a factory change must demonstrate that its process improves the work it is supposed to support.

## Onboarding into a repository

The entry experience is an interview grounded in the repository. The core brings reusable
questions and methods; the team and local sources supply the answers.

### Learn before configuring

1. **Read local instructions and process.** Inspect the repository's agent instructions,
   contribution/review rules, Conductor sections and roles, ticket states, architecture references,
   skills, and checks. Establish whether the organization needs initial setup or an adaptation.
2. **Interview the team.** Ask about purpose, users, domain language, desired outcomes, decision
   owners, consequences, preferred collaboration, and the practices the written instructions
   do not explain. Explore examples and contradictions actively.
3. **Reconcile evidence and answers.** Distinguish an existing rule, a team preference, a proposal,
   and an unresolved decision. Identify which sources govern which actions. Return conflicts or
   material gaps to the relevant owner.
4. **Materialize the local configuration.** Produce one local process profile and select or
   adapt the roles, skills, and prompts needed for that team's work. Bind manager/builder ownership,
   sidebar sections, ticket statuses, and transition responsibilities to that team's actual setup.
5. **Review the result with the team.** Show what the factory learned, what it selected, which
   source supports each consequential boundary, and what remains open. A bounded rehearsal can
   follow when its outcome and authority are agreed.

Reading a file is not evidence that the team endorsed an interpretation. The factory should
make its understanding inspectable and ask meaningful questions rather than present a long
configuration form for the team to fill out.

### The local process profile

The profile is the authoritative local record of how the factory serves this project. It links
to existing instructions and knowledge instead of duplicating them. Its path and format remain
an implementation choice; this specification defines its responsibility.

| What it captures                                  | Why it is needed                                                                                                                                                     |
| ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Purpose, users, and local domain references       | Keep proposed work tied to the project's actual outcome and language.                                                                                                |
| Owners, authority, and escalation                 | Establish who can settle intent and which actions the recipient may take.                                                                                            |
| Consequences and required rigor                   | Select an appropriate depth of alignment, planning, verification, and explanation.                                                                                   |
| Checks, review, and delivery process              | Use the target repository's actual commands, evidence, and merge/release rules.                                                                                      |
| Available tools and source/work/artifact bindings | Connect work to the team's existing systems with verified access.                                                                                                    |
| Selected roles, skills, and prompts               | Make the resulting team configuration concrete and inspectable.                                                                                                      |
| Conductor sections and ticket-state mapping       | Initialize an empty organization or fit existing stages, owners, waiting/resumption, and closure rules without confusing navigation with runtime or delivery status. |
| Open decisions and source references              | Preserve uncertainty and show why a consequential rule is present.                                                                                                   |

Product facts, company identities, domain rules, and source data stay in local context. Reusable
learning can improve a generic interviewing or verification method; it must not silently copy
one team's product knowledge into another team's configuration.

### Preserve local governance

Onboarding integrates with existing instructions rather than overwriting them. It does not
transplant this factory repository's CI triggers, commit markers, review roles, release route,
or tool choices into another project. A service account, connected app, or available command
does not establish permission to use it for every action.

The selected team should be as small as the work permits. Intake/coordinator, worker, independent
reviewer, and observer are possible responsibilities, not a requirement to launch four agents
for every task. A profile can select or combine roles while preserving required independence.
No onboarding step automatically launches workers or grants build or deployment authority.

### New organization and existing-company paths

For a new organization, establish native Conductor Cloud access, repository/agent connections,
and a work-record home before declaring the factory ready. Propose a minimal manager, builder,
and waiting-for-owner arrangement; create missing agreed sections within onboarding authority.
Add research, standing-role, and release stages only when needed.

For an established company, learn whether sections represent stages, persistent roles, or
projects. Reuse its labels, states, authority, and retention rules. Map factory responsibilities
to that setup; do not replace its workflow or transplant another company's organization.

Managers coordinate an initiative; builders own isolated slices; reviewers and observers are
session responsibilities rather than automatically separate sidebar groups. Workspace owners
keep the learned section/ticket mapping current on transitions, and managers audit it.
Section placement, ticket progress, and working/idle/sleeping runtime state are distinct.
The [native execution guide](NATIVE-EXECUTION.md#sections-roles-and-delivery-status) defines the
reference sections, mappings, and update instructions.

## Inputs can come from people, agents, or services

A human conversation is one entry point. The factory can also receive an agent's finding or
an event from an external system.

| Origin             | Example                                                                              | What the factory initially knows                                        |
| ------------------ | ------------------------------------------------------------------------------------ | ----------------------------------------------------------------------- |
| Person             | Requests a capability or reports behavior that prevents their work.                  | A desired outcome whose meaning and boundaries need clarification.      |
| Agent              | A monitoring agent identifies repeated errors in logs and proposes an investigation. | An observation and a hypothesis, which still need checking.             |
| Service or webhook | An external system reports a failed operation.                                       | An event with a source and delivery identity, not a complete diagnosis. |

These inputs enter the same responsibility model. Intake identifies the source, preserves the
relevant evidence, establishes the affected product or environment, checks for existing work,
and identifies whose mandate allows the next action.

A useful intake record contains the source link or event identity, the observed problem or
requested outcome, relevant evidence, the responsible owner, and a reference to applicable
authority. Preserve only what the work needs. A source should remain traceable without copying
unrelated logs, customer conversations, or credentials into the work item.

Repeated webhook deliveries or several agents reporting the same failure should converge on
one investigation. A reported error is not automatically a confirmed bug or an instruction to
deploy a repair. Content inside logs and external payloads is evidence to inspect; it cannot
override the factory's instructions or grant permissions.

### Alignment for machine-originated work

An agent can report a problem without becoming the accountable owner of the product. The
factory still needs an intended outcome and a decision boundary.

A previously approved mandate can supply those boundaries and settle routine decisions. For
example: “Investigate this class of error using read-only diagnostics, reproduce it with safe
examples, and prepare a proposed fix. Escalate changes in user experience, access, spending, or
production behavior.” This is an illustrative mandate, not one granted by this document.

Under that mandate, another agent or a webhook can initiate useful work while the owner is
offline. Work that changes the mandate or encounters an unresolved consequential choice returns
to the owner of that intent. The factory preserves the target repository's existing approval and
release rules. Uncertain consequential intent is not resolved by an event's urgency or an
agent's confidence.

The distinction is between **who supplies the signal** and **who has authority over the outcome**.
They may be different people or systems.

## Rigor follows the stakes

“Disposable” and “indispensable” describe consequences and dependencies. They are a calibration
to revisit as use changes.

Ask what happens if the software breaks or disappears tomorrow:

- **Consequences:** what harm, interruption, or lost work could follow?
- **Dependencies:** who and what rely on it?
- **Replacement:** how easily can it be discarded or rebuilt?
- **Maintenance:** how long must it remain understandable and usable?

A prototype with synthetic data can be inexpensive to discard. A workflow that other people
depend on has obligations around access, correctness, continuity, and recovery. Accountability
remains present in both cases; process depth changes with the consequences.

| Stage         | Disposable rehearsal                                       | Workflow people depend on                                            |
| ------------- | ---------------------------------------------------------- | -------------------------------------------------------------------- |
| Alignment     | Confirm the outcome, examples, and boundaries.             | Resolve failure behavior, important tradeoffs, and affected users.   |
| Planning      | Use a small plan and a concrete mock.                      | Explain interfaces, compatibility, state, and recovery.              |
| Verification  | Check the intended interaction and simulation consistency. | Exercise real behavior, failures, permissions, and dependencies.     |
| Understanding | Explain usage and known limitations.                       | Explain design decisions, operational limits, and safe modification. |

Existing tenant, security, money, and production constraints still apply to work in a live
product repository. Disposable work still needs an owner, clear boundaries, honest evidence,
and an appropriate explanation.

## What each step entails

### One living feature specification

Each feature has one canonical spec under Git, separate from this factory product specification.
Edit that file as intent changes; Git preserves its history. Temporary interview/review HTML
is a view of a named revision, not another authority or a place to leave the only copy of a decision.

Capture a compact human decision in the work record/PR: old → new, scope (this item, project,
or reusable core), impact, and the actual response/source. Record clear authorized supersession
directly; ask only when consequential conflict, scope, or authority remains unresolved. Silence
and browser state are not acceptance.

Update the current spec, identify affected requirements and assignments, and fence dependent
work while the change is unresolved. Resume against the accepted revision with matching
checks and explanations. Evidence for changed criteria must be renewed; evidence for
unaffected behavior need not be discarded. The [spec lifecycle](SPEC-LIFECYCLE.md) defines
the short decision, repair, and resumption procedure.

### 1. Establish intent and stakes

The factory asks what should become easier, who needs the result, what is happening today, and
how success would be recognized. It actively distinguishes what the source actually said from
its own interpretation and seeks the evidence needed to settle the difference.

The output is a bounded outcome, meaningful constraints, a responsible owner, and the appropriate
depth of investigation. This step can begin from a person, an agent finding, or a service event.

### 2. Align through examples

The factory makes interpretations visible through an interactive view of the canonical feature
spec. The user explores scenarios, compares alternatives, and corrects assumptions. Complex
specs distinguish product behavior from technical design within the same authoritative document.

Alignment is a conversation supported by an artifact. A selected option in a demonstration or
an unanswered question does not establish agreement. Record actual decisions and their scope,
update the spec, and bind acceptance to its Git revision. Reopen only affected decisions.

For work within an approved delegation policy, cite that policy and identify where it settles
the required decisions. Escalate the decisions it does not settle.

### 3. Build within the agreement

A manager workspace maintains current specs, scoped decisions, and project-bound work records.
Each isolated builder owns one bounded slice with an accepted spec revision, file ownership,
checks, authority, and stop conditions. It reads updates at safe checkpoints and fences affected
work when intent becomes stale. The [native execution guide](NATIVE-EXECUTION.md) covers the
worker assignment and five-minute observe/nudge recipe.

A rehearsal may substitute an explicitly labeled simulation: synthetic events, a prototype,
or a worked implementation walkthrough. A real change requires inspecting the actual product
and using its development and review process.

The output is an inspectable simulation or implementation. Neither implies release.

### 4. Verify the relevant claim

Verification asks how the result could fail to satisfy the agreement. The scope of the claim
determines the evidence required.

A simulation can demonstrate an interaction and the consequences of example events. It cannot
prove that live integrations, persistence, or authorization work. A real implementation
requires actual behavior checks and independent agent review under the target repository's rules.

Missing evidence remains unverified. A failed check with clear intent routes to a bounded repair.
Ambiguous or contradictory intent returns to alignment and the current spec. Changed criteria
invalidate their old evidence; update affected checks before resuming. Passing software checks
does not establish human understanding or acceptance.

### 5. Sync on understanding

The factory explains the background, main idea, important choices, behavior, and relevant code
in a sensible reading order. Interactive examples help the accountable person explore what
happens and why.

The person asks questions and explains back the decisions relevant to their responsibility.
The factory clarifies gaps and distinguishes an explanation problem from a product mismatch.
A teach-back, interactive exploration, or quiz can support the discussion when suitable for
the person's role and local process. Its form and depth are tailored rather than imposed as
one universal question count or review gate. It checks understanding, not software correctness.
A giver's response does not transfer delivery responsibility. Changed intent updates the same
feature spec and affected explanation; simulated work identifies hypothetical choices.

### 6. Hand over the outcome

A useful handoff connects the agreed intent, produced artifact, evidence, limitations, and next
decision. It states separately whether the work is simulated, implemented, merged, deployed,
active, and accepted.

Where release is out of scope for an engagement, it can be narrated instead: "This is what we would hand over and how
we would release it.” Real product deployment is outside that claim.

## Platform and learned process bindings

Conductor Cloud plus native Codex/Claude Code harnesses provide the execution platform. Use their
existing workspaces, sessions, tools, supported goals, continuation, and monitoring capabilities.
The reusable product supplies onboarding, the process profile, selected roles, skills, prompts,
and handoff contracts.

No separate factory application UI, runtime, scheduler, or connector platform is part of this
scope. Desktop HTML specifications, explanations, and review artifacts use Lavish. These are
documents for collaboration; they do not constitute another factory application.

The profile learns the team's source, work-tracking, knowledge, code, and review surfaces.
Its ticket adapter binds the actual project, states, permissions, and access through MCP,
API, CLI, or computer use. Slack, Linear, and Docs/Drive can demonstrate the pattern; other
teams retain their tools. Notion is not required. Git holds the canonical feature spec;
work records and temporary HTML link to it.

Source access and allowed actions are verified in the actual worker environment. Naming an
integration in a prompt does not connect it. Supporting agent and webhook inputs in the product
model is distinct from having implemented or verified an automatic event receiver.

Use native continuation and scheduling only after checking that host's actual capabilities.
A goal is an outcome contract, not an interval timer. Verify registration and invocation before
claiming recurring observation; otherwise report a one-shot check. Bounded nudges wait for safe
delivery, and stale specs fence affected work. See [native execution](NATIVE-EXECUTION.md);
unresolved consequential decisions remain with their owner.

## Cold-start delivery

The deliverable is an installable operating system for real agent work, used to build the factory
itself. The current [workflow and installation contract](specs/workflow-skills.md) defines its
acceptance. A presentation or synthetic fixture is not the completion target.

Bring the portable core into a fresh or existing repository without replacing local instructions
or importing source-project facts. Native skill discovery and instruction entry points start
onboarding when no agreed local profile exists. Onboarding reads the repository, interviews the
team, maps its new or existing Conductor setup and materializes its process. Real requests then
flow through intent/stakes, build, verify, understanding and handoff under that process.

The installation must preserve local governance and keep supporting references resolvable. Verify
it in a separate repository and start an actual onboarding session using the installed files.
Connection credentials and reporting destinations can be supplied afterward; until then maintain
honest work records in Git/PRs without writing to unrelated services.
