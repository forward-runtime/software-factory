# Interactive intent and understanding artifacts

Use desktop HTML/Lavish when a view helps someone explore intent or understand a result.
The canonical feature spec and learned process profile remain authoritative. Use the project's
existing preview, work record and context index; no particular document or ticket service is required.

Keep the primary view brief: the behavior or decision and one useful interaction. Put supporting
evidence and code detail behind expansion when it distracts. State each limitation once; remove
repeated status labels and process text that do not help the person judge the outcome.

## Intent view

Show the original request, current interpretation, stakes, examples, tradeoffs and unresolved
choices. Make differences inspectable: change a scenario, compare alternatives, or trace a
relationship. Decorative tabs and approval buttons do not establish understanding.

For changed intent, show a compact **old → proposed → impact** view: scope, affected criteria,
work/evidence, what remains unchanged, and the smallest decision needed. Record real answers
with their source and scope using [the spec lifecycle](SPEC-LIFECYCLE.md). An unsent choice,
opened page or elapsed time is not agreement. Confirm only unresolved consequential intent;
reuse settled decisions and continue independent work.

## Understanding view

Build from the actual spec, code and checks:

1. Background and goal before implementation details.
2. Main idea, important decisions, architecture and tradeoffs.
3. Useful interactive diagram, scenario or step-through.
4. Important code in reading order, with prose before file/diff links.
5. Evidence, limitations and questions the person can discuss.

Explain at the depth their responsibility needs. Separate simulations from implementation and
actual verification. A diagram or prototype can teach behavior without proving a deployed system.
Questions may expose an explanation gap or changed intent; follow `factory-understand` and
return material mismatches through the same lifecycle instead of silently rebuilding.

The supplied checkpoint uses five questions before teammate code review. Keep the answer key
outside the initially served HTML/JS and artifact bundle. Revealable answers can support labeled
learning examples; they do not establish a real understanding pass.

## Persistence and feedback

Regenerate views from the current spec and evidence. Preserve source/assets or a snapshot when
an actual decision or review claim relies on that version; do not commit every session sketch.
Bind accepted decisions to the spec revision and preserve their source in the work record/PR.
Update existing durable product docs when behavior/maintenance knowledge changes.

Use Lavish's current CLI guidance for annotation and feedback delivery. Local browser selections
are not a durable decision. Consume the actual submitted feedback, reconcile its scope, and
record the result before dependent work proceeds. Do not claim a view is monitored or feedback
is synchronized without an actual delivery path. Verify the page and meaningful interactions
before sharing. No mobile layout or checks are required for factory artifacts.

## Document companions

Follow [DOCUMENT-REVIEW.md](DOCUMENT-REVIEW.md) for canonical Markdown and matching HTML with
inline change highlights. A companion renders the current document; an interactive interview or
understanding view serves its separate discussion purpose. Neither records agreement by itself.
