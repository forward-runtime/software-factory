# Software Factory

A reusable instruction system running on Conductor Cloud and native Codex/Claude Code harnesses.
Keep target-product facts and team-specific process in the target repository, not this core.
Do not build another factory UI, scheduler, connector platform or harness without demonstrated need.

Read and follow [the portable operating contract](docs/CONTRACT.md) and
[document review rules](docs/DOCUMENT-REVIEW.md).

## Development of this repository only

Use branches and pull requests. Run the checks before opening one:

```sh
node --test tests/*.test.mjs
node evals/run.mjs run
```

Continuous integration runs those same checks on every pull request and on `main`. It is
check-only: it builds nothing for release, deploys nothing, and holds read-only permissions.
There is no automatic deployment, because this project ships no running service.

Do not transplant these development policies into another repository; its instructions and agreed
profile set its platform, CI, merge and release rules. Factory review artifacts are desktop-only.
Additional provider/API spending defaults to $0 until its owner supplies a ceiling; subscription
work follows authorized scope. Credits alone are not a ceiling. Never expose credentials or
copy unrelated project/customer data. Bind actual destinations per [CONNECTIONS.md](docs/CONNECTIONS.md).
