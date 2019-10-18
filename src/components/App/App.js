//TODO any way to tidy up these imports?
//TODO add route for /:user/:recipe?

import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../Header/Header';
import PrivateRoute from '../Utils/PrivateRoute';
import PublicOnlyRoute from '../Utils/PublicOnlyRoute'
import LandingPage from '../../routes/LandingPage/LandingPage';
import AboutPage from '../../routes/AboutPage/AboutPage';
import SignupPage from '../../routes/SignupPage/SignupPage';
import LoginPage from '../../routes/LoginPage/LoginPage';
import RecipePage from '../../routes/RecipePage/RecipePage';
import RecipeAddPage from '../../routes/RecipeAddPage/RecipeAddPage';
import RecipeEditPage from '../../routes/RecipeEditPage/RecipeEditPage';
import NotFound from '../../routes/NotFound/NotFound';
import UserHome from '../../routes/UserHome/UserHome';
import TokenService from '../../services/token-service';

import './App.css';

class App extends Component {
  state = {
    hasError: false
  }

  //https://reactjs.org/docs/react-component.html#static-getderivedstatefromerror
  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }

  render() {
    return (
      <div className="App">
        <Header />
        <main className='App__main'>
          <Switch>
            <Route
              exact
              path={'/'}
              component={
                !TokenService.hasAuthToken()
                ? LandingPage
                : UserHome}
            />
          <PrivateRoute
              exact
              path={['/recipes', '/user']}
              component={UserHome}
            />
            <PrivateRoute
              exact
              path={'/user'}
              component={UserHome}
            />
            <Route
              path={'/about'}
              component={AboutPage}
            />
            <PublicOnlyRoute
              path={'/signup'}
              component={SignupPage}
            />
            <PublicOnlyRoute
              path={'/login'}
              component={LoginPage}
            />
            <Route
              path={'/recipes/:recipe_id'}
              component={RecipePage}
            />
            <PrivateRoute
              path={'/recipes/:recipe_id/edit'}
              component={RecipeEditPage}
            />
            <PrivateRoute
              path={'/recipes/:recipe_id/add'}
              component={RecipeAddPage}
            />
            <Route
              component={NotFound}
            />
          </Switch>
        </main>
      </div>
    )
  };
}

export default App;
