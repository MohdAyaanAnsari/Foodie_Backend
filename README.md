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

## 📁 Project Structure

```
src/
├── config/
│   └── db.js               # MySQL connection pool
├── schema/                 # Table definitions & auto-migration
│   ├── users.schema.js
│   ├── dishes.schema.js
│   ├── locations.schema.js
│   ├── tables.schema.js
│   ├── orders.schema.js
│   ├── orderItems.schema.js
│   ├── cart.schema.js
│   ├── cartItems.schema.js
│   └── index.js             # Runs all schema initializers
├── controllers/             # Request handlers
├── services/                # Business logic / DB queries
├── routes/                  # Express route definitions
└── server.js                 # App entry point
```
## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (or [Bun](https://bun.sh))
- A running MySQL server

### 1. Install dependencies

```bash
npm install
# or
bun install
```

### 2. Configure environment variables

Create a `.env` file in the project root:

```env
PORT=3000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=restaurant_db
```


