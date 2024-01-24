const {Router} = require('express');
const {authMiddleware} = require("../middlewares/authMiddleware");
const { employeeMiddleware } = require('../middlewares/employeeMidlleware');
const { addNewEmployee, searchEmployee} = require('../controllers/employeeController');

const employeeRouter = Router();

employeeRouter.post("/addEmployee/:username/:user_role/:auth_token", authMiddleware, employeeMiddleware, addNewEmployee);

employeeRouter.get("/getEmployee/:username/:user_role/:auth_token", authMiddleware, searchEmployee);


module.exports=employeeRouter