import tableService from "../services/tables.service.js";


const getTables = async (req, res) => {

    try {

        const tables = await tableService.getAllTables();

        return res.status(200).json({
            success: true,
            data: tables
        });

    } catch (error) {

        console.error("Get tables error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch tables."
        });
    }
};


const searchAvailableTables = async (req, res) => {

    try {

        const {
            reservationDate,
            reservationTime,
            guests,
            tableType,
            durationMinutes = 120
        } = req.body;


        // -----------------------------
        // Validation
        // -----------------------------

        if (!reservationDate) {
            return res.status(400).json({
                success: false,
                message: "Reservation date is required."
            });
        }


        if (!reservationTime) {
            return res.status(400).json({
                success: false,
                message: "Reservation time is required."
            });
        }


        if (!guests) {
            return res.status(400).json({
                success: false,
                message: "Number of guests is required."
            });
        }


        if (!tableType) {
            return res.status(400).json({
                success: false,
                message: "Table type is required."
            });
        }


        // -----------------------------
        // Validate guests
        // -----------------------------

        const guestCount = Number(guests);

        if (!Number.isInteger(guestCount) || guestCount <= 0) {

            return res.status(400).json({
                success: false,
                message: "Guests must be a positive integer."
            });
        }


        // -----------------------------
        // Validate duration
        // -----------------------------

        const duration = Number(durationMinutes);

        if (!Number.isInteger(duration) || duration <= 0) {

            return res.status(400).json({
                success: false,
                message: "Duration must be a positive integer."
            });
        }


        // -----------------------------
        // Allowed table types
        // -----------------------------

        const allowedTableTypes = [
            "Silver",
            "Gold",
            "VIP"
        ];

        if (!allowedTableTypes.includes(tableType)) {

            return res.status(400).json({
                success: false,
                message: "Invalid table type."
            });
        }


        // -----------------------------
        // Find available tables
        // -----------------------------

        const tables = await tableService.findAvailableTables({

            reservationDate,

            reservationTime,

            guests: guestCount,

            tableType,

            durationMinutes: duration

        });


        // -----------------------------
        // Response
        // -----------------------------

        return res.status(200).json({

            success: true,

            message:
                tables.length > 0
                    ? "Available tables found."
                    : "No tables are available for the selected time.",

            data: tables

        });

    } catch (error) {

        console.error(
            "Search available tables error:",
            error
        );

        return res.status(500).json({

            success: false,

            message: "Internal Server Error."

        });
    }
};


export default {
    getTables,
    searchAvailableTables
};