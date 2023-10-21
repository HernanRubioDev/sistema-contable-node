const {setAccount, getLastMajorAccount, getLastMinorAccount, getMajorsAccounts, getMinorAccounts, getAccountByName, patchAccoutName, deleteAccount, getMinorAccountsForLedger} = require("../models/accountModel");
const {getUserByUsername} = require("../models/userModel");

const addMajorAccount = async(req, res)=>{
  const newAccount = req.body;

  let accountCode = null;
  const date = new Date();
  newAccount.date_creation = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  try {
    const account = await getLastMajorAccount(newAccount.type); //BUSCO LA EL CODIGO DE LA ULTIMA CUENTA MAYOR O LO CREO
  
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
    res.json({status:500, title:"Error", body:"La cuenta no se ha podido crear.", success: false})
  }

  try {
    const response = await setAccount(newAccount); //CREO LA CUENTA
    switch (true) {
      case response.rowCount !== 0:
        res.json({status:201, title:"Creada", body:"La cuenta se creó correctamente.", success: true})
        break;
    
      default:
        res.json({status:500, title:"Error", body:"La cuenta no se ha podido crear.", success: false})
        break;
    }
  } catch (error) {
    res.json({status:500, title:"Error", body:"La cuenta no se ha podido crear.", success: false})
  }
}

const addMinorAccount = async (req, res)=>{
  const newAccount = req.body;
  let accountCode = null;
  let mayorAccount = newAccount.code.slice(0,3);
  const date = new Date();
  newAccount.date_creation = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

  try {
    const account = await getLastMinorAccount(mayorAccount);
    switch (true) {
      case account.rowCount !== 0:
        accountCode = parseInt(account.rows[0].code) + 1
        newAccount.code = accountCode.toString();
        break;

      case account.rowCount === 0:
        res.json({status:404, title:"Error", body:"Debe seleccionar la cuenta asociada", success: false})
        break

      default:
        res.json({status:500, title:"Error", body:"La cuenta no se ha podido crear.", success: false})
        break
    }
  } catch (error) {
    res.json({status:500, title:"Error", body:"La cuenta no se ha podido crear.", success: false})
  }

  try {
    const response = await setAccount(newAccount);
    switch (true) {
      case response.rowCount !== 0:
        res.json({status:201, title:"Creada", body:"La cuenta se creó correctamente.", success: true})
        break;
    
      default:
        res.json({status:500, title:"Error", body:"La cuenta no se ha podido crear.", success: false})
        break;
    }
  } catch (error) {
    res.json({status:500, title:"Error", body:"La cuenta no se ha podido crear.", success: false})
  }

}

const searchMajorAccounts = async (req, res)=>{

  try {
    const accounts = await getMajorsAccounts();
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

const searchMinorAccounts = async(req, res) =>{
  try {
    const accounts = await getMinorAccounts();
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

const serachMinorAccountsForLedger = async(req, res)=>{
  try {
    const accounts = await getMinorAccountsForLedger();
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
  const accountName = req.query.accountName;

  try {
    const accounts = await getAccountByName(accountName);
    switch (true) {
      case accounts.rowCount !== 0:
        res.json({status:200, accounts:accounts.rows})
        break;

        case accounts.rowCount === 0:
          res.json({status:200, accounts:[]})
          break;

      case accounts === null:
        res.json({status:500, title:"Error", body:"No se a podido completar la busqueda.", success:false})
        break;

      default:
        res.json({status:500, title:"Error", body:"No se a podido completar la busqueda.", success:false})
        break;
    }
  } catch (error) {
    res.json({status:500, title:"Error", body:"No se a podido completar la busqueda.", success:false})
  }
}

const editAccount = async(req, res)=>{
  const {name, id_account} = req.body
  
  try {
    const response = await patchAccoutName(id_account, name);

    switch (true) {
      case response.rowCount !== 0:
        res.json({status: 200, title:"Editado", body:"El nombre de la cuenta fue modificado.", success: true})
        break;
    
      default:
        res.json({status: 400, title:"Error", body:"No se ha podido editar la cuenta", success: false});
        break;
    }
  } catch (error) {
    res.json({status:500, title:"Error", body:"No se ha podido editar la cuenta", success: false});
  }
}

const removeAccount = async(req, res)=>{
  const {id_account} = req.body;

  try {
    const response = await deleteAccount(id_account);
    switch (true) {
      case response.rowCount !== 0:
        res.json({status:200, title:"Eliminada", body:"La cuenta ha sido eliminada", success: true})
        break;
    
      default:
        res.json({status:500, title:"Error", body:"No se ha podido elimiar la cuenta", success: false})
        break;
    }
  } catch (error) {
    res.json({status:500, title:"Error", body:"No se ha podido elimiar la cuenta", success: false});
  }
}

module.exports = {addMajorAccount, addMinorAccount, searchMajorAccounts, searchAccountByName, editAccount, removeAccount, searchMinorAccounts, serachMinorAccountsForLedger}