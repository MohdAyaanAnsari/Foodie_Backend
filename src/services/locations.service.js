import db from "../config/db.js";

const getAllLocations = async () => {
  const { rows: locations } = await db.query("SELECT * FROM locations");
  return locations;
};

export default {
  getAllLocations,
};