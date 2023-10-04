import {useState } from "react";
import { helpHttp } from "../helpers/helpHttp"
import useUser from "./useUser";

const useAccount = ()=>{
  const api = helpHttp();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [response, setResponse] = useState(null);
  const [accounts, setAccounts] = useState([])
  const {logOutUser} = useUser();
  const infoToast = new bootstrap.Toast(document.getElementById("infoToast"))


  const createAccount = async(form)=>{
    const alertModal = new bootstrap.Modal(document.getElementById("alertModal"))
    const username = localStorage.getItem("username")
    const auth_token = localStorage.getItem("auth_token")
    let url;
    if(form.recivesCredit === "true"){
      url = `http://localhost:3000/account/addMinor/${username}/${auth_token}`
    }
    else {
      url = `http://localhost:3000/account/addMajor/${username}/${auth_token}`
    }
    setLoading(true)
    const options = {
      body: form,
      headers:{
        "content-type":"application/json",
      }
    }
    try {
      const res = await api.post(url, options);
      switch (true) {
        case res.status === 201:
          setResponse({status:res.status, title:"Creada", body:"La cuenta se creó correctamente.", success: true})
          infoToast.show();
          break;
    
        case res.status === 401:
          setResponse({title:"Error", body:"Este usuario no está autorizado. Será redirigido al Login.", success: false})
          alertModal.show();
          setTimeout(() => {
            logOutUser()
            alertModal.hide()
          }, 2000);
          break

        case res.status === 400:
          setErrors(res.validations)
          break;

        default:
          setResponse({status:res.status, title:"Error", body:"La cuenta no se ha podido crear."})
          infoToast.show();
          break;
      }
      
    } catch (error) {
      setResponse({status:res.status, title:"Error", body:"La cuenta no se ha podido crear."})
      infoToast.show();
    }
    setLoading(false)
  }

  const getMajorAccounts = async()=>{
    const username = localStorage.getItem("username")
    const auth_token = localStorage.getItem("auth_token")
    const url = `http://localhost:3000/account/getMajorAccounts/${username}/${auth_token}`
    try {
      const res = await api.get(url)
      switch (true) {
        case res.status===200:
          setAccounts(res.accounts)
          break;
        
        default:
          break;
      }
    } catch (error) {
      
    }
  }

  const getMinorAccounts = async()=>{
    const username = localStorage.getItem("username")
    const auth_token = localStorage.getItem("auth_token")
    const minorAccountsUrl = `http://localhost:3000/account/getMinorAccounts/${username}/${auth_token}`
    try {
      const res = await api.get(minorAccountsUrl)
      switch (true) {
        case res.status === 200:
          setAccounts(res.accounts)
          break;
      
        default:
          break;
      }
    } catch (error) {
      
    }
  }

  const getAccountByName = async(accountName)=>{
    const username = localStorage.getItem("username")
    const auth_token = localStorage.getItem("auth_token")
    setLoading(true)
    const url = `http://localhost:3000/account/getAccounts/${username}/${auth_token}/?accountName=${accountName}`
    try {
      const res = await api.get(url);
      switch (true) {
        case res.status === 200:
          setAccounts(res.accounts)
          break;
      
        default:
          break;
      }
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
  }

  const editAccount = async (account)=>{
    const username = localStorage.getItem("username")
    const auth_token = localStorage.getItem("auth_token")
    const editUrl = `http://localhost:3000/account/editAccount/${username}/${auth_token}`
    
    const options = {
      body: account,
      headers:{
        "content-type":"application/json",
      }
    }

    try {
      setLoading(true)
      const res =  await api.patch(editUrl, options);
      switch (true) {
        case res.status === 200:
          updateAccountsEdited(account)
          setResponse({status:res.status, title:"Editado", body:"El nombre de la cuenta fue modificado.", success: true})
          infoToast.show()
          break;

        case res.status === 401:
          setResponse({title:"Error", body:"Este usuario no está autorizado. Será redirigido al Login.", success: false})
          alertModal.show();
          setTimeout(() => {
            logOutUser()
            alertModal.hide()
          }, 2000);
          break

        case res.status === 500:
          setResponse({title:"Error", body:"No se ha podido editar la cuenta", success: false})
          infoToast.show()
          break;
      
        default:
          setResponse({title:"Error", body:"No se ha podido editar la cuenta", success: false})
          infoToast.show()
          break;
      }
    } catch (error) {
        setResponse({title:"Error", body:"No se ha podido editar la cuenta", success: false})
        infoToast.show()
    }
    setLoading(false)
  }

  const deleteAccount = async(account)=>{
    const username = localStorage.getItem("username")
    const auth_token = localStorage.getItem("auth_token")
    const deleteUrl = `http://localhost:3000/account/deleteAccount/${username}/${auth_token}`
    
    const options = {
      body: account,
      headers:{
        "content-type":"application/json",
      }
    }

    try {
      setLoading(true)
      const res =  await api.remove(deleteUrl, options);
      switch (true) {
        case res.status === 200:
          updateAccountsDeleted(account)
          setResponse({status:res.status, title:"Eliminada", body:"La cuenta ha sido eliminada", success: true})
          infoToast.show()
          break;

        case res.status === 400:
          setResponse({title:"Error", body:"No se puede eliminar esta cuenta ya que posee movimientos o cuentas asociadas.", success: false})
          infoToast.show();
          break;

        case res.status === 401:
          setResponse({title:"Error", body:"Este usuario no está autorizado. Será redirigido al Login.", success: false})
          alertModal.show();
          setTimeout(() => {
            logOutUser()
            alertModal.hide()
          }, 2000);
          break

        case res.status === 500:
          setResponse({title:"Error", body:"No se ha podido eliminar la cuenta", success: false})
          infoToast.show()
          break;
      
        default:
          setResponse({title:"Error", body:"No se ha podido eliminar la cuenta", success: false})
          infoToast.show()
          break;
      }
    } catch (error) {
        setResponse({title:"Error", body:"No se ha podido eliminar la cuenta", success: false})
        infoToast.show()
    }
    setLoading(false)
  }

  const updateAccountsEdited = (accountEdited)=>{
    const newAccounts = accounts.map(acc => acc.id_account !== accountEdited.id_account ? acc : accountEdited)
    setAccounts(newAccounts)
  }

  const updateAccountsDeleted = (accountDeleted)=>{
    const newAccounts = accounts.filter(acc => acc.id_account !== accountDeleted.id_account)
    setAccounts(newAccounts)
  }

  return {loading, errors, response, accounts, setAccounts,  createAccount, getMajorAccounts, getMinorAccounts, getAccountByName, editAccount, deleteAccount}
}
export default useAccount