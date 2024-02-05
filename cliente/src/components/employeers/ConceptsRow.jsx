const ConceptsRow = ({data, salary, handleDeleteConcept})=>{
  const {id_concept, concept, percentage, type} = data
  return(
    <tr className="position-relative">
      <td>{concept}</td>
      <td>{type==='G' ? parseFloat(salary)*parseFloat(percentage) : ''}</td>
      <td>{type==='E' ? parseFloat(salary)*parseFloat(percentage) : ''}</td>
      <td>{type==='D' ? parseFloat(salary)*parseFloat(percentage) : ''}  {data.manualy_added && <button onClick={()=>handleDeleteConcept(id_concept)} className="position-absolute bg-transparent border-0 top-50 start-100 translate-middle"><i class="fas fa-minus-circle text-danger"></i></button>}</td>
    </tr>
  )
}

export default ConceptsRow;