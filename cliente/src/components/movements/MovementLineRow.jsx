const MovementLineRow = ({data})=>{
		const {name, credit, debit}=data
    return(
      <tr scope="row">
        <td className={debit !== null ? 'text-start':'text-end'}>{name}</td>
        <td className={debit !== null ? 'text-start':'text-end'}>{debit}</td>
        <td className={debit !== null ? 'text-start':'text-end'}>{credit}</td>
      </tr>
    );
}
export default MovementLineRow;