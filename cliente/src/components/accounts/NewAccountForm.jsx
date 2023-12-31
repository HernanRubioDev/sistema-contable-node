import useForm from "../../hooks/useForm";
import Loader from "../Loader";
import OpenMenuButton from "../OpenMenuButton";


const NewAccountForm = ({loading, accounts, errors, setMenu, createAccount, getMajorAccounts})=>{
  
  const handleClick = ()=>{
    setMenu("search")
  }

  const initialForm = {
    name: '',
    type:'1',
    recive_credit:"false",
    code:'',
    credit: '0'
  }

  const {form, handleChange, setForm} = useForm(initialForm);

  return(
    <div className="d-flex flex-column flex-grow-1 bg-body-secondary h-100">
      <OpenMenuButton />
      <div className="d-flex flex-column justify-content-between align-items-center pt-2">
        <button onClick={()=>handleClick()} type="button" className="btn btn-primary rounded-pill pe-4 me-5 align-self-end"><img src="icons/back-arrow.svg" /> Volver</button>
        <h5 className="text-secondary align-self-start ms-4">Cuentas</h5>
      </div>

      <div className="d-flex flex-column bg-white shadow mx-3 my-2">
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
                    <input onChange={(e)=>handleChange(e)} onClick={()=>getMajorAccounts()} className="form-check-input" type="radio" name="recive_credit" value={true}/>
                    Si
                  </label>
                  <label>
                    <input onClick={()=>setForm(initialForm)} className="form-check-input ms-3" type="radio" name="recive_credit" value={false} defaultChecked={true}/>
                    No
                  </label>
              </div>
            </div>
          
          </div>
          <div className="d-flex mt-3">
          <div className="w-50 pe-2">
              <span>Tipo</span>
              <select onChange={(e)=>handleChange(e)} className="form-select" aria-label="Default select example" name="type" value={form.code!=='' ? form.code[0] : form.type} disabled={form.recive_credit==="true" ? true : false}>
                <option value="1">Activo</option>
                <option value="2">Pasivo</option>
                <option value="3">Patrimonio</option>
                <option value="4">Resultados Positivos</option>
                <option value="5">Resultados Negativos</option>
              </select>
            </div>
            <div className="w-50 ps-3">
              <span>Saldo inicial</span>
              <input onChange={(e)=>handleChange(e)} className="form-control" type="number" name="credit" value={form.recive_credit==="true" ? form.credit : form.credit=0} autoComplete="off" disabled={true} min={0}/>
            </div>
          </div>
          <div className="d-flex mt-3">
          {form.recive_credit === "true" ? 
              <div className="w-50 pe-2">
                <span>Cuenta</span>
                <select onChange={(e)=>handleChange(e)} className="form-select"  aria-label="Default select example" name="code" value={form.code}>
                  <option className="d-none" value={null}>Selecciona una cuenta</option>
                  {accounts.map(account => <option key={account.id_account} value={account.code}>{account.name}</option>)}
                </select>
              </div>  : ''
            }
            {form.recive_credit === "true" ?
            <div className="flex-grow-1 pe-2 ms-3">
              <span>Código</span>
              <input className="form-control-plaintext border rounded ps-2 bg-body-secondary" type="text" readOnly placeholder="Aquí aparecerá el codigo de la cuenta" name="code" value={form.code}/>
            </div>
            :
            ''
          }
          </div>
          <div className="d-flex">
            
          <div className="d-flex justify-content-end w-100 mt-2">
            {loading ? <Loader /> : 
              <button type="button" onClick={()=>createAccount(form)} className="btn btn-success me-4">Guardar</button> 
            }
          </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewAccountForm;