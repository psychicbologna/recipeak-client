import React, { Component } from 'react'
import IngredientsForm from './IngredientsForm/IngredientsForm';

export default class RecipesForm extends Component {
  render() {
    return (
      <section className="recipe-form">
        <form id="recipe-add">
          <section className="basic-info">
            <h2>Basic Info</h2>
            <label for="name">Name</label>
            <input name="name" />
            <label for="new-category">Category</label>
            <select name="new-category">
              <option value="none">Uncategorized</option>
              <optgroup label="Mealtime">
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="dessert">Dessert</option>
                <option value="snack">Snack</option>
              </optgroup>
            </select>
            <IngredientsForm />
            <section className="instructions">
              <h2>Instructions</h2>
              <textarea value={ "Instructions go here." }></textarea>
            </section>
      </form>
      </section>
        )
      }
}