const ReciptTableRow = ({recipt, setRecipt})=>{
  const {name, surname, city, payment_date} = recipt
  return (
    <tr className="text-center">
      <td>{name}</td>
      <td>{surname}</td>
      <td>{city}</td>
      <td>{payment_date}</td>
      <td><button onClick={()=>setRecipt(recipt)} className="bg-transparent border-0" data-bs-toggle="modal" data-bs-target="#recipt_modal"><i className="far fa-eye text-secondary"></i></button></td>
    </tr>
  )
}

export default ReciptTableRow;