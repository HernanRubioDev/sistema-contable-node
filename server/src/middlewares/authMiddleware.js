const {pool} = require("../../db")
const {checkAuth} = require("../models/userModel")

const authMiddleware = async(req, res, next)=>{
  const {username, auth_token} = req.params
  try {
    const auth = await checkAuth(username, auth_token);
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