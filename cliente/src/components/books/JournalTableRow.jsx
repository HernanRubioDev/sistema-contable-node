import JournalTableSubRow from "./JournalTableSubRow";

const JournalTableRow = ({data})=>{
  const {id_move, description, move_date, rows} = data
  return(
    <tr>
      <td>{id_move}</td>
      <td>{move_date}</td>
      <td>{description}</td>
      <td className="p-0">
        {rows && rows.map((subRow, index) => <JournalTableSubRow key={index} data={subRow.account} align={subRow.debit ==="0.00" ? "justify-content-end" : "justify-content-start"}/>)}
      </td>
      <td className="p-0">
      {rows && rows.map((subRow, index) => <JournalTableSubRow key={index} data={subRow.debit === "0.00" ? "-" : parseFloat(subRow.debit)} align={subRow.debit ==="0.00" ? "justify-content-end" : "justify-content-start"}/>)}
      </td>
      <td className="p-0">
      {rows && rows.map((subRow, index) => <JournalTableSubRow key={index} data={subRow.credit === "0.00" ? "-" : parseFloat(subRow.credit)} align={subRow.debit ==="0.00" ? "justify-content-end" : "justify-content-start"}/>)}
      </td>
    </tr>
  );
}

export default JournalTableRow