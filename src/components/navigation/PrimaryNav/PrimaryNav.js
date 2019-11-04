import React, { Component } from 'react';
import './PrimaryNav.css';
import '../navigation.css';
import { Link } from 'react-router-dom';
import TokenService from '../../../services/token-service';

//TODO the renders for login/logout link are not loading/working properly

export default class PrimaryNav extends Component {

  render() {
    const { loginStatus, checkLoginStatus, onLogoutClick } = this.props;
    checkLoginStatus();
    return (
      <ul className='Header__PrimaryNav'>
        <HomeLink loginStatus={loginStatus} />
        <SignupLink loginStatus={loginStatus} />
        <LogoutLink loginStatus={loginStatus} onLogoutClick={onLogoutClick} />
        <LoginLink loginStatus={loginStatus} />
        <li className='PrimaryNav__li'>
          <Link to='/abfoo;kluhoverout'>
            About
          </Link>
        </li>
      </ul>
    )
  }
};

function SignupLink(props) {
  if (!props.loginStatus) {
    return (
      <li className='PrimaryNav__li'>
        <Link to='/signup'>
          Sign Up
        </Link>
      </li>
    )
  } else {
    return null
  }
}

function LoginLink(props) {
  if (!props.loginStatus) {
    return (
      <li className='PrimaryNav__li'>
        <Link to='/login'>
          Log In
        </Link>
      </li>
    )
  } else {
    return null
  }
}

function HomeLink(props) {
  if (!!props.loginStatus) {
    return (
      <li className='PrimaryNav__li'>
        <Link to='/home'>
          Home
        </Link>
      </li>
    )
  } else {
    return null
  }
}

function LogoutLink(props) {
  console.log(props)
  if (!!props.loginStatus) {
    return (
      <li className='PrimaryNav__li'>
        <Link onClick={props.onLogoutClick} to='/' >
          Log Out
        </Link>
      </li>
    )
  } else {
    return null
  }
}