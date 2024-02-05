const calculateConcepts = (concepts, salary)=>{
  const calculdatedConcepts = concepts.map(c => ({concept_type:c.type, ammount: salary*c.percentage, concept_name: c.concept}))
  return calculdatedConcepts
}

export default calculateConcepts