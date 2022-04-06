import React, { Component } from 'react';
import IngredientOptionsBase from './IngredientOptionsBase/IngredientOptionsBase';
import IngredientFieldSet from '../../../../forms/RecipeForm/IngredientFieldset/IngredientFieldset'
import IngredientOptionsConvert from './IngredientOptionsConvert/IngredientOptionsConvert';
import { DisplayAmountWithUnit } from '../../../../Utils/Utils';
import RecipeFormContext, { nullIngredient } from '../../../../../contexts/RecipeFormContext';
import './Ingredient.css'

// A conversion is sent with an ingredient; it holds information on the unit an ingredient may convert to.
// Because the current build only has one unit it may convert to or from, it allows you to instantaneously
// convert a ingredient's unit to its opposite. New conversions must be called when an ingredient is added
// or its units or amounts are changed, and the feature will need to be refactored for scaling when the
// conversion system is more robust.

export const nullConversion = {
  amount: '',
  class: '',
  unit_abbr: '',
  unit_plural: '',
  unit_single: '',
}

//Displays an ingredient. Can be configured for both a form and list context.
export default class Ingredient extends Component {

  static contextType = RecipeFormContext;

  static defaultProps = {
    key: '',
    ingredient: nullIngredient,
    conversion: nullConversion,
    //Whether or not to show ingredient options.
    showOptions: false,
    //When editing an ingredient, the list uses this prop to isolate an ingredient, preventing multiple fields from being open.
    editingId: ''
  }

  state = {
    conversion: nullConversion,
    converted: false,
    editing: false,
    showOptions: this.props.showOptions,
    currentIngredient: nullIngredient
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

  //Sets ingredient for use with child fieldset.
  setCurrentIngredient = (ingredient) => {
    let newCurrentIngredient = { ...nullIngredient };
    const newFields = Object.keys(ingredient);
    const unitDataFields = Object.keys(ingredient.unit_data);

    //Convert key values for current ingredient to this ingredient's values.
    for (let i = 0; i < newFields.length; i++) {
      let field = newFields[i];

      if (field === 'id') {
        newCurrentIngredient[field] = ingredient[field]
      } else if (field === 'unit_data') {
        continue;
      } else {
        newCurrentIngredient[field] = { value: ingredient[field], touched: false }
      }
    }

    //Retrieve unit data, then attach to current ingredient.
    const unitData = this.setUnitData(ingredient, unitDataFields);

    return unitData.then(unitData => {
      newCurrentIngredient.unit_class = unitData.unit_class;
      newCurrentIngredient.unit_single = unitData.unit_single;
      newCurrentIngredient.unit_plural = unitData.unit_plural;
      this.setState({ currentIngredient: newCurrentIngredient })
      return newCurrentIngredient;
    });
  }

  //Clear form values.
  clearCurrentIngredient = () => {
    this.setState({
      currentIngredient: nullIngredient
    })
    document.getElementById('ing_text').value = null;
    document.getElementById('amount').value = null;
    document.getElementById('unit_set').value = 'none';
  }

  //Handle edit click, which opens the ingredient fieldset.
  handleEditClick = () => {
    this.props.onSetEditingId(this.props.ingredient.id);
    this.toggleEditing()
  }
  //Submit currentIngredient and close fieldset if successful.
  handleEditSubmit = (ingredient) => {
    this.context.onEditIngredient(ingredient)
    this.props.onClearEditingId();
    this.toggleEditing();
  }
  //Abort editing an ingredient and close fieldset.
  handleCancelClick = () => {
    this.props.onClearEditingId();
    this.toggleEditing();
  }

  //Handle delete click of ingredient.
  handleDeleteClick = (event) => {
    event.preventDefault();
    this.context.onDeleteIngredient(this.props.ingredient.id)
  }

  render() {
    const { ingredient, editingId } = this.props;
    const { converted, editing, showOptions } = this.state;

    const className = `Ingredient Ingredient__${showOptions ? 'editing' : 'listing'} ${!!editingId && editingId !== ingredient.id && 'disabled'}`

    return (
      <li className={className} key={ingredient.id}>
        {!editing
          ? <span className='Ingredient__display'>
            {`${DisplayAmountWithUnit(ingredient, converted)} ${ingredient.ing_text}`}
          </span>
          : <IngredientFieldSet
            editing={true}
            onCancelClick={this.handleCancelClick}
            onSubmit={this.handleEditSubmit}
            ingredient={ingredient}
            unit_data={ingredient.unit_data}
          />
        }
        {(showOptions && !editing && ingredient.hasOwnProperty('conversion')) &&
          <IngredientOptionsConvert
            ingredient={ingredient}
            converted={converted}
            toggleConvert={this.toggleConvert}
          />
        }
        {(showOptions && !editing) &&
          <IngredientOptionsBase
            editingIngredient={editing}
            ingredient={ingredient}
            onDeleteIngredient={this.handleDeleteClick}
            onEditIngredient={this.handleEditClick}
            disabled={(!!editingId && editingId !== ingredient.id)}
          />
        }
      </li>
    )
  }
}