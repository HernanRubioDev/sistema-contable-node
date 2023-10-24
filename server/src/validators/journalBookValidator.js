const journalBookValidator = (query)=>{
  const {dateFrom, dateTo} = query
  
  const errors ={}

  switch (true) {
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

module.exports={journalBookValidator}