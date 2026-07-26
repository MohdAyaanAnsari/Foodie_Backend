import db from "../config/db.js";

export const createCartItemsTable = async () => {
    const [tables] = await db.execute(`SHOW TABLES LIKE 'cart_items'`);

    const tablesExist = tables.length > 0;

    await db.execute(`
        CREATE TABLE IF NOT EXISTS cart_items (
            id INT AUTO_INCREMENT PRIMARY KEY,

            cart_id INT NOT NULL,
            dish_id INT NOT NULL,

            quantity INT NOT NULL DEFAULT 1,
            unit_price DECIMAL(10,2) NOT NULL,

            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                ON UPDATE CURRENT_TIMESTAMP,

            CONSTRAINT fk_cart_item_cart
                FOREIGN KEY (cart_id)
                REFERENCES carts(id)
                ON DELETE CASCADE,

            CONSTRAINT fk_cart_item_dish
                FOREIGN KEY (dish_id)
                REFERENCES dishes(id)
                ON DELETE CASCADE,

            UNIQUE KEY unique_cart_dish (cart_id, dish_id)
        )
    `);

    if (!tablesExist) {
        console.log("✅ Cart items table ready");
    }
};

export default createCartItemsTable;