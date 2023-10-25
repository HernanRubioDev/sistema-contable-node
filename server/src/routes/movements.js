const {Router} = require("express");
const {authMiddleware} = require("../middlewares/authMiddleware")
const {addNewMovement, searchMovementQuantity, searchMovementByDates, searchLineById, searchLineFormLedger, searchLinesForJournal} = require("../controllers/movementsController");
const { searchMovementByDatesMiddleware } = require("../middlewares/searchMovesByDatesMiddleware");
const { LedgerBookMiddleware } = require("../middlewares/LedgerBookMiddleware");
const { JournalBookMiddleware } = require("../middlewares/JournalBookMiddleware");
const { movementMiddleware } = require("../middlewares/movementMiddleware");

const movementsRouter = Router();

movementsRouter.post("/addMovement/:username/:user_role/:auth_token", authMiddleware, movementMiddleware, addNewMovement);

movementsRouter.get("/getMovementQuantity/:username/:user_role/:auth_token", authMiddleware, searchMovementQuantity);

movementsRouter.get("/getMovementByDates/:username/:user_role/:auth_token", authMiddleware, searchMovementByDatesMiddleware, searchMovementByDates);

movementsRouter.get("/getMoveLineById/:username/:user_role/:auth_token", authMiddleware, searchLineById);

movementsRouter.get("/getLineByForLedger/:username/:user_role/:auth_token", authMiddleware, LedgerBookMiddleware ,searchLineFormLedger);

movementsRouter.get("/getLineByForJournal/:username/:user_role/:auth_token", authMiddleware, JournalBookMiddleware, searchLinesForJournal);


module.exports=movementsRouter
