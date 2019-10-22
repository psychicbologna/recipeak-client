import React, { Component } from 'react';
import PrimaryNav from '../navigation/PrimaryNav/PrimaryNav';

export default class Header extends Component {

  render() {
    return (
      <nav className="Header">
        <h1>Recipeak</h1>
        <p className='Header__subtitle'>Cook, Eat, Grow</p>
        <PrimaryNav />
      </nav>
    )
  }

}