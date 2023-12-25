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
        res.status(201).json({status:201, title:"¡Bienvendio!", body:"Su cuenta ha sido creada con éxito.", success:true});
        break;
    
      default:
        res.status(500).json({status: 500, title:"Ups...", body:"Parece que ha ocurrido un error...intentelo mas tarde", success:false});
        break;
    }
  } catch (error) {
    res.status(500).json({status:500, title:"Ups...", body:"Parece que ha ocurrido un error...intentelo mas tarde", success:false})
  }
}


const loginUser = async (req, res)=>{
  const {username, password} = req.body;
  let auth = null;
  try {
    const response = await getUserByUsername(username);
    switch (true) {
      case response.rowCount === 0:
        res.json({status:404, message:"El usuario o la contraseña son incorrectos."});
        break;

      case response.rowCount !== 0:
        const hash = response.rows[0].password
        auth = await bcrypt.compare(password, hash) 
        if(auth){
    
          const name = response.rows[0].name;
          const surname = response.rows[0].surname;
          const user_role = response.rows[0].user_role;
    
          const token = await authUser(username)
    
          token !== null ?
          res.json({status:201,auth_token:token, username:username, name:name, surname:surname, user_role: user_role}) 
          : 
          res.json({status:500, title:"Ups...", body:"Parece que ha ocurrido un error...intentelo mas tarde", success:false})
        }
        else {
        res.json({status:403, message:"El usuario o la contraseña son incorrectos."})}
        break

      default:
        res.json({status:500, title:"Ups...", body:"Parece que ha ocurrido un error...intentelo mas tarde", success:false});
        break;
    }
  } catch (error) {
    res.json({status:500, title:"Ups...", body:"Parece que ha ocurrido un error...intentelo mas tarde", success:false});
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