import React from 'react';

const StoreItem = ({ store }) => {
    return (
        <div className="store-item">
            <h2>{store.name}</h2>
            <p>Price: ${store.price}</p>
            <p>Availability: {store.availability ? 'In Stock' : 'Out of Stock'}</p>
            <p>Store Hours: {store.hours}</p>
        </div>
    );
};

export default StoreItem;