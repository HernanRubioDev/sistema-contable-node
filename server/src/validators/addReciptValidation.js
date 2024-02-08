const {pool} = require("../../db")

const reciptDateValidation = async(cuil, payment_date)=>{
  const month = new Date().toISOString().slice(5,7)
  const errors = {}
  const res = await pool.query("SELECT TO_CHAR(payment_date, 'MM') as payment_date FROM pay_checks WHERE cuil = $1",[cuil]);
  switch (true) {
    case res.rowCount !==0:
      if(res.rows[0].payment_date === month){
        errors.message=`Ya existe una devengación a este empleado correspondiente al mes ${month}`
      }
      break;
  
    default:
      delete errors.message
      break;
  }
  return errors
}

module.exports={reciptDateValidation}