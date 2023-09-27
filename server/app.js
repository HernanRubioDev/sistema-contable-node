const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors")

//ROUTES
const userRouter = require("./src/routes/user");
const accountRouter = require("./src/routes/account");

//MIDDLEWARES
app.use(cors({origin: true}))
app.use(express.json());

app.use("/user", userRouter);
app.use("/account/", accountRouter);

app.listen(3000, ()=>{
  console.log("Escuchando en el puerto 3000.")
})