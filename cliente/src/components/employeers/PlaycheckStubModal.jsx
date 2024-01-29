import { useState } from "react";
import ReciptsTable from "./ReciptTable";

const PaycheckStubModal = ({emplyoeeToPay, concepts, getConcepts, createRecipt})=>{
  const today = new Date()
  const initialTotalConcepts = {
    totalGrav:0.0,
    totalExcen:0.0,
    totalDesc:0.0,
    totalSalary:0.0
  }
  
  const [totalConcepts, setTotalConcepts] = useState(initialTotalConcepts)
  
  return(
  <div className="modal fade" id="paycheck_stub" tabIndex="-1" aria-labelledby="paycheck_stub_modal" aria-hidden="true">
      <div className="modal-dialog modal-fullscreen">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="paycheck_stub_modal">Devengamiento</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body p-0 m-0">
            <ReciptsTable emplyoeeToPay={emplyoeeToPay} concepts={concepts} getConcepts={getConcepts} totalConcepts={totalConcepts} today={today} setTotalConcepts={setTotalConcepts}/>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-sm btn-secondary" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>
            <button onClick={()=>createRecipt(emplyoeeToPay, totalConcepts)} type="button" className="btn btn-sm btn-primary" data-bs-dismiss="modal" aria-label="Close">Devengar</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaycheckStubModal;