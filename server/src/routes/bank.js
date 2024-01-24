const {Router} = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { searchBanks } = require("../controllers/bankController");

const bankRouter = Router();

bankRouter.get("/getBanks/:username/:user_role/:auth_token", authMiddleware, searchBanks);

module.exports = bankRouter;