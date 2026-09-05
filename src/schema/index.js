import createUsersTable from "./users.schema.js";
import createDishesTable from "./dishes.schema.js";
import createLocationsTable from "./locations.schema.js";
import createRestaurantTables from "./tables.schema.js";
import createOrdersTable from "./orders.schema.js";
import createOrderItemsTable from "./orderItems.schema.js";
import createCartsTable from "./cart.schema.js";
import createCartItemsTable from "./cartItems.schema.js";
import db from "../config/db.js";

const createUpdatedAtFunction = async () => {
  await db.query(`
    CREATE OR REPLACE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.updated_at = NOW();
      RETURN NEW;
    END;
    $$ language 'plpgsql';
  `);
};

const initializeDatabase = async () => {
  try {
    console.log("Creating database tables...");

    await createUpdatedAtFunction();

    await createUsersTable();
    await createDishesTable();
    await createLocationsTable();
    await createRestaurantTables();
    await createOrdersTable();
    await createOrderItemsTable();
    await createCartsTable();
    await createCartItemsTable();
  } catch (err) {
    console.error("Database initialization failed");
    console.error(err);
  }
};

export default initializeDatabase;