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
    const user_role = localStorage.getItem("user_role")
    let url;
    form.recive_credit === "true" ? url = `http://localhost:3000/account/addMinor/${username}/${user_role}/${auth_token}` : url = `http://localhost:3000/account/addMajor/${username}/${user_role}/${auth_token}`
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
          setResponse(res)
          infoToast.show();
          break;
    
        case res.status === 401:
          setResponse(res)
          alertModal.show();
          setTimeout(() => {
            logOutUser()
            alertModal.hide()
          }, 2000);
          break

        case res.status === 403:
          setResponse(res)
          infoToast.show();
          break;

        case res.status === 400:
          setResponse(res)
          infoToast.show();
          break;

        default:
          setResponse(res)
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
    const user_role = localStorage.getItem("user_role")
    const url = `http://localhost:3000/account/getMajorAccounts/${username}/${user_role}/${auth_token}`
    try {
      const res = await api.get(url)
      switch (true) {
        case res.status===200:
          setAccounts(res.accounts)
          break;

        case res.status === 401:
          setResponse(res)
          alertModal.show();
          setTimeout(() => {
          logOutUser()
          alertModal.hide()
          }, 2000);
          break;
        
        case res.status === 403:
          setResponse(res)
          infoToast.show();
          break;
          
        default:
          setResponse(res);
          infoToast.show()
          break;
          
      }
    } catch (error) {
      
    }
  }

  const getMinorAccounts = async()=>{
    const username = localStorage.getItem("username")
    const auth_token = localStorage.getItem("auth_token")
    const user_role = localStorage.getItem("user_role")
    const minorAccountsUrl = `http://localhost:3000/account/getMinorAccounts/${username}/${user_role}/${auth_token}`
    try {
      const res = await api.get(minorAccountsUrl)
      switch (true) {
        case res.status === 200:
          setAccounts(res.accounts)
          break;

          case res.status === 401:
            setResponse(res)
            alertModal.show();
            setTimeout(() => {
            logOutUser()
            alertModal.hide()
            }, 2000);
            break;
        
          case res.status === 403:
            setResponse(res)
            infoToast.show();
            break;
          
          case res.status === 500:
            setAccounts(res.accounts)
            break;

        default:
          setResponse({title:"Error", body:"No se han podido buscar las cuentas.", success: false})
          infoToast.show()
          break;
      }
    } catch (error) {
      setResponse({title:"Error", body:"No se han podido buscar las cuentas.", success: false})
      infoToast.show()
    }
  }

  const getAccountByName = async(accountName)=>{
    const username = localStorage.getItem("username")
    const auth_token = localStorage.getItem("auth_token")
    const user_role = localStorage.getItem("user_role")
    setLoading(true)
    const url = `http://localhost:3000/account/getAccounts/${username}/${user_role}/${auth_token}/?accountName=${accountName}`
    try {
      const res = await api.get(url);
      switch (true) {
        case res.status === 200:
          setAccounts(res.accounts)
          break;

        case res.status === 401:
          setResponse(res)
          alertModal.show();
          setTimeout(() => {
          logOutUser()
          alertModal.hide()
          }, 2000);
          break;
      
        case res.status === 403:
          setResponse(res)
          infoToast.show();
          break;
        
        case res.status === 500:
          setAccounts(res.accounts)
          break;
      
        default:
          setResponse({title:"Error", body:"No se han podido buscar las cuentas.", success: false})
          infoToast.show()
          break;
      }
    } catch (error) {
      setResponse({title:"Error", body:"No se han podido buscar las cuentas.", success: false})
      infoToast.show()
    }
    setLoading(false)
  }

  const editAccount = async (account)=>{
    const username = localStorage.getItem("username")
    const auth_token = localStorage.getItem("auth_token")
    const user_role = localStorage.getItem("user_role")
    const editUrl = `http://localhost:3000/account/editAccount/${username}/${user_role}/${auth_token}`
    
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
          setResponse(res)
          infoToast.show()
          break;

        case res.status === 401:
          setResponse(res)
          alertModal.show();
          setTimeout(() => {
            logOutUser()
            alertModal.hide()
          }, 2000);
          break

        case res.status === 403:
          setResponse(res)
          infoToast.show();
          break;

        case res.status === 500:
          setResponse(res)
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
    const user_role = localStorage.getItem("user_role")
    const deleteUrl = `http://localhost:3000/account/deleteAccount/${username}/${user_role}/${auth_token}`
    
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
          setResponse(res)
          infoToast.show()
          updateAccountsDeleted(account)
          break;

        case res.status === 400:
          setResponse(res)
          infoToast.show();
          break;

        case res.status === 401:
          setResponse(res)
          alertModal.show();
          setTimeout(() => {
            logOutUser()
            alertModal.hide()
          }, 2000);
          break
  
        case res.status === 403:
          setResponse(res)
          infoToast.show();
          break;

        case res.status === 500:
          setResponse(res)
          infoToast.show()
          break;
      
        default:
          setResponse({title:"Error", body:"No se ha podido borrar la cuenta", success: false})
          infoToast.show()
          break;
      }
    } catch (error) {
        setResponse({title:"Error", body:"No se ha podido editar la cuenta", success: false})
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