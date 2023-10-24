const { getMovementQuantity, getMovementByDates, getLineById, getLineFormLedger, getLinesForJournal} = require("../models/movementModel");
const { getUserByUsername} = require("../models/userModel");
const fetch = require('node-fetch');

const addNewMovement = async(req, res) =>{
  const movement = req.body;
  const {username} = req.params

  try {
    const user = await getUserByUsername(username)
    switch (true) {
      case user.rowCount !==0:
        movement.id_user = user.rows[0].id_user;
        delete movement.null
        break;
    
      default:
        res.json({status:500, title:"Error", body:"Intentelo mas tarde.", success:false})
        break;
    }
  } catch (error) {
    res.json({status:500, title:"Error", body:"Intentelo mas tarde.", success:false})
  }

  try {
    const response = await fetch("http://localhost:5000/movements",{
      method:"POST",
      body: JSON.stringify(movement),
      headers: {
        "Content-Type":"application/json"
      }
    })
    const body = await response.text()
    const parsedBody = JSON.parse(body)
    res.json(parsedBody)
  } catch (error) {
    res.json({status:500, title:"Error", body:"Intentelo mas tarde.", success:false})
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

const searchLineFormLedger = async(req, res)=>{
  const {account, dateFrom, dateTo} = req.query;
  try {
    const response = await getLineFormLedger(account, dateFrom, dateTo);
    switch (true) {
      case response.rowCount !== 0:
        res.json({status:200, lines:response.rows});
        break;

      case response.rowCount === 0:
        res.json({status:404, title:"Error", body:"No se han encontrado movimientos asociados", success:false})
        break;

      default:
        res.json({status:500, title:"Error", body:"No se pudo realizar la operacion. Intentelo mas tarde.", success:false})
        break;
    }
  } catch (error) {
    res.json({status:500, title:"Error", body:"No se pudo realizar la operacion. Intentelo mas tarde.", success:false})
  }
}

const searchLinesForJournal = async(req, res)=>{
  const{dateFrom, dateTo} = req.query
  try {
    const response = await getLinesForJournal(dateFrom, dateTo);
    switch (true) {
      case response.rowCount !== 0:
        res.json({status:200, lines:response.rows});
        break;

      case response.rowCount === 0:
        res.json({status:404, title:"Error", body:"No se han encontrado movimientos asociados", success:false})
        break;

      default:
        res.json({status:500, title:"Error", body:"No se pudo realizar la operacion. Intentelo mas tarde.", success:false})
        break;
    }
  } catch (error) {
    res.json({status:500, title:"Error", body:"No se pudo realizar la operacion. Intentelo mas tarde.", success:false})
  }
}

module.exports={addNewMovement, searchMovementQuantity, searchMovementByDates, searchLineById, searchLineFormLedger, searchLinesForJournal}