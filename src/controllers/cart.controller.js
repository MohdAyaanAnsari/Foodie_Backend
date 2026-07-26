import cartService from "../services/cart.service.js";

const getCarts = async(req, res) =>{
    const carts = await cartService.getAllCarts();

    res.status(200).json({
        success: true,
        data: carts,
    })
}


export default{
    getCarts,
}