import React, { Component } from 'react';
import './App.css';
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';

class App extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <Landing />
        <Footer />
      </div>
    );
  }
}

export default App;
