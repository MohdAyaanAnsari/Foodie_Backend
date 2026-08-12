import catService from "../services/cat.service.js";

const getAllDishesCategories = async (req, res) => {
    try {
        const categories = await catService.getDishesCategories();

        res.status(200).json({
            success: true,
            res: categories
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export default {
    getAllDishesCategories,
}