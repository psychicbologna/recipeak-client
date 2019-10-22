import React, { Component } from 'react';
import PrimaryNav from '../navigation/PrimaryNav/PrimaryNav';

export default class Header extends Component {

  render() {
    return (
      <nav className="Header">
        <h1>Recipeak - Cook, Eat, Grow</h1>
        <PrimaryNav />
      </nav>
    )
  }

}