import React, { Component } from 'react';
import RecipeAddForm from '../../components/forms/RecipeForm/RecipeAddForm';

export default class RecipeAddPage extends Component {

  render() {
    return (
      <section className='RecipeAdd'>
        <h3>Add Recipe</h3>
        <RecipeAddForm />
      </section>
    )
  }
}