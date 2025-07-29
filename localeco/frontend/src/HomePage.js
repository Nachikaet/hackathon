// HomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './Homepage.css';  // Import CSS file

function HomePage() {
  const navigate = useNavigate();  // Initialize navigate

  return (
    <div className="homepage-container">
      {/* Welcome Text */}
      <div className="welcome-text">
        Welcome to
      </div>
      
      {/* ECOLOCAL Text */}
      <div className="ecolocal-text">
        ECOLOCAL
      </div>
      
      {/* Description */}
      <div className="description-text">
        Discover eco-friendly businesses near you.<br/>
        A web platform that helps users easily find sustainable stores, restaurants, recycling centres and more filtered by category, city, price, and rating. Empowering communities to support green living, one local business at a time.
      </div>
      
      {/* Buttons */}
      <div className="button-container">
        <button className="button" onClick={() => navigate('/add-business')}>
          Add your business
        </button>
        <button className="button" onClick={() => navigate('/search')}>
          Search for businesses
        </button>
      </div>
    </div>
  );
}

export default HomePage;

