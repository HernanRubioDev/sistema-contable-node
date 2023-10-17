import { useContext, useEffect, useState } from "react";
import sessionContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header"
import Menu from "../components/Menu";
import BookMenuWrapper from "../components/books/BookMenuWrapper";
import useAccount from "../hooks/useAccount";
import menuContext from "../context/menuContext";

const Books = ()=>{

    const navigate = useNavigate();
    const {session} = useContext(sessionContext)
    const {menu, setMenu} = useContext(menuContext)
    useEffect(()=>{
      if(!session) navigate("/")
    },[session])

    const {accounts, setAccounts, getMinorAccounts} = useAccount();

    return(
        <div className="vh-100 d-flex flex-wrap overflow-hidden">
            <Header />
            <Menu />
            <BookMenuWrapper menu={menu} accounts={accounts} setAccounts={setAccounts} setMenu={setMenu} getMinorAccounts={getMinorAccounts}/>
        </div>
    );
}

export default Books;