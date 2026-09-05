import db from "../config/db.js";

export const createCartItemsTable = async () => {
  const checkTable = await db.query(`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_name = 'cart_items'
  `);

  const tablesExist = checkTable.rows.length > 0;

  await db.query(`
    CREATE TABLE IF NOT EXISTS cart_items (
      id SERIAL PRIMARY KEY,
      cart_id INT NOT NULL,
      dish_id INT NOT NULL,
      quantity INT NOT NULL DEFAULT 1,
      unit_price DECIMAL(10,2) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

      CONSTRAINT fk_cart_item_cart
        FOREIGN KEY (cart_id)
        REFERENCES carts(id)
        ON DELETE CASCADE,

      CONSTRAINT fk_cart_item_dish
        FOREIGN KEY (dish_id)
        REFERENCES dishes(id)
        ON DELETE CASCADE,

      CONSTRAINT unique_cart_dish UNIQUE (cart_id, dish_id)
    );
  `);

  await db.query(`
    DROP TRIGGER IF EXISTS update_cart_items_updated_at ON cart_items;
    CREATE TRIGGER update_cart_items_updated_at
    BEFORE UPDATE ON cart_items
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
  `);

  if (!tablesExist) {
    console.log("✅ Cart items table ready");
  }
};

export default createCartItemsTable;