import React, { Component } from 'react';
import IngredientConvertButton from './IngredientConvertButton'
import { DisplayAmountWithUnit } from '../../../../Utils/Utils';
import { nullIngredient } from '../../../../../contexts/RecipeFormContext'
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
    ingredient: nullIngredient,
    conversion: nullConversion,
    amount: '',
    name: ''
  }

  constructor(props) {
    super(props);

    this.state = {
      conversion: nullConversion,
      converted: false,
    }
  }

  componentDidMount() {
    this.setState({
      conversion: this.props.conversion,
      converted: false,
    })
  }

  toggleConvert = event => {
    event.preventDefault();
    this.setState({ converted: !this.state.converted })
  }


  render() {
    const { ingredient, name, onEditIngredient, onDeleteIngredient } = this.props;
    const { converted } = this.state;
    const className = `Ingredient__${name}`


    //TODO replace this display with edit form if edit is clicked and submit if edit submit is clicked.
    //TODO get the delete button to delete the ingredient.

    return (
      <li className="Ingredient" key={ingredient.id}>
        <span className={className}>
          {`${DisplayAmountWithUnit(ingredient, converted)} ${ingredient.ing_text}`}
        </span>
        <ul className="Ingredient__options">
          <button
            className="Ingredient__button delete"
            type='button'
            onClick={event => onDeleteIngredient(event, ingredient.id)}
          >
            Delete
          </button>
          <button
            className="Ingredient__button edit"
            type='button'
            onClick={event => onEditIngredient(event, ingredient.id)}
          >
            Edit
          </button>
        </ul>
        {ingredient.hasOwnProperty('conversion')
          ? <IngredientConvertButton
            convertUnitName={ingredient.conversion.unit_plural}
            baseUnitName={ingredient.unit_data.unit_plural}
            converted={converted}
            toggleConvert={this.toggleConvert}
          />
          : null
        }
      </li>
    )
  }
}