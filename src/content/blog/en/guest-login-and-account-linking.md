---
title: "Guest login first: player accounts that do not lose players"
description: "Why a sign-up form at launch costs you players, how guest sign-in and account linking work, and the edge cases to handle before release."
pubDate: 2026-11-19
tags: ["Player accounts", "Authentication"]
order: 4
takeaways:
  - "Let players start as guests; ask for an account only when they have something worth keeping."
  - "Account linking attaches a permanent identity to the existing guest record, so progress is never copied or lost."
  - "Decide the conflict rule before launch: what happens when the account being linked already has a save."
faq:
  - q: "What is guest login in a game?"
    a: "Guest login creates a player record automatically on first launch, without a form. The player gets an identity tied to the device and can play immediately."
  - q: "What is account linking?"
    a: "Account linking connects a guest player to a permanent sign-in method such as email, OAuth or Google. The player ID stays the same, so inventory, characters and saves stay attached."
  - q: "What happens if a guest uninstalls the game?"
    a: "An unlinked guest usually loses access, because the identity lived on the device. This is the main reason to prompt for linking at a meaningful moment."
---

The fastest way to lose a new player is to show a registration form before the first minute of play. **Guest login** removes that form. **Account linking** makes sure the player can keep what they earn. Together they are the default identity flow for modern games.

## How the flow works

1. **First launch.** The game asks the backend for a guest player. The backend creates a record and returns a player ID and a session.
2. **Play.** Characters, progress and inventory attach to that player ID.
3. **A reason to stay.** After a milestone, the game offers to protect the progress.
4. **Link.** The player signs in with email, OAuth or Google. The backend attaches that sign-in to the *same* player record.
5. **Return.** On a new device the player signs in and gets the same ID, and so the same data.

The important detail is step 4. Linking does not create a second account and copy data across. It adds a credential to the record that already exists.

## When to ask

Ask at a moment when the player has something to lose:

- after finishing the tutorial or the first stage,
- after earning a rare item,
- before a purchase.

A prompt tied to progress reads as a service. A prompt on the title screen reads as a toll.

## Edge cases to settle before launch

| Case | What to decide |
|---|---|
| The account being linked already has a save | Which one wins, or whether the player chooses. |
| The player signs out | Whether the device keeps a guest identity or returns to a clean start. |
| Account deletion | What is removed, and how the player requests it. |
| Several devices | How sessions are listed and revoked. |

## Keep verification on the server

A session token proves who the player is only if your server checks it. Web games should verify sessions server-side and protect state-changing requests against CSRF. Treat the client as a display, not as a witness.

## Where OpenPlay fits

OpenPlay supports guest sign-in, email and password, OAuth and Google sign-in, account linking and deletion, and session management. In the studio panel each player shows the account history, characters and cloud saves on one profile, so support can see what a player linked and when.
