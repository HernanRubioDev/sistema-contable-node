import { useContext, useEffect } from "react";
import Header from "../components/Header";
import sessionContext from "../context/UserContext";
import {useNavigate} from "react-router-dom";
import Menu from "../components/Menu";
import DashboardMenu from "../components/dashboard/DashboardMenu";
import menuContext from "../context/menuContext";


const Dashboard = ()=>{
  const navigate = useNavigate();
  const {session} = useContext(sessionContext)
  const {active, setMenu, setActive} = useContext(menuContext)
  useEffect(()=>{
    if(!session) navigate("/")
  },[session])

  return(
    <div className="vh-100 d-flex flex-wrap overflow-hidden">
        <Header />
        <Menu />
        <DashboardMenu active={active} setActive={setActive} setMenu={setMenu}/>
    </div>
  );
}

export default Dashboard;