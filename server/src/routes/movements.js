const {Router} = require("express");
const {authMiddleware} = require("../middlewares/authMiddleware")
const {addNewMovement} = require("../controllers/movementsController");

const movementsRouter = Router();

movementsRouter.post("/addMovement/:username/:user_role/:auth_token", authMiddleware, addNewMovement);

module.exports=movementsRouter
