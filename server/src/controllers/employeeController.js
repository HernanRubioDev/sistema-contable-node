const {setEmployee, getEmployeeById, getEmployee, setNewPayment, getReciptByDatesAndName} = require('../models/employeeModel');

const addNewEmployee = async(req, res)=>{
  const employee = req.body
  const {name} = employee
  try {
    const response = await setEmployee(employee)
    switch (true) {
      case response.rowCount !== 0:
        res.json({status:201, title:"Creado", body:`El empleado ${name} fue agregado exitosamente.`, success:true})
        break;
      
      default:
        res.json({status:500, title:"Error", body:"No se pudo realizar la operacion. Intentelo mas tarde.", success:false})
        break;
    }
  } catch (error) {
    res.json({status:500, title:"Error", body:"No se pudo realizar la operacion. Intentelo mas tarde.", success:false})
  }
}

const searchEmployeeById = async(req, res)=>{
  const employee = req.body
  try {
    const response = await getEmployeeById(employee)
    switch (true) {
      case response.rowCount !== 0:
        res.json({status:200, employee: response.rows[0]})
        break;

      case response.rowCount === 0: // VER SI ESTA BIEN
        res.json({status:404, title:"Error", body:"No se encontro al empleado solicitado.", success:false})
        break;
      
      default:
        res.json({status:500, title:"Error", body:"No se pudo realizar la operacion. Intentelo mas tarde.", success:false})
        break;
    }
  } catch (error) {
    res.json({status:500, title:"Error", body:"No se pudo realizar la operacion. Intentelo mas tarde.", success:false})
  }
}

const searchEmployee = async(req, res)=>{
  const employee = req.query;
  try {
    const response = await getEmployee(employee);
    switch (true) {
      case response.rowCount !== 0:
        res.json({status:200, employees: response.rows})
        break;

      case response.rowCount === 0:
        res.json({status:404, title:"Error", body:"No se han encontrado empelados registrados.", success:false})
        break;
      
      default:
        res.json({status:500, title:"Error", body:"No se pudo realizar la operacion. Intentelo mas tarde.", success:false})
        break;
    }
  } catch (error) {
    res.json({status:500, title:"Error", body:"No se pudo realizar la operacion. Intentelo mas tarde.", success:false})
  }
}

const payEmployee = async(req,res) =>{
  const recipt = req.body;
  try {
    const response = await setNewPayment(recipt);
    switch (true) {
      case response.rowCount !== 0:
        res.json({status:201, title:"Devengado", body:`Devengamiento exitoso del empleado ${recipt.name}.`, success:true})
        break;
    
      default:
        res.json({status:500, title:"Error", body:`Ah ocurrido un error, intentelo más tarde.`, success:true})
        break;
    }
  } catch (error) {
    res.json({status:500, title:"Error", body:`Ah ocurrido un error, intentelo más tarde.`, success:true})
  }
}

const searchReciptByDatesAndName = async(req, res)=>{
  const data = req.query
  try {
    const response = await getReciptByDatesAndName(data);
    switch (true) {
      case response.rowCount !== 0:
        res.json({status:200, recipts: response.rows})
        break;

      case response.rowCount === 0:
        res.json({status:404, title:"Error", body:"No se han encontrado recibos con esos datos.", success:false})
        break;
    
      default:
        res.json({status:500, title:"Error", body:"No se pudo realizar la operacion. Intentelo mas tarde.", success:false})
        break;
    }
  } catch (error) {
    res.json({status:500, title:"Error", body:"No se pudo realizar la operacion. Intentelo mas tarde.", success:false})
  }
}

module.exports={addNewEmployee, searchEmployeeById, searchEmployee, payEmployee, searchReciptByDatesAndName}