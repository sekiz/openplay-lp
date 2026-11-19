---
title: "Client or server? The BFF pattern for web games"
description: "What a backend-for-frontend is, which game actions belong in the browser and which on your server, and how to keep API keys out of client code."
pubDate: 2026-11-19
tags: ["TypeScript", "Web games", "Security"]
order: 8
takeaways:
  - "Anything shipped to the browser can be read and changed by the player, including API keys."
  - "A backend-for-frontend (BFF) is a small server you control that holds the secrets and performs privileged actions."
  - "Keep sign-in and reads on the client; put grants, purchases and anything that changes value behind the BFF."
faq:
  - q: "What is the BFF pattern?"
    a: "BFF stands for backend-for-frontend. It is a thin server layer written for one client application. The client calls the BFF, and the BFF calls other services with credentials the client never sees."
  - q: "Can I put a game backend API key in a web game?"
    a: "No. Any key in browser code can be extracted. Keep privileged keys on a server and give the browser only a player session."
  - q: "Do I need a BFF for a single-player web game?"
    a: "Not for sign-in, reads and cloud saves done with a player session. You need one as soon as an action grants value, such as rewards or purchases."
---

A web game runs in the least trusted environment there is: a browser the player fully controls. The **BFF pattern**, short for backend-for-frontend, is how you keep the important decisions somewhere the player cannot reach.

## The problem with doing everything in the client

JavaScript sent to the browser is public. A player can read it, pause it and call your functions with their own arguments. That has two consequences.

- **Secrets leak.** An API key in client code is an API key on the internet.
- **Rules are optional.** If the client calls "grant reward", so can the player, as often as they like.

## What a BFF is

A BFF is a small server that belongs to your game. The browser talks to it, and it talks to the game backend using credentials that never leave the server.

1. The player signs in and the browser holds a **player session**.
2. For a privileged action, the browser calls your BFF with that session.
3. The BFF verifies the session and checks the game rule.
4. The BFF calls the backend with its **API key** and returns the result.

## Which side does what

| Action | Where it runs | Why |
|---|---|---|
| Guest sign-in, account linking | Client | Uses only the player's own session. |
| Reading profile, inventory, leaderboard | Client | Read-only for the signed-in player. |
| Writing a cloud save | Client | The player's own progress. |
| Granting a reward or item | BFF | Creates value. |
| Verifying a purchase | BFF | Needs platform and API secrets. |
| Submitting a contest score | BFF | Needs validation. |

A useful test: if a cheater would enjoy calling it a thousand times, it belongs behind the BFF.

## Practical notes

- **Verify the session on every BFF request.** Do not trust a player ID sent in the body.
- **Protect state-changing routes against CSRF** when you use cookies.
- **Make grant routes idempotent,** so a retried request does not pay twice.
- **Rate-limit the BFF** per player.

The BFF can be a few serverless functions. It does not need to be a second backend.

## Where OpenPlay fits

OpenPlay's TypeScript SDK is designed for this split: sign-in and reads in the client, privileged actions from your server. The developer documentation includes a BFF guide, along with notes on API keys, session verification, CSRF, idempotency and rate limits.
