# Binding a Slack notification channel

Optional. Slack is one example of a notification surface, not a required service. A team may use
another channel, or none. Use this only after onboarding has learned that the team wants Slack, and
after the discussion and notification roles have been learned separately.

Everything below was exercised against a real workspace on 2026-11-14, including the failures.

## Role

A notification surface carries alerts, status, summaries and files, each with a link back to the
agreed decision surface. It does not host interviews, and delivery, a link click or a reaction is
not agreement. Keep that boundary even when a team is comfortable chatting there.

## Scope: `chat:write` only

Request a bot token (`xoxb-…`) with **`chat:write` and nothing else**.

Read scopes are wrong here, and not only for economy. A notification-only binding that can read
channel history holds more access than its role justifies. Post-only matches the role exactly.

Expect, and do not treat as defects:

- `conversations.info` → `missing_scope`
- `conversations.history` → `missing_scope`

Those errors confirm the token is correctly limited.

## Owner steps

The project owner sets up connections; the factory verifies access. The owner:

1. Creates a Slack app at api.slack.com/apps, *From scratch*, in the target workspace.
2. Adds the bot scope `chat:write` under *OAuth & Permissions*.
3. Installs the app and copies the Bot User OAuth Token.
4. **Invites the bot to the channel**: `/invite @AppName`. A token alone cannot post to a channel
   the bot has not joined.
5. Records the channel **ID** (`C…`), from *View channel details*. `chat.postMessage` also accepts a
   channel name, but names change and IDs do not, so bind the ID.

## Delivering the credential

Never place a token in a prompt, a file, a message or a commit. Supply it through the environment:

```sh
conductor workspace create \
  --name "<workspace>" \
  --agent claude \
  --env SLACK_BOT_TOKEN=xoxb-… \
  --env SLACK_CHANNEL_ID=C…
```

Environment is fixed when a workspace starts, so a variable added later does not reach a running
workspace. Organisation-level variables **are** inherited by newly created workspaces: verified on
2026-11-14 by creating a workspace with no `--env` flags and finding both variables present.

## Checking presence without leaking the value

```sh
echo "token present: ${SLACK_BOT_TOKEN:+yes}"
echo "channel: ${SLACK_CHANNEL_ID:-MISSING}"
```

`${VAR:+yes}` prints `yes` or nothing and never the value. **Do not** write
`${VAR:+yes}${VAR:-NO}`: `:-` substitutes the value whenever the variable is set, so that form
prints the token. This exact mistake was made and caught on 2026-11-14 by a session that refused to
run the command and explained why.

The channel ID is not a secret, so `:-MISSING` is safe for it.

## Verifying the binding

`chat.postMessage` returning `ok: true` with a `ts` and a resolved channel ID is Slack confirming it
stored the message. That is the delivery evidence; a transport-level 200 alone is not. Record the
`ts` and the channel ID in the work record.

A read-back through `conversations.history` would add little and would require scopes the role does
not justify. Where stronger proof is wanted, ask the owner to confirm they can see the message —
human confirmation beats an API echo and costs no access.

If the post fails, record the error and keep the outgoing record as a draft in the work item's PR.
A draft is not a posted record, and a missing binding never blocks independent work.

## Message shape

Short enough to act on, with the evidence behind it and a working return link. Name what is needed,
from whom, and where the decision is actually made. State plainly that the decision happens on the
decision surface, so no one treats a reaction here as approval.
