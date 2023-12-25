import { useState } from "react";
import { helpHttp } from "../helpers/helpHttp";

const useEmployee = ()=>{
  const api = helpHttp();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [cities, setCities] = useState([])
	const infoToast = new bootstrap.Toast(document.getElementById("infoToast"))

  const addEmployee = (employee)=>{
  }

  const getEmployee = async (employee)=>{
    const {name, surname, city} = employee
    const username = localStorage.getItem("username");
    const auth_token = localStorage.getItem("auth_token");
    const user_role = localStorage.getItem("user_role");
    
    const endpoint = `http://localhost:3000/employee/getEmployee/${username}/${user_role}/${auth_token}/?name=${name}&surname=${surname}&city=${city}`
    setLoading(true)
    try {
      const res = await api.get(endpoint)
      switch (true) {
        case res.status === 200:
          setEmployees(res.employees)
          break;

        case res.status === 404:
          setResponse(res);
          infoToast.show()
          break;

        case res.status === 500:
          setResponse(res);
          infoToast.show()
          break;

        default:
          setResponse({title:"Error", body:"Ha ocurrindo un error. Intentelo mas tarde", success: false})
          infoToast.show()
          break;
      }
    } catch (error) {
      setResponse({title:"Error", body:"Ha ocurrindo un error. Intentelo mas tarde", success: false})
      infoToast.show()
    }
    setLoading(false)
  }

  const getCities = async()=>{
    const username = localStorage.getItem("username");
    const auth_token = localStorage.getItem("auth_token");
    const user_role = localStorage.getItem("user_role");
    const endpoint = `http://localhost:3000/employee/getCities/${username}/${user_role}/${auth_token}`
    try {
      const res = await api.get(endpoint)
      switch (true) {
        case res.status === 200:
          setCities(res.cities)
          break;

        case res.status === 500:
          setResponse(res);
          infoToast.show()
          break;

        default:
          setResponse({title:"Error", body:"Ha ocurrindo un error. Intentelo mas tarde", success: false})
          infoToast.show()
          break;
      }

    } catch (error) {
      setResponse({title:"Error", body:"Ha ocurrindo un error. Intentelo mas tarde", success: false})
      infoToast.show()
    }
  }

  return {loading, response, employees, cities, addEmployee, getEmployee, getCities}
}

export default useEmployee;