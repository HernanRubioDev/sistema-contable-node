const { getCities } = require("../models/cityModel")

const searchCities = async(req, res)=>{
  try {
    const response = await getCities()

    switch (true) {
      case response.rowCount !== 0:
        res.json({status:200, cities: response.rows})
        break;

      case response.rowCount === 0:
        res.json({status:404, title:"Error", body:"No se se han encontrado ciudades.", success:false})
        break;
    
      default:
        response.json({status:500, title:"Error", body:"No se pudo realizar la operacion. Intentelo mas tarde.", success:false})
        break
    }
  } catch (error) {
    res.json({status:500, title:"Error", body:"No se pudo realizar la operacion. Intentelo mas tarde.", success:false})
  }
}

module.exports={searchCities}