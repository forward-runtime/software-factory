---
name: factory-visualize
description: Lead alignment and understanding through clickable system maps, flows and state diagrams, with spatial navigation and matching Markdown grounded in the current spec and evidence.
---

Use this skill for visual alignment, architecture exploration and understanding an actual change.
Read local rules, the agreed profile and current spec/evidence. Start with a useful visual map;
put supporting prose alongside it. Load the bundled `lavish` skill and follow the required
[Lavish workflow](../../../docs/LAVISH.md) for authoring, opening and receiving feedback.
The receiving factory owns making the intended system understandable.

## Build a spatial model

- Pick the first map for the question: system context for scope/actors, container/component
  drill-down for architecture/interfaces, a numbered flow for behavior, or a state diagram for
  lifecycle/transitions. Use only levels that explain something. C4 containers are applications
  or data stores; do not label every box a deployed service. Keep business groupings distinct.
- Give concepts stable identities and bounded containers. Label relationships with what passes
  across them, direction and important conditions. Show current, proposed and unknown behavior
  explicitly where the distinction matters. Ground observed structure in source/code references.
- Let the person select and inspect components, follow connections, drill into containers and
  return to the overview. Keep spatial arrangements stable while exploring. Support drag, pan
  and zoom when those help navigation; include keyboard selection and a reset route.
- Begin with a manageable overview. Reveal responsibility, interface, owner, evidence, unresolved
  decisions and relevant code on selection. Do not fill the canvas with paragraphs or tiny text.
  Explain uncertainty where it affects the actual decision, not in boilerplate footers.

## Alignment and understanding

For alignment, let the giver walk a success/failure scenario and correct the map. Turn semantic
changes into the smallest explicit decision delta. A moved box, edited connector, local layout,
unsent annotation or page opening is not agreement. Record actual answers with the reviewed
artifact version in the existing work record; update the same canonical spec before resuming
work affected by changed intent. Keep unaffected work moving.

For understanding, show actual implemented boundaries, the path of one real interaction and
relevant failure states. Link the change and check evidence; distinguish simulated examples.
Use the local understanding checkpoint; never claim a pass from navigation or a prepared quiz.
Keep answer keys outside the served artifact when that checkpoint is scored.

Maintain canonical Markdown beside every prose artifact. Visuals lead the conversation; the
profile, current spec and work record retain their existing authority. Keep sources resolvable.
No decorative eyebrow labels, generic subtitles, obvious-control tutorials, metadata legends or
boilerplate footers. Keep revision/hash data in metadata or the work record.

## What a diagram may not carry

A map travels further than the repository it was drawn in: into decks, pull requests, public
documentation and screenshots taken by people who never saw the source. Draw it so that leaving
is safe.

- Name only what this artifact's audience is already entitled to see. Keep credentials, tokens,
  internal hostnames, account, customer and ticket identifiers, private service names, unreleased
  product names and personal data out of labels, legends, `aria-label` text, source links and any
  embedded model. Name the role, not the instance.
- Check what does not render. Embedded JSON, generator comments, document titles and metadata,
  commented-out nodes and base64 payloads all ship inside the file.
- When you borrow a look from an existing artifact, take the visual grammar only: type scale,
  palette, spacing, node and edge treatment. Carry over none of its content, identifiers, copy or
  embedded images. A style reference is not a source of facts.
- Scrub before the artifact crosses a boundary, not after. A published diagram is cached, indexed
  and screenshotted; deleting the file later retracts nothing. Where you are unsure whether a name
  may travel, ask its owner before publishing rather than afterwards.

## Produce and verify

Use [the spatial artifact recipe](references/spatial-artifact.md) for the included offline
HTML/SVG authoring helper and renderer. Present its output through Lavish; it is not an
alternative review workflow. Read only that reference when
using these assets. They generate review documents, not a new factory runtime or VR application.

Exercise the meaningful interactions and check labels, edge directions, boundaries and hierarchy
against source evidence. Test both the success and consequential failure path with the giver.
Capture a useful desktop view. In a shared Conductor workspace, the preview URL has one owner;
request a path from that owner instead of repointing its port. Do not claim delivered feedback,
synchronization or persistence without the actual receipt.
