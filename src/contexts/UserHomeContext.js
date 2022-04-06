import React, { Component } from 'react';
import TokenService from '../services/token-service';
import AuthApiService from '../services/auth-api-service';
import IdleService from '../services/idle-service';


export const nullUser = {
  first_name: '',
  last_name: '',
  username: '',
}

const UserHomeContext = React.createContext({
  recipeList: [],
  user: nullUser,
  loggedIn: false,
  error: null,
  setError: () => {},
  clearError: () => {},
  setUserData: () => {},
  clearUserData: () => {},
  handleLogin: () => {},
  handleLogout: () => {}
})

export default UserHomeContext

export class UserHomeProvider extends Component {

  constructor(props) {
    super(props);
    IdleService.setIdleCallback(this.logoutFromIdle)
  }

  state = {
    user: nullUser,
    recipeList: [],
    loggedIn: TokenService.hasAuthToken(),
    error: null,
  }

  componentDidMount() {
    if (TokenService.hasAuthToken()) {
      IdleService.registerIdleTimerResets()
      TokenService.queueCallbackBeforeExpiry(() => {
        AuthApiService.postRefreshToken()
      })
    }
  }

  componentWillUnmount() {
    IdleService.unRegisterIdleResets()
    TokenService.clearCallbackBeforeExpiry()
  }

  //Retrieves user data and their recipes.
  setUserData = data => {
    this.setState({
      recipeList: data.recipes,
      user: data.user
    })
  }

  //Clears the user data.
  clearUserData = () => {
    this.setState({
      recipeList: [],
      user: {}
    })
  }

  setError = error => {
    console.error(error);
    this.setState({ error })
  }

  clearError = () => {
    this.setState({ error: null })
  }

  handleLogout = () => {
    TokenService.clearAuthToken();
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets();
    this.clearUserData()
    this.setState({loggedIn: false})
    this.render()
  }

  handleLogin = (authToken) => {
    TokenService.saveAuthToken(authToken);
    IdleService.registerIdleTimerResets();
    TokenService.queueCallbackBeforeExpiry(() => {
      this.fetchRefreshToken();
    })
    this.setState({loggedIn: true})
    this.render()
  }

  logoutFromIdle = () => {
    TokenService.clearAuthToken()
    TokenService.clearCallbackBeforeExpiry()
    IdleService.unRegisterIdleResets()
    this.clearUserData()
    this.setState({loggedIn: false})
    this.forceUpdate()
    this.render()
  }

  handleLoginClick = () => {
    if (TokenService.hasAuthToken()) {
      this.setState({ loggedIn: true })
    }
    this.render()
  }

  render() {
    const value = {
      recipeList: this.state.recipeList,
      user: this.state.user,
      loggedIn: this.state.loggedIn,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setUserData: this.setUserData,
      clearUserData: this.clearUserData,
      onLogin: this.handleLogin,
      onLogout: this.handleLogout
    }
    return (
      <UserHomeContext.Provider value={value}>
        {this.props.children}
      </UserHomeContext.Provider>
    )
  }

};