import db from "../config/db.js";

const createLocationsTable = async () => {
  const checkTable = await db.query(`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_name = 'locations'
  `);

  const tablesExist = checkTable.rows.length > 0;

  await db.query(`
    CREATE TABLE IF NOT EXISTS locations (
      id SERIAL PRIMARY KEY,
      name VARCHAR(150) NOT NULL,
      distance_km DECIMAL(5,2) NOT NULL,
      estimated_delivery_time INT NOT NULL,
      delivery_charge DECIMAL(10,2) DEFAULT 0,
      is_available BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await db.query(`
    DROP TRIGGER IF EXISTS update_locations_updated_at ON locations;
    CREATE TRIGGER update_locations_updated_at
    BEFORE UPDATE ON locations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
  `);

  if (!tablesExist) {
    console.log("✅ Locations table ready");
  }
};

export default createLocationsTable;