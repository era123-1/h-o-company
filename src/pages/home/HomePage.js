import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "../../styles/HomePage.css";
import backgroundImage from "../../assets/images/image0.jpg";
import image1a from "../../assets/images/image1a.png";
import image1b from "../../assets/images/image1b.png";
import image1c from "../../assets/images/image1c.png";
import image2a from "../../assets/images/image2a.png";
import image2b from "../../assets/images/image2b.png";
import image2c from "../../assets/images/image2c.png";
import image3a from "../../assets/images/image3a.png";
import image3b from "../../assets/images/image3b.png";
import image3c from "../../assets/images/image3c.png";
import Flag1 from "../../assets/images/flag1.png";
import Flag2 from "../../assets/images/flag2.png";
import PartnersCarousel from "./PartnersCarousel";

const HomePage = () => {
  const [activeGroup, setActiveGroup] = useState(1);
  const [language, setLanguage] = useState("en");
  const [translatedText, setTranslatedText] = useState("");
  const showImages = (group) => {
    setActiveGroup(group);
    const imageGroups = document.querySelectorAll(".image-group");

    imageGroups.forEach((imgGroup, index) => {
      if (index + 1 === group) {
        imgGroup.classList.add("active");
        imgGroup.classList.remove("hidden");
      } else {
        imgGroup.classList.remove("active");
        imgGroup.classList.add("hidden");
      }
    });
  };
  const fetchTranslation = async (text, targetLang) => {
    const API_KEY = "GOOGLE_API_KEY";
    const GOOGLE_TRANSLATE_URL =
      "https://translation.googleapis.com/language/translate/v2";

    try {
      const response = await fetch(`${GOOGLE_TRANSLATE_URL}?key=${API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          q: text,
          target: targetLang,
          source: "en",
        }),
      });

      const data = await response.json();
      setTranslatedText(data.data.translations[0].translatedText);
    } catch (error) {
      console.error("Error during translation:", error);
    }
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
    const textToTranslate =
      lang === "sq" ? "Mirësevini në faqen tonë!" : "Welcome to our website!";
    fetchTranslation(textToTranslate, lang);
  };
  return (
    <div>
      {/* Header  */}
      <Header />
      {/* Flag  */}
      <section
        className="language-flag"
        style={{
          position: "sticky",
          bottom: 0,
          display: "flex",
          justifyContent: "flex-end",
          padding: "10px",
          width: "100%",
          backgroundColor: "#f0f2f5",
        }}
      >
        {/* Albanian Flag */}
        <img
          src={Flag1}
          alt="Albanian flag"
          onClick={() => changeLanguage("sq")}
          style={{
            cursor: "pointer",
            opacity: language === "sq" ? 1 : 0.6,
            margin: "0 10px",
            width: "30px",
            height: "20px",
          }}
        />

        {/* English Flag */}
        <img
          src={Flag2}
          alt="English flag"
          onClick={() => changeLanguage("en")}
          style={{
            cursor: "pointer",
            opacity: language === "en" ? 1 : 0.6,
            margin: "0 30px",
            width: "30px",
            height: "20px",
          }}
        />
        {translatedText && <p>{translatedText}</p>}
      </section>
      {/* Hero Section */}
      <section className="image-section" data-aos="fade-up">
        <img
          src={backgroundImage}
          alt="Background"
          className="background-image"
        />
        <div className="overlay-content">
          <h1>Your Trusted Partner in Construction & Development</h1>
          <p>Delivering innovative projects with quality, safety, and precision.</p>
        </div>
      </section>

      {/* Services Section */}
      <section
        className="services-section"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <h2 data-text="Shërbimet">SERVICES</h2>
        <div className="services-list">
          {[
            {
              icon: "fas fa-truck-loading",
              title: "Excavation Works",
              description:
                "We provide expert excavation services, from site clearing to trench digging, ensuring your project starts on solid ground.",
            },
            {
              icon: "fa fa-hammer",
              title: "Carpentry Works",
              description:
                "Our carpenters craft high-quality woodwork, including framing, roofing, and custom cabinetry, to meet your specific needs.",
            },
            {
              icon: "fa fa-wrench",
              title: "Ironworks",
              description:
                "We specialize in durable and precise ironwork, including gates, railings, and structural supports.",
            },
            {
              icon: "fas fa-building",
              title: "Concrete Works",
              description:
                "Offering a range of concrete services, from foundations to decorative finishes, for residential and commercial buildings.",
            },
            {
              icon: "fas fa-home",
              title: "Roofing Works",
              description:
                "Our roofing experts ensure reliable, long-lasting roofs, handling installations, repairs, and replacements.",
            },
            {
              icon: "fas fa-th-large",
              title: "Brick Wall Works",
              description:
                "We build and repair brick walls with precision, adding both structural integrity and aesthetic value to your property.",
            },
            {
              icon: "fa fa-paint-roller",
              title: "Plastering Works",
              description:
                "Our plastering services provide smooth, durable finishes for both interior and exterior surfaces, enhancing your space.",
            },
            {
              icon: "fa fa-thumbs-up",
              title: "Facade Works",
              description:
                "Transform the look of your building with our expert facade services, including restoration, installation, and cladding.",
            },
            {
              icon: "fa fa-umbrella",
              title: "Canopy System Works",
              description:
                "We design and install functional canopy systems, providing shelter and aesthetic appeal for your property.",
            },
            {
              icon: "fa fa-window-restore",
              title: "Ventilated Facade Works",
              description:
                "Our ventilated facades improve energy efficiency and airflow while adding a modern touch to your building’s exterior.",
            },
            {
              icon: "fas fa-border-all",
              title: "Tiling Works",
              description:
                "Our tiling services cover everything from floors to walls, offering a variety of styles and high-quality installations.",
            },
            {
              icon: "fa fa-paint-brush",
              title: "Decorative Coating Works",
              description:
                "We specialize in decorative coatings that enhance the look and feel of your space, combining beauty with protection.",
            },
            {
              icon: "fa fa-tools",
              title: "Renovation Works",
              description:
                "Our renovation services transform existing spaces, upgrading interiors and exteriors to meet modern standards.",
            },
            {
              icon: "fa fa-water",
              title: "Plumbing Works",
              description:
                "From installations to repairs, our plumbing services cover everything from pipes to fixtures, ensuring a well-functioning system.",
            },
            {
              icon: "fa fa-shield-alt",
              title: "Insulation Works",
              description:
                "We provide insulation solutions to improve energy efficiency, reduce noise, and create comfortable indoor environments.",
            },
            {
              icon: "fa fa-bolt",
              title: "Electrical Works",
              description:
                "Our licensed electricians offer reliable electrical installations, repairs, and maintenance for both residential and commercial properties.",
            },
          ].map((service, index) => (
            <div className="service-item" key={index}>
              <i className={service.icon} aria-hidden="true"></i>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        className="activities-section"
        data-aos="fade-up"
        data-aos-delay="150"
      >
        <h2>Our Activity</h2>
        <div className="image-container">
          <div className={`image-group ${activeGroup === 1 ? "active" : ""}`}>
            <img src={image1a} alt="Aktiviteti 1a" />
            <img src={image1b} alt="Aktiviteti 1b" />
            <img src={image1c} alt="Aktiviteti 1c" />
          </div>
          <div className={`image-group ${activeGroup === 2 ? "active" : ""}`}>
            <img src={image2a} alt="Aktiviteti 2a" />
            <img src={image2b} alt="Aktiviteti 2b" />
            <img src={image2c} alt="Aktiviteti 2c" />
          </div>
          <div className={`image-group ${activeGroup === 3 ? "active" : ""}`}>
            <img src={image3a} alt="Aktiviteti 3a" />
            <img src={image3b} alt="Aktiviteti 3b" />
            <img src={image3c} alt="Aktiviteti 3c" />
          </div>
        </div>
        <div
          className="button1-container"
          data-aos="fade-right"
          data-aos-delay="300"
        >
          <button className="btn1" onClick={() => showImages(1)}>
            <i className="fas fa-square"></i>
          </button>
          <button className="btn1" onClick={() => showImages(2)}>
            <i className="fas fa-square"></i>
          </button>
          <button className="btn1" onClick={() => showImages(3)}>
            <i className="fas fa-square"></i>
          </button>
        </div>
      </section>

      {/* Values Section */}
      <section
        className="values-section"
        data-aos="fade-left"
        data-aos-delay="200"
      >
        <h2>Our Values</h2>
        <div className="value-container" data-aos="fade-left">
          {[
            {
              icon: "fas fa-star",
              title: "Excellence and Quality",
              description:
                "We make the best efforts with endless passion and a challenging spirit to meet and exceed every expectation, to become the best in every way.",
              color: "black",
            },
            {
              icon: "fas fa-shield-alt",
              title: "Integrity & Security",
              description:
                "We fulfill our mission’s promise through behavior that reflects honesty, responsibility, & justice in action.",
              color: "yellow",
            },
            {
              icon: "fas fa-users",
              title: "Teamwork & Collaboration",
              description:
                "We work together towards a common goal, making what we do better and improving every day.",
              color: "orange",
            },
          ].map((value, index) => (
            <div className="value-item" key={index}>
              <i className={value.icon}></i>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
              <div
                className="underline"
                style={{ backgroundColor: value.color }}
              ></div>
            </div>
          ))}
        </div>
      </section>
      {/*Partners Section */}
      <PartnersCarousel />
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
