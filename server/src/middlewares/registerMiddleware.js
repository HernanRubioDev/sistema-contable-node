const {nameVilation, surnameVilation, usernameVilation, passwordVilation, repeatPasswordValidation} = require("../validators/registerValidator");

const registerMiddleware = async(req, res, next)=>{
  const {name, surname, username, password, rePassword} = req.body;
  const validations = {...nameVilation(name), ...surnameVilation(surname), ...await usernameVilation(username), ...passwordVilation(password), ...repeatPasswordValidation(rePassword, password)}
  
  Object.keys(validations).length !== 0 ? res.json({"status":400,validations}) : next();
}

module.exports = {registerMiddleware}
