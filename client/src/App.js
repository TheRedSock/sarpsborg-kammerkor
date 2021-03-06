// Dependency imports
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';

// External functions/files
import { setCurrentUser, logoutUser } from './actions/authActions';
import setAuthToken from './utils/setAuthToken';
import store from './store';

import PrivateRoute from './components/common/PrivateRoute';

// Website component imports
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/internal/Dashboard';

import { clearCurrentUpcoming } from './actions/practiceActions';

// Custom CSS
import './App.css';
import Schedule from './components/internal/Schedule';

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);

  // Decode token and get user info
  const decoded = jwt_decode(localStorage.jwtToken);

  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    store.dispatch(clearCurrentUpcoming());

    // Redirect to login
    window.location.href = '/logg-inn';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Navigation />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/logg-inn" component={Login} />
              <Switch>
                <PrivateRoute exact path="/intern/hjem" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/intern/semesterplan"
                  component={Schedule}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/admin/registrering"
                  component={Register}
                />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
