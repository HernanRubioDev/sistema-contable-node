import { createContext, useState } from "react";

const menuContext = createContext();

const MenuProvider = ({children})=>{
  const [menu, setMenu] = useState();
  const [active, setActive] = useState(window.location.pathname.slice(1))

  const data = {menu, active, setMenu, setActive}

  return(
    <menuContext.Provider value={data}>{children}</menuContext.Provider>
  )  
}

export {MenuProvider}
export default menuContext