import OpenMenuButton from "../OpenMenuButton";
import useForm from '../../hooks/useForm';
import { useEffect } from "react";

const NewEmployeerForm = ({loading, employees, cities, categories, banks, addEmployee, getCities, getCategories, getBanks})=>{
  const today = new Date();
  const actualDate = today.toISOString().slice(0, 10);

  useEffect(()=>{
    getCities()
    getCategories()
    getBanks()
  },[])
  const initialForm ={
      name:'',
      surname:'',
      entry_date:actualDate,
      cuil:'',
      bank:'1',
      salary:'',
      birth:'',
      category:'1',
      city:'1',
      childrens:''
    }

  const {form, setForm, handleChange} = useForm(initialForm)

  return(
    <div className="h-100 d-flex flex-column flex-grow-1 bg-body-secondary px-3">
      <OpenMenuButton />
      <div className="d-flex flex-column justify-content-between align-items-center pt-2">
        <h5 className="text-secondary align-self-start">Registrar empleado</h5>
      </div>
      <div className="d-flex flex-column bg-white my-2 border shadow p-3">
        <form className="d-flex flex-wrap justify-content-evenly border">
          <div className="row row-cols-3 w-100 mt-3">
            <div className="col">
              <label htmlFor="name" className="fw-semibold text-secondary">Nombre</label>
              <input id="name" onChange={(e)=>handleChange(e)} type="text" className="form-control" name="name" value={form.name} autoComplete="off" autoFocus/>
            </div>
            <div className="col">
              <label htmlFor="surname" className="fw-semibold text-secondary">Apellido</label>
              <input id="surname" onChange={(e)=>handleChange(e)} type="text" className="form-control" name="surname" value={form.surname} autoComplete="off"/>
            </div>
            <div className="col">
              <label htmlFor="entry_date" className="fw-semibold text-secondary">F. Ingreso</label>
              <input id="entry_date" onChange={(e)=>handleChange(e)} type="date" className="form-control" name="entry_date" value={form.entry_date} max={actualDate} autoComplete="off"/>
            </div>
          </div>
          <div className="row row-cols-3 w-100 mt-3">
            <div className="col">
              <label htmlFor="cuil" className="fw-semibold text-secondary">Cuil</label>
              <input id="cuil" onChange={(e)=>handleChange(e)} type="text" className="form-control" name="cuil" value={form.cuil} autoComplete="off"/>
            </div>
            <div className="col">
              <label htmlFor="bank" className="fw-semibold text-secondary">Banco</label>
              <select id="bank" onChange={(e)=>handleChange(e)} className="form-select" aria-label="Default select example" name="bank" value={form.bank}>
                {banks.map(bank => <option key={bank.id_bank} value={bank.id_bank}>{bank.bank}</option>)}
              </select>
            </div>
            <div className="col">
              <label htmlFor="salary" className="fw-semibold text-secondary">Salario</label>
              <input id="salary" onChange={(e)=>handleChange(e)} type="number" className="form-control" name="salary" value={form.salary} autoComplete="off"/>
            </div>
            <div className="row row-cols-3 w-100 mt-3 m-0">
              <div className="col ps-0">
                <label htmlFor="birth" className="fw-semibold text-secondary">F. Nacimiento</label>
                <input id="birth" onChange={(e)=>handleChange(e)} type="date" className="form-control" name="birth" value={form.birth} max={actualDate}/>
              </div>
              <div className="col">
                <label htmlFor="category" className="fw-semibold text-secondary">Categoria</label>
                <select id="category" onChange={(e)=>handleChange(e)} className="form-select" aria-label="Default select example" name="category" value={form.category}>
                  {categories.map(category => <option key={category.id_category} value={category.id_category}>{category.category}</option>)}
                </select>
              </div>
              <div className="col pe-0">
                <label htmlFor="city" className="fw-semibold text-secondary">Localidad</label>
                <select id="city" onChange={(e)=>handleChange(e)} className="form-select" aria-label="Default select example" value={form.city} name="city">
                  {cities.map((city, index) => <option key={index} value={city.id_city}>{city.city}</option>)}
                </select>
              </div>
            </div>
            </div>
          <div className="row row-cols-3 w-100 mt-3 mb-3">
            <div className="col pe-2">
              <label htmlFor="number" className="fw-semibold text-secondary">Hijos</label>
              <input id="number" onChange={(e)=>handleChange(e)} type="number" className="form-control" name="childrens" value={form.childrens} autoComplete="off"/>
            </div>
          </div>
        </form>
        <div className="d-flex justify-content-evenly w-100 py-2 mt-3">
          <button onClick={()=>addEmployee(form)} type="submit" className="btn btn-sm btn-success col-5 col-lg-3 fw-semibold d-flex justify-content-center align-items-center"><img className="me-2" src="icons/disk.svg"/> Agregar</button>
          <button onClick={()=>setForm(initialForm)} className="btn btn-sm btn-danger col-5 col-lg-3 fw-semibold d-flex justify-content-center align-items-center"><img className="me-2" src="icons/erase.svg"/>Limpiar</button>
        </div>
      </div>
    </div>
  )
}

export default NewEmployeerForm;