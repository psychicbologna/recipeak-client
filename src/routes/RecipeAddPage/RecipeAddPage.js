import React, { Component } from 'react';
import RecipesAddForm from '../../components/forms/RecipesForm/RecipesAddForm';

export default class RecipeAddPage extends Component {
  render() {
    return (
      <section className='RecipeAdd'>
        <h3>Add Recipe</h3>
        <RecipesAddForm units={this.props.units} />
      </section>
    )
  }
}