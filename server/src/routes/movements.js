const {Router} = require("express");
const {authMiddleware} = require("../middlewares/authMiddleware")
const {addNewMovement, searchMovementQuantity, searchMovementByDates, searchLineById, searchLineFormLedger} = require("../controllers/movementsController");
const { searchMovementByDatesMiddleware } = require("../middlewares/searchMovesByDatesMiddleware");
const { LedgerBookMiddleware } = require("../middlewares/LedgerBookMiddleware");

const movementsRouter = Router();

movementsRouter.post("/addMovement/:username/:user_role/:auth_token", authMiddleware, addNewMovement);

movementsRouter.get("/getMovementQuantity/:username/:user_role/:auth_token", authMiddleware, searchMovementQuantity);

movementsRouter.get("/getMovementByDates/:username/:user_role/:auth_token", authMiddleware, searchMovementByDatesMiddleware, searchMovementByDates);

movementsRouter.get("/getMoveLineById/:username/:user_role/:auth_token", authMiddleware, searchLineById);

movementsRouter.get("/getLineByForLedger/:username/:user_role/:auth_token", authMiddleware, LedgerBookMiddleware ,searchLineFormLedger);


module.exports=movementsRouter
