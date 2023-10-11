import { useState } from "react";
import { helpHttp } from "../helpers/helpHttp";
import useUser from "./useUser";

const useMovement = ()=>{
  const api = helpHttp();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [response, setResponse] = useState(null);
  const {logOutUser} = useUser();
  const infoToast = new bootstrap.Toast(document.getElementById("infoToast"))
  

  const addMovements = async (movements)=>{
    const username = localStorage.getItem("username");
    const auth_token = localStorage.getItem("auth_token");
    const addMovementUrl = `http://localhost:3000/movement/addMovement/${username}/${auth_token}`

    const options = {
      body: movements,
      headers:{
        "content-type":"application/json",
      }
    }
    setLoading(true)
    try {
      const response = await api.post(addMovementUrl, options);
      switch (true) {
        case response.status === 200:
          setResponse({title:"Creado", body:"El asiento se creo correctamente.", success: true})
          infoToast.show();
          break;
      
        default:
          setResponse({title:"Error", body:"El asiento no se ha podido crear.", success: false})
          infoToast.show();
          break;
      }
    } catch (error) {
      setResponse({title:"Error", body:"El asiento no se ha podido crear.", success: false})
      infoToast.show()
    }

    setLoading(false)
  }

  return {loading, errors, response, addMovements}
}
export default useMovement;