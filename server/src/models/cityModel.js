const {pool} = require("../../db");

const getCities = async()=>{
  const query = "SELECT * FROM cities";
  try {
    const res = await pool.query(query);
    return res;
  } catch (error) {
    return null;
  }
}

module.exports = {getCities}