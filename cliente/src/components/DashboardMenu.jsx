import OpenMenuButton from "./OpenMenuButton";


const DashboardMenu = ()=>{
  return(
    <div className="d-flex flex-column flex-grow-1 bg-body-secondary h-100">
      <div className="d-flex flex-column h-100 justify-content-center align-self-center">
        <h1 className="text-secondary w-100 text-center">En construcción</h1>
        <img src="icons/construction.svg" />
      </div>
      <OpenMenuButton />
    </div>
  );
}

export default DashboardMenu;