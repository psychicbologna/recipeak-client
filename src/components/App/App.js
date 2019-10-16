import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../Header/Header';
import LandingPage from '../../routes/LandingPage/LandingPage';
import AboutPage from '../../routes/AboutPage/AboutPage';
import SignupPage from '../../routes/SignupPage/SignupPage';
import LoginPage from '../../routes/LoginPage/LoginPage';
import RecipePage from '../../routes/RecipePage/RecipePage';
import NotFound from '../../routes/NotFound/NotFound';
import UserHome from '../../routes/UserHome/UserHome';

import './App.css';

class App extends Component {
  state = {
    loggedin: true,
    hasError: false
  }
  
//https://reactjs.org/docs/react-component.html#static-getderivedstatefromerror
  static getDerivedStateFromError(error) {
    console.error(error)
    return {hasError: true}
  }

  render() {
    return (
      <div className="App">
        <Header>
        </Header>
        <Switch>
          <Route
            exact
            path={'/'}
            component={!this.state.loggedin ? LandingPage : UserHome}
          />
          <Route
            exact
            path={'/recipes'}
            component={!this.state.loggedin ? LoginPage : UserHome}
          />
          <Route
            path={'/about'}
            component={AboutPage}
          />
          <Route
            path={'/signup'}
            component={SignupPage}
          />
          <Route
            path={'/recipe/:id'}
            component={RecipePage}
          />
          <Route
            component={NotFound}
          />
        </Switch>
      </div>
    )
  };
}

export default App;
