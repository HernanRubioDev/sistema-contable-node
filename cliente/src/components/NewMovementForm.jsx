import { NavLink } from "react-router-dom";
import OpenMenuButton from "./OpenMenuButton";
import MovementTableRow from "./MovementTableRow";
import '../stylesheets/NewMovementForm.css';
import useForm from "../hooks/useForm";
import { useEffect, useId, useState } from "react";
import Loader from "./Loader";

const NewMovementForm = ({menu, accounts, setMenu, getMinorAccounts, addMovements, loading})=>{
  
  useEffect(()=>{
    getMinorAccounts()
  },[])

  useEffect(()=>{
    if(accounts.length !== 0) form.account = accounts[0].name
  },[accounts])

  const today = new Date();
  const actualDate = today.toISOString().slice(0, 10);

  const handleClick = ()=>{
    setMenu('search')
  }

  const initialForm = {
    date:actualDate,
    moveNum:'',
    description:'',
    account:'',
    ammount:'',
    type:'debe'
  }

  const {form, handleChange} = useForm(initialForm)
  const [rows, setRows] = useState([]);

  const addRow = (form)=>{
    setRows([...rows, form])
  }

  const deleteRow = (row)=>{
    const newRows = rows.filter(el => el != row);
    setRows(newRows)
  }

  return(
    <div className="d-flex flex-column flex-grow-1 bg-body-secondary h-100">

      <OpenMenuButton />

      <div className="d-flex flex-column justify-content-between align-items-center my-3">
        <button onClick={()=>handleClick()} type="button" className="btn btn-primary rounded-pill pe-4 me-5 align-self-end"><img src="icons/back-arrow.svg" /> Volver</button>
      </div>
      
      <div className="d-flex flex-column bg-white shadow mx-3">
        <h3 className="fs-5 text-secondary text-center ms-3 mt-2">Registrar Asiento</h3>
        <form className="d-flex flex-column mb-3 mx-3">
          <div className="d-flex flex-wrap">
            <div className="d-flex flex-column flex-grow-1 me-4">
              <div className="d-flex flex-column">
                <label>Fecha</label>
                <input onChange={(e)=>handleChange(e)} className="form-control" type="date" max={actualDate} name="date" value={form.date}/>
              </div>
              <div className="d-flex flex-column mt-2">
                <label>N° Asiento</label>
                <input className="form-control" type="text" readOnly disabled name="moveNum" value={form.moveNum}/>
              </div>
            </div>
            <div className="d-flex flex-grow-1 ms-2 mt-2 mt-lg-0">
              <div className="d-flex flex-column flex-grow-1">
                <label>Descripción</label>
                <textarea onChange={(e)=>handleChange(e)} className="form-control h-100 resize-none" name="description" value={form.description}/>
              </div>
            </div> 
          </div>

          <div className="d-flex flex-wrap mt-2">

            <div className="d-flex flex-column col-12 col-lg-6 me-2 ">
              <label>Cuenta</label>
              <select onChange={(e)=>handleChange(e)} className="form-select" name="account" value={form.account}>
                { accounts && accounts.map(acc => <option key={acc.id_account} value={acc.account}>{acc.name}</option>) }
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
                <input onChange={(e)=>handleChange(e)} type="number" className="form-control" name="ammount" value={form.ammount} min={0}/>
              </div>
            </div>
            <div className="d-flex flex-grow-1 ms-4">
              <div className="d-flex justify-content-center align-items-center mt-2 mt-lg-0 flex-grow-1">
                <div className="me-4">
                  <label>Debe</label>
                  <input onChange={(e)=>handleChange(e)} type="radio" className="ms-2 form-check-input" name="type" value="debe" defaultChecked={true}/>
                </div>
                <div className="ms-4">
                  <label>Haber</label>
                  <input onChange={(e)=>handleChange(e)}  type="radio" className=" ms-2 form-check-input" name="type" value="haber"/>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center justify-content-evenly col-6 my-2">
            <button onClick={()=>addRow(form)} type="button" className="btn btn-secondary col-5">Agregar</button>
            <button onClick={()=>addMovements(rows)} type="button" className="btn btn-success col-5">Registrar</button>
          </div>
          <div className={`${loading ? 'd-flex justify-content-center' : 'move-table-container'}`}>
            {loading ? 
            <Loader /> 
            : 
            <table className="table table-bordered table-striped mt-1">
              <thead className="sticky-top">
                <tr>
                  <th scope="col">Cuenta</th>
                  <th scope="col">Debe</th>
                  <th scope="col">Haber</th>
                  <th scope="col">Acción</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => <MovementTableRow key={index}  row={row} deleteRow={deleteRow}/>)}
              </tbody>
            </table> 
            }
          </div>
        </form>
      </div>

    </div>
  );
}

export default NewMovementForm