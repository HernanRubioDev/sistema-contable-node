const { getCategories } = require("../models/categoryModel")

const searchCategories = async(req, res) =>{
  try {
    const response = await getCategories();
    
    switch (true) {
      case response.rowCount !== 0:
        res.json({status:200, categories: response.rows})
        break;
    
      case response.rowCount === 0:
        res.json({status:404, title:"Error", body:"No se se han encontrado categorias.", success:false})

      default:
        response.json({status:500, title:"Error", body:"No se pudo realizar la operacion. Intentelo mas tarde.", success:false})
        break;
    }
  } catch (error) {
    response.json({status:500, title:"Error", body:"No se pudo realizar la operacion. Intentelo mas tarde.", success:false})
  }
}

module.exports={searchCategories}