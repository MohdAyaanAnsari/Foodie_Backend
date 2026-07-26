import dishesService from "../services/dishes.service.js";

const getDishes = async (req, res) => {
    const dishes = await dishesService.getAllDishes();

    res.status(200).json({
        success: true,
        data: dishes,
    })
}

    // getIndianDishes,
    // getItalianDishes,
    // getMexicanDishes,
    // getChineseDishes,
    // getKoreanDishes,
    // getJapaneseDishes,

const getIndianDishes = async (req, res) => {
    const dishes = await dishesService.getIndianDishes();

    res.status(200).json({
        success: true,
        data: dishes,
    })
}


const getItalianDishes = async (req, res) => {
    const dishes = await dishesService.getItalianDishes();

    res.status(200).json({
        success: true,
        data: dishes,
    })
}


const getMexicanDishes = async (req, res) => {
    const dishes = await dishesService.getMexicanDishes();

    res.status(200).json({
        success: true,
        data: dishes,
    })
}


const getChineseDishes = async (req, res) => {
    const dishes = await dishesService.getChineseDishes();

    res.status(200).json({
        success: true,
        data: dishes,
    })
}


const getKoreanDishes = async (req, res) => {
    const dishes = await dishesService.getKoreanDishes();

    res.status(200).json({
        success: true,
        data: dishes,
    })
}


const getJapaneseDishes = async (req, res) => {
    const dishes = await dishesService.getJapaneseDishes();

    res.status(200).json({
        success: true,
        data: dishes,
    })
}

export default {
    getDishes,
    getIndianDishes,
    getItalianDishes,
    getMexicanDishes,
    getChineseDishes,
    getKoreanDishes,
    getJapaneseDishes,
}