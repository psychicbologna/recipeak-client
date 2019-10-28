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
    units: [],
  }

  checkLoginStatus() {
    TokenService.hasSessionUserdata()
      ? this.setState({ loggedIn: true })
      : this.setState({ loggedIn: false })
  }

  componentDidMount() {
    this.handleSetUnits();
    this.checkLoginStatus();
  }

  handleLogoutClick = () => {
    console.log('handlelogoutclick firing')
    TokenService.clearAuthToken();
    TokenService.clearSessionUserdata();
    this.setState({ loggedIn: false })
  }

  handleLoginClick() {
    console.log('handleLoginClick firing')
    this.setState({ loggedIn: true })
  }

  handleSetUnits(units) {
    UnitApiService.getUnits()
      .then(units =>
        this.setState({ units: units }))
      .catch(this.setState({
        hasError: true,
        error: { message: 'Unable to retrieve unit data.' }
      }));
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
              path={['/home']}
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
              render={() => <LoginPage units={this.state.units} loginStatus={this.state.loggedIn} handleLoginClick={this.handleLoginClick} />}
              // render={componentProps => (
              //   TokenService.hasAuthToken()
              //     ? <Redirect to={'/user'} />
              //     : <LoginPage {...componentProps} loginStatus={this.state.loggedIn} handleLoginClick={() => this.handleLoginClick} />
              // )}
            />
            <Route
              exact
              path={'/recipes/add'}
              render={() => <RecipeAddPage units={this.state.units} />}
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
