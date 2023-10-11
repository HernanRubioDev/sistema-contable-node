const MovementDetailsRow = ()=>{
    return(
    <tr>
      <td>04/10/2020</td>
      <td>1234</td>
      <td>Venta a crédito</td>
      <td>
        <button className="bg-transparent border-0" data-bs-toggle="modal" data-bs-target="#detailsMovement">
          <img src="icons/see-more.svg"/>
        </button>
      </td>
    </tr>
    );
}

export default MovementDetailsRow;