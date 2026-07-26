import db from "../config/db.js";

const getAllDishes = async ()=> {
    const [dishes] = await db.execute("SELECT * From dishes");
    return dishes;
}

// 'Indian','Italian','Mexican','Chinese','Korean','Japanese'

const getIndianDishes = async ()=> {
    const [dishes] = await db.execute(`SELECT * FROM dishes WHERE category = 'Indian'`);
    return dishes;
}


const getItalianDishes = async ()=> {
    const [dishes] = await db.execute(`SELECT * FROM dishes WHERE category = 'Italian'`);
    return dishes;
}


const getMexicanDishes = async ()=> {
    const [dishes] = await db.execute(`SELECT * FROM dishes WHERE category = 'Mexican'`);
    return dishes;
}


const getChineseDishes = async ()=> {
    const [dishes] = await db.execute(`SELECT * FROM dishes WHERE category = 'Chinese'`);
    return dishes;
}


const getKoreanDishes = async ()=> {
    const [dishes] = await db.execute(`SELECT * FROM dishes WHERE category = 'Korean'`);
    return dishes;
}


const getJapaneseDishes = async ()=> {
    const [dishes] = await db.execute(`SELECT * FROM dishes WHERE category = 'Japanese'`);
    return dishes;
}

export default {
    getAllDishes,
    getIndianDishes,
    getItalianDishes,
    getMexicanDishes,
    getChineseDishes,
    getKoreanDishes,
    getJapaneseDishes,
};