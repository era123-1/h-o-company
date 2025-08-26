import React from "react";
import logo from "../assets/images/logo.png";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Logo */}
        <div className="footer-column">
          <h1>H&O Company</h1>
          <div className="logo">
            <img src={logo} alt="Logo" />
          </div>
        </div>

        {/* Navigation Links */}
        <div className="footer-column">
          <h3>H&O</h3>
          <nav className="footer-nav">
            <ul>
              <li>
                <a href="/">
                  <i className="fas fa-home"></i> HOME
                </a>
              </li>
              <li>
                <a href="/projects">
                  <i className="fas fa-info-circle"></i> Projects
                </a>
              </li>
              <li>
                <a href="/jobs">
                  <i className="fas fa-briefcase"></i> Jobs
                </a>
              </li>
              <li>
                <a href="/about">
                  <i className="fas fa-question-circle"></i> About
                </a>
              </li>
              <li>
                <a href="/contact">
                  <i className="fas fa-envelope"></i> Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/*  Contact Info */}
        <div className="footer-column">
          <div id="details">
            <h4>Contacts</h4>
            <p>
              <i className="fas fa-map-marker-alt"></i>
              Kajo Karafili Street, BimBashi Building, Floor 4, Tirana, Albania
            </p>
            <p>
              <i className="fas fa-phone"></i>
              +355 69 20 73 347
            </p>
            <p>
              <i className="fas fa-envelope"></i>
              erahidaj@gmail.com
            </p>
          </div>
        </div>

        {/* Location Map */}
        <div className="footer-column">
          <h4>LOCATION</h4>
          <p>Floor 4, Tirana, Albania</p>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=..."
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Location Map"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="footer-bottom">
        <p>All Rights Reserved by "H&O"</p>
      </div>
    </footer>
  );
};

export default Footer;