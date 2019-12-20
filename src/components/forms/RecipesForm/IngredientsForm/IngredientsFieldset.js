import React, { Component } from 'react';
import UnitSelect from './IngredientsForm/UnitSelect';
import Ingredient from '../../Recipes/Recipe/Ingredient';
import UnitApiService from '../../../services/unit-api-service';
import UnitContext from '../../../contexts/UnitContext';

export default class IngredientsFieldset extends Component {

  static contextType = UnitContext;

  componentDidMount() {
    UnitApiService.getUnits()
      .then(this.context.setUnits)
      .catch(this.setState({
        hasError: true,
        error: { message: 'Unable to retrieve unit data.' }
      }));
  }

  render() {
    const { ingredients, currentIngredient, addIngredient, removeIngredient, updateAmount, updateIngText, disabled } = this.props;
    console.log(ingredients);
    return (
      <fieldset
        className='IngredientForm'
        disabled={disabled}
      >
        <EnteredIngredients ingredients={ingredients} removeIngredient={removeIngredient} units={this.context.units} />
        <fieldset className='RecipeForm__AddIngredient'>
          <legend>Add Ingredient</legend>
          <AmountInput updateAmount={updateAmount} />
          <UnitSelect units={this.context.units} />
          <IngTextInput updateIngText={updateIngText} />
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
                key={ingredient.tempId || ingredient.id}
                ingredient={ingredient}
                removeIngredient={props.removeIngredient}
                removeId={ingredient.tempId || ingredient.id} />
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