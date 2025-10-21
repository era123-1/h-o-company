import React from "react";
import "../../styles/Materials.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { materials } from "../../utils/Data";
import { useLanguage } from "../../context/LanguageContext";

const Materials = () => {
  const { t } = useLanguage();

  return (
    <div>
      <Header />

      <div className="materials-container">
        <h1 className="materials-title">{t("exploreMaterials")}</h1>
        <p className="materials-intro">{t("materialsIntro")}</p>

        <div className="materials-grid">
          {materials.map((material, index) => (
            <div key={index} className="material-card">
              <img
                src={material.image}
                alt={material.name}
                className="material-image"
              />
              <div className="material-details">
                <h2 className="material-name">{t(material.name)}</h2>
                <p className="material-description">{t(material.description)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Materials;
