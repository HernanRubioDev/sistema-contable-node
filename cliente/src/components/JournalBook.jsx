import OpenMenuButton from "./OpenMenuButton";

const JournalBook = ({setMenu})=>{
  return(
		<div className="d-flex flex-column flex-grow-1 bg-body-secondary h-100 border">
			<OpenMenuButton />

			<div className="d-flex flex-column justify-content-between align-items-center pt-3">
        <button onClick={()=>setMenu("ledger")} type="button" className="btn btn-primary rounded-pill pe-4 me-5 align-self-end"><img className="me-2" src="icons/magnifying-glass.svg" />Libro Mayor</button>
        <h5 className="text-secondary align-self-start ms-4">Libros</h5>
      </div>

			<div className="d-flex flex-column bg-white shadow mx-3 my-3">
				<h3 className="fs-5 text-secondary text-center ms-3 mt-2">Libro Diario</h3>
			</div>
		</div>
	);
}

export default JournalBook