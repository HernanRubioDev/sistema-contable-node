import LedgerTableRow from "./LedgerTableRow";

const LedgerTable = ({lines})=>{
	const saldo = 0;
    return(
			<table className="table table-striped">
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
					{lines !==0 &&
					lines.map((line) => <LedgerTableRow key={line.num_line} data={line} saldo={line.code[0]==='1' ? saldo+line.debit : saldo+line.credit}/>)
					}
				</tbody>
			</table>
		);
}

export default LedgerTable