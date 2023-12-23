const {pool} = require("../../db")

const nameVilation = (name)=>{
  const errors={}
  nameRegEx = /^[a-zA-Z ]+$/g;
  switch (true) {
    case name === '':
        errors.name = "Este campo es obligatorio."
      break;
    
    case name.length < 3 || name.length > 20:
      errors.name = "Este campo debe contener de 3 a 20 caracteres"
      break;

    case !nameRegEx.test(name):
      errors.name = "Este campo solo acepta letras."
      break;

    default:
      delete errors.name
      break;
  }

  return errors;
}

const surnameVilation = (surname)=>{
  const errors={}
  const nameRegEx = /^[a-zA-Z ]+$/g;
  switch (true) {
    case surname === '':
        errors.surname = "Este campo es obligatorio."
      break;
    
    case surname.length < 3 || surname.length > 20:
      errors.surname = "Este campo debe contener de 3 a 20 caracteres"
      break;

    case !nameRegEx.test(surname):
      errors.surname = "Este campo solo acepta letras."
      break;

    default:
      delete errors.surname
      break;
  }
  return errors;
}

const usernameVilation = async (username)=>{
  const userRegEx = /^[a-zA-Z0-9 ._=]+$/g
  const errors = {}
  const res = await pool.query("SELECT username FROM users WHERE username = $1", [username]);
  switch (true) {
    case username === "":
      errors.username = "Este campo es obligatorio."
      break;

    case !userRegEx.test(username):
      errors.username = "Este campo solo acepta letras, núymeros, espacios y '. _ ='."
      break;

    case res.rowCount !== 0:
      errors.username = "Este nombre de usuario no esta disponible."
      break;

    default:
      delete errors.username
      break;
  }
  return errors;
}

const passwordVilation = (password)=>{
  const passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
  const errors = {}

  switch (true) {
    case password === "":
      errors.password = "Este campo es obligatorio."
      break;

    case password.length < 8 || password.length >30:
      errors.password = "La contraseña debe contener entre 8 y 30 caracteres."
      break;

    case !passwordRegEx.test(password):
      errors.password = "La contraseña debe contener al menos una letra mayúscula, una minúscula y un número."
      break;
      
    default:
      delete errors.password
      break;
  }
  return errors;
}

const repeatPasswordValidation = (rePassword, password)=>{
  const errors = {}
  switch (true) {
    case rePassword !== password:
      errors.rePassword = "Las contraseñas no coinciden."
      break;
    
    case !rePassword:
      errors.rePassword = "Este campo es obligatorio"
      break

    default:
      delete errors.rePassword;
      break;
  }
  return errors;
}

module.exports = {nameVilation, surnameVilation, usernameVilation, passwordVilation, repeatPasswordValidation}