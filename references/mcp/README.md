# Local MCP reference files

Token-saving cache. Instead of calling a live doc-reference MCP every session (protocol overhead + unpredictable response sizes), we research the resource that MCP points at **once** and store everything here as plain markdown. Future sessions read the local file — far fewer tokens, and the docs barely change anyway.

## What lives here

One file per source, named `<tool-name>.md` (e.g. `astro-docs.md`). Each file captures what the MCP would have surfaced: the functions/endpoints, params, key APIs, and usage patterns — enough that an agent can build without the live call.

## What does NOT live here

- **Playwright** — browser verification can't be cached. Use the live MCP.
- **Action MCPs** (GitHub, databases, filesystem — anything that *executes*). A markdown file can't run a command, so these stay installed as real MCPs at least-privilege scope.

This folder is only for **read-only doc-reference** sources.

## Creating a file

Triggered when the user approves a doc-reference MCP (in this repo or via `/explore-project` → `/setup-kit`). Research the resource thoroughly, then write `<tool-name>.md`.

## Updating a file

These are NOT auto-refreshed — the underlying docs change rarely. To refresh, the user says **"update the `<tool-name>` reference"**; re-research and overwrite that file.
