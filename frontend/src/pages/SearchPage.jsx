import React, { useState } from 'react';
import StoreList from '../components/StoreList';
import './SearchPage.css';

const SearchPage = () => {
  const [zipCode, setZipCode] = useState('');
  const [stores, setStores] = useState([]);
  // This state holds the last searched value, so we can display it
  const [searchedLocation, setSearchedLocation] = useState('');

  const handleSearch = () => {
    // Update "searchedLocation" to whatever user typed
    setSearchedLocation(zipCode);

    // Simulate fetching stores based on zip code (mocked for now)
    const fetchedStores = [
      { id: 1, name: 'Grocery Store A', price: '$', availability: 'In Stock', hours: '9 AM - 9 PM' },
      { id: 2, name: 'Grocery Store B', price: '$$', availability: 'Limited Stock', hours: '10 AM - 8 PM' },
    ];
    setStores(fetchedStores);
  };

  return (
    <div className="search-page">
      <h1>Find Grocery Stores</h1>
      <input
        type="text"
        placeholder="Enter Zip Code"
        value={zipCode}
        onChange={(e) => setZipCode(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {/* Display the "Searching for grocery stores near..." text only after a search is done */}
      {searchedLocation && (
        <p>
          Searching for grocery stores near <strong>{searchedLocation}</strong>
        </p>
      )}

      <StoreList stores={stores} />
    </div>
  );
};

export default SearchPage;
