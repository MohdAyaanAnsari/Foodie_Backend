import db from "../config/db.js";

const getAllCarts = async () => {
    const [carts] = await db.execute("SELECT * FROM carts");
    const [cartItems] = await db.execute("SELECT * FROM cart_items");

    return carts.map((cart) => ({
        ...cart,
        Items: cartItems.filter((item) => item.cart_id === cart.id),
    }));
};


const addToCart = async ({ user_id, dish_id, quantity }) => {
    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        // Check dish
        const [dishRows] = await connection.query(
            `
            SELECT id, price, is_available
            FROM dishes
            WHERE id = ?
            `,
            [dish_id]
        );

        if (dishRows.length === 0) {
            throw new Error("Dish not found");
        }

        const dish = dishRows[0];

        if (!dish.is_available) {
            throw new Error("Dish is currently unavailable");
        }

        // Find active cart
        const [cartRows] = await connection.query(
            `
            SELECT id
            FROM carts
            WHERE user_id = ?
            AND status = 'Active'
            LIMIT 1
            `,
            [user_id]
        );

        let cartId;

        if (cartRows.length === 0) {
            const [newCart] = await connection.query(
                `
                INSERT INTO carts(user_id, status)
                VALUES(?, 'Active')
                `,
                [user_id]
            );

            cartId = newCart.insertId;
        } else {
            cartId = cartRows[0].id;
        }

        // Check existing item
        const [itemRows] = await connection.query(
            `
            SELECT id, quantity
            FROM cart_items
            WHERE cart_id = ?
            AND dish_id = ?
            `,
            [cartId, dish_id]
        );

        if (itemRows.length > 0) {
            await connection.query(
                `
                UPDATE cart_items
                SET quantity = quantity + ?
                WHERE id = ?
                `,
                [quantity, itemRows[0].id]
            );
        } else {
            await connection.query(
                `
                INSERT INTO cart_items
                (
                    cart_id,
                    dish_id,
                    quantity,
                    unit_price
                )
                VALUES (?, ?, ?, ?)
                `,
                [
                    cartId,
                    dish_id,
                    quantity,
                    dish.price,
                ]
            );
        }

        // Return updated cart
        const [cartItems] = await connection.query(
            `
            SELECT
                ci.id,
                ci.cart_id,
                ci.quantity,
                ci.unit_price,
                d.id AS dish_id,
                d.name,
                d.image_url
            FROM cart_items ci
            JOIN dishes d
                ON ci.dish_id = d.id
            WHERE ci.cart_id = ?
            `,
            [cartId]
        );

        await connection.commit();

        return cartItems;

    } catch (err) {
        await connection.rollback();
        throw err;
    } finally {
        connection.release();
    }
};


const getUserCart = async (user_id) => {
    const connection = await db.getConnection();

    try {
        const [rows] = await connection.query(
            `
            SELECT
                c.id AS cart_id,
                ci.id AS cart_item_id,
                d.id AS dish_id,
                d.name,
                d.description,
                d.image_url,
                ci.quantity,
                ci.unit_price,
                (ci.quantity * ci.unit_price) AS total_price
            FROM carts c
            JOIN cart_items ci
                ON c.id = ci.cart_id
            JOIN dishes d
                ON ci.dish_id = d.id
            WHERE c.user_id = ?
            AND c.status = 'Active'
            ORDER BY ci.id DESC
            `,
            [user_id]
        );

        return rows;
    } finally {
        connection.release();
    }
};


/*
|--------------------------------------------------------------------------
| UPDATE CART ITEM QUANTITY
|--------------------------------------------------------------------------
*/

const updateCartItem = async (cartItemId, quantity) => {
    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        // Validate quantity
        if (quantity < 1) {
            throw new Error("Quantity must be at least 1");
        }

        // Check cart item
        const [itemRows] = await connection.query(
            `
            SELECT id
            FROM cart_items
            WHERE id = ?
            `,
            [cartItemId]
        );

        if (itemRows.length === 0) {
            throw new Error("Cart item not found");
        }

        // Update quantity
        await connection.query(
            `
            UPDATE cart_items
            SET quantity = ?
            WHERE id = ?
            `,
            [quantity, cartItemId]
        );

        // Get updated item
        const [updatedRows] = await connection.query(
            `
            SELECT
                ci.id AS cart_item_id,
                ci.cart_id,
                ci.dish_id,
                ci.quantity,
                ci.unit_price,
                d.name,
                d.image_url,
                (ci.quantity * ci.unit_price) AS total_price
            FROM cart_items ci
            JOIN dishes d
                ON ci.dish_id = d.id
            WHERE ci.id = ?
            `,
            [cartItemId]
        );

        await connection.commit();

        return updatedRows[0];

    } catch (err) {
        await connection.rollback();
        throw err;
    } finally {
        connection.release();
    }
};


/*
|--------------------------------------------------------------------------
| REMOVE CART ITEM
|--------------------------------------------------------------------------
*/

const removeCartItem = async (cartItemId) => {
    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        const [itemRows] = await connection.query(
            `
            SELECT cart_id
            FROM cart_items
            WHERE id = ?
            `,
            [cartItemId]
        );

        if (itemRows.length === 0) {
            throw new Error("Cart item not found");
        }

        const cartId = itemRows[0].cart_id;

        await connection.query(
            `
            DELETE FROM cart_items
            WHERE id = ?
            `,
            [cartItemId]
        );

        await connection.commit();

        return {
            cart_id: cartId,
            cart_item_id: Number(cartItemId),
        };

    } catch (err) {
        await connection.rollback();
        throw err;
    } finally {
        connection.release();
    }
};


export default {
    getAllCarts,
    addToCart,
    getUserCart,
    updateCartItem,
    removeCartItem,
};