import { NavLink } from "react-router-dom";
import "../stylesheets/Dashboard.css";
import { useContext, useEffect, useState } from "react";
import menuContext from "../context/menuContext";

const Menu =()=>{
  const initialOffcanvas = window.innerWidth <= 768 ? true : false
  const [offcanvas, setOffcanvas] = useState(initialOffcanvas)
  const {active, setMenu, setActive} = useContext(menuContext)

  useEffect(() => {

    window.addEventListener("resize", () => {
      if (window.innerWidth <= 992) {
        setOffcanvas(true);
      } if(window.innerWidth > 993){
        setOffcanvas(false);
      }
    });
  }, []);
  return(
    <nav className={`primary h-100 ${offcanvas ? "offcanvas offcanvas-start" : ""}`} id="offcanvas-menu" aria-labelledby="offcanvas-menu">
      <ul className="d-flex flex-column list-unstyled bg-dashboard h-100 m-0 position-relative">
        <button className="bg-transparent align-self-end border-0 end-0 me-2 mt-2 position-absolute d-lg-none" data-bs-dismiss="offcanvas"><img src="icons/close-button.svg" /></button>
        
         <li className={`d-flex justify-content-center mt-5 mt-lg-3 option-hover py-1 ps-5 ${active==="dashboard" ? 'active-page' : ''}`}>
          <NavLink onClick={()=>setActive("dashboard")} to="/dashboard" className="w-100 d-flex text-decoration-none">
              <img className="me-4 " src="icons/dashboard.svg"/>
              <span className="text-white fs-4 lh-0">Dashboard</span>
          </NavLink>
         </li>

         <li className={`d-flex justify-content-center mt-4 option-hover py-1 ps-5 ${active==="accounts" ? 'active-page' : ''}`}>
          <NavLink onClick={()=>{setMenu("search"), setActive("accounts")}} to={"/accounts"} className="w-100 d-flex text-decoration-none">
              <img className="me-4 " src="icons/book.svg"/>
              <span className="text-white fs-4 lh-0">Cuentas</span>
          </NavLink>
         </li>

         <li className={`d-flex justify-content-center mt-4 option-hover py-1 ps-5 ${active==="moves" ? 'active-page' : ''}`}>
          <NavLink onClick={()=>{setMenu("search"), setActive("moves")}} to={"/movements"} className="w-100 d-flex text-decoration-none">
              <img className="me-4" src="icons/transaction.svg"/>
              <span className="text-white fs-4 lh-0">Asientos</span>
          </NavLink>
         </li>

         <li className={`d-flex justify-content-center mt-4 option-hover py-1 ps-5 ${active==="books" ? 'active-page' : ''}`}>
          <NavLink onClick={()=>{setMenu("ledger"), setActive("books")}} to={"/books"} className="w-100 d-flex text-decoration-none">
              <img className="me-4" src="icons/abacus.svg"/>
              <span className="text-white fs-4 lh-0">Libros</span>
          </NavLink>
         </li>
      </ul>
    </nav>
  );
}

export default Menu