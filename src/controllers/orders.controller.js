import orderService from "../services/orders.service.js";

const getOrders = async (req, res) =>{
    const orders = await orderService.getAllOrders();

    res.status(200).json({
        success: true,
        data:orders,
    })
}

export default{
    getOrders,
}