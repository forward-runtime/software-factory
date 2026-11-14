# Enable Software Factory

Give your agent this instruction, with this file attached or linked from your trusted, pinned factory checkout:

> Enable Software Factory in this project using INSTALL.md from this factory version. Inspect and preserve local instructions first. Install the portable skills, run factory-onboard, reuse my known answers, and propose the smallest process that fits this team. Map Conductor, Linear and delivery checks to existing conventions. Record missing access without inventing connections. Installation is authorized; consequential process changes, external writes and releases follow my mandate. Do not implement a product merely because the factory was installed.

## Drop in the package

Requires Node.js 18+, npm and Git. The maintainer builds an offline, dependency-free archive from committed source:

```sh
node scripts/pack.mjs /absolute/output-directory
```

Give the generated `software-factory-kit-0.1.0.tgz` and its reported integrity/source revision to the receiving agent. On the receiving machine:

```sh
npm exec --offline --yes --package=/absolute/software-factory-kit-0.1.0.tgz -- software-factory /absolute/target-repository
```

This is a local archive, not a published npm registry package. Its receipt pins the source revision; payload hashes detect accidental payload edits, not a malicious replacement of executable code. Obtain the archive through a trusted channel. There is no MCP server or resident service to operate.

Alternatively, from a clean pinned source checkout:

```sh
node scripts/install.mjs /absolute/target-repository
```

Both routes use the same installer, preflight conflicts, preserve existing instruction bytes and local skills, and record installed hashes. Same-version repeat writes zero files. Updates, removal and conflicting local edits require deliberate reconciliation; partial I/O failures are not transactional.

## Empty project or existing project

For an existing project, use its Git root, current branch and local rules. Inspect the resulting diff before committing. Do not rename its branch or replace its CI/review policies.

For a project that has no repository yet, create only the local directory and Git repository within the assignment's authority, then install there:

```sh
mkdir my-project
cd my-project
git init
```

Pass that directory's absolute path to the installer. This does not create a remote repository, Conductor project or service. Those steps require verified access and the owner's mandate. No product is needed to install and learn the factory.

## First entry

**Restart the agent session first.** A session reads its skill catalog when it starts, so skills
installed during that session are invisible to it — `factory-onboard` will come back as an unknown
skill even though every file is on disk and both discovery directories are correct. This is the
first thing most people hit. Restart, then confirm the skills are listed before relying on them.

Start or refresh the native agent session in the target repo. Inspect the actual skill catalog and invoke `factory-onboard`; if discovery is stale or unavailable, read `.software-factory/.agents/skills/factory-onboard/SKILL.md` explicitly. Resolve its references from that canonical location. Installed wrappers are not proof of discovery.

Read [the enablement guide](docs/ENABLEMENT.md), installed as `.software-factory/docs/ENABLEMENT.md`. Onboarding reuses known decisions, interviews only consequential unknowns, presents a Markdown/HTML proposal, and materializes one process profile only after actual agreement. No profile agreement, understanding pass or acceptance follows automatically from installation.

## Completion receipt

Report source revision, installed hashes/write count, preserved local rules, actual skill discovery, onboarding observations/answers, selected process, verified tool bindings or named gaps, and the first agreed checkpoint. Keep this on the existing work record/PR. Distinguish installed, onboarded, connected, verified, released and accepted.
