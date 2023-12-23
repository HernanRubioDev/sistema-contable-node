import OpenMenuButton from "../OpenMenuButton";
import useForm from '../../hooks/useForm';
import Loader from "../Loader";

const initialForm ={
  name:'',
  surname:'',
  town:'',
}

const SearchEmployeerForm = ({loading, employees, getEmployee})=>{
  const {form, setForm, handleChange} = useForm(initialForm)
  return(
    <div className="h-100 d-flex flex-column flex-grow-1 bg-body-secondary px-3">
      <OpenMenuButton />
      <div className="d-flex flex-column justify-content-between align-items-center pt-2">
        <h5 className="text-secondary align-self-start">Buscar empleado</h5>
      </div>
      <div className="d-flex flex-column bg-white my-2 border shadow p-3">
        <form className="d-flex flex-wrap justify-content-evenly">
        <div className="row row-cols-4 w-100">
         <div className="col">
            <span>Nombre</span>
            <input onChange={(e)=>handleChange(e)} type="text" className="form-control" name="name" value={form.name} autoComplete="off" autoFocus/>
          </div>
          <div className="col">
            <span>Apellido</span>
            <input onChange={(e)=>handleChange(e)} type="text" className="form-control" name="surname" value={form.surname} autoComplete="off"/>
          </div>
          <div className="col">
            <span>Localidad</span>
            <select onChange={(e)=>handleChange(e)} className="form-select" aria-label="Default select example" value={form.town} name="town">
              <option value="1">Pergamino</option>
              <option value="2">Junin</option>
            </select>
          </div>
          <div className="col d-flex align-items-end">
            <button onClick={()=>getEmployee(form)} type="button" className="btn btn-sm btn-success w-100 fw-semibold d-flex justify-content-center align-items-center py-2"><img className="me-2" src="icons/magnifying-glass.svg"/> Buscar</button>
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
              <th scope="col">Localidad</th>
              <th scope="col">Cuil</th>
              <th scope="col">F. Ingreso</th>
              <th scope="col">Acción</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center">
              <td>Hernan</td>
              <td>Rubio</td>
              <td>Pergamino</td>
              <td>11-11111111-1</td>
              <td>13/11/23</td>
              <td><button className="btn btn-sm btn-primary">Devengar</button></td>
            </tr>
            <tr className="text-center">
              <td>Hernan</td>
              <td>Rubio</td>
              <td>Pergamino</td>
              <td>11-11111111-1</td>
              <td>13/11/23</td>
              <td><button className="btn btn-sm btn-primary">Devengar</button></td>
            </tr>
          </tbody>
        </table>
        }
      </div>
    </div>
  )
}

export default SearchEmployeerForm