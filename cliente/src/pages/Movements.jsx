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
import menuContext from "../context/menuContext";

const Movements = ()=>{
  const navigate = useNavigate();
  const {session} = useContext(sessionContext)
  const {menu, setMenu} = useContext(menuContext)
  
  useEffect(()=>{
    if(!session) navigate("/")
  },[session])
  
  const {getMinorAccounts, accounts} = useAccount();
  const {loading, lines, response, quantity, movements, addMovements, searchMovementsByDates, getMovesQuantity, getMoveLineById} = useMovement();
  return(
    <div className="vh-100 d-flex flex-wrap overflow-hidden">
      <Header />
      <Menu />
      <MovementsMenuWrapper menu={menu} accounts={accounts} loading={loading} quantity={quantity} setMenu={setMenu} movements={movements} getMinorAccounts={getMinorAccounts} addMovements={addMovements} searchMovementsByDates={searchMovementsByDates} getMovesQuantity={getMovesQuantity} getMoveLineById={getMoveLineById}/>
      <MovementDetailsModal lines={lines}/>
      <InfoToast response={response}/>
    </div>
  );
}

export default Movements;