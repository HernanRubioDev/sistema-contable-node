const {Router} = require("express")
const {addMajorAccount, addMinorAccount} = require("../controllers/accountController");

const accountRouter = Router();

accountRouter.post("/addMajor/:username", addMajorAccount)

accountRouter.post("/addMinor/:username", addMinorAccount)

module.exports = accountRouter;