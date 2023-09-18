
const AlertModal = ({response})=>{
    return(
    <div className="modal fade" id="alertModal" tabIndex="-1" aria-labelledby="alertModalLabel" aria-hidden="true">
			<div className="modal-dialog modal-dialog-centered">
			<div className="modal-content">
				<div className="modal-header">
					{response && <h1 className="modal-title fs-5" id="alertModalLabel">{response.title}</h1>}
					<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div className="modal-body">
				{response && <p>{response.body}</p>}
				</div>
				<div className="modal-footer">
					{response &&  <button type="button" data-bs-dismiss="modal" className={`btn btn-${response.success ? "primary" : "danger"}`}>Cerrar</button>}
				</div>
			</div>
		</div>
    </div>
    );
}
export default AlertModal;