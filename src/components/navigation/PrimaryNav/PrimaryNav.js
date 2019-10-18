import React, { Component } from 'react';
import './PrimaryNav.css';
import '../navigation.css';
import TokenService from '../../../services/token-service';
import { Link } from 'react-router-dom';

//TODO the renders for login/logout link are not loading/working properly

export default class PrimaryNav extends Component {
  handleLogoutClick = () => {
    TokenService.clearAuthToken();
  }

  renderLoginLink() {
    return (
      <li>
        <Link to='/signup'>Sign Up</Link>
        <Link to='/login'>Log In</Link>
      </li>
    )
  }
  renderLogoutLink() {
    return (
      <li>
        <Link onClick={this.handleLogoutClick} to='/' >
          Log Out
        </Link>
      </li>
    )
  }
  render() {
    return (
      <ul className='primary-nav'>
        <li>Logo</li>
        {
          TokenService.hasAuthToken()
            ? this.renderLogoutLink()
            : this.renderLoginLink()
        }
        <li>
          <Link to='/about'>
            About
          </Link>
        </li>
      </ul>
    )
  }
};