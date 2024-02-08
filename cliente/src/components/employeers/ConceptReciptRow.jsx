const ConceptReciptRow = ({concept})=>{
  const {ammount, concept_type, concept_name} = concept
  console.log(concept)
  return(
    <tr className="position-relative">
      <td>{concept_name}</td>
      <td>{concept_type==='G' ? ammount : ''}</td>
      <td>{concept_type==='E' ? ammount : ''}</td>
      <td>{concept_type==='D' ? ammount : ''}</td>
    </tr> 
  )
}

export default ConceptReciptRow;