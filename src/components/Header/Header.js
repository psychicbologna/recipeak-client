import React, { Component } from 'react';
import PrimaryNav from '../navigation/PrimaryNav/PrimaryNav';

export default class Header extends Component {

  render() {
    return (
      <header>
        <h1>Recipeak - Cook, Eat, Grow</h1>
        <PrimaryNav />
      </header>
    )
  }

}