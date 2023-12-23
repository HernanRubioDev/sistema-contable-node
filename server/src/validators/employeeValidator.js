
  const nameValidation = (name)=>{
    const errors = {}
    const regEx = /^[a-z A-Z]+$/g
    
   switch (true) {
    case !name:
      errors.message = "El campo Nombre es obligatorio."
      break;
   
    case !regEx.test(name):
      errors.message = "El Nombre solo puede contener letras."
      break;

    default:
      delete errors.message
      break;
   }
   return errors
  }

  const surnameValidation = (surname)=>{
    const errors = {}
    const regEx = /^[a-z A-Z]+$/g

   switch (true) {
    case !surname:
      errors.message = "El campo Apellido es obligatorio."
      break;
   
    case !regEx.test(surname):
      errors.message = "El Apellido solo puede contener letras."
      break;

    default:
      delete errors.message
      break;
   }
   return errors
  }

  const entryDateValidation = (entry_date)=>{
    const errors = {}

    switch (true) {
      case !entry_date:
        errors.message = "El campo F. Ingreso es obligatorio."
        break;
    
      default:
        delete errors.message
        break;
    }
    return errors;
  }

  const cuilValidation =(cuil)=>{
    const errors = {}
    const regEx = /^[2]{1}[0-9]{8}[0-9]{1}$/;
    switch (true) {
      case !cuil:
        errors.message = "El campo Cuil es obligatorio."
        break;
    
      case !regEx.test(cuil):
        errors.message = "Formato de Cuil inválido."
        console.log(errors)
        break;

      default:
        delete errors.message;
        break;
    }
    return errors;
  }

  const salaryValidation = (salary)=>{
    const errors = {}
    const regEx = /^[0-9]+$/g

    switch (true) {
      case !salary:
        errors.message = "El campo Salario es obligatorio."
        break;

      case !regEx.test(salary):
        errors.message = "El Salario solo puede contener números."
        break;

      default:
        delete errors.message;
        break;
    }
    return errors;
  }

  const birthValidation = (birth)=>{
    const errors = {}

    switch (true) {
      case !birth:
        errors.message = "El campo F. Nacimiento es obligatorio."
        break;
    
      default:
        delete errors.message
        break;
    }
    return errors;
  }

  const childrensValidation = (childrens)=>{
    const errors = {}
    const regEx = /^[0-9]+$/g

    switch (true) {
      case !childrens:
        errors.message = "El campo Hijos es obligatorio."
        break;

      case !regEx.test(childrens):
        errors.message = "El campo Hijos solo puede contener números."
        break;

      case childrens < 0:
        console.log("entro")
        errors.message = "El campo Hijos no puede ser menor a 0."
        break;

      default:
        delete errors.message
        break;
    }
    return errors
  }

module.exports={nameValidation, surnameValidation, entryDateValidation, cuilValidation, salaryValidation, birthValidation, childrensValidation}