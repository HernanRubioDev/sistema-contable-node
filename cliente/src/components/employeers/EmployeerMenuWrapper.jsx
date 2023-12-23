import AccrualsEmployeerForm from "./AccrualsEmployeerForm";
import NewEmployeerForm from "./NewEmployeerForm";
import SearchEmployeerForm from "./SearchEmployeerForm";
import SearchReciptsForm from "./SearchReciptsForm";

const EmployeerMenuWrapper = ({menu, loading, employees, addEmployee, getEmployee})=>{
  switch (menu) {
    case 'add':
      return <NewEmployeerForm addEmployee={addEmployee} loading={loading}/>
    
    case 'search':
      return <SearchEmployeerForm loading={loading} employees={employees} getEmployee={getEmployee}/> 

    case 'receipt':
      return <SearchReciptsForm />

    case 'accruals':
      return <AccrualsEmployeerForm />
  }
}

export default EmployeerMenuWrapper;