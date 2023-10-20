import NewMovementForm from "./NewMovementForm";
import SearchMovementForm from "./SearchMovementForm";

const MovementsMenuWrapper = ({loading, menu, accounts, quantity, movements, setMenu, setActive={setActive}, getMinorAccounts, addMovements, searchMovementsByDates, getMovesQuantity, getMoveLineById})=>{
  switch (menu) {
    case 'add':
      return <NewMovementForm menu={menu} loading={loading} quantity={quantity} setMenu={setMenu} setActive={setActive} getMinorAccounts={getMinorAccounts} accounts={accounts} addMovements={addMovements} getMovesQuantity={getMovesQuantity}/>


    case 'search':
      return <SearchMovementForm menu={menu} movements={movements} setMenu={setMenu} searchMovementsByDates={searchMovementsByDates} getMoveLineById={getMoveLineById}/>
  }
}

export default MovementsMenuWrapper;