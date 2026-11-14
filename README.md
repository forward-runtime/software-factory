# Software Factory

A portable set of agent skills that turns coding agents into a team you can delegate to —
one that agrees on intent before building, proves what it did, and **explains the change to you
before it goes to review.**

It is instruction files, not a service. You install it into a repository you already have, it runs
on the agent harness you already use, and removing it is `git revert`. There is nothing to host,
no account, and no runtime of ours in your stack.

```sh
node scripts/install.mjs /absolute/path/to/your-repo
```

Not on npm yet, so that runs from a checkout of this repository. See [Install](#install).

## Why this exists

Code generation got cheap. Understanding it did not. In a randomised trial of 52 developers, AI
assistance measurably impaired conceptual understanding, code reading and debugging — a 17% gap on a
comprehension quiz, with no significant average efficiency gain
([Shen & Tamkin, arXiv:2601.20245](https://arxiv.org/abs/2601.20245)).

So this is not another tool for producing more code faster. Its distinguishing move is a gate:
**work does not reach teammate review until the human who owns it can explain the change.**

Being honest about that claim, because the factory's own rules require it: the research establishes
that comprehension degrades. It does **not** establish that this gate fixes it — no study tested one.

## Install

Requires Node.js 18+ and Git. From a pinned checkout of this repository:

```sh
node scripts/install.mjs /absolute/path/to/target-repository
```

Or build an offline, dependency-free archive and hand it to the receiving machine:

```sh
node scripts/pack.mjs /absolute/output-directory
npm exec --offline --yes --package=/absolute/software-factory-kit-0.1.0.tgz \
  -- software-factory /absolute/target-repository
```

Full instructions, including the prompt to hand your agent: **[INSTALL.md](INSTALL.md)**

### What installation does, and refuses to do

- Vendors the portable contract, the skills, four role prompts and their references under
  `.software-factory/`, reading allowlisted blobs from a pinned Git revision rather than copying
  directories — so nothing private rides along.
- **Preserves your existing instructions.** It will not overwrite your `AGENTS.md`, `CLAUDE.md` or
  local rules; on a conflict it aborts *before writing anything*.
- **Repeats as a no-op.** Running it twice writes zero files. That is the receipt that it compares
  before it writes.
- Writes a receipt with a SHA-256 per file, so you can verify exactly what landed.
- Grants no authority. Installing does not give agents permission to spend money, connect services,
  merge, or release.

## The skills

| Skill | What it does |
|---|---|
| `factory-onboard` | Learns your project and process, installs the agreed components, writes one local profile |
| `factory-plan` | Establishes intent and stakes; reconciles changes to the spec when they arrive |
| `factory-deliver` | Builds one agreed slice in an isolated workspace |
| `factory-verify` | Runs checks and independent review; routes defects back rather than papering over them |
| `factory-understand` | Explains the actual change, then checks that you understand it |
| `factory-observe` | Inspects owned work on a schedule and nudges only what it is authorized to |
| `factory-visualize` | Draws clickable system maps, flows and state diagrams for alignment and understanding |
| `factory-context` | Retrieves bounded, cited evidence from the sources a team already has |
| `lavish` | The bundled artifact workflow all human-facing reviews go through |

Codex discovers `.agents/skills/`; Claude Code discovers `.claude/skills`. In an installed
repository both entry points load the canonical copy under `.software-factory/`. Verify discovery in
your own session — instructions alone do not prove it.

## How it works

You give an outcome. The factory owns getting there, proving it, and explaining it. You keep intent,
consequential decisions and acceptance. Everything else follows from that split:

- **Alignment is the factory's job.** It interviews for intent and stakes instead of waiting for a
  finished specification.
- **Evidence or it did not happen.** No invented tests, approvals, integrations or completed stages.
  Unexercised paths are declared as unexercised.
- **One writer per file tree.** Concurrent agents work in isolated worktrees; reviewers are
  read-only.
- **One canonical spec in Git.** Reviews and interviews are temporary views; accepted changes update
  the same spec and propagate to affected work.
- **The stop is the product.** When something consequential is unresolved, work halts and asks you
  rather than guessing.

## What it is not

- Not a hosted service, dashboard, scheduler or connector platform.
- Not an autonomy play. It is designed to stop and ask, which costs throughput on purpose.
- Not bound to any vendor's tools. Slack, Linear and Google Cloud are *example* bindings a team can
  choose; none is required, and none is connected by installing.
- Not proven in production. Live service integrations are not exercised, the understanding gate's
  benefit is a stated hypothesis, and profile resolution has been reviewed statically rather than
  run in a live agent session.

## Checks

Run them yourself; nothing here depends on a published result:

```sh
node --test tests/*.test.mjs      # installer, packaging, renderer
node evals/run.mjs run            # the offline behavioural cases
```

`evals/cases.json` holds 100 identified cases: 24 are deterministic contracts the runner executes,
and 76 are scenarios scored by a reviewing agent. Results are reported per component rather than as
one aggregate, so a failure points at the part that failed.

## Documentation

| | |
|---|---|
| [docs/CONTRACT.md](docs/CONTRACT.md) | The portable operating contract. Shortest path to the model. |
| [INSTALL.md](INSTALL.md) | Installing into a repository, with the prompt to hand your agent |
| [docs/ENABLEMENT.md](docs/ENABLEMENT.md) | Fresh and existing repositories, and staged adoption |
| [docs/SPEC-LIFECYCLE.md](docs/SPEC-LIFECYCLE.md) | What happens when intent changes mid-flight |
| [docs/HTML-ARTIFACTS.md](docs/HTML-ARTIFACTS.md) | Interactive intent and understanding reviews |
| [docs/CONNECTIONS.md](docs/CONNECTIONS.md) | Binding real destinations, and verifying access first |

## Status

Early. The skills, installer and evaluation are real and checked; live service integrations are
not exercised, and the understanding gate's benefit is a stated hypothesis rather than a
demonstrated result. Issues and questions are welcome.
