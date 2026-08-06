# 🍽️ Restaurant Ordering Backend

A lightweight Express.js REST API powering a restaurant ordering platform — dishes, tables, locations, carts, orders, and users, backed by MySQL.

## ✨ Features

- 🥘 **Dishes** — browse the full menu or filter by cuisine (Indian, Italian, Mexican, Chinese, Korean, Japanese)
- 🛒 **Cart** — manage active shopping carts and cart items
- 📦 **Orders** — track orders with payment and delivery status
- 🍽️ **Tables** — restaurant table inventory (Silver / Gold / VIP)
- 📍 **Locations** — delivery zones with distance, charge, and ETA
- 👤 **Users** — user accounts with OTP-based verification
- 🗄️ **Auto-provisioned schema** — MySQL tables are created automatically on server startup

## 🧱 Tech Stack

| Layer     | Technology            |
|-----------|------------------------|
| Runtime   | Node.js (ESM) / [Bun](https://bun.sh) |
| Framework | Express.js             |
| Database  | MySQL (`mysql2`)       |
| Config    | `dotenv`                |

> Note: `mongoose` is listed as a dependency but the app currently connects only to MySQL via `mysql2`.

