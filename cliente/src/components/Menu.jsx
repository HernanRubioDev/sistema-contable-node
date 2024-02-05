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
    <nav className={`menu h-100 ${offcanvas ? "offcanvas offcanvas-start" : ""}`} id="offcanvas-menu" aria-labelledby="offcanvas-menu">
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
         <li className="accordion-item d-flex flex-column justify-content-center mt-4">
            <div className={`accordion-header d-flex justify-content-center align-items-center option-hover ps-5 py-1 ${active==="employees" ? 'active-page' : ''}`}>
               <img className="me-1" src="icons/employees.svg"/>
              <button className="accordion-button collapsed text-white fs-4 lh-0 ms-3" type="button" data-bs-toggle="collapse" data-bs-target="#employeesColapse" aria-expanded="false" aria-controls="collapseTwo">
                Empleados
               <img className="ms-3" src="icons/down-arrow.svg"/>
              </button>
            </div>
            <div id="employeesColapse" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
              <NavLink  onClick={()=>{setMenu("add"), setActive("employees")}} to={"/employees"} className="w-100 d-flex text-decoration-none d-flex option-hover ps-5 py-1"><span className="text-white ms-5 ps-3">Agregar</span></NavLink>
              <NavLink  onClick={()=>{setMenu("search"), setActive("employees")}} to={"/employees"} className="w-100 d-flex text-decoration-none d-flex option-hover ps-5 py-1"><span className="text-white ms-5 ps-3">Buscar</span></NavLink>
              <NavLink  onClick={()=>{setMenu("receipt"), setActive("employees")}} to={"/employees"} className="w-100 d-flex text-decoration-none d-flex option-hover ps-5 py-1"><span className="text-white ms-5 ps-3">Recibos</span></NavLink>
            </div>
         </li>
      </ul>
    </nav>
  );
}

export default Menu