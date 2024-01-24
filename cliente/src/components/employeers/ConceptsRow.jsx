const ConceptsRow = ({data, salary})=>{
  const {concept, percentage, type} = data
  return(
    <tr>
      <td>{concept}</td>
      <td>{type==='G' ? parseFloat(salary)*parseFloat(percentage) : ''}</td>
      <td>{type==='E' ? parseFloat(salary)*parseFloat(percentage) : ''}</td>
      <td>{type==='D' ? parseFloat(salary)*parseFloat(percentage) : ''}</td>
    </tr>
  )
}

export default ConceptsRow;