import React, { Component } from 'react';
import RecipesForm from '../../components/forms/RecipesForm/IngredientsForm/IngredientsForm';

export default class RecipeAddPage extends Component {
  render() {
    return (
      <section className='RecipeAdd'>
        <h3>Add Recipe</h3>
        <RecipesForm />
      </section>
    )
  }
}