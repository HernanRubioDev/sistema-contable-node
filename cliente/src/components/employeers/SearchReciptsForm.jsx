import OpenMenuButton from "../OpenMenuButton";
import useForm from '../../hooks/useForm';
import Loader from "../Loader";
import ReciptTableRow from "./reciptTableRow";
import { useEffect } from "react";

const SearchReciptsForm = ({loading, recipts, searchRecipt})=>{

  const today = new Date().toISOString().slice(0,10);
  const initialForm = {
    name:'',
    surname:'',
    date_from:'',
    date_to:'',
  }

  const {form, handleChange} = useForm(initialForm)

  return(
    <main className="h-100 d-flex flex-column flex-grow-1 bg-body-secondary px-3">
      <OpenMenuButton />
      <div className="d-flex flex-column justify-content-between align-items-center pt-2">
        <h5 className="text-secondary align-self-start">Ver desvengamientos</h5>
      </div>
      <div className="d-flex flex-column bg-white my-2 border shadow p-3">
        <form onSubmit={(e)=>searchRecipt(e, form)} className="d-flex flex-wrap justify-content-evenly">
          <div className="row row-cols-4 w-100 d-flex justify-content-center">
            <div className="col col-3">
              <label>Nombre</label>
              <input onChange={(e)=>handleChange(e)} type="text" className="form-control" autoComplete="off" autoFocus name='name' value={form.name}/>
            </div>
            <div className="col col-3">
              <label>Apellido</label>
              <input onChange={(e)=>handleChange(e)} type="text" className="form-control" autoComplete="off" name='surname' value={form.surname}/>
            </div>
            <div className="col col-2">
              <label>Desde</label>
              <input onChange={(e)=>handleChange(e)} id="entry_date" type="date" className="form-control" autoComplete="off" max={today} name='date_from' value={form.date_from}/>
            </div>
            <div className="col col-2">
              <label>Hasta</label>
              <input onChange={(e)=>handleChange(e)} id="entry_date" type="date" className="form-control" autoComplete="off" max={today} name='date_to' value={form.date_to}/>
            </div>
            <div className="col col-2 d-flex align-items-end">
              <button type="submit" className="btn btn-sm btn-success px-2 fw-semibold d-flex justify-content-center align-items-center py-2"><img className="pe-2" src="icons/magnifying-glass.svg"/> Buscar</button>
            </div>
          </div>
        </form>
        {loading 
        ? 
        <div className="d-flex justify-content-center align-items-center mt-2">
          <Loader />
        </div>   
        :
        <table className="table table-striped mt-2">
          <thead>
            <tr className="text-center">
              <th scope="col">Nombre</th>
              <th scope="col">Apellido</th>
              <th scope="col">Ciudad</th>
              <th scope="col">Devengado</th>
              <th scope="col">Ver</th>
            </tr>
          </thead>
          <tbody>
            {recipts ? recipts.map((recipt, index) => <ReciptTableRow key={index} recipt={recipt}/>) : ''} 
          </tbody>
        </table>
        }
     </div>
    </main>
  )
}

export default SearchReciptsForm;