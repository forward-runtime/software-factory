# Reviewable document changes


Whenever a factory agent creates or edits a prose document, keep the canonical text in a
`.md` file and create or update a companion `.html` file with the same basename. Deliver
both in the same change so the owner can read the source and inspect the rendered revision.

Highlight changed text in the HTML with a pastel mustard background (`#f0dda0`), inline behind
the text, preserving readable contrast. Highlight only the additions and changed passages against
the agreed base revision; keep unchanged context readable. Describe meaningful removals separately
when needed.

**A first version carries no highlights at all.** Highlighting marks what changed against a
previous version, so a new document has nothing to mark and ships clean. Marking every line marks
nothing.

Keep the rendered page free of decoration: no legend, no baseline note, no hash footnote, no
eyebrow label or subtitle, and no instructions for obvious controls. Record the baseline revision
and source hash in HTML metadata instead, where a reviewer can find them without the reader having
to read past them.

Keep Markdown authoritative. The HTML must show the same current text; it cannot silently
add requirements, decisions or evidence. Regenerate the companion after a Markdown edit and
check both for consistency. Keep links usable and verify the desktop rendering before sharing.
Follow the factory's existing HTML/Lavish review and feedback process when available.

Apply the pairing to specifications, reference docs, explanations and saved work records.
Machine configuration remains in its native format. Executable prompts may also receive a
companion for review; the runtime continues to read their Markdown source.

This presentation rule does not change approval or release authority. Highlights identify
text changes; they do not mean the owner approved the content. Record actual alignment in
the work record, with the reviewed document version and source of the owner's decision.
