const LedgerTableRow = ({data})=>{
  const {num_line, description, debit, credit, saldo}=data
    return(
        <tr>
          <td>{num_line}</td>
					<td>{description}</td>
					<td className="text-start">{debit !== "0.00"? debit : ''}</td>
					<td className="text-end">{credit !== "0.00"? credit : ''}</td>
					<td className="text-center">{saldo}</td>
        </tr>
    );
}

export default LedgerTableRow;