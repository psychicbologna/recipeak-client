import React, { Component } from 'react';
import IngredientConvertButton from './IngredientConvertButton';
import { DisplayAmountWithUnit, Button } from '../../../../Utils/Utils';
import RecipeFormContext, { nullIngredient } from '../../../../../contexts/RecipeFormContext';
import './Ingredient.css'

export const nullConversion = {
  amount: '',
  class: '',
  unit_abbr: '',
  unit_plural: '',
  unit_single: '',
}

export default class Ingredient extends Component {

  static contextType = RecipeFormContext;

  static defaultProps = {
    key: '',
    ingredient: nullIngredient,
    conversion: nullConversion,
    amount: '',
    name: '',
    editingIngredient: '',
    showOptions: false
  }

  constructor(props) {
    super(props);

    this.state = {
      conversion: nullConversion,
      converted: false,
      editingIngredient: false,
      showOptions: this.props.showOptions
    }
  }

  //Loads conversion data if there is any, as well as whether or not there is a parent-level setting to show converted data.
  componentDidMount() {
    this.setState({
      conversion: this.props.conversion,
      converted: false,
    })
  }

  //Whether or not to show the converted unit.
  toggleConvert = event => {
    event.preventDefault();
    this.setState({ converted: !this.state.converted })
  }


  render() {
    const { onEditIngredient, onDeleteIngredient } = this.context;
    const { ingredient, name } = this.props;
    const { converted, editingIngredient, showOptions } = this.state;
    const className = `Ingredient__${name}`


    //TODO replace this display with edit form if edit is clicked and submit if edit submit is clicked.
    //TODO get the delete button to delete the ingredient.

    return (
      <li className="Ingredient" key={ingredient.id}>

        <span className={className}>
          {`${DisplayAmountWithUnit(ingredient, converted)} ${ingredient.ing_text}`}
        </span>

        {showOptions
          ? <div className="Ingredient__options">
            <Button
              className="Ingredient__options__delete"
              type='button'
              onClick={event => onDeleteIngredient(event, ingredient.id)}
              disabled={!!editingIngredient}
            >
              Delete
          </Button>
            <Button
              className="Ingredient__options__edit"
              type='button'
              onClick={event => onEditIngredient(event, ingredient.id)}
              disabled={!!editingIngredient}
            >
              Edit
          </Button>
            {ingredient.hasOwnProperty('conversion')
              ? <IngredientConvertButton
                convertUnitName={ingredient.conversion.unit_plural}
                baseUnitName={ingredient.unit_data.unit_plural}
                converted={converted}
                toggleConvert={this.toggleConvert}
              />
              : null
            }
          </div>
          : null
        }
      </li>
    )
  }
}