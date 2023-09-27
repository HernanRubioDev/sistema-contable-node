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
        <form className="d-flex flex-column my-3 mx-3">
          <div className="d-flex mt-3">

            <div className="w-50 pe-2">
              <span>Cuenta</span>
              <select className="form-select" aria-label="Default select example">
                <option value="1">Banco Rio</option>
                <option value="2">Banco Nacion</option>
              </select>
            </div>

            <div className="w-50 ps-2">
              <span>Código</span>
              <input className="form-control-plaintext border rounded ps-2 bg-body-secondary" type="text" readOnly placeholder="Aquí aparecerá el codigo de la cuenta"/>
            </div>
          </div>
        </form>
      </div>

    </div>
  );
}

export default NewMovementForm