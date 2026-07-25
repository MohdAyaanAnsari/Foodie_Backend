import express from "express";
import dotenv from "dotenv";

import initializeDatabase from "./schema/index.js";
import db from "./config/db.js";

import UserRoutes from "./routes/users.routes.js";
import DishesRoutes from "./routes/dishes.routes.js";

dotenv.config();
const PORT = process.env.PORT;


const app = express();
app.use(express.json());




app.get("/", (req, res) => {
    res.send("Server is Running");
});

app.use("/api/users", UserRoutes);
app.use("/api/dishes/", DishesRoutes);

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
})