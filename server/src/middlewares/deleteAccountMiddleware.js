const {deleteMajorAccountValidator} = require("../validators/deleteAccountValidator");

const deleteAccountMiddleware = async(req, res, next)=>{
  const account = req.body;
  let validations={};
  console.log(account.get_credit)
  if(account.get_credit){
    console.log("menor")
  }
  else{
   validations = {...await deleteMajorAccountValidator(account)}
  }
 
 Object.keys(validations).length !== 0 ? res.json({"status":400, validations}): next()
}

module.exports={deleteAccountMiddleware}