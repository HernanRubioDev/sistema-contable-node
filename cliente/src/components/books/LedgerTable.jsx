import LedgerTableRow from "./LedgerTableRow";
import Loader from "../Loader";

const LedgerTable = ({loading, lines})=>{
	
    return(
			loading 
			?
			<div className="d-flex justify-content-center">
				<Loader />
			</div>
			:
			<div className="px-3">
				<table className="table table-bordered table-striped">
					<thead>
						<tr>
							<th scope="col">Operación</th>
							<th scope="col">Descripción</th>
							<th scope="col">Debe</th>
							<th scope="col">Haber</th>
							<th scope="col">Saldo</th>
						</tr>
					</thead>
					<tbody>
						{lines.length !==0 &&
						lines.map((line) => <LedgerTableRow key={line.num_line} data={line}/>)
						}
						{lines.length !==0 &&					
						<tr>
							<td className="fw-bold" colSpan={4}>Saldo final</td>
							<td className="text-center fw-bold">{lines[lines.length-1].saldo}</td>
						</tr>
						}
					</tbody>
				</table>
			</div>
		);
}

export default LedgerTable