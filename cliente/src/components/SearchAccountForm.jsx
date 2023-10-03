import useForm from "../hooks/useForm";
import OpenMenuButton from "./OpenMenuButton";
import '../stylesheets/SearchAccountForm.css';
import AccountTableRow from "./AccountTableRow";
import Loader from "./Loader";

const SearchAccountForm = ({accounts, loading, setMenu, getAccountByName, setAccountToEdit, setAccountToDelete})=>{

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
        <button onClick={()=>handleClick()} type="button" className="btn btn-primary rounded-pill pe-4 me-5 align-self-end"><img src="icons/add.svg" />Agregar</button>
        <h5 className="text-secondary align-self-start ms-4">Cuentas</h5>
      </div>
      <div className="bg-white mx-3 my-3 shadow">
      <h3 className="fs-5 text-secondary text-center ms-3 mt-2">Buscar Cuenta</h3>
        <form className="d-flex align-items-center ms-3 my-3">
          <div className="me-4">
            <input onChange={(e)=>handleChange(e)} className="form-control" type="text" placeholder="Buscar por nombre" name="name" value={form.name} autoComplete="off"/>
          </div>
          <button onClick={()=>getAccountByName(form.name)} type="button" className="btn btn-success pe-3"><img className="me-1" src="icons/magnifying-glass.svg" />Buscar</button>
        </form>
        <div className="mx-3 table-container d-flex justify-content-center">
          {loading ?
          <Loader />
        :
          <table className="table table-striped">
            <thead className="sticky-top">
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Tipo</th>
                <th scope="col">Saldo</th>
                <th scope="col">Creada</th>
                <th scope="col">Código</th>
                <th scope="col">Acción</th>
              </tr>
            </thead>
            <tbody >
              {Object.keys(accounts).length ? accounts.map(account => <AccountTableRow key={account.id_account} data={account} setAccountToEdit={setAccountToEdit} setAccountToDelete={setAccountToDelete}/>) : <tr><td colSpan='6' className="text-center">Sin Datos</td></tr>}
            </tbody>
          </table>
          }
        </div>
      </div>
    </div>
  );
}

export default SearchAccountForm;