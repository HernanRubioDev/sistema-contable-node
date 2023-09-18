const InfoToast = ()=>{
  return(
    <div className="toast-container position-fixed bottom-0 end-0 p-3">
      <div id="infoToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
        <div className="toast-header">
          <img src="icons/error-check.svg" className="rounded me-2" />
          <strong className="me-auto">Error</strong>
          <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div className="toast-body">
          La cuenta no se ha podido crear correctamente.
        </div>
      </div>
    </div>
  );
}

export default InfoToast;