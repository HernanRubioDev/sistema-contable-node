import { NavLink } from "react-router-dom";
import "../stylesheets/Dashboard.css";
import { useEffect, useState } from "react";

const Menu =()=>{
  const initialOffcanvas = window.innerWidth <= 768 ? true : false
  const [offcanvas, setOffcanvas] = useState(initialOffcanvas)
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
      <ul className="d-flex flex-column list-unstyled bg-dashboard h-100 m-0">
        <button className="bg-transparent border-0 position-absolute end-0 me-2 mt-2 d-md-none" data-bs-dismiss="offcanvas"><img src="icons/close-button.svg" /></button>
        
         <li className="d-flex justify-content-center mt-4 option-hover py-1 ps-5">
          <NavLink to="/dashboard" className="w-100 d-flex text-decoration-none">
              <img className="me-4 " src="icons/dashboard.svg"/>
              <span className="text-white fs-4 lh-0">Dashboard</span>
          </NavLink>
         </li>

         <li className="d-flex justify-content-center mt-4 option-hover py-1 ps-5">
          <NavLink to={"/accounts"} className="w-100 d-flex text-decoration-none">
              <img className="me-4 " src="icons/book.svg"/>
              <span className="text-white fs-4 lh-0">Cuentas</span>
          </NavLink>
         </li>

         <li className="d-flex justify-content-center mt-4 option-hover py-1 ps-5">
          <NavLink to={"/movements"} className="w-100 d-flex text-decoration-none">
              <img className="me-4 " src="icons/transaction.svg"/>
              <span className="text-white fs-4 lh-0">Asientos</span>
          </NavLink>
         </li>
      </ul>
    </nav>
  );
}

export default Menu