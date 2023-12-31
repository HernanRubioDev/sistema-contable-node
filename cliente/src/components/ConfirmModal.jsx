import '../stylesheets/ConfirmModal.css'
const ConfirmModal = ({accountToDelete, deleteAccount})=>{
    return(
    <form className="modal fade" id="ConfirmModal" tabIndex="-1" aria-labelledby="ConfirmModalLabel" aria-hidden="true">
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
						<button onClick={()=>deleteAccount(accountToDelete)} type="button" data-bs-dismiss="modal" className="btn btn-danger  d-flex align-items-center"> 
						<img className="me-1 delete-icon pb-1" src="icons/delete.svg"/>Eliminar
						</button>
					</div>
				</div>
			</div>
    </form>
    );
}
export default ConfirmModal;