import db from "../config/db.js";

const getAllLocations = async() => {
    const [locations]= await db.execute('SELECT* FROM locations');
    return locations;
}

export default {
    getAllLocations,
}