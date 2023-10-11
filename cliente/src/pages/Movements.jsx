import { useNavigate } from "react-router-dom";
import Header from "../components/Header"
import Menu from "../components/Menu";
import { useContext, useEffect, useState } from "react";
import sessionContext from "../context/UserContext";
import useAccount from "../hooks/useAccount";
import useMovement from "../hooks/useMovement";
import InfoToast from "../components/InfoToast";
import MovementsMenuWrapper from "../components/movements/MovementMenuWrapper";
import MovementDetailsModal from "../components/movements/MovementDetailsModal";

const Movements = ()=>{
  const navigate = useNavigate();
  const {session} = useContext(sessionContext)
  useEffect(()=>{
    if(!session) navigate("/")
  },[session])

  
  const [menu, setMenu] = useState('search');
  const {getMinorAccounts, accounts} = useAccount();
  const {loading, errors, response, addMovements} = useMovement();
  return(
    <div className="vh-100 d-flex flex-wrap overflow-hidden">
      <Header />
      <Menu />
      <MovementsMenuWrapper menu={menu} accounts={accounts} loading={loading} setMenu={setMenu} getMinorAccounts={getMinorAccounts} addMovements={addMovements}/>
      <MovementDetailsModal />
      <InfoToast response={response}/>
    </div>
  );
}

export default Movements;