import { NavLink } from "react-router-dom";
import useUser from "../hooks/useUser";
import { useContext } from "react";
import sessionContext from "../context/UserContext";
import menuContext from "../context/menuContext";

const Header = ()=>{
  const {logOutUser} = useUser();
  const {setActive} = useContext(menuContext)
  const {session} = useContext(sessionContext)
  return(
  <nav className="navbar navbar-expand-lg bg-body-tertiary col-12">
    <div className="container-fluid">
      <NavLink onClick={()=>setActive("dashboard")} to='/' className="navbar-brand"><img src="/icons/brand.svg" /><span className="text-secondary ms-2">ACCOUNTME</span></NavLink>
      <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
        <div className="offcanvas-header">
          <NavLink onClick={()=>setActive("dashboard")} to='/' className="navbar-brand"><img src="/icons/brand.svg" /><span className="text-secondary ms-2">ACCOUNTME</span></NavLink>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body d-flex flex-column flex-lg-row">
          <ul className="navbar-nav justify-content-lg-start flex-grow-1 pe-3 text-center">
      
          </ul>
          <ul className=" navbar-nav justify-content-end flex-grow-1 pe-3 text-center">
            <li className="nav-item">
              {session ? <button onClick={()=>logOutUser()} type="button" className='nav-link fw-semibold text-secondary w-100'>Salir</button> : ''}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
  );
}

export default Header;
