import db from "../config/db.js";

export const createUsersTable = async () => {
  const checkTable = await db.query(`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_name = 'users'
  `);

  const tablesExist = checkTable.rows.length > 0;

  await db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      mobile VARCHAR(20) NOT NULL UNIQUE,
      email VARCHAR(255) NOT NULL UNIQUE,
      dob DATE NOT NULL,
      otp VARCHAR(10),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await db.query(`
    DROP TRIGGER IF EXISTS update_users_updated_at ON users;
    CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
  `);

  if (!tablesExist) {
    console.log("✅ Users table ready");
  }
};

export default createUsersTable;