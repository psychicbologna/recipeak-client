import React, { Component } from 'react';
import { chooseDisplayUnit } from '../../Utils/Utils';

export default class Ingredient extends Component {
  static defaultProps = {
    key: '',
    recipe_id: '',
    ingredient: {},
    units: [],
    amount: '',
  }

  render() {

    const { ingredient, units, removeIngredient, removeId } = this.props

    const displayUnit = chooseDisplayUnit(ingredient, units);

    return (
      <li>{ingredient.amount} {displayUnit} {ingredient.ing_text}
        {removeIngredient ? <DeleteIngredient removeIngredient={removeIngredient} removeId={removeId}/> : null}
      </li>
    )
  }
}

function DeleteIngredient(props) {
  return (
    <button onClick={e => props.removeIngredient(e, props.removeId)}>Delete</button>
  )
}