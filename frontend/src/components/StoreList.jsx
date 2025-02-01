import React from 'react';
import StoreItem from './StoreItem';

const StoreList = ({ stores }) => {
    return (
        <div className="store-list">
            {stores.map(store => (
                <StoreItem key={store.id} store={store} />
            ))}
        </div>
    );
};

export default StoreList;