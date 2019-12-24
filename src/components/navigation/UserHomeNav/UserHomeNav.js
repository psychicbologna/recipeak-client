import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './UserHomeNav.css';

export default class UserHomeNav extends Component {
  render() {
    return (
      <ul className='UserHomeNav__List'>
        <li className='UserHomeNav__ListItem'>
          <Link className='Button' to='/recipes/add'>
            Add Recipe
          </Link>
        </li>
      </ul>
    )
  }
};