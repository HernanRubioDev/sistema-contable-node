const {Router} = require("express")
const {addAccount} = require("../controllers/accountController");

const accountRouter = Router();

accountRouter.post("/add", addAccount)

module.exports = accountRouter;