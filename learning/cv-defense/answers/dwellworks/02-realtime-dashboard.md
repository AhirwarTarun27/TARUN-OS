# Bullet 2 — the real-time operations dashboard

> *"Built a real-time operations dashboard on Redux and SignalR with auto-reconnect and state recovery,
> tracking every active relocation."*

**Grounding:** kb `dwellworks/03` §6 · **Colour:** frontend 🟢 / .NET hub 🔴
**Concepts:** [SignalR](../concepts/signalr.md)

## Say this

```
"I built the Control Tower — a live ops dashboard for program managers. Every active
relocation is a row that updates without a refresh. It has its own Redux store because
data pushed from outside the component tree has to land somewhere many components read.
SignalR comes in through a higher-order component that owns the connection lifecycle:
auto-reconnect, and a disconnected flag that puts a banner in the UI so the operator
knows the data is stale instead of trusting a frozen screen."
```

## Lead with the product value, not the widget

**Service Radar** buckets every program into **sad / happy / on-hold / unknown** with live counts and
percentages, each click-to-filter.

> A program manager opens one screen and sees **which moves need attention today**, instead of reading
> a table of 200 orders.

## Follow-ups they will ask

| They ask | I say |
|---|---|
| **What happens to updates missed while disconnected?** ← *the one they're testing* | SignalR doesn't replay. On reconnect I re-register and **refetch the full list** — the push channel is an optimization on top of a REST fetch that's always the source of truth |
| Why Redux here and not local state? | Data pushed from outside the tree has to land where many components read it. Most other Odin screens use plain hooks — Redux isn't the default here, it's the answer to this problem |
| How do you avoid duplicate handlers? | `off()` before re-binding. Without it every render stacks another handler and one message dispatches N times → [detail](../concepts/signalr.md) |
| Why SignalR over raw WebSockets or polling? | It's a .NET shop, and SignalR negotiates transport with automatic fallback — which matters when users are behind corporate proxies that block WebSockets |
| How does the user know data is stale? | `controlTowerDisconnected(true)` on both `onreconnecting` and `onclose` → a banner. **For an ops dashboard, silently-stale data is worse than a visible error** — a frozen screen that looks live is the dangerous state |

## The boundary

> *"I consumed the hub; I didn't write the .NET side of it."*

## Never get wrong

- It serves **program managers**. Registered by `programManagerId`.
  **Not consultants. Not families. Not messaging.** ← the most catchable error on this project
- Hub = `controlTowerHub`, event = `UpdateControlTower`
- Transferee notifications are **polling**, not SignalR
- Two Redux stores exist: `order-dashboard` (thunk) and the main store (redux-form)

## Open item — verify before an interview

`project-knowledge-base/dwellworks/00-product-context.md` §9 flags that *"order dashboard ← Stats"*
may attribute part of this surface to a service you did not write. **Check §9 and settle it** before
this bullet goes into a real round.
