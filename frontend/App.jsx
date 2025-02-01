import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './src/components/Header';
import Footer from './src/components/Footer';
import HomePage from './src/pages/HomePage';
import SearchPage from './src/pages/SearchPage';
import StorePage from './src/pages/StorePage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/store/:id" element={<StorePage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;