import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router";
import Login from './features/auth/pages/login';
import Register from './features/auth/pages/Register';

const AppRoutes = () => {
  return (
    <BrowserRouter> 
        <Routes>
            <Route path="/" element = { <h1>Home Page</h1> }/>
            <Route path = "/register" element = { <Register /> }/>
            <Route path = "/login" element = { <Login />}/>
        </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes;

