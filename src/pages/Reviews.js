import React, { useState, useContext } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { AuthContext } from "../context/AuthContext";
import { useRatings } from "../hooks/useRatings";
import "../styles/Ratings.css";

const RatingsPage = () => {
  const { user, hasRated, login, logout, setHasRated } = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(false);
  const [comment, setComment] = useState("");
  const { ratings, message, submitRating } = useRatings(user, hasRated, setHasRated);

  // Decode JWT 
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

  const handleLoginSuccess = (response) => {
    const decoded = decodeJwtResponse(response.credential);
    login({
      name: decoded.name,
      email: decoded.email,
      imageUrl: decoded.picture,
    });
    localStorage.setItem("userEmail", decoded.email);
  };

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
      <Header />

      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <div className="ratings-page">

          {/* Google login ose profile */}
          {user ? (
            <div className="profile-menu-container">
              <img 
                src={user.imageUrl} 
                alt="User" 
                className="user-image" 
                onClick={() => setShowMenu(!showMenu)} 
              />
              {showMenu && (
                <div className="menu-dropdown">
                  <p className="menu-item">{user.name}</p>
                  <p className="menu-item" onClick={logout}>Logout</p>
                </div>
              )}
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

          {/* Dy kolonat lart */}
          <div className="ratings-columns">

            {/* Left Column */}
            <div className="left-column">
              <h2 className="section-title">Share your experience</h2>
              <p className="section-subtitle">
                Tell us what you think — your feedback makes a real difference.
              </p>
              {user && !hasRated ? (
                <>
                  <div className="stars">{renderStars(0, true)}</div>
                  <textarea
                    className="rating-textarea"
                    placeholder="Leave a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <button
                    onClick={() => submitRating(5, comment)}
                    className="rating-btn"
                  >
                    Submit Rating
                  </button>
                </>
              ) : !user ? (
                <div className="stars">{renderStars(0, false)}</div>
              ) : (
                <p>You have already rated us. Thank you!</p>
              )}
            </div>

            {/* Right Column */}
            <div className="right-column">
              <h2 className="section-title">Top Reviews</h2>
              <div className="average-rating">
                <span className="avg-score">4.6</span>
                <div className="stars">{renderStars(5, false)}</div>
                <p>Based on 120 reviews</p>
              </div>

              <div className="rating-progress">
                {[5,4,3,2,1].map((star,index) => (
                  <div key={star} className="rating-row">
                    <p>{star} ★</p>
                    <div className="progress">
                      <div style={{ width: `${[70,20,7,2,1][index]}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Reviews Grid */}
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
                  <p className="rating-email">{rating.email}</p>
                  <div className="stars">{renderStars(rating.rating, false)}</div>
                  <p className="rating-comment">{rating.comment}</p>
                </div>
              ))}
            </div>
          </div>

          {message && <p className="message">{message}</p>}

        </div>
      </GoogleOAuthProvider>

      <Footer />
    </div>
  );
};

export default RatingsPage;
