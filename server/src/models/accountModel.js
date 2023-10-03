const {pool} = require("../../db");

const setAccount = async(idUser, newAccount)=>{
  const {name, recivesCredit, credit, code, date_creation, id_company} = newAccount
  console.log(id_company)
  const query = "INSERT INTO accounts (name, get_credit, credit, id_user, code, date_creation, id_company) VALUES ($1, $2, $3, $4, $5, $6, $7)";
  try {
    const res = await pool.query(query, [name, recivesCredit, credit, idUser, code, date_creation, id_company])
    return res
  } catch (error) {
    return null
  }
}

const getLastMajorAccount = async (id_company, type)=>{ 
  const query = `SELECT * FROM accounts WHERE code LIKE '%00' AND code LIKE '${type}%' AND id_company=$1 ORDER BY code DESC LIMIT 1`
  
  try {
    const res = await pool.query(query, [id_company])
    return res;
  } catch (error) {
    return null
  }
}

const getLastMinorAccount = async (id_company, mayorAccount) =>{
  const query = `SELECT * FROM accounts WHERE code LIKE '${mayorAccount}%' AND id_company = $1 ORDER BY code DESC LIMIT 1`
  try {
    const res = await pool.query(query, [id_company]);
    return res
  } catch (error) {
    return null
  }
}

const getMajorsAccounts = async(id_company)=>{
  const query = `SELECT * FROM accounts WHERE code LIKE '%00' AND id_company=$1`;
  try {
    const res = await pool.query(query, [id_company]);
    return res
  } catch (error) {
    return null
  }
}

const getAccountByName = async(id_company, accountName)=>{
  const query = `SELECT * FROM accounts WHERE name LIKE '${accountName}%' AND id_company=$1`;
  try {
    const res = await pool.query(query,[id_company]);
    return res;
  } catch (error) {
    return null
  }
}

const patchAccoutName = async(id_account, name)=>{
  const query = "UPDATE accounts SET name=$1 WHERE id_account=$2";
  try {
    const res = await pool.query(query,[name, id_account])
    return res
  } catch (error) {
    return null
  }
}

const deleteAccount = async(id_account)=>{
  const query = "DELETE FROM accounts WHERE id_account=$1";
  try {
    const res = pool.query(query,[id_account])
    return res;
  } catch (error) {
    return null;
  }
}

module.exports = {setAccount, getLastMajorAccount, getLastMinorAccount, getMajorsAccounts, getAccountByName, patchAccoutName, deleteAccount}

