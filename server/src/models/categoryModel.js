const {pool} = require("../../db");

const getCategories = async()=>{
  const query = "SELECT * FROM categories";
  try {
    const res = await pool.query(query);
    return res;
  } catch (error) {
    return null;
  }
}

module.exports = {getCategories};