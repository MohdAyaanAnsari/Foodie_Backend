import db from "../config/db.js";

const Otp_Generater = async () => {
  return Math.floor(100000 + Math.random() * 900000);
};

const getAllUsers = async () => {
  const { rows: users } = await db.query("SELECT * FROM users");
  return users;
};

// const createUser = async (userData) => {
//   const { name, mobile, email, dob } = userData;
//   const otp = await Otp_Generater();
//
//   const { rows } = await db.query(
//     `INSERT INTO users (name, mobile, email, dob, otp)
//      VALUES ($1, $2, $3, $4, $5)
//      RETURNING id`,
//     [name, mobile, email, dob, otp]
//   );
//
//   return { id: rows[0].id, name, mobile, email, dob, otp };
// };

export default {
  getAllUsers,
  // createUser,
};