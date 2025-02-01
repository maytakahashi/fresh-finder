import React, { useState } from 'react';
import StoreList from '../components/StoreList';
import './SearchPage.css';

const SearchPage = () => {
  // State to hold the user’s input for search radius (in miles)
  const [searchRadius, setSearchRadius] = useState('');
  // State to store the fetched list of grocery stores
  const [stores, setStores] = useState([]);
  // This state holds the last searched location to display in UI
  const [searchedLocation, setSearchedLocation] = useState('');

  // Convert miles to meters (Google Places uses meters)
  const convertMilesToMeters = (miles) => {
    return miles * 1609.34; // ~1609.34 meters in a mile
  };

  const handleSearch = () => {
    // If no search radius is entered, handle accordingly
    if (!searchRadius) {
      alert("Please enter a search radius (in miles).");
      return;
    }

    // Use the HTML5 Geolocation API to get the user’s current location
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          // Clear any previous stores
          setStores([]);

          // Extract lat/lng from the geolocation result
          const { latitude, longitude } = position.coords;

          // Update the "searchedLocation" state
          setSearchedLocation(`Your current location (within ${searchRadius} miles)`);

          // Calculate the radius in meters for the Places API
          const radiusInMeters = convertMilesToMeters(parseFloat(searchRadius));

          // Perform NEARBY SEARCH for grocery stores and farmers markets
          const placesResponse = await fetch(
            `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radiusInMeters}&type=grocery_or_supermarket&keyword=farmer%27s+market&key=YOUR_GOOGLE_API_KEY`
          );

          const placesData = await placesResponse.json();

          // If the Places API call succeeds, parse out relevant info:
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
            // You could add additional fields if needed (e.g. opening_hours).
          }));

          setStores(fetchedStores);
        } catch (error) {
          console.error('Error searching for stores:', error);
        }
      },
      (error) => {
        console.error('Geolocation error:', error);
        alert('Unable to retrieve your location. Please allow location access.');
      }
    );
  };

  return (
    <div className="search-page">
      <h1>Find Grocery Stores</h1>

      <div className="search-inputs">
        <input
          type="number"
          placeholder="How many miles from you?"
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
