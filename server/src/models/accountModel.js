const {pool} = require("../../db");

const setAccount = async(idUser, newAccount)=>{
  const {name, recivesCredit, credit, code, date_creation} = newAccount
  const query = "INSERT INTO accounts (name, get_credit, credit, id_user, code, date_creation) VALUES ($1, $2, $3, $4, $5, $6)";
  try {
    const res = await pool.query(query, [name, recivesCredit, credit, idUser, code, date_creation])
    return res
  } catch (error) {
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

const getAccountByName = async(idUser, accountName)=>{
  const query = `SELECT * FROM accounts WHERE name LIKE '${accountName}%' AND id_user=$1`;
  try {
    const res = await pool.query(query,[idUser]);
    return res;
  } catch (error) {
    return null
  }
}

module.exports = {setAccount, getLastMajorAccount, getLastMinorAccount, getMajorsAccounts, getAccountByName}

