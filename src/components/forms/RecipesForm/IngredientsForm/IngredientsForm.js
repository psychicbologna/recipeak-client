import React, { Component } from 'react';
import UnitService from '../../../../services/unit-service';
import Ingredient from '../../../../components/Recipes/Recipe/Ingredient'

//TODO api call units
//TODO ingredients context

export default class IngredientsForm extends Component {
  static defaultProps = {
    ingredients: [],
    recipe_id: '',
    newIngredient: {
      unit_set: '',
      unit_data: {
        unit_singular:'',
        unit_plural:'',
      }, //json!
    },
    units: {
      unit_id: '', //integer
      unit_set: '',
      unit_data: {},
    }
  }

  renderEnteredIngredients(ingredients) {
    return (
      <section>
        <h3>Entered Ingredients</h3>
        <ul className='entered-ingredients'>
          {ingredients.map(ingredient => {
            return (
            <Ingredient ingredientdata={ingredient} />
            );
          })}
        </ul>
      </section>
    )
  }

  renderUnitSetSelect(unit_set, unit_data) {
    return (
      //TODO Map to optgroup by unit_data.
      <select className='IngredientForm__unit_set'>
        <option value='1'>Meep</option>
        <option value='2'>Moop</option>
        <option value='3'>Maap</option>
        <optgroup label='US Measurements'>
          <option value='oz'>oz</option>
          <option value='lb'>lb</option>
          <option value='tsp'>tsp</option>
          <option value='tbsp'>tbsp</option>
          <option value='floz'>fl oz</option>
          <option value='cup'>cup</option>
          <option value='pt'>pt</option>
          <option value='qrt'>qrt</option>
          <option value='gal'>gal</option>
        </optgroup>
        <optgroup label='Metric Measurements'>
          <option value='mg'>mg</option>
          <option value='g'>g</option>
          <option value='kg'>kg</option>
          <option value='ml'>ml</option>
          <option value='l'>l</option>
          <option value='dl'>dl</option>
        </optgroup>
      </select>
    )
  }

  renderUnitDataInput() {
    //TODO Autosuggest from sets?
    return (
      <section className='IngredientsForm__unit_data'>
        <label>Unit Singular</label>
        <input name="IngredientForm__unit_singular" />
        <label>Unit Plural</label>
        <input name="IngredientForm__unit_plural" />
      </section>
    );
  }

  renderAmountInput() {
    return (
      <input className='IngredientForm__amount' />
    )
  }

  renderIngredientInput() {
    return (
      <input className='IngredientForm__ingredient' />
    )
  }


  render() {
    return (
      <section>

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

function clearIngredientInputs() {
  //clear recipe form inputs:
  /*
  amount,
  ingredient,
  unit_singular,
  unit_plural,
  unit_set:none
  */
}

function addNewIngredient(ingredients, newIngredient) {
  this.setState(ingredients = [...ingredients, newIngredient])
  clearIngredientInputs();
  this.renderEnteredIngredients(ingredients);
}

function renderNewIngredient(ingredients, newIngredient) {
  this.setState(ingredients = [...ingredients, newIngredient]);
}

function removeIngredient(ingredients, id) {
  this.setState(ingredients = ingredients.filter(id))
  this.renderEnteredIngredients(ingredients);
}