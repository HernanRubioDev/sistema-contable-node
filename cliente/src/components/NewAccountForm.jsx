import useAccount from "../hooks/useAccount";
import useForm from "../hooks/useForm";
import Loader from "./Loader";
import OpenMenuButton from "./OpenMenuButton";

const NewAccountForm = ({setMenu})=>{
  const handleClick = ()=>{
    setMenu("search")
  }

  const accounts = [{id_account:"1",name:"Banco Rio"},{id_account:"2",name:"Banco Nacion"}]

  const initialForm = {
    name: '',
    type:'1',
    recivesCredit:"true",
    account:'',
    credit:''
  }

  const {form, handleChange} = useForm(initialForm);
  const {loading, errors, response ,creatAccount} = useAccount();

  return(
    <div className="d-flex flex-column flex-grow-1 bg-body-secondary h-100">
      <OpenMenuButton />
      <div className="d-flex flex-column justify-content-between align-items-center pt-3">
        <button onClick={()=>handleClick()} type="button" className="btn btn-primary rounded-pill pe-4 me-5 align-self-end"><img src="icons/back-arrow.svg" /> Volver</button>
        <h5 className="text-secondary align-self-start ms-4">Cuentas</h5>
      </div>
      <div className="d-flex flex-column bg-white shadow-sm mx-3">
        <h3 className="fs-5 text-secondary text-center ms-3 mt-2">Registrar Cuenta</h3>
        <form className="d-flex flex-column my-3 mx-3">
          <div className="d-flex">
            <div className="flex-grow-1 pe-2">
              <span>Nombre</span>
              <input onChange={(e)=>handleChange(e)} className="form-control" type="text" placeholder="Ej: Banco río" name="name" value={form.name} autoComplete="off"/>
            </div>
            <div className="d-flex flex-column justify-content-center w-50 ps-3">
              <span>Recibe saldo</span>
              <div className="d-flex">
                  <label>
                    <input onChange={(e)=>handleChange(e)} className="form-check-input" type="radio" name="recivesCredit" value={true} defaultChecked={true}/>
                    Si
                  </label>
                  <label>
                    <input onChange={(e)=>handleChange(e)} className="form-check-input ms-3" type="radio" name="recivesCredit" value={false} />
                    No
                  </label>
              </div>
            </div>
          
          </div>
          <div className="d-flex mt-3">
          <div className="w-50 pe-2">
              <span>Tipo</span>
              <select onChange={(e)=>handleChange(e)} className="form-select" aria-label="Default select example" name="type" value={form.type}>
                <option value="1">Activo</option>
                <option value="2">Pasivo</option>
                <option value="3">Patrimonio</option>
                <option value="4">Resultados Positivos</option>
                <option value="5">Resultados Negativos</option>
              </select>
            </div>
            <div className="w-50 ps-3">
              <span>Saldo inicial</span>
              <input onChange={(e)=>handleChange(e)} className="form-control" type="number" placeholder="Ej: 2000" name="credit" value={form.credit} autoComplete="off"/>
            </div>
          </div>
          <div className="d-flex mt-3">
          {form.recivesCredit === "true" ? 
              <div className="w-50 pe-2">
                <span>Cuenta</span>
                <input onChange={(e)=>handleChange(e)} onInput={(e)=>creatAccount(e.target.value)} className="form-control" list="accountList" placeholder="Escribe para buscar..." name="account" value={form.account}/>
                <datalist id="accountList">
                  {accounts.map(account => <option key={account.id_account} value={account.name} />)}
      
                </datalist>
              </div>  : ''
            }
          </div>
            <div className="d-flex justify-content-end mt-2">
              {loading ? 
              <Loader />
              :
              <button onClick={()=>creatAccount(form)} type="button" className="btn btn-success me-4">Guardar</button>
              }
            </div>
        </form>
      </div>
    </div>
  );
}

export default NewAccountForm;