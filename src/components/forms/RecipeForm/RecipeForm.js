import React, { Component } from 'react';
import RecipeFormContext, { nullRecipe } from '../../../contexts/RecipeFormContext';
import IngredientsList from '../../Recipes/Recipe/Ingredients/IngredientsList/IngredientsList';
import BasicInfoFieldset from './BasicInfoFieldset/BasicInfoFieldset';
import PrepTimeFieldset from './PrepTimeFieldset/PrepTimeFieldset';
import IngredientFieldset from './IngredientFieldset/IngredientFieldset';
import './RecipeForm.css';
import { TextArea, Button } from '../../Utils/Utils'

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

  handleAddIngredientSubmit = (newIngredient) => {
    const { onAddIngredient } = this.context
    onAddIngredient(newIngredient)
  }

  toggleDisableAddIngredient = () => {
    this.setState({ allowAddIngredient: !this.state.allowAddIngredient })
  }

  render() {
    const { allowIngredientEdits } = this.state;
    const { ingredients, updateRecipeField, disableFieldsets } = this.context;
    const { recipe, formName, onSubmit, } = this.props;

    return (

      <form
        className={`Form RecipeForm RecipeForm__${formName}`}
        onSubmit={event => onSubmit(event)}
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
          onSubmit={this.handleAddIngredientSubmit}
          disabled={disableFieldsets}
        />
        <fieldset
          className='Fieldset Fieldset__Instructions'
          id='instructions_fieldset'
          disabled={disableFieldsets}>
          <legend>Instructions</legend>
          <TextArea
            updateField={updateRecipeField}
            defaultValue={!recipe.instructions.value ? null : recipe.instructions.value}
            areaId='instructions'
            areaLabel='Description'
            disabled={disableFieldsets}
          />
        </fieldset>

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