const {pool} = require("../../db");

const setAccount = async(idUser, newAccount)=>{
  const {name, recivesCredit, credit, code} = newAccount
  const query = "INSERT INTO accounts (name, get_credit, credit, id_user, code) VALUES ($1, $2, $3, $4, $5)";
  try {
    const res = await pool.query(query, [name, recivesCredit, credit, idUser, code])
    console.log(res)
    return res
  } catch (error) {
    console.log(error)
    return null
  }
}

const getLastMajorAccount = async (idUser, type)=>{ 
  const query = `SELECT * FROM accounts WHERE code LIKE '%00' AND code LIKE '${type}%' AND id_user=$1 ORDER BY code DESC LIMIT 1`
  try {
    const res = await pool.query(query, [idUser])
    return res;
  } catch (error) {
    return null
  }
}

const getLastMinorAccount = async (idUser, mayorAccount) =>{
  const query = `SELECT * FROM accounts WHERE code LIKE '${mayorAccount}%' AND id_user = $1 ORDER BY code DESC LIMIT 1`
  try {
    const res = await pool.query(query, [idUser]);
    return res
  } catch (error) {
    return null
  }
}

const getMajorsAccounts = async(idUser)=>{
  const query = `SELECT * FROM accounts WHERE code LIKE '%00' AND id_user=$1`;
  try {
    const res = await pool.query(query, [idUser]);
    return res
  } catch (error) {
    return null
  }
}

module.exports = {setAccount, getLastMajorAccount, getLastMinorAccount, getMajorsAccounts}

