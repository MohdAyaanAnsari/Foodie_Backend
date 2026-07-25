import tableService from "../services/tables.service.js";


const getTables = async (req, res) => {
    const tables = await tableService.getAllTables();

    res.status(200).json({
        success:true,
        data: tables,
    });
}

export default{
    getTables,
}