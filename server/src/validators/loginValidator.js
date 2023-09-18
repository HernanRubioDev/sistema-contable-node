const usernameValidation = (username)=>{
  const errors={}

  switch (true) {
    case username === '':
        errors.username = "Este campo es obligatorio."
      break;

    default:
      delete errors.username
      break;
  }

  return errors;
}

const passwordValidation = (password)=>{
  const errors = {}

  switch (true) {
    case password === "":
      errors.password = "Este campo es obligatorio."
      break;
      
    default:
      delete errors.password
      break;
  }
  return errors;
}

module.exports = {usernameValidation, passwordValidation}