const { getMovementQuantity, getMovementByDates, getLineById} = require("../models/movementModel");
const {getUserByUsername} = require("../models/userModel");
const fetch = require('node-fetch');

const addNewMovement = async(req, res) =>{
  const movement = req.body;

  try {
    const response = await fetch("http://localhost:5000/movements",{
      method:"POST",
      body: JSON.stringify(movement),
      headers: {
        "Content-Type":"application/json"
      }
    })
    res.json(response)
  } catch (error) {
    console.log(error)
  }
}

const searchMovementQuantity = async(req, res)=>{
  try {
    const response = await getMovementQuantity();
    switch (true) {
      case response.rowCount !==0:
        res.json({status: 200, quantity: response.rows})
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
        res.json({status:200, movements: response.rows});
        break;
    
      default:
        res.json({status:500, title:"Error", body:"No se pudo realizar la operacion. Intentelo mas tarde.", success:false})
        break;
    }
  } catch (error) {
    res.json({status:500, title:"Error", body:"No se pudo realizar la operacion. Intentelo mas tarde.", success:false})
  }
}

const searchLineById = async(req, res)=>{
  const{id_move} = req.query
  try {
     const lines = await getLineById(id_move);
     console.log(lines.rows)
     switch (true) {
      case lines.rowCount !==0:
        res.json({status:200, lines: lines.rows});
        break;
     
      default:
        res.json({status:500, title:"Error", body:"No se pudo realizar la operacion. Intentelo mas tarde.", success:false})
        break;
     }
  } catch (error) {
    res.json({status:500, title:"Error", body:"No se pudo realizar la operacion. Intentelo mas tarde.", success:false})
  }
}

module.exports={addNewMovement, searchMovementQuantity, searchMovementByDates, searchLineById}