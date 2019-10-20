import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../navigation.css';

//Stateful component

export default class PrimaryNav extends Component {
  render() {
    return (
      <ul className='user-home-menu'>
        <li>
          <Link to='/recipes/add'>
            Add Recipe
          </Link>
        </li>
        <li>
          <label htmlFor="category">List by Category (Nonfunctional):</label>
          <select name="category">
            <option value="all">- Show All-</option>
            <option value="none">Uncategorized</option>
            <optgroup label="Meal">
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="dessert">Dessert</option>
              <option value="snack">Snack</option>
            </optgroup>
          </select>
        </li>
        <li>
          <label htmlFor="rating">List by Rating (Nonfunctional):</label>
          <input type="radio" id="unrated" name="rating" value="unrated" />
          <label htmlFor="unrated">Unrated</label>
          <input type="radio" id="1" name="rating" value="1" />
          <label htmlFor="1">1</label>
          <input type="radio" id="2" name="rating" value="2" />
          <label htmlFor="2">2</label>
          <input type="radio" id="3" name="rating" value="3" />
          <label htmlFor="3">3</label>
          <input type="radio" id="4" name="rating" value="4" />
          <label htmlFor="4">4</label>
          <input type="radio" id="5" name="rating" value="5" />
          <label htmlFor="5">5</label>
        </li>
        <li>
          Measurements:
          <a href="metric">Metric</a>/<a href="us">US</a>
        </li>
      </ul>
    )
  }
};