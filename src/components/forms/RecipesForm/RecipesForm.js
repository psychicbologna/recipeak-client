import React, { Component } from 'react';
import RecipesFormContext, { nullLiveInput } from '../../../contexts/RecipesFormContext'
import IngredientsForm from './IngredientsForm/IngredientsForm';
import '../forms.css'

export default class RecipesForm extends Component {
  static defaultProps = {
    match: { params: {} }
  }

  static contextType = RecipesFormContext;

  componentWillUnmount() {
    this.context.clearForm();
  }

  render() {
    const { updateServings, updateAuthor, updateName, updatePrepTimeHours, updatePrepTimeMinutes, updateInstructions } = this.context;
    return (
      <form
        className='NewRecipeForm'
        onSubmit={e => this.context.handleSubmit(e)}>
        <BasicInfoFieldset
          nameDefault='Recipe Name...'
          authorDefault='Author Here...'
          servingsDefault={null}
          updateServings={updateServings}
          updateAuthor={updateAuthor}
          updateName={updateName} />
        <fieldset>
          <legend>Prep Time</legend>
          <PrepHoursInput updatePrepTimeHours={updatePrepTimeHours} defaultValue={null} />
          <PrepMinutesInput updatePrepTimeMinutes={updatePrepTimeMinutes} defaultValue={null} />
        </fieldset>
        <IngredientsForm units={this.props.units} />
        <InstructionsInput updateInstructions={updateInstructions} defaultValue='Instructions go here.' />
        <button type='submit'>Submit</button>
      </form >
    )
  }
};

function NameInput(props) {
  return (
    <>
      <label htmlFor='RecipesForm__name'>Recipe Name</label>
      <input required name='RecipesForm__name' id='name' defaultValue={props.defaultValue} onChange={e => props.updateName(e.target.value)} /> {/* TODO: Validate: Must be text, more than 3 chars */}
    </>
  )
}

function AuthorInput(props) {
  return (
    <>
      <label htmlFor='RecipesForm__author'>Recipe Author</label>
      <input required name='RecipesForm__author' id='author' defaultValue={props.defaultValue} onChange={e => props.updateAuthor(e.target.value)} /> {/* TODO: Validate: Must be text, more than 3 chars */}
    </>
  )
}

function PrepHoursInput(props) {
  return (
    <>
      <label htmlFor='RecipesForm__hours'>Hours</label>
      <input type='number' name='RecipesForm__author' id='author' defaultValue={props.defaultValue} onChange={e => props.updatePrepTimeHours(e.target.value)} /> {/* TODO: Validate: Must be text, more than 3 chars */}
    </>
  )
}

function PrepMinutesInput(props) {
  return (
    <>
      <label htmlFor='RecipesForm__minutes'>Minutes</label>
      <input type='number' max='59' name='RecipesForm__prep_time_minutes' id='prep_time_minutes' defaultValue={props.defaultValue} onChange={e => props.updatePrepTimeMinutes(e.target.value)} /> {/* TODO: Validate: Must be integer, may be 0 or null. */}
    </>
  )
}

function ServingsInput(props) {
  return (
    <>
      <label htmlFor='RecipesForm__servings'>Servings</label>
      <input type='number' name='RecipesForm__name' id='servings' defaultValue={props.defaultValue} onChange={e => props.updateServings(e.target.value)} /> {/* TODO: Validate: whole numbers only, no half or fractional servings */}
    </>
  )
}

function InstructionsInput(props) {
  return (
    <>
      <label htmlFor='RecipesForm__instructions'>Instructions</label>
      <textarea className='RecipesForm__instructions' defaultValue={props.defaultValue} id='instructions' onChange={e => props.updateInstructions(e.target.value)}></textarea>
    </>
  )
}

function BasicInfoFieldset(props) {
  return (
    <fieldset className='RecipesForm__basic-info'>
      <legend>Basic Info</legend>
      <NameInput updateName={props.updateName} defaultValue={props.nameDefault} />
      <AuthorInput updateAuthor={props.updateAuthor} defaultValue={props.authorDefault} />
      <ServingsInput updateServings={props.updateServings} defaultValue={props.servingsDefault} />
    </fieldset>
  )
}