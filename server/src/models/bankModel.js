const {pool} = require("../../db");

const getBanks = async()=>{
  const query = "SELECT * FROM banks";
  try {
    const res = await pool.query(query);
    return res;
  } catch (error) {
    return null;
  }
}

module.exports = {getBanks};