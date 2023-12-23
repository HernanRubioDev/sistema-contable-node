const { isEmpty } = require("../utils/isEmpty");
const {nameValidation, surnameValidation, entryDateValidation, cuilValidation, salaryValidation, birthValidation, childrensValidation} = require("../validators/employeeValidator");

const employeeMiddleware = (req, res, next)=>{
  const {name,surname,entry_date,cuil,salary,birth,childrens} = req.body

  const validations = {...nameValidation(name.trim()), ...surnameValidation(surname.trim()), ...entryDateValidation(entry_date), ...cuilValidation(cuil), ...salaryValidation(salary), ...birthValidation(birth), ...childrensValidation(childrens)}

  isEmpty(validations) ? 
  res.json({status:400, title:"Error", body: validations.message, success: false}) 
  : 
  console.log("paso")
  //next();
}

module.exports={employeeMiddleware}