const MovementLineRow = ({data})=>{
		const {name, credit, debit}=data
    return(
      <tr scope="row">
        <td className={debit !== "0.00" ? 'text-start':'text-end'}>{name}</td>
        <td className={debit !== "0.00" ? 'text-start':'text-end'}>{debit === "0.00" ? '-' : debit}</td>
        <td className={debit !== "0.00" ? 'text-start':'text-end'}>{credit === "0.00" ? '-' : credit}</td>
      </tr>
    );
}
export default MovementLineRow;