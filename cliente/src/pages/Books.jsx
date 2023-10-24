import { useContext, useEffect, useState } from "react";
import sessionContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header"
import Menu from "../components/Menu";
import BookMenuWrapper from "../components/books/BookMenuWrapper";
import useAccount from "../hooks/useAccount";
import menuContext from "../context/menuContext";
import useBook from "../hooks/useBook";
import InfoToast from "../components/InfoToast";

const Books = ()=>{

    const navigate = useNavigate();
    const {session} = useContext(sessionContext)
    const {menu, setMenu} = useContext(menuContext)
    useEffect(()=>{
      if(!session) navigate("/")
    },[session])

    const {accounts, setAccounts, getMinorAccountsForLedger} = useAccount();
    const {loading, response, lines, setLines, getLedgerBook, getJournalBook} = useBook();

    return(
        <div className="vh-100 d-flex flex-wrap overflow-hidden">
            <Header />
            <Menu />
            <BookMenuWrapper menu={menu} loading={loading} accounts={accounts} lines={lines} setLines={setLines} setAccounts={setAccounts} setMenu={setMenu} getMinorAccountsForLedger={getMinorAccountsForLedger} getLedgerBook={getLedgerBook} getJournalBook={getJournalBook}/>
            <InfoToast response={response} />
        </div>
    );
}

export default Books;