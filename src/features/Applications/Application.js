import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useLocation, Link } from "react-router-dom";
import "../../styles/Application.css";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useLanguage } from "../../context/LanguageContext";

function Application() {
  const { t } = useLanguage();
  const location = useLocation();
  const jobTitle = location.state?.jobTitle || "Job Title";
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [resume, setResume] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const resumeInputRef = useRef(null);

  useEffect(() => {
    if (user?.email) setEmail(user.email);
  }, [user]);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError(t("invalidEmail") || "Please enter a valid email address.");
      return;
    }

    setError("");
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("resume", resume);
    formData.append("jobTitle", jobTitle);

    fetch("https://hocompany1.com/api/save-application.php", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setMessage(data.message || t("applicationSuccess"));
          setModalVisible(true);
          setName("");
          setResume(null);
          if (resumeInputRef.current) resumeInputRef.current.value = "";
        } else {
          setError(data.message || t("somethingWrong"));
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        setError(t("serverError"));
      });
  };

  return (
    <div>
      <Header />
      <div className="application-form">
        <h2>
          {t("applyingFor")}: <strong>{jobTitle}</strong>
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>{t("name")}:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>{t("email")}:</label>
            <input type="email" value={email} readOnly />
          </div>

          <div className="form-group">
            <label>{t("resume")}:</label>
            <input
              type="file"
              ref={resumeInputRef}
              onChange={(e) => setResume(e.target.files[0])}
              accept=".pdf"
              required
            />
          </div>

          {error && <div className="error">{error}</div>}

          <button type="submit">{t("submitApplication")}</button>
        </form>
      </div>

      {modalVisible && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setModalVisible(false)}>
              &times;
            </span>
            <h2>{t("formSubmitted")}</h2>
            <i
              className="fas fa-check-circle"
              style={{ color: "green", fontSize: "35px" }}
            ></i>
            <p>{message}</p>
          </div>
        </div>
      )}

      {user?.email === "erahidaj@gmail.com" && (
        <Link to="/applications">{t("seeApplications")}</Link>
      )}
      <Footer />
    </div>
  );
}

export default Application;




