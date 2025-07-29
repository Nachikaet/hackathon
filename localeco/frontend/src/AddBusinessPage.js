// AddBusinessPage.js
import React, { useState } from 'react';

function AddBusinessPage() {
  const [newBusiness, setNewBusiness] = useState({
    name: '',
    category: '',
    price_level: '',
    rating: '',
    city: '',
    address: '',
    latitude: '',
    longitude: '',
    description: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBusiness({ ...newBusiness, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/businesses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBusiness),
    });

    const data = await response.json();
    console.log(data.message);
    // Reset the form
    setNewBusiness({
      name: '',
      category: '',
      price_level: '',
      rating: '',
      city: '',
      address: '',
      latitude: '',
      longitude: '',
      description: '',
    });
  };

  return (
    <div className="AddBusinessPage">
      <h1>Add New Business</h1>
      <form onSubmit={handleSubmit}>
        <label>Name:
          <input type="text" name="name" value={newBusiness.name} onChange={handleInputChange} required />
        </label><br />

        <label>Category:
          <input type="text" name="category" value={newBusiness.category} onChange={handleInputChange} required />
        </label><br />

        <label>Price Level:
          <input type="number" name="price_level" value={newBusiness.price_level} onChange={handleInputChange} />
        </label><br />

        <label>Rating:
          <input type="number" name="rating" step="0.1" value={newBusiness.rating} onChange={handleInputChange} />
        </label><br />

        <label>City:
          <input type="text" name="city" value={newBusiness.city} onChange={handleInputChange} required />
        </label><br />

        <label>Address:
          <input type="text" name="address" value={newBusiness.address} onChange={handleInputChange} />
        </label><br />

        <label>Latitude:
          <input type="number" name="latitude" value={newBusiness.latitude} onChange={handleInputChange} />
        </label><br />

        <label>Longitude:
          <input type="number" name="longitude" value={newBusiness.longitude} onChange={handleInputChange} />
        </label><br />

        <label>Description:
          <textarea name="description" value={newBusiness.description} onChange={handleInputChange} />
        </label><br />

        <button type="submit">Add Business</button>
      </form>
    </div>
  );
}

export default AddBusinessPage;
