import { useState } from "react";
import { helpHttp } from "../helpers/helpHttp";

const useEmployee = ()=>{
  const api = helpHttp();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [employee, setEmployee] = useState([]);
	const infoToast = new bootstrap.Toast(document.getElementById("infoToast"))

  const addEmployee = (employee)=>{
    console.log(employee);
  }

  const getEmployee = (employee)=>{
    console.log(employee);
  }

  return {loading, response, employee, addEmployee, getEmployee}
}

export default useEmployee;