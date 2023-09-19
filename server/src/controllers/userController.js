const bcrypt = require("bcrypt");
const {setUser, getUserByUsername, setAuth} = require("../models/userModel");
const { v4: uuidv4 } = require('uuid');

const registerUser = async (req, res)=>{
  const user = req.body
  user.password = await bcrypt.hash(user.password, 12)
  try {
    const response = await setUser(user)
    switch (true) {
      case response.rowCount !== 0:
        res.status(201).json({"status":201});
        break;
    
      default:
        res.status(202).json({"status":202});
        break;
    }
  } catch (error) {
    res.status(500).json({"status":500})
  }
}

const loginUser = async (req, res)=>{
  const {username, password} = req.body;
  let auth = null;
  try {
    const response = await getUserByUsername(username);
    switch (true) {
      case response.rowCount === 0:
        res.status(404).json({"status":404});
        break;

      case response.rowCount !== 0:
        const hash = response.rows[0].password
        auth = await bcrypt.compare(password, hash) 
        if(auth){
          const name = response.rows[0].name;
          const surname = response.rows[0].surname;
          const token = await authUser(username)
          token !== null ? 
          res.status(201).json({"status":201,"auth_token":token, "username":username, "name":name, "surname":surname}) 
          : 
          res.status(202).json({"status":202, "auth_token":null});
        }
        else res.status(403).json({"status":403, "auth_token":null})
        break

      default:
        res.status(500).json({"status":500, "auth_token":null});
        break;
    }
  } catch (error) {
    res.status(500).json({"status":500, "auth_token":null});
  }
}

const authUser = async (username)=>{
  const token = uuidv4();
  try {
    const response = await setAuth(username, token);
    if(response.rowCount !== 0){
      return token;
    }
    else return null;
  } catch (error) {
    return null;
  }
}

module.exports = {registerUser, loginUser}