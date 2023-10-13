const AccountTableRow = ({data, setAccountToEdit, setAccountToDelete})=>{
  let {name,  credit, recive_credit ,code, date_creation} = data;
  let type;
  switch (true) {

    case code[0] === '1':
      type = "Activo"
      break;
      
      case code[0] === '2':
        type = "Pasivo"
        break;

      case code[0] === '3':
        type = "Patrimonio"
        break;

      case code[0] === '4':
        type = "R+"
        break;

      case code[0] === '5':
        type = "R-"
        break;

    default:
      break;
  }

  return(
  <tr>
    <td>{name}</td>
    <td>{type}</td>
    <td>{recive_credit ? `$ ${credit}` : '-'}</td>
    <td>{date_creation}</td>
    <td>{code}</td>
    <td>
      <button onClick={()=>setAccountToDelete(data)} className="bg-transparent border-0" data-bs-toggle="modal" data-bs-target="#ConfirmModal">
        <img className="me-1" src="icons/delete.svg"/>
      </button>
      <button onClick={()=>setAccountToEdit(data)} className="bg-transparent border-0" data-bs-toggle="modal" data-bs-target="#editAccount">
          <img className="ms-1" src="icons/edit.svg"/>
      </button>
    </td>
  </tr>
  );
}

export default AccountTableRow;