# Native execution

The local profile supplies authority, tools, checks, and delivery rules. This recipe uses
Conductor and the selected harness; it adds no daemon, scheduler, or connector service.
Changes follow the [spec lifecycle](SPEC-LIFECYCLE.md).

## Manager, builders, and work records

- A manager workspace owns the accepted specifications, assignments, dependencies, and decisions.
  Give each independent builder an isolated workspace/branch and disjoint file ownership.
  A read-only reviewer can inspect the builder's branch in a separate session.
  [Conductor workspace guidance](https://www.conductor.build/docs/concepts/parallel-agents).
- Onboarding binds the ticket adapter to the actual project: destination, available states,
  permissions, and access through MCP, API, CLI, or computer use. Use that team's process.
  Missing access leaves an explicit draft; a draft is not a posted ticket.
- Each assignment links the local profile, one canonical feature spec and its accepted Git
  revision, work record, owned paths, checks, implementation mode, authority, and stop conditions.
  Include the learned section/status mapping. Record actual workspace/session IDs after creation;
  never trust an inherited project default.

After launch authorization, the CLI can create an isolated builder:

```bash
conductor --json workspace create --project-id <project-id> \
  --name "<work-item>" --agent <agent> --message-file assignment.md
```

Use local model policy. Do not start a session merely because a prompt template exists.

## Durable loops

A loop that watches work must outlive the session that created it. Separate the two pieces, because
they fail for different reasons and are bound differently.

**The schedule** decides when something fires. **The runner** executes the agent.

A chat-session timer is neither durable nor portable: it lives in the session's memory, is written
to no file, and dies when that session ends — independently of any workspace lifetime. Treat it as a
prototype, never as the installed mechanism.

| Piece | Option | What it costs, what it binds |
|---|---|---|
| Schedule | CI cron (for example a scheduled GitHub Actions workflow) | Free on public repositories; the spec is committed and reviewable; portable to any repo |
| Schedule | Any external cron or uptime service | Portable; one more service to own |
| Runner | Conductor routine, triggered by its webhook | Runs on Conductor against existing subscription work; needs a **user API key** created in the Conductor dashboard — the workspace token is rejected for routine management |
| Runner | The agent invoked directly inside CI | Portable, but each run bills the model provider; check the owner's spending ceiling before proposing it |

Conductor routines are **webhook-triggered**: `--trigger` accepts `webhook` and the CLI describes a
routine as running "when its webhook URL is called". A routine is therefore a durable runner, not a
scheduler. Pairing a CI cron that POSTs to the webhook with a routine that executes the work keeps
the schedule portable and committed while the agent runs against existing subscription work rather
than per-call billing.

`routine create` and `routine rotate-secret` print the webhook URL once. **That URL is the
routine's credential**: anyone holding it can run the routine. Store it as a repository or
organisation secret, never in a committed file, a prompt or a message, and rotate it if exposed.

Commit the loop's definition — what it watches, how often, what it may write, and when it must stop
and ask — so the loop survives its runner. Keep its cursor or state in a tracked file or the work
record; state in an ignored directory dies with the machine. A loop whose memory is recoverable can
be restarted. A loop whose memory was in a sandbox cannot.

## Sections, roles, and delivery status

A manager, builder, reviewer, or observer is a **role**. A Conductor **section** groups workspaces
in the sidebar. A ticket's **status** records delivery progress. Working/idle session state and
ready/sleeping workspace state describe execution, not completion. Moving a section neither starts
a worker nor proves a merge, deployment, or acceptance.

### Start a new organization or adapt an existing one

- **No prior setup:** complete native [Conductor Cloud onboarding](https://www.conductor.build/docs/cloud/getting-started):
  organization, repository access, agent connection, and development setup. Choose a work-record
  home with the owner. Within the agreed onboarding authority, initialize only needed sections;
  Managing, Building, and Needs owner are a minimal starting vocabulary. Add the research,
  standing-role, and delivery groups below when their work exists. A section layout alone is
  not a configured cloud computer, connected ticket adapter, or permission to launch.
- **Existing setup:** read the team's process and inventory its actual sections, workspaces,
  ticket states, review/release owners, and completion rules. Map the meanings below to existing
  names and IDs. Some teams group by stage; others keep role/project groups stable and track
  stages in tickets. Preserve that convention. Fill a missing distinction with a checkpoint
  note or an agreed addition rather than renaming shared sections or ticket states.

Store the mapping once in the local profile: role → section, delivery milestone → ticket state,
transition owner, waiting/resumption rule, and closure rule. Include actual section bindings
for the acting account. CLI sections/moves affect the token owner's sidebar, not every teammate;
shared work records remain the coordination record. Generic factory files contain no local IDs.

### Reference vocabulary

These labels are a starting pattern; the profile supplies the team's actual labels and meaning.

| Responsibility or milestone                              | Suggested section                    | Meaning and transition owner                                                                                                |
| -------------------------------------------------------- | ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| Initiative manager                                       | Managing                             | Coordinates specs, assignments, and dependencies; does not move with every builder.                                         |
| Builder aligning, implementing, verifying, or explaining | Building                             | Owns the current slice; reviewer/observer sessions can share its workspace without creating new sections.                   |
| Waiting for an owner decision, access, or authority      | Needs owner                          | Ask one scoped question, link the decision delta, and hold affected work; return to the recorded prior stage when resolved. |
| Merged but not usable yet                                | Merged — not live yet                | A real merged change still awaits deployment or activation; move on merge evidence.                                         |
| Verified development deployment                          | On DEV                               | The authorized release owner verified the named target; a workspace preview alone does not establish this.                  |
| Production deployment                                    | On PROD                              | The authorized release owner verified production; activation and acceptance remain explicit separate facts.                 |
| Investigation without an implementation assignment       | Questions & research                 | Preserve the answer and evidence in the work record before closure.                                                         |
| Standing coordination or domain-specific groups          | Team / Agents, if the team uses them | Learn their local meaning and retention rules; do not put every builder in Agents because it is an AI agent.                |

The ticket adapter maps milestones to available local states. A reference board can use Triage,
Backlog, Todo, In Progress, Merged, In release, Awaiting acceptance, and Done/Canceled. These
are examples, not required custom states. Building may map to In Progress; Needs owner may retain
In Progress with an existing waiting flag. Keep queued work separate from started work, merged
work separate from released work, and release separate from acceptance. Do not impose a new
tracker workflow or assume every section has a one-to-one ticket status.

### Use the mapping during work

The workspace owner updates its mapped section and affected work records when the stage changes,
then verifies the writes. The manager audits discrepancies; the observer reports or repairs them
only within its authority. Preserve standing/project groups when the profile uses those instead
of stage groups. If one write fails, record the unsynchronized part rather than claim both succeeded.

Discover bindings before changing them; use explicit workspace IDs and follow pagination:

```bash
conductor --json section list --limit 100
conductor section create "Managing"
conductor workspace move <workspace-id> --section <section-id>
```

The create line applies only to a missing, agreed section. Read back membership after a move.
Workspace names can identify role/task under local conventions; never rename an existing branch
to reflect a stage. A clear failed check returns to Building/repair; uncertain intent uses the
mapped waiting state and [spec lifecycle](SPEC-LIFECYCLE.md). Simulated release does not justify
moving a hypothetical feature to On DEV or On PROD. Mark Done and archive only under the learned
acceptance and retention rules; sleep and archive are not delivery states.

## Choose continuation separately from timing

A [Codex goal](https://developers.openai.com/cookbook/examples/codex/using_goals_in_codex)
persists a thread's outcome and supports continuation at idle turn boundaries while active
and within budget. It supplies no five-minute clock or host uptime. Activate one only when
explicitly requested, with an outcome, evidence, constraints, and stop conditions. A workflow
hold does not authorize changing the harness's goal lifecycle state.

[OpenAI scheduled tasks](https://learn.chatgpt.com/docs/automations?surface=app) have their own
management surface; Codex CLI does not provide that interface.
[Agents API automations](https://developers.openai.com/api/docs/guides/agents-api/sessions/automations)
are a separate API product. Neither establishes a timer inside a Conductor Codex thread.
Conductor CLI routines are webhook-triggered; they do not supply a five-minute timer themselves.

Check the actual host's versions, exposed tools, permissions, and delivery path. No native
scheduler means one-shot observation or explicitly authorized goal continuation, with recurring
monitoring reported unavailable. Do not substitute shell sleep loops or API orchestration.

## Native five-minute observe/nudge recipe

1. **Bound the run.** Name managed items, accepted spec revisions, permitted reads/writes,
   escalation owner, deadline, and usage/spend limits. Inspect existing jobs to avoid duplicates.
2. **Select a verified scheduler.** In a Claude Code manager/observer session with scheduling
   available, supply the monitoring prompt below with an explicit interval:

   ```text
   /loop 5m Observe <managed-run> using the monitoring prompt in docs/NATIVE-EXECUTION.md.
   ```

   Include the bounded run context. A bare /loop can select maintenance work outside this remit.
   If using another harness, verify its own scheduling capability before adapting the recipe.

3. **Confirm registration.** Inspect the real creation receipt and scheduled-task listing:
   job ID, exact prompt, target session/project, cadence, timezone, next run, lifetime, and
   cancellation route. Listing a job proves registration, not a successful observation or nudge.
   Verify a permitted invocation separately before claiming monitoring works.
4. **Observe deltas.** Read named work records, status, and only new session messages; retain
   cursors and follow pagination. For Conductor, use session status and session message with
   --after <last-message-id>. Check the profile's role/section/ticket mapping against the actual
   stage. Avoid rereading whole transcripts or rerunning unchanged checks.
5. **Nudge at safe boundaries.** Put one actionable next step on the work record for the builder's
   next checkpoint. Direct messages require a verified non-interrupting queue; an idle-status
   read followed by a send is not an atomic delivery guarantee. Keep one outstanding nudge per
   item; do not repeat unchanged advice. After two unchanged idle observations following it,
   raise one blocker rather than retry indefinitely. Long-running work is not an idle stall.
6. **Fence and stop.** Mark affected assignments and pending nudges held on a material spec change.
   Stop dependent actions at the next safe boundary; use authorized native cancellation when an
   immediate stop is necessary and confirm it. Continue independent work. Resume affected work
   only after assignments, checks, and explanations reference the accepted revision. End monitoring
   on completion, deadline, limit, or withdrawn authority; confirm cancellation.

Ordinary nudges wait for safe boundaries. An authorized stop for stale intent or active harm
can require immediate interruption; it is not a routine progress message. Prompts alone do not
enforce an atomic hold across workspaces; inspect native control receipts and builder state.

### Worker assignment example

This is a real bounded assignment. The project profile supplies its actual checks and authority.

```text
Work item: <project-bound record>. Manager: <workspace/session>.
Spec: docs/features/example.md @ <accepted revision>. Profile: <local profile>.
Role/section/status: <profile mapping>; update mapped stage on transitions.
Task: implement <agreed criteria> with the smallest change satisfying the spec.
Own: <bounded paths>; external effects only within the recorded mandate.
Verify: run the assigned project checks and record actual results and limitations.
Read the work record at start and safe checkpoints. Fence affected work on stale intent.
Repair clear failures within scope; return ambiguity to the owner. Stop at <deadline/limits>.
```

### Monitoring prompt

```text
Observe only <managed run> within <authority, deadline, limits>.
Read current accepted specs, pending decisions, status, and messages newer than saved cursors.
Check role/section/ticket consistency using the local profile; never infer delivery from idle state.
Fence stale assignments before further affected work. Never count old evidence for changed criteria.
Route a clear implementation failure to repair; ambiguous intent to its owner.
Queue one actionable nudge per item on its record or a verified idle-delivery path.
No repeated advice, busy-session interruption, or no-op heartbeat. Escalate a sustained idle stall once.
Report only changed evidence or needed decisions. Cancel this job at its stop condition and confirm.
```

## Scheduling lifetime and recovery

In Conductor Claude, the session-only CronCreate contract keeps jobs in memory: ending the
owning Claude session loses them, and the durable flag has no effect. CronList is the
registration receipt; CronDelete cancels a job. Each job prompts only its owning session;
it starts no new session. Execution requires that session to be running and idle. Recurring
jobs can run up to half a period late, capped at 30 minutes, and expire after seven days.
Read the actual next-run time rather than promise an exact cadence.

[Standalone Claude Code documentation](https://code.claude.com/docs/en/scheduled-tasks)
describes restoring eligible CronCreate tasks with --resume or --continue. That restoration
does not apply to Conductor's in-memory jobs. Use the actual host's tool contract; do not
infer persistence from CLI documentation or a durable argument.

Durable event-started work can use an authorized Conductor webhook routine. Routine creation
requires a user API key from the Conductor dashboard; the workspace token is not sufficient.
A webhook routine alone supplies no periodic clock. Re-register lost session jobs only within
the authorized monitoring scope, check for duplicates, and verify their receipt again.

[Conductor cloud lifecycle](https://www.conductor.build/docs/cloud/working-with-cloud-workspaces):
workspace sleep or the maximum lifetime stops processes while preserving files/history.
Inspect branch, spec currency, outstanding work, job state, and next run after waking;
recover the supported session and verify or re-register its jobs before claiming observation resumed.

## Optional signal intake

When the separate signals kit is selected, follow `docs/SIGNALS.md` in the factory source
and the installed `.factory/signals/onboard.md` in the target repository. Reuse the authoritative
project profile for decisions and bindings; the signals profile points to it. Signal templates
do not register a routine, prove delivery, or grant investigation, spend, merge or release authority.
