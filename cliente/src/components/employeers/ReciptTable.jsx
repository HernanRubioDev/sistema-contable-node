import { useEffect, useState } from "react";
import ConceptsRow from "./ConceptsRow";

const ReciptsTable = ({emplyoeeToPay, concepts, getConcepts})=>{
  const {name, surname, city, bank, cuil, category, entry_date, salary} = emplyoeeToPay || ''
  const today = new Date().toLocaleDateString()
  const [totalGrav, setTotalGrav] = useState(0.0)
  const [totalExcen, setTotalExcen] = useState(0.0)
  const [totalDesc, setTotalDesc] = useState(0.0)
  useEffect(()=>{
    getConcepts()
  },[])

  useEffect(()=>{
    if(concepts && salary){
      let totalG = salary;
      console.log(salary)
      let totalE = 0;
      let totalD = 0;
      concepts.forEach(concept => {
        switch (concept.type) {
          case 'G':
            totalG += parseFloat(salary) * parseFloat(concept.percentage)
            break;
          case 'E':
            totalE += parseFloat(salary) * parseFloat(concept.percentage)
            break;
          case 'D':
            totalD += parseFloat(salary) * parseFloat(concept.percentage)
            break;
        }
      });
      setTotalGrav(totalG)
      setTotalExcen(totalE)
      setTotalDesc(totalD)
    }
  },[concepts, salary])

  return(
    <div className="px-3">
      <p className="text-end text-secondary fw-semibold m-0 d-none d-md-block">RECIBO DE HABERES Ley N° 20.744</p>
      <div className="d-flex justify-content-between">
          <img src="icons/hacker.svg" className="col-2 col-md-1"/>
        <ul className="ms-3 p-0 text-secondary fw-medium fs-6 flex-grow-1">
          <li className="list-group-item">Empresa:<span className="fw-normal"> C.O.R.R.U.P.T</span></li>
          <li className="list-group-item">Ubicación: <span className="fw-normal">Calle Falsa 123</span></li>
          <li className="list-group-item">Ciudad: <span className="fw-normal">Pergamino, Buenos Aires</span></li>
          <li className="list-group-item">CUIT N°: <span className="fw-normal">123456789</span></li>
        </ul>
        <div>
          <p className="text-secondary fw-semibold mt-1 d-none d-md-block">DUPLICADO</p>
        </div>
      </div>
      <table className="table table-striped table-bordered mt-2">
        <thead>
          <tr>
            <th className="text-secondary" scope="col">Apellido y Nombre</th>
            <th className="text-secondary" scope="col">Legajo</th>
            <th className="text-secondary" scope="col">CUIL</th>
            <th className="text-secondary" scope="col">Banco</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{surname+' '+name}</td>
            <td>????</td>
            <td>{cuil}</td>
            <td>{bank}</td>
          </tr>
        </tbody>
        <thead>
          <tr>
            <th className="text-secondary" scope="col">Concepto</th>
            <th className="text-secondary" scope="col">Rem. Gravadas</th>
            <th className="text-secondary" scope="col">Rem. Exentas</th>
            <th className="text-secondary" scope="col">Descuentos</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Sueldo</td>
            <td>{salary}</td>
            <td></td>
            <td></td>
          </tr>
          {concepts.map((concept, index) => <ConceptsRow key={index} data={concept} salary={salary}/>)}
          
        </tbody>
        <thead>
          <tr>
            <th className="text-secondary" scope="col">Fecha Actual</th>
            <th className="text-secondary" scope="col">Total Gravadas</th>
            <th className="text-secondary" scope="col">Total Exentas</th>
            <th className="text-secondary" scope="col">Total Descuentos</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{today}</td>
            <td>{totalGrav}</td>
            <td>{totalExcen}</td>
            <td>{totalDesc}</td>
          </tr>
        </tbody>
        <thead>
          <tr>
            <th className="" scope="col" colSpan='3'>Total Neto</th>
            <th className=" " scope="col">{totalGrav-totalDesc+totalExcen}</th>
          </tr>
        </thead>
      </table>
      <footer className="d-flex">
        <div className="border w-50 py-5">
          <p className="text-secondary fw-medium px-3">Recibí el importe neto de esta liquidación en pago de mi remuneración correspondiente al período 
            indicado y duplicado de la misma conforme a Ley vigente.</p>
        </div>

        <div className="border d-flex flex-grow-1 align-items-end justify-content-center">
          <p className="text-center text-secondary fw-semibold">Firma del Empleado</p>
        </div>
      </footer>
    </div>
  );
}

export default ReciptsTable;