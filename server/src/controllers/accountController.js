const {setAccount, getCreditAccount} = require("../models/accountModel");

const addAccount = async(req, res)=>{
  const response = await getCreditAccount(105);
  console.log(response);
}

module.exports = {addAccount}