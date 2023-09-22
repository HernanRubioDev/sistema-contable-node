const {pool} = require("../../db")

const nameValidator = async(name)=>{
  const errors={}
  const res = await pool.query("SELECT * FROM accounts WHERE name=$1", [name]);
  switch (true) {
    case name === '':
      errors.name = "Este campo es obligatorio."
      break;

    case res.rowCount !== 0:
      errors.name = "Ya existe una cuenta con este nombre."
      break;

    default:
      delete errors.name
      break;
  }
  return errors
}

const initialCreditValidator = (credit)=>{
 const errors = {}

 switch (true) {
  case credit < 0:
    errors.credit = "El saldo inicial no puede ser menor a 0."
    break;
 
  default:
    delete errors.credit
    break;
 }
}

module.exports = {nameValidator, initialCreditValidator}