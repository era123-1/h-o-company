import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "../styles/CookieConsent.css";

const CookieConsent = () => {
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

  // Function
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

  // Cookies
  const handlePreferenceChange = (e) => {
    const { name, checked } = e.target;
    setCookiesPreferences((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="cookie-banner">
      <p>
        We use cookies to improve your experience. Please choose your
        preferences:
      </p>
      <div className="cookie-options">
        <div>
          <input
            type="checkbox"
            name="essential"
            checked={cookiesPreferences.essential}
            disabled
          />
          <label>Essential Cookies (Required)</label>
        </div>
        <div>
          <input
            type="checkbox"
            name="analytics"
            checked={cookiesPreferences.analytics}
            onChange={handlePreferenceChange}
          />
          <label>Analytics Cookies</label>
        </div>
        <div>
          <input
            type="checkbox"
            name="marketing"
            checked={cookiesPreferences.marketing}
            onChange={handlePreferenceChange}
          />
          <label>Marketing Cookies</label>
        </div>
      </div>
      <div className="cookie-banner-button">
        <button onClick={handleSavePreferences}>Save Preferences</button>
        <button onClick={handleAcceptAll}>Accept All</button> 
      </div>
    </div>
  );
};

export default CookieConsent;