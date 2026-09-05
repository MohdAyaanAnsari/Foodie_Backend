import db from "../config/db.js";

const getAllCarts = async () => {
  const { rows: carts } = await db.query("SELECT * FROM carts");
  const { rows: cartItems } = await db.query("SELECT * FROM cart_items");

  return carts.map((cart) => ({
    ...cart,
    Items: cartItems.filter((item) => item.cart_id === cart.id),
  }));
};

const addToCart = async ({ user_id, dish_id, quantity }) => {
  const client = await db.connect();

  try {
    await client.query("BEGIN");

    // Check dish
    const { rows: dishRows } = await client.query(
      `
      SELECT id, price, is_available
      FROM dishes
      WHERE id = $1
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
    const { rows: cartRows } = await client.query(
      `
      SELECT id
      FROM carts
      WHERE user_id = $1
      AND status = 'Active'
      LIMIT 1
      `,
      [user_id]
    );

    let cartId;

    if (cartRows.length === 0) {
      const { rows: newCartRows } = await client.query(
        `
        INSERT INTO carts(user_id, status)
        VALUES($1, 'Active')
        RETURNING id
        `,
        [user_id]
      );

      cartId = newCartRows[0].id;
    } else {
      cartId = cartRows[0].id;
    }

    // Check existing item
    const { rows: itemRows } = await client.query(
      `
      SELECT id, quantity
      FROM cart_items
      WHERE cart_id = $1
      AND dish_id = $2
      `,
      [cartId, dish_id]
    );

    if (itemRows.length > 0) {
      await client.query(
        `
        UPDATE cart_items
        SET quantity = quantity + $1
        WHERE id = $2
        `,
        [quantity, itemRows[0].id]
      );
    } else {
      await client.query(
        `
        INSERT INTO cart_items
        (
          cart_id,
          dish_id,
          quantity,
          unit_price
        )
        VALUES ($1, $2, $3, $4)
        `,
        [cartId, dish_id, quantity, dish.price]
      );
    }

    // Return updated cart items
    const { rows: cartItems } = await client.query(
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
      WHERE ci.cart_id = $1
      `,
      [cartId]
    );

    await client.query("COMMIT");

    return cartItems;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

const getUserCart = async (user_id) => {
  const { rows } = await db.query(
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
    WHERE c.user_id = $1
    AND c.status = 'Active'
    ORDER BY ci.id DESC
    `,
    [user_id]
  );

  return rows;
};

/*
|--------------------------------------------------------------------------
| UPDATE CART ITEM QUANTITY
|--------------------------------------------------------------------------
*/

const updateCartItem = async (cartItemId, quantity) => {
  const client = await db.connect();

  try {
    await client.query("BEGIN");

    // Validate quantity
    if (quantity < 1) {
      throw new Error("Quantity must be at least 1");
    }

    // Check cart item
    const { rows: itemRows } = await client.query(
      `
      SELECT id
      FROM cart_items
      WHERE id = $1
      `,
      [cartItemId]
    );

    if (itemRows.length === 0) {
      throw new Error("Cart item not found");
    }

    // Update quantity
    await client.query(
      `
      UPDATE cart_items
      SET quantity = $1
      WHERE id = $2
      `,
      [quantity, cartItemId]
    );

    // Get updated item
    const { rows: updatedRows } = await client.query(
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
      WHERE ci.id = $1
      `,
      [cartItemId]
    );

    await client.query("COMMIT");

    return updatedRows[0];
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

/*
|--------------------------------------------------------------------------
| REMOVE CART ITEM
|--------------------------------------------------------------------------
*/

const removeCartItem = async (cartItemId) => {
  const client = await db.connect();

  try {
    await client.query("BEGIN");

    const { rows: itemRows } = await client.query(
      `
      SELECT cart_id
      FROM cart_items
      WHERE id = $1
      `,
      [cartItemId]
    );

    if (itemRows.length === 0) {
      throw new Error("Cart item not found");
    }

    const cartId = itemRows[0].cart_id;

    await client.query(
      `
      DELETE FROM cart_items
      WHERE id = $1
      `,
      [cartItemId]
    );

    await client.query("COMMIT");

    return {
      cart_id: cartId,
      cart_item_id: Number(cartItemId),
    };
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

export default {
  getAllCarts,
  addToCart,
  getUserCart,
  updateCartItem,
  removeCartItem,
};