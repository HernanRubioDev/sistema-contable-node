const {LedgerBookValidator} = require("../validators/ledgerBookValidator")

const LedgerBookMiddleware = (req, res, next)=>{

  const validations = {...LedgerBookValidator(req.query)}

  Object.keys(validations).length !== 0 
  ? 
  res.json({status:400, title:"Error", body:validations.message, success: false})
  : 
  next()
}

module.exports={LedgerBookMiddleware}