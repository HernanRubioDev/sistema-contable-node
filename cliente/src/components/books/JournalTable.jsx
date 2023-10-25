
import Loader from "../Loader";
import JournalTableRow from "./JournalTableRow";
const JournalTable = ({loading, lines})=>{
  return(
    loading 
    ?
    <div className="d-flex justify-content-center">
      <Loader />
    </div>
    :
    <div className="px-3 table-container ">
      <table className="table table-bordered table-striped">
        <thead className="sticky-top ">
          <tr>
            <th scope="col">Operación</th>
            <th scope="col">Fecha</th>
            <th scope="col">Descripción</th>
            <th scope="col">Cuenta</th>
            <th scope="col">Debe</th>
            <th scope="col">Haber</th>
          </tr>
        </thead>
        <tbody>
          {lines.length !==0 &&
          lines.map((line, index) => <JournalTableRow key={index} data={line}/>)
          }

        </tbody>
      </table>
    </div>
  );
}

export default JournalTable