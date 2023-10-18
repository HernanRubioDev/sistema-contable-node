const MovementDetailsRow = ({data, getMoveLineById})=>{
  const{description, move_date, id_move}=data
    return(
    <tr>
      <td>{id_move}</td>
      <td>{move_date}</td>
      <td>{description}</td>
      <td>
        <button onClick={()=>getMoveLineById(id_move)} className="bg-transparent border-0" data-bs-toggle="modal" data-bs-target="#detailsMovement">
          <img src="icons/see-more.svg"/>
        </button>
      </td>
    </tr>
    );
}

export default MovementDetailsRow;