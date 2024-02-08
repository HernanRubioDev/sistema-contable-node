const isEmpty = (object)=>{
    console.log(object)
    if(Object.keys(object).length !== 0) return true
    else return false
}

module.exports={isEmpty}