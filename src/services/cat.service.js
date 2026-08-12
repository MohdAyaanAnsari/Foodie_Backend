import db from "../config/db.js";

const getDishesCategories = async () => {
  const [rows] = await db.execute(`
    SHOW COLUMNS FROM dishes LIKE 'category'
  `);

  const categories = rows[0].Type
    .match(/enum\((.*)\)/)[1]
    .split(",")
    .map(value => value.replace(/'/g, "").trim());

//   console.log(categories);

  return categories;
};

export default {
    getDishesCategories,
}