import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import RegisterForm from "../components/register/RegisterForm";
import { useContext, useEffect } from "react";
import sessionContext from "../context/UserContext";
import useUser from "../hooks/useUser";
import AlertModal from "../components/AlertModal";

const Register = ()=>{
  const {loading, errors, response, registerUser} = useUser();
  const navigate = useNavigate();
  const {session} = useContext(sessionContext)
  useEffect(()=>{
    if(session) navigate("/dashboard")
  },[session])

  return(
    <div className="login d-flex flex-column overflow-hidden">
      <Header />
      <RegisterForm loading={loading} errors={errors} response={response} registerUser={registerUser}/>
      <AlertModal response={response}/>
    </div>
  );
}

export default Register