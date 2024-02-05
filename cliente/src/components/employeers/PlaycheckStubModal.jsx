import { useState } from "react";
import ReciptsTable from "./ReciptTable";
import { useEffect } from "react";
import calculateConcepts from "../../utils/calculateConcepts";

const PaycheckStubModal = ({emplyoeeToPay, concepts, getConcepts, createRecipt, setConcepts})=>{
  const today = new Date()
  const initialTotalConcepts = {
    totalGrav:0.0,
    totalExcen:0.0,
    totalDesc:0.0,
    totalSalary:0.0
  }

  const [totalConcepts, setTotalConcepts] = useState(initialTotalConcepts)
  const [recipt, setRecipt] = useState(null) 

  useEffect(()=>{
    getConcepts()
  },[])

  useEffect(()=>{
    if(concepts && emplyoeeToPay){
      const {id_employee, name, surname, cuil, bank, salary, city} = emplyoeeToPay
      const {totalSalary, totalDesc, totalGrav, totalExcen} = totalConcepts
      const newRecipt = {
        id_employee: id_employee,
        file: id_employee+1000,
        name: name,
        surname:surname,
        cuil: cuil,
        bank:bank,
        salary: parseFloat(salary),
        city: city,
        concepts: calculateConcepts(concepts, salary),
        deposite_date: today.toISOString().slice(0, 10),
        payment_date: today.toISOString().slice(0, 10),
        net_total: totalSalary,
        totalGrav: totalGrav,
        totalDesc: totalDesc,
        totalExcen: totalExcen,
        movement:{
          date: today.toISOString().slice(0, 10),
          description: `Devengación de sueldo a ${name} ${surname}`,
          account: 'CMV',
          rows: [
            {
              date: today.toISOString().slice(0, 10),
              account: 'Banco Nacion c/c',
              type: 'haber',
              ammount: totalSalary
            },
            {
              date: today.toISOString().slice(0, 10),
              account: 'Egresos',
              type: 'debe',
              ammount: totalSalary
            }
          ],
        }
      }
      setRecipt(newRecipt)
    }
  },[concepts, emplyoeeToPay, totalConcepts])
  return(
  <div className="modal fade" id="paycheck_stub" tabIndex="-1" aria-labelledby="paycheck_stub_modal" aria-hidden="true">
      <div className="modal-dialog modal-fullscreen">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="paycheck_stub_modal">Devengamiento</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body p-0 m-0">
            <ReciptsTable emplyoeeToPay={emplyoeeToPay} concepts={concepts} getConcepts={getConcepts} totalConcepts={totalConcepts} today={today} setConcepts={setConcepts} setTotalConcepts={setTotalConcepts}/>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-sm btn-secondary" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>
            <button onClick={()=>createRecipt(recipt)} type="button" className="btn btn-sm btn-primary" data-bs-dismiss="modal" aria-label="Close">Devengar</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaycheckStubModal;