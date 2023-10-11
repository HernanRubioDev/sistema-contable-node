

import { NavLink } from "react-router-dom";
import useForm from '../../hooks/useForm';
import Loader from '../Loader';

const LoginForm = ({loading, errors, loginUser})=>{
  
  const initialForm ={
    username:'',
    password:''
  }

  const {form, handleChange, handleLogin} = useForm(initialForm)

  return(
    <div className="h-100 d-flex justify-content-center align-items-center bg-body-secondary">
      <form onSubmit={(e)=>handleLogin(e)} className="d-flex col-12 col-lg-8 shadow bg-white">
        <div className="d-none d-sm-flex flex-column justify-content-center col-6 bg-success px-4 py-5">
            <h5 className="fs-2 text-white text-center fw-bolder">¡Bienvenido!</h5>
             <img className='col-6 align-self-center' src='images/form-background.svg' />
            <div className='py-4'>
              <p className='text-white text-center '>¡Con ACCOUNTME puedes llevar todas tus finanzas de una manera facil y rapida!</p>
            </div>
        </div>

        <div className="d-flex flex-column justify-content-center col-12 col-sm-6 px-4">
          <h5 className="w-100 text-center fs-2 fw-bold text-dark-emphasis">Ingresar</h5>
          <div className="d-flex flex-column justify-content-centers py-4">
            <div className="input-group mb-3">
              <span className="input-group-text" id="login-username"><img src="/icons/user.svg" /></span>
              <input onChange={(e)=>handleChange(e)} type="text" className="form-control py-xxl-2" placeholder="Usuario" aria-label="Username" aria-describedby="login-username" name='username' value={form.username} autoFocus/>
              {errors.username ?
              <div className='w-100 lh-0 d-flex align-items-center'>
                <img src='/icons/danger.svg'/><p className='text-danger m-0 ms-1'>Este campo es obligatorio</p>
              </div> : ''
              }
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text" id="login-password"><img src="/icons/password.svg" /></span>
              <input onChange={(e)=>handleChange(e)} type="password" className="form-control py-xxl-2" placeholder="Contraseña" aria-label="Password" aria-describedby="login-password" name='password' value={form.password}/>
              {errors.password ? 
              <div className='w-100 lh-0 d-flex align-items-center'>
                <img src='/icons/danger.svg'/><p className='text-danger m-0 ms-1'>Este campo es obligatorio</p>
              </div> : ''
              }
              {
                errors.message && 
                <div className='w-100 lh-0 d-flex align-items-center'>
                  <img src='/icons/danger.svg'/><p className='text-danger m-0 ms-1'>{errors.message}</p>
                </div>
              }
            </div>
            {loading ?
            <div className='d-flex justify-content-center'> 
              <Loader className="align-self-center" /> 
            </div>
            :
            <button onClick={()=>loginUser(form)} type="button" className="btn btn-success w-100 py-2">Ingresar</button>
            }
            <p className="text-light-emphasis">¿Aún no tienes cuenta? <NavLink to='/register' className='text-decoration-none'>¡Regístrate!</NavLink></p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;