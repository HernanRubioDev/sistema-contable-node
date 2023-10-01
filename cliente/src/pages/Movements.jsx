import { useNavigate } from "react-router-dom";
import Header from "../components/Header"
import Menu from "../components/Menu";
import { useContext, useEffect, useState } from "react";
import sessionContext from "../context/UserContext";
import MovementsMenuWrapper from "../components/MovementMenuWrapper";
import MovementDetailsModal from "../components/MovementDetailsModal";

const Movements = ()=>{
  const navigate = useNavigate();
  const {session} = useContext(sessionContext)
  useEffect(()=>{
    if(!session) navigate("/")
  },[session])

  
  const [menu, setMenu] = useState('search');

  return(
    <div className="vh-100 d-flex flex-wrap overflow-hidden">
      <Header />
      <Menu />
      <MovementsMenuWrapper menu={menu} setMenu={setMenu}/>
      <MovementDetailsModal />
    </div>
  );
}

export default Movements;