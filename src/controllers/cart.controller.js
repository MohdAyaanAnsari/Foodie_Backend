import cartService from "../services/cart.service.js";


const getCarts = async (req, res) => {
    try {
        const carts = await cartService.getAllCarts();

        res.status(200).json({
            success: true,
            data: carts,
        });

    } catch (err) {
        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};


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
};


const getUserCart = async (req, res) => {
    try {
        const { user_id } = req.params;

        const cart = await cartService.getUserCart(user_id);

        res.status(200).json({
            success: true,
            data: cart,
        });

    } catch (err) {
        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};


/*
|--------------------------------------------------------------------------
| UPDATE CART ITEM QUANTITY
|--------------------------------------------------------------------------
*/

const updateCartItem = async (req, res) => {
    try {
        const { cart_item_id } = req.params;
        const { quantity } = req.body;

        if (!quantity || quantity < 1) {
            return res.status(400).json({
                success: false,
                message: "Quantity must be at least 1",
            });
        }

        const result = await cartService.updateCartItem(
            cart_item_id,
            quantity
        );

        res.status(200).json({
            success: true,
            message: "Cart quantity updated",
            data: result,
        });

    } catch (err) {
        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};


/*
|--------------------------------------------------------------------------
| REMOVE CART ITEM
|--------------------------------------------------------------------------
*/

const removeCartItem = async (req, res) => {
    try {
        const { cart_item_id } = req.params;

        await cartService.removeCartItem(cart_item_id);

        res.status(200).json({
            success: true,
            message: "Item removed from cart",
        });

    } catch (err) {
        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};


export default {
    getCarts,
    addToCart,
    getUserCart,
    updateCartItem,
    removeCartItem,
};