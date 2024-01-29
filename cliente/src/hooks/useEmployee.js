import { useState } from "react";
import { helpHttp } from "../helpers/helpHttp";
import useUser from "./useUser";
import useMovement from "./useMovement";
const useEmployee = ()=>{
  const api = helpHttp();
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState(null)
  const [employees, setEmployees] = useState([])
  const [cities, setCities] = useState([])
  const [categories, setCategories] = useState([])
  const [banks, setBanks] = useState([])
  const [concepts, setConcepts] = useState([]);
  const {logOutUser} = useUser()
	const infoToast = new bootstrap.Toast(document.getElementById("infoToast"))
  const {addMovements} = useMovement()

  const addEmployee = async (employee)=>{
    const alertModal = new bootstrap.Modal(document.getElementById("alertModal"))
    const username = localStorage.getItem("username");
    const auth_token = localStorage.getItem("auth_token");
    const user_role = localStorage.getItem("user_role");
    
    const url =`http://localhost:3000/employee/addEmployee/${username}/${user_role}/${auth_token}`
    const options = {
      body: employee,
      headers:{
        "content-type":"application/json",
      }
    }
    setLoading(true)
    try {
      const res = await api.post(url, options)
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
      switch (true) {
        case res.status === 200:
          setEmployees(res.employees)
          break;

        case res.status === 404:
          setResponse(res);
          setEmployees([])
          infoToast.show()
          break;

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
    const endpoint = `http://localhost:3000/city/getCities/${username}/${user_role}/${auth_token}`
    setLoading(true)
    try {
      const res = await api.get(endpoint)
      switch (true) {
        case res.status === 200:
          setCities(res.cities)
          break;

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
    const endpoint = `http://localhost:3000/category/getCategories/${username}/${user_role}/${auth_token}`

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

  const getBanks = async()=>{
    const username = localStorage.getItem("username");
    const auth_token = localStorage.getItem("auth_token");
    const user_role = localStorage.getItem("user_role");

    const endpoint = `http://localhost:3000/bank/getBanks/${username}/${user_role}/${auth_token}`

    try {
      const res = await api.get(endpoint)
      switch (true) {
        case res.status === 200:
          setBanks(res.banks)
          break;

        case res.status === 404:
          setResponse(res)
          infoToast.show()
          break;

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

  const  getConcepts = async()=>{
    const username = localStorage.getItem("username");
    const auth_token = localStorage.getItem("auth_token");
    const user_role = localStorage.getItem("user_role");

    const endpoint = `http://localhost:3000/concept/getConcepts/${username}/${user_role}/${auth_token}`

    try {
      const res = await api.get(endpoint)
      switch (true) {
        case res.status === 200:
          setConcepts(res.concepts)
          break;

        case res.status === 404:
          setResponse(res)
          infoToast.show()
          break;

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

  const createRecipt = async(employeeInfo, totalConcepts)=>{
    //Recordar traer los concepts ya que son necesarios para almacenarlos en la tabla intermedia pay_checks_concepts
    const today = new Date().toISOString().slice(0, 10);
    const {totalSalary, totalDesc, totalExcen, totalGrav} = totalConcepts
    const {name, surname} = employeeInfo
    const movement = {
      date: today,
      description: `Devengación de sueldo a ${name} ${surname}`,
      account: 'CMV',
      rows: [
        {
          date: today,
          account: 'Banco Nacion c/c',
          type: 'haber',
          ammount: totalSalary
        },
        {
          date: today,
          account: 'Egresos',
          type: 'debe',
          ammount: totalSalary
        }
      ],
    } 

    try {
      const resMovement = await addMovements(movement);
      console.log(resMovement)
      switch (resMovement.status) {

        case 200:
          setResponse(resMovement);
          break;

        case 400:
          setResponse(resMovement);
          break;

        case 500:
          setResponse(resMovement);
          break;

        default:
        setResponse({title:"Error", body:"El asiento no se ha podido crear.", success: false})
         infoToast.show()
          break;
      }
    } catch (error) {
      setResponse({title:"Error", body:"El asiento no se ha podido crear.", success: false})
      infoToast.show()
    }
    addPayCheck(employeeInfo, concepts)
  }

  const addPayCheck = (employeeInfo, concept)=>{
    console.log(employeeInfo)
  }

  return {loading, response, employees, cities, categories, banks, concepts, addEmployee, getEmployee, getCities, getCategories, getBanks, getConcepts, getConcepts, createRecipt}
}

export default useEmployee;