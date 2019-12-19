import React, { Component } from 'react';
import './PrimaryNav.css';
import '../navigation.css';
import UserHomeContext, { nullUser } from '../../../contexts/UserHomeContext'
import { Link } from 'react-router-dom';

export default class PrimaryNav extends Component {

  static contextType = UserHomeContext;

  render() {
    console.log(this.context);
    const { loggedIn } = this.context;
    return (
      <ul className='Header__PrimaryNav'>
        {
          !loggedIn
            ? <>
              <SignupLink />
              <LoginLink />
            </>
            : <>
              <HomeLink />
              <LogoutLink onLogout={this.context.onLogout} />
            </>
        }
      </ul>
    )
  }
};

function SignupLink(props) {
  return (
    <li className='PrimaryNav__li'>
      <Link to='/signup'>
        Sign Up
        </Link>
    </li>
  )
}

function LoginLink(props) {
  return (
    <li className='PrimaryNav__li'>
      <Link to='/login'>
        Log In
        </Link>
    </li>
  )
}

function HomeLink(props) {
  return (
    <li className='PrimaryNav__li'>
      <Link to='/home'>
        Home
        </Link>
    </li>
  )
}

function LogoutLink(props) {
  return (
    <li className='PrimaryNav__li'>
      <Link onClick={() => props.onLogout()} to='/' >
        Log Out
        </Link>
    </li>
  )
}