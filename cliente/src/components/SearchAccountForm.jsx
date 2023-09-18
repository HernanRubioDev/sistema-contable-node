import useForm from "../hooks/useForm";
import OpenMenuButton from "./OpenMenuButton";

const SearchAccountForm = ({setMenu})=>{

  const handleClick = ()=>{
    setMenu("add")
  }
  const initialForm = {
    name:""
  }
  const {form, handleChange} = useForm(initialForm);
  return(
    <div className="d-flex flex-column flex-grow-1 bg-body-secondary h-100">
      <OpenMenuButton />
      <div className="d-flex flex-column justify-content-between align-items-center pt-3">
        <button onClick={()=>handleClick()} type="button" className="btn btn-primary rounded-pill pe-4 me-5 align-self-end"><img src="icons/add.svg" /> Agregar</button>
        <h5 className="text-secondary align-self-start ms-4">Cuentas</h5>
      </div>
      <div className="bg-white mx-3 my-3 shadow-sm">
      <h3 className="fs-5 text-secondary text-center ms-3 mt-2">Buscar Cuenta</h3>
        <form className="d-flex align-items-center ms-3 my-3">
          <div className="me-4">
            <input onChange={(e)=>handleChange(e)} className="form-control" type="text" placeholder="Buscar por nombre" name="name" value={form.name} autoComplete="off"/>
          </div>
          <button type="button" className="btn btn-success pe-3"><img className="me-1" src="icons/magnifying-glass.svg" />Buscar</button>
        </form>
        <div className="mx-3">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Tipo</th>
                <th scope="col">Saldo</th>
                <th scope="col">Creada</th>
                <th scope="col">Acción</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Banco Rio</td>
                <td>???</td>
                <td>$18000</td>
                <td>12/06/23</td>
                <td>
                  <button className="bg-transparent border-0">
                    <img className="me-1" src="icons/delete.svg"/>
                  </button>
                  <button className="bg-transparent border-0">
                    <img className="ms-1" src="icons/edit.svg"/>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SearchAccountForm;