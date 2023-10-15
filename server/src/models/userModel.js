const {pool} = require("../../db");

const setUser = async (user)=>{
  const {name, surname, username, password, user_role} = user
  const query = 'INSERT INTO users (name, surname, username, password, user_role) VALUES ($1, $2, $3, $4, $5)';
  try {
    const res = await pool.query(query, [name, surname, username, password, user_role])
    return res
  } catch (error) {
    return null
  }
}

const getUserByUsername = async(username) =>{
  const query = 'SELECT * FROM users WHERE username = $1'
  try {
    const res = await pool.query(query, [username])
    return res
  } catch (error) {
    console.log(error)
    return null
  }
}

const setAuth = async(username, token) =>{
  const query = "UPDATE users SET auth_token = $1 WHERE username = $2";
  try {
    const res = await pool.query(query, [token, username]);
    return res;
  } catch (error) {
    return null;
  }
}

const checkAuth = async(username, auth_token)=>{
  const query = "SELECT * FROM users WHERE username=$1 AND auth_token=$2";
  try {
    const res = await pool.query(query, [username, auth_token]);
    return res
  } catch (error) {
    return null;
  }
}

module.exports = {setUser, getUserByUsername, setAuth, checkAuth}