const {Router} = require("express");
const {registerUser, loginUser} = require("../controllers/userController");
const {registerMiddleware} = require("../middlewares/registerMiddleware");
const {loginMiddleware} = require("../middlewares/loginMiddleware");

const userRouter = Router()

userRouter.post("/register", registerMiddleware, registerUser);

userRouter.post("/login", loginMiddleware ,loginUser)

module.exports = userRouter;