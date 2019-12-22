import React, { Component } from 'react';
import RecipeFormContext from '../../../../contexts/RecipeFormContext';
import UnitSelect from './UnitSelect';
import Ingredient from '../../../Recipes/Recipe/Ingredients/Ingredient/Ingredient';
import { Input } from '../../../Utils/Utils'

export default class IngredientsFieldset extends Component {

  static contextType = RecipeFormContext;

  render() {
    const { ingredients, currentIngredient, handleAddIngredient, handleEditIngredient, handleDeleteIngredient, updateIngredientField } = this.context;
    const { disabled } = this.props;

    //TODO button context based on edit/add
    return (
      <fieldset
        className='IngredientFieldset'
        disabled={disabled}
      >
        <EnteredIngredients
          ingredients={ingredients}
          onDeleteIngredient={handleDeleteIngredient}
          onEditIngredient={handleEditIngredient} />
        <fieldset className='RecipeForm__AddIngredient'>
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
          <button
            onClick={event => handleAddIngredient(event, currentIngredient)}>Add Ingredient
          </button>
          <button
          onClick={event => handleEditIngredient(event, currentIngredient)}>
            Edit Ingredient
          </button>
        </fieldset>
      </fieldset>
    )
  };
};

function EnteredIngredients(props) {
  const { ingredients, units } = props;

  if (!ingredients.length) {
    return <p>Enter an ingredient to get started. Recipes must be submitted with at least one ingredient.</p>
  } else {
    return (
      <section className="RecipeForm__ingredients-preview">
        <h3>Ingredients Preview</h3>
        <ul className='RecipeForm__ingredients-list'>
          {ingredients.map(ingredient => {
            return (
              <Ingredient
                key={ingredient.id}
                units={units}
                ingredient={ingredient}
                form={true}
              />
            );
          })}
        </ul>
      </section>
    )
  }
}