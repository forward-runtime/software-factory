# Bind signals in a new repository

Read local instructions and existing onboarding profile first. Preserve their governance.
Interview the accountable owner using concrete examples: which failures may be investigated,
which may produce a PR while they are offline, and what choices must return to them?
No routine, resource, secret, message or call is created merely by this onboarding prompt.

Keep decisions and bindings in the team's authoritative process profile. Set
`factory_profile_ref` in `.factory/signals-profile.json` to that repository-relative path;
keep only signal-specific configuration and receipts here rather than duplicate those decisions. Discover only explicitly approved local context;
ask for missing repository/base, Conductor project, cloud provider/project and allowed log
filter, alert destination/channel, ticket team/project/states, chat channel, owner/contact,
source allowlist, check commands, timezone and existing native manager session. Learn the
decision surface separately from chat notification content and links; a channel name alone
does not authorize interviewing or accepting decisions there. Do not guess
IDs from familiar service names. Bindings can be null and blocked; cold start needs no alerts.
Never copy an API key, routine webhook URL, phone number or customer payload into this file;
use approved secret/contact references. Read checks are bounded to the named destinations.

Record owner approval source/version/time for mandate, allowed actions/files, stop conditions,
triage daily cap (default 5 UTC), retry limit (default 1), chat response timeout, urgency,
phone consent (default false), per-call cap (default $0), and provider budget (default $0).
A mandate must distinguish investigation, builder dispatch/PR, merging and deployment.
Signals never grant merge/deploy permission. An install is not an approved mandate.

Choose exactly one manager ledger writer and a durable work record/ledger destination shared
across fresh routine workspaces. Define how routine drafts reach it, durable cursor storage,
incident key lookup, daily reservations, crash recovery and uncertain-dispatch handling.
Do not approve live multi-session intake if only search-then-create or local workspace files
provide dedupe. Serialize through the manager or stop. This kit adds no lock/connector service.

Run the synthetic read-only acceptance test from SIGNALS.md first. Then present the exact
external setup actions for owner approval, with costs and destinations. Require verified
subscription billing/control before activation at $0 additional provider spend. Capture each
setup receipt in the profile: installed, tested, blocked and active are separate states.
Use SIGNALS.md steps 4–9 for the operator's native platform setup. Do not mark live integration
working until actual delivery, dedupe/cap, builder, and escalation receipts exist separately.
