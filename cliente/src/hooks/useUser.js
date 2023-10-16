import { useNavigate } from "react-router-dom";
import { helpHttp } from "../helpers/helpHttp"
import { useContext, useState } from "react";
import sessionContext from "../context/UserContext";

const useUser = ()=>{
  const api = helpHttp();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [response, setResponse] = useState(null);
  const {handleSession} = useContext(sessionContext)

  const registerUser= async (user)=>{
    const alertModal = new bootstrap.Modal(document.getElementById("alertModal"))
    setLoading(true)
    const endpoint = "http://localhost:3000/user/register";
    const options = {
      body: user,
      headers:{
        "content-type":"application/json",
      }
    }
    try {
      const res = await api.post(endpoint, options)
      switch (true) {

        case res.status === 400:
          setErrors(res.validations);
          break;
      
        case res.status === 201:
          setResponse(res)
          alertModal.show()
          setTimeout(() => {
            alertModal.hide()
            navigate("/")
          }, 3000);
          break;

        case res.status === 500:
          setResponse(res)
          alertModal.show()
          break;

        default:
          setResponse(res)
          alertModal.show()
          break;
      }
      
    } catch (error) {
      setResponse(res)
      alertModal.show()
    }
    setLoading(false)
  }

  const loginUser = async (user)=>{
    const alertModal = new bootstrap.Modal(document.getElementById("alertModal"))
    setLoading(true)
    const loginEndpoint = "http://localhost:3000/user/login";
    const options = {
      body: user,
      headers: {
        "content-type":"application/json"
      } 
    }

    try {
      const res = await api.post(loginEndpoint, options)
      switch (true) {
        case res.status === 201:
          localStorage.setItem ("auth_token", res.auth_token);
          localStorage.setItem("username", res.username)
          localStorage.setItem("user_role", res.user_role)
          handleSession(true)
          break;
        
        case res.status === 500:
          setResponse(res)
          handleSession(false)
          alertModal.show()
          break
          
          case res.status === 400:
            setErrors(res.validations);
            handleSession(false)
            break
        
        case res.status === 403:
          setErrors(res);
          handleSession(false)
          break
        
        case res.status === 404:
          setErrors(res);
          handleSession(false)
          break

        default:
          setResponse({status:res.status ,title:"Ups...", body:"Parece que ha ocurrido un error...intentelo mas tarde", success:false})
          handleSession(false)
          alertModal.show()
          break;
      }
    } catch (error) {
      setResponse({status:res.status ,title:"Ups...", body:"Parece que ha ocurrido un error...intentelo mas tarde", success:false})
      handleSession(false)
      alertModal.show()
      }
    setLoading(false)
  }

  const logOutUser = async ()=>{
    localStorage.removeItem("auth_token");
    localStorage.removeItem("username");
    handleSession(false);
  }

    return {errors, loading, response, registerUser, loginUser, logOutUser}
}

export default useUser
