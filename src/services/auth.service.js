import db from "../config/db.js";


const Otp_Generater = async () => {
    for (let i = 0; i < 6; i++) {
        const otp = Math.floor(100000 + Math.random() * 900000);
        return otp;
    }
}

const signUp = async(userData) =>{
    const {name, mobile, email, dob} = userData;

    const OTP = await Otp_Generater();
    const [result] = await db.execute("INSERT INTO users (name, mobile, email,dob, otp) VALUES (?,?,?,?,?)", [name, mobile, email, dob, otp]);
    return {id:result, insertId, name, mobile, email, dob, otp};
}

export default{
    signUp,
}