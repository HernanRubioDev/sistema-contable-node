import { useContext, useState } from "react";
import sessionContext from "../context/UserContext";

const useAccount = ()=>{
  const infoToast = new bootstrap.Toast(document.getElementById("infoToast"))
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [response, setResponse] = useState(null);
  const {handleSession} = useContext(sessionContext)
  
  const createAccount = async(account)=>{
    setLoading(true)
    infoToast.show()
    setLoading(false)
  }

  return {loading, errors, response, createAccount}
}
export default useAccount