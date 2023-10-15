import NewMovementForm from "./NewMovementForm";
import SearchMovementForm from "./SearchMovementForm";

const MovementsMenuWrapper = ({loading, menu, accounts, setMenu, getMinorAccounts, addMovements, searchMovements})=>{
  switch (menu) {
    case 'add':
      return <NewMovementForm menu={menu} loading={loading} setMenu={setMenu} getMinorAccounts={getMinorAccounts} accounts={accounts} addMovements={addMovements}/>


    case 'search':
      return <SearchMovementForm menu={menu} setMenu={setMenu} searchMovements={searchMovements}/>
  }
}

export default MovementsMenuWrapper;