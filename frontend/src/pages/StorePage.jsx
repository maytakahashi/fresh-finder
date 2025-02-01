import React from 'react';
import { useParams } from 'react-router-dom';
import StoreList from '../components/StoreList';

const StorePage = () => {
    const { storeId } = useParams();
    const [store, setStore] = React.useState(null);

    React.useEffect(() => {
        // Fetch store details based on storeId
        const fetchStoreDetails = async () => {
            const response = await fetch(`/api/stores/${storeId}`);
            const data = await response.json();
            setStore(data);
        };

        fetchStoreDetails();
    }, [storeId]);

    if (!store) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{store.name}</h1>
            <p>Price: {store.price}</p>
            <p>Availability: {store.availability}</p>
            <p>Store Hours: {store.hours}</p>
            <StoreList stores={store.relatedStores} />
        </div>
    );
};

export default StorePage;