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
import UnitApiService from '../../services/unit-api-service';
import TokenService from '../../services/token-service'

import './App.css';

class App extends Component {
  state = {
    hasError: false,
    loggedIn: false,
    // units: [],
  }

  checkLoginStatus() {
    TokenService.hasSessionUserdata()
      ? this.setState({ loggedIn: true })
      : this.setState({ loggedIn: false })
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  handleLogoutClick = () => {
    TokenService.clearAuthToken();
    TokenService.clearSessionUserdata();
    this.setState({ loggedIn: false })
  }
  
  handleLoginClick = () => {
    this.setState({ loggedIn: true })
  }

  //https://reactjs.org/docs/react-component.html#static-getderivedstatefromerror
  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }

  render() {

    return (
      <div className="App">
        <Header loginStatus={this.state.loggedIn} checkLoginStatus={() => this.checkLoginStatus} onLogoutClick={this.handleLogoutClick} />
        <main className='App__main'>
          <Switch>
            <PublicOnlyRoute
              exact
              path={'/'}
              component={LandingPage}
            />
            <PrivateRoute
              exact
              path={'/home'}
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
            <Route
              path={'/login'}
              render={() => <LoginPage loginStatus={this.state.loggedIn} onLoginClick={this.handleLoginClick} />}
              // render={componentProps => (
              //   TokenService.hasAuthToken()
              //     ? <Redirect to={'/user'} />
              //     : <LoginPage {...componentProps} loginStatus={this.state.loggedIn} handleLoginClick={() => this.handleLoginClick} />
              // )}
            />
            <PrivateRoute
              exact
              path={'/recipes/add'}
              component={RecipeAddPage}
            />
            <Route
              exact
              path={'/recipes/:recipe_id'}
              component={RecipePage}
            />
            <PrivateRoute
              exact
              path={'/recipes/:recipe_id/edit'}
              component={RecipeEditPage}
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
