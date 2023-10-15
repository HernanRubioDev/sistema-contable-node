const {checkAuth} = require("../models/userModel")

const authMiddleware = async(req, res, next)=>{
  const {username, auth_token, user_role} = req.params

  try {
    const auth = await checkAuth(username, auth_token);
    switch (true) {
      case auth.rowCount === 0:
        res.json({status: 401,title:"Error" ,body:"Usuario no autorizado, será redirigido al login.", success:false})
        break;

      case auth.rows[0].user_role !== user_role:
        res.json({status: 403,title:"Error" ,body:"No tiene permitido realizar esta tarea.", success:false})
        break;
    
      default:
        next();
        break;
    }
  } catch (error) {
    res.json({status: 500,title:"Error" ,body:"Ups...Parece que ha ocurrido un error. Intentelo mas tarde.", success:false})

  }
}

module.exports={authMiddleware}