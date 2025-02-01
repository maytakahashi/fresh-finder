import React, { useState } from 'react';
import StoreList from '../components/StoreList';
import './SearchPage.css';

const SearchPage = () => {
  // State to hold the user’s input for Zip Code
  const [zipCode, setZipCode] = useState('');
  // State to hold the user’s input for search radius (miles)
  const [searchRadius, setSearchRadius] = useState('');
  // State to store the fetched list of grocery stores
  const [stores, setStores] = useState([]);
  // This state holds the last searched location to display in UI
  const [searchedLocation, setSearchedLocation] = useState('');

  // Convert miles to meters (Google Places uses meters)
  const convertMilesToMeters = (miles) => {
    return miles * 1609.34; // ~1609.34 meters in a mile
  };

  const handleSearch = async () => {
    try {
      // Clear any previous stores
      setStores([]);

      // If no zip code or radius is entered, handle accordingly
      if (!zipCode || !searchRadius) {
        alert("Please enter both a Zip Code and a search radius (in miles).");
        return;
      }

      // Update "searchedLocation" to whatever user typed
      setSearchedLocation(`${zipCode} (within ${searchRadius} miles)`);

      // 1. GEOCODE the Zip code to get lat/lng
      const geocodeResponse = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          zipCode
        )}&key=YOUR_API_KEY`
      );
      const geocodeData = await geocodeResponse.json();

      if (
        !geocodeData.results ||
        geocodeData.results.length === 0 ||
        geocodeData.status !== 'OK'
      ) {
        alert('Could not find a location for the given Zip Code.');
        return;
      }

      const { lat, lng } = geocodeData.results[0].geometry.location;

      // 2. NEARBY SEARCH for grocery stores and farmers markets
      //    "type=grocery_or_supermarket" covers grocery stores
      //    "keyword=farmer's market" to help find farmers markets
      //    You could also do separate requests, or do a textsearch approach.
      const radiusInMeters = convertMilesToMeters(parseFloat(searchRadius));
      const placesResponse = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radiusInMeters}&type=grocery_or_supermarket&keyword=farmer%27s+market&key=KEY`
      );
      const placesData = await placesResponse.json();

      // If the Places API call succeeds, parse out the relevant info:
      if (placesData.status !== 'OK' && placesData.status !== 'ZERO_RESULTS') {
        alert(
          'Places API request failed. Please check your API key, billing, and Places API settings.'
        );
        return;
      }

      const fetchedStores = (placesData.results || []).map((place) => ({
        id: place.place_id,
        name: place.name,
        address: place.vicinity,
        rating: place.rating,
        // You could add additional fields if needed (opening_hours, etc.)
      }));

      setStores(fetchedStores);
    } catch (error) {
      console.error('Error searching for stores:', error);
    }
  };

  return (
    <div className="search-page">
      <h1>Find Grocery Stores</h1>

      <div className="search-inputs">
        <input
          type="text"
          placeholder="Enter Zip Code"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
        />
        <input
          type="number"
          placeholder="Miles (e.g. 25)"
          value={searchRadius}
          onChange={(e) => setSearchRadius(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Show the user's search summary */}
      {searchedLocation && (
        <p>
          Searching for grocery stores near <strong>{searchedLocation}</strong>
        </p>
      )}

      {/* Render the Store List */}
      <StoreList stores={stores} />
    </div>
  );
};

export default SearchPage;
