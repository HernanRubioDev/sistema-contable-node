import { useState } from 'react';


import { NavLink } from "react-router-dom";
import Loader from '../Loader';

const RegisterForm = ({loading, errors, response, registerUser})=>{
  
  const initialForm ={
    name:'',
    surname:'',
    username:'',
    password:'',
    rePassword:'',
    id_company:'',
    role:'normal'
  }
  
  const [form, setForm] = useState(initialForm)
  const handleChange = (e)=>{
    setForm({
      ...form,
      [e.target.name]: e.target.value 
    })
  }

  return(
    <div className="h-100 d-flex justify-content-center align-items-center bg-body-secondary">
      <form className=" d-flex col-12 col-lg-8 shadow bg-white">
        <div className="d-none d-sm-flex flex-column justify-content-center col-6 bg-success px-4 py-5">
            <h5 className="fs-2 text-white text-center fw-bolder">¡Te estamos esperando!</h5>
            <img className='col-6 align-self-center' src='images/form-background.svg' />
            <div className='py-4'>
              <p className='text-white text-center '>¡Con ACCOUNTME puedes llevar todas tus finanzas de una manera facil y rapida!
              </p>
            </div>
        </div>

        <div className="d-flex flex-column justify-content-center col-12 col-sm-6 px-4 border">
          <div className='d-flex flex-grow-1 justify-content-center align-items-center'>
            <h5 className="w-100 text-center fs-2 fw-bold text-dark-emphasis">Registrate</h5>
          </div>
          <div className="d-flex flex-grow-1 flex-column justify-content-evenly">
            <div className="input-group mb-3">
              <span className="input-group-text" id="login-username"><img src="public/icons/user.svg" /></span>
              <input onChange={(e)=>handleChange(e)} type="text" className="form-control py-xxl-2" placeholder="Usuario" aria-label="Username" aria-describedby="login-username" name='username' value={form.username} />
                {errors.username && 
                <div className='w-100 lh-0 d-flex align-items-center'>
                  <img src='public/icons/danger.svg'/><p className='text-danger m-0 ms-1'>{errors.username}</p>
                </div>
                }
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="login-name"><img src="public/icons/user.svg" /></span>
              <input onChange={(e)=>handleChange(e)} type="text" className="form-control py-xxl-2" placeholder="Nombre" aria-label="Name" aria-describedby="login-name" name='name' value={form.name} autoFocus />
              {errors.name && 
              <div className='w-100 lh-0 d-flex align-items-center'>
                <img src='public/icons/danger.svg'/><p className='text-danger m-0 ms-1'>{errors.name}</p>
              </div>
              }
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="login-surname"><img src="public/icons/user.svg" /></span>
              <input onChange={(e)=>handleChange(e)} type="text" className="form-control py-xxl-2" placeholder="Apellido" aria-label="Surname" aria-describedby="login-surname" name='surname' value={form.surname} />
                {errors.surname && 
                <div className='w-100 lh-0 d-flex align-items-center'>
                  <img src='public/icons/danger.svg'/><p className='text-danger m-0 ms-1'>{errors.surname}</p>
                </div>
                }
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="login-password"><img src="public/icons/password.svg" /></span>
              <input onChange={(e)=>handleChange(e)} type="password" className="form-control py-xxl-2" placeholder="Contraseña" aria-label="Password" aria-describedby="login-password" name='password' value={form.password} />
                {errors.password && 
                <div className='w-100 lh-0 d-flex align-items-center'>
                  <img src='public/icons/danger.svg'/><p className='text-danger m-0 ms-1'>{errors.password}</p>
                </div>
                }
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="login-password"><img src="public/icons/password.svg" /></span>
              <input onChange={(e)=>handleChange(e)} type="password" className="form-control py-xxl-2" placeholder="Repita su contraseña" aria-label="Password" aria-describedby="login-password" name='rePassword' value={form.rePassword} />
                {errors.rePassword && 
                <div className='w-100 lh-0 d-flex align-items-center'>
                  <img src='public/icons/danger.svg'/><p className='text-danger m-0 ms-1'>{errors.rePassword}</p>
                </div>
                }
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="login-password"><img src="public/icons/id-company.svg" /></span>
              <input onChange={(e)=>handleChange(e)} type="password" className="form-control py-xxl-2" placeholder="Id de empresa" aria-label="Password" aria-describedby="login-password" name='id_company' value={form.id_company} min={0}/>
                {errors.id_company && 
                <div className='w-100 lh-0 d-flex align-items-center'>
                  <img src='public/icons/danger.svg'/><p className='text-danger m-0 ms-1'>{errors.id_company}</p>
                </div>
                }
            </div>
        </div>
            <div className='d-flex flex-column justify-content-center align-items-center flex-grow-1'>
            {loading ? <Loader className='text-center'/> : <button onClick={()=>registerUser(form)} type="button" className="btn btn-success w-100 py-2 py-xxl-3">Regisrarse</button>}
            <p className="text-light-emphasis align-self-start">¿Ya tienes cuenta? <NavLink to='/' className='text-decoration-none'>¡Ingresa!</NavLink></p>
            </div>
          </div>
      </form>
    </div>
  );
}

export default RegisterForm;