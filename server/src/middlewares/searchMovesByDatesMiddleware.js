const { dateValidation } = require("../validators/searchMovementByDatesValidator")

const searchMovementByDatesMiddleware = (req, res, next)=>{
    const {dateFrom, dateTo} = req.query
    const validations = {...dateValidation(dateFrom, dateTo)}

    Object.keys(validations).length !== 0 
    ? 
    res.json({status:400, title:"Error", body:validations.message, success: false})
    : 
    next()
}

module.exports={searchMovementByDatesMiddleware}