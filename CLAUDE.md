# Software Factory

A reusable instruction system running on Conductor Cloud and native Codex/Claude Code harnesses.
Keep target-product facts and team-specific process in the target repository, not this core.
Do not build another factory UI, scheduler, connector platform or harness without demonstrated need.

Read and follow [the portable operating contract](docs/CONTRACT.md) and
[document review rules](docs/DOCUMENT-REVIEW.md).

## Development of this repository only

Use branches/PRs, `[skip ci]`, no automatic CI or deployment, and checks appropriate to the change.
Do not transplant these development policies into another repository; its instructions/profile
set its platform, CI, merge and release rules. Factory review artifacts are desktop-only.
Additional provider/API spending defaults to $0 until its owner supplies a ceiling; subscription
work follows authorized scope. Credits alone are not a ceiling. Never expose credentials or
copy unrelated project/customer data. Bind actual destinations per [CONNECTIONS.md](docs/CONNECTIONS.md).
