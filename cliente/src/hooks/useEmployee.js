import { useState } from "react";
import { helpHttp } from "../helpers/helpHttp";
import useUser from "./useUser";

const useEmployee = ()=>{
  const api = helpHttp();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [cities, setCities] = useState([])
  const [categories, setCategories] = useState([])
  const {logOutUser} = useUser();
	const infoToast = new bootstrap.Toast(document.getElementById("infoToast"))

  const addEmployee = async (employee)=>{
    const alertModal = new bootstrap.Modal(document.getElementById("alertModal"))
    const username = localStorage.getItem("username");
    const auth_token = localStorage.getItem("auth_token");
    const user_role = localStorage.getItem("user_role");
    
    const url =`http://localhost:3000/employee/addEmployee/${username}/${user_role}/${auth_token}`
    console.table(employee)
    const options = {
      body: employee,
      headers:{
        "content-type":"application/json",
      }
    }
    setLoading(true)
    try {
      const res = await api.post(url, options)
      console.log(res)
      switch (true) {
        case res.status === 201:
          setResponse(res)
          infoToast.show()
          break;

        case res.status === 400:
          setResponse(res)
          infoToast.show()
          break

        case res.status === 401:
          setResponse(res)
          alertModal.show()
          setTimeout(()=>{
            logOutUser()
            alertModal.hide()
          },2000)
          break;

        case res.status === 403:
          setResponse(res)
          infoToast.show()
          break;
      
        case res.stauts === 500:
          setResponse(res);
          infoToast.show()
          break;

        default:
          setResponse({title:"Error", body:"Ha ocurrindo un error. Intentelo mas tarde", success: false})
          infoToast.show()
          break;
      }
    } catch (error) {
      console.log(error)
      setResponse({title:"Error", body:"Ha ocurrindo un error. Intentelo mas tarde", success: false})
      infoToast.show()
    }
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
      console.log(res)
      switch (true) {
        case res.status === 200:
          setEmployees(res.employees)
          break;

        case res.status === 404:
          setResponse(res);
          setEmployees([])
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
    setLoading(true)
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
    setLoading(false)
  }

  const getCategories = async ()=>{
    const username = localStorage.getItem("username");
    const auth_token = localStorage.getItem("auth_token");
    const user_role = localStorage.getItem("user_role");
    const endpoint = `http://localhost:3000/employee/getCategories/${username}/${user_role}/${auth_token}`

    try {
      const res = await api.get(endpoint)
      switch (true) {
        case res.status === 200:
          setCategories(res.categories)
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
  return {loading, response, employees, cities, categories ,addEmployee, getEmployee, getCities, getCategories}
}

export default useEmployee;