import React, { Component } from 'react';
import RecipesForm from '../../components/forms/RecipesForm/RecipesForm';

export default class RecipeAddPage extends Component {
  render() {
    return (
      <section className='RecipeAdd'>
        <h3>Add Recipe</h3>
        <RecipesForm units={this.props.units} />
      </section>
    )
  }
}