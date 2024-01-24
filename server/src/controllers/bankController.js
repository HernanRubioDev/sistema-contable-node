const { getBanks } = require("../models/bankModel");

const searchBanks = async (req, res)=>{
  try {
    const response = await getBanks();
    switch (true) {
      case response.rowCount !== 0:
        res.json({status:200, banks: response.rows})
        break;

      case response.rowCount === 0:
        res.json({status:404, title:"Error", body:"No se han encontrado bancos.", success:false})
        break;

      default:
        res.json({status:500, title:"Error", body:"No se han podido cargar los bancos. Intentelo mas tarde.", success:false})
        break;
    }
  } catch (error) {
    res.json({status:500, title:"Error", body:"No se han podido cargar los bancos. Intentelo mas tarde.", success:false})
  }
}

module.exports = {searchBanks}