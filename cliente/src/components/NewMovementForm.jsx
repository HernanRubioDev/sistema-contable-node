import { NavLink } from "react-router-dom";
import OpenMenuButton from "./OpenMenuButton";

const NewMovementForm = ({menu, setMenu})=>{
  const handleClick = ()=>{
    setMenu('search')
  }
  return(
    <div className="d-flex flex-column flex-grow-1 bg-body-secondary h-100">

      <OpenMenuButton />

      <div className="d-flex flex-column justify-content-between align-items-center pt-3">
        <button onClick={()=>handleClick()} type="button" className="btn btn-primary rounded-pill pe-4 me-5 align-self-end"><img src="icons/back-arrow.svg" /> Volver</button>
        <h5 className="text-secondary align-self-start ms-4">Asientos</h5>
      </div>
      
      <div className="d-flex flex-column bg-white shadow-sm mx-3">
        <h3 className="fs-5 text-secondary text-center ms-3 mt-2">Registrar Asiento</h3>
        <form className="d-flex flex-column mb-3 mx-3">

          <div className="d-flex flex-wrap">
            <div className="d-flex flex-column flex-grow-1 me-4">
              <div className="d-flex flex-column">
                <label>Fecha</label>
                <input className="form-control" type="date" />
              </div>
              <div className="d-flex flex-column mt-2">
                <label>N° Asiento</label>
                <input className="form-control" type="text" readOnly disabled/>
              </div>
            </div>
            <div className="d-flex flex-grow-1 ms-2 mt-2 mt-lg-0">
              <div className="d-flex flex-column flex-grow-1">
                <label>Descripción</label>
                <textarea className="form-control h-100 resize-none" />
              </div>
            </div> 
          </div>

          <div className="d-flex flex-wrap mt-2">

            <div className="d-flex flex-column col-12 col-lg-6 me-2 ">
              <label>Cuenta</label>
              <select className="form-select">
                <option>Banco Rio</option>
              </select>
            </div>

            <div className="d-flex flex-grow-1 ms-4 mt-3 mt-lg-0">
              <div className="d-flex flex-grow-1 me-2">
                <NavLink to="/accounts" className="btn btn-secondary w-100 align-self-end ">Plan de cuentas</NavLink>
              </div>

              <div className="d-flex flex-grow-1 ms-2">
                <NavLink to="/accounts"  className="btn btn-secondary w-100 align-self-end">Agregar cuenta</NavLink>
              </div>
            </div> 
          </div>

          <div className="d-flex flex-wrap mt-2">
            <div className="d-flex col-12 col-lg-6 me-2">
              <div className="d-flex flex-grow-1 flex-column">
                <label>Monto</label>
                <input type="numer" className="form-control"/>
              </div>
            </div>
            <div className="d-flex flex-grow-1 ms-4">
              <div className="d-flex justify-content-center align-items-center mt-2 mt-lg-0 flex-grow-1">
                <div className="me-4">
                  <label>Debe</label>
                  <input type="radio" className="ms-2 form-check-input"/>
                </div>
                <div className="ms-4">
                  <label>Haber</label>
                  <input type="radio" className=" ms-2 form-check-input"/>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex flex-grow-1 mt-3">
            <button className="btn btn-success w-25">Agregar</button>
          </div>
            <table className="table table-striped mt-1">
              <thead>
                <tr>
                  <th scope="col">Cuenta</th>
                  <th scope="col">Debe</th>
                  <th scope="col">Haber</th>
                  <th scope="col">Acción</th>
                </tr>
              </thead>
            </table> 
        </form>
      </div>

    </div>
  );
}

export default NewMovementForm