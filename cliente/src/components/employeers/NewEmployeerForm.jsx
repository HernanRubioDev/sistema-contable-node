import OpenMenuButton from "../OpenMenuButton";
import useForm from '../../hooks/useForm';
import { useEffect } from "react";

const NewEmployeerForm = ({loading, employees, cities, categories, addEmployee, getCities, getCategories})=>{
  useEffect(()=>{
    getCities()
    getCategories()
  },[])
  const initialForm ={
      name:'',
      surname:'',
      entry_date:'',
      cuil:'',
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
      <div className="d-flex flex-column justify-content-between align-items-center pt-4">
        <h5 className="text-secondary align-self-start">Registrar empleado</h5>
      </div>
      <div className="d-flex flex-column bg-white my-2 border shadow p-3">
        <form className="d-flex flex-wrap justify-content-evenly border">
          <div className="row row-cols-3 w-100 mt-3">
            <div className="col">
              <lable className="fw-medium text-secondary">Nombre</lable>
              <input onChange={(e)=>handleChange(e)} type="text" className="form-control" name="name" value={form.name} autoComplete="off" autoFocus/>
            </div>
            <div className="col">
              <lable className="fw-medium text-secondary">Apellido</lable>
              <input onChange={(e)=>handleChange(e)} type="text" className="form-control" name="surname" value={form.surname} autoComplete="off"/>
            </div>
            <div className="col">
              <lable className="fw-medium text-secondary">F. Ingreso</lable>
              <input onChange={(e)=>handleChange(e)} type="date" className="form-control" name="entry_date" value={form.entry_date} autoComplete="off"/>
            </div>
          </div>
          <div className="row row-cols-3 w-100 mt-3">
            <div className="col">
              <lable className="fw-medium text-secondary">Cuil</lable>
              <input onChange={(e)=>handleChange(e)} type="text" className="form-control" name="cuil" value={form.cuil} autoComplete="off"/>
            </div>
            <div className="col">
              <lable className="fw-medium text-secondary">Salario</lable>
              <input onChange={(e)=>handleChange(e)} type="number" className="form-control" name="salary" value={form.salary} autoComplete="off"/>
            </div>
            <div className="col">
              <lable className="fw-medium text-secondary">F. Nacimiento</lable>
              <input onChange={(e)=>handleChange(e)} type="date" className="form-control" name="birth" value={form.birth}/>
            </div>
          </div>
          <div className="row row-cols-3 w-100 mt-3 mb-3">
            <div className="col">
              <lable className="fw-medium text-secondary">Categoria</lable>
              <select onChange={(e)=>handleChange(e)} className="form-select" aria-label="Default select example" name="category" value={form.category}>
                {categories.map(category => <option key={category.id_category} value={category.id_category}>{category.category}</option>)}
              </select>
            </div>
            <div className="col">
              <lable className="fw-medium text-secondary">Localidad</lable>
              <select onChange={(e)=>handleChange(e)} className="form-select" aria-label="Default select example" value={form.city} name="city">
                {cities.map((city, index) => <option key={index} value={city.id_city}>{city.city}</option>)}
              </select>
            </div>
            <div className="col">
              <lable className="fw-medium text-secondary">Hijos</lable>
              <input onChange={(e)=>handleChange(e)} type="number" className="form-control" name="childrens" value={form.childrens} autoComplete="off"/>
            </div>
          </div>
        </form>
        <div className="d-flex justify-content-evenly border w-100 py-2 mt-3">
          <button onClick={()=>addEmployee(form)} type="submit" className="btn btn-sm btn-success col-5 col-lg-3 fw-semibold d-flex justify-content-center align-items-center"><img className="me-2" src="icons/disk.svg"/> Agregar</button>
          <button onClick={()=>setForm(initialForm)} className="btn btn-sm btn-danger col-5 col-lg-3 fw-semibold d-flex justify-content-center align-items-center"><img className="me-2" src="icons/erase.svg"/>Limpiar</button>
        </div>
      </div>
    </div>
  )
}

export default NewEmployeerForm;