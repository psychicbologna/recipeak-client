import React, { Component } from 'react';
import PrimaryNav from '../navigation/PrimaryNav/PrimaryNav';
import TokenService from '../../services/token-service';

export default class Header extends Component {

  static defaultProps = {
    userCheck: () => {}
  }

  userCheck(userData) {
    console.log(userData)
    if (!!userData) {
      return <span className='Header__logininfo'>Logged in as {userData.username}</span>
    }
  }

  render() {
    const userData = TokenService.getSessionUserdata()
    return (
      <nav className="Header">
        <h1>Recipeak</h1>
        <p className='Header__subtitle'>Cook, Eat, Grow</p>
        { this.userCheck(userData) }
        <PrimaryNav />
      </nav>
    )
  }

}