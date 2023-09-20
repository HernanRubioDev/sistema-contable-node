import { useContext, useState } from "react";
import { helpHttp } from "../helpers/helpHttp"
import sessionContext from "../context/UserContext";

const useAccount = ()=>{
  const api = helpHttp();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [response, setResponse] = useState(null);
  const {handleSession} = useContext(sessionContext)
  const infoToast = new bootstrap.Toast(document.getElementById("infoToast"))
  
  const createAccount = async(form)=>{
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
    console.log(form.credit)
    try {
      const res = await api.post(url, options);
      switch (true) {
        case res.status === 201:
          setResponse({status:res.status, title:"Creada", body:"La cuenta se creó correctamente."})
          infoToast.show();
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


  return {loading, errors, response, createAccount}
}
export default useAccount