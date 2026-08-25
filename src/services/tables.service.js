import db from "../config/db.js";

/**
 * Get every restaurant table.
 *
 * This is mainly useful for admin/internal purposes.
 */
const getAllTables = async () => {
    const [tables] = await db.execute(`
        SELECT
            id,
            table_number,
            seats,
            type
        FROM restaurant_tables
        ORDER BY table_number ASC
    `);

    return tables;
};


/**
 * Find tables that are available for a particular
 * date, time, guest count and table type.
 *
 * IMPORTANT:
 * This function does NOT return reservations.
 *
 * It only returns tables that are currently available.
 */
const findAvailableTables = async ({
    reservationDate,
    reservationTime,
    guests,
    tableType
}) => {

    const sql = `
        SELECT
            rt.id,
            rt.table_number,
            rt.seats,
            rt.type

        FROM restaurant_tables rt

        WHERE
            rt.seats >= ?
            AND rt.type = ?

            AND NOT EXISTS (

                SELECT 1

                FROM table_reservations tr

                WHERE
                    tr.table_id = rt.id

                    AND tr.reservation_date = ?

                    AND tr.status IN ('Pending', 'Confirmed')

                    AND ? < ADDTIME(
                        tr.reservation_time,
                        SEC_TO_TIME(tr.duration_minutes * 60)
                    )

                    AND ADDTIME(
                        ?,
                        SEC_TO_TIME(120 * 60)
                    ) > tr.reservation_time

            )

        ORDER BY
            rt.seats ASC,
            rt.table_number ASC
    `;

    const [tables] = await db.execute(sql, [
        guests,
        tableType,
        reservationDate,
        reservationTime,
        reservationTime
    ]);

    return tables;
};


export default {
    getAllTables,
    findAvailableTables
};