import React, { Component } from 'react';

export default class Ingredient extends Component {
  static defaultProps = {
    key: '',
    recipe_id: '',
    ingredient: {},
    units: [],
    amount: '',
  }

  render() {
    const ingredient = this.props.ingredient;
    const units = this.props.units;

    let displayUnit;

    if (ingredient.unit_set === 'Custom') {
      displayUnit = ingredient.unit_data;
    } else {

      const unitSet = ingredient.unit_set;
      const unitsFiltered = units.filter(unit => unit.unit_set === unitSet);

      if (!unitsFiltered || !unitsFiltered.length) {
        displayUnit = {unit_singular:null, unit_plural:null}
      } else {
        displayUnit = unitsFiltered[0].unit_data;
      }
    }

    const pluralChoice = (displayUnit, amount) => amount == 1 ? displayUnit.unit_single : displayUnit.unit_plural;

    return (
      <li>{ingredient.amount} {pluralChoice(displayUnit, ingredient.amount)} {ingredient.ing_text}</li>
    )
  }
}