const { getMovementQuantity, getMovementByDates} = require("../models/movementModel");
const {getUserByUsername} = require("../models/userModel");
const fetch = require('node-fetch');

const addNewMovement = async(req, res) =>{
  console.log(req.body)
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
  } catch (error) {
    console.log(error)
  }
}

const searchMovementQuantity = async(req, res)=>{
  try {
    const response = await getMovementQuantity();
    switch (true) {
      case response.rowCount !==0:
        res.json({status: 200, quantity: response.rows[0]})
        break;
    
      default:
        res.json({status:500, title:"Error", body:"No se ha podido encontrar la cantidad de movimientos.", success:false})
        break;
    }
  } catch (error) {        
    res.json({status:500, title:"Error", body:"No se ha podido encontrar la cantidad de movimientos.", success:false})
  }
}

const searchMovementByDates = async(req, res)=>{
  const {dateFrom, dateTo} = req.query;
  try {
    const response = await getMovementByDates(dateFrom, dateTo)
    switch (true) {
      case response.rowCount >= 0:
        res.json({status:200, movements: response.rows[0]});
        break;
    
      default:
        res.json({status:500, title:"Error", body:"No se pudo realizar la operacion. Intentelo mas tarde.", success:false})
        break;
    }
  } catch (error) {
    res.json({status:500, title:"Error", body:"No se pudo realizar la operacion. Intentelo mas tarde.", success:false})
  }
}

module.exports={addNewMovement, searchMovementQuantity, searchMovementByDates}