const {nameVilation, surnameVilation, usernameVilation, passwordVilation, repeatPasswordValidation, idCompanyValidation} = require("../validators/registerValidator");

const registerMiddleware = async(req, res, next)=>{
  const {name, surname, username, password, rePassword, id_company} = req.body;
  const validations = {...nameVilation(name), ...surnameVilation(surname), ...await usernameVilation(username), ...passwordVilation(password), ...repeatPasswordValidation(rePassword, password), ...idCompanyValidation(id_company)}
  
  Object.keys(validations).length !== 0 ? res.json({"status":400,validations}) : next();
}

module.exports = {registerMiddleware}
