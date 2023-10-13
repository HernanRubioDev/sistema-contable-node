const {pool} = require("../../db")

const minorAccountValidations = async(account)=>{
  const {name, code, credit} = account
  const errors = {}
  
  const res = await pool.query("SELECT * FROM accounts WHERE name=$1", [name]);

  switch (true) {
    case name === '':
      errors.message = "El nombre de la cuenta es obligatorio."
      break;

    case res.rowCount !== 0:
      errors.message = "Ya existe una cuenta con este nombre."
      break;

    case code === '':
      errors.message = "Debe seleccionar una cuenta."
      break

    case credit < 0:
      errors.message = "El monto no puede ser menor a 0"
      break;

    default:
      delete errors.message;
      break;
  }
  
  return errors
}

module.exports = {minorAccountValidations}

