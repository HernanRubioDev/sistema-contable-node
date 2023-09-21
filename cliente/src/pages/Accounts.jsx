import { useNavigate } from "react-router-dom";
import Header from "../components/Header"
import Menu from "../components/Menu";
import sessionContext from "../context/UserContext";
import { useContext, useEffect, useState } from "react";
import AccoutMenuWrapper from "../components/AccountMenuWrapper";
import InfoToast from "../components/InfoToast";
import useAccount from "../hooks/useAccount";
import AlertModal from "../components/AlertModal";

const Accounts = ()=>{
  const navigate = useNavigate();
  const {session} = useContext(sessionContext)
  useEffect(()=>{
    if(!session) navigate("/")
  },[session])

  const [menu, setMenu] = useState('search');
  const {loading, errors, response, accounts, createAccount, getMajorAccounts} = useAccount();
  return(
    <div className="login d-flex flex-wrap overflow-hidden">
      <Header />
      <Menu />
      <AccoutMenuWrapper menu={menu} loading={loading} accounts={accounts} setMenu={setMenu} createAccount={createAccount} getMajorAccounts={getMajorAccounts}/>
      <InfoToast response={response}/>
      <AlertModal response={response} />
    </div>
  )
}

export default Accounts;