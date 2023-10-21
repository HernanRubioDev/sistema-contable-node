import { useContext, useEffect, useState } from "react";
import sessionContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header"
import Menu from "../components/Menu";
import BookMenuWrapper from "../components/books/BookMenuWrapper";
import useAccount from "../hooks/useAccount";
import menuContext from "../context/menuContext";
import useBook from "../hooks/useBook";
import AlertModal from "../components/AlertModal";

const Books = ()=>{

    const navigate = useNavigate();
    const {session} = useContext(sessionContext)
    const {menu, setMenu} = useContext(menuContext)
    useEffect(()=>{
      if(!session) navigate("/")
    },[session])

    const {accounts, setAccounts, getMinorAccountsForLedger} = useAccount();
    const {response, lines, getLedgerBook} = useBook();

    return(
        <div className="vh-100 d-flex flex-wrap overflow-hidden">
            <Header />
            <Menu />
            <BookMenuWrapper menu={menu} accounts={accounts} lines={lines} setAccounts={setAccounts} setMenu={setMenu} getMinorAccountsForLedger={getMinorAccountsForLedger} getLedgerBook={getLedgerBook}/>
            <AlertModal response={response} />
        </div>
    );
}

export default Books;