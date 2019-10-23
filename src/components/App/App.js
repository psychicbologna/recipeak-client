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

import './App.css';

class App extends Component {
  state = {
    hasError: false,
    loggedIn: false,
    units: [],
  }

  componentDidMount() {
    this.handleSetUnits();
  }

  handleLogOut() {
    this.setState({ loggedIn: false })
  }

  handleLogIn() {
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
        <header className="App__header">
          <Header loginStatus={this.state.loggedIn} onLogOut={this.handleLogOut} />
        </header>
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
            <PublicOnlyRoute
              path={'/login'}
              component={LoginPage}
              onLogin={this.handleLogIn}
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
