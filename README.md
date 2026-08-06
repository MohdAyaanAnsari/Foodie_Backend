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

### 3. Run the server

```bash
npm run dev
# or
npm start
```

On startup, the server connects to MySQL and automatically creates any missing tables (`users`, `dishes`, `locations`, `restaurant_tables`, `orders`, `order_items`, `carts`, `cart_items`).

The API will be available at `http://localhost:<PORT>`.

## 📡 API Reference

Base URL: `http://localhost:<PORT>/api`

| Method | Endpoint                        | Description                    |
|--------|----------------------------------|---------------------------------|
| GET    | `/users/AllUsers`                | List all users                 |
| GET    | `/dishes/AllDishes`              | List all dishes                |
| GET    | `/dishes/IndianDishes`           | List Indian dishes             |
| GET    | `/dishes/ItalianDishes`          | List Italian dishes            |
| GET    | `/dishes/MexicanDishes`          | List Mexican dishes            |
| GET    | `/dishes/ChineseDishes`          | List Chinese dishes            |
| GET    | `/dishes/KoreanDishes`           | List Korean dishes             |
| GET    | `/dishes/JapaneseDishes`         | List Japanese dishes           |
| GET    | `/tables/AllTables`              | List all restaurant tables     |
| GET    | `/locations/AllLocations`        | List all delivery locations    |
| GET    | `/orders/AllORders`              | List all orders                |
| GET    | `/carts/AllCarts`                | List all carts                 |

All endpoints return a consistent JSON shape:

```json
{
  "success": true,
  "data": []
}
```

## 🗃️ Database Schema Overview

- **users** — name, mobile, email, dob, otp
- **dishes** — name, description, price, discount, category, food_type, cook_time, image_url, availability
- **locations** — name, distance_km, estimated_delivery_time, delivery_charge, availability
- **restaurant_tables** — table_number, seats, type (Silver/Gold/VIP), availability
- **orders** — user, location, total_price, discount, final_price, payment_status, order_status
- **order_items** — order, dish, quantity, price
- **carts** — user, status (Active/Checked Out/Abandoned)
- **cart_items** — cart, dish, quantity, unit_price

Foreign keys enforce referential integrity across orders, carts, and their line items.


