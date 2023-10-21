const LedgerTableRow = ({data, saldo})=>{
  const {num_line, description, debit, credit, code}=data
  
    return(
        <tr>
          <td>{num_line}</td>
					<td>{description}</td>
					<td>{debit}</td>
					<td>{credit}</td>
					<td>{saldo}</td>
        </tr>
    );
}

export default LedgerTableRow;