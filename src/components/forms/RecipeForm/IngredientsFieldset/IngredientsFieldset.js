import React, { Component } from 'react';
import RecipeFormContext from '../../../../contexts/RecipeFormContext';
import UnitSelect from './UnitSelect';
import IngredientsList from '../../../Recipes/Recipe/Ingredients/IngredientsList';
import { Input, Button } from '../../../Utils/Utils'

export default class IngredientsFieldset extends Component {

  static contextType = RecipeFormContext;

  static defaultProps = {
    disabled: false
  }

  render() {
    const { ingredients, currentIngredient, handleAddIngredient, handleEditIngredient, handleDeleteIngredient, updateIngredientField, disableFieldsets } = this.context;

    //TODO button context based on edit/add
    //TODO toggle ingredient options (currently just set to 'true')
    return (
      <fieldset
        className='IngredientFieldset'
      >
        <IngredientsList
          ingredients={ingredients}
          onDeleteIngredient={handleDeleteIngredient}
          onEditIngredient={handleEditIngredient}
          showIngredientOptions={true}
          />
        <fieldset
          className='RecipeForm__AddIngredient'
          disabled={disableFieldsets}
          >
          <legend>Add Ingredient</legend>
          <Input
            defaultValue={currentIngredient.amount.value}
            updateField={updateIngredientField}
            inputId='amount'
            inputLabel='Amount'
            inputType='number'
          />
          <UnitSelect />
          <Input
            defaultValue={currentIngredient.ing_text.value}
            updateField={updateIngredientField}
            inputId='ing_text'
            inputLabel='Ingredient'
            inputType='text'
          />
          <Button
            onClick={event => handleAddIngredient(event, currentIngredient)}>Add Ingredient
          </Button>
          <Button
          onClick={event => handleEditIngredient(event, currentIngredient)}>
            Edit Ingredient
          </Button>
        </fieldset>
      </fieldset>
    )
  };
};