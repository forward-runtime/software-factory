---
name: factory-understand
description: Explain an actual change with interactive artifacts and evidence, resolve the user's questions, and preserve useful knowledge without duplicating the feature spec.
---

Read the current agreed spec, actual change and verification evidence. Follow the project's
understanding checkpoint and [artifact guidance](../../../docs/HTML-ARTIFACTS.md).

Start with `factory-visualize`: a clickable map of the actual change, its interfaces and one
success/failure path. Keep supporting Markdown alongside the visual. Produce a desktop
review through the required [Lavish workflow](../../../docs/LAVISH.md) at the depth the person's responsibility needs: background,
main idea, important choices, interactive diagram or worked scenario, relevant code links,
evidence and limitations. Interaction must explain a real distinction, not decorate the page.
Clearly distinguish implementation from a hypothetical or simulated example.

Walk the result with the giver. Answer questions and ask them to explain consequential behavior
in their own words. Explain again for an understanding gap; use `factory-plan` and
[the spec lifecycle](../../../docs/SPEC-LIFECYCLE.md) when the conversation changes intent.
The factory owns resolving the gap; it does not transfer delivery or correctness work to the giver.

The supplied playbook uses five change-specific questions before teammate human code review.
Keep the answer key outside the initial HTML/JS and served bundle. A pass requires real answers
explaining the reasoning; accept equivalent wording, clarify gaps and retry those questions.
Revealable learning examples are not a scored pass. Do not invent answers while the giver is
offline or call a rehearsed quiz proof of an unbuilt change.

**Where the checkpoint applies, the change does not move until it passes.** No teammate review, no
pull request for others to read, no merge.

**Where it applies is decided in advance, not in the moment.** People, agents and service events can
all start work. Work that arrives from a signal, a webhook or a schedule, inside a path the profile
has already authorized to run without a person, runs through: repair, verify, ship, and report. A
human checkpoint on every change would make the factory useless for exactly the work it should
absorb, and ceremony on a disposable change is not rigour.

The agent never makes that call for itself. The profile sets, with the owner, which paths run
unattended and what exceeds them — by stakes, by blast radius, by what the change touches. If work
leaves that envelope, it stops, whatever started it: a signal-driven repair that turns out to change
agreed behaviour, widen scope, touch something the owner named indispensable, or rest on an
assumption nobody confirmed is no longer unattended work. Deciding in the moment that nobody is
needed is the failure this gate exists to prevent; deciding in advance that a path is safe to run is
the owner exercising judgement. Not passing is an ordinary outcome and not a judgement of the
person: it means the explanation has not landed yet, which is the factory's problem to fix. Explain
again differently and retry the questions that exposed the gap.

A gap is also evidence about the work itself. If the giver cannot follow a choice, consider that
the choice may be wrong, under-explained in the code, or resting on an assumption nobody agreed to
— and route that back through `factory-plan` rather than explaining harder.

Report the checkpoint as passed, failed and re-explained, or not yet attempted. Never report it as
passed because questions were sent, an artifact was opened, or the giver did not object.

Keep the feature spec current and update existing product reference docs where behavior or
maintenance knowledge changed. Put decision history and results in the work record/PR; regenerate
views rather than accumulating reports. Preserve a snapshot when a decision relies on it.
Hand over the actual result, evidence, limits and next decision.
