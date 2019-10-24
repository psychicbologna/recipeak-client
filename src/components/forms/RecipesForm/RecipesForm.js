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
        className='RecipesForm'
        onSubmit={this.context.handleSubmit}>
        <section className='RecipesForm__basic-info'>
          <h4>Basic Info</h4>
          <label htmlFor='RecipesForm__name'>Name</label>
          <input name='RecipesForm__name' id='name' onChange={e => this.context.updateName(e.target.value)} />
          <label htmlFor='RecipesForm__prep_time'>Prep Time</label>
          <input name='RecipesForm__prep_time' id='prep_time' onChange={e => this.context.updatePrepTime(e.target.value)} />
          <label htmlFor='RecipesForm__servings'>Servings</label>
          <input name='RecipesForm__name' id='servings' onChange={e => this.context.updateServings(e.target.value)} />
        </section>
        <IngredientsForm units={this.props.units} onSubmit={this.props.onSubmit} />
        <section className='RecipesForm__'>
          <h2>Instructions</h2>
          <textarea className='RecipesForm__instructions' defaultValue='Instructions go here.' id='instructions' onChange={e => this.context.updateInstructions(e.target.value)}></textarea>
        </section>
      </form>
    )
  }
};