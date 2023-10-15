const {Router} = require("express")
const {addMajorAccount, addMinorAccount, searchMajorAccounts, searchAccountByName, editAccount, removeAccount, searchMinorAccounts} = require("../controllers/accountController");
const {MajorAccountsMiddleware} = require("../middlewares/MajorAccountsMiddleware");
const {authMiddleware} = require("../middlewares/authMiddleware")
const {deleteAccountMiddleware} = require("../middlewares/deleteAccountMiddleware");
const { MinorAccountsMiddleware } = require("../middlewares/MinorAccountsMiddleware");
const accountRouter = Router();


accountRouter.post("/addMajor/:username/:user_role/:auth_token", authMiddleware, MajorAccountsMiddleware, addMajorAccount)


accountRouter.post("/addMinor/:username/:user_role/:auth_token", authMiddleware, MinorAccountsMiddleware, addMinorAccount)


accountRouter.get("/getMajorAccounts/:username/:user_role/:auth_token", authMiddleware, searchMajorAccounts)


accountRouter.get("/getMinorAccounts/:username/:user_role/:auth_token", authMiddleware, searchMinorAccounts)


accountRouter.get("/getAccounts/:username/:user_role/:auth_token", authMiddleware, searchAccountByName)

/*Hacer validaciones para el nombre si es necesario*/
accountRouter.patch("/editAccount/:username/:user_role/:auth_token", authMiddleware, editAccount)


accountRouter.delete("/deleteAccount/:username/:user_role/:auth_token", authMiddleware, deleteAccountMiddleware, removeAccount)


module.exports = accountRouter;
