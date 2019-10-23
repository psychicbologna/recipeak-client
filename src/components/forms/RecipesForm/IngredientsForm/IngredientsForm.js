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
    },
    unitSetSelected: false,
    setInitIngredients: () => {},
    addNewIngredient: () => {},
    removeIngredient: () => {},
    clearIngredientInputs: () => {},
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


  addNewIngredient(ingredients, newIngredient) {

    //TODO TypeError: undefined is not iterable (cannot read property Symbol(Symbol.iterator))
    // let newIngredients = [...ingredients, newIngredient]
    // this.setState({ingredients: newIngredients })
    // this.clearIngredientInputs();
    // this.renderEnteredIngredients(ingredients);
  }
  
  removeIngredient(ingredients, id) {
    this.setState({ingredients: ingredients.filter(id)})
    this.renderEnteredIngredients(ingredients);
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

  renderUnitData(unit_set) {
    return (
    <p>[unit_data:unit_singular value if amt singular, unit_data:unit_plural value if amt plural or 0/none]</p>
    )
  }

  renderUnitDataInput() {
    //TODO Autosuggest from apprx sets?
    //TODO If val of setselect is set to appx/us/metric, display the singular/plural based on amount, else display input form.
    return (
      <section className='IngredientsForm__unit_data'>
        <label>Unit Singular</label>
        <input name="IngredientForm__unit_singular" />
        <label>Unit Plural</label>
        <input name="IngredientForm__unit_plural" />
      </section>
    );
  }

  //TODO move to utils for input
  renderAmountInput() {
    return (<>
      <label htmlFor='IngredientForm__amount'>Amount</label>
      <input type='number' className='IngredientForm__amount' />
      </>
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
        { this.renderAmountInput() }
        { this.renderUnitSetSelect() }
        { this.props.unitSetSelected
          ? this.renderUnitData()
          : this.renderUnitDataInput() }
        { this.renderIngredientInput() }
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

