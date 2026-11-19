---
title: "Leaderboards that hold up on launch day"
description: "Design choices that keep a leaderboard fair and fast: score submission, time windows, tie rules, and how to handle suspicious scores."
pubDate: 2026-11-19
tags: ["Leaderboards", "Contests"]
order: 7
takeaways:
  - "Never accept a final score from the client without a check; submit the facts and let the server compute or validate the score."
  - "Time-boxed boards and contests give new players a reachable target."
  - "Show each player their own rank and the ranks around them, not only the top ten."
faq:
  - q: "How do I stop cheating on a game leaderboard?"
    a: "Validate scores on the server against what is possible in the game, tie each score to an authenticated player, and review outliers before they appear publicly."
  - q: "What is the difference between a leaderboard and a contest?"
    a: "A leaderboard ranks players by a score. A contest is a leaderboard with a start and an end, and usually rewards for final positions."
  - q: "How should ties be ranked?"
    a: "Pick one rule and document it. The common choice is that the player who reached the score first ranks higher."
---

A leaderboard is the simplest social feature to describe and one of the easiest to get wrong. Players check it within minutes of launch, and a board topped by impossible scores tells them the game is not worth competing in.

## Do not trust a submitted score

The client should not send "my score is 17,105" and have it stored as is. Two safer patterns:

- **Server computes.** The game sends the facts of the run and the server derives the score.
- **Server validates.** The game sends a score and the server checks it against limits: maximum points per second, stage length, items held.

Either way, the score is tied to an authenticated player and a session.

## Use time windows

An all-time board is decided in the first week. Add boards that reset:

| Board | Purpose |
|---|---|
| Daily or weekly | Gives every player a fresh chance. |
| Contest with fixed dates | Creates an event, with rewards for final positions. |
| All-time | Recognition for long-term players. |

A contest is a leaderboard with a start, an end and rewards. Use server time for both ends.

## Decide the rules players will ask about

1. **Ties.** Usually the earlier score ranks higher.
2. **Best or latest.** Most boards keep each player's best score.
3. **One entry per player.** Otherwise the top ten is one person.

Write the rules down in the game. Disputes are shorter when the rule is visible.

## Show the player where they stand

The top ten matters to ten people. Everyone else wants their own rank, the players just above them and how far the next place is. "You moved from 5th to 3rd" is a better notification than "The leaderboard has been updated."

## Handle suspicious scores quietly

Flag outliers for review instead of deleting them on sight. Hold a flagged score back from the public board until someone checks it. Keep the evidence, because the player may write in.

## Where OpenPlay fits

OpenPlay includes leaderboards and contests, with chat and notifications that use the same player record, so a rank change can reach the player's phone. The studio panel shows a contest's standings as they change, and the real-time guides cover connection, reconnection and limits.
