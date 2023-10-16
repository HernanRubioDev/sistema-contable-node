import { createContext, useState } from "react";

const menuContext = createContext();

const MenuProvider = ({children})=>{
  const [menu, setMenu] = useState();

  const data = {menu, setMenu}

  return(
    <menuContext.Provider value={data}>{children}</menuContext.Provider>
  )  
}

export {MenuProvider}
export default menuContext