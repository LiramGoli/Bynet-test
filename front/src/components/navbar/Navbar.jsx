import React from "react";
import {useNavigate } from "react-router-dom";
import "./navbar.css";
const Navbar = () => {
  const navigate=useNavigate()

  return (
    <div className="navbar-container">
      <h3 onClick={()=>{navigate("/")}}>Home</h3>
      <h3 onClick={()=>{navigate("/employees")}}>All Employees</h3>
      <h3 onClick={()=>{navigate("/managers")}}>Managers</h3>
      <h3 onClick={()=>{navigate("/os-employees")}}>OS Employees</h3>
    </div>
  );
};

export default Navbar;
