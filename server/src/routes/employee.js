const {Router} = require('express');
const {authMiddleware} = require("../middlewares/authMiddleware");
const { employeeMiddleware } = require('../middlewares/employeeMidlleware');
const { addNewEmployee, searchEmployee, payEmployee, searchReciptByDatesAndName} = require('../controllers/employeeController');

const employeeRouter = Router();

employeeRouter.post("/addEmployee/:username/:user_role/:auth_token", authMiddleware, employeeMiddleware, addNewEmployee);

employeeRouter.get("/getEmployee/:username/:user_role/:auth_token", authMiddleware, searchEmployee);

employeeRouter.post("/addRecipt/:username/:user_role/:auth_token", authMiddleware, payEmployee);

employeeRouter.get("/getReciptByDatesAndName/:username/:user_role/:auth_token", authMiddleware, searchReciptByDatesAndName)


module.exports=employeeRouter