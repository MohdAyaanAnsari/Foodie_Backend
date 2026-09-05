import db from "../config/db.js";

export const createCartsTable = async () => {
  const checkTable = await db.query(`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_name = 'carts'
  `);

  const tablesExist = checkTable.rows.length > 0;

  await db.query(`
    DO $$ 
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'cart_status_enum') THEN
        CREATE TYPE cart_status_enum AS ENUM ('Active', 'Checked Out', 'Abandoned');
      END IF;
    END $$;
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS carts (
      id SERIAL PRIMARY KEY,
      user_id INT NOT NULL,
      status cart_status_enum DEFAULT 'Active',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

      CONSTRAINT fk_cart_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
    );
  `);

  await db.query(`
    DROP TRIGGER IF EXISTS update_carts_updated_at ON carts;
    CREATE TRIGGER update_carts_updated_at
    BEFORE UPDATE ON carts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
  `);

  if (!tablesExist) {
    console.log("✅ Carts table ready");
  }
};

export default createCartsTable;