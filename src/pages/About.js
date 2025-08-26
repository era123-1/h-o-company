import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/About.css";
import aboutlogo from "../assets/images/aboutlogo.png";
import aboutimage1 from "../assets/images/aboutimage1.png";
import aboutimage2 from "../assets/images/aboutimage2.png";
import aboutimage3 from "../assets/images/aboutimage3.png";
import aboutimage4 from "../assets/images/aboutimage4.png";
import aboutimage5 from "../assets/images/aboutimage5.png";
function About() {
  return (
    <div>
      {/* Header Section */}
      <Header />
      {/* About Section */}
      <section className="about-section">
        <div className="about-content">
          <div className="about-image">
            <img src={aboutlogo} alt="H&O Company" />
          </div>
          <div className="about-description">
            <h2>About H&O</h2>
            <p>
              H&O is a construction company with an extensive and excellent
              reputation, built on the values of excellence and integrity,
              tested over the years.
            </p>
            <p>
              Over the years, H&O has completed numerous projects in the field
              of civil and industrial construction, such as residential
              buildings, industrial and infrastructure construction, social and
              cultural centers, in collaboration with various prestigious
              companies in Albania.
            </p>
            <h3>How It Started!</h3>
            <p>
              Founded in 2002 as an individual business focused on the
              construction and reconstruction of residential buildings and the
              trade of building materials, H&O has rapidly grown into an
              ambitious company that offers quality work while being innovative,
              reliable, and committed to excellence.
            </p>
          </div>
        </div>
      </section>
      <section className="statistics-section">
        <div className="statistics-content">
          <div className="stat-item">
            <h2>128</h2>
            <p>Total Projects</p>
          </div>
          <div className="stat-item">
            <h2>95</h2>
            <p>Completed</p>
          </div>
          <div className="stat-item">
            <h2>33</h2>
            <p>In Progress</p>
          </div>
        </div>
      </section>
      {/* Safety and Health Section */}
      <section className="safety-health-section">
        <div className="safety-health-content">
          <div className="safety-health-image">
            <img src={aboutimage1} alt="Safety and Health" />
          </div>
          <div className="safety-health-description">
            <h2>Safety and Health</h2>
            <p>
              At H&O, we prioritize the safety and health of our employees,
              clients, and partners. Our commitment to safety is unwavering,
              ensuring that all projects meet the highest safety standards and
              practices. We believe that a safe environment is essential for
              productivity and success, and we continuously invest in training
              and equipment to protect our teams and our community.
            </p>
            <p>
              Through rigorous protocols and constant vigilance, we aim to
              maintain a workspace that fosters well-being and security. Every
              project adheres to strict health guidelines to safeguard everyone
              involved, making H&O a leader in responsible and ethical
              practices.
            </p>
          </div>
        </div>
        <div className="image-row">
          <img src={aboutimage2} alt="Safety precaution example 1" />
          <img src={aboutimage3} alt="Safety precaution example 2" />
          <img src={aboutimage4} alt="Safety precaution example 3" />
          <img src={aboutimage5} alt="Safety precaution example 4" />
        </div>
      </section>
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default About;
