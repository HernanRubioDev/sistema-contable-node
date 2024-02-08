const {Router} = require('express');
const {authMiddleware} = require("../middlewares/authMiddleware");
const { employeeMiddleware } = require('../middlewares/employeeMidlleware');
const { addNewEmployee, searchEmployee, payEmployee, searchReciptByDatesAndName} = require('../controllers/employeeController');
const { searchReciptMiddleware } = require('../middlewares/searchReciptMiddleware');
const { addReciptMiddleware } = require('../middlewares/addReciptMiddleware');

const employeeRouter = Router();

employeeRouter.post("/addEmployee/:username/:user_role/:auth_token", authMiddleware, employeeMiddleware, addNewEmployee);

employeeRouter.get("/getEmployee/:username/:user_role/:auth_token", authMiddleware ,searchEmployee);

employeeRouter.post("/addRecipt/:username/:user_role/:auth_token", authMiddleware, addReciptMiddleware, payEmployee);

employeeRouter.get("/getReciptByDatesAndName/:username/:user_role/:auth_token", authMiddleware, searchReciptMiddleware, searchReciptByDatesAndName)


module.exports=employeeRouter