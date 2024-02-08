const { isEmpty } = require("../utils/isEmpty");
const { reciptDateValidation } = require("../validators/addReciptValidation");

const addReciptMiddleware = async(req, res, next)=>{
  const {payment_date, cuil} = req.body

  const validations = {...await reciptDateValidation(cuil, payment_date)}
  !isEmpty(validations) ?
  next()
  :
  res.json({status:400, title:"Error", body: validations.message, success: false});
}

module.exports={addReciptMiddleware}