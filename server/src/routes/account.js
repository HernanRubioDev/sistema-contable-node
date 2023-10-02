const {Router} = require("express")
const {addMajorAccount, addMinorAccount, searchMajorAccounts, searchAccountByName, editAccount} = require("../controllers/accountController");
const {MajorAccountsMiddleware} = require("../middlewares/MajorAccountsMiddleware");
const {authMiddleware} = require("../middlewares/authMiddleware")

const accountRouter = Router();

accountRouter.post("/addMajor/:username/:auth_token", authMiddleware, MajorAccountsMiddleware, addMajorAccount)


accountRouter.post("/addMinor/:username/:auth_token", authMiddleware, addMinorAccount)


accountRouter.get("/getMajorAccounts/:username/:auth_token", authMiddleware, searchMajorAccounts)


accountRouter.get("/getAccounts/:username/:auth_token", authMiddleware, searchAccountByName)


accountRouter.patch("/editAccount/:username/:auth_token", authMiddleware, editAccount)


module.exports = accountRouter;