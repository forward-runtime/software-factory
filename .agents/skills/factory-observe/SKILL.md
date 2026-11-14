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
5. Notify only for new actionable changes. Stop at the assignment's end condition/limit and
   stop recurring observation when its work ends. Do not invent a completed goal or unsupported
   pause to hide a waiting decision.

Propose improvements from concrete failures/corrections with a representative test before adoption.
Keep project domain facts local. No unchanged heartbeats, speculative retries or claims of
human-time/cost savings without measurement.
