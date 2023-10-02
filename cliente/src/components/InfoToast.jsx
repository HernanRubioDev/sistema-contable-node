const InfoToast = ({response})=>{
  return(
    <div className="toast-container position-fixed bottom-0 end-0 p-3">
      <div id="infoToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
        <div className="toast-header">
          {response && response.success === true ? 
          <img src="icons/correct-check.svg" className="rounded me-2" /> 
          :
          <img src="icons/error-check.svg" className="rounded me-2" /> 
          }
          {response && <strong className="me-auto">{response.title}</strong>}
          <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div className="toast-body">
          {response && response.body}
        </div>
      </div>
    </div>
  );
}

export default InfoToast;