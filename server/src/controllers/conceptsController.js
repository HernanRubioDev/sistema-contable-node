const { getConcepts } = require("../models/conceptModel")

const searchConcepts = async (req, res)=>{

  try {
    const response = await getConcepts();
    switch (true) {
      case response.rowCount !== 0:
        res.json({status:200, concepts: response.rows})
        break;
    
      case response.rowCount === 0:
        res.json({status:404, title:"Error", body:"No se han encontrado conceptos.", success: false})
        break

      default:
        response.json({status:500, title:"Error", body:"No se pudo realizar la operacion. Intentelo mas tarde.", success:false})
        break;
    }
  } catch (error) {
    response.json({status:500, title:"Error", body:"No se pudo realizar la operacion. Intentelo mas tarde.", success:false})
  }
}

module.exports={searchConcepts}