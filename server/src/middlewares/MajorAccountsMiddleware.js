const {majorAccountValidations} = require("../validators/MajorAccountValidator")

const MajorAccountsMiddleware = async(req, res, next)=>{

  const validations = {... await majorAccountValidations(req.body)}
  Object.keys(validations).length !== 0 
  ? 
  res.json({status:400, title:"Error", body:validations.message, success: false})
  : 
  next()
}

module.exports ={MajorAccountsMiddleware}