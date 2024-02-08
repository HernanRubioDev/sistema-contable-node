const sumConcept = (concepts, type)=>{
  return concepts.reduce((total, element) => {
    return element.concept_type === type ? total + element.ammount : total;
  }, 0);
}

export default sumConcept