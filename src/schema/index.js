import createUsersTable  from "./users.schema.js";
import createDishesTable  from "./dishes.schema.js";
import createLocationsTable  from "./locations.schema.js";
import createRestaurantTables  from "./tables.schema.js";
import createOrdersTable  from "./orders.schema.js";
import createOrderItemsTable from "./orderItems.schema.js";

const initializeDatabase = async () => {
    try {
        console.log("Creating database tables...");

        await createUsersTable();
        await createDishesTable();
        await createLocationsTable();
        await createRestaurantTables();
        await createOrdersTable();
        await createOrderItemsTable();

        console.log("🎉 Database initialized successfully");
    } catch (err) {
        console.error("Database initialization failed");
        console.error(err);
    }
};

export default initializeDatabase;