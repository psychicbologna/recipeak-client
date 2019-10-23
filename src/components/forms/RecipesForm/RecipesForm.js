import React, { Component } from 'react'
import IngredientsForm from './IngredientsForm/IngredientsForm';

export default class RecipesForm extends Component {

  //TODO handle recipe form submission.
  handleSubmit = ev => {
    ev.preventDefault();
    console.log('handleSubmit firing');
    //const {  } = ev.target
    // fields: name, prep_time, servings, ingredients ([ingredient_id, amount, unit_set, unit_data, ing_text]),
    //RecipeApiService.insertRecipe()
  }

  // componentDidMount() {
  //   UnitApiService.getUnits()
  //     .then(units => console.log(units))
  //     .catch(this.state.setError)
  // }

  render() {
    return (
      <form
        className='RecipesForm'
        onSubmit={this.handleSubmit}>
        <section className='RecipesForm__basic-info'>
          <h4>Basic Info</h4>
          <label htmlFor='RecipesForm__name'>Name</label>
          <input name='RecipesForm__name' id='name' />
          <label htmlFor='RecipesForm__prep_time'>Prep Time</label>
          <input name='RecipesForm__prep_time' id='prep_time' />
          <label htmlFor='RecipesForm__servings'>Servings</label>
          <input name='RecipesForm__name' id='servings' />
        </section>
        <IngredientsForm units={this.props.units} onSubmit={this.props.onSubmit} />
        <section className='RecipesForm__'>
          <h2>Instructions</h2>
          <textarea className='RecipesForm__instructions' defaultValue={'Instructions go here.'}></textarea>
        </section>
      </form>
    )
  }
};