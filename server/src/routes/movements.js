const {Router} = require("express");
const {authMiddleware} = require("../middlewares/authMiddleware")
const {addNewMovement, searchMovementQuantity, searchMovementByDates} = require("../controllers/movementsController");
const { searchMovementByDatesMiddleware } = require("../middlewares/searchMovesByDatesMiddleware");

const movementsRouter = Router();

movementsRouter.post("/addMovement/:username/:user_role/:auth_token", authMiddleware, addNewMovement);

movementsRouter.get("/getMovementQuantity/:username/:user_role/:auth_token", authMiddleware, searchMovementQuantity);

movementsRouter.get("/getMovementByDates/:username/:user_role/:auth_token", authMiddleware, searchMovementByDatesMiddleware, searchMovementByDates);

module.exports=movementsRouter
