import React, { Component } from 'react'

export default class RecipesForm extends Component {
  render() {
    return (
      <section className="ingredients">
        <h2>Ingredients</h2>
        <h3>Entered Ingredients</h3>
        <ul className="entered-ingredients">
          <li>
            [Amount] of [Ingredient1] <a href="#">Edit</a>/<a href="#">Delete</a>
          </li>
          <li>
            [Amount] of [Ingredient2] <a href="#">Edit</a>/<a href="#">Delete</a>
          </li>
        </ul>
        <label for="amount">Amt</label>
        <select name="amount">
          <option>- Select a Unit -</option>
          <option>Basic Units (1x, 2x...)</option>
          <option>Pinch (1 pinch of, 2 pinches of...)</option>
          <option>Splash (A splash of, 2 splashes of...)</option>
          <option>Sprinkle (A sprinkle of, 2 sprinkles of...)</option>
          <option>Drop (A drop of, 2 drops of...)</option>
          <option>Part (1 part of, 2 parts of...)</option>

          <optgroup label="US Measurements">
            <option value="oz">oz</option>
            <option value="lb">lb</option>
            <option value="tsp">tsp</option>
            <option value="tbsp">tbsp</option>
            <option value="floz">fl oz</option>
            <option value="cup">cup</option>
            <option value="pt">pt</option>
            <option value="qrt">qrt</option>
            <option value="gal">gal</option>
          </optgroup>
          <optgroup label="Metric Measurements">
            <option value="mg">mg</option>
            <option value="g">g</option>
            <option value="kg">kg</option>
            <option value="ml">ml</option>
            <option value="l">l</option>
            <option value="dl">dl</option>
          </optgroup>
        </select>
        <label for="ingredient">Ingredient</label>
        <input type="text" />
        <a href="#">Add Ingredient</a>
      </section>
    )
  };
};