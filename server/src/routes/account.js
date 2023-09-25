const {Router} = require("express")
const {addMajorAccount, addMinorAccount, searchMajorAccounts, searchAccountByName} = require("../controllers/accountController");
const {MajorAccountsMiddleware} = require("../middlewares/MajorAccountsMiddleware");

const accountRouter = Router();

accountRouter.post("/addMajor/:username", MajorAccountsMiddleware, addMajorAccount)

accountRouter.post("/addMinor/:username", addMinorAccount)

accountRouter.get("/getMajorAccounts/:username", searchMajorAccounts)

accountRouter.get("/getAccounts/:username", searchAccountByName)


module.exports = accountRouter;