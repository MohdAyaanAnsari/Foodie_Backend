import db from "../config/db.js";


const Otp_Generater = async() =>{
    for(let i = 0; i < 6; i++) {
        const otp = Math.floor(100000 + Math.random() * 900000);
        return otp;
    }
}

const getAllUsers = async () => {
    const [users] = await db.query("SELECT* FROM users");
    return users;
}


const createUser = async (userData) =>{
    const {name, mobile, email, dob} = userData;
    const otp = await Otp_Generater();
    // console.log(userData);
    // console.log("OTP: ",otp);
    const [result] = await db.query("INSERT INTO users (name, mobile, email, dob, otp) VALUES (?, ?, ?, ?, ?)", [name, mobile, email, dob, otp]);
    return {id: result.insertId, name, mobile, email, dob, otp};
}

export default {
    getAllUsers,
    createUser,
}