import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import LoginForm from '../components/login/LoginForm';

import { useContext, useEffect } from 'react';
import sessionContext from '../context/UserContext';
import useUser from '../hooks/useUser';
import AlertModal from '../components/AlertModal';

const Login = ()=>{
  const navigate = useNavigate();
  const {session} = useContext(sessionContext)
  useEffect(()=>{
    if(session) navigate("/dashboard")
  },[session])

  const {loading, response, errors, loginUser} = useUser();
  return(
    <div className="login d-flex flex-column overflow-hidden">
      <Header session={session}/>
      <LoginForm loading={loading} response={response} errors={errors} loginUser={loginUser}/>
      <AlertModal response={response}/>
    </div>
  );
}

export default Login;