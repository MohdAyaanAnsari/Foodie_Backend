import db from "../config/db.js";

export const createUsersTable = async () => {
    const [tables] = await db.execute(`SHOW TABLES LIKE 'users'`);

    const tablesExist = tables.length > 0;
    
    await db.execute(`
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            mobile VARCHAR(20) NOT NULL UNIQUE,
            email VARCHAR(255) NOT NULL UNIQUE,
            dob DATE NOT NULL,
            otp VARCHAR(10),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                ON UPDATE CURRENT_TIMESTAMP
        )
    `);

    if(!tablesExist){
        console.log("✅ Users table ready");
    }
};

export default createUsersTable;