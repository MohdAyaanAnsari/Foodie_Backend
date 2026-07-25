import db from "../config/db.js";

const getAllTables = async () => {
    const [tables] = await db.execute('SELECT* FROM restaurant_tables');
    return tables;
}

export default{
    getAllTables,
}