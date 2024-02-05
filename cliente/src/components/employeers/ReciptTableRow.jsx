const ReciptTableRow = ({recipt})=>{
  const {name, surname, city, payment_date} = recipt
  console.log(recipt)
  return (
    <tr className="text-center">
      <td>{name}</td>
      <td>{surname}</td>
      <td>{city}</td>
      <td>{payment_date}</td>
      <td><button className="bg-transparent border-0"><i className="far fa-eye text-secondary"></i></button></td>
    </tr>
  )
}

export default ReciptTableRow;