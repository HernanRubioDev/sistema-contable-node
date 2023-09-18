const {usernameValidation, passwordValidation} = require("../validators/loginValidator");

const loginMiddleware = async(req, res, next)=>{
const {username, password} = req.body;

const validations = {...usernameValidation(username), ...passwordValidation(password)}

Object.keys(validations).length !== 0 ? res.json({"status":400,validations}) : next();
}

module.exports = {loginMiddleware};