import AccrualsEmployeerForm from "./AccrualsEmployeerForm";
import NewEmployeerForm from "./NewEmployeerForm";
import SearchEmployeerForm from "./SearchEmployeerForm";
import SearchReciptsForm from "./SearchReciptsForm";

const EmployeerMenuWrapper = ({menu, loading, employees, cities, categories, banks, addEmployee, getEmployee, getCities, getCategories, getBanks, setEmployeeToPay})=>{
  switch (menu) {
    case 'add':
      return <NewEmployeerForm loading={loading} cities={cities} categories={categories} banks={banks} addEmployee={addEmployee} getCities={getCities} getCategories={getCategories} getBanks={getBanks}/>
    
    case 'search':
      return <SearchEmployeerForm loading={loading} employees={employees} cities={cities} getEmployee={getEmployee} getCities={getCities} setEmployeeToPay={setEmployeeToPay}/> 

    case 'receipt':
      return <SearchReciptsForm />

    case 'accruals':
      return <AccrualsEmployeerForm />
  }
}

export default EmployeerMenuWrapper;