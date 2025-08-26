import React, { useState, useContext } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { AuthContext } from "../context/AuthContext";
import { useRatings } from "../hooks/useRatings";
import "../styles/Ratings.css";

const RatingsPage = () => {
  const { user, hasRated, login, logout, setHasRated } =
    useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(false);
  const [comment, setComment] = useState("");
  const { ratings, message, submitRating } = useRatings(
    user,
    hasRated,
    setHasRated
  );

  // Decode Google JWT response
  const decodeJwtResponse = (credential) => {
    const base64Url = credential.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  };

  // Handle login success
  const handleLoginSuccess = (response) => {
    const { credential } = response;
    const decoded = decodeJwtResponse(credential);
    login({
      name: decoded.name,
      email: decoded.email,
      imageUrl: decoded.picture,
    });
    localStorage.setItem("userEmail", "erahidaj@gmail.com");
  };

  // Render stars for rating
  const renderStars = (ratingValue, interactive = true) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`star ${index < ratingValue ? "filled" : ""}`}
        onClick={() => interactive && submitRating(index + 1, comment)}
      >
        ★
      </span>
    ));
  };

  return (
    <div>
      {/* Header Section */}
      <Header />
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <div className="ratings-page">
          {/* User Authentication */}
          {user ? (
            <div className="user-info">
              <div className="profile-menu">
                <img
                  src={user.imageUrl}
                  alt="User"
                  className="user-image"
                  onClick={() => setShowMenu(!showMenu)}
                />
                {showMenu && (
                  <div className="menu-dropdown">
                    <p className="menu-item">{user.name}</p>
                    <p className="menu-item" onClick={logout}>
                      Logout
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="google-login">
              <GoogleLogin
                onSuccess={handleLoginSuccess}
                onError={() => console.log("Login Failed")}
                shape="circle"
                size="large"
              />
            </div>
          )}

          <section>
            {/* Rating */}
            {user && !hasRated && (
              <div className="rating-section">
                <h2>Rate Us</h2>
                <div className="stars">{renderStars(0)}</div>
                <div className="rating-box">
                  <textarea
                    className="rating-textarea"
                    placeholder="Leave a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <div className="rating-actions">
                    <button
                      onClick={() => submitRating(5, comment)}
                      className="rating-btn"
                    >
                      Submit Rating
                    </button>
                  </div>
                </div>
              </div>
            )}

            {!user && (
              <div className="rating-section">
                <h2 class="section-title">Share your experience</h2>
                <p class="section-subtitle">
                  Tell us what you think — your feedback makes a real
                  difference.
                </p>
                <div className="stars">{renderStars(0, false)}</div>
              </div>
            )}

            {hasRated && <p>You have already rated us. Thank you!</p>}

            {/* Message */}
            {message && (
              <div
                className="message"
                style={{ textAlign: "center", color: "red", fontSize: "20px" }}
              >
                {message}
              </div>
            )}

            {/* Ratings */}
            <div className="ratings-grid">
              <h2>What our customers say</h2>
              <div className="ratings-list">
                {ratings.map((rating, index) => (
                  <div key={index} className="rating-item">
                    <img
                      src={rating.imageUrl}
                      alt={rating.email}
                      className="rating-avatar"
                    />
                    <div className="rating-info">
                      <p className="rating-email">{rating.email}</p>
                      <div className="stars">
                        {renderStars(rating.rating, false)}
                      </div>
                      <p className="rating-comment">{rating.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </GoogleOAuthProvider>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default RatingsPage;
