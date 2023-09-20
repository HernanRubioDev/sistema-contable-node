import NewAccountForm from "./NewAccountForm";
import SearchAccountForm from "./SearchAccountForm";

const AccoutMenuWrapper = ({menu, setMenu, loading, createAccount})=>{
  switch (menu) {
    case 'add':
      return <NewAccountForm setMenu={setMenu} loading={loading} createAccount={createAccount}/>
    
    case 'search':
      return <SearchAccountForm setMenu={setMenu}/>
  }
}

export default AccoutMenuWrapper;