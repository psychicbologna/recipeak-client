import React, { Component } from 'react';
import { DisplayAmountWithUnit } from '../../../../Utils/Utils';
import './Ingredient.css'

export const nullConversion = {
  amount: '',
  class: '',
  unit_abbr: '',
  unit_plural: '',
  unit_single: '',
}

export default class Ingredient extends Component {
  static defaultProps = {
    key: '',
    recipe_id: '',
    ingredient: {},
    amount: '',
    allConverted: false
  }

  state = {
    conversion: nullConversion,
    converted: false,
  }

  render() {
    const { ingredient, form } = this.props;
    const { converted } = this.state;

    return (
      <li className="Ingredient" key={ingredient.id || ingredient.tempId}>
        <span className="Ingredient__display">
          {`${DisplayAmountWithUnit(ingredient, converted)} ${ingredient.ing_text}`}
        </span>
        {form
          ? <ul className="Ingredient__options">
            <button className="Ingredient__button" type='button'>Delete</button>
            <button className="Ingredient__button" type='button'>Edit</button>
            <button className="Ingredient__button" onClick={(e) => this.convertUnit}>Convert to</button>
          </ul>
          : null
        }
      </li>
    )
  }
}

function DeleteIngredient(props) {
  return (
    <button onClick={e => props.removeIngredient(e, props.removeId)}>Delete</button>
  )
}