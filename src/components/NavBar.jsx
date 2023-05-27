import React, { useState, useEffect } from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";

const NavBar = () => {
  

  return (
    <nav className="navbar">
      <h2>
        <Link to={"/"}>Cardápio</Link>
      </h2>
      <ul>
        
        <li>
          <Link to={"/new"} className="new-btn">
            Nova comida
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
