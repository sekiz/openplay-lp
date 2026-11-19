---
title: "What a game backend actually does, and when you need one"
description: "A plain-language map of game backend services: accounts, cloud saves, economy, leaderboards and real-time. Learn which ones your game needs first."
pubDate: 2026-11-19
tags: ["Fundamentals", "Game backend"]
order: 1
takeaways:
  - "A game backend is the set of server-side services that remember players and enforce rules: accounts, saves, economy, leaderboards and real-time messaging."
  - "You need one the moment something must survive a reinstall, be shared between players, or be protected from tampering."
  - "Start with accounts and cloud saves; add economy and social features when your design calls for them."
faq:
  - q: "What is a game backend?"
    a: "A game backend is the server-side software that stores player data and enforces game rules outside the player's device. It usually covers accounts, cloud saves, inventory and currencies, leaderboards, and real-time features such as chat."
  - q: "Does a single-player game need a backend?"
    a: "Only if progress must follow the player across devices, or if you sell items or run leaderboards. A purely offline game with local saves can ship without one."
  - q: "What should I build first?"
    a: "Player accounts with guest sign-in, then cloud saves. Everything else, from inventory to leaderboards, hangs off a stable player identity."
---

A **game backend** is the part of your game that does not run on the player's device. It remembers who the player is, what they own and how far they got, and it applies the rules you cannot trust the client to apply. This guide maps the pieces and helps you decide which ones your game needs now.

## The five jobs of a game backend

Almost every backend feature falls into one of five jobs.

1. **Identity.** Who is this player? Guest sign-in, email or OAuth accounts, sessions, and linking a guest to a permanent account.
2. **Persistence.** What should survive a reinstall? Characters, progress and cloud saves.
3. **Economy.** What does the player own? Items, inventory, currencies, a store, purchases and rewards.
4. **Competition and community.** How do players meet? Leaderboards, contests, chat and notifications.
5. **Live control.** What can you change without shipping a build? Game rules, content groups, server time and scheduled events.

A studio panel sits on top of all five, so your team can look up a player, grant an item or fix a balance without writing a query.

## When you need one

Use this test. You need a backend as soon as any of these is true:

- **It must survive a reinstall.** Progress stored only on the device is lost with the device.
- **It is shared.** A leaderboard or a chat channel only exists between players.
- **It is worth cheating.** If a value can be sold, traded or ranked, the client cannot be the one that decides it.

A jam game with local saves passes none of these, and that is fine. A mobile game with a soft currency passes all three on day one.

## What to build first

Order matters, because later systems depend on earlier ones.

| Step | Service | Why it comes here |
|---|---|---|
| 1 | Guest sign-in and accounts | Every other record needs a player to belong to. |
| 2 | Cloud save | The first thing players notice when it is missing. |
| 3 | Inventory and currencies | Needed before any store or reward. |
| 4 | Leaderboards and contests | Cheap to add once identity is solid. |
| 5 | Real-time features | The most demanding to run; add when the design needs them. |

## Where OpenPlay fits

OpenPlay covers these jobs as one platform: player accounts, cloud saves, items and economy, leaderboards, chat, notifications and real-time services, managed from a single studio panel. You connect a game with the Unity or TypeScript SDK and see the first player in the panel. The rest of this blog goes one level deeper into each job.
