import db from "../config/db.js";
import { generateOTP, sendOtpEmail } from "../utils/sendOtpEmail.js";

const OTP_EXPIRY_MINUTES = 5;

const signUp = async (userData) => {
  const { name, mobile, email, dob } = userData;

  const otp = generateOTP();
  const expiry = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

  const { rows } = await db.query(
    `INSERT INTO users (name, mobile, email, dob, otp, otp_expiry)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING id`,
    [name, mobile, email, dob, otp, expiry]
  );

  await sendOtpEmail(email, otp);

  return {
    id: rows[0].id,
    name,
    mobile,
    email,
    dob,
  };
};

const login = async ({ email }) => {
  const { rows } = await db.query(
    "SELECT id, name, mobile, email, dob FROM users WHERE email = $1",
    [email]
  );

  if (rows.length === 0) {
    throw new Error("Email not registered");
  }

  const otp = generateOTP();
  const expiry = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

  await db.query(
    `UPDATE users
     SET otp = $1, otp_expiry = $2
     WHERE email = $3`,
    [otp, expiry, email]
  );

  await sendOtpEmail(email, otp);

  return rows[0];
};

const verifyOtp = async ({ email, otp }) => {
  const { rows } = await db.query(
    `SELECT
        id,
        name,
        mobile,
        email,
        dob,
        otp,
        otp_expiry
     FROM users
     WHERE email = $1`,
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

  await db.query(
    `UPDATE users
     SET otp = NULL,
         otp_expiry = NULL
     WHERE email = $1`,
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
  await db.query(
    "UPDATE users SET token = $1 WHERE id = $2",
    [token, userId]
  );
};

const removeToken = async (userId) => {
  await db.query(
    "UPDATE users SET token = NULL WHERE id = $1",
    [userId]
  );
};

const me = async (userId) => {
  const { rows } = await db.query(
    `SELECT id, name, mobile, email, dob
     FROM users
     WHERE id = $1`,
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