import React, { Component } from 'react';
import PrimaryNav from '../navigation/PrimaryNav/PrimaryNav';
import logo from '../../assets/images/logo.png'
import './Header.css'

export default class Header extends Component {

  render() {
    return (
      <header className="App__Header">
        <img src={logo} width='75px' alt='Recipeak logo, a mountain and flag.' className='Header__logo' />
        <h1>Recipeak</h1>
        <span className='Header__Subtitle'>Cook, Eat, Grow</span>
        <nav className="Header">
          <PrimaryNav />
        </nav>
      </header>
    )
  }

}