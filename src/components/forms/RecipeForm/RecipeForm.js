import React, { Component } from 'react';
import RecipeFormContext, { nullRecipe } from '../../../contexts/RecipeFormContext';
import IngredientsList from '../../Recipes/Recipe/Ingredients/IngredientsList';
import IngredientFieldset from './IngredientFieldset/IngredientFieldset';
import '../forms.css';
import './RecipeForm.css';
import { BasicInfoFieldset, PrepTimeFieldset, TextArea, Button } from '../../Utils/Utils'

export default class RecipeEditForm extends Component {

  static defaultProps = {
    recipe: nullRecipe,
    formName: 'edit'
  }

  state = {
    recipe: this.props.recipe,
    addingIngredient: false
  }

  static contextType = RecipeFormContext;

  componentWillUnmount() {
    this.context.clearForm();
  }

  handleAddingIngredient = ingredientId => {

  }

  render() {
    const { ingredients, updateRecipeField, onSubmit, disableFieldsets } = this.context;
    const { recipe, formName } = this.props;
    const { addingIngredient } = this.state;

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
          ingredients={ingredients}
          showIngredientOptions={true}
        />
        {addingIngredient ? < IngredientFieldset method='add' /> : null}
        <TextArea
          updateField={updateRecipeField}
          defaultValue={!recipe.instructions.value ? null : recipe.instructions.value}
          areaId='instructions'
          areaLabel='Instructions'
          disabled={disableFieldsets}
        />

        <Button type='submit' disabled={disableFieldsets}>
          Submit Recipe
        </Button>
      </form >
    )
  }
};