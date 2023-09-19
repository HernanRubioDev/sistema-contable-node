const {setAccount, getLastMajorAccount} = require("../models/accountModel");
const {getUserByUsername} = require("../models/userModel");

const addMajorAccount = async(req, res)=>{
  const username = req.params.username
  const newAccount = req.body;
  let accountCode = null;
  let idUser = null;

  //BUSCO EL ID DEL USUARIO
  try {
    const user = await getUserByUsername(username)
    switch (true) {
      case user.rowCount !== 0:
        idUser = user.rows[0].id_user;
        break;
    
      default:
        res.json({"status":400})
        break;
    }

  } catch (error) {
    res.json({"status":500})
  }

  //BUSCO LA EL CODIGO DE LA ULTIMA CUENTA MAYOR O LO CREO
  try {
    const account = await getLastMajorAccount(idUser, newAccount.type);
    switch (true) {
      case account.rowCount !== 0:
        accountCode = parseInt(account.rows[0].code) + 100
        newAccount.code = accountCode.toString();
        break;

      case account.rowCount === 0:
        newAccount.code = `${newAccount.type}0000`
        break
    }
  } catch (error) {
    res.json({"status":500})
  }

//CREO LA CUENTA
  try {
    const response = await setAccount(idUser, newAccount);
    switch (true) {
      case response.rowCount !== 0:
        res.json({"status":201})
        break;
    
      default:
        res.json({"status":500})
        break;
    }
  } catch (error) {
    res.json({"status":500})
  }

}

const addMinorAccount = (req, res)=>{
  const username = req.params.username
  const newAccount = req.body;
  let accountCode = null;
  let idUser = null;
}

module.exports = {addMajorAccount, addMinorAccount}