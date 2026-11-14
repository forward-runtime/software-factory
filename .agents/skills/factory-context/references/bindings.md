# Conditional source bindings

Primary documentation checked 2026-11-14. Recheck the selected provider at use time; deployment,
plan, tools and schemas can differ. These recipes describe conditional operations, not installed
connections or successful ingestion. Use existing authorized access; never print tokens. A missing
connection or unavailable operation takes the local export route in [local.md](local.md).

## Existing HydraDB index

Read the current [HydraDB integration guide](https://docs.hydradb.com/AGENTS.md) and discover the
installed SDK/API version. For an existing authorized database, use `client.query()` (`POST /query`)
with its exact database and permitted collection scope, knowledge type and bounded result settings
from the current schema. Preserve returned source/chunk metadata and resolve consequential excerpts
to originals. Do not infer complete coverage from ranked results. For raw v2 HTTP the guide specifies
`API-Version: 2`; payloads use the response `data` envelope. Inspect existing ACL/filter requirements
before querying; a database name alone does not establish audience authorization.

Optional ingestion is a separate authorized write through `client.context.ingest()`; acceptance
is asynchronous. Record IDs and inspect `client.context.status()` until actual completion or the
agreed stop limit; report pending/errored items honestly. Do not create a database or connector for
retrieval. Without authorized existing access, obtain scoped text/Markdown exports with original
IDs and versions. No HydraDB operation was exercised by this kit's synthetic tests.

## Granola meetings

Use the first-party [MCP guide](https://www.granola.ai/blog/granola-mcp) and
[tool overview](https://www.granola.ai/blog/mcp-vs-api-difference). The documented server is
`https://mcp.granola.ai/mcp`; connecting/authenticating is separate from reading meetings.
Discover actual exposed schemas before invoking tools. The overview documents
`query_granola_meetings`, `list_meeting_folders`, `list_meetings`, `get_meetings` and
`get_meeting_transcript`; availability must be checked in the current session.

Within authorized folders/time scope, query by feature and competing decisions, obtain meeting
IDs, then fetch selected meeting details/transcript if available. Follow returned pagination within
the agreed bound. Keep meeting date, speaker/time and note-versus-transcript provenance. The MCP
guide describes plan-dependent history/transcript restrictions; account access is not proof of
full history. If only summaries/search are exposed, state that limitation and request a scoped
export through the user's available export surface. Do not reverse-engineer private endpoints.
No Granola operation or transcript access was exercised here.

## Google Docs / Drive

Prefer the actual connected search/read/export tools after inspecting their schemas. If an existing
authorized Drive v3 API binding is available, use [files.list search](https://developers.google.com/workspace/drive/api/guides/search-files)
with `q` restricted to the authorized folder and relevant terms, requested metadata fields and
bounded `pageSize`; continue with `nextPageToken` only within limits. A parent folder filter is
not recursive: enumerate only authorized descendants if separately needed. Preserve file ID,
web link, modified time and available version metadata; report `incompleteSearch` when returned.

For selected Docs use [files.export](https://developers.google.com/workspace/drive/api/guides/manage-downloads)
with an appropriate supported text MIME type; downloaded blobs use the documented download route.
Exported text may lose speaker/timestamp or document structure: retain any available anchors and
record loss. Hash the snapshot; verify metadata before/after export to detect concurrent edits.
For separately authorized incremental refresh use [Drive changes](https://developers.google.com/workspace/drive/api/guides/manage-changes)
with saved page tokens, scope checks and removed-file handling. A changes feed is not an initial
inventory or permission to read newly visible files. Do not create watches or background sync as
part of retrieval. Without access, accept user-provided Markdown/text exports. No Google account,
OAuth setup, Drive read/export or change feed was exercised here.
