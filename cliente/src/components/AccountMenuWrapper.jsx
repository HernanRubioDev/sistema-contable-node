import NewAccountForm from "./NewAccountForm";
import SearchAccountForm from "./SearchAccountForm";

const AccoutMenuWrapper = ({menu, setMenu, loading, accounts, createAccount, getMajorAccounts})=>{
  switch (menu) {
    case 'add':
      return <NewAccountForm setMenu={setMenu} loading={loading} accounts={accounts} createAccount={createAccount} getMajorAccounts={getMajorAccounts}/>
    
    case 'search':
      return <SearchAccountForm setMenu={setMenu}/>
  }
}

export default AccoutMenuWrapper;