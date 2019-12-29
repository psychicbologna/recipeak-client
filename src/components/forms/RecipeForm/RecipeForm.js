import React, { Component } from 'react';
import RecipeFormContext, { nullRecipe } from '../../../contexts/RecipeFormContext';
import IngredientsList from '../../Recipes/Recipe/Ingredients/IngredientsList';
import IngredientFieldset from './IngredientFieldset/IngredientFieldset';
import './RecipeForm.css';
import { BasicInfoFieldset, PrepTimeFieldset, TextArea, Button } from '../../Utils/Utils'

export default class RecipeEditForm extends Component {

  static defaultProps = {
    recipe: nullRecipe,
    formName: 'edit',
  }

  state = {
    recipe: this.props.recipe,
    allowIngredientEdits: true,
    showAddIngredientFieldset: false
  }

  static contextType = RecipeFormContext;

  componentWillUnmount() {
    this.context.clearForm();
  }

  handleAddIngredientSubmit = (event, newIngredient) => {
    event.preventDefault();
    const { onAddIngredient } = this.context

    onAddIngredient(newIngredient);
  }

  toggleDisableAddIngredient = () => {
    this.setState({ allowAddIngredient: !this.state.allowAddIngredient })
  }

  // handleEditIngredientSubmit = (event, ingredient) => {
  //   event.preventDefault();
  //   const { currentIngredient, onEditIngredient } = this.context

  //   onEditIngredient(currentIngredient);
  // }

  handle

  render() {
    const { allowIngredientEdits } = this.state;
    const { ingredients, updateRecipeField, onSubmit, disableFieldsets } = this.context;
    const { recipe, formName } = this.props;

    return (
      <form
        className={`Form RecipeForm RecipeForm__${formName}`}
        onSubmit={event => onSubmit(event, 'edit')}
      >
        <BasicInfoFieldset
          nameDefault={recipe.name.value}
          authorDefault={recipe.author.value}
          servingsDefault={recipe.servings.value}
          updateRecipeField={updateRecipeField}
          disabled={disableFieldsets}
        />
        <PrepTimeFieldset
          hoursDefault={recipe.prep_time_hours.value}
          minutesDefault={recipe.prep_time_minutes.value}
          updateRecipeField={updateRecipeField}
          disabled={disableFieldsets}
        />
        <IngredientsList
          allowIngredientEdits={allowIngredientEdits}
          ingredients={ingredients}
          showIngredientOptions={true}
        />

        <IngredientFieldset
          isAdding={true}
          handleSubmit={this.handleAddIngredientSubmit}
          disabled={disableFieldsets}
        />
        <TextArea
          updateField={updateRecipeField}
          defaultValue={!recipe.instructions.value ? null : recipe.instructions.value}
          areaId='instructions'
          areaLabel='Instructions'
          disabled={disableFieldsets}
        />

        <Button
          type='submit'
          disabled={disableFieldsets}
        >
          Submit Recipe
        </Button>
      </form >
    )
  }
};