import { useContext, useEffect, useState } from "react";
import sessionContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header"
import Menu from "../components/Menu";
import BookMenuWrapper from "../components/BookMenuWrapper";

const Books = ()=>{

    const navigate = useNavigate();
    const {session} = useContext(sessionContext)
    useEffect(()=>{
      if(!session) navigate("/")
    },[session])

    const [menu, setMenu] = useState("ledger");

    return(
        <div className="vh-100 d-flex flex-wrap overflow-hidden">
            <Header />
            <Menu />
            <BookMenuWrapper menu={menu} setMenu={setMenu}/>
        </div>
    );
}

export default Books;