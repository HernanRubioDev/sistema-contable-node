const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors")

//ROUTES
const userRouter = require("./src/routes/user");
const accountRouter = require("./src/routes/account");
const movementsRouter = require("./src/routes/movements");
const employeeRouter = require("./src/routes/employee");
const cityRouter = require("./src/routes/city");
const categoryRouter = require("./src/routes/category");
const bankRouter = require("./src/routes/bank");
const conceptRouter = require("./src/routes/concept")

//MIDDLEWARES
app.use(cors({origin: true}))
app.use(express.json());

app.use("/user", userRouter);
app.use("/account", accountRouter);
app.use("/movement", movementsRouter);
app.use("/employee", employeeRouter);
app.use("/city", cityRouter);
app.use("/category", categoryRouter);
app.use("/bank", bankRouter);
app.use("/concept", conceptRouter);

app.listen(3000, ()=>{
  console.log("Escuchando en el puerto 3000.")
})