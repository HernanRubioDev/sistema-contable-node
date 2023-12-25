const {Router} = require('express');
const {authMiddleware} = require("../middlewares/authMiddleware");
const { employeeMiddleware } = require('../middlewares/employeeMidlleware');
const { addNewEmployee, searchEmployee, searchCities} = require('../controllers/employeeController');

const employeeRouter = Router();

employeeRouter.post("/addMovement/:username/:user_role/:auth_token", authMiddleware, employeeMiddleware, addNewEmployee);

employeeRouter.get("/getEmployee/:username/:user_role/:auth_token", authMiddleware, searchEmployee);

employeeRouter.get("/getCities/:username/:user_role/:auth_token", authMiddleware, searchCities);

module.exports=employeeRouter