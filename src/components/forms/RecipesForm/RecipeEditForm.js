import React, { Component } from 'react';
import RecipesFormContext, { nullLiveInput, nullRecipe, nullIngredient, } from '../../../contexts/RecipesFormContext';
import DeleteRecipeConfirm from '../../modals/DeleteRecipeConfirm';
import IngredientsForm from './IngredientsForm/IngredientsForm';
import '../forms.css'
import { PrepTimeDisplay } from '../../Utils/Utils'

export default class RecipesEditForm extends Component {

  static defaultProps = {
    recipe: nullRecipe,
    ingredientCount: 0,
    ingredients: [],
    currentIngredient: nullIngredient,
    deleteModalIsOpen: false,
  }

  state = {
    recipe: this.props.recipe,
    ingredientCount: this.props.ingredientCount,
    ingredients: this.props.ingredients,
    currentIngredient: this.props.currentIngredient,
    showDeleteModal: false
  }

  static contextType = RecipesFormContext;

  componentDidMount() {
    this.setState({
      recipe: this.props.recipe,
      ingredientCount: this.props.ingredientCount,
      ingredients: this.props.ingredients,
      currentIngredient: this.props.currentIngredient,
    })
  }

  componentWillUnmount() {
    this.context.clearForm();
  }

  render() {
    const {
      updateRecipeField,
      updateIngredientField,
      onSubmit,
      currentIngredient,
      addIngredient,
      removeIngredient,
    } = this.context;

    const {
      recipe,
      ingredients
    } = this.props;

    console.log(recipe.prep_time_hours.toString());
    return (
      <form
        className='NewRecipeForm'
        onSubmit={e => onSubmit(e)}>
        <BasicInfoFieldset
          nameDefault={recipe.name.value}
          authorDefault={recipe.author.value}
          servingsDefault={recipe.servings.value}
          updateRecipeField={updateRecipeField}
        />
        <fieldset>
          <legend>Prep Time</legend>
          <PrepTimeDisplay hours={recipe.prep_time_hours} minutes={recipe.prep_time_minutes} />
          <Input
            updateField={updateRecipeField}
            defaultValue={!recipe.prep_time_hours ? null : recipe.prep_time_hours}
            inputId='prep_time_hours'
            inputLabel='Hours'
            inputType='number'
            max='59' />
          <Input
            updateField={updateRecipeField}
            defaultValue={!recipe.prep_time_minutes ? null : recipe.prep_time_minutes}
            inputId='prep_time_minutes'
            inputLabel='Minutes'
            inputType='number'
            max='59' />
        </fieldset>
        <IngredientsForm
          ingredients={ingredients}
          currentIngredient={currentIngredient}
          addIngredient={addIngredient}
          removeIngredient={removeIngredient}
          updateIngredientField={updateIngredientField}
        />
        <TextArea
        updateField={updateRecipeField}
        defaultValue={!recipe.instructions ? null : recipe.instructions}
        areaId='instructions'
        areaLabel='Instructions' />
        <button type='submit'>Submit</button>
        {/*TODO delete recipe handler*/}
        <a>Delete Recipe</a>
        <DeleteRecipeConfirm recipeId={recipe.id} show={this.state.showDeleteModal}/>
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
      <input
        type={inputType}
        max={max ? max : null}
        required={required ? true : false}
        name={inputName}
        id={inputId}
        defaultValue={defaultValue}
        onChange={e => updateField(inputName, e.target.value)} />
    </>
  )
}

function TextArea(props) {
  const { defaultValue, updateField, areaId, areaLabel } = props;
  const areaName = `RecipesForm__${areaId}`
  return (
    <>
      <label htmlFor={areaName}>{areaLabel}</label>
      <textarea
        className='RecipesForm__TextArea'
        defaultValue={defaultValue}
        id={areaId}
        onChange={e => updateField(areaName, e.target.value)}>
      </textarea>
    </>
  )
}

function BasicInfoFieldset(props) {
  const { updateRecipeField, nameDefault, authorDefault, servingsDefault } = props;

  return (
    <fieldset className='RecipesForm__basic-info'>
      <legend>Basic Info</legend>
      <Input
        updateField={updateRecipeField}
        defaultValue={nameDefault}
        inputId='name'
        inputName='name'
        inputType='text'
        inputLabel='Recipe Name'
      />
      <Input
        updateField={updateRecipeField}
        defaultValue={authorDefault}
        inputId='author'
        inputName='author'
        inputType='text'
        inputLabel='Author'
      />
      <Input
        updateField={updateRecipeField}
        defaultValue={servingsDefault}
        inputId='servings'
        inputName='servings'
        inputType='number'
        inputLabel='Servings'
      />
    </fieldset>
  )
}