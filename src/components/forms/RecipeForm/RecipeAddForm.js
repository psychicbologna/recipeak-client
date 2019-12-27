import React, { Component } from 'react';
import RecipeFormContext, { nullLiveInput, nullIngredient } from '../../../contexts/RecipeFormContext';
import DeleteRecipeConfirm from '../../modals/DeleteRecipeConfirm';

//TODO refactor with utils

export default class RecipesAddForm extends Component {
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

  static contextType = RecipeFormContext;

  componentWillUnmount() {
    this.context.clearForm();
  }

  render() {
    const {
      updateServings,
      updateAuthor,
      updateName,
      updatePrepTimeHours,
      updatePrepTimeMinutes,
      updateInstructions,
      toggleModal
    } = this.context;

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
          updateName={updateName}
        />
        <fieldset>
          <legend>Prep Time</legend>
          <Input
            updateField={updatePrepTimeHours}
            defaultValue={null}
            inputId='prep_time_hours'
            inputLabel='Hours'
            inputType='number'
            max='59'
            parentForm='RecipeAddForm'
            />
          <Input
            updateField={updatePrepTimeMinutes}
            defaultValue={null}
            inputId='prep_time_minutes'
            inputLabel='Minutes'
            inputType='number'
            max='59'
            parentForm='RecipeAddForm'
            />
        </fieldset>
        {/* <IngredientsFieldset
          ingredients={ingredients}
          currentIngredient={currentIngredient}
          addIngredient={addIngredient}
          removeIngredient={removeIngredient}
          updateAmount={updateAmount}
          updateIngText={updateIngText}
        /> */}
        <TextArea updateField={updateInstructions} defaultValue='Instructions go here.' areaId='instructions' areaLabel='Instructions' />
        <button type='submit'>Submit</button>
        <DeleteRecipeConfirm recipeId={this.props.recipeId} show={this.context.deleteModalIsOpen} onClose={toggleModal} />
      </form >
    )
  }
};

function Input(props) {
  const { defaultValue, updateField, inputId, inputLabel, inputType, required, max } = props;
  const inputName = `RecipesForm__${inputId}`;

  return (
    <>
      <label htmlFor={inputName} className='RecipesForm__TextInput'>{inputLabel}</label>
      <input type={inputType} max={max ? max : null} required={required ? true : false} name={inputName} id={inputId} defaultValue={defaultValue} onChange={e => updateField(e.target.value)} /> {/* TODO: Validate: Must be text, more than 3 chars */}
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
      <Input
        updateField={updateName} defaultValue={nameDefault}
        inputId='name'
        inputType='text'
        inputLabel='Recipe Name'
        parentForm='RecipeAddForm'
        />
      <Input
        updateField={updateAuthor}
        defaultValue={authorDefault}
        inputId='author'
        inputType='text'
        inputLabel='Author'
        parentForm='RecipeAddForm'
        />
      <Input
      updateField={updateServings}
      defaultValue={servingsDefault}
      inputId='servings'
      inputType='number'
      inputLabel='Servings'
      parentForm='RecipeAddForm'
      />
    </fieldset>
  )
}