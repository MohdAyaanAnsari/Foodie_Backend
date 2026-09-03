import db from "../config/db.js";

const Otp_Generater = async () => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp;
};

const signUp = async (userData) => {
  const { name, mobile, email, dob } = userData;

  const otp = await Otp_Generater();

  const [result] = await db.execute(
    "INSERT INTO users (name, mobile, email, dob, otp) VALUES (?, ?, ?, ?, ?)",
    [name, mobile, email, dob, otp]
  );

  // IMPORTANT:
  // OTP is stored in DB but NOT returned to frontend
  return {
    id: result.insertId,
    name,
    mobile,
    email,
    dob,
  };
};


const login = async ({ email }) => {
  // 1. Check if email exists
  const [rows] = await db.execute(
    "SELECT id, name, mobile, email, dob FROM users WHERE email = ?",
    [email]
  );

  if (rows.length === 0) {
    throw new Error("Email not registered");
  }

  // 2. Generate new OTP
  const otp = await Otp_Generater();

  // 3. Save OTP in database
  await db.execute(
    "UPDATE users SET otp = ? WHERE email = ?",
    [otp, email]
  );

  // 4. Don't return OTP
  return {
    id: rows[0].id,
    name: rows[0].name,
    mobile: rows[0].mobile,
    email: rows[0].email,
    dob: rows[0].dob,
  };
};

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

  // Clear OTP after successful verification
  await db.execute(
    "UPDATE users SET otp = NULL WHERE email = ?",
    [email]
  );

  return {
    id: rows[0].id,
    email,
  };
};


const saveToken = async (userId, token) => {
    await db.execute(
        "UPDATE users SET token = ? WHERE id = ?",
        [token, userId]
    );
};

const removeToken = async (userId) => {
    const [result] = await db.execute(
        "UPDATE users SET token = NULL WHERE id = ?",
        [userId]
    );

    // console.log("Logout DB result:", result);

    return result;
};



const me = async (userId) => {
    const [rows] = await db.execute(
        "SELECT id, name, mobile, email, dob FROM users WHERE id = ?",
        [userId]
    );

    if (rows.length === 0) {
        throw new Error("User not found");
    }

    return rows[0];
};

export default {
  signUp,
  login,
  verifyOtp,
  me,
  saveToken,
  removeToken,
};