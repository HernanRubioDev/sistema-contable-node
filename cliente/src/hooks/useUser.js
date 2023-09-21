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
          setResponse({title:"¡Bienvendio!", body:"Su cuenta ha sido creada con éxito.", success:true})
          alertModal.show()
          setTimeout(() => {
            alertModal.hide()
            navigate("/")
          }, 3000);
          break;

        case res.status === 202:
          setResponse({status:res.status ,title:"Ups...", body:"Parece que ha ocurrido un error...intentelo mas tarde", success:false})
          alertModal.show()
          break;

        case res.status === 500:
          setResponse({status:res.status ,title:"Ups...", body:"Parece que ha ocurrido un error...intentelo mas tarde", success:false})
          alertModal.show()
          break;

        default:
          setResponse({status:res.status ,title:"Ups...", body:"Parece que ha ocurrido un error...intentelo mas tarde", success:false})
          alertModal.show()
          break;
      }
      
    } catch (error) {
      setResponse({status:res.status ,title:"Ups...", body:"Parece que ha ocurrido un error...intentelo mas tarde", success:false})
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
          handleSession(true)
          break;
        
        case res.status === 202 || res.status === 500:
          setErrors({message:"El usuario o la contraseña son incorrectos."})
          handleSession(false)
          alertModal.show()
          break
          
          case res.status === 400:
            setErrors(res.validations);
            handleSession(false)
            break
        
        case res.status === 403:
          setErrors({message:"El usuario o la contraseña son incorrectos."});
          handleSession(false)
          break
        
        case res.status === 404:
          setErrors({message:"El usuario o la contraseña son incorrectos."});
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
