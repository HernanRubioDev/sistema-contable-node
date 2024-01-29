const {pool} = require("../../db");

const getConcepts = async()=>{
  const query = "SELECT * FROM concepts";

  try {
    const res = await pool.query(query);
    return res;
  } catch (error) {
    return null;
  }
}

module.exports={getConcepts}
