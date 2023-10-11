import useForm from "../../hooks/useForm";
import { useState } from "react";
import OpenMenuButton from "../../components/OpenMenuButton";
import MovementDetailsRow from "../movements/MovementDetailsRow";

const SearchMovementForm = ({menu, setMenu})=>{
  const initialForm = {
    dateFrom:'',
    dateTo:''
  }

  const {form, setForm, handleChange} = useForm(initialForm);

  return( 
    <div className="d-flex flex-column flex-grow-1 bg-body-secondary h-100">

      <OpenMenuButton />

      <div className="d-flex flex-column justify-content-between align-items-center mt-3">
        <button onClick={()=>setMenu("add")} type="button" className="btn btn-primary rounded-pill pe-4 me-5 align-self-end"><img src="icons/add.svg" />Agregar</button>
      </div>

      <div className="bg-white mx-3 my-3 shadow">
        <h3 className="fs-5 text-secondary text-center ms-3 mt-2">Buscar Asiento</h3>
        <form className="d-flex flex-wrap align-items-center ms-3 my-3">
          <div className="d-flex flex-column me-3">
            <span className="me-2 fw-medium text-secondary">Desde:</span>
            <input onChange={(e)=>handleChange(e)} className="input-group border border-secondary form-control"  type="date" name="dateFrom" value={form.dateFrom}/>
          </div>
          <div className="d-flex flex-column me-3">
            <span className="me-2 fw-medium text-secondary">Hasta:</span>
            <input onChange={(e)=>handleChange(e)} className="input-group border border-secondary form-control"  type="date" name="dateTo" value={form.dateTo}/>
          </div>
            <button onClick={()=>console.log("click")} type="button" className="btn btn-success pe-3 align-self-end me-3"><img className="me-1" src="icons/magnifying-glass.svg" />Buscar</button>
            <button onClick={()=>setForm(initialForm)} type="button" className="btn btn-secondary pe-3 align-self-end"><img className="me-1" src="icons/reset.svg" />Limpiar</button>
        </form>
        <div className="mx-3 table-container">
          <table className="table table-striped">
            <thead className="sticky-top">
              <tr>
                <th scope="col">Fecha</th>
                <th scope="col">N° Asiento</th>
                <th scope="col">Descripción</th>
                <th scope="col">Acción</th>
              </tr>
            </thead>
            <tbody >
              <MovementDetailsRow />
            </tbody>
          </table>
        </div>
      </div>
    </div>
    )
}

export default SearchMovementForm;