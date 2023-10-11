import OpenMenuButton from "../OpenMenuButton";
import { useEffect } from "react";

const LedgerBook = ({accounts, setAccounts, setMenu, getMinorAccounts})=>{

  useEffect(()=>{
    getMinorAccounts()
  },[])


	return(
		<div className="d-flex flex-column flex-grow-1 bg-body-secondary h-100 border">
			<OpenMenuButton />

			<div className="d-flex flex-column justify-content-between align-items-center pt-3">
        <button onClick={()=>setMenu("journal")} type="button" className="btn btn-primary rounded-pill pe-4 me-5 align-self-end"><img className="me-2" src="icons/magnifying-glass.svg" />Libro Diario</button>
        <h5 className="text-secondary align-self-start ms-4">Libros</h5>
      </div>

			<div className="d-flex flex-column bg-white shadow mx-3 my-3">
				<h3 className="fs-5 text-secondary text-center ms-3 mt-2">Libro Mayor</h3>
				<form className="d-flex flex-wrap align-items-center ms-3 my-3">
				<div className="d-flex flex-column me-3 col-6 col-lg-5">
        <label className="me-2 fw-medium text-secondary">Cuenta</label>
        <select onChange={()=>console.log("Crear libro mayor")} className="form-select" aria-label="Default select example" defaultValue="Seleccione una cuenta">
					<option disabled>Seleccione una cuenta</option>
					{accounts && accounts.map(acc => <option key={acc.id_account} value={acc.name}>{acc.name}</option>)}
				</select>
      </div>
        </form>
			</div>

		</div>
	);
}

export default LedgerBook