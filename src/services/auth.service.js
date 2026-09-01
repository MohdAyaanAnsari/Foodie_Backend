import db from "../config/db.js";


const Otp_Generater = async () => {
    for (let i = 0; i < 6; i++) {
        const otp = Math.floor(100000 + Math.random() * 900000);
        return otp;
    }
}

const signUp = async(userData) =>{
    const {name, mobile, email, dob} = userData;

    const otp = await Otp_Generater();
    const [result] = await db.execute("INSERT INTO users (name, mobile, email,dob, otp) VALUES (?,?,?,?,?)", [name, mobile, email, dob, otp]);
    return {id:result.insertId, name, mobile, email, dob, otp};
}


const verifyOtp = async ({ email, otp }) => {
  const [rows] = await db.execute(
    "SELECT id, otp FROM users WHERE email = ?",
    [email]
  );

  if (rows.length === 0) {
    throw new Error("User not found");
  }

  if (String(rows[0].otp) !== String(otp)) {
    throw new Error("Invalid OTP");
  }

  // Optional: clear OTP after successful verification
  await db.execute(
    "UPDATE users SET otp = NULL WHERE email = ?",
    [email]
  );

  return {
    id: rows[0].id,
    email,
  };
};


export default{
    signUp,
    verifyOtp,
}