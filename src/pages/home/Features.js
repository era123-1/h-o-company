import React from "react";
import "../../styles/Features.css"; 
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import highQualityImage from "../../assets/images/high-quality.jpg";
import timelyCompletionImage from "../../assets/images/timely-completion.jpg";
import skilledTeamImage from "../../assets/images/skilled-team.jpg";
import budgetFriendlyImage from "../../assets/images/budget-friendly.jpg";
import customerSatisfactionImage from "../../assets/images/customer-satisfaction.jpg";

const Features = () => {
  return (
    <>
      <Header />
      <div className="features">
        <div className="features-header">
          <h1>Our Construction Services Features</h1>
          <p>
            We offer a wide range of construction services that meet the needs
            of every project, ensuring high quality and efficiency.
          </p>
        </div>

        <div className="features-grid">
          {/* Existing Features */}
          <div className="feature">
            <img src={highQualityImage} alt="High Quality Materials" />
            <h2>High-Quality Materials</h2>
            <p>
              We use only certified and durable materials, ensuring excellent
              results in every project. Material quality is our priority to
              ensure longevity and high performance.
            </p>
          </div>

          <div className="feature">
            <img src={timelyCompletionImage} alt="Timely Completion" />
            <h2>Timely Completion</h2>
            <p>
              We are committed to completing every project within the agreed
              timelines. Our use of advanced technologies and efficient project
              management allows us to meet all client requirements.
            </p>
          </div>

          <div className="feature">
            <img src={skilledTeamImage} alt="Skilled Team" />
            <h2>Skilled and Professional Team</h2>
            <p>
              Our team consists of highly qualified professionals with extensive
              experience in the construction field. Each team member is
              dedicated to providing top-level services.
            </p>
          </div>

          {/* New Features */}
          <div className="feature">
            <img src={budgetFriendlyImage} alt="Budget-Friendly Solutions" />
            <h2>Budget-Friendly Solutions</h2>
            <p>
              We understand the importance of staying within budget. Our
              services are designed to provide cost-effective solutions without
              compromising on quality.
            </p>
          </div>

          <div className="feature">
            <img src={customerSatisfactionImage} alt="Customer Satisfaction" />
            <h2>Customer Satisfaction</h2>
            <p>
              We prioritize customer satisfaction by ensuring clear
              communication, excellent service, and top-quality results in every
              project.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Features;