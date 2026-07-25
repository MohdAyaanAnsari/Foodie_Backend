import db from "../config/db.js";

const createLocationsTable = async () => {
    await db.execute(`
        CREATE TABLE IF NOT EXISTS locations (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(150) NOT NULL,
            distance_km DECIMAL(5,2) NOT NULL,
            estimated_delivery_time INT NOT NULL,
            delivery_charge DECIMAL(10,2) DEFAULT 0,
            is_available BOOLEAN DEFAULT TRUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                ON UPDATE CURRENT_TIMESTAMP
        )
    `).then(()=>{
        console.log("✅ Locations table ready");
    })

};


export default createLocationsTable;