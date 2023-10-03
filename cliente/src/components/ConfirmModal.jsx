
const ConfirmModal = ({accountToDeletem, deleteAccount})=>{
    return(
    <div className="modal fade" id="ConfirmModal" tabIndex="-1" aria-labelledby="ConfirmModalLabel" aria-hidden="true">
			<div className="modal-dialog modal-dialog-centered">
			<div className="modal-content">
				<div className="modal-header">
					<h1 className="modal-title fs-5" id="ConfirmModalLabel">Eliminar</h1>
					<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div className="modal-body">
					<p>¿Está seguro de que desea eliminar esta cuenta?</p>
				</div>
				<div className="modal-footer">
					<button onClick={()=>deleteAccount(accountToDeletem)} type="button" data-bs-dismiss="modal" className="btn btn-danger"> Eliminar</button>
				</div>
			</div>
		</div>
    </div>
    );
}
export default ConfirmModal;