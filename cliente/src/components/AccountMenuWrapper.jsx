import NewAccountForm from "./NewAccountForm";
import SearchAccountForm from "./SearchAccountForm";

const AccoutMenuWrapper = ({menu, setMenu, loading, accounts, errors, createAccount, getMajorAccounts})=>{
  switch (menu) {
    case 'add':
      return <NewAccountForm loading={loading} accounts={accounts} errors={errors} setMenu={setMenu} createAccount={createAccount} getMajorAccounts={getMajorAccounts}/>
    
    case 'search':
      return <SearchAccountForm setMenu={setMenu}/>
  }
}

export default AccoutMenuWrapper;