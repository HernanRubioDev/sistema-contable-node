const {getUserByUsername} = require("../models/userModel");
const fetch = require('node-fetch');

const addNewMovement = async(req, res) =>{
  let id_company;
  const username = req.params.username
  const movement = req.body;
  try {
    const user = await getUserByUsername(username)
    switch (true) {
      case user.rowCount !== 0:
        id_company = user.rows[0].id_company;
        movement.forEach(mov => {
          mov.id_company = id_company
        });
        break;
    
      default:
        res.json({"status":400})
        break;
    }
    console.log(movement)
  } catch (error) {
    res.json({"status":500})
  }

  try {
    const response = await fetch("http://localhost:5000/movement:",{
      method:"POST",
      body: JSON.stringify(movement),
      headers: {
        "Content-Type":"application/json"
      }
    })
    console.log(response)
  } catch (error) {
    console.log(error)
  }
 
}

module.exports={addNewMovement}