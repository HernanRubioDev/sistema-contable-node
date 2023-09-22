const {nameValidator, initialCreditValidator} = require("../validators/MajorAccountValidator")

const MajorAccountsMiddleware = async(req, res, next)=>{
  const {name, credit} = req.body;
  const validations = {... await nameValidator(name.trim()), ...initialCreditValidator(credit)}
  console.log(validations)
  Object.keys(validations).length !== 0 ? res.json({"status":400, validations}): console.log("next")
}

module.exports ={MajorAccountsMiddleware}