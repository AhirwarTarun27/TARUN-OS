# SignalR — the server speaking first

Used by: [bullet 2](../dwellworks/02-realtime-dashboard.md)

## The one line

**Normal HTTP: the browser asks, the server answers. SignalR: the server can speak first.**

```
POLLING (without it)                  SIGNALR
────────────────────                  ───────
Browser: "any updates?"  →            Browser opens a connection ═══════╗
Server:  "no"            ←                                              ║
Browser: "any updates?"  →            Server: "order 42 changed" ←──────╢
Server:  "no"            ←            Server: "order 17 changed" ←──────╢
Browser: "any updates?"  →            Server: "order 88 changed" ←──────╢
Server:  "yes, order 42" ←
  (asking over and over,                (pipe stays open, server pushes
   mostly wasted requests)                the moment something happens)
```

SignalR is **Microsoft's library** for that open pipe. It **negotiates the transport** — WebSockets
when available, silently falling back to older techniques when not.

**Why that fallback matters here:** the users sit behind corporate proxies that block raw WebSockets.
That is also the answer to *"why SignalR and not plain WebSockets?"* — plus it is a .NET shop.

## The flow in Odin

```
.NET server                        React dashboard
───────────                        ───────────────
an order changes
      │
      ▼
controlTowerHub  ═══════════▶  "UpdateControlTower" arrives
   (SignalR)                            │
                                        ▼
                                dispatch(updateControlTower(data))
                                        │
                                        ▼
                                  Redux store updates
                                        │
                                        ▼
                                  that row re-renders. No refresh.
```

Registered by **`programManagerId`**. It serves **program managers** — not consultants, not families.
This is the single most catchable error on the whole project.

## Why Redux here and not local state

Data pushed from **outside the component tree** has to land somewhere many components read. A store
with actions and effects is the right shape for that. Most other screens in Odin use plain hooks —
Redux is not the default, it is the answer to this specific problem.

## The question they are actually testing

> *"What happens to updates you miss while disconnected?"*

SignalR does **not replay** missed messages. Anything pushed while you were down is gone forever.

```
connection drops
      │
      ├─ dispatch(controlTowerDisconnected(true)) → UI shows a banner
      │     ("your data is stale" beats a frozen screen that looks live)
      │
      ▼
reconnects (withAutomaticReconnect)
      │
      ├─ re-register the user
      └─ refetch the FULL order list   ← resync from source of truth
```

The line: *"the push channel is an optimization on top of a REST fetch that is always the source of
truth. It costs one request per reconnect and the dashboard can never silently drift."*

## The `off()` detail — the one that proves authorship

The bug it prevents: binding a new handler on every render without removing the old one.

```
render 1:   bind("UpdateControlTower", A)     handlers = [A]
render 2:   bind("UpdateControlTower", B)     handlers = [A, B]     ← A never left
render 3:   bind("UpdateControlTower", C)     handlers = [A, B, C]

Server sends ONE message
        ↓
   A fires → dispatch
   B fires → dispatch      3 store updates, 3 re-renders,
   C fires → dispatch      for a single message
```

The fix — remove-then-add:

```
render 2:   off("UpdateControlTower")         ← clear whatever is registered
            bind("UpdateControlTower", B)     handlers = [B]   ← always exactly one
```

That is what `_upsertCallbacks` means: **up**date-or-in**sert**.

**Why it is a senior detail:** nothing throws. No error appears. The app quietly does N× the work and
gets worse the longer the tab stays open. Catching a *silent* bug class is worth more than catching a
loud one.

## The boundary

**You did not write the .NET hub.** You consumed it. Say that out loud before they ask.
