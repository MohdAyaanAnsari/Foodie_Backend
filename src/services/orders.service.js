import db from "../config/db.js";

const getAllOrders = async () => {
  const { rows: orders } = await db.query("SELECT * FROM orders");
  const { rows: orderItems } = await db.query("SELECT * FROM order_items");

  const AllOrders = orders.map((order) => ({
    ...order,
    items: orderItems.filter((item) => item.order_id === order.id),
  }));

  return AllOrders;
};

export default {
  getAllOrders,
};