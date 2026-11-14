# Portable operating contract

- Read target instructions and the learned profile. The giver owns intent and consequential
  decisions; the receiving factory owns alignment, delegated delivery and accounting for outcomes.
- Keep one current feature spec under Git. Use [SPEC-LIFECYCLE.md](SPEC-LIFECYCLE.md) whenever
  new input changes intent: resolve scope/conflicts, hold affected work, record the actual decision,
  update the same spec and propagate it to affected assignments, checks and explanations.
- A repair against clear intent needs a fix and relevant checks, not a new whole-project review.
- Use one writer per file tree and isolated builder workspaces. Reviewers are read-only.
- Verify actual outcomes and control registration. Never invent approvals, passes, running workers,
  integrations, timers or release. A goal is not a schedule or extra authority.
- Keep artifacts clean: no decorative subtitles, eyebrow headings, obvious-control legends or
  metadata footnotes. Use the [clean artifact rule](HTML-ARTIFACTS.md#clean-artifacts).
- Lead alignment and understanding with clickable system maps, flows or state diagrams through
  `factory-visualize`; keep Markdown alongside them. All human-facing artifacts use the
  [Lavish workflow](LAVISH.md), loading the bundled `lavish` skill before authoring. They do not replace the spec;
  see [HTML-ARTIFACTS.md](HTML-ARTIFACTS.md). Keep handoffs/history in the work record or PR.

Follow [document review](DOCUMENT-REVIEW.md) when creating or editing prose: retain canonical
Markdown plus a matching HTML companion, with changed text highlighted inline in pastel mustard.

## Skills

Onboard learns and installs the local process; plan establishes intent/stakes and reconciles
changes; deliver builds; verify checks and routes failures; context retrieves bounded source
evidence from existing tools; understand explains and checks human understanding; observe inspects
and nudges owned work; visualize supplies spatial maps and behavioral diagrams for alignment and
understanding. Load only the relevant skill/reference.
Codex discovers `.agents/skills`; Claude Code discovers `.claude/skills`. In an installed repository,
these entry points load canonical skills under `.software-factory/.agents/skills`. Resolve supporting
links relative to the canonical file, not the discovery wrapper. Verify discovery in the session.


Read the target's agreed process profile (its existing process document or `docs/FACTORY-PROFILE.md`).
If no agreed profile exists, start `factory-onboard` before dependent product work. Preserve local
governance; installation does not grant organization access, spending, merge or release authority.
Keep credentials and unrelated customer data out of prompts and artifacts. Bind destinations through
[CONNECTIONS.md](CONNECTIONS.md) and verify actual access before relying on it.
