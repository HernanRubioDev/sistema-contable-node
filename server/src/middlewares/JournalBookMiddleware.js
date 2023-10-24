const {journalBookValidator} = require("../validators/journalBookValidator")

const JournalBookMiddleware = (req, res, next)=>{

  const validations = {...journalBookValidator(req.query)}

  Object.keys(validations).length !== 0 
  ? 
  res.json({status:400, title:"Error", body:validations.message, success: false})
  : 
  next()
}

module.exports={JournalBookMiddleware}