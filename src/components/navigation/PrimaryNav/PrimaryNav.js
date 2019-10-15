import React, { Component } from 'react';
import './PrimaryNav.css';
import '../navigation.css';
//TODO after TokenService, conditional rendering for logged in/not logged in
//TODO <Links> with router-dom

//Stateful component

export default class PrimaryNav extends Component {
  render() {
    return (
      <ul className='primary-nav'>
        <li>Sign Up</li>
        <li>Logo</li>
        <li>Log In</li>
        <li>About</li>
      </ul>
    )
  }
};