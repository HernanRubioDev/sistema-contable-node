import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import sessionContext from "../context/UserContext";
import menuContext from "../context/menuContext";
import Header from "../components/Header";
import Menu from "../components/Menu";
import EmployeerMenuWrapper from "../components/employeers/EmployeerMenuWrapper";
import useEmployee from "../hooks/useEmployee";
import InfoToast from "../components/InfoToast";

const Employees = ()=>{
  const navigate = useNavigate();
  const {session} = useContext(sessionContext)
  const {menu} = useContext(menuContext)
  useEffect(()=>{
    if(!session) navigate("/")
  },[session])

  const {loading, employees, response, cities, addEmployee, getEmployee, getCities} = useEmployee();

  return(
    <div className="vh-100 d-flex flex-column overflow-hidden">
        <Header />
        <div className="d-flex h-100">
          <Menu />
          <EmployeerMenuWrapper menu={menu} loading={loading} employees={employees} cities={cities} addEmployee={addEmployee} getEmployee={getEmployee} getCities={getCities}/>
          <InfoToast response={response}/>
        </div>
    </div>
  );
}

export default Employees;