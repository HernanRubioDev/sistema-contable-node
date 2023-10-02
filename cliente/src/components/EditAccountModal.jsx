import {useState } from "react";

const EditAccountModal = ({accountToEdit, setAccountToEdit, editAccount})=>{
  
  const handleChange = (e)=>{
    setAccountToEdit({
      ...accountToEdit,
      [e.target.name]: e.target.value
    });
  }


  return(
    <div className="modal fade" id="editAccount" tabIndex="-1" aria-labelledby="editAccountLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="editAccountLabel">Editar</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" data-bs-target="#editAccount" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div>
              <label className="form-label">Cuenta</label>
              <input onChange={(e)=>handleChange(e)} type="text" className="form-control" placeholder="Nombre de la cuenta" name="name" value={accountToEdit && accountToEdit.name || ''} />
            </div>
          </div>
          <div className="modal-footer">
            <button onClick={()=>editAccount(accountToEdit)} type="button" className="btn btn-primary" data-bs-dismiss="modal" data-bs-target="#editAccount"><img className="pe-2" src="icons/save.svg" />Guardar</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditAccountModal;