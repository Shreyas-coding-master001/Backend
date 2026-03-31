import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import "../styles/Register.scss";
import Loader from '../components/Loading.jsx';
import { useAuthContext } from "../hooks/userAuth.js";
import { register } from '../services/auth.api.js';

const Register = () => {
  const navigate = useNavigate();
  const [name, setname] = useState("");
  const [bio, setbio] = useState("")
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const { handleRegister,  isloading} = useAuthContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    handleRegister(name, email, password, bio)
    .then(res => {
      console.log(res);
      alert(res?.message || "Registration Successful");
      navigate("/");
    });
  } 

  if(isloading){
    return <Loader />
  }

  return (
    <div id='Register-User'>
      <h2>Register Yourself : </h2>
      <form onSubmit={handleSubmit}>
        <input 
        onChange={e => setname(e.target.value)}
        type="text" 
        value={name}
        placeholder='Enter your name' 
        />
        <input 
        onChange={e => setemail(e.target.value)}
        type="email" 
        value={email}
        placeholder='Enter your email' 
        />
        <input 
        onChange={e => setpassword(e.target.value)}
        type="password" 
        value={password}
        placeholder='Enter your password' 
        />
        <textarea 
        onChange={e => setbio(e.target.value)}
        name="bio" 
        id="Bios" 
        placeholder='Enter your bio'
        ></textarea>

        <button 
        type='submit'
        >Login
        </button>

        <p>If you are Registered? <Link to={"/login"} className='Navigate-TO'>Login here</Link></p>
      </form >
    </div>
  )
}

export default Register;
