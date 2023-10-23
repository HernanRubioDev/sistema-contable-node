import OpenMenuButton from "../OpenMenuButton";
import { useEffect } from "react";
import useForm from "../../hooks/useForm";
import LedgerTable from "./LedgerTable";

const LedgerBook = ({loading, accounts, lines, setLines, setMenu, getMinorAccountsForLedger, getLedgerBook})=>{

	const today = new Date().toISOString().slice(0, 10);
  useEffect(()=>{
    getMinorAccountsForLedger()
  },[])

	const initialForm = {
    dateFrom:'',
    dateTo:today,
		account:''
  }

	const {form, handleChange} = useForm(initialForm);


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
						<select onChange={(e)=>handleChange(e)} className="form-select" aria-label="Default select example" defaultValue="Seleccione una cuenta" name="account">
						<option disabled>Seleccione una cuenta</option>
						{accounts && accounts.map((acc, index) => <option key={index} value={acc.name}>{acc.name}</option>)}
					</select>
				</div>
				<div className="d-flex flex-column me-3">
            <span className="me-2 fw-medium text-secondary">Desde:</span>
            <input onChange={(e)=>handleChange(e)} className="input-group border border-secondary form-control" id="date-from"  type="date" name="dateFrom" value={form.dateFrom}/>
          </div>
          <div className="d-flex flex-column me-3">
            <span className="me-2 fw-medium text-secondary">Hasta:</span>
            <input onChange={(e)=>handleChange(e)} className="input-group border border-secondary form-control" id="date-to"  type="date" name="dateTo" value={form.dateTo}/>
          </div>
					<button onClick={()=>getLedgerBook(form)} type="button" className="btn btn-success pe-3 align-self-end me-3"><img className="me-1" src="icons/magnifying-glass.svg" />Buscar</button>
        </form>
				<LedgerTable loading={loading} key="1" lines={lines} setLines={setLines} accounts={accounts}/>
			</div>
		</div>
	);
}

/*SELECT aml.num_line, am.move_date, acc.name, am.description, aml.credit, aml.debit FROM accounts_moves_lines AS aml INNER JOIN accounts_moves AS am ON aml.id_move = am.id_move INNER JOIN accounts AS acc ON aml.id_account = acc.id_account;*/

/*SELECT aml.num_line, am.move_date, am.description, aml.credit, aml.debit FROM accounts_moves_lines AS aml INNER JOIN accounts_moves AS am ON aml.id_move = am.id_move INNER JOIN accounts AS acc ON aml.id_account = acc.id_account WHERE acc.name='Caja';*/
export default LedgerBook