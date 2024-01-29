const SearchEmployeeTableRow = ({employee, setEmployeeToPay})=>{
  const {id_employee, name, surname, city, cuil, entry_date} = employee

  return(
  <tr className="text-center">
    <td>{name}</td>
    <td>{surname}</td>
    <td>{city}</td>
    <td>{cuil}</td>
    <td>{entry_date}</td>
    <td><button onClick={()=>setEmployeeToPay(employee)} className="border-0 bg-transparent" data-bs-toggle="modal" data-bs-target="#paycheck_stub"><img src="icons/money-bag.svg"/></button></td>
  </tr>
  );
}

export default SearchEmployeeTableRow;