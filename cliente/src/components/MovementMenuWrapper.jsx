import NewMovementForm from "./NewMovementForm";
import SearchMovementForm from "./SearchMovementForm";

const MovementsMenuWrapper = ({menu, accounts, setMenu, getMinorAccounts, addMovements, loading})=>{
  switch (menu) {
    case 'add':
      return <NewMovementForm menu={menu} loading={loading} setMenu={setMenu} getMinorAccounts={getMinorAccounts} accounts={accounts} addMovements={addMovements}/>


    case 'search':
      return <SearchMovementForm menu={menu} setMenu={setMenu} />
  }
}

export default MovementsMenuWrapper;