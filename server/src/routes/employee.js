const {Router} = require('express');
const {authMiddleware} = require("../middlewares/authMiddleware");
const { employeeMiddleware } = require('../middlewares/employeeMidlleware');
const { addNewEmployee } = require('../controllers/employeeController');

const employeeRouter = Router();

employeeRouter.post("/addMovement/:username/:user_role/:auth_token", authMiddleware, employeeMiddleware, addNewEmployee);

module.exports=employeeRouter