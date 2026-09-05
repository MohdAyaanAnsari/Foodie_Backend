import db from "../config/db.js";

export const createOrderItemsTable = async () => {
  const checkTable = await db.query(`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_name = 'order_items'
  `);

  const tablesExist = checkTable.rows.length > 0;

  await db.query(`
    CREATE TABLE IF NOT EXISTS order_items (
      id SERIAL PRIMARY KEY,
      order_id INT NOT NULL,
      dish_id INT NOT NULL,
      quantity INT NOT NULL,
      price DECIMAL(10,2) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

      CONSTRAINT fk_item_order
        FOREIGN KEY (order_id)
        REFERENCES orders(id)
        ON DELETE CASCADE,

      CONSTRAINT fk_item_dish
        FOREIGN KEY (dish_id)
        REFERENCES dishes(id)
    );
  `);

  await db.query(`
    DROP TRIGGER IF EXISTS update_order_items_updated_at ON order_items;
    CREATE TRIGGER update_order_items_updated_at
    BEFORE UPDATE ON order_items
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
  `);

  if (!tablesExist) {
    console.log("✅ Order Items table ready");
  }
};

export default createOrderItemsTable;