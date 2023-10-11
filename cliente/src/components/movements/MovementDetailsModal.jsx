const MovementDetailsModal = ()=>{
    return(
        <div className="modal fade" id="detailsMovement" tabIndex="-1" aria-labelledby="detailsMovementLabel" aria-hidden="true">
           <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">Detalle</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <table className="table table-striped table-bordered border-black">
                    <thead>
                        <tr>
                          <th scope="col">N° Asiento</th>
                          <th scope="col">Fecha</th>
                          <th scope="col">Cuenta</th>
                          <th scope="col">Monto</th>
                        </tr>
                    </thead>
                    <tbody>
                      <tr scope="row">
                        <td>1</td>
                        <td>12/09/23</td>
                        <td>Banco Rio</td>
                        <td>10000</td>
                      </tr>
                    </tbody>
                    <thead>
                      <tr>
                        <th className="text-center" colSpan="4" scope="col">Descripcion</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr scope="row">
                        <td className="text-center" colSpan="4">Venta</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
        </div>
    );
}

export default MovementDetailsModal;
/* <table className="table">
            <thead>
                <tr>
                  <th scope="col">N° Asiento</th>
                  <th scope="col">Fecha</th>
                  <th scope="col">Cuenta</th>
                  <th scope="col">Monto</th>
                </tr>
            </thead>
            <tbody>
              <tr scope="row">
                <td>1</td>
                <td>12/09/23</td>
                <td>Banco Rio</td>
                <td>10000</td>
              </tr>
            </tbody>
            <thead>
              <tr>
                <th scope="col">Descripcion</th>
              </tr>
            </thead>
            <tbody>
              <tr scope="row">
                <td>Venta</td>
              </tr>
            </tbody>
          </table>*/