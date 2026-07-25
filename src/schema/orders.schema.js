import db from "../config/db.js";

export const createOrdersTable = async () => {
    await db.execute(`
        CREATE TABLE IF NOT EXISTS orders (
            id INT AUTO_INCREMENT PRIMARY KEY,

            user_id INT NOT NULL,
            location_id INT NOT NULL,

            total_price DECIMAL(10,2) NOT NULL,
            discount DECIMAL(10,2) DEFAULT 0,
            final_price DECIMAL(10,2) NOT NULL,

            payment_status ENUM(
                'Pending',
                'Paid',
                'Failed'
            ) DEFAULT 'Pending',

            order_status ENUM(
                'Pending',
                'Preparing',
                'Out For Delivery',
                'Delivered',
                'Cancelled'
            ) DEFAULT 'Pending',

            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                ON UPDATE CURRENT_TIMESTAMP,

            CONSTRAINT fk_order_user
                FOREIGN KEY (user_id)
                REFERENCES users(id)
                ON DELETE CASCADE,

            CONSTRAINT fk_order_location
                FOREIGN KEY (location_id)
                REFERENCES locations(id)
        )
    `).then(()=>{
        console.log("✅ Orders table ready");
    })

};

export default createOrdersTable;