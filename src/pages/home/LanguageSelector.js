// src/components/LanguageSelector.js
import React from "react";
import Flag1 from "../../assets/images/flag1.png";
import Flag2 from "../../assets/images/flag2.png";

const LanguageSelector = ({ language, onLanguageChange }) => {
    return (
        <section
            className="language-flag"
            style={{
                position: "sticky",
                bottom: 0,
                display: "flex",
                justifyContent: "flex-end",
                padding: "10px",
                width: "100%",
            }}
        >
            <img
                src={Flag1}
                alt="Albanian"
                onClick={() => onLanguageChange("sq")}
                style={{
                    cursor: "pointer",
                    opacity: language === "sq" ? 1 : 0.6,
                    margin: "0 10px",
                    width: "30px",
                    height: "20px",
                }}
            />
            <img
                src={Flag2}
                alt="English"
                onClick={() => onLanguageChange("en")}
                style={{
                    cursor: "pointer",
                    opacity: language === "en" ? 1 : 0.6,
                    margin: "0 30px",
                    width: "30px",
                    height: "20px",
                }}
            />
        </section>
    );
};

export default LanguageSelector;

