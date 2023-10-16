const {pool} = require("../../db");

const getMovementQuantity = async()=>{
    const query = "SELECT COUNT(*)+1 AS count FROM accounts_moves";
    try {
        const res =  await pool.query(query);
        return res
    } catch (error) {
        return null;
    }
}

const getMovementByDates = async(dateFrom, dateTo)=>{
    const query = "SELECT * FROM accounts_moves WHERE move_date BETWEEN $1 AND $2"
    try {
        const res = await pool.query(query,[dateFrom, dateTo]);
        return res
    } catch (error) {
        return null;
    }
}

module.exports={getMovementQuantity, getMovementByDates}
