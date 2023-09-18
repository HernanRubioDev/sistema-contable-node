const {pool} = require("../../db");

const setAccount = async(account)=>{

}

const getCreditAccount = async (idUser)=>{
  const query = "SELECT * FROM accounts WHERE code LIKE '%00' AND id_user=$1 ORDER BY code DESC LIMIT 1";
  try {
    const res = await pool.query(query, [idUser])
    return res;
  } catch (error) {
    return null
  }
}

module.exports = {setAccount ,getCreditAccount}

