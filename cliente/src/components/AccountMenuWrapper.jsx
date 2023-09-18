import NewAccountForm from "./NewAccountForm";
import SearchAccountForm from "./SearchAccountForm";

const AccoutMenuWrapper = ({menu, setMenu})=>{
  switch (menu) {
    case 'add':
      return <NewAccountForm setMenu={setMenu}/>
    
    case 'search':
      return <SearchAccountForm setMenu={setMenu}/>
  }
}

export default AccoutMenuWrapper;