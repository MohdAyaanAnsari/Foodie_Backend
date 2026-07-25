import locationService from "../services/locations.service.js";

const getLocations = async (req, res) => {
    const locations = await locationService.getAllLocations();

    res.status(200).json({
        success:true,
        data:locations,
    })
}

export default{
    getLocations,
}