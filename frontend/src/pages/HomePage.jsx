import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const HomePage = () => {
    return (
        <div className="home-page">
            <Header />
            <main>
                <h2>Welcome to FreshFinder</h2>
                <p>Find nearby and affordable grocery stores easily.</p>
            </main>
            <Footer />
        </div>
    );
};

export default HomePage;