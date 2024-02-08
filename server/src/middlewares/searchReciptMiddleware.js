const { isEmpty } = require("../utils/isEmpty")
const {dateFromValidation, dateToValidation} = require('../validators/searchReciptValidator');
const searchReciptMiddleware = (req, res, next)=>{
  const {date_from, date_to} = req.query
  const validations = {...dateFromValidation(date_from), ...dateToValidation(date_to)}
  !isEmpty(validations) ? 
  next()
  :
  res.json({status:400, title:'Error', body: validations.message, success: false})
}

module.exports={searchReciptMiddleware}