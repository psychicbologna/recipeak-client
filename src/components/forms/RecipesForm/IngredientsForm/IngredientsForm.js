import React, { Component } from 'react';
import UnitSelect from './UnitSelect';
import Ingredient from '../../../Recipes/Recipe/Ingredient'
import RecipesFormContext from '../../../../contexts/RecipesFormContext'

export default class IngredientsForm extends Component {

  static contextType = RecipesFormContext;

  render() {
    const { ingredients, currentIngredient } = this.context;

    return (
      <section className='IngredientForm'>
        <EnteredIngredients ingredients={ingredients} removeIngredient={this.context.removeIngredient} units={this.props.units} />
        <fieldset className='RecipeForm__AddIngredient'>
          <legend>Add Ingredient</legend>
          <AmountInput updateAmount={this.context.updateAmount} />
          <UnitSelect units={this.props.units} />
          <IngTextInput updateIngText={this.context.updateIngText} />
          <button
            onClick={e => this.context.addIngredient(e, currentIngredient)}>Add Ingredient</button>
        </fieldset>
      </section>
    )
  };
};

function EnteredIngredients(props) {
  const ingredients = props.ingredients;

  if (!ingredients.length) {
    return <p>Enter an ingredient to get started.</p>
  } else {
    return (
      <section>
        <h3>Ingredients Preview</h3>
        <ul className='entered-ingredients'>
          {ingredients.map(ingredient => {
            return (
              <Ingredient
                units={props.units}
                key={ingredient.tempId}
                ingredient={ingredient}
                removeIngredient={props.removeIngredient}>

                <button onClick={e => props.removeIngredient(props.key)}></button>
              </Ingredient>
            );
          })}
        </ul>
      </section>
    )
  }
}

function AmountInput(props) {
  return (
    <>
      <label htmlFor='IngredientForm__amount'>Amount</label>
      <input type='number' className='IngredientForm__amount' id='amount' onChange={e => props.updateAmount(e.target.value)} /> {/* //TODO Validate cannot be negative */}
    </>
  )
}

function IngTextInput(props) {
  return (
    <>
      <label htmlFor='IngredientForm__ingredient'>Ingredient</label>
      <input className='IngredientForm__ingredient' id='ing_text' onChange={e => props.updateIngText(e.target.value)} />
    </>
  )
}