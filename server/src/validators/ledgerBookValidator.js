const LedgerBookValidator = (query)=>{
  const {account, dateFrom, dateTo} = query
  
  const errors ={}

  switch (true) {
    case account === "":
      errors.message = "Debe seleccionar una cuenta."
      break;
  
    case dateFrom === "":
      errors.message = "Debe seleccionar una fecha de inicio."
      break;
  
    case dateTo === "":
      errors.message = "Debe seleccionar una fecha de fin."
      break;
  
    default:
      delete errors.message
      break;
  }

  return errors
}

module.exports={LedgerBookValidator}