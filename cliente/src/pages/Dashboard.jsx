import { useContext, useEffect } from "react";
import Header from "../components/Header";
import sessionContext from "../context/UserContext";
import {useNavigate} from "react-router-dom";
import Menu from "../components/Menu";
import DashboardMenu from "../components/DashboardMenu";


const Dashboard = ()=>{
  const navigate = useNavigate();
  const {session} = useContext(sessionContext)
  useEffect(()=>{
    if(!session) navigate("/")
  },[session])

  return(
    <div className="vh-100 d-flex flex-wrap overflow-hidden">
        <Header />
        <Menu />
        <DashboardMenu />
    </div>
  );
}

export default Dashboard;