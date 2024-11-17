import React from 'react';
import './styles/Navbar.css';
import { Outlet, Link } from "react-router-dom";
import { useTheme } from '../ThemeContext'; // Access theme from context

function Navbar() {
  const { theme } = useTheme(); 
  return (
    <div>
      <nav className="side-navbar">
        <ul className="nav-links">
          <Link to={`/`}> Home </Link>
          <Link to={`/createPost`}> Create new post </Link>
          <Link to={`/`}> See all posts </Link> 
          <Link to={`/settings`}> Change Settings </Link> 
          {/* <Link to={`/contact`}> Contact </Link> */}
        </ul>
      </nav>
      <Outlet />
    </div>

  );
};

export default Navbar;