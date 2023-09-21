const {pool} = require("../../db")
const {checkAuth} = require("../models/userModel")

const authMiddleware = async(req, res, next)=>{
  const auth_token = req.query.auth_token
  try {
    const auth = await checkAuth(auth_token);
    switch (true) {
      case auth.rowCount !== 0:
        next()
        break;
    
      default:
        res.json({status: 401})
        break;
    }
  } catch (error) {
    res.json({status: 500})
  }
}

module.exports={authMiddleware}