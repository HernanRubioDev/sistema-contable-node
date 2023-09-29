const MovementTableRow = ({row})=>{
  const {date, moveNum, description, account, ammount, type} = row
    return(
        <tr>
        <td>{account}</td>
        <td>{type==="debe" ? ammount : ''}</td>
        <td className="text-end">{type==="haber" ? ammount : ''}</td>
        <td>
          <img src="icons/delete.svg" />
          <img src="icons/edit.svg" />
        </td>
      </tr>
    );
}

export default MovementTableRow;