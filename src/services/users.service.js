import db from "../config/db.js";

const getAllUsers = async () => {
    const [users] = await db.query("SELECT* FROM users");
    // console.log(users);
    return users;
}

export default {
    getAllUsers,
}