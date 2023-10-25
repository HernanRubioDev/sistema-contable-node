const { movementValidator } = require("../validators/movementValidator")

const movementMiddleware = (req, res, next)=>{
 const validations = {...movementValidator(req.body)}
 Object.keys(validations).length !== 0 ? res.json({status:400, title:"Error", body: validations.message, success: false}) : next();
}

module.exports={movementMiddleware}