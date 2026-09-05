import db from "../config/db.js";

const createDishesTable = async () => {
  const checkTable = await db.query(`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_name = 'dishes'
  `);

  const tablesExist = checkTable.rows.length > 0;

  await db.query(`
    DO $$ 
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'category_enum') THEN
        CREATE TYPE category_enum AS ENUM ('Indian', 'Italian', 'Mexican', 'Chinese', 'Korean', 'Japanese');
      END IF;

      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'food_type_enum') THEN
        CREATE TYPE food_type_enum AS ENUM ('Veg', 'Non Veg');
      END IF;
    END $$;
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS dishes (
      id SERIAL PRIMARY KEY,
      name VARCHAR(150) NOT NULL,
      description TEXT,
      price DECIMAL(10,2) NOT NULL,
      discount DECIMAL(10,2) DEFAULT 0,
      category category_enum NOT NULL,
      food_type food_type_enum NOT NULL,
      cook_time INT NOT NULL,
      image_url VARCHAR(255),
      is_available BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await db.query(`
    DROP TRIGGER IF EXISTS update_dishes_updated_at ON dishes;
    CREATE TRIGGER update_dishes_updated_at
    BEFORE UPDATE ON dishes
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
  `);

  if (!tablesExist) {
    console.log("✅ Dishes table ready");
  }
};

export default createDishesTable;