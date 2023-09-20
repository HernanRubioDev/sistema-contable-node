import { useNavigate } from "react-router-dom";
import Header from "../components/Header"
import Menu from "../components/Menu";
import sessionContext from "../context/UserContext";
import { useContext, useEffect, useState } from "react";
import AccoutMenuWrapper from "../components/AccountMenuWrapper";
import InfoToast from "../components/InfoToast";
import useAccount from "../hooks/useAccount";

const Accounts = ()=>{
  const navigate = useNavigate();
  const {session} = useContext(sessionContext)
  useEffect(()=>{
    if(!session) navigate("/")
  },[session])

  const [menu, setMenu] = useState('search');
  const {loading, errors, response, createAccount} = useAccount();
  return(
    <div className="login d-flex flex-wrap overflow-hidden">
      <Header />
      <Menu />
      <AccoutMenuWrapper menu={menu} loading={loading} setMenu={setMenu} createAccount={createAccount}/>
      <InfoToast response={response}/>
    </div>
  )
}

export default Accounts;