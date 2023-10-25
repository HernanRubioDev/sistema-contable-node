const movementValidator = (movement)=>{
  const {description, rows} = movement

  const errors = {}

  const rowValidation = rowsValidation(rows)
  switch (true) {
    case !description:
      errors.message = "El campo descripción es obligatorio."
      break;
    
    case rows.length === 0:
      errors.message = "El asiento no posee filas."
      break

    case rowValidation !== false:
      errors.message = rowValidation
      break;

    default:
      delete errors.message
      break;
  }
  return errors
}

const rowsValidation = (rows)=>{
  let error;
  rows.forEach(row => {
    switch (true) {
      case !row.ammount:
        error=`El campo Monto correspondiente a ${row.account} esta vacio`
        break

      case parseFloat(row.ammount) < 0:
        error=`El monto correspondiente a ${row.account} debe ser mayor a 0`
        break

      case !row.account:
        error="Existe una movimiento sin una cuenta asociada."
        break

      default:
        error=false
    }
  });
  return error
}

module.exports = {movementValidator}