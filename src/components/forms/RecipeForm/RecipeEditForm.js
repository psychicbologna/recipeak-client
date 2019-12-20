import React, { Component } from 'react';
import RecipeFormContext, { nullRecipe, nullIngredient, } from '../../../contexts/RecipeFormContext';
import IngredientsFieldset from './IngredientsFieldset/IngredientsFieldset';
import '../forms.css'
import { BasicInfoFieldset, PrepTimeFieldset, TextArea } from '../../Utils/Utils'

export default class RecipeEditForm extends Component {

  static defaultProps = {
    recipe: nullRecipe,
    ingredientCount: 0,
    ingredients: [],
    currentIngredient: nullIngredient,
    deleteIngredientList: [],
    addIngredientsList: [],
    deleting: false,
  }

  state = {
    recipe: this.props.recipe,
    ingredientCount: this.props.ingredientCount,
    ingredients: this.props.ingredients,
    currentIngredient: this.props.currentIngredient,
    addIngredientsList: this.props.addIngredientList,
    deleteIngredientsList: this.props.deleteIngredientsList,
    deleting: this.props.deleting
  }

  static contextType = RecipeFormContext;

  componentWillUnmount() {
    this.context.clearForm();
  }

  render() {
    const {
      updateRecipeField,
      // updateIngredientField, //TODO moving these to context on IngredientFieldset page.
      onSubmit,
      // currentIngredient,
      // addIngredient,
      // removeIngredient,
    } = this.context;

    const {
      recipe,
      ingredients,
    } = this.props;

    return (
      <form
        className='NewRecipeForm'
        onSubmit={event => onSubmit(event, 'edit')}
      >
        <BasicInfoFieldset
          nameDefault={recipe.name.value}
          authorDefault={recipe.author.value}
          servingsDefault={recipe.servings.value}
          updateRecipeField={updateRecipeField}
          disabled={this.state.deleting}
        />
        <PrepTimeFieldset
          hoursDefault={recipe.prep_time_hours.value}
          minutesDefault={recipe.prep_time_minutes.value}
          updateRecipeField={updateRecipeField}
          disabled={this.state.deleting}
        />
        <IngredientsFieldset
          ingredients={ingredients}
          disabled={this.state.deleting}
        />
        <TextArea
          updateField={updateRecipeField}
          defaultValue={!recipe.instructions.value ? null : recipe.instructions.value}
          areaId='instructions'
          areaLabel='Instructions'
          disabled={this.state.deleting}
        />

        <button type='submit' disabled={this.state.deleting}>
          Submit
        </button>
      </form >
    )
  }
};