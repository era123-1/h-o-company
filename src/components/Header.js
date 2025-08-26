import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import '../styles/Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const [dropdowns, setDropdowns] = useState({
    home: false,
    projects: false,
  });

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
    setMenuOpen(false);
    setDropdowns({ home: false, projects: false });
  };

  const toggleDropdown = (dropdownName) => {
    if (window.innerWidth <= 1024) { 
      setDropdowns(prev => ({
        ...prev,
        [dropdownName]: !prev[dropdownName],
      }));
    }
  };

  return (
    <header className="header">
      {/* Logo */}
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>

      {/* Hamburger */}
      <div className={`hamburger ${menuOpen ? "active" : ""}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Navigation */}
      <ul className={`menu ${menuOpen ? "open" : ""}`}>
        {/* Home Dropdown */}
        <li className={`has-dropdown ${dropdowns.home ? "open" : ""}`}>
          <span
            className={activeLink === "Home" ? "active" : ""}
            onClick={() => toggleDropdown("home")}
          >
            Home <span className={`arrow ${dropdowns.home ? "down" : "up"}`}>^</span>
          </span>
          <ul className="dropdown">
            <li>
              <Link to="/" onClick={() => handleLinkClick("HomePage")}>Main Home</Link>
            </li>
             <li>
              <Link to="/features" onClick={() => handleLinkClick("Features")}>Features</Link>
            </li>
            <li>
              <Link to="/dashboard" onClick={() => handleLinkClick("Dashboard")}>Dashboard</Link>
            </li>
          </ul>
        </li>

        {/* Projects Dropdown */}
        <li className={`has-dropdown ${dropdowns.projects ? "open" : ""}`}>
          <span
            className={activeLink === "Projects" ? "active" : ""}
            onClick={() => toggleDropdown("projects")}
          >
            Projects <span className={`arrow ${dropdowns.projects ? "down" : "up"}`}>^</span>
          </span>
          <ul className="dropdown">
            <li>
              <Link to="/projects" onClick={() => handleLinkClick("ProjectsPage")}>Projects</Link>
            </li>
            <li>
              <Link to="/buildcostpro" onClick={() => handleLinkClick("BuildCostPro")}>BuildCostPro</Link>
            </li>
            <li>
              <Link to="/materials" onClick={() => handleLinkClick("Materials")}>Materials</Link>
            </li>
            <li>
              <Link to="/calendar" onClick={() => handleLinkClick("Calendar")}>Calendar</Link>
            </li>
          </ul>
        </li>

        {/* Other Links */}
        <li><Link to="/about" onClick={() => handleLinkClick("About")}>About</Link></li>
        <li><Link to="/jobs" onClick={() => handleLinkClick("Jobs")}>Jobs</Link></li>
        <li><Link to="/reviews" onClick={() => handleLinkClick("Reviews")}>Reviews</Link></li>
        <li><Link to="/contact" onClick={() => handleLinkClick("Contact")}>Contact</Link></li>
       
      </ul>
    </header>
  );
};

export default Header;