import React, { Component } from 'react'
import IngredientsForm from './IngredientsForm/IngredientsForm';
import RecipeApiService from '../../../services/recipes-api-service';

export default class RecipesForm extends Component {
  
  //TODO handle recipe form submission.
  handleSubmit = ev => {
    ev.preventDefault();
    console.log('handleSubmit firing');
    //const {  } = ev.target
    //RecipeApiService.insertRecipe()
  }

  render() {
    return (
        <form
          className="RecipesForm"
          onSubmit={this.handleSubmit}>
          <section className="RecipesForm__basic-info">
            <h2>Basic Info</h2>
            <label htmlFor="RecipesForm__name">Name</label>
            <input name="RecipesForm__name" id="name" />
          </section>
          <section className="ingredients">
            <h2>Ingredients</h2>
            <IngredientsForm />
          </section>
            <section className="RecipesForm__">
              <h2>Instructions</h2>
              <textarea className="RecipesForm__instructions" value={ "Instructions go here." }></textarea>
            </section>
        </form>
        )
  }
};