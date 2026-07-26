import db from "../config/db.js";

export const createCartsTable = async () => {
    const [tables] = await db.execute(`SHOW TABLES LIKE 'carts'`);

    const tablesExist = tables.length > 0;

    await db.execute(`
        CREATE TABLE IF NOT EXISTS carts (
            id INT AUTO_INCREMENT PRIMARY KEY,

            user_id INT NOT NULL,

            status ENUM(
                'Active',
                'Checked Out',
                'Abandoned'
            ) DEFAULT 'Active',

            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                ON UPDATE CURRENT_TIMESTAMP,

            CONSTRAINT fk_cart_user
                FOREIGN KEY (user_id)
                REFERENCES users(id)
                ON DELETE CASCADE
        )
    `);

    if (!tablesExist) {
        console.log("✅ Carts table ready");
    }
};

export default createCartsTable;