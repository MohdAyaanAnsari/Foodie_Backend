import db from "../config/db.js";

const getAllDishes = async ()=> {
    const [dishes] = await db.query("SELECT* From dishes");
    return dishes;
}

export default {
    getAllDishes,
};