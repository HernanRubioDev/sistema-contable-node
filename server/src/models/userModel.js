const {pool} = require("../../db");

const setUser = async (user)=>{
  const {name, surname, username, password} = user
  const query = 'INSERT INTO users (name, surname, username, password) VALUES ($1, $2, $3, $4)';
  try {
    const res = await pool.query(query, [name, surname, username, password])
    return res
  } catch (error) {
    
  }
}

const getUserByUsername = async(username) =>{
  const query = 'SELECT * FROM users WHERE username = $1'
  try {
    const res = await pool.query(query, [username])
    return res
  } catch (error) {
    console.error(error)
  }
}

const setAuth = async(username, token) =>{
  const query = "UPDATE users SET auth_token = $1 WHERE username = $2";
  try {
    const res = await pool.query(query, [token, username]);
    return res;
  } catch (error) {
    console.log("entro")
    return null;
  }
}

module.exports = {setUser, getUserByUsername, setAuth}