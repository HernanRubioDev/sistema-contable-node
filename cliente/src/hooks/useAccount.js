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
      url = `http://localhost:3000/account/addMinor/${username}/?auth_token=${auth_token}`
    }
    else {
      url = `http://localhost:3000/account/addMajor/${username}/?auth_token=${auth_token}`
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
          setResponse({status:res.status, title:"Creada", body:"La cuenta se creó correctamente."})
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
    const url = `http://localhost:3000/account/get/${username}/?auth_token=${auth_token}`
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

  return {loading, errors, response, accounts, createAccount, getMajorAccounts}
}
export default useAccount