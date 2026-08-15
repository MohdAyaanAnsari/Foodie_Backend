import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



import initializeDatabase from "./schema/index.js";
import db from "./config/db.js";

import UserRoutes from "./routes/users.routes.js";
import DishesRoutes from "./routes/dishes.routes.js";
import tableRoutes from "./routes/tables.routes.js";
import locationRoutes from "./routes/locations.routes.js";
import ordersRoutes from "./routes/orders.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import authRoutes from "./routes/auth.routes.js";
import catRoutes from "./routes/cat.routes.js";

dotenv.config();
const PORT = process.env.PORT;


const app = express();
app.use(express.json());

app.use(cors({
  origin: process.env.FrontEndUrl,
  credentials: true,
}));

app.get("/", (req, res) => {
    res.send("Server is Running");
});

app.use("/images", express.static(path.join(__dirname, "..", "public")));


app.use("/api/users", UserRoutes);
app.use("/api/dishes", DishesRoutes);
app.use("/api/tables", tableRoutes);
app.use("/api/locations", locationRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/categories", catRoutes);

try{
    const connection = await db.getConnection();
    console.log("Database Connected");
    connection.release();
}catch(err){
    console.error("Database Connection Failed", err);
}

await initializeDatabase();

app.listen(PORT, () => {
    console.log("Server is Running on", PORT);
    console.log("Serving static from:", path.join(__dirname, "public"));
})
