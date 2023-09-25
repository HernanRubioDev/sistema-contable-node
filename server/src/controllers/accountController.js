const {setAccount, getLastMajorAccount, getLastMinorAccount, getMajorsAccounts, getAccountByName} = require("../models/accountModel");
const {getUserByUsername} = require("../models/userModel");

const addMajorAccount = async(req, res)=>{
  const username = req.params.username
  const newAccount = req.body;
  let accountCode = null;
  let idUser = null;
  const date = new Date();
  newAccount.date_creation = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
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

const addMinorAccount = async (req, res)=>{
  const username = req.params.username
  const newAccount = req.body;
  newAccount.date
  let accountCode = null;
  let mayorAccount = newAccount.code.slice(0,3);
  let idUser = null;
  const date = new Date();
  newAccount.date_creation = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

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

  try {
    const account = await getLastMinorAccount(idUser, mayorAccount);
    switch (true) {
      case account.rowCount !== 0:
        accountCode = parseInt(account.rows[0].code) + 1
        newAccount.code = accountCode.toString();
        break;

      case account.rowCount === 0:
        res.json({"status":404})
        break

      default:
        res.json({"status":500})
        break
    }
  } catch (error) {
    res.json({"status":500})
  }

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

const searchMajorAccounts = async (req, res)=>{
  let idUser;
  const username = req.params.username

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

  try {
    const accounts = await getMajorsAccounts(idUser);
    switch (true) {
      case accounts.rowCount !== 0:
        res.json({"status":200, "accounts":accounts.rows})
        break;

      default:
        res.json({"status":404})
        break;
    }
  } catch (error) {
    res.json({"status":500})
  }
}

const searchAccountByName = async (req, res)=>{
  let idUser;
  const accountName = req.query.accountName;
  const username = req.params.username

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

  try {
    const accounts = await getAccountByName(idUser, accountName);
    switch (true) {
      case accounts.rowCount !== 0:
        res.json({"status":200, "accounts":accounts.rows})
        break;
    
      default:
        res.json({"status":400})
        break;
    }
  } catch (error) {
    res.json({"status":500})
  }
}

module.exports = {addMajorAccount, addMinorAccount, searchMajorAccounts, searchAccountByName}