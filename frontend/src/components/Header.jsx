import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="container">
        <h1 className="logo">FreshFinder</h1>
        <nav className="navbar">
          <ul className="nav-list">
            <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
            <li className="nav-item"><Link to="/search" className="nav-link">Search</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;