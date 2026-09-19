// components/Navbar.jsx
import React, { useState } from 'react';
import { 
  FaHome, 
  FaUsers, 
  FaBox, 
  FaBars, 
  FaTimes,
  FaCrown,
  FaRocket
} from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobile(!isMobile);
  };

  const closeMobileMenu = () => {
    setIsMobile(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <NavLink to="/" className="navbar-logo" onClick={closeMobileMenu}>
          <FaCrown className="logo-icon" />
          <span className="logo-text">API<span className="logo-highlight">Dash</span></span>
        </NavLink>

        {/* Mobile Menu Icon */}
        <div className="mobile-icon" onClick={toggleMobileMenu}>
          {isMobile ? <FaTimes /> : <FaBars />}
        </div>

        {/* Nav Links */}
        <ul className={isMobile ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <NavLink 
              to="/" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              <FaHome className="nav-icon" />
              <span>Home</span>
            </NavLink>
          </li>
          
          <li className="nav-item">
            <NavLink 
              to={'/user-api'} 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              <FaUsers className="nav-icon" />
              <span>Users</span>
            </NavLink>
          </li>
          
          <li className="nav-item">
            <NavLink 
              to={'/dummyjson'} 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              <FaBox className="nav-icon" />
              <span>Products</span>
            </NavLink>
          </li>
          

          <li className="nav-item">
            <NavLink
              to="/news"
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
              onClick={closeMobileMenu}
            >
              <FaRocket className="nav-icon" />
              <span>Space News</span>
            </NavLink>
          </li>
        </ul>

        {/* Right Side - Stats Badge */}
        <div className="navbar-stats">
          <div className="stats-badge">
            <span className="stats-dot"></span>
            Live API
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
