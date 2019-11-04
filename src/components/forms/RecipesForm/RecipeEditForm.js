import React, { Component } from 'react';
import RecipesFormContext, { nullLiveInput, nullIngredient } from '../../../contexts/RecipesFormContext';
import DeleteRecipeConfirm from '../../modals/DeleteRecipeConfirm';
import IngredientsForm from './IngredientsForm/IngredientsForm';
import '../forms.css'

export default class RecipesEditForm extends Component {
  static defaultProps = {
    match: { params: {} },
    recipe: {},
    name: nullLiveInput,
    author: nullLiveInput,
    prep_time_hours: nullLiveInput,
    prep_time_minutes: nullLiveInput,
    servings: nullLiveInput,
    instructions: nullLiveInput,
    ingredientCount: 0,
    ingredients: [],
    currentIngredient: nullIngredient,
    deleteModalIsOpen: false,
    error: null,
  }

  static contextType = RecipesFormContext;

  componentWillUnmount() {
    this.context.clearForm();
  }

  render() {
    const {
      recipe,
      updateServings,
      updateAuthor,
      updateName,
      updatePrepTimeHours,
      updatePrepTimeMinutes,
      updateInstructions,
      toggleModal
    } = this.context;

    //TODO parse prep time into hours and minutes.
    console.log(recipe.prep_time)

    return (
      <form
        className='NewRecipeForm'
        onSubmit={e => this.context.handleSubmit(e)}>
        <BasicInfoFieldset
          nameDefault={recipe.name}
          authorDefault={recipe.author}
          servingsDefault={recipe.servings}
          updateServings={updateServings}
          updateAuthor={updateAuthor}
          updateName={updateName} />
        <fieldset>
          <legend>Prep Time</legend>
          <Input updateField={updatePrepTimeHours} defaultValue={recipe.hours} inputId='prep_time_hours' inputLabel='Hours' inputType='number' max='59' />
          <Input updateField={updatePrepTimeMinutes} defaultValue={recipe.minutes} inputId='prep_time_minutes' inputLabel='Minutes' inputType='number' max='59' />
        </fieldset>
        {/*TODO units not passing to select form, make part of recipe/recipeform context? */}
        <IngredientsForm units={this.props.units} ingredients={this.props.ingredients} />
        <TextArea updateField={updateInstructions} defaultValue={recipe.instructions} areaId='instructions' areaLabel='Instructions' />
        <button type='submit'>Submit</button>
        {/*TODO delete recipe handler*/}
        <a>Delete Recipe</a>
        <DeleteRecipeConfirm recipeId={this.props.recipe.id} show={this.context.deleteModalIsOpen} onClose={toggleModal} />
      </form >
    )
  }
};

function Input(props) {
  const { defaultValue, updateField, inputId, inputLabel, inputType, required, max=null } = props;
  const inputName = `RecipesForm__${inputId}`;

  return (
    <>
      <label htmlFor={inputName} className='RecipesForm__TextInput'>{inputLabel}</label>
      <input type={inputType} max={max} required={required ? true : false} name={inputName} id={inputId} defaultValue={defaultValue} onChange={e => updateField(e.target.value)} /> {/* TODO: Validate: Must be text, more than 3 chars */}
    </>
  )
}

function TextArea(props) {
  const { defaultValue, updateField, areaId, areaLabel } = props;
  const areaName = `RecipesForm__${areaId}`
  return (
    <>
      <label htmlFor={areaName}>{areaLabel}</label>
      <textarea className='RecipesForm__TextArea' defaultValue={defaultValue} id={areaId} onChange={e => updateField(e.target.value)}></textarea>
    </>
  )
}

function BasicInfoFieldset(props) {
  const { updateName, nameDefault, updateAuthor, authorDefault, updateServings, servingsDefault } = props;

  return (
    <fieldset className='RecipesForm__basic-info'>
      <legend>Basic Info</legend>
      <Input updateField={updateName} defaultValue={nameDefault} inputId='name' inputType='text' inputLabel='Recipe Name' />
      <Input updateField={updateAuthor} defaultValue={authorDefault} inputId='author' inputType='text' inputLabel='Author' />
      <Input updateField={updateServings} defaultValue={servingsDefault} inputId='servings' inputType='number' inputLabel='Servings' />
    </fieldset>
  )
}