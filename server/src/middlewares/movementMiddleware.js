const { isEmpty } = require("../utils/isEmpty");
const { movementValidator } = require("../validators/movementValidator")

const movementMiddleware = (req, res, next)=>{
 const validations = {...movementValidator(req.body)}
 isEmpty(validations) ? 
 res.json({status:400, title:"Error", body: validations.message, success: false}) 
 : 
 next();
}

module.exports={movementMiddleware}