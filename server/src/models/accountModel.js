const {pool} = require("../../db");

const setAccount = async(newAccount)=>{
  const {name, recive_credit, credit, code, date_creation} = newAccount
  const query = "INSERT INTO accounts (name, recive_credit, credit, code, date_creation) VALUES ($1, $2, $3, $4, $5)";
  try {
    const res = await pool.query(query, [name, recive_credit, credit, code, date_creation])
    return res
  } catch (error) {
    return null
  }
}

const getLastMajorAccount = async (type)=>{ 
  const query = `SELECT * FROM accounts WHERE code LIKE '%00' AND code LIKE '${type}%' ORDER BY code DESC LIMIT 1`
  
  try {
    const res = await pool.query(query)
    return res;
  } catch (error) {
    return null
  }
}

const getLastMinorAccount = async (mayorAccount) =>{
  const query = `SELECT * FROM accounts WHERE code LIKE '${mayorAccount}%' ORDER BY code DESC LIMIT 1`
  try {
    const res = await pool.query(query);
    return res
  } catch (error) {
    return null
  }
}

const getMajorsAccounts = async()=>{
  const query = `SELECT * FROM accounts WHERE code LIKE '%00'`;
  try {
    const res = await pool.query(query);
    return res
  } catch (error) {
    return null
  }
}

const getMinorAccounts = async() =>{
  const query = `SELECT * FROM accounts WHERE code NOT LIKE '%00'`;
  try {
    const res = await pool.query(query);
    return res
  } catch (error) {
    return null
  }
}

const getMinorAccountsForLedger = async()=>{
  const query = "select sq.code, sq.name from (SELECT * FROM accounts WHERE code NOT LIKE '%00') AS sq INNER JOIN accounts AS acc ON acc.id_account=sq.id_account WHERE sq.code LIKE '1%' OR sq.code LIKE '2%';";
  try {
    const res = await pool.query(query);
    return res
  } catch (error) {
    return null
  }
}

const getAccountByName = async(accountName)=>{
  const query = `SELECT * ,to_char(date_creation, 'DD/MM/YYYY') AS date_creation FROM accounts WHERE name LIKE '${accountName}%' ORDER BY code ASC
`;
  try {
    const res = await pool.query(query);
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

module.exports = {setAccount, getLastMajorAccount, getLastMinorAccount, getMajorsAccounts, getMinorAccounts, getMinorAccountsForLedger, getAccountByName, patchAccoutName, deleteAccount}

