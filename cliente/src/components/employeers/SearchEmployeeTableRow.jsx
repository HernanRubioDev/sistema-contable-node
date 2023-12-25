const SearchEmployeeTableRow = ({employee})=>{
  const {name, surname, city, cuil, entry_date} = employee
  return(
  <tr className="text-center">
    <td>{name}</td>
    <td>{surname}</td>
    <td>{city}</td>
    <td>{cuil}</td>
    <td>{entry_date}</td>
    <td><button className="btn btn-sm btn-primary">Devengar</button></td>
  </tr>
  );
}

export default SearchEmployeeTableRow;