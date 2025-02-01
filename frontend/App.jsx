import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/search" component={SearchPage} />
          <Route path="/store/:id" component={StorePage} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;