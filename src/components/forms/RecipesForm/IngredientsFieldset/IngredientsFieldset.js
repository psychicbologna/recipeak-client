import React, { Component } from 'react';
import UnitSelect from './UnitSelect';
import Ingredient from '../../../Recipes/Recipe/Ingredients/Ingredient/Ingredient';
import { Input } from '../../../Utils/Utils'
import UnitContext from '../../../../contexts/UnitContext';

export default class IngredientsFieldset extends Component {

  static contextType = UnitContext;

  render() {
    const { ingredients, currentIngredient, addIngredient, removeIngredient, updateField, disabled } = this.props;
    return (
      <fieldset
        className='IngredientFieldset'
        disabled={disabled}
      >
        <EnteredIngredients ingredients={ingredients} removeIngredient={removeIngredient} units={this.context.units} />
        <fieldset className='RecipeForm__AddIngredient'>
          <legend>Add Ingredient</legend>
          <Input
            defaultValue={currentIngredient.amount.value}
            updateField={updateField}
            inputId='amount'
            inputLabel='Amount'
            inputType='number'
          />
          <UnitSelect units={this.context.units} />
          <Input
            defaultValue={currentIngredient.ing_text.value}
            updateField={updateField}
            inputId='ing_text'
            inputLabel='Ingredient'
            inputType='text'
          />
          <button
            onClick={e => addIngredient(e, currentIngredient)}>Add Ingredient</button>
        </fieldset>
      </fieldset>
    )
  };
};

function EnteredIngredients(props) {
  const ingredients = props.ingredients;

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
                  units={props.units}
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