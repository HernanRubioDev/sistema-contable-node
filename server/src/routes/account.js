const {Router} = require("express")
const {addMajorAccount, addMinorAccount, searchAccountByName} = require("../controllers/accountController");
const {MajorAccountsMiddleware} = require("../middlewares/MajorAccountsMiddleware");

const accountRouter = Router();

accountRouter.post("/addMajor/:username", MajorAccountsMiddleware, addMajorAccount)

accountRouter.post("/addMinor/:username", addMinorAccount)

accountRouter.get("/get/:username", searchAccountByName)

module.exports = accountRouter;