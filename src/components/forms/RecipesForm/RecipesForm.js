import React, { Component } from 'react';
import RecipesFormContext, { nullLiveInput } from '../../../contexts/RecipesFormContext'
import IngredientsForm from './IngredientsForm/IngredientsForm';

export default class RecipesForm extends Component {
  static defaultProps = {
    match: { params: {} }
  }

  static contextType = RecipesFormContext;

  componentWillUnmount() {
    this.context.clearForm();
  }

  render() {
    console.log('Context:', this.context);
    return (
      <form
        className='NewRecipeForm'
        onSubmit={e => this.context.handleSubmit(e)}>
        <section className='RecipesForm__basic-info'>
          <h3>Basic Info</h3>
          <label htmlFor='RecipesForm__name'>Recipe Name</label>
          <input name='RecipesForm__name' id='name' defaultValue='Bacon Waffles with Butter' onChange={e => this.context.updateName(e.target.value)} /> {/* TODO: Validate: Must be text */}
          
          <fieldset>
            <legend>Prep Time</legend>
          <label htmlFor='RecipesForm__prep_time_hours'>Hours</label>
          <input type='number' name='RecipesForm__prep_time_hours' id='prep_time_hours' defaultValue='0' onChange={e => this.context.updatePrepTimeHours(e.target.value)} /> {/* TODO: Validate: Must be integer, may be 0 or null. */}
          <label htmlFor='RecipesForm__prep_time_minutes'>Minutes</label>
          <input type='number' max='59' name='RecipesForm__prep_time_minutes' id='prep_time_minutes' defaultValue='0' onChange={e => this.context.updatePrepTimeMinutes(e.target.value)} /> {/* TODO: Validate: Must be integer, may be 0 or null. */}
          </fieldset>

          <label htmlFor='RecipesForm__servings'>Servings</label>
          <input type='number' name='RecipesForm__name' id='servings' onChange={e => this.context.updateServings(e.target.value)} /> {/* TODO: Validate: whole numbers only, no half or fractional servings */}
        </section>
        <IngredientsForm units={this.props.units} onSubmit={this.props.onSubmit} />
        <section className='RecipesForm__'>
          <h3>Instructions</h3>
          <textarea className='RecipesForm__instructions' defaultValue='Instructions go here.' id='instructions' onChange={e => this.context.updateInstructions(e.target.value)}></textarea>
        </section>
        
      </form>
    )
  }
};