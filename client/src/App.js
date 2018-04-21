import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navigation />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/logg-inn" component={Login} />
            <Route exact path="/registring" component={Register} />
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
