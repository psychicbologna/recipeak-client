import React, { Component } from 'react';
import UnitSelect from './UnitSelect';
import Ingredient from '../../../../components/Recipes/Recipe/Ingredient'

export default class IngredientsForm extends Component {

  static defaultProps = {
    ingredients: [],
    addIngredients: [],
    deleteIngredients: [],
    updateIngredients: [],
    recipe_id: '',
    newIngredient: {
      amount: '', //ing
      ingredient: '',
      unit_set: '',
      unit_data: {
        unit_singular: '',
        unit_plural: '',
      }
    }, //json!
    deleteIngredient: '', //Ingredient id
    updateIngredient: {
      id: '',
      recipe_id: '',
      amount: '', //ing
      ingredient: '',
      unit_set: '',
      unit_data: {
        unit_singular: '',
        unit_plural: '',
      }, //json!
    },
    setInitIngredients: () => { },
    handleAddIngredient: () => { },
    handleRemoveIngredient: () => { },
    handleRemoveAllIngredients: () => {},
    handleUpdateIngredient: () => { },
    clearIngredientInputs: () => { },
  }

  setInitIngredients(ingredientsList) {
    this.setState({ ingredients: ingredientsList });
  }

  //TODO function that clears recipe form inputs
  clearIngredientInputs() {
    //clear ingredient form inputs:
    /*
    amount,
    ingredient,
    unit_singular,
    unit_plural,
    unit_set:none
    */
  }


  addNewIngredient(newIngredients, ingredients, newIngredient) {

    //TODO TypeError: undefined is not iterable (cannot read property Symbol(Symbol.iterator))
    // let newIngredients = [...newIngredients, newIngredient]
    // this.setState({ingredients: [ ...ingredients, newIngredient ] })
    // this.clearIngredientInputs();
    // this.renderEnteredIngredients(ingredients);
  }

  removeIngredient(deleteIngredients, ingredients, id) {
    this.setState({ ingredients: ingredients.filter(id) })
    this.renderEnteredIngredients(ingredients);
  }

  renderEnteredIngredients(ingredients) {
    return (
      <section>
        <h3>Entered Ingredients</h3>
        <ul className='entered-ingredients'>
          {ingredients.map(ingredient => {
            return (
              <Ingredient ingredientdata={ingredient}>
                <button onClick={this.handleRemoveIngredient()}></button>
              </Ingredient>
            );
          })}
        </ul>
      </section>
    )
  }

  //TODO move to utils for input
  renderIngredientInput() {
    return (
      <>
        <label htmlFor='IngredientForm__ingredient'>Ingredient</label>
        <input className='IngredientForm__ingredient' />
      </>
    )
  }

  renderAmountInput() {
    return(
      <>
        <label htmlFor='IngredientForm__amount'>Amount</label>
        <input type='number' className='IngredientForm__amount' />
      </>
    )
  }

  render() {
    console.log(this.props.ingredients);
    return (
      <section className='IngredientForm'>
        <h3>Ingredients</h3>
        {
          !this.props.ingredients.length
            ? <p>Enter an ingredient to get started.</p>
            : this.renderEnteredIngredients(this.props.ingredients)
        }
        <h3>Add Ingredient</h3>
        {this.renderAmountInput()}
        <UnitSelect />
        {this.renderIngredientInput()}
        <button onClick={this.addNewIngredient()}>Add Ingredient</button>
      </section>
    )
  };
};

function UnitSetToggle() {
  this.setState(!this.state.unitSetsToggle)
}

function USMetricToggle() {
  this.setState(!this.state.usMetricToggle)
}

