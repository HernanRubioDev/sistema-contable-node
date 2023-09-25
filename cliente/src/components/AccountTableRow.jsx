const AccountTableRow = ({data})=>{
  const {name,  credit, code, date_creation} = data;
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
    <td>${credit}</td>
    <td>{date_creation}</td>
    <td>{code}</td>
    <td>
      <button className="bg-transparent border-0">
        <img className="me-1" src="icons/delete.svg"/>
      </button>
      <button className="bg-transparent border-0">
          <img className="ms-1" src="icons/edit.svg"/>
      </button>
    </td>
  </tr>
  );
}

export default AccountTableRow;