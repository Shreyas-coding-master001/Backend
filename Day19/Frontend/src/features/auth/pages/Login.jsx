import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router';
import "../styles/login.scss";
import { useAuthContext } from '../hooks/userAuth';
import Loader from '../components/Loading';

const Login = () => {
    const navigate = useNavigate();
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const  {handleLogin, isloading} = useAuthContext();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await handleLogin(email, password)
        .then(res => {
            console.log(res);
            alert(res?.message || "Login Successful");
            navigate("/");
        });
    }

    if(isloading){
      return <Loader />
    }


  return (
    <div id='Login-User'>
      <h2>Login Here</h2>
      <form onSubmit={handleSubmit}>
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
        <button 
        type='submit'
        >Login
        </button>

        <p>If not Registered? <Link to={"/register"} className='Navigate-TO'>Register here</Link></p>
      </form >
    </div>
  )
}

export default Login
