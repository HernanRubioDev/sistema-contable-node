import { createContext, useState } from "react";

const sessionContext = createContext();

const SessionProvider = ({children}) =>{
  const intialSession = localStorage.getItem("auth_token") ? true : false;
  const [session, setSession] = useState(intialSession);
  
  const handleSession = (login)=>{
    setSession(login)
  }

  const data = {session, handleSession}
  return(
    <sessionContext.Provider value={data}>{children}</sessionContext.Provider>
  );
}

export {SessionProvider};
export default sessionContext;