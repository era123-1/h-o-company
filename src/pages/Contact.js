import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Contact.css";
import contactUs from "../assets/images/contact-us.jpg";

function Contact() {
  const [formStatus, setFormStatus] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    try {
      const response = await fetch(process.env.REACT_APP_FORMSPREE_URL, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setFormStatus("Thank you! We will get back to you shortly.");
        form.reset();
      } else {
        setFormStatus("Oops! There was an issue sending the form.");
      }
    } catch (error) {
      setFormStatus("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      {/* Header Section */}
      <Header />

      {/* Contact Section */}
      <section id="gmail-details">
        <p>
          <i className="fas fa-envelope"></i> erahidaj@gmail.com
        </p>
      </section>

      <section className="contact-section">
        <div className="contact-img">
          <img src={contactUs} alt="contactUs" className="contact-us" />
          <h3>Contact us directly at:</h3>
          <p>+355 69 20 73 347</p>
        </div>

        <div className="contact-form-container">
          <h1>Contact Us</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">
                <i className="fas fa-user"></i> Name:
              </label>
              <input type="text" id="name" name="name" required />
            </div>

            <div className="form-group">
              <label htmlFor="email">
                <i className="fas fa-envelope"></i> Email:
              </label>
              <input type="email" id="email" name="email" required />
            </div>

            <div className="form-group">
              <label htmlFor="message">
                <i className="fas fa-comment-dots"></i> Message:
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                required
              ></textarea>
            </div>

            <button type="submit">Send Message</button>
          </form>
          {formStatus && <p className="form-status">{formStatus}</p>}
        </div>
      </section>

      {/* WhatsApp  */}
      <a
        href="https://wa.me/+355695248404"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
      >
        <i className="fab fa-whatsapp"></i>
      </a>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Contact;
