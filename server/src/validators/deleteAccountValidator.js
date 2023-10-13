const {pool} = require("../../db")

const deleteMajorAccountValidation = async (account)=>{

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

const deleteMinorAccoutValidation = async(account)=>{
  const {id_account} = account;
  const errors = {}
  const query = "SELECT * FROM accounts_moves_lines WHERE id_account = $1";
  const moves = await pool.query(query, [id_account])
  moves.rowCount = 1;
  switch (true) {
    case moves.rowCount !== 0:
      errors.message = "No se puede eliminar una cuenta que posee movimientos asociados."
      break;
  
    default:
      delete errors.message
      break;
  }
  return errors
}

module.exports = {deleteMajorAccountValidation, deleteMinorAccoutValidation}