import db from "../config/db.js";
import { generateOTP, sendOtpEmail } from "../utils/sendOtpEmail.js";

const OTP_EXPIRY_MINUTES = 5;

const signUp = async (userData) => {
  const { name, mobile, email, dob } = userData;

  const otp = generateOTP();

  const expiry = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

  const [result] = await db.execute(
    `INSERT INTO users
    (name, mobile, email, dob, otp, otp_expiry)
    VALUES (?, ?, ?, ?, ?, ?)`,
    [name, mobile, email, dob, otp, expiry]
  );

  await sendOtpEmail(email, otp);

  return {
    id: result.insertId,
    name,
    mobile,
    email,
    dob,
  };
};

const login = async ({ email }) => {
  const [rows] = await db.execute(
    "SELECT id, name, mobile, email, dob FROM users WHERE email = ?",
    [email]
  );

  if (rows.length === 0) {
    throw new Error("Email not registered");
  }

  const otp = generateOTP();
  const expiry = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

  await db.execute(
    `UPDATE users
     SET otp = ?, otp_expiry = ?
     WHERE email = ?`,
    [otp, expiry, email]
  );

  await sendOtpEmail(email, otp);

  return rows[0];
};

const verifyOtp = async ({ email, otp }) => {
  const [rows] = await db.execute(
    `SELECT
        id,
        name,
        mobile,
        email,
        dob,
        otp,
        otp_expiry
     FROM users
     WHERE email = ?`,
    [email]
  );

  if (rows.length === 0) {
    throw new Error("User not found");
  }

  const user = rows[0];

  if (String(user.otp) !== String(otp)) {
    throw new Error("Invalid OTP");
  }

  if (!user.otp_expiry || new Date(user.otp_expiry) < new Date()) {
    throw new Error("OTP has expired");
  }

  await db.execute(
    `UPDATE users
     SET otp = NULL,
         otp_expiry = NULL
     WHERE email = ?`,
    [email]
  );

  return {
    id: user.id,
    name: user.name,
    mobile: user.mobile,
    email: user.email,
    dob: user.dob,
  };
};

const saveToken = async (userId, token) => {
  await db.execute(
    "UPDATE users SET token = ? WHERE id = ?",
    [token, userId]
  );
};

const removeToken = async (userId) => {
  await db.execute(
    "UPDATE users SET token = NULL WHERE id = ?",
    [userId]
  );
};

const me = async (userId) => {
  const [rows] = await db.execute(
    `SELECT id, name, mobile, email, dob
     FROM users
     WHERE id = ?`,
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
  saveToken,
  removeToken,
  me,
};