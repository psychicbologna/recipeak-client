import React, { Component } from 'react';
import PrimaryNav from '../navigation/PrimaryNav/PrimaryNav';
import TokenService from '../../services/token-service';
import logo from '../../assets/images/logo.png'
import './Header.css'

export default class Header extends Component {
  
  static defaultProps = {
    userCheck: () => { },
    onLogOut: () => { }
  }

  userCheck(userData) {
    if (!!userData) {
      return <span className='Header__logininfo'>Logged in as {userData.username}</span>
    }
  }

  render() {
    const { loginStatus, checkLoginStatus, onLogoutClick } = this.props;

    const userData = TokenService.getSessionUserdata()
    return (
      <header className="App__header">
        <img src={logo} width='75px' alt='Recipeak logo, a mountain and flag.' className='Header__logo' />
        <h1>Recipeak</h1>
        <p className='Header__subtitle'>Cook, Eat, Grow</p>
        <nav className="Header">
          
          {this.userCheck(userData)}
          <PrimaryNav loginStatus={loginStatus} checkLoginStatus={checkLoginStatus} onLogoutClick={onLogoutClick} />
        </nav>
      </header>
    )
  }

}