const {Router} = require("express")
const {addMajorAccount, addMinorAccount, searchAccountByName} = require("../controllers/accountController");

const accountRouter = Router();

accountRouter.post("/addMajor/:username", addMajorAccount)

accountRouter.post("/addMinor/:username", addMinorAccount)

accountRouter.get("/get/:username", searchAccountByName)

module.exports = accountRouter;