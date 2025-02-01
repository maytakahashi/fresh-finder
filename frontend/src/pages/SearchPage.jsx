import React, { useState } from 'react';
import StoreList from '../components/StoreList';

const SearchPage = () => {
    const [zipCode, setZipCode] = useState('');
    const [stores, setStores] = useState([]);

    const handleSearch = () => {
        // Fetch stores based on zip code (mocked for now)
        const fetchedStores = [
            { id: 1, name: 'Grocery Store A', price: '$', availability: 'In Stock', hours: '9 AM - 9 PM' },
            { id: 2, name: 'Grocery Store B', price: '$$', availability: 'Limited Stock', hours: '10 AM - 8 PM' },
        ];
        setStores(fetchedStores);
    };

    return (
        <div>
            <h1>Find Grocery Stores</h1>
            <input
                type="text"
                placeholder="Enter Zip Code"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
            <StoreList stores={stores} />
        </div>
    );
};

export default SearchPage;