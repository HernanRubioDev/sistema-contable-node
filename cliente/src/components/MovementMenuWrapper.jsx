import NewMovementForm from "./NewMovementForm";
import SearchMovementForm from "./SearchMovementForm";

const MovementsMenuWrapper = ({setMenu, menu})=>{
  switch (menu) {
    case 'add':
      return <NewMovementForm menu={menu} setMenu={setMenu} />


    case 'search':
      return <SearchMovementForm menu={menu} setMenu={setMenu} />
  }
}

export default MovementsMenuWrapper;