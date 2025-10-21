import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "../styles/CookieConsent.css";
import { useLanguage } from "../context/LanguageContext";

const CookieConsent = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [cookiesPreferences, setCookiesPreferences] = useState({
    essential: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = Cookies.get("cookieConsent");
    if (!consent) {
      setIsVisible(true);
    } else {
      const savedPreferences = JSON.parse(
        Cookies.get("cookiePreferences") || "{}"
      );
      setCookiesPreferences(savedPreferences);
    }
  }, []);

  // Funksionet për ruajtje
  const handleAcceptAll = () => {
    Cookies.set("cookieConsent", "true", { expires: 365 });
    Cookies.set(
      "cookiePreferences",
      JSON.stringify({
        essential: true,
        analytics: true,
        marketing: true,
      }),
      { expires: 365 }
    );
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    Cookies.set("cookieConsent", "true", { expires: 365 });
    Cookies.set("cookiePreferences", JSON.stringify(cookiesPreferences), {
      expires: 365,
    });
    setIsVisible(false);
  };

  const handlePreferenceChange = (e) => {
    const { name, checked } = e.target;
    setCookiesPreferences((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  if (!isVisible) return null;

  return (
    <div className="cookie-banner">
      <p>{t("cookieBannerMessage")}</p>
      <div className="cookie-options">
        <div>
          <input
            type="checkbox"
            name="essential"
            checked={cookiesPreferences.essential}
            disabled
          />
          <label>{t("essentialCookies")}</label>
        </div>
        <div>
          <input
            type="checkbox"
            name="analytics"
            checked={cookiesPreferences.analytics}
            onChange={handlePreferenceChange}
          />
          <label>{t("analyticsCookies")}</label>
        </div>
        <div>
          <input
            type="checkbox"
            name="marketing"
            checked={cookiesPreferences.marketing}
            onChange={handlePreferenceChange}
          />
          <label>{t("marketingCookies")}</label>
        </div>
      </div>
      <div className="cookie-banner-button">
        <button onClick={handleSavePreferences}>{t("savePreferences")}</button>
        <button onClick={handleAcceptAll}>{t("acceptAll")}</button>
      </div>
    </div>
  );
};

export default CookieConsent;
