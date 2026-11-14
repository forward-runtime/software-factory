# Project connections

Onboarding learns where this team discusses intent, tracks work and keeps context. Use its
existing tools and permissions. Slack, Linear and Notion are supported bindings, not required
services or assumptions built into the core. No separate connector platform is required.

| Surface        | Example binding                      | Required before external writes                                 |
| -------------- | ------------------------------------ | --------------------------------------------------------------- |
| Alignment / decisions | Agreed agent or review surface | Exact workspace/session/artifact, accountable owner and decision provenance. |
| Notifications | Slack or another update channel | Exact channel ID/URL, allowed content and verified return links. |
| Work record    | Linear project or GitHub issues      | Team/project identity, destination ID/URL and available states. |
| Context index  | Notion parent or repository docs     | Workspace identity and exact page or repository path.           |
| Factory source | Selected release                     | Source repository and pinned version.                           |
| Target project | Repository learned during onboarding | Repository URL, base branch and permitted deployment target.    |

Learn discussion and notification roles separately. A notification-only channel carries alerts,
status, summaries or files with links back to the agreed decision surface; do not conduct an
interview there or treat delivery, a link click or a reaction as agreement. Another team may
explicitly choose a different discussion surface. Never infer that choice from a tool name.

Record actual bindings in the learned project profile. The launch assignment references them.
A working name is not a live destination. Never infer a destination from unrelated connector
access in another workspace or require a team to migrate tools to use the factory.

Perform bounded read checks of named destinations and record success or missing access. Create
only authorized project records. Do not import unrelated organization content. Preserve native
permissions and use the existing tools or MCP connections; never copy credentials into prompts,
files or messages.

If a binding is missing, prepare the outgoing record as a draft in the work item's PR. Continue
independent work and retry only when access changes. A draft is not a posted record. The project
owner sets up connections; the factory verifies actual access before relying on them.
