import React from 'react'
import { Link } from "react-router-dom";
import "./navbar.scss"
import logo from '../assets/logo.jpeg';
function Navbar() {
  return (
    <div>
         <header>
    <div className="container">
       <div className="navbar">
      <div >
        <Link ><img src={logo} alt="FitFlow Logo" className="logo" /></Link>
      </div>
      <div>
        {" "}
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/exercise">Exercise</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/admin">Admin</Link>
        <Link to="/adminadd">AdminAdd</Link>
      
      </div>
    </div>
    </div>
   </header>
    </div>
  )
}

export default Navbar
