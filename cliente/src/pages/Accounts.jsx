import { useNavigate } from "react-router-dom";
import Header from "../components/Header"
import Menu from "../components/Menu";
import sessionContext from "../context/UserContext";
import { useContext, useEffect, useState } from "react";
import AccoutMenuWrapper from "../components/AccountMenuWrapper";
import InfoToast from "../components/InfoToast";

const Accounts = ()=>{
  const navigate = useNavigate();
  const {session} = useContext(sessionContext)
  useEffect(()=>{
    if(!session) navigate("/")
  },[session])

  const [menu, setMenu] = useState('search');

  return(
    <div className="login d-flex flex-wrap overflow-hidden">
      <Header />
      <Menu />
      <AccoutMenuWrapper menu={menu} setMenu={setMenu}/>
      <InfoToast />
    </div>
  )
}

export default Accounts;