const {Router} = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { searchConcepts } = require("../controllers/conceptsController");

const conceptRouter = Router();

conceptRouter.get("/getConcepts/:username/:user_role/:auth_token", authMiddleware, searchConcepts);

module.exports=conceptRouter;