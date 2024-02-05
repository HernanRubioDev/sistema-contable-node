import { useEffect, useState } from "react";
import ConceptsRow from "./ConceptsRow";

const ReciptsTable = ({emplyoeeToPay, concepts, getConcepts, totalConcepts, setTotalConcepts, today, setConcepts})=>{
  const {id_employee, name, surname, bank, cuil, salary} = emplyoeeToPay || ''

  const initialConcept = {
    concept:'',
    type:'G',
    percentage:'0.0'
  }

  const [newConcept, setNewConcept] = useState(initialConcept)

  const conceptHandleChange = (e)=>{
    setNewConcept({
      ...newConcept,
      [e.target.name]: e.target.value,
    })
  }

  const handleDeleteConcept = (id_concept)=>{
    const filteredConcepts = concepts.filter(c => c.id_concept !== id_concept);
    setConcepts(filteredConcepts)
  }

  useEffect(()=>{
    if(concepts && salary){
      let totalG = parseFloat(salary);
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
      setTotalConcepts({
        ...totalConcepts,
        totalGrav: totalG,
        totalExcen: totalE,
        totalDesc: totalD,
        totalSalary: totalG - totalD + totalE
      })
    }
  },[concepts, salary])

  const handleAddNewConcept = ()=>{
    console.log(concepts.length)
    newConcept.id_concept = concepts.length + 1;
    newConcept.manualy_added= true,
    setConcepts((prevConcept) => [...prevConcept, newConcept])
  }

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
            <td>{id_employee + 1000}</td>
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
          {concepts.map((concept, index) => <ConceptsRow key={index} data={concept} salary={salary} handleDeleteConcept={handleDeleteConcept}/>)}
          <tr>
            <td>
              <input onChange={(e)=>conceptHandleChange(e)} className="form-control m-0 p-0 border-0 focus-ring focus-ring-light bg-transparent" type="text" placeholder="Ej: Bonificación" value={newConcept.concept} name="concept"/>
            </td>
            <td colSpan='2'>
            <select onChange={(e)=>conceptHandleChange(e)} className="form-select m-0 p-0 border-0 focus-ring focus-ring-light bg-transparent" value={newConcept.type} name="type">
              <option value="G">Gravada</option>
              <option value="E">Excenta</option>
              <option value="D">Descuento</option>
            </select>
            </td>
            <td>
              <input onChange={(e)=>conceptHandleChange(e)} className="form-control m-0 p-0 border-0 focus-ring focus-ring-light bg-transparent" value={newConcept.percentage} type="text" placeholder="Ej: 0.3" name="percentage"/>
            </td>
          </tr>
        </tbody>
        <thead>
          <tr>
            <th className="text-secondary" scope="col">Fecha Actual</th>
            <th className="text-secondary" scope="col">Total Gravadas</th>
            <th className="text-secondary" scope="col">Total Exentas</th>
            <th className="text-secondary position-relative" scope="col">Total Descuentos <button onClick={()=>handleAddNewConcept()}><i class="fas fa-plus-circle position-absolute top-0 start-100 translate-middle text-success"></i></button></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{today.toLocaleDateString()}</td>
            <td>{totalConcepts.totalGrav}</td>
            <td>{totalConcepts.totalExcen}</td>
            <td>{totalConcepts.totalDesc}</td>
          </tr>
        </tbody>
        <thead>
          <tr>
            <th className="" scope="col" colSpan='3'>Total Neto</th>
            <th className=" " scope="col">{totalConcepts.totalSalary}</th>
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