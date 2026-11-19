---
title: "Cloud saves done right: what to store, and what to do when saves disagree"
description: "A practical guide to cloud saves: save data design, versioning, conflict rules between devices and the mistakes that corrupt player progress."
pubDate: 2026-11-19
tags: ["Cloud save", "Player progress"]
order: 5
takeaways:
  - "Save player decisions and progress, not everything in memory; small saves sync faster and break less."
  - "Put a version number in every save from the first build."
  - "Pick a conflict rule on purpose: newest wins, furthest progress wins, or ask the player."
faq:
  - q: "What is a cloud save?"
    a: "A cloud save stores a player's progress on a server, tied to their account, so it can be restored on another device or after a reinstall."
  - q: "How do I handle cloud save conflicts?"
    a: "Compare the device save and the server save when the game starts. Apply one rule consistently: keep the newest, keep the one with more progress, or let the player choose when the difference is large."
  - q: "How often should a game save to the cloud?"
    a: "Save at meaningful points such as finishing a stage or closing a menu, and on pause or exit. Saving on a short timer wastes requests and increases conflicts."
---

A **cloud save** is a copy of a player's progress stored on a server and tied to their account. It sounds like a file upload. In practice it is a small synchronization problem, and most save bugs come from ignoring that.

## Decide what belongs in the save

Store what the player would be upset to lose, and nothing you can rebuild.

- **Store:** completed stages, unlocked content, settings, character state, choices.
- **Do not store:** cached assets, derived values, anything the server already owns.

Currencies and inventory are a special case. If they have real value, the server's economy records are the truth and the save file should not be able to overwrite them.

## Version every save

Add a `version` field in your first build. When the format changes, write a migration from each old version to the next. Without the field you are guessing which shape a file has, and a wrong guess corrupts a player's progress.

## Choose a conflict rule

Conflicts appear when the same player uses two devices, or plays offline and reconnects.

| Rule | Works well when | Risk |
|---|---|---|
| Newest wins | Sessions are short and online | An older device with a wrong clock can overwrite progress. |
| Furthest progress wins | Progress is a clear number | Side choices on the losing save are dropped. |
| Ask the player | Saves differ a lot | One more screen to design. |

Use **server time**, not the device clock, to decide which save is newer.

## Save at the right moments

Write on events that mean something: stage complete, purchase done, settings closed, app paused. Add a slot for automatic saves and keep manual saves separate, so an autosave never replaces a deliberate one.

## Test the unhappy paths

1. Play on device A, then open device B without closing A.
2. Play offline for an hour, then reconnect.
3. Load a save made by the previous build.
4. Kill the app in the middle of a save.

If all four leave the player with sensible progress, your saves are in good shape.

## Where OpenPlay fits

OpenPlay stores cloud saves per player, alongside characters, and shows each save in the studio panel with its size, time and the platforms that wrote it. It also exposes server time, so conflict rules do not depend on a device clock.
