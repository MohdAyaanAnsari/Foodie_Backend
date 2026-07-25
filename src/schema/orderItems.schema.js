import db from "../config/db.js";

export const createOrderItemsTable = async () => {
    const [tables]= await db.execute(`SHOW TABLES LIKE 'order_items'`);

    const tablesExist = tables.length > 0;


    await db.execute(`
        CREATE TABLE IF NOT EXISTS order_items (

            id INT AUTO_INCREMENT PRIMARY KEY,

            order_id INT NOT NULL,

            dish_id INT NOT NULL,

            quantity INT NOT NULL,

            price DECIMAL(10,2) NOT NULL,

            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                ON UPDATE CURRENT_TIMESTAMP,

            CONSTRAINT fk_item_order
                FOREIGN KEY (order_id)
                REFERENCES orders(id)
                ON DELETE CASCADE,

            CONSTRAINT fk_item_dish
                FOREIGN KEY (dish_id)
                REFERENCES dishes(id)
        )
    `);
    if(!tablesExist){
        console.log("✅ Order Items table ready");
    }

};

export default createOrderItemsTable;