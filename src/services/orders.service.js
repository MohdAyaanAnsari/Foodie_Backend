import db from "../config/db.js";

const getAllOrders = async () => {
    const [orders] = await db.execute("SELECT* FROM orders");
    const [orderItems] = await db.execute("SELECT* FROM order_items");

    const AllOrders = orders.map(order => ({
        ...order,
        items: orderItems.filter(item => item.order_id === order.id)
    }));

    return AllOrders;
}

export default {
    getAllOrders,
}