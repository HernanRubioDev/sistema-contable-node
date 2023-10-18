import { useNavigate } from "react-router-dom";
import OpenMenuButton from "../OpenMenuButton";


const DashboardMenu = ({active, setMenu, setActive})=>{
  const navigate = useNavigate();
  return(
    <div className="d-flex flex-column flex-grow-1 bg-body-secondary h-100">
      <OpenMenuButton />
      <div className="d-flex flex-column flex-grow-1 border justify-content-star">
        <div className="d-flex flex-wrap justify-content-center pt-4">
          <button onClick={()=>{navigate("/accounts"), setMenu("add"), setActive("accounts")}} className="dashboard-btn d-flex flex-grow-1 flex-column bg-white justify-content-evenly align-items-center border-0 m-2 p-2 shadow rounded">
            <h3 className="text-secondary ">Crear Cuentas</h3>
            <img src="icons/dashboard-book-write.svg" />
          </button>

          <button onClick={()=>{navigate("/accounts"), setMenu("search"), setActive("accounts")}} className="dashboard-btn d-flex flex-grow-1 flex-column bg-white justify-content-evenly align-items-center border-0 m-2 p-2 shadow rounded">
            <h3 className="text-secondary ">Buscar Cuentas</h3>
            <img src="icons/dashboard-book-read.svg" />
          </button>

          <button onClick={()=>{navigate("/movements"), setMenu("add"), setActive("moves")}} className="dashboard-btn d-flex flex-grow-1 flex-column bg-white justify-content-evenly align-items-center border-0 m-2 p-2 shadow rounded">
            <h3 className="text-secondary ">Crear Movimientos</h3>
            <img src="icons/dashboard-move-write.svg" />
          </button>

          <button onClick={()=>{navigate("/movements"), setMenu("search"), setActive("moves")}} className="dashboard-btn d-flex flex-grow-1 flex-column bg-white justify-content-evenly align-items-center border-0 m-2 p-2 shadow rounded">
            <h3 className="text-secondary ">Ver Movimientos</h3>
            <img src="icons/dashboard-move-read.svg" />
          </button>

          <button onClick={()=>{navigate("/books"), setMenu("ledger"), setActive("books")}} className="dashboard-btn d-flex flex-grow-1 flex-column bg-white justify-content-evenly align-items-center border-0 m-2 p-2 shadow rounded">
            <h3 className="text-secondary ">Libro Mayor</h3>
            <img src="icons/dashboard-journal-book.svg" />
          </button>

          <button onClick={()=>{navigate("/books"), setMenu("journal"), setActive("books")}} className="dashboard-btn d-flex flex-grow-1 flex-column bg-white justify-content-evenly align-items-center border-0 m-2 p-2 shadow rounded">
            <h3 className="text-secondary ">Libro Diario</h3>
            <img src="icons/dashboard-ledger-book.svg" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default DashboardMenu;