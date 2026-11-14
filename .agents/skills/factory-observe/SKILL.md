---
name: factory-observe
description: Inspect owned factory sessions on a native schedule, detect actionable drift or blockers, and nudge only authorized work with current context.
---

Read the assignment and learned process. Use [native execution](../../../docs/NATIVE-EXECUTION.md)
for the five-minute recipe. Confirm the actual schedule ID, cadence, lifetime and host/session
requirements before claiming recurrence. A goal is not a timer. If scheduling is unavailable,
perform one check and report the missing capability; do not invent a daemon.

At each observation:

1. Read owned work items, actual session status and only messages newer than the saved cursor.
   Persist the cursor/next action in the existing work record, not a new status database.
2. Compare progress/evidence to assigned criteria and the current agreed spec. A quiet transcript
   alone is not a stall; a running check is not an invitation to interrupt.
3. If ready work is idle or a recoverable failure has evidence, queue one bounded nudge naming
   the item, agreed revision, next action and stop condition. Use the existing desk/queue;
   do not interrupt healthy busy work or take its files.
4. Conflicting intent or stale affected criteria uses `factory-plan` and
   [the spec lifecycle](../../../docs/SPEC-LIFECYCLE.md). Hold dependent actions and surface one
   concise delta. Never nudge through a human checkpoint, failed acceptance or missing authority.
5. Notify the owner through the bound notification surface. Stop at the assignment's end
   condition/limit and stop recurring observation when its work ends. Do not invent a completed
   goal or unsupported pause to hide a waiting decision.

## Notifying the owner

The test is not whether something is interesting. It is whether the owner is **needed** — for a
decision, for alignment, or for understanding. Those three are the owner's by contract; everything
else is the factory's work and must not become their notification.

Send on the **first** observation that meets a condition. Do not wait to accumulate, and do not
decide for yourself that a waiting decision can wait:

- A decision is waiting on the owner. Name the decision, what it blocks, and what the factory will
  do in the meantime.
- Intent is unclear or has changed, and dependent work is held.
- An understanding checkpoint is ready, failed, or is blocking teammate review.
- A deadline will pass without the owner: notify when it is near, and again when it is imminent.
- Two sessions wrote the same resource, or ownership of a resource is unclear.
- A check that was passing now fails, a claim the owner relies on turns out to be wrong, or a
  failure cannot be resolved within the factory's own authority.

Do **not** notify for work the factory owns and can finish: routine progress, a check that passes,
a defect being repaired within authority, or anything already sent and unchanged. A channel that
reports everything is muted, and a muted channel is worse than no channel.

Each notification states what is needed, from whom, what it blocks, and links back to the decision
surface. Delivery is not agreement, and neither is a reaction or an opened link.

**A notification is not sent until its delivery is evidenced.** Record the identifier the surface
returns — for Slack, the `ts` and channel ID — in the work record alongside what was sent. Without
that identifier, treat the notification as a draft and say so; never report that the owner was told.
Repeat only when the underlying condition changes.

Once per day, send one digest of everything still open: each decision waiting, how long it has
waited, and what it blocks. Send it even when nothing changed, because its purpose is to show the
owner the whole queue rather than a single event.

Propose improvements from concrete failures/corrections with a representative test before adoption.
Keep project domain facts local. No unchanged heartbeats, speculative retries or claims of
human-time/cost savings without measurement.
