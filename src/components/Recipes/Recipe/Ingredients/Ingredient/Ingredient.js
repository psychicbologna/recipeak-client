import React, { Component } from 'react';
import IngredientOptionsBase from './IngredientOptionsBase';
import IngredientFieldSet from '../../../../forms/RecipeForm/IngredientFieldset/IngredientFieldset'
import IngredientOptionsConvert from './IngredientOptionsConvert';
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
    showOptions: false
  }

  constructor(props) {
    super(props);

    this.state = {
      conversion: nullConversion,
      converted: false,
      editing: false,
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

  //Toggle whether or not to show the converted unit.
  toggleConvert = event => {
    event.preventDefault();
    this.setState({ converted: !this.state.converted })
  }

  //Toggle whether or not this ingredient is being edited.
  toggleEditing = () => {
    this.setState({ editing: !this.state.editing })
  }

  //Set currentIngredient in context
  onEditIngredientClick = () => {
    const { ingredient } = this.props.ingredient;
    this.context.setCurrentIngredient(ingredient);
    this.toggleEditing();
  }

  //Submit currentIngredient and close fieldset if successful.
  onEditIngredientSubmit = (event, id) => {
    event.preventDefault();

    this.context.submitCurrentIngredient()
      .then(this.toggleEditing())
      .catch(error => console.log('Something went wrong.'))
  }

  //Abort editing an ingredient and close fieldset.
  handleCancelClick = () => {
    this.context.clearCurrentIngredient();
    this.toggleEditing();
  }

  render() {
    const { ingredient } = this.props;
    const { converted, editing, showOptions } = this.state;

    const className = `Ingredient Ingredient__${showOptions ? 'editing' : 'listing'}`

    return (
      <li className={className} key={ingredient.id}>
        {!editing
          ? <span className='Ingredient__display'>
            {`${DisplayAmountWithUnit(ingredient, converted)} ${ingredient.ing_text}`}
          </span>
          : <IngredientFieldSet
            editing={true}
            onCancelClick={this.toggleEditing}
            ingredient={ingredient}
          />
        }
        {showOptions && !editing
          ? <IngredientOptionsBase
            editingIngredient={editing}
            ingredient={ingredient}
            onDeleteIngredient={this.toggleEditing}
            onEditIngredient={this.toggleEditing}
          />
          : null
        }
        {showOptions && !editing && ingredient.hasOwnProperty('conversion')
          ? <IngredientOptionsConvert
            ingredient={ingredient}
            converted={converted}
            toggleConvert={this.toggleConvert}
          />
          : null
        }
      </li>
    )
  }
}