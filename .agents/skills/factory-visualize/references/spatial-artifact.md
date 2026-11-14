# Spatial artifact recipe

Use the self-contained SVG/HTML template as an authoring helper inside the required
[Lavish workflow](../../../../docs/LAVISH.md). Existing team diagrams can be source material;
the human-facing factory artifact is authored and reviewed through Lavish. Fetch current CLI
guidance before generating HTML; without it, retain research/Markdown/model drafts and name
the blocked visual step rather than invoking this helper as a fallback. It needs Node.js to generate files and a desktop browser
to explore them; it fetches no scripts and requires no database, server API or account.

Run from the canonical skill directory (resolve this location from the actual installed skill):

```sh
node scripts/render.mjs /absolute/model.json /absolute/output/map
```

This produces `map.md` and `map.html`. Existing output is refused unless `--replace` is supplied.
The example at `assets/example.json` is synthetic input for testing the template. Replace it with
the actual spec and evidence before presenting a project as implemented. Keep generated files
with the team's existing artifacts. Do not host a new service just to display a document.

The model has `title`, `overview`, `spec` with `path` and `revision`, and an ordered `views` array.
The first view is the overview. Each view has a stable `id`, `title`, optional `boundary`, `nodes`
and `edges`. Each node has `id`, `title`, `kind`, `x`, `y`, `details` and optional `source` and
`opens` (another view ID). Edge fields are `from`, `to`, `label` and optional `condition`.
Use `kind` such as person, system, container, component, action or state for accurate meaning.
Every edge names what moves or what triggers the transition. Node details should explain the
responsibility, interface and uncertainties appropriate to the actual question, not invent facts.

Use [C4 zoom levels](https://c4model.com/diagrams) to separate context, containers and components.
A [C4 container](https://c4model.com/diagrams/container) is an application or data store;
process stages and organizational groups need their own names. Flow and state views complement
structural maps; they answer behavior and lifecycle questions rather than pretend to be C4 levels.

Selecting a node opens details and its source. Selecting a connection reveals its direction,
condition and controls to follow either endpoint. A boundary groups all nodes in that view;
put external actors in a separate context view rather than inside an internal boundary. The Open button enters a nested view; Back returns.
Drag nodes to arrange the map; drag background to pan; use zoom/fit controls. Arrow keys move the
focused node; Enter selects it. Local browser storage retains only layout, separately from the
embedded model. Layout reset removes it. These controls convey no product approval or spec edit.
Source strings are never executed as commands. Replacing the model/revision gives a separate
layout key. File-browser storage may be unavailable; the canvas still works within the page.

The renderer generates Markdown containing the model's overview, boundaries, node details and
relationships, and embeds its hash in the HTML. This is a draft view of the referenced spec;
only actual scoped owner feedback can change that spec. Keep detailed product evidence in its
canonical home and link it from the relevant node rather than duplicate the whole corpus.

Verify selection, drag, zoom, drill-down/back, reset, source links and keyboard navigation inside
Lavish as well as directly. The sandbox may disable storage; layout persistence needs its own
receipt and is not guaranteed by a standalone browser check. Check
that changing layout does not change the embedded model or create an acceptance record. Rebuild
both outputs after semantic edits. If an established visual tool handles comments or decisions,
verify its actual delivery path; this offline template does not submit feedback anywhere.

The template starts Lavish in Explore mode so dragging and selection remain interactions.
The reviewer can switch the Lavish toolbar to Annotate; do not add a separate annotation UI
or mistake this default for removal of Lavish feedback. Verify the toolbar in the actual shell.
