import React from "react";
import "../../styles/Features.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { featuresData } from "../../utils/Data";
import { useLanguage } from "../../context/LanguageContext";
const Features = () => {
    const { t } = useLanguage();
    return (
        <> <Header /> <div className="features">
            <div className="features-header">
                <h1>{t("featuresHeaderTitle")}</h1>
                <p>{t("featuresHeaderDesc")}</p>
            </div>
            <div className="features-grid"> {featuresData.map(feature => (<div key={feature.id} className="feature"> <img src={feature.image} alt={t(feature.titleKey)} /> <h2>{t(feature.titleKey)}</h2> <p>{t(feature.descriptionKey)}</p> </div>))} </div> </div> <Footer /> </>);
}; export default Features;

