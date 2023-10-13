const { minorAccountValidations } = require("../validators/MinorAccountValidator");

const MinorAccountsMiddleware = async(req, res, next)=>{
  const validations = {...await minorAccountValidations(req.body)}
  Object.keys(validations).length !== 0 
  ? 
  res.json({status:400, title:"Error", body:validations.message, success: false})
  : 
  next()
}

module.exports = {MinorAccountsMiddleware}