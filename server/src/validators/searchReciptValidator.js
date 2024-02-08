const dateFromValidation = (date_from)=>{
  const errors = {}
  switch (true) {
    case !date_from || date_from === undefined:
      errors.message = "Debe seleccionar una fecha Desde."
      break;
  
    default:
      delete errors.message
      break;
  }
  return errors
}

const dateToValidation = (date_to)=>{
  const errors = {}
  switch (true) {
    case !date_to:
      errors.message = "Debe seleccionar una fecha Hasta."
      break;
  
    default:
      delete errors.message
      break;
  }
  return errors
}

module.exports={dateFromValidation, dateToValidation}