# Lavish artifact workflow

Use Lavish for every human-facing factory artifact: onboarding maps, alignment/specification
views, diagrams, comparisons, explanations, reviews and reports. Load the bundled
[Lavish skill](../.agents/skills/lavish/SKILL.md) before authoring. Keep canonical Markdown
alongside visual documents. Code, JSON fixtures and raw receipts keep their native formats;
the human-facing explanation of them uses Lavish. Installation does not itself open a review.

## Author and open

The kit includes the upstream skill and MIT license, pinned in its `UPSTREAM.json`. The CLI
is obtained separately through npm, never downloaded or executed by the offline core installer.
The tested CLI is `lavish-axi@0.1.97`, requiring Node.js 22+. Use the team's approved version;
inspect its actual help before relying on commands. Fetching a CLI is distinct from provider/API
spending and must fit local network/package policy. Do not silently bypass a missing runtime.

```sh
npx -y lavish-axi --help
npx -y lavish-axi design
npx -y lavish-axi playbook diagram
```

Read every matching playbook: plan for proposed work, explanation for actual work, input for
structured decisions, and the other types when relevant. Prefer user design direction, then
the subject project's existing design system, then Lavish's current fallback. Keep clean
artifact rules: no decorative subtitles, obvious-control legends or metadata footnotes;
no change highlights on a first version. Keep diagram targets identifiable and source-backed.

Create the artifact under the project's artifact home (`.lavish/` by upstream default) with
relative local assets. The factory spatial renderer is an authoring helper within this workflow,
not an alternative to Lavish review. Then open the actual HTML file:

```sh
npx -y lavish-axi /absolute/artifact.html
```

Record the actual open receipt. Verify the artifact and its meaningful controls inside Lavish's
sandboxed iframe as well as the authored file. A plain browser screenshot or static preview does
not establish Lavish SDK, annotations or feedback delivery. If runtime/access or current CLI
guidance is unavailable, continue source research and Markdown/model drafts only; defer new
human-facing HTML authoring and review until the required workflow is available. Existing HTML
source drafts may be retained, but never presented as finished Lavish artifacts. Name the blocked
review and do not present a static substitute as completed.

## Review and reconcile

Use the current CLI's poll/reply instructions. Poll stays attached to the active agent turn
unless the harness provides a verified completion callback; do not invent a background listener.
Do not kill a silent poll or add routine timeouts. Consume returned feedback completely.
If ending a handoff without another poll, use `reply` and require its acceptance receipt.
Honor an ended/disconnected session according to the actual CLI guidance; never reopen one
against the reviewer's intent. An open session alone is not a monitored session.

Clicks, selections, node movement and queued-but-unsent answers stay local. Receive actual
submitted feedback, identify its owner and scope, and reconcile consequential changes through
the existing spec lifecycle. Record the answer and artifact/spec version in the work record.
A test-generated prompt is simulated feedback, not a human decision or understanding pass.

## Shared cloud delivery

Conductor's preview URL has one owner. Ask that owner to route Lavish's review shell, artifact
assets, HTTP/API and streaming/WebSocket endpoints without replacing existing paths or repointing
the workspace port. Follow the CLI's host-allowlist guidance. Check the real proxied page and
feedback path; do not call a static export an interactive review. Missing routing is a named gap.
Treat mounted folders as published space; move only finished, deliberately shareable files there.
Do not use third-party publishing or change sharing permissions merely to obtain a review URL.

The [upstream project](https://github.com/kunchenguid/lavish-axi) maintains the skill/CLI workflow.
Refresh the vendored skill deliberately with source/license provenance and installation checks;
read live CLI guidance on each review rather than copying a manual that can go stale.
