import db from "../config/db.js";

export const createRestaurantTables = async () => {
    const [tables] = await db.execute(`SHOW TABLES LIKE 'restaurant_tables'`);

    const tablesExist = tables.length > 0;


    await db.execute(`
        CREATE TABLE IF NOT EXISTS restaurant_tables (
            id INT AUTO_INCREMENT PRIMARY KEY,
            table_number INT UNIQUE NOT NULL,
            seats INT NOT NULL,
            type ENUM('Silver','Gold','VIP') NOT NULL,
            is_available BOOLEAN DEFAULT TRUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                ON UPDATE CURRENT_TIMESTAMP
        )
    `);
    if(!tablesExist){
        console.log("✅ Restaurant Tables ready");
    }

};

export default createRestaurantTables;