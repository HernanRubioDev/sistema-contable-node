import AccrualsEmployeerForm from "./AccrualsEmployeerForm";
import NewEmployeerForm from "./NewEmployeerForm";
import SearchEmployeerForm from "./SearchEmployeerForm";
import SearchReciptsForm from "./SearchReciptsForm";

const EmployeerMenuWrapper = ({menu, loading, employees, cities, addEmployee, getEmployee, getCities})=>{
  switch (menu) {
    case 'add':
      return <NewEmployeerForm addEmployee={addEmployee} loading={loading}/>
    
    case 'search':
      return <SearchEmployeerForm loading={loading} employees={employees} cities={cities} getEmployee={getEmployee} getCities={getCities}/> 

    case 'receipt':
      return <SearchReciptsForm />

    case 'accruals':
      return <AccrualsEmployeerForm />
  }
}

export default EmployeerMenuWrapper;