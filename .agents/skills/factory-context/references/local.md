# Local Markdown and text exports

Use existing repository search for authorized repository files. For repeatable bounded export reads,
run `python3 scripts/read_local.py manifest.json --query retention --limit 10 --max-bytes 262144`
relative to this canonical skill directory (or use its absolute script path). Query is a literal,
case-insensitive line search. Omit it to read a bounded complete batch for small authorized sets.

The manifest is JSON with `scope` (authorized project/audience), `sources` (explicit files), and optional
`exported_at`. Each source requires unique `id`, relative `path`, `uri` and `permissions`; optional
`revision` and `date` describe the original source, not the local snapshot. Files resolve relative to
the manifest. Only UTF-8 `.md`/`.txt` regular files inside that directory are accepted. Symlinks,
traversal, directories and oversized files are rejected/skipped; nothing recursively crawls a home.

```json
{"scope":"demo team only","exported_at":"2026-11-14","sources":[
  {"id":"meeting-1","path":"meeting.txt","uri":"export:meeting-1",
   "permissions":"demo team only","date":"2026-10-10","revision":"unknown"}
]}
```

The reader emits JSON to stdout and writes nothing. Persist it only in an authorized target context
home. Output retains metadata, SHA256 snapshot revision, observed file modification time and numbered
exact lines, including any speaker/timestamps in those lines. Missing original metadata is not
reconstructed. A local hash proves snapshot identity, not provider freshness or permission validity.

`--offset` resumes at a manifest entry, `--limit` bounds files per batch, `--max-bytes` bounds aggregate
input, and `--max-lines` bounds returned lines. The receipt lists read/skipped IDs and a `next_offset`.
If a byte/line bound interrupts a file, that source is skipped or marked truncated; do not claim it was
fully searched. Use a narrower query or a separately authorized larger bound to revisit it. Checkpoint
manifest hash and query with the offset; if the manifest changes, restart or reconcile IDs/hashes.
No-match output is only a literal-search result, not proof that evidence does not exist.
A topic word can miss the very line containing agreement. Try competing terms and inspect surrounding
context or a bounded complete read of selected small files before assigning decision authority.

For large collections select a scoped manifest/batch using the existing index first. Exports can lose
ACLs, revision history or transcript detail; record those gaps and require owner confirmation of
scope. Do not place private exports or packets in shared skills, installer payloads or public PRs.
