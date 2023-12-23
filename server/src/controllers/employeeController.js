const {setEmployee, getEmployeeById, getAllEmployees} = require('../models/employeeModel');

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

const searchAllEmployees = async(req, res)=>{
  try {
    const response = await getAllEmployees()
    switch (true) {
      case response.rowCount !== 0:
        res.json({status:200, employees: response.rows[0]}) //VERIFICAR SI ROWS[0] DEVUELVE SOLO UNA FILA O TODAS
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

module.exports={addNewEmployee, searchEmployeeById, searchAllEmployees}