import sumConcept from "../../utils/sumConcepts";
import ConceptReciptRow from "./ConceptReciptRow";

const ReciptModal = ({recipt})=>{
  const today = new Date();
  return(
    <div className="modal fade" id="recipt_modal" tabIndex="-1" aria-labelledby="recipt_modal_lable" aria-hidden="true">
        <div className="modal-dialog modal-fullscreen">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 text-secondary" id="recipt_modal_lable">Recibo de sueldo</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body p-0 m-0">
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
                      <td>{recipt && (recipt.name+' '+recipt.surname)}</td>
                      <td>{recipt && recipt.file}</td>
                      <td>{recipt && recipt.cuil}</td>
                      <td>{recipt && recipt.bank}</td>
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
                      <td>{recipt && recipt.remuneration}</td>
                      <td></td>
                      <td></td>
                    </tr>
                    {recipt && recipt.concepts.map((concept, index) => <ConceptReciptRow key={index} concept={concept}/>)}
                  </tbody>
                  <thead>
                    <tr>
                      <th className="text-secondary" scope="col">Fecha de pago</th>
                      <th className="text-secondary" scope="col">Total Gravadas</th>
                      <th className="text-secondary" scope="col">Total Exentas</th>
                      <th className="text-secondary position-relative" scope="col">Total Descuentos</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{today.toISOString().slice(0,10)}</td>
                      <td>{recipt && sumConcept(recipt.concepts, 'G')}</td>
                      <td>{recipt && sumConcept(recipt.concepts, 'E')}</td>
                      <td>{recipt && sumConcept(recipt.concepts, 'D')}</td>
                    </tr>
                  </tbody>
                  <thead>
                    <tr>
                      <th className="" scope="col" colSpan='3'>Total Neto</th>
                      <th className=" " scope="col">{recipt && recipt.net_total}</th>
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
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-sm btn-secondary" data-bs-dismiss="modal" aria-label="Close">Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    )
}

export default ReciptModal;