import { useState } from "react";

const useUser = (initialForm)=>{
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const handleChange = (e)=>{
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }
  
  const handleLogin = (e)=>{
    e.preventDefault();
  }

  return {form, errors, setErrors, setForm, handleChange, handleLogin}
}
export default useUser;