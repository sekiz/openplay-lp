---
title: "A game economy your server can trust"
description: "How to design items, currencies, rewards and purchases so players cannot mint value, and so every balance change can be explained."
pubDate: 2026-11-19
tags: ["Game economy", "Inventory"]
order: 6
takeaways:
  - "The client may request a change; only the server applies it."
  - "Define each item once and reference it everywhere, so a reward, a store offer and an inventory row point at the same record."
  - "Record every balance change with a reason, and make grant requests idempotent so retries cannot pay twice."
faq:
  - q: "What does server-authoritative economy mean?"
    a: "It means the server, not the game client, decides every change to currencies and inventory. The client asks for an action and displays the result."
  - q: "What is idempotency and why does it matter for rewards?"
    a: "An idempotent request has the same effect whether it is sent once or several times. Without it, a network retry can grant the same reward twice."
  - q: "How should in-app purchases be handled?"
    a: "Verify the purchase receipt on your server with the platform before adding anything to the player's balance. Never credit a purchase based on the client's word."
---

A game economy is a ledger. Players earn, spend and own things, and the numbers have to add up. The design rule that keeps them adding up is short: **the client asks, the server decides.**

## Model the pieces separately

Four concepts get mixed up in early prototypes. Keep them apart.

- **Catalog.** The definition of each item: name, type, rarity, whether it stacks.
- **Inventory.** Which items a specific player holds, and how many.
- **Currencies and balance.** Numbers the player earns and spends, with a history.
- **Store and purchases.** Offers that exchange currency or real money for items.

Define an item once in the catalog. A reward, a store offer and an inventory row should all reference that record. Then renaming an item or fixing its rarity happens in one place.

## Follow one item end to end

Take a rally game. A player finishes the coast stage.

1. The game tells the server the stage is complete.
2. The server checks the reward rule: one Sprint badge and 120 coins, once per player.
3. The server adds the badge to the inventory and credits the balance from 1,250 to 1,370.
4. The server records why: *reward, coast stage finish*.
5. The client shows the result.

At no point does the client say "add 120 coins". It reports an event, and the rule lives on the server.

## Make every grant safe to retry

Mobile networks drop responses. The client retries, and a naive server pays twice. Give each grant request a unique key and have the server ignore a key it has already processed. This property is called **idempotency**, and it is the cheapest fraud prevention you will ever add.

## Verify purchases on the server

For in-app purchases, send the receipt to your server, verify it with the platform, and only then credit the balance. Log the verification next to the balance change.

## Keep a readable ledger

Every change should answer three questions: what changed, by how much, and why. When a player writes to support, you want to read their history, not reconstruct it.

## Where OpenPlay fits

OpenPlay provides an item catalog, player inventory, currencies and balances, a store, in-app purchase handling and rewards. The studio panel shows the same item in the catalog, in the reward that grants it and in a player's inventory, with the reason for each balance change. Privileged actions belong on your server, which is what the BFF pattern in the developer guides describes.
