import React, { useState } from 'react';

function SearchPage() {
  const [filters, setFilters] = useState({
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

  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({...filters, [name]: value});
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    // Build query string from filters that have values
    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, val]) => {
      if (val) {
        queryParams.append(key, val);
      }
    });

    const response = await fetch(`http://localhost:5000/businesses?${queryParams.toString()}`);
    const data = await response.json();
    setResults(data);
  };

  return (
    <div>
      <h2>Search Businesses</h2>
      <form onSubmit={handleSearch}>
        {/* Repeat inputs for all attributes */}
        <input name="name" placeholder="Name" value={filters.name} onChange={handleChange} />
        <input name="category" placeholder="Category" value={filters.category} onChange={handleChange} />
        <input name="price_level" type="number" placeholder="Max Price Level" value={filters.price_level} onChange={handleChange} />
        <input name="rating" type="number" step="0.1" placeholder="Min Rating" value={filters.rating} onChange={handleChange} />
        <input name="city" placeholder="City" value={filters.city} onChange={handleChange} />
        <input name="address" placeholder="Address" value={filters.address} onChange={handleChange} />
        <input name="latitude" type="number" placeholder="Latitude" value={filters.latitude} onChange={handleChange} />
        <input name="longitude" type="number" placeholder="Longitude" value={filters.longitude} onChange={handleChange} />
        <input name="description" placeholder="Description" value={filters.description} onChange={handleChange} />
        <button type="submit">Search</button>
      </form>

      <h3>Results</h3>
      <ul>
        {results.map(b => (
          <li key={b.id}>
            <h4>{b.name}</h4>
            <p>{b.category}</p>
            <p>Price Level: {b.price_level}</p>
            <p>Rating: {b.rating}</p>
            <p>City: {b.city}</p>
            <p>Address: {b.address}</p>
            <p>{b.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchPage;
