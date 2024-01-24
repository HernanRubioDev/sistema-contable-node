import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import sessionContext from "../context/UserContext";
import menuContext from "../context/menuContext";
import Header from "../components/Header";
import Menu from "../components/Menu";
import EmployeerMenuWrapper from "../components/employeers/EmployeerMenuWrapper";
import useEmployee from "../hooks/useEmployee";
import InfoToast from "../components/InfoToast";
import AlertModal from "../components/AlertModal";
import PaycheckStubModal from "../components/employeers/PlaycheckStubModal";

const Employees = ()=>{
  const navigate = useNavigate();
  const {session} = useContext(sessionContext)
  const {menu} = useContext(menuContext)
  const [emplyoeeToPay, setEmployeeToPay] = useState(null);

  useEffect(()=>{
    if(!session) navigate("/")
  },[session])

  const {loading, employees, response, cities, categories, banks, concepts, addEmployee, getEmployee, getCities, getCategories, getBanks, getConcepts} = useEmployee();

//ARREGLAR EL MODAL QUE NO ABRE
  return(
    <div className="vh-100 d-flex flex-column overflow-hidden">
        <Header />
        <div className="d-flex h-100">
          <Menu />
          <EmployeerMenuWrapper menu={menu} loading={loading} employees={employees} cities={cities} categories={categories} banks={banks} addEmployee={addEmployee} getEmployee={getEmployee} getCities={getCities} getCategories={getCategories} getBanks={getBanks} setEmployeeToPay={setEmployeeToPay}/>
          <InfoToast response={response}/>
          <AlertModal response={response}/>
          <PaycheckStubModal emplyoeeToPay={emplyoeeToPay} concepts={concepts} getConcepts={getConcepts}/> 
        </div>
    </div>
  );
}

export default Employees;