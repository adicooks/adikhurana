# Archive

Components and pages retired from the live site during the July 2026 cleanup,
kept here (outside `src/`, so they are not compiled, type-checked, or shipped)
in case they come back later.

- `components/Modal.svelte` — the old edit-card modal (was wired to `onEdit`/`cardContent` in the homepage).
- `components/Trail.svelte` — unused cursor-trail component.
- `components/ForKidsByKidsCard.svelte` — unused card.
- `components/cards/GalaxyCard.svelte` — card that was commented out on the homepage.
- `components/cards/HindiCard.svelte` — unused card.
- `components/Cursor.original.svelte` — pre-cleanup Cursor with the commented-out experiments.
- `+page.original.svelte` — pre-cleanup homepage with the `cardContent`/edit-modal plumbing.

To restore one, move it back under `src/lib/components/` and update its
imports to the current `Card.svelte` API (`href`/`onClick`/`label` props) and
`DetailModal.svelte`.
