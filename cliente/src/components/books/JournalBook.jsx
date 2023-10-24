import OpenMenuButton from "../OpenMenuButton";
import useForm from "../../hooks/useForm";
import "../../stylesheets/JournalBook.css";
import JournalTable from "./JournalTable";
import { useEffect } from "react";

const JournalBook = ({loading, lines, setLines, setMenu, getJournalBook})=>{
  useEffect(()=>setLines([]),[])
	const today = new Date().toISOString().slice(0, 10);
	const initialForm = {
    dateFrom:'',
    dateTo:today,
  }

	const {form, setForm, handleChange} = useForm(initialForm);

  return(
		<div className="d-flex flex-column flex-grow-1 bg-body-secondary h-100 border">
			<OpenMenuButton />

			<div className="d-flex flex-column justify-content-between align-items-center pt-3">
        <button onClick={()=>setMenu("ledger")} type="button" className="btn btn-primary rounded-pill pe-4 me-5 align-self-end"><img className="me-2" src="icons/magnifying-glass.svg" />Libro Mayor</button>
        <h5 className="text-secondary align-self-start ms-4">Libros</h5>
      </div>

			<div className="d-flex flex-column bg-white shadow mx-3 my-3">
				<h3 className="fs-5 text-secondary text-center ms-3 mt-2">Libro Diario</h3>
				<form className="d-flex flex-wrap align-items-center ms-3 my-3">
          <div className="d-flex flex-column me-3">
            <span className="me-2 fw-medium text-secondary">Desde:</span>
            <input onChange={(e)=>handleChange(e)} className="input-group border border-secondary form-control" id="date-from"  type="date" name="dateFrom" value={form.dateFrom}/>
          </div>
          <div className="d-flex flex-column me-3">
            <span className="me-2 fw-medium text-secondary">Hasta:</span>
            <input onChange={(e)=>handleChange(e)} className="input-group border border-secondary form-control" id="date-to"  type="date" name="dateTo" value={form.dateTo}/>
          </div>
            <button onClick={()=>getJournalBook(form)} type="button" className="btn btn-success pe-3 align-self-end me-3"><img className="me-1" src="icons/magnifying-glass.svg" />Buscar</button>
            <button onClick={()=>setForm(initialForm)} type="button" className="btn btn-secondary pe-3 align-self-end"><img className="me-1" src="icons/reset.svg" />Limpiar</button>
        </form>
        <JournalTable loading={loading} lines={lines}/>
			</div>
		</div>
	);
}

export default JournalBook