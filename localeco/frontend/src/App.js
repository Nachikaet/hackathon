// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './HomePage';
import SearchPage from './SearchPage';
import AddBusinessPage from './AddBusinessPage'; // Import the AddBusinessPage

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | 
        <Link to="/search">Search</Link> | 
        <Link to="/add-business">Add New Business</Link> {/* Removed business list */}
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/add-business" element={<AddBusinessPage />} />
      </Routes>
    </Router>
  );
}

export default App;
