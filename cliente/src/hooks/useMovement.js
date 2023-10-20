import { useState } from "react";
import { helpHttp } from "../helpers/helpHttp";
import useUser from "./useUser";

const useMovement = ()=>{
  const api = helpHttp();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [movements, setMovements] = useState([])
  const [lines, setLines] = useState([]);
  const [quantity, setQuantity] = useState(null);
  const {logOutUser} = useUser();
  const infoToast = new bootstrap.Toast(document.getElementById("infoToast"))
  

  const addMovements = async (movements)=>{
    const username = localStorage.getItem("username");
    const auth_token = localStorage.getItem("auth_token");
    const user_role = localStorage.getItem("user_role")
    const addMovementUrl = `http://localhost:3000/movement/addMovement/${username}/${user_role}/${auth_token}`
    delete movements.type
    delete movements.ammount
    delete movements.account
    delete movements.moveNum

    const options = {
      body: movements,
      headers:{
        "content-type":"application/json",
      }
    }
    setLoading(true)
    try {
      const res = await api.post(addMovementUrl, options);
      switch (true) {
        case res.status === 201:
          setResponse({title:"Creado", body:"El asiento se creo correctamente.", success: true})
          infoToast.show();
          break;

        case res.status === 400:
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

  const searchMovementsByDates = async(dates)=>{
    const {dateFrom, dateTo}= dates
    const username = localStorage.getItem("username");
    const auth_token = localStorage.getItem("auth_token");
    const user_role = localStorage.getItem("user_role");
    const searchMovements = `http://localhost:3000/movement/getMovementByDates/${username}/${user_role}/${auth_token}/?dateFrom=${dateFrom}&dateTo=${dateTo}`

    setLoading(true)
    try {
      const res = await api.get(searchMovements);
      switch (true) {
        case res.status === 200:
          setMovements(res.movements);
          break;

        case res.status === 400:
          setResponse(res)
          infoToast.show()
          break;

        case res.status === 500:
          setResponse({title:"Error", body:"No se ha podido buscar el asiento.", success: false})
          infoToast.show()
          break;
        
        default:
          setResponse({title:"Error", body:"No se ha podido buscar el asiento.", success: false})
          infoToast.show()
          break;
      }
    } catch (error) {
      setResponse({title:"Error", body:"El asiento no se ha podido crear.", success: false})
      infoToast.show()
    }
    setLoading(false)
  }

  const getMoveLineById = async(id_move)=>{
    const username = localStorage.getItem("username");
    const auth_token = localStorage.getItem("auth_token");
    const user_role = localStorage.getItem("user_role");

    const serachLineURL = `http://localhost:3000/movement/getMoveLineById/${username}/${user_role}/${auth_token}/?id_move=${id_move}`

    try {
      const res = await api.get(serachLineURL)
      switch (true) {
        case res.status === 200:
          console.log(res.lines)
          setLines(res.lines);
          break;
      
        default:
          setResponse({title:"Error", body:"No se ha podido encontrar encontrar las lineas.", success: false})
          infoToast.show()
          break;
      }
    } catch (error) {
      setResponse({title:"Error", body:"No se ha podido encontrar encontrar las lineas.", success: false})
      infoToast.show()
    }
  }

  const getMovesQuantity = async()=>{
    const username = localStorage.getItem("username");
    const auth_token = localStorage.getItem("auth_token");
    const user_role = localStorage.getItem("user_role");
    const movesQuantityUrl = `http://localhost:3000/movement/getMovementQuantity/${username}/${user_role}/${auth_token}`
    try {
      const res = await api.get(movesQuantityUrl);
      switch (true) {
        case res.status === 200:
          setQuantity(parseInt(res.quantity.count));
          break;

        case res.status === 500:
          setResponse({title:"Error", body:"No se ha podido encontrar la cantidad de movimientos.", success: false})
          infoToast.show()
          break

        default:
          setResponse({title:"Error", body:"No se ha podido encontrar la cantidad de movimientos.", success: false})
          infoToast.show()
          break
      }
    } catch (error) {
      setResponse({title:"Error", body:"No se ha podido encontrar la cantidad de movimientos.", success: false})
      infoToast.show()
    }
  }
  
  return {loading, response, quantity, movements, lines, setQuantity, addMovements, searchMovementsByDates, getMovesQuantity, getMoveLineById}
}
export default useMovement;
