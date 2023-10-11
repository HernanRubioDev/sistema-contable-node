const {pool} = require("../../db")

const deleteMajorAccountValidator = async (account)=>{

  const {code} = account;
  const errors = {}

  const query = `SELECT * FROM accounts WHERE code LIKE '${code.slice(0,3)}%'`
  const credit_account = await pool.query(query)

  switch (true) {
    case credit_account.rowCount !== 1:
      errors.message="Esta cuenta posee otras cuentas asociadas.";
      break;
  
    default:
      delete errors.message
      break;
  }
  return errors;
}

module.exports = {deleteMajorAccountValidator}