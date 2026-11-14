# Interactive intent and understanding artifacts

Start alignment and understanding visually. Use `factory-visualize` for clickable system maps,
container/component drill-down, flows and state diagrams in desktop HTML/Lavish or the team’s
existing visual tool. Put supporting Markdown alongside the visual; do not lead with a prose dump.
The canonical feature spec and learned process profile remain authoritative. Use the project's
existing preview, work record and context index; no particular document or ticket service is required.

Keep the primary view brief: the behavior or decision and one useful interaction. Put supporting
evidence and code detail behind expansion when it distracts. State each limitation once; remove
repeated status labels and process text that do not help the person judge the outcome.

## Clean artifacts

Never add decorative eyebrow headings, generic subtitles, tiny explanatory legends, obvious-control
instructions, repeated status labels, or boilerplate disclaimers to factory artifacts. Start with
a clear title and the requested content. Add text only when it helps the reader understand the
subject, make a decision, or use a non-obvious interaction. Do not fill empty space with copy.

Keep revision IDs, timestamps, source hashes, rendering notes and highlight-baseline information
in HTML metadata or the work record, not in visible headers, subtitles or footers. Keep necessary
source links, diagram labels, units, evidence and consequential limitations with the content they
explain; this rule does not remove meaningful information. Ordinary navigation needs no tutorial.
Apply this to documents, diagrams, specifications, interviews, explanations, slides and previews.
Before sharing, remove every line that merely describes the artifact or repeats what is obvious.

## Spatial exploration

Give components stable identities and bounded groups; label interfaces and directional connections.
Start at the system boundary and reveal meaningful levels on demand. Use flow charts for behavior
and state diagrams for lifecycle. Let the giver select, inspect and, where useful, drag components,
pan, zoom and return to the overview. Preserve the spatial map while inspecting details. Layout
changes do not edit requirements or prove agreement; reconcile semantic edits through the spec.
Use only diagram levels that help the actual question, and retain source/evidence links.

A shared Conductor preview URL has one owner. Request a path from the server owner; never repoint
the workspace port to publish an additional artifact. Check existing routes remain available.

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
