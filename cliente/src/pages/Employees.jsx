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
import ReciptModal from "../components/employeers/ReciptModal";

const Employees = ()=>{
  const navigate = useNavigate();
  const {session} = useContext(sessionContext)
  const {menu, setMenu} = useContext(menuContext)
  const [emplyoeeToPay, setEmployeeToPay] = useState(null);
  const [recipt, setRecipt] = useState(null);

  useEffect(()=>{
    if(!menu){
      setMenu("add")
    }
  },[])

  useEffect(()=>{
    if(!session) navigate("/")
  },[session])

  const {loading, employees, response, cities, categories, banks, concepts, recipts, createRecipt, addEmployee, getEmployee, getCities, getCategories, getBanks, getConcepts, setConcepts, searchRecipt} = useEmployee();
  return(
    <div className="vh-100 d-flex flex-column overflow-hidden">
        <Header />
        <div className="d-flex h-100">
          <Menu />
          <EmployeerMenuWrapper menu={menu} loading={loading} employees={employees} cities={cities} categories={categories} banks={banks} recipts={recipts} addEmployee={addEmployee} getEmployee={getEmployee} getCities={getCities} getCategories={getCategories} getBanks={getBanks} setEmployeeToPay={setEmployeeToPay} searchRecipt={searchRecipt} setRecipt={setRecipt}/>
          <InfoToast response={response}/>
          <AlertModal response={response}/>
          <PaycheckStubModal emplyoeeToPay={emplyoeeToPay} concepts={concepts}  getConcepts={getConcepts} setConcepts={setConcepts} createRecipt={createRecipt}/> 
          <ReciptModal recipt={recipt}/>
        </div>
    </div>
  );
}

export default Employees;