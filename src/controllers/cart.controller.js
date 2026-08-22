import cartService from "../services/cart.service.js";

const getCarts = async(req, res) =>{
    const carts = await cartService.getAllCarts();

    res.status(200).json({
        success: true,
        data: carts,
    })
}


const addToCart = async (req, res) => {
    try {
        const { user_id, dish_id, quantity } = req.body;

        if (!user_id || !dish_id) {
            return res.status(400).json({
                success: false,
                message: "user_id and dish_id are required",
            });
        }

        const result = await cartService.addToCart({
            user_id,
            dish_id,
            quantity: quantity || 1,
        });

        res.status(200).json({
            success: true,
            message: "Dish added to cart",
            data: result,
        });

    } catch (err) {
        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}


export default{
    getCarts,
    addToCart,
}