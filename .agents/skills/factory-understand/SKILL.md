---
name: factory-understand
description: Explain an actual change with interactive artifacts and evidence, resolve the user's questions, and preserve useful knowledge without duplicating the feature spec.
---

Read the current agreed spec, actual change and verification evidence. Follow the project's
understanding checkpoint and [artifact guidance](../../../docs/HTML-ARTIFACTS.md).

Start with `factory-visualize`: a clickable map of the actual change, its interfaces and one
success/failure path. Keep supporting Markdown alongside the visual. Produce a desktop
HTML/Lavish review at the depth the person's responsibility needs: background,
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

Keep the feature spec current and update existing product reference docs where behavior or
maintenance knowledge changed. Put decision history and results in the work record/PR; regenerate
views rather than accumulating reports. Preserve a snapshot when a decision relies on it.
Hand over the actual result, evidence, limits and next decision.
