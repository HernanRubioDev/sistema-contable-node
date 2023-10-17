import { useNavigate } from "react-router-dom";
import Header from "../components/Header"
import Menu from "../components/Menu";
import sessionContext from "../context/UserContext";
import { useContext, useEffect, useState } from "react";
import AccoutMenuWrapper from "../components/accounts/AccountMenuWrapper";
import InfoToast from "../components/InfoToast";
import useAccount from "../hooks/useAccount";
import AlertModal from "../components/AlertModal";
import EditAccountModal from "../components/accounts/EditAccountModal";
import ConfirmModal from "../components/ConfirmModal";
import menuContext from "../context/menuContext";

const Accounts = ()=>{
  const navigate = useNavigate();
  const {session} = useContext(sessionContext)
  const {menu, setMenu} = useContext(menuContext)
  useEffect(()=>{
    if(!session) navigate("/")
  },[session])
  
  const [accountToEdit, setAccountToEdit] = useState(null);
  const [accountToDelete, setAccountToDelete] = useState(null);

  const {loading, errors, response, accounts, setAccounts, createAccount, getMajorAccounts, getAccountByName, editAccount, deleteAccount} = useAccount();
  return(
    <div className="vh-100 d-flex flex-wrap overflow-hidden">
      <Header />
      <Menu />
      <AccoutMenuWrapper menu={menu} loading={loading} accounts={accounts} errors={errors} setAccounts={setAccounts} setMenu={setMenu} createAccount={createAccount} getMajorAccounts={getMajorAccounts} getAccountByName={getAccountByName} setAccountToEdit={setAccountToEdit} setAccountToDelete={setAccountToDelete}/>
      <InfoToast response={response}/>
      <AlertModal response={response} />
      <EditAccountModal accountToEdit={accountToEdit} setAccountToEdit={setAccountToEdit} editAccount={editAccount}/>
      <ConfirmModal accountToDelete={accountToDelete} deleteAccount={deleteAccount}/>
    </div>
  )
}

export default Accounts;