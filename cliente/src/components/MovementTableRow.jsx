const MovementTableRow = ({row, deleteRow})=>{
  const {date, moveNum, description, account, ammount, type} = row
    return(
        <tr>
        <td>{account}</td>
        <td>{type==="debe" ? ammount : ''}</td>
        <td className="text-end">{type==="haber" ? ammount : ''}</td>
        <td>
          <img onClick={()=>deleteRow(row)} className="cursor-pointer" src="icons/delete.svg" />
          {/*<img className="cursor-pointer" src="icons/edit.svg" />*/}
        </td>
      </tr>
    );
}

export default MovementTableRow;