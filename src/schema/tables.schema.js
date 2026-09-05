import db from "../config/db.js";

export const createRestaurantTables = async () => {
  const checkTable = await db.query(`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_name = 'restaurant_tables'
  `);

  const tablesExist = checkTable.rows.length > 0;

  await db.query(`
    DO $$ 
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'table_type_enum') THEN
        CREATE TYPE table_type_enum AS ENUM ('Silver', 'Gold', 'VIP');
      END IF;
    END $$;
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS restaurant_tables (
      id SERIAL PRIMARY KEY,
      table_number INT UNIQUE NOT NULL,
      seats INT NOT NULL,
      type table_type_enum NOT NULL,
      is_available BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await db.query(`
    DROP TRIGGER IF EXISTS update_restaurant_tables_updated_at ON restaurant_tables;
    CREATE TRIGGER update_restaurant_tables_updated_at
    BEFORE UPDATE ON restaurant_tables
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
  `);

  if (!tablesExist) {
    console.log("✅ Restaurant Tables ready");
  }
};

export default createRestaurantTables;