import React from "react";
import "./styles/Navbar.css";
import { Outlet, Link } from "react-router-dom";
import { useTheme } from "../ThemeContext"; // Access theme from context
import logo from "/nyancat.png"; // Add your logo path here

function Navbar() {
  const { theme } = useTheme();
  return (
    <div>
      <nav className="side-navbar">
        {/* Logo Section */}

        {/* Navigation Links */}
        <ul className="nav-links">
          <div className="logo-container">
            <img src={logo} alt="Logo" className="navbar-logo" />
          </div>
          <Link to={`/`}>Home</Link>
          <Link to={`/createPost`}>Create New Post</Link>
          <Link to={`/settings`}>Change Settings</Link>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

export default Navbar;
