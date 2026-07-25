import dishesService from "../services/dishes.service.js";

const getDishes = async (req, res) => {
    const dishes = await dishesService.getAllDishes();

    res.status(200).json({
        success:true,
        data:dishes,
    })
}

export default{
    getDishes,
}