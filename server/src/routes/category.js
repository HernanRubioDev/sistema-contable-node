const {Router} = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { searchCategories } = require("../controllers/categoryController");

const categoryRouter = Router();

categoryRouter.get("/getCategories/:username/:user_role/:auth_token", authMiddleware, searchCategories);

module.exports = categoryRouter