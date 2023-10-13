const {deleteMajorAccountValidation, deleteMinorAccoutValidation} = require("../validators/deleteAccountValidator");

const deleteAccountMiddleware = async(req, res, next)=>{
  const account = req.body;
  let validations={};
  if(account.recive_credit){
    validations = {...await deleteMinorAccoutValidation(account)}
  }
  else{
   validations = {...await deleteMajorAccountValidation(account)}
  }
 
 Object.keys(validations).length !== 0 ? res.json({"status":400, validations}): next()
}

module.exports={deleteAccountMiddleware}