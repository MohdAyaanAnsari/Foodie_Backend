import db from "../config/db.js";

const getAllCarts = async () => {
    const [carts] = await db.execute('SELECT * FROM carts');
    const [cartsItems] = await db.execute('SELECT * FROM cart_items');

    const AllCarts = carts.map(cart => ({
        ...cart,
        Items: cartsItems.filter(item => item.cart_id === cart.id)
    }));

    return AllCarts;
}

export default{
    getAllCarts,
} 