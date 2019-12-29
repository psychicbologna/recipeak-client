import React, { Component } from 'react';
import RecipeForm from '../../components/forms/RecipeForm/RecipeForm';


//TODO configure state and callbacks by adding necessary elements from edit
export default class RecipeAddPage extends Component {

  render() {
    return (
      <section className='RecipeAdd'>
        <h3>Add Recipe</h3>
        <RecipeForm
          // disabled={disable}
          formName='add'
        />
      </section>
    )
  }
}