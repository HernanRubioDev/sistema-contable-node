import NewMovementForm from "./NewMovementForm";
import SearchMovementForm from "./SearchMovementForm";

const MovementsMenuWrapper = ({loading, menu, accounts, quantity, setMenu, getMinorAccounts, addMovements, searchMovementsByDates, getMovesQuantity})=>{
  switch (menu) {
    case 'add':
      return <NewMovementForm menu={menu} loading={loading} quantity={quantity} setMenu={setMenu} getMinorAccounts={getMinorAccounts} accounts={accounts} addMovements={addMovements} getMovesQuantity={getMovesQuantity}/>


    case 'search':
      return <SearchMovementForm menu={menu} setMenu={setMenu} searchMovementsByDates={searchMovementsByDates}/>
  }
}

export default MovementsMenuWrapper;