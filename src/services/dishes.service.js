import db from "../config/db.js";

const getAllDishes = async () => {
  const { rows: dishes } = await db.query("SELECT * FROM dishes");
  return dishes;
};

// 'Indian','Italian','Mexican','Chinese','Korean','Japanese'

const getIndianDishes = async () => {
  const { rows: dishes } = await db.query(
    "SELECT * FROM dishes WHERE category = $1",
    ["Indian"]
  );
  return dishes;
};

const getItalianDishes = async () => {
  const { rows: dishes } = await db.query(
    "SELECT * FROM dishes WHERE category = $1",
    ["Italian"]
  );
  return dishes;
};

const getMexicanDishes = async () => {
  const { rows: dishes } = await db.query(
    "SELECT * FROM dishes WHERE category = $1",
    ["Mexican"]
  );
  return dishes;
};

const getChineseDishes = async () => {
  const { rows: dishes } = await db.query(
    "SELECT * FROM dishes WHERE category = $1",
    ["Chinese"]
  );
  return dishes;
};

const getKoreanDishes = async () => {
  const { rows: dishes } = await db.query(
    "SELECT * FROM dishes WHERE category = $1",
    ["Korean"]
  );
  return dishes;
};

const getJapaneseDishes = async () => {
  const { rows: dishes } = await db.query(
    "SELECT * FROM dishes WHERE category = $1",
    ["Japanese"]
  );
  return dishes;
};

export default {
  getAllDishes,
  getIndianDishes,
  getItalianDishes,
  getMexicanDishes,
  getChineseDishes,
  getKoreanDishes,
  getJapaneseDishes,
};